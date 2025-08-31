const mongoose = require("mongoose");

const userdb = mongoose.createConnection("mongodb://localhost:27017/user");

userdb.on("connected", () => {
    console.log("DB connected");
})

const userSchema = new mongoose.Schema({
    about: String,
    projects: [{
        projectTitle: String,
        projectDes: String,
        link:String

    }],
    Skills:[String]    
})

const userModel = userdb.model("User", userSchema);

module.exports = userModel;