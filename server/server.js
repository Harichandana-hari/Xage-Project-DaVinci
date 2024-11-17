const express = require('express');
const app=express();
const cors = require('cors');
const mongoose=require("mongoose");
const authRoutes=require("./routes/auth")

//middleware
app.use(express.json());
const corsOptions = {
    origin: 'https://xage-login-or-signup.vercel.app/', // Replace with your frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Allow cookies/credentials
};
app.use(cors(corsOptions));
const PORT=3001;
// const PORT = process.env.PORT || 3000;


require("dotenv").config();
const db=process.env.DBURI;

mongoose.connect(db)
//     useNewUrlParser:true,
//     useUnifiedTopology:true,
//     useCreateIndex:true
// })
    .then(()=>{
        console.log("Connected to mongodb");
        app.listen(PORT,()=>{
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    }).catch((err)=>{
        console.log("Failed to connect to mongodb",err);
        
    })

    app.use(authRoutes)
