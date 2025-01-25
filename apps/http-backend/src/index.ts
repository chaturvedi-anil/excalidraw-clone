import express, {Request, Response} from "express";
import jwt from "jsonwebtoken";
import { middleware } from "./middleware";
import { CreateUserSchema, SigninSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/prismaClient";
import { JWT_SECRET } from "@repo/backend-common/config";

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

        const newUser = await prismaClient.appUser.create({
            data: { 
                name,
                username, 
                password 
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

        if (!isUserPresent || isUserPresent.password !== password) {
            res.status(401).json({
                message: "Invalid username/password!"
            })
            return;
        }
        
        const token = jwt.sign({userId: isUserPresent.id}, JWT_SECRET);

        res.status(201).json({
            message:"signin successfully!",
            token: token
        });
        
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error!"
        })
        return;
    }
})

app.post("/create-room", middleware ,(req: Request, res: Response) => {
    try {
        const { roomId } = req.body;
        console.log("create room : ", req.headers);
        
        // TODO db call
        
        res.status(201).json({
            roomId: 123,
            message:"room created successfully!"
        })
        
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error!"
        })
    }
})

app.listen(3001);