const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');

const { User } = require('../db/User.js');

const app = express();
// file storage
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/assets')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage });
// end

const router = express.Router();

router.post("/register", upload.single("picture"), async (req, res) => {

    const { firstName,
        lastName,
        email,
        password,
        picturePath } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        res.status(403).json({ message: "Email already exists" });
    }
    else {

        const hash = await bcrypt.hash(password, 10);
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hash,
            picturePath
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }

});


router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        const result = await bcrypt.compare(password, user.password);
        if (!result) {
            return res.status(400).json({ message: "Invalid credentials." });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" })
        res.status(200).json({ token, user });
    } else {
        res.status(403).json({ message: "User does not exist." });
    }
});

module.exports = router