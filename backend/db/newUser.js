const mongoose = require("mongoose");

const newUserdb = mongoose.createConnection("mongodb://localhost:27017/newUser");

newUserdb.on("connected", () => {
    console.log("newUserdb connected");
})


const newUserSchema = new mongoose.Schema({
    username: String,
    email: { type: String, unique: true },
    password:String
})

const newUserModel = newUserdb.model("NewUser", newUserSchema);

module.exports = newUserModel;