//const http  = require("http");
import http from "http";
import fs from 'fs'; // function to import files

const app = http.createServer((req, res) => {
    if (req.url === '/') {
        const webpage = fs.readFileSync("homepage.html")
        res.end(webpage)}
    else if (req.url === '/about')
        {
            res.end('about page')
        } 
    else if (req.url === 'user/name/id')
            {
                res.end('my name is happy')
            }
    else{
            res.end('page not found')
        };
    
});

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`); 
});




