const express = require("express");
const ejs = require("ejs");
const varCalc = require(__dirname + "/variable.js");
const constCalc = require(__dirname + "/constant");

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

mongoose.connect("mongodb+srv://Vanillachoco7:V7QAwQe9UAKsh2F@cluster0.q38bu.mongodb.net/sipDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const valueSchema = {
  value: Number,
};

const Value = mongoose.model("Value", valueSchema);
// let x = Number(1350);
// Value.find((err, docs) => {
//   //console.log(docs);
//   //console.log(varCalc.absValue(docs, x));
// });

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", (req, res) => {
  res.render("s1sip");
  // Value.find((err, docs) => {
  //   res.send(docs);
  // });
});

app.post("/input", (req, res) => {
  let value = req.body;
  let calValue = varCalc.variable(value.v1, value.v2, value.v3, value.v4, value.v5);
  if (calValue.vout > 0 && calValue.voutTo > 0) res.render("VP317", { v1: calValue });
  else if (calValue.vout < 0 && calValue.voutTo < 0) res.render("VN337");
  else res.render("VCOMB");
});

app.post("/inputa", (req, res) => {
  let value = req.body;
  let calvalue = constCalc.constant(value.c1, value.c2, value.c3, value.c4);
  let v_out = calvalue.vout;
  console.log(calvalue);
  // +ve 7800
  if (v_out > 0) {
    if (
      v_out === 5 ||
      v_out === 6 ||
      v_out === 8 ||
      v_out === 9 ||
      v_out === 10 ||
      v_out === 12 ||
      v_out === 15 ||
      v_out === 18 ||
      v_out === 24
    ) {
      res.render("CP78", { c_Values: calvalue });
    } else {
      res.render("CP317", { c_Values: calvalue });
    }
  } else {
    if (
      v_out === -5 ||
      v_out === -8 ||
      v_out === -15 ||
      v_out === -9 ||
      v_out === -10 ||
      v_out === -12 ||
      v_out === -18
    ) {
      res.render("CN79", { c_Values: calvalue });
    } else {
      res.render("CN337", { c_Values: calvalue });
    }
  }
});

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

app.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("/");
});

app.listen("3000", () => {
  console.log("server is up and running");
});
