import express, {Request, Response} from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";
import { middleware } from "./middleware";

const app = express();
app.use(express.json());

app.get("/ping", (req: Request, res: Response) => {
    res.send("http server");
});

app.post("/signup", (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        console.log("users signup : ",username, password);

        res.status(201).json({
            message:"singup successfully!"
        })
        
    } catch (error) {
        console.log("signup catch error : ", error);
        res.status(500).json({
            message: "Internal Server Error!"
        })
    }
})

app.post("/signin", (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        console.log("users signin : ",username, password);

        // const encoded = jwt.sign({userId}, JWT_SECRET);

        res.status(201).json({
            message:"signin successfully!"
        })
        
    } catch (error) {
        console.log("signin catch error : ", error);
        res.status(500).json({
            message: "Internal Server Error!"
        })
    }
})

app.post("/create-room", middleware ,(req: Request, res: Response) => {
    try {
        const { roomId } = req.body;
        console.log("create room : ", roomId);
        
        // TODO db call
        
        res.status(201).json({
            roomId: 123,
            message:"room created successfully!"
        })
        
    } catch (error) {
        console.log("room creation error : ", error);
        res.status(500).json({
            message: "Internal Server Error!"
        })
    }
})

app.listen(3001);