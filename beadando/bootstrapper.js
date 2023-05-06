const mongoose = require("mongoose");
const User = require("./user.model");
const userModel = mongoose.model("user");

async function ensureAdminExists() {
  try {
    const admin = await userModel.findOne({ admin: true });
    if (admin) {
      console.log("Az admin felhasználó már megtalálható az adatbázisban!");
    } else {
      const newAdmin = new userModel({
        username: "admin",
        password: "admin123",
        admin: true,
        email: "admin@admin.hu",
      });
      await newAdmin.save();
      console.log("Az admin felhasználó sikeresen létrehozva!");
    }
  } catch (error) {
    console.error(
      "Hiba történt az admin ellenőrzése vagy létrehozása során: ",
      error
    );
  }
}

async function ensureUserExists() {
  try {
    const user = await userModel.findOne({ username: "user" });
    if (user) {
      console.log("A felhasználó már megtalálható az adatbázisban!");
    } else {
      const newUser = new userModel({
        username: "user",
        password: "1234",
        email: "user@freemail.hu",
        admin: false,
      });
      await newUser.save();
      console.log("A felhasználó sikeresen létrehozva!");
    }
  } catch (error) {
    console.error(
      "Hiba történt az felhasználó ellenőrzése vagy létrehozása során: ",
      error
    );
  }
}

module.exports = ensureAdminExists;
module.exports = ensureUserExists;
