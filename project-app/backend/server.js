const express = require("express");
const app = express();

const mongoose = require("mongoose");

const adminAuthRoute = require("./routes/adminAuth");
const userRoute = require("./routes/users");
const laundryRoute = require("./routes/laundry");
const revenueRoute = require("./routes/revenue");
const categoryRoute = require("./routes/category");
const cors = require("cors")

mongoose.connect(
  "mongodb+srv://ojasVirenDighe:ojas070301@ojascluster.x6foh.mongodb.net/Primathink?retryWrites=true&w=majority&ssl=true",
    () => {
    console.log("db connected");
})

app.get("/", (req, res) => {
    res.send("hello")
})

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/api/oauth", adminAuthRoute);
app.use("/api/user", userRoute);
app.use("/api/laundry", laundryRoute);
app.use("/api/revenue", revenueRoute);
app.use("/api/category", categoryRoute);


app.listen("5000", () => {
    console.log("backend is running at 5000 ...")
})
