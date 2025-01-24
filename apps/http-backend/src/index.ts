import express from "express";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("http server");
});

app.listen(3001);