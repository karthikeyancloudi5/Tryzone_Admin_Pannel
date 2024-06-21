const app = require("./app");
const databaseConnection = require("./config/database");

databaseConnection();
 
app.listen(process.env.PORT, () => {
  try {
    console.log(
      `server connected sucessfully and running in port ${process.env.PORT}`
    );
  } catch (error) {
    console.log("server connection error:", error);
  }
});
