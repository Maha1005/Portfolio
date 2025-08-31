require('dotenv').config();
const express = require("express");
const cors = require("cors")
const contact = require('./db/contacts')
const User = require('./db/user')
const newUser = require('./db/newUser')
const app = express();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Set JWT_SECRET with fallback
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";

app.use(cors());
app.use(express.json());

app.post('/contacts', async (req, res) => {
    const { username, email, description } = req.body;
    try {
        const newContact = new contact({ username, email, description })
        await newContact.save();
        res.status(201).json({message:"Contact registered successfully"})
    } catch (err) {
        console.log("Error in inserting the user: " + err);
        res.status(500).json({ error: "Error in inserting the contact" });
    }
})

app.get('/users', async (req, res) => {
    try {
        const user = await User.find();
        res.status(200).json(user); 
    }
    catch (err) {
        console.log("Error in fetching the data: " + err);
        res.status(500).json({ error: "Error in fetching the data" });
    }
})

app.get("/dashboard", async (req, res) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ error: "Token not provided" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Error while verifying the user" });
    }

    res.status(200).json({
      message: "Welcome to your portfolio",
      id: decoded.id,
    });
  });
});

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await newUser.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists!" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new newUser({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User Registered successfully" });
  } catch (err) {
    console.log("Error while SignUp: " + err);
    res.status(500).json({ error: "Error in SignUp" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await newUser.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ error: "User not found" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid Password" });
    }
    const token = jwt.sign(
      {
        id: existingUser._id,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (err) {
    console.log("Error while Login: " + err);
    res.status(500).json({ error: "Error in Login" });
  }
});

app.listen(3000, () => {
    console.log("Server is running on the port 3000")
})