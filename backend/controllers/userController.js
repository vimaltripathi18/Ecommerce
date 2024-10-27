import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

//creating token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

//routes for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //checking user exists or not
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    //checking password is correct or not
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = createToken(user._id);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//routes for user register
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //checking user already exists or not

    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    //validating email format and strong password

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid email format" });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    //hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //creating user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    //saving user
    const user = await newUser.save();

    const token = createToken(user._id);

    res.json({ success: true, message: "User created successfully", token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//routes for admin login

const adminLogin = async (req, res) => {

  try {
      
const { email, password } = req.body
    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
      const token = jwt.sign(email+password,process.env.JWT_SECRET);
      res.json({success:true,token})
    } else{

      res.json({success:false,message:"Invalid credentials"})
    }

  } catch (error) {
    
    console.log(error);
    res.json({ success: false, message: error.message });
  }

};
export { loginUser, registerUser, adminLogin };
