const express = require("express");

const PORT = 8081;

const userRouter = require("./routes/users.js");

const booksRouter = require("./routes/books");

const app = express();

app.use(express.json());

app.use("/users", userRouter);
app.use("/books", booksRouter);

app.get("/",(req,res)=>{
    
    res.status(200).json({message:"success",
    data : "hey"})

});



app.listen(PORT,()=>{
    console.log(`output was at ${PORT}`);
});



