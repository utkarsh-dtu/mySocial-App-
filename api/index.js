const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
var cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = 8800;

dotenv.config();

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);
// multer is a nodejs middleware for files
// middleware
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(cors());
app.use(express.json()); // body parser
app.use(helmet());
app.use(morgan("common"));

// create a multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
    console.log("hereefnklsef");
    // cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File Uploaded successfully");
  } catch (error) {
    console.log(error);
  }
});

const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.listen(PORT, () => {
  console.log(`Backend server is running at port ${PORT}`);
});
