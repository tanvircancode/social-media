
const express = require("express");
const {authenticateJwtUser} = require('../middleware/auth')

const { User } = require('../db/User.js');

const router = express.Router();

router.get("/:id" , authenticateJwtUser ,  async (req, res) => {
    const user = await User.findById(req.params.id);
    if(user) {
        res.status(200).json(user);
    }
    else {
        res.status(403).json({ message: "user not found!!" });
    }
})

module.exports = router
