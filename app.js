const express = require("express");
//express app
const app = express();
//register view engine
app.set("view engine", "ejs");
app.listen(3000);
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
