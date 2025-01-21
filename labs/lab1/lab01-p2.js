// /*
// home page
// about us
// contact
// login
// contact
// login
// register
// details
// search page
// */


import http from "http"
import fs from "fs";
import path from "path";


const app = http.createServer((req, res)=>{
    if(req.url === "/"){
        res.end("WELCOME TO THE SERVER")
    }
    else if(req.url === "/about"){
        const webpage = fs.readFileSync(path.join("html", "about.html"))
        res.end(webpage)
    }
    else{
        res.end("Page not found")
    }
});
const PORT = process.env.PORT || 8000;
app.listen(PORT, ()=>{
    console.log(`http://localhost:${PORT}`)
});