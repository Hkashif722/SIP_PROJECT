const express = require("express");
const ejs = require("ejs");
const varCalc = require(__dirname + "/variable.js");
const constCalc = require(__dirname + "/constant");
const rel_Value = require(__dirname + "/relativeCValue");

const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
require("dotenv").config();
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

mongoose.connect(
  `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.q38bu.mongodb.net/sipDB`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

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

app.post("/input", async (req, res) => {
  let value = req.body;
  let calValue = varCalc.variable(
    value.v1,
    value.v2,
    value.v3,
    value.v4,
    value.v5
  );
  if (calValue.vout > 0 && calValue.voutTo > 0) {
    let c = await rel_Value.relativeValue(calValue.c);
    calValue.c = c;
    res.render("VP317", { c_Values: calValue });
  } else if (calValue.vout < 0 && calValue.voutTo < 0) {
    let c = await rel_Value.relativeValue(calValue.c);
    calValue.c = c;
    res.render("VN337", { c_Values: calValue });
  } else {
    let c_1 = await rel_Value.relativeValue(calValue.v_psv.c);
    calValue.v_psv.c = c_1;
    let c_2 = await rel_Value.relativeValue(calValue.v_psv.c);
    calValue.v_neg.c = c_2;
    res.render("VCOMB", { c_Values: calValue });
  }
});

app.post("/inputa", async (req, res) => {
  let value = req.body;
  let calvalue = constCalc.constant(value.c1, value.c2, value.c3, value.c4);
  let v_out = calvalue.vout;

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
      let c = await rel_Value.relativeValue(calvalue.c);
      calvalue.c = c;
      res.render("CP78", { c_Values: calvalue });
    } else {
      let c = await rel_Value.relativeValue(calvalue.c);
      calvalue.c = c;
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
      let c = await rel_Value.relativeValue(calvalue.c);
      calvalue.c = c;
      res.render("CN79", { c_Values: calvalue });
    } else {
      let c = await rel_Value.relativeValue(calvalue.c);
      calvalue.c = c;
      res.render("CN337", { c_Values: calvalue });
    }
  }
});

app.get("/page", (req, res) => {
  if (req.isAuthenticated()) res.render("s2sip");
  else res.redirect("/");
});

app.post("/savedetails", (req, res) => {
  User.register(
    { username: req.body.username, active: false },
    req.body.password,
    (err, user) => {
      if (err) res.send(err);
      else {
        passport.authenticate("local")(req, res, () => {
          res.redirect("/page");
        });
      }
    }
  );
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
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("/");
});

app.listen("3000", () => {
  console.log("server is up and running");
});
