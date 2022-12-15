const express = require("express");
const { user_Collection, data_Collection } = require("./connector");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
var cors = require("cors");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
const port = process.env.PORT || 5500;
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "public")));

app.use(express.json({ limit: "50mb", extended: true }));
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);
app.use(bodyParser.json({ limit: "200mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "200mb",
    extended: true,
    parameterLimit: 1000000,
  })
);

const dotenv = require("dotenv");

dotenv.config();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");

  next();
});

app.get("/", (req, res) => {
  res.send("Hello Assignments!");
});

// app.use("/upload", require("./routes/uploadFiles.routes"));
app.use("/auth", require("./routes/users.routes"));
// app.use("/files", require("./routes/files.routes"));

app.listen(port, () => {
  console.log(`Dev  listening on port ${port}!`);
});
