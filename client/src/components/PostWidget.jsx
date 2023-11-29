import { Card, CardHeader, Avatar, Box, Grid, IconButton, Typography, CardContent, CardMedia, CardActions, useMediaQuery, Divider } from "@mui/material";
import { FavoriteOutlined, SendOutlined, ChatBubbleOutlineOutlined } from '@mui/icons-material';
import { BASE_URL } from "../config";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";
import { setPost } from "../store";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#ff5722', // Replace with your desired primary color
        },
    },
});


const PostWidget = ({
    postId,
    postUserId,
    name,
    description,
    likes,
    comments,
    picturePath,
    userPicturePath }) => {
    const dispatch = useDispatch();
    const matches = useMediaQuery('(min-width:900px)');
    const matchesMov = useMediaQuery('(max-width:600px)');
    const loggedInUserId = useSelector((state) => state.user._id);
    const loggedInUserPicture = useSelector((state) => state.user.picturePath);
    const commentedUserfName = useSelector((state) => state.user.firstName);
    const commentedUserlName = useSelector((state) => state.user.lastName);
    const token = useSelector((state) => state.token);
    const isliked = Boolean(likes[loggedInUserId]);
    const likedCount = Object.keys(likes).length;
    const [isComments, setIsComments] = useState(false);
    const [comment, setComment] = useState("");

    const commentedUserName = commentedUserfName + " " + commentedUserlName;

    const handleComment = async () => {

        console.log(loggedInUserId)
        await axios.patch(`${BASE_URL}/posts/${postId}/comment`,
            {
                userId: loggedInUserId,
                name: commentedUserName,
                userPicturePath: loggedInUserPicture,
                description: comment
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-type": "application/json"
                }
            }
        ).then((res) => {
            console.log(res.data);

            const updatedPost = res.data;
            dispatch(setPost({ post: updatedPost }));
            console.log(comments);

            setComment("")
        }).catch((error) => {
            console.log(error);
            alert(error.response);
        });
    }


    const patchLike = async () => {
        await axios.patch(`${BASE_URL}/posts/${postId}/like`,
            {
                userId: loggedInUserId
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-type": "application/json"
                }
            }
        ).then((res) => {
            console.log(res.data);
            const updatedPost = res.data;
            dispatch(setPost({ post: updatedPost }));
        }).catch((error) => {
            console.log(error);
            alert(error.response);
        });
    }
    return (

        <Card style={{
            width: '100%',
            padding: '15px 25px',
            minHeight: 200,
            margin: matches ? '40px 0 0 130px' : (matchesMov ? '20px' : '60px'),
        }}>

            <CardHeader
                avatar={
                    <Avatar
                        src={`${BASE_URL}/assets/${userPicturePath}`}
                        alt="User Avatar"
                        aria-label="user-avatar"
                    />
                }

                title={name}
                titleTypographyProps={{ style: { fontSize: '16px', textAlign: 'left' } }}
                style={{ padding: 0 }}




            />
            <CardContent style={{ padding: 0 }}>
                <Typography variant="body2" style={{ textAlign: 'left', margin: '14px 0 10px' }}>
                    {description}
                </Typography>
            </CardContent>

            <CardMedia
                component="img"
                height="auto"
                image={`${BASE_URL}/assets/${picturePath}`}
                alt="Paella dish Alt"
                width="100%"
            />

            <CardActions style={{ padding: 0, display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: '20px', }}>
                    <IconButton aria-label="add to favorites" onClick={patchLike} >
                        <ThemeProvider theme={theme}>
                            <FavoriteOutlined color={isliked ? 'primary' : 'default'} />
                        </ThemeProvider>
                    </IconButton>
                    <Typography style={{ marginTop: '2px' }}>{likedCount}</Typography>
                    <IconButton aria-label="add to favorites" onClick={() => setIsComments(!isComments)}>
                        <ChatBubbleOutlineOutlined />
                    </IconButton>
                    <Typography style={{ margin: 0 }}>{comments.length}</Typography>
                </div>

                <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center' }}>
                    <input type="text" value={comment} placeholder="Write your comment" style={{ padding: '10px', borderRadius: '0.75rem', width: '250px' }} onChange={(e) => setComment(e.target.value)} />
                    <SendOutlined style={{ marginLeft: '10px', cursor: 'pointer' }} onClick={handleComment} />
                </div>

            </CardActions>
            {isComments && (
                <Card style={{ marginTop: "1rem", padding:"1rem 0.75rem 1rem", border:'none'}}>
                    {comments.map((comment, i) => (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 20,marginTop: 10 }}>
                            <img src={`${BASE_URL}/assets/${comment.userPicturePath}`} style={{ width: 30, height: 30, borderRadius: '0.75rem' }} />
                            <Typography>
                                {comment.description}
                            </Typography>

                        </div>
                    ))}
                    
                </Card>
            )}



        </Card>
    );
}

export default PostWidget;