const express = require("express");


const app = express();

app.get("/",(req , res) => {
    res.send("Helllo ihtisham")
})

app.get("/about" ,(req , res)=>{
    res.send("this is about page")
})


const port = process.env.PORT || 3001;

app.listen(port,()=>{
    console.log(`the app is running on port ${port} `)
})

