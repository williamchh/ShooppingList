const mongoose = require("mongoose");
const config = require("config");
const uri = config.get("mongoURI");

const connectDB = () => {
  mongoose.connect(uri, (err) => {
    if (err) {
      console.log("cannot connect to db")
      throw err;
    }
    console.log("Database created!");
  });
};

module.exports = connectDB;