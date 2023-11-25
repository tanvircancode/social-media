const express = require("express");
const  authenticateJwtUser  = require('../middleware/auth.js');
const multer = require('multer');
const path = require('path');

const { User } = require('../db/User.js');
const { Post } = require('../db/Post.js');



const app = express();

// file storage
__dirname = 'server';
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

//creating a post
router.post('/createpost', authenticateJwtUser, upload.single("picture"), async (req, res) => {
    const { userId, description, picturePath } = req.body;
    console.log(req.body);
    const user = await User.findById(userId);
    if(user) {
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            userPicturePath: user.picturePath,
            picturePath,
            description,
            likes: {},
            comments: []
        });
        await newPost.save();
    
        const post = await Post.find();
        res.status(201).json(post);
    }else {
        res.status(404).json({message : 'user not found'})
     }
    
});
// end

router.get("/", authenticateJwtUser, async (req, res) => {
    const post = await Post.find();
    if (post) {
        res.status(200).json(post);
    }
    else {
        res.status(404).json({ message: 'Cannot find post' });
    }
})

router.get("/:userId/posts", authenticateJwtUser, async (req, res) => {
    const post = await Post.find({userId : req.params.userId});
    if (post) {
        res.status(200).json(post);
    }
    else {
        res.status(404).json({ message: 'Cannot find post', status: false });
    }
})

router.patch("/:id/like", authenticateJwtUser, async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const liked = post.likes.get(userId);

    if (liked) {
        post.likes.delete(userId)
    } else {
        post.likes.set(userId, true)
    }

    const updatedPost = await Post.findByIdAndUpdate(
        id,
        { likes: post.likes },
        { new: true }
    )
    if (updatedPost) {
        res.status(201).json(updatedPost);
    } else {
        res.status(405).json({ message: "Like Not updated" });
    }


})

module.exports = router;


