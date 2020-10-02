const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");
require("dotenv").config();

mongoose
  .connect(process.env.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });

//express app
const app = express();
//register view engine
app.set("view engine", "ejs");

app.use(express.static("public"));

//this middleware is used so that so that we can use urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

//mongoose and mongo sandbox routes
// app.get("/add-blog", (req, res) => {
//   //new instance of the blog
//   const blog = new Blog({
//     title: "new blog 2",
//     snippet: "about my new blog",
//     body: "more about my new blog",
//   });

//   blog
//     .save()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// app.get("/all-blogs", (req, res) => {
//   Blog.find()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// app.get("/single-blog", (req, res) => {
//   Blog.findById("5f72f5f922142d0d440fd88d")
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

app.get("/", (req, res) => {
  //   res.sendFile("./files/index.html", { root: __dirname });
  // const blogs = [
  //   { title: "Sagun", snippet: "lorem ipsum dolor sit" },
  //   { title: "Sagun J", snippet: "lorem ipsum dolor sit" },
  //   { title: "Sagun Jaiswal", snippet: "lorem ipsum dolor sit" },
  // ];
  // res.render("index", { title: "Home", blogs: blogs });
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

//blog routes
app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 }) //descending order
    .then((result) => {
      res.render("index", { title: "All Blogs", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/blogs", (req, res) => {
  //we can use req.body here because we have done app.use(express.urlencoded({ extended: true }));
  const blog = new Blog(req.body);
  console.log(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create" });
});

app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("details", { blog: result, title: "Blog Details" });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.delete("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id).then((result) => {
    res.json({
      redirect: "/blogs",
    });
  });
});

app.use((req, res) => {
  res.status(400).render("404", { title: "404" });
});
