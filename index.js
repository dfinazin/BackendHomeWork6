import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { addNote, getNotes } from "./controllers/notes-controller.js";
import { addUser, loginUser } from "./controllers/users-controllers.js";
import cookieParser from "cookie-parser";
import { mapUser } from "./helpers/map-user.js";
import { authenticated } from "./middlewares/authenticated.js";
import { hasRole } from "./middlewares/has-role.js";
import * as ROLES from "./constants/roles.js";

dotenv.config();

const port = 3000;
const app = express();

app.set("view engine", "ejs");
app.set("views", "pages");

app.use(express.json());
app.use(cookieParser());
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
    res.render("index", {
      created: true,
      error: null,
    });
  } catch (error) {
    res.render("index", {
      created: false,
      error: `Ошибка сохранения записи к врачу: ${error.message}`,
    });
  }
});

app.get("/login", (req, res) => {
  res.render("login", {
    created: false,
    error: null,
  });
});

app.post("/login", async (req, res) => {
  try {
    const { user, tocken } = await loginUser(req.body.email, req.body.password);
    res.cookie("tocken", tocken, { httpOnly: true }).redirect("/notes");
  } catch (error) {
    res.render("login", {
      created: false,
      error: `Ошибка входа: ${error.message}`,
    });
  }
});

app.get("/error", (req, res) => {
  const errorData = req.query.error
    ? decodeURIComponent(req.query.error)
    : "Неизвестная ошибка";

  res.render("error", {
    error: errorData,
  });
});

app.get("/logout", (req, res) => {
  res.clearCookie("tocken").redirect("/login");
});

app.use(authenticated);

app.get("/adduser", hasRole([ROLES.ADMIN]), async (req, res) => {
  try {
    res.render("adduser", {
      created: false,
      error: null,
    });
  } catch (error) {
    res.render("adduser", {
      created: false,
      error: `Ошибка создания учетной записи оператора: ${error.message}`,
    });
  }
});

app.post("/adduser", async (req, res) => {
  try {
    await addUser(req.body.email, req.body.password);
    res.render("adduser", {
      created: true,
      error: false,
    });
  } catch (error) {
    res.render("adduser", {
      created: false,
      error: `Ошибка создания учетной записи оператора: ${error.message}`,
    });
  }
});

app.get("/notes", async (req, res) => {
  try {
    const notes = await getNotes();
    console.log(notes);
    res.render("notes", {
      created: false,
      error: null,
    });
  } catch (error) {
    res.render("notes", {
      created: false,
      error: `Ошибка получения записей: ${error.message}`,
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
