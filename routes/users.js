const express = require("express");

const {users} = require("../data/users.json");

const router = express.Router();


 //user
 router.get("/users",(req,res)=>{
    res.status(200).json({
        success: true,
        data : users,})
});

//user/:id
router.get("/:id",(req,res)=>{
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

router.post("/post",(req,res)=>{

    const {id} = req.params;

    const {data} =  req.body ;

    const user = users.find((each)=> each.id === data.id);

    if(user){
        return res.status(404).json({
            sucsees : false,
            message : "user exist",
    });
}
const allUsers = {...users,data};
 return res.status(200).json({
    sucsees : true,
    message : "user added",
    data : allUsers,

 });
});

//PUT METHOD by id
router.put("/users/:id",(req,res)=>{

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

//delete METHOD by id
// app.delete("/users/:id",(req,res)=>{
//     const {id} = req.params;

//     const user = users.find((each)=>each.id === id);

//     if(!user){
//         return res.status(404).json({
//             sucsees : "false",
//         });
//     }
// )

//users/subsriptionDetails/:id
router.get("/subscription-Details/:id",(req,res)=>{
 const {id} = req.params;


 const user = users.find((each)=> each.id === id);

 if(!user){
    return res.status(404).json({
        success : false ,
        message : "user doesnt exist "
    });
 }
 const getInDays = (data = "" ) =>{
    let date ;
    if (data === ""){
        date = new Date();
            } 
 else {
    date = new Date(data);
    }
    let days = Math.floor(date/(1000*60*60*24));

    return days;

};

//to check subsrciption type of a user

const subscriptionType = (date) =>{
    if ((user.subsrciptionType == "basic"))
        {
        date = date + 90 ;
    }else if ((user.subsrciptionType == "standard")){
        date = date + 180 ;
    }else if ((user.subsrciptionType == "prime")){
        date = date + 365 ;
    }
    return date ;
};

let returnDate = getInDays(user.returnDate);
let currentDate = getInDays();
let subsrciptionDate = getInDays(user.subsrciptionDate);
let subscrptionExpiration = subscriptionType(subsrciptionDate);



const data = {
    ...user,
    isSubsrciptionExpired : subscrptionExpiration < currentDate ,

    isDaysLeftForExpire : subscrptionExpiration <= currentDate 
    ? 0
    : subscrptionExpiration - currentDate ,

fine : returnDate < currentDate 
? subscrptionExpiration < currentDate
? 100 
: 50
:0,
}

return res.status(200).json({
    success : true,
    message : "user eith id exist",
    data,
});

});


module.exports = router ;