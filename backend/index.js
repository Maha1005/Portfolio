require('dotenv').config();
const express = require("express");
const cors = require("cors")
const contact = require('./db/contacts')
const User = require('./db/user')
const newUser = require('./db/newUser')
const app = express();
const Admin = require("./db/admin")
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

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.put("/users/:id", async (req, res) => {
  try {
    const { about } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { about },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("Error updating about:", err);
    res.status(500).json({ message: "Server error" });
  }
});

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


app.post("/register/admin", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await Admin.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists!" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ username, email, password: hashedPassword });
    await newAdmin.save();
    res.status(201).json({ message: "Admin Registered successfully" });
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
        role:"user"
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token , role:"user"});
  } catch (err) {
    console.log("Error while Login: " + err);
    res.status(500).json({ error: "Error in Login" });
  }
});

app.post("/login/admin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await Admin.findOne({ email });
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
        role:"admin"
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token,role:"admin" });
  } catch (err) {
    console.log("Error while Login: " + err);
    res.status(500).json({ error: "Error in Login" });
  }
});


// PUT - update a project by index
// Update all projects for a user
app.put("/users/:id/projects", async (req, res) => {
  try {
    const { id } = req.params;
    const { projects } = req.body; // projects should be an array of objects

    if (!Array.isArray(projects)) {
      return res.status(400).json({ error: "Projects must be an array" });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { projects }, // overwrite full array
      { new: true } // return updated user
    );

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// PUT - update a skill by index
app.put("/users/:id/skills", async (req, res) => {
  try {
    const { id } = req.params;
    const { Skills } = req.body; // Skills should be an array

    if (!Array.isArray(Skills)) {
      return res.status(400).json({ error: "Skills must be an array" });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { Skills }, // overwrite full array
      { new: true } // return updated user
    );

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




app.listen(3000, () => {
    console.log("Server is running on the port 3000")
})