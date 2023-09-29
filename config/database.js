const mongoose = require("mongoose");

const configureDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected with ${connection.host}`);
  } catch (error) {
    console.log("Errors in connection with Database", error);
  }
};

module.exports = configureDB;
