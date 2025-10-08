const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    console.log("MONGO_URI:", process.env.MONGO_URL);
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Connected To Mongodb ${mongoose.connection.host}`.bgGreen.white
    );
  } catch (error) {
    console.log(`Mongodb Error ${error}`);
  }
};

module.exports = connectDB;
