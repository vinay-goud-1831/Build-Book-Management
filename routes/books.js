const express = require("express");

const {books} = require("../data/books.json");
const {users} = require("../data/users.json");

const router = express.Router();



// router.get("/",(req,res)=>{
//     res.status(200).json({
//         success: true,
//         data : books,})
// });

router.get("/issued",(req,res)=>{
    
    const {id} = req.params;

    const userWithBookIssued = users.filter((each)=>{
        if(each.issuedbook) return each ;
    });

  const issuedBooks = [];

  userWithBookIssued.find((each)=>{
    const book = books.find((book)=> book.id === each.issuedbook);

    book.issuedBy = each.name;
    book.issueddate = each.issueddate;
    book.returndate = each.returndate;
    
    issuedBooks.push(book);
  });
 

  if(issuedBooks.length === 0){
    return res.status(404).json({
        success : fail ,
        message : "issued Book doesnt exist"
    });
  }
  return res.status(200).json({
    success: true, 
    message : "issued book exist",
    data : issuedBooks
  });
});


module.exports = router ;