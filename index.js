import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { addNote } from "./controllers/notes-controller.js";
import { addUser } from "./controllers/users-controllers.js";

dotenv.config();

const port = 3000;
const app = express();

app.set("view engine", "ejs");
app.set("views", "pages");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index", {
    created: false,
    error: null,
  });
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
    res.render("index", {
      created: false,
      error: `Ошибка сохранения записи к врачу: ${error.message}`,
    });
    console.log(error.message);
  }
});

app.get("/adduser", (req, res) => {
  res.render("adduser", {
    created: false,
    error: null,
  });
});
app.post("/adduser", async (req, res) => {
  try {
    await addUser(req.body.email, req.body.password);
    res.render("adduser", {
      created: true,
      error: false,
    });
    console.log(req.body.email, req.body.password);
  } catch (error) {
    res.render("adduser", {
      created: false,
      error: `Ошибка создания учетной записи оператора: ${error.message}`,
    });
  }
});

const appointmentDBUrl = process.env.APPOINTMENT_DB_URL;

mongoose
  .connect(appointmentDBUrl)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server has been started on port ${port}...`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error.message);
    console.log("Starting server without database connection...");
    // Запускаем сервер даже без БД
    app.listen(port, () => {
      console.log(`Server has been started on port ${port} (without DB)...`);
    });
  });
