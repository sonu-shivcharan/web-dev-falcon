import { configDotenv } from "dotenv";
import app from "./app.js";
import connectDB from "./db/connectDB.js";
configDotenv();

const port = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Example app listening on port http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Mongo db connection failed", error);
  });
