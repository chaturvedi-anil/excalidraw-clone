import express, {Request, Response} from "express";
import jwt from "jsonwebtoken";
import { middleware } from "./middleware";
import { CreateUserSchema, SigninSchema, CreateRoomSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/prismaClient";
import { JWT_SECRET } from "@repo/backend-common/config";
import bcrypt from "bcrypt";

const app = express();
app.use(express.json());

app.get("/ping", (req: Request, res: Response) => {
    res.send("http server");
});

app.post("/signup", async (req: Request, res: Response) => {
    try {
        const signupData = CreateUserSchema.safeParse(req.body);

        if (!signupData.success) {
            res.json({
                message: "Incorrect inputs",
                error: signupData.error.message
            })
            return;
        }

        const { name, username, password } = signupData?.data;
        const isUserPresent = await prismaClient.appUser.findFirst({
            where: {
                username: username
            }
        })

        if (isUserPresent) {
            res.status(400).json({
                message: `${username} username already exists!`,
            })
            return;
        }
       
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = await prismaClient.appUser.create({
            data: { 
                name,
                username, 
                password: hashedPassword 
            },
            select: {
                id: true, name: true, username: true
            }
        });
        
        if (newUser) {
            res.status(201).json({
                message: "singup successfully!",
                userDetails: newUser  
            })
        }
        
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error!",
            error: error
        })
    }
})

app.post("/signin", async (req: Request, res: Response) => {
    try {
        const signInData = SigninSchema.safeParse(req.body);

        if (!signInData.success) {
            res.json({
                message: "Incorrect inputs",
                error: signInData.error.message
            })
            return;
        }

        const { username, password } = signInData?.data;
        
        const isUserPresent = await prismaClient.appUser.findFirst({
            where: {
                username: username
            },
            select: {
                id: true,
                username: true,
                password: true
            }
        });
    
        if (isUserPresent) {
            const isPasswordCorrect = await bcrypt.compare(password, isUserPresent?.password);
            
            if (isPasswordCorrect) {
                const token = jwt.sign({userId: isUserPresent.id}, JWT_SECRET);

                res.status(201).json({
                    message:"signin successfully!",
                    token: token
                });
            }   
        } else {
            res.status(401).json({
                message: "Invalid username/password!"
            })
            return;
        }
        
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error!"
        })
        return;
    }
})

app.post("/create-room", middleware , async (req: Request, res: Response) => {
    try {
        const roomNameData = CreateRoomSchema.safeParse(req.body);

        if (!roomNameData.success) {
            res.status(400).json({
                message: "Incorrect Input",
                error: roomNameData.error?.message
            });
            return;
        }
        const isRoomPresent = await prismaClient.room.findFirst({
            where: {
                slug: roomNameData.data?.name
            }
        })

        if (isRoomPresent) {
            res.status(400).json({
                message:`Room already exists with ${roomNameData.data.name} name!`
            })
            return;  
        } 

        //@ts-ignore
        const userId = req.userId;
        if (userId) {
            const newRoom = await prismaClient.room.create({
                data:{
                    slug: roomNameData.data?.name,
                    adminId: userId
                }
            });

            res.status(201).json({
                roomId: newRoom.id,
                message:"room created successfully!"
            })
        }
         
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error!"
        })
    }
})

app.get("/chats/:roomId" , async (req: Request, res: Response) => {
    try {        
        const roomId = Number(req.params.roomId);

        const messages = await prismaClient.chat.findMany({
            where:{
                roomId: roomId
            },
            orderBy:{
                id: "desc"
            },
            take: 50
        }) 

        res.json({
            messages: messages
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error!"
        })
    }
})

app.get("/room/:slug" , async (req: Request, res: Response) => {
    try {        
        const slug = req.params.slug;

        const room = await prismaClient.room.findFirst({
            where:{
                slug
            }
        }) 

        res.json({
            roomId: room?.id
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error!"
        })
    }
})

app.listen(3001);