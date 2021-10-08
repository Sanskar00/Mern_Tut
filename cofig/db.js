const mongoose = require("mongoose");
const config = require("require");
const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log("MongoDB Connected...");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
