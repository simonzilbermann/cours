const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
//טעינת משתני הסביבה לתוך אובייקט במערכת
require("dotenv").config();


console.log(process.env.EMAIL);
console.log(process.env.PASS);
const UserRouter = require("./api/v1/routes/user");

const path = require("path"); //מקבלת נתיב יחסי ןמחזירה נתיב אפסולותי
const fs = require("fs");
const hbs = require("hbs");

hbs.registerPartials(path.join(__dirname, "views", "partials"));

app.set("views", path.join(__dirname, "views")); //מחילה את מסתרפגים שלי

app.use("/public", express.static("public"));
//מנואה תצוגות של תפלאתים
app.set("view engine", "hbs");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

//טעינת מחרוזת ההתחברות מתוך משתנה הסביבה
const uri = process.env.MONGO_CONN_STR;
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("mongo db connected");
  });

app.use("/user", UserRouter);

app.get("/", (req, res) => {
  res.render("register");
});

// app.get("/", (req, res) => {
//   res.render("home");
// });
//הגדרת נקודת קצה סופית עבור שגיאת 404 כתובת לא נמצאה
app.all("*", (req, res) => {
  res.render("404");
});

module.exports = app;
