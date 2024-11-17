const User=require("../model/userSchema");
const jwt=require("jsonwebtoken");
const bcrypt = require("bcrypt");

// const createUser=async(req,res)=>{
//     try{

//         console.log("Request body:",req.body);


//         const existingUser=await User.findOne({email:req.body.email});
//         if(existingUser){
//             return res.status(400).json({error:{email:"Email already exists"}});
//         }
//         //create a user in db
//         const user=await User.create(req.body);
//         const token=jwt.sign({user:user._id,email:user.email},process.env.JWT_SECRET,
//             {expiresIn:"1d"}
//         );
//         res.status(201).json({
//             user:{
//                 id:user._id,
//                 email:user.email,
//                 //password:user.password,
//             },
//             token,
//             });
        
//     }
//     catch(error){
//         res.status(500).json({message:"Signup is failed"});
//     }
// }

const createUser = async (req, res) => {
    try {
      console.log("Request body:", req.body);
  
      // Check if user already exists
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).json({ error: { email: "Email already exists" } });
      }
  
      // Create user in the database
      const user = await User.create(req.body);
  
      // Generate JWT token
      const token = jwt.sign(
        { user: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
  
      // Send response
      res.status(201).json({
        user: {
          id: user._id,
          email: user.email,
        },
        token,
      });
    } catch (error) {
      console.error("Error during signup:", error); // Log the actual error
      res.status(500).json({ message: "Signup failed", error: error.message });
    }
  };
  
  const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
      console.log("Login request received:", req.body);
  
      // Find user by email
      const user = await User.findOne({ email });
      if (user) {
        console.log("User found:", user);
  
        // Compare the entered password with the hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);
        console.log("Password match:", passwordMatch);
  
        if (passwordMatch) {
          // Generate JWT token
          const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
          );
          console.log("JWT generated:", token);
  
          // Send response back to client
          return res.status(200).json({
            user: {
              id: user._id,
              email: user.email,
            },
            token,
          });
        } else {
          console.log("Incorrect password");
          return res.status(400).json({ message: "Incorrect password" });
        }
      } else {
        console.log("No user found with this email");
        return res.status(400).json({ message: "No user found with this email" });
      }
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ message: "Login failed", error: error.message });
    }
  };
  

  
  module.exports={createUser,loginUser};


// const loginUser=async(req,res)=>{
//     const {email,password}=req.body;
//     try{
//         const user=await User.findOne({email});
//         if(user){
// const passwordMatch=await bcrypt.compare(password,user.password);
// if(passwordMatch){
//     const token=jwt.sign(
//         {
//             id:user._id,email:user.email
//         },
//         process.env.JWT_SECRET,
//         {
//             expiresIn:"1d",
//         }
//     )}else{
//         return res.status(400).json({message:"Incorrect password"});
//     }

//     }else{
//         return res.status(400).json({message:"No user found with this email"})
//     }
//     }catch(error){
//         res.status(500).json({message:"Login is failed"});
//     }
// }

