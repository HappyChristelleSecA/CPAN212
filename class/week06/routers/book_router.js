import express from "express";
import Book from "../models/book.js"

const router = express.Router();

router.get("/", (req, res)=>{ // lh:8000/book/
    //1 - fetch from DB
    //2 - send to client
    Book.find().then((results) => {
        res.json(results);
    });
})

//2 - fetch by id

router.get("/:id", (req, res)=>{
    //1 - fetch from DB
    //2 - send to client
    Book.findById(req.params.id).then((results) => {
        res.json(results);
    });
})

//3- search

router.get("/search", (req, res)=>{
    const filters = {}
    //query
    if(req.query.title) {
        filters.title = req.query.title;
    }
    if(req.query.pages) {
        let pages = parseInt(req.query.pages)
        if(req.query.logicalOperators) {
            switch (req.query.logicalOperators) {
                case gte:
                    filters.pages = {$gte:{ pages }}

                    break;

                default:
                    break;

            }
        }

        
    }


    Book.find(filters).then((results) => {
        res.json(results);
    });
});

//4- update

router.put("/:id", (req,res) => {
    Book.findByIdAndUpdate(req.params.id).then(()=>{
        res.json({message:"update successful"})
    })
})

router.delete("/:id", (req,res) => {
    Book.findByIdAndDelete(req.params.id).then(()=>{
        res.json({message:"delete successful"})
    })
})

router.post("/save", (req, res)=>{
    const { title,author,publisher } = req.body;

    let newBook = new Book({
        title,
        author,
        publisher,
        page: 500,
    })

    newBook.save().then(()=>{
        res.json({message: "Data saved"})
    })
})



export default router;