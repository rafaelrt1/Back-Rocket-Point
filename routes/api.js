const express = require("express");
const Product = require("../models/product");
const router = express.Router();
const User = require("../models/user");
const passport = require('passport');

/* GET lista de produtos */
router.get("/products", async (req, res, next) => {
  try {
    let result = await Product.find().sort({ "name": 1 }).exec();
    res.json(result);
  } catch (e) {
    console.error(e);
  }
});

/* GET produto por nome */
router.get("/products/search", async (req, res, next) => {
  try {
    let product = req.query.product;
    let result = await Product.find({ name: { $regex: product, $options: "i" } }).limit(10);
    res.json(result);
  } catch (e) {
    console.error(e);
  }
});

/* GET produto por id */
router.get('/details/:id', async function (req, res, next) {
  try {
    let result = await Product.findById(req.params.id);
    res.json(result)
  }
  catch (e) {
    res.status(404).json({ error: "Página não encontrada" });
    console.error(e);
  }
});

/* POST registrar usuário */
router.post('/register', async function (req, res, next) {
  console.log("Registrar");
  console.log(req.query)
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    cellphone: req.body.cellphone,
    cep: req.body.cep,
    city: req.body.city,
    email: req.body.email,
    address: req.body.address,
    number: req.body.number,
    username: req.body.username,
  });
  await User.register(newUser, req.body.password);
  return res.send({ "message": "Success" });
});

/* POST login usuário */
router.post('/login', async function (req, res, next) {
  await passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) {
      res.send({ "message": "Fail", "user": user })
    }
    req.logIn(user, function (err) {
      if (err) { return next(err); }
      return res.send({ "message": "Success" });
    });
  })(req, res, next);
})

module.exports = router;