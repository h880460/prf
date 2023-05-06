const express = require("express");
const router = express.Router();
// const fs = require('fs');
const passport = require("passport");

const mongoose = require("mongoose");
const productModel = mongoose.model("product");
const userModel = mongoose.model("user");

router.route("/login").post((req, res, next) => {
  if ((req.body.username, req.body.password)) {
    passport.authenticate("local", function (error, user) {
      if (error) return res.status(500).send(error);
      req.login(user, (error) => {
        if (error) return res.status(500).send(error);
        return res
          .status(200)
          .send({ msg: "Bejelentkezes sikeres", isAdmin: user.admin });
      });
    })(req, res, next);
  } else {
    return res.status(400).send("Hibas keres, username es password kell");
  }
});

router.route("/logout").post((req, res, next) => {
  if (req.isAuthenticated()) {
    req.logout((err) => {
      if (err) {
        console.log("Hiba a kijelentkezés során");
        return res.status(500).send(err);
      }
      return res.status(200).send("Kijelentkezes sikeres");
    });
  } else {
    return res.status(403).send("Nem is volt bejelentkezve");
  }
});

router.route("/status").get((req, res, next) => {
  if (req.isAuthenticated()) {
    return res.status(200).send(req.user);
  } else {
    return res.status(403).send("Nem is volt bejelentkezve");
  }
});

router.route("/user/makeAdmin").put((req, res, next) => {
  userModel.findOne({ username: req.body.username }, (err, user) => {
    if (err) return res.status(500).send("DB hiba");
    if (user.admin) {
      user.admin = false;
      user.save((error) => {
        if (error)
          return res.status(500).send("A frissites soran problema tortent");
        return res
          .status(200)
          .send(user.username + " megszűnt az admin jogosultsága");
      });
    } else if (!user.admin) {
      user.admin = true;
      user.save((error) => {
        if (error)
          return res.status(500).send("A frissites soran problema tortent");
        return res
          .status(200)
          .send(user.username + " kapott admin jogosultságot");
      });
    } else {
      return res.status(400).send("Nincs ilyen user az adatbazisban");
    }
  });
});

router
  .route("/user")
  .get((req, res, next) => {
    userModel.find({}, (err, users) => {
      if (err) return res.status(500).send("DB hiba");
      res.status(200).send(users);
    });
  })
  .post((req, res, next) => {
    if (req.body.username && req.body.email && req.body.password) {
      userModel.findOne({ username: req.body.username }, (err, user) => {
        if (err) return res.status(500).send("DB hiba");
        if (user) {
          return res.status(400).send("Hiba, mar letezik ilyen felhasznalo");
        }
        const usr = new userModel({
          username: req.body.username,
          password: req.body.password,
          email: req.body.email,
        });
        usr.save((error) => {
          if (error)
            return res.status(500).send("A mentés során probléma történt");
          return res.status(200).send("Sikeres volt a mentes");
        });
      });
    } else {
      return res
        .status(400)
        .send("Hibas keres, username, email vagy password kell");
    }
  })
  .put((req, res, next) => {
    if (req.body.username && req.body.email && req.body.password) {
      userModel.findOne({ username: req.body.username }, (err, user) => {
        if (err) return res.status(500).send("DB hiba");
        if (user) {
          user.name = req.body.name;
          user.password = req.body.password;
          user.description = req.body.description;
          user.admin = req.body.admin;
          user.save((error) => {
            if (error)
              return res.status(500).send("A frissites soran problema tortent");
            return res.status(200).send("Sikeres volt a frissites");
          });
        } else {
          return res.status(400).send("Nincs ilyen id az adatbazisban");
        }
      });
    } else {
      return res.status(400).send("Nem volt id vagy value");
    }
  })
  .delete((req, res, next) => {
    if (req.body.username) {
      userModel.findOne({ username: req.body.username }, (err, user) => {
        if (err) return res.status(500).send("DB hiba");
        if (user) {
          user.delete((error) => {
            if (error)
              return res
                .status(500)
                .send("A felhasznalo torles soran problema tortent");
            return res.status(200).send("Sikeres volt a felhasznalo torlese");
          });
        } else {
          return res
            .status(400)
            .send("Nincs ilyen felhasznalo az adatbazisban");
        }
      });
    } else {
      return res.status(400).send("Nem volt ilyen felhasznalo");
    }
  });

router
  .route("/product")
  .get((req, res, next) => {
    productModel.find({}, (err, products) => {
      if (err) return res.status(500).send("DB hiba");
      res.status(200).send(products);
    });
  })
  .post((req, res, next) => {
    if (req.body.id && req.body.name && req.body.description) {
      productModel.findOne({ id: req.body.id }, (err, product) => {
        if (err) return res.status(500).send("DB hiba");
        if (product) {
          return res.status(400).send("már van ilyen id");
        } else {
          const product = new productModel({
            id: req.body.id,
            name: req.body.name,
            description: req.body.description,
          });
          product.save((error) => {
            if (error)
              return res.status(500).send("A mentés során probléma történt");
            return res.status(200).send("Sikeres volt a mentes");
          });
        }
      });
    } else {
      return res.status(400).send("Nem volt id vagy value");
    }
  })
  .put((req, res, next) => {
    if (req.body.id && req.body.name && req.body.description) {
      productModel.findOne({ id: req.body.id }, (err, product) => {
        if (err) return res.status(500).send("DB hiba");
        if (product) {
          product.name = req.body.name;
          product.description = req.body.description;
          product.save((error) => {
            if (error)
              return res.status(500).send("A frissites soran problema tortent");
            return res.status(200).send("Sikeres volt a frissites");
          });
        } else {
          return res.status(400).send("Nincs ilyen id az adatbazisban");
        }
      });
    } else {
      return res.status(400).send("Nem volt id vagy value");
    }
  })
  .delete((req, res, next) => {
    if (req.body.id) {
      productModel.findOne({ id: req.body.id }, (err, product) => {
        if (err) return res.status(500).send("DB hiba");
        if (product) {
          product.delete((error) => {
            if (error)
              return res.status(500).send("A torles során probléma történt");
            return res.status(200).send("Sikeres volt a torles");
          });
        } else {
          return res.status(400).send("Nincs ilyen id az adatbazisban");
        }
      });
    } else {
      return res.status(400).send("Nem volt id");
    }
  });

async function getProduct(req, res, next) {
  try {
    product = await productModel.findOne(req.body.id);
    console.log(req.body.id);
    if (product == null) {
      return res.status(404).json({ message: "A termék nem található" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.product = product;
  next();
}

// DELETE /product/:id - egy termék törlése az id alapján
router.post("/product/delete", (req, res, next) => {
  if (req.body.id) {
    productModel.findOne({ id: req.body.id }, (err, product) => {
      if (err) return res.status(500).send("DB hiba");
      if (product) {
        product.delete((error) => {
          if (error)
            return res.status(500).send("A torles során probléma történt");
          return res.status(200).send("Sikeres volt a torles");
        });
      } else {
        return res.status(400).send("Nincs ilyen id az adatbazisban");
      }
    });
  } else {
    return res.status(400).send("Nem volt id");
  }
});

module.exports = router;
