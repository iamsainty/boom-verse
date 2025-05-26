const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectToMongoDB = require("./config/mongodb");
const userAuthRoutes = require("./routes/userAuth");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectToMongoDB();

app.use("/api/auth", userAuthRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
