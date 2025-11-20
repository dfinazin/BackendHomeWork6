import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const port = 3000;
const app = express();

app.set("view engine", "ejs");
app.set("views", "pages");

app.get("/", (req, res) => {
  res.render("index");
});

const appointmentDBUrl = process.env.APPOINTMENT_DB_URL;

mongoose.connect(appointmentDBUrl).then(() => {
  app.listen(port, () => {
    console.log(`Server has been started on port ${port}...`);
  });
});
