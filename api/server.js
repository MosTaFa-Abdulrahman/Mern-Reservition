const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const roomRoute = require("./routes/room");
const hotelRoute = require("./routes/hotel");

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:4000", "http://localhost:3000"],
    credentials: true,
  })
);

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Work ☻"))
  .catch((err) => console.log(`Error ${err}`));

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/room", roomRoute);
app.use("/api/hotel", hotelRoute);

app.listen(5000, () => console.log("Server Running ☻"));
