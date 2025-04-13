
import express from "express"; // if you are using type: module
import logger from "./middleware/logger.js"
import auth from "./middleware/auth.js"

 
const app = express();
const PORT = process.env.PORT || 8000;
 
// routes
app.get("/", logger, (req, res) => {
  res.send("Welcome to our server");
});

app.get("/about", (req, res) => {
    res.send("Welcome to the about page");
  });

app.get("/login", (req, res) => {
    res.send("We have received your request - Login");
  });
  
app.post("/login", (req, res) => {
    res.send("We stole your information");
  });

  app.get("/fetchData", auth, (req, res) => {
    res.send("Hi Happy, here is your profile data");
  });
 
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
 
app.use("", (req, res) => {
  res.status(404).send("Page not found");
});