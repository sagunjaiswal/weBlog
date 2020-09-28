const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dbURI = process.env.mongoURI;
mongoose.connect();
//express app
const app = express();
//register view engine
app.set("view engine", "ejs");
app.listen(3000);

app.use(express.static("public"));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  //   res.sendFile("./files/index.html", { root: __dirname });
  const blogs = [
    { title: "Sagun", snippet: "lorem ipsum dolor sit" },
    { title: "Sagun J", snippet: "lorem ipsum dolor sit" },
    { title: "Sagun Jaiswal", snippet: "lorem ipsum dolor sit" },
  ];
  res.render("index", { title: "Home", blogs: blogs });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});
app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create" });
});
app.use((req, res) => {
  res.status(400).render("404", { title: "404" });
});
