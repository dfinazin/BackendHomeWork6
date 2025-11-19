import express from "express";

const port = 3000;
const app = express();

app.set("view engine", "ejs");
app.set("views", "pages");

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(port, () => {
  console.log(`Server has been started on port ${port}...`);
});
