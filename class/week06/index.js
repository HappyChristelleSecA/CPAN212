import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import book_router from "./routers/book_router.js"

//variables
dotenv.config();
const app = express();
const PORT = process.env.PORT || 6000;

mongoose.connect(process.env.MONGODB_URL)
.then(() => {
    console.log("DB is connected");
    app.listen(PORT, () =>{
        console.log(`http://localhost:${PORT}`);
    });
});

app.use("/book", book_router);



