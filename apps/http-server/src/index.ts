import express from "express";
import jwt from "jsonwebtoken"; 
import bcrypt from "bcrypt";

import { authMiddleware } from "./middleware";
import { signupSchema, signinSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/prismaClient";
import { JWT_SECRET } from "@repo/backend-common/config";

const app = express();

app.use(express.json());

app.get("/ping", (req, res) => {
    res.json({message: "pong"});
});

app.post("/signup", async (req, res) => {
    try {
        const data = signupSchema.safeParse(req.body);
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
                message: `user already exist with ${data.data.email} email!`
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
                    message: "signup completed successfully!"
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
        const data = signinSchema.safeParse(req.body);
        
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

app.post("/room", authMiddleware, (req, res) => {
    try {
        
    } catch (error) {
        console.error("Room Error : ", error);
        res.status(500).json({
            message: "Internal Server Error!"
        })
        return;
    }
})

app.listen(3001, (err) => {
    if (err) {
        console.error(`error in running http server : ${err}`);
    }

    console.log(`express server is running on port 3000`);
});     