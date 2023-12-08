

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const { fileURLToPath } = require('url');
const {authenticateJwtUser} = require("./middleware/auth.js");
const authRoutes = require('./routes/auth.js')
const userRoutes = require('./routes/users.js')
const postRoutes = require('./routes/posts.js')
const {User} = require('./db/User.js');
const {Post} = require('./db/Post.js');
const {users, posts} = require('./data/index.js');





dotenv.config();

const app = express();

app.use(express.json());
app.use(cors(
    {
        origin: ["https://social-media-frontend-zeta.vercel.app/"],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    }
));
app.use(helmet());
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(morgan('common'));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));


// files related routes


// particular routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

// Connection
const PORT = process.env.PORT || 6001;
mongoose.connect(
    process.env.MONGO_URL,
    
);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);

    // User.insertMany(users);
    // Post.insertMany(posts);
  });