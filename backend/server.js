const app = require("./app");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");
const connectDB = require("./config/database");

// handleing uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to uncaught Exception");

  process.exit(1);
});

//config
dotenv.config({ path: "backend/config/config.env" });

// connecting to database
connectDB(process.env.DB_URI);
cloudinary.config({
  cloud_name: process.env.CLOUDNIRY_NAME,
  api_key: process.env.CLOUDNIRY_API_KEY,
  api_secret: process.env.CLOUDNIRY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

// Unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to Unhandled Promise Rejection");

  server.close(() => {
    process.exit(1);
  });
});
