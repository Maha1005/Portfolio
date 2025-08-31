const mongoose = require("mongoose");

const contactdb = mongoose.createConnection("mongodb://localhost:27017/contact");

contactdb.on("Connected", () => {
    console.log("Database created");
})

const contactSchema = new mongoose.Schema(
    {
        username: String,
        email: String,
        description:String
    }
) 

const contactModel = contactdb.model("Contact", contactSchema);

module.exports = contactModel;
