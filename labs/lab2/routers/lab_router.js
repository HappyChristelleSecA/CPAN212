// /name
// /greeting
// /add 
// /calculate

import express from "express"

const router = express.Router()

//checking if in route
router.get("/" , (req, res)=> {
    res.send("Welcome to the lab router file")
})

//name route
router.get("/name" , (req, res)=> {
    res.send("My name is Happy Chrsitelle")
})
//greeting route
router.get("/greeting" , (req, res)=> {
    res.send("Hello from Happy , N01686171")
})

//add route
router.get("/add/:x/:y" , (req, res)=> {
    let x = parseFloat(req.params.x)
    let y = parseFloat(req.params.y)
    res.send(`${x+y}`)
})

//calaculate route
router.get("/calculate/:a/:b/:operation" , (req, res)=> {
    let a = parseFloat(req.params.a)
    let b = parseFloat(req.params.b)
    let operation = (req.params.operation)
    let result = 0;
   

    switch (operation) {
        case "+":
            result = a + b;
            break;
    
            case "-":
            result = a - b;
            break;

            case "*":
            result = a * b;
            break;

            case "/": //-> %2f
          if (b !== 0) { 
            result = a / b;
          } else 
        {
            res.send("Division by zero is not allowed");
            return; 
        }
        break;

        default:
            res.send("invalid operation")
            break;
    }
    res.send(`${result}`)
    
})

export default router;