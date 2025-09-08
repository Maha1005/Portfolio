const mongoose = require("mongoose");

const admindb = mongoose.createConnection("mongodb://localhost:27017/admin");

admindb.on("connected", () => {
    console.log("admindb connected");
})


const adminSchema = new mongoose.Schema({
    username: String,
    email: { type: String, unique: true },
    password:String
})

const adminModel = admindb.model("admin", adminSchema);

module.exports = adminModel;