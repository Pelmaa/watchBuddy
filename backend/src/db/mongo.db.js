const mongoose = require("mongoose");
const { mongoURI } = require("../config/index");

const connectMongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("MongoDB connection errror: ", err);
    process.exit(1);
  }
};

module.exports = connectMongoDB;
