const auth =  (req, res, next) =>{
if(req.query.username == "happy"){
   
  next();
}
    else{
        res.send("You are not authorized for this Page")
    }
}

export default auth;