import userSchema from "../model/user-model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client("YOUR_GOOGLE_CLIENT_ID");

export const signup = async (req, res) => {
  try {
    const newUser = new userSchema(req.body);

    const { email, password } = newUser;
    const hashedpassword = await bcrypt.hash(password, 10);

    const existingUser = await userSchema.findOne({ email });

    newUser.password = hashedpassword;

    if (existingUser) {
      res.status(200).json({ message: "User already exists" });
    } else {
      const savedUser = await newUser.save();
      res.status(201).json({ message: "User created successfully", savedUser });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );
    res.status(200).json({
      message: "Logged in successfully",
      token,
      refreshToken,
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const get = async (req, res) => {
  try {
    const user = await userSchema.find();
    res.status(200).json(user);
  } catch (error) {
    console.log("error :-", error);
  }
};

export const refreshTokenHandler = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(400).json({ message: "Refresh token is required" });
  }
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const userId = decoded.userId;
    const user = await userSchema.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const accessToken = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    res.status(200).json({ access_token: accessToken });
  } catch (error) {
    console.log("error: ", error);
    return res.status(400).json({ message: "Invalid refresh token" });
  }
};

export const googleLogin = async (req, res) => {
  const { token } = req.body;
 
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    console.log("Ticker: ", ticket);
    const payload = ticket.getPayload();
    const email = payload.email;
    const firstname = payload.given_name || payload.name?.split(" ")[0] || "User";
    const lastname = payload.family_name || payload.name?.split(" ")[1] || "";
    const existingUser = await userSchema.findOne({ email });
    if (existingUser) {
      const token = jwt.sign({ userId: existingUser._id },process.env.SECRET_KEY,{
          expiresIn: "1h",
        }
      );
      return res.status(200).json({message: "Logged in successfully!",token,data: existingUser,
      });
    } else {
      const newUser = new userSchema({
        firstname,
        lastname,
        email,
        password: null, 
      });
      const savedUser = await newUser.save();
      const token = jwt.sign({ userId: savedUser._id }, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });
      return res.status(201).json({ 
        message: "User created successfully",token,data: savedUser
      });
    }
  } catch (error) {
    console.log("Error during Google login:", error);
    res.status(500).json({ message: error.message });
  }
};
