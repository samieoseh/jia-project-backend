const connect = async () => {
    const mongoose = require("mongoose");
    const connectURL = "mongodb://localhost:27017";
    const databaseName = "riskProMaxDB";
    try {
      await mongoose.connect(connectURL, { dbName: databaseName });
      console.log("Connected Successfully");
    } catch (error) {
      console.log("Unable to connect to database", error);
    }
  };
  connect();