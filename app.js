const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(
  session({
    secret: " this is secret.",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/sipDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", (req, res) => {
  res.render("s1sip");
});

// app.post("/input", (req, res) => {
//   res.send(req.body);
// });

app.get("/page", (req, res) => {
  if (req.isAuthenticated()) res.render("s2sip");
  else res.redirect("/");
});

app.post("/savedetails", (req, res) => {
  User.register({ username: req.body.username, active: false }, req.body.password, (err, user) => {
    if (err) res.send(err);
    else {
      passport.authenticate("local")(req, res, () => {
        res.redirect("/page");
      });
    }
  });
});

app.post("/login", (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.bodypassword,
  });

  req.login(user, (err) => {
    if (err) {
      console.log(err);
      res.redirect("/");
    } else {
      passport.authenticate("local")(req, res, () => {
        res.redirect("/page");
      });
    }
  });
});

app.listen("3001", () => {
  console.log("server is up and running");
});
