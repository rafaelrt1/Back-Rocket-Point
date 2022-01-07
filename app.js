const express = require("express");
const app = express();
const path = require("path");
const port = 5000;
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const logger = require("morgan");
const apiRouter = require("./routes/api");
const cors = require('cors');
require('dotenv').config();
const key = process.env.REACT_APP_API_KEY;
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('./models/user');

app.use(cors());

mongoose.connect("mongodb+srv://rafaelrt1:" + key + "@cluster0.fnrml.mongodb.net/RocketPoint?retryWrites=true&w=majority", {
    useNewUrlParser: true, useUnifiedTopology: true
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", apiRouter);

app.use(logger("dev"));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

function isLogged(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/login');
}

app.use(function (req, res, next) {
    res.status(404).json({ message: "Página não encontrada" });
});

passport.use(User.createStrategy());

module.exports = app;