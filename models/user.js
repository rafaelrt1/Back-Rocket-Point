const mongoose = require("mongoose");
const { Schema } = mongoose;
const passportLocalMongoose = require('passport-local-mongoose');

/* passport adiciona automaticamente os campos username, salt e hash, utilizados para valiação de login */
const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    cellphone: Number,
    cep: Number,
    city: String,
    email: String,
    address: String,
    number: String
})
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("user", UserSchema, "user");