
import express from "express" // handles import http
import dotenv from "dotenv"

dotenv.config()
const app = express();
const PORT = process.env.PORT || 8000;

//CRUD -> Server is setup to do these things
//methods: GET(READ), POST(CREATE), PUT(UPDATE) and DELETE

app.get("/", (req, res) => {
    res.send("Welcome to the server - GET")
}) 
app.post("/", (req, res) => {res.send("Welcome to the server - POST")

})
    
app.put("/", (req, res) => {
    res.send("Welcome to the server - PUT")
})
    
app.delete("/", (req, res) => {
    res.send("Welcome to the server - DELETE")
})
     
 app.get ("/search", (req, res) => {
    console.log(req.url)
    console.log(req.headers)
    console.log(req.query)
    // console.log(req.params)
    // console.log(req.body)
    res.send("You came to the /search route")
 })

app.get ("/item/:itemID", (req, res) => {
    console.log(req.url)
    console.log(req.headers)
    console.log(req.query)
    // console.log(req.params)
    // console.log(req.body)
    res.send("You came to the /search route")
 })
app.listen(PORT, () =>{
 console.log(`http://localhost:${PORT}`)
})

