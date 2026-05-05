const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Signup
router.post("/signup", async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json("User already exists");

        const hashed = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashed });

        await user.save();
        res.json("User created");
    } catch (err) {
        res.status(500).json("Error creating user");
    }
});

// Login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json("User not found");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json("Wrong password");

        const token = jwt.sign({ id: user._id }, "secret");
        res.json({ token, userId: user._id });
    } catch (err) {
        res.status(500).json("Login error");
    }
});

module.exports = router;