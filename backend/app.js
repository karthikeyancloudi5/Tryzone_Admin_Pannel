const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
const cookieParser = require("cookie-parser");
const fileUploads = require("express-fileupload");
const adminAuthRouter = require("./routers/adminAuthRouter");
const userModuleRouter = require("./routers/userModuleRoutes");
const generalInfoRouter = require("./routers/settingsRouter/general_infoRouter");
const mailConfigRouter = require("./routers/settingsRouter/mailConfigRouter");
const productCategoryRouter = require("./routers/product/categoryRouter");
const productsRouter = require("./routers/product/productRouter");
const sliderRouter = require("./routers/master/sliderRouter");
const blogCategoryRouter = require("./routers/master/blogCategory");
const blogRouter = require("./routers/blogRouter");

dotenv.config({ path: path.join(__dirname, ".env") });

app.use(express.json());
app.use(cookieParser());
app.use(fileUploads());

app.use("/api", adminAuthRouter);
app.use("/api", userModuleRouter);
app.use("/api", generalInfoRouter);
app.use("/api", mailConfigRouter);
app.use("/api", productCategoryRouter);
app.use("/api", productsRouter);
app.use("/api", sliderRouter);
app.use("/api", blogCategoryRouter);
app.use("/api", blogRouter);

module.exports = app;
