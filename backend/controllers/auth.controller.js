import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
  // Signup controller
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body; // Destructure fullName, username, password, confirmPassword, and

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    } // If the password and confirmPassword don't match, then return an error

    const user = await User.findOne({ username }); // Check if the username already exists

    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    } // If the username already exists, then return an error

    // HASH PASSWORD HERE
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // https://avatar-placeholder.iran.liara.run/

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullName: fullName,
      username: username,
      password: hashedPassword,
      gender: gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      // Generate JWT token here
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  // Login controller
  try {
    const { username, password } = req.body; // Destructure username and password from req.body

    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(
      // Compare the password with the hashed password
      password,
      user?.password || "" // If user is null, then user.password will be null, so we use "" as a fallback
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate JWT token here

    generateTokenAndSetCookie(user._id, res); // Generate JWT token and set it in a cookie

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  // Logout controller
  try {
    res.cookie("jwt", "", { maxAge: 0 }); // Clear the cookie by setting its maxAge to 0
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
