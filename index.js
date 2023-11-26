const express = require("express");
const morgan = require("morgan");

// Initialize app
const app = express();

// Setup middlewares
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

const data = require('./data')

app.get("/", (req, res) => {
  res.render("index", { 
    title: "Homepage",
    courses: data.courses,
    teachers: data.teachers,
  });
});

app.get("/login", (req, res) => {
  res.render("login", { title: "Login" });
});

app.get("/courses/add", (req, res) => {
  res.render("createCourse", { title: "Create a Course" });
});

app.get("/teachers", (req, res) => {
  res.render("teachers", { 
    title: "Teachers",
    teachers: Object.keys(data.teachers).map(k => data.teachers[k]),
  });
});


// Listen on port 3000
app.listen(3000);

app.use((req, res) => {
  res.status(404).render("404", { title: "404 Not Found" });
});
