import express from "express";
import jwt from "jsonwebtoken"; 
import { authMiddleware } from "./middleware";
import { signupSchema, signinSchema } from "@repo/common/types";


const app = express();

app.use(express.json());

app.get("/ping", (req, res) => {
    res.json({message: "pong"});
});

app.post("/signup", (req, res) => {
    try {
        const data = signupSchema.safeParse(req.body);
        if(!data.success){
            res.json({
                message: data.error.message
            })
            return;
        }
        
        res.json({
            message: "signup completed successfully!"
        })
    } catch (error) {
        res.json({
            message: "Internal Server Error!"
        })
    }
});

app.post("/signin", (req, res) => {
    try {
        
    } catch (error) {
        
    }
});

app.post("/room", authMiddleware, (req, res) => {
    try {
        
    } catch (error) {
        
    }
})

app.listen(3001, (err) => {
    if (err) {
        console.error(`error in running http server : ${err}`);
    }

    console.log(`express server is running on port 3000`);
});     