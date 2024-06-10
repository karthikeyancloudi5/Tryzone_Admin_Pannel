const mongoose = require("mongoose");

const databaseConnection = async () => {
  try {
    console.log(process.env.DB_URI);
    await mongoose.connect(process.env.DB_URI);
    console.log("Database Connected Sucessfully");
  } catch (error) {
    console.log("Database Connection Error:", error);
  }
};

module.exports = databaseConnection;
