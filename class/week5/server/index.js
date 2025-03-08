/* Project setup: For the server
1 - new project folder
2 - open an integrated terminal
3 - run these commands:
    npm init -y
    npm i express nodemon
    (optional) -> go into package.json and add "type": "module" to enable import from 
*/
 
// [Please enable only ONE of these] 
// import express from "express"; // if you are using type: module
const express = require("express"); // if using common JS (Default)
import cors from "cors";
import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/uploads')
    },
    filename: function (req, file, cb) {
      const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniquePrefix + '-' + file.filename)
    }
  })
  
  const upload = multer({ storage: storage })
 
const app = express();
const PORT = process.env.PORT || 8000;
 
// middlelware
app.use(cors())
app.use(express.urlencoded({extended: true})); //for HTML Forms
app.use(express.json()); // extracts application/json data, OLD method was bodyparser

// routes
app.get("/", (req, res) => {
  res.send("I stole your data");
});

app.post("/fileform", upload.single("file"), (req, res) =>{
    console.log(req.file)
    console.log(req.body)
    res.json("I received your information")
})
// Send data
app.get("/data", (req, res) => {
    const data = {
        fname: "Happy",
        lname: "Christelle",
    }
    res.send(data)
  });
 
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
 
app.use("", (req, res) => {
  res.status(404).send("Page not found");
});