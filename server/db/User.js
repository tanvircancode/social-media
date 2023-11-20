const mongoose = require("mongoose");

//defining mongoose scehmas
const userSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    password: { type: String },
    picturePath: { type: String },
  });

  const User = mongoose.model("User", userSchema); 


  module.exports = {
    User
  }