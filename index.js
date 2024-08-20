const express = require("express");

const {users} = require("./data/users.json");

const PORT = 8081;

const app = express();

app.use(express.json());

app.get("/",(req,res)=>{
    res.status(200).json({message:"success",
    data : "hey"})

});

 //user
app.get("/users",(req,res)=>{
    res.status(200).json({
        success: true,
        data : users,})
});

//user/:id
app.get("/users/:id",(req,res)=>{
    const {id} = req.params;

    const user = users.find((each)=>each.id === id);

    if(!user){
        return res.status(404).json({
            sucsees : "false",
        });
    }
    return res.status(201).json({
        sucsess : "true",
        data : user,

    });
    
});

//post method

app.post("/users",(req,res)=>{

    const {id,name,surname,email,subsrciptionType,subsrciptionDate} =  req.body ;

    const user = users.find((each)=> each.id === id);

    if(user){
        return res.status(404).json({
            sucsees : false,
            message : "user exist",
    });
}
 users.push({
    id,
    name,
    email,
    surname,
    subsrciptionType,
    subsrciptionDate,
 });
 return res.status(200).json({
    sucsees : true,
    message : "user added",
    data : users,

 });
});

//PUT METHOD by id
app.put("/users/:id",(req,res)=>{

    const {id} = req.params;
    const {data} = req.body;

    const user = users.find((each)=>each.id === id);

    if(!user){
        return res.status(404).json({
            success : false,
            message : "user  doesnt exist",
            });

            }
     const upDateData = users.map((each)=>{
        if(each.id === id){
            return{
                ...each,
                ...data,
            };
            
        }
        return each ;
     });
     return res.status(200).json({
        success : true,
        message : "user  updataed",
        data : upDateData,
        });

});

app.listen(PORT,()=>{
    console.log(`output was at ${PORT}`);
});