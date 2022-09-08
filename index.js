import express from "express";
const app = express()
import dotenv from "dotenv"
import mongoose from "mongoose";
import multer from "multer";
import cors from 'cors'
// -------------------------------------------Routes
import authRoute from "./routes/auth.js"
import userRoute from "./routes/users.js"
import postRoute from "./routes/posts.js"
import categoryRoute from "./routes/categories.js"



dotenv.config()

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true}).then(console.log("MongoDB Connected")).catch((error) => console.log(error))

// Multer image---------------------------start
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images")
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name)
    }
})
const upload = multer({storage:storage})
app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("file has been uploaded")
})

// Cross Browser data sharing-------------
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
//     res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
//     next();
//     });

app.use(cors())
// --------------------------------------End

app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/posts", postRoute)
app.use("/api/categories", categoryRoute)


// ----------------------------------------------------------------Greeting
app.get("/", (req, res) => {
    res.send("Hi, I am Abinash Patri & Welcome to my Blog API")
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log("Server Running"))