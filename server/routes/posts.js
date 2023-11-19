const express = require("express");
const { authenticateJwtUser } = require('../middleware/auth')

const { User } = require('../db/User.js');
const { Post }  = require('../db/Post.js');


const router = express.Router();

router.get("/", authenticateJwtUser, async (req, res) => {
    const post = await Post.find();
    if (post) { 
        res.status(200).json(post); 
    }
    else {
        res.status(404).json({ message: 'Cannot find post' });
    }
})

router.patch("/:id/like", authenticateJwtUser, async (req, res) => {
    
})