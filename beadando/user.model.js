const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

var userSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, requried: true, lowercase: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    admin: { type: Boolean, default: false },
  },
  { collection: "users" }
);

userSchema.pre("save", function (next) {
  const user = this;
  if (user.isModified("password")) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        console.log("Hiba a salt generalas soran");
        return next(err);
      }
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) {
          console.log("Hiba a hasheles soran");
          return next(err);
        }
        user.password = hash;
        return next();
      });
    });
  } else {
    return next();
  }
});

userSchema.methods.comparePasswords = function (password, next) {
  bcrypt.compare(password, this.password, function (err, isMatch) {
    next(err, isMatch);
  });
};

// User modell
const User = mongoose.model("user", userSchema);

module.exports = User;
