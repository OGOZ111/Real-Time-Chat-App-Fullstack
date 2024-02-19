import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  // userId is the _id of the user
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    // process.env.JWT_SECRET is a secret key
    expiresIn: "15d", // 15 days
  });

  res.cookie("jwt", token, {
    httpOnly: true, // prevent cookie access from JavaScript
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
    sameSite: "strict", // cookie will only be sent in a first-party context
    secure: process.env.NODE_ENV !== "development", // cookie will only be sent in a secure context
  });
};

export default generateTokenAndSetCookie;
