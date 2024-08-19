import express from "express";
import { render } from "pug";

const app = express();

app.use(express.static("public"));
app.use(express.static("img"));
app.set("view engine", "pug");
app.set("views", "./views");

const workingHoursMiddleware = (req, res, next) => {
  const date = new Date();
  const day = date.getDay();
  const hour = date.getHours();
  if (day >= 1 && day <= 5 && hour >= 9 && hour <= 17) next();
  else {
    res.render("error");
  }
};

app.use(workingHoursMiddleware);

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/home-page", (req, res) => {
  res.render("home");
});

app.get("/services", (req, res) => {
  res.render("our_services");
});

app.get("/contact-us", (req, res) => {
  res.render("contact");
});

const unknownError = (req, res) => {
  res.render("error2");
};
app.use(unknownError);
app.listen(4500, () => {
  console.log("Listening at port 4500");
  //console.log(new Date().toLocaleString());
});
