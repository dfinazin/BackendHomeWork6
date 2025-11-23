import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { addNote } from "./controllers/notes-controller.js";

dotenv.config();

const port = 3000;
const app = express();

app.set("view engine", "ejs");
app.set("views", "pages");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", async (req, res) => {
  try {
    await addNote(req.body.fullName, req.body.phone, req.body.description);
    console.log(req.body.fullName, req.body.phone, req.body.description);
    res.render("index", {
      created: true,
      error: null,
    });
  } catch (error) {
    console.log(error);
    res.render("index", {
      created: false,
      error: `Ошибка сохранения записи к врачу: ${error.message}`,
    });
  }
});

const appointmentDBUrl = process.env.APPOINTMENT_DB_URL;

mongoose.connect(appointmentDBUrl).then(() => {
  app.listen(port, () => {
    console.log(`Server has been started on port ${port}...`);
  });
});
