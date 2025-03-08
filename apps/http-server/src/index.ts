import express from "express";

const app = express();

app.listen(3000, (err) => {
    if (err) {
        console.error(`error in running http server : ${err}`);
    }

    console.log(`express server is running on port 3000`);
});