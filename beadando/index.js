const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const expressSession = require("express-session");

const path = require("path");

const app = express();
const port = process.env.PORT || 3000;
const dbUrl = ""; // ide kell az URL

mongoose.connect(dbUrl);

mongoose.connection.on("connected", () => {
  console.log("db csatlakoztatva");
  require("./bootstrapper")();
});

mongoose.connection.on("error", (err) => {
  console.log("Hiba tortent", err);
});

require("./product.model");
require("./user.model");

const userModel = mongoose.model("user");

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(expressSession({ secret: "prf2023", resave: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  "local",
  new localStrategy(function (username, password, done) {
    userModel.findOne({ username: username }, function (err, user) {
      // Felhasználó keresése az adatbázisban a felhasználónév alapján
      if (err) return done("Hiba lekeres soran", null);
      // Hiba kezelése az adatbázis lekérdezésekor
      if (!user) return done("Nincs ilyen felhasználónév", null);
      // Ellenőrzés, hogy létezik-e a felhasználó
      user.comparePasswords(password, function (error, isMatch) {
        // Felhasználó által megadott jelszó ellenőrzése
        if (error) return done(error, false);
        // Hiba kezelése, ha nem sikerült összehasonlítani a jelszavakat
        if (!isMatch) return done("Hibas jelszo", false);
        // Sikeres belépés esetén felhasználó visszaadása
        return done(null, user);
      });
    });
  })
);

passport.serializeUser(function (user, done) {
  if (!user) return done("nincs megadva beléptethető felhasználó", null);
  // Felhasználó bejelentkezését követően a felhasználó azonosítójának eltárolása sessionben
  return done(null, user);
});

passport.deserializeUser(function (user, done) {
  if (!user) return done("nincs user akit kiléptethetnénk", null);
  // Felhasználó kiléptetése után a felhasználó azonosítójának eltávolítása
  return done(null, user);
});

// app.get("/", (_req, res, next) => {
//   res.send("Hello World!");
// });

/* Az express.static() metódusban meg kell adnunk azt a mappát, amelyből a statikus fájlokat kiszolgáljuk. */
app
  .use(express.static(path.join(__dirname, "public")))
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "ejs")
  .get("/", (req, res) => res.render("pages/index"));

app.use("/", require("./routes"));
app.use("/secondary", require("./routes"));

app.use((_req, res, _next) => {
  console.log("Ez a hibakezelo");
  res.status(404).send("A kert eroforras nem talalhato");
});

app.listen(port, () => {
  console.log("The server is running!");
});
