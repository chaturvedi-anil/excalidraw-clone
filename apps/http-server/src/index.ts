import express from "express";
import jwt from "jsonwebtoken"; 

const app = express();

app.use(express.json());

app.get("/ping", (req, res) => {
    res.json({message: "pong"});
});

app.post("/signup", (req, res) => {
    try {
        
    } catch (error) {
        
    }
});

app.post("/signin", (req, res) => {
    try {
        
    } catch (error) {
        
    }
});


app.listen(3001, (err) => {
    if (err) {
        console.error(`error in running http server : ${err}`);
    }

    console.log(`express server is running on port 3000`);
});     