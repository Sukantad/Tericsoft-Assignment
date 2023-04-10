const express = require("express");
const ConnectionFn = require("./config/db");
const { userroute } = require("./Controllers/userController");
const cors = require("cors");
const app = express();


app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3050;

app.use("/", userroute);


app.get("*", (req, res) => {
  res.send("Not found");
});

app.listen(PORT, () => {
  try {
    ConnectionFn();
    console.log("listening PORT");
  } catch (error) {
    console.log("error");
  }
});
