import express from "express";
import jwt from "jsonwebtoken"; 
import bcrypt from "bcrypt";

import { authMiddleware } from "./middleware";
import { SigninSchema, SignupSchema, CreateRoomSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/prismaClient";
import { JWT_SECRET } from "@repo/backend-common/config";

const app = express();

app.use(express.json());

app.get("/ping", (req, res) => {
    res.json({message: "pong"});
});

app.post("/signup", async (req, res) => {
    try {
        const data = SignupSchema.safeParse(req.body);
        if(!data.success){
            res.status(400).json({
                message: data.error.message
            })
            return;
        } 

        const isUserExist = await prismaClient.appUser.findUnique(
            {
                where:{
                    email: data.data.email
                }
            }
        )

        if(isUserExist){
            res.status(409).json({
                message: `User already exists with ${data.data.email} email!`
            })
            return
        }

        const hashPassword = await bcrypt.hash(data.data.password, 10);

        if (hashPassword) {
            const newUser = await prismaClient.appUser.create({
                data: {
                    name: data.data.name,
                    email: data.data.email,
                    password: hashPassword
                }
            })
            
            if(newUser){
                
                res.status(201).json({
                    message: "Signup completed successfully!"
                })
            }
            
        }

    } catch (error) {
        console.error("Signuo Erro : ", error);
        res.status(500).json({
            message: "Internal Server Error!"
        })
    }
});

app.post("/signin", async (req, res) => {
    try {
        const data = SigninSchema.safeParse(req.body);
        
        if (!data.success) {
            res.status(400).json({
                message: data.error.message
            })
            return;
        }

        const isUserExist = await prismaClient.appUser.findUnique({
            where:{
                email: data.data.email
            }
        })

        if (!isUserExist) {
            res.status(404).json({
                error: "Not Found",
                message: `User not found with email ${data.data.email}!`
            });
            return;
        } else {
            const isPasswordCorrect = await bcrypt.compare(data.data.password, isUserExist.password);
            
            if(!isPasswordCorrect){
                res.status(401).json({
                    error: "Unauthorized",
                    message: "Email or password is incorrect"
                })
            }

            if (!JWT_SECRET) {
                console.error("JWT_SECRET is undefined!");
                res.status(500).json({ message: "Internal Server Error!" });
            }
            
            const token = jwt.sign({userId: isUserExist.id}, JWT_SECRET);

            res.status(200).json({
                message: "signin successfully completed!",
                token: token,
            })
        }
    
    } catch (error) {
        console.error("Signin Error : ", error);
        res.status(500).json({
            message: "Internal Server Error!"
        })
        return;
    }
});

app.post("/room", authMiddleware, async(req, res) => {
    try {
        const data = CreateRoomSchema.safeParse(req.body);

        if (!data.success) {
            res.status(400).json({
                message: data.error.message
            })
            return;
        }

        //@ts-ignore
        const userId = req.userId;
        const isRoomPresent = await prismaClient.room.findUnique({where: {slug: data.data.slug}});
        
        if(isRoomPresent){
            res.status(409).json({
                message: `Room already exists with this name!`
            })
            return;
        }

        const isRoomCreated = await prismaClient.room.create({
            data:{
                slug: data.data.slug,
                adminId: userId
            }
        })

        if (!isRoomCreated) {
            res.status(500).json({
                message: "Failed to create room. Please try again."
            });
            return;
        }

        res.status(201).json({
            message: `Room created with name ${isRoomCreated.slug}`,
            roomId: isRoomCreated.id
        });
    } catch (error) {
        console.error("Room Error : ", error);
        res.status(500).json({
            message: "Internal Server Error!"
        })
        return;
    }
})

app.get("/chats/:roomId", async(req, res) => {
    const roomId = Number(req.params.roomId);

    const messages = await prismaClient.chat.findMany({
        where: {
            roomId: roomId
        },
        orderBy: {
            id: "desc"
        },
        take: 50
    })

    res.json({messages})
})

app.get("/room/:slug", async(req, res) => {
    const slug = req.params.slug;
    const room = await prismaClient.room.findFirst({
        where: {
            slug: slug
        },
    })

    res.json({room});  
})


app.listen(3001, (err) => {
    if (err) {
        console.error(`error in running http server : ${err}`);
    }

    console.log(`express server is running on port 3000`);
});     