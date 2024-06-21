const mongoose = require("mongoose");

const databaseConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Database Connected Sucessfully");
  } catch (error) {
    console.log("Database Connection Error:", error);
  }
};

module.exports = databaseConnection;
