const adminCredential = require("../model/adminAuthModel");
const dotenv = require("dotenv");
const databaseConnection = require("../config/database");
const adminSignupData = require("../data/adminSignup.json");

dotenv.config();
databaseConnection();

const adminCredentialSeeder = async () => {
  try {
    await adminCredential.deleteMany();
    console.log("data deleted sucessfully");
    await adminCredential.create(adminSignupData);

    console.log("data added sucessfully");
  } catch (error) {
    console.log("adminCredentialSeeder :", error);
  }
  process.exit();
};

adminCredentialSeeder();
