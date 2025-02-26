import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

// User Registration
export const register = async (req, res, next) => {
  try {
    const { name, email, password, role, contact } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    user = new User({ name, email, password, role, contact });
    await user.save();

    res.status(201).send();
  } catch (error) {
    next(error);
  }
};

// User Login
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    generateToken(user._id, user.role, res);

    // Send token as an HTTP-only cookie (optional)
    // res.cookie("jwt", token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production", // Secure in production
    //   sameSite: "strict",
    //   maxAge: 3600000, // 1 hour
    // });

    res.status(200).json( user );
  } catch (error) {
    next(error);
  }
};

// User Logout
export const logout = async (req, res, next) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0), // Expire the cookie
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};

// check auth
export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in auth controller in checkAuth", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
