const mongoose = require("mongoose");

const connectDB = (URI) => {
  mongoose.connect(URI, {}).then((data) => {
    console.log(`MongoDB Connected with Server: ${data.connection.host}`);
  });
};

module.exports = connectDB;
