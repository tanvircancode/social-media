import { Card, CardHeader, Avatar, IconButton, Typography, CardContent, CardMedia, CardActions, useMediaQuery } from "@mui/material";
import { FavoriteOutlined, ChatBubbleOutlineOutlined } from '@mui/icons-material';
import { BASE_URL } from "../config";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
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
    const loggedInUserId = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const isliked = Boolean(likes[loggedInUserId]);
    const likedCount = Object.keys(likes).length;


    
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      });
      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
    };
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

            <CardActions style={{ padding: 0 }}>

                <IconButton aria-label="add to favorites" onClick={patchLike} >
                    <ThemeProvider theme={theme}>
                        <FavoriteOutlined color={isliked ? 'primary' : 'default'} />
                        {likedCount}
                    </ThemeProvider>
                </IconButton>
                <IconButton aria-label="add to favorites" >
                    <ChatBubbleOutlineOutlined />
                </IconButton>

                {/* <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore> */}
            </CardActions>
            {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Method:</Typography>
                    <Typography paragraph>
                        Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
                        aside for 10 minutes.
                    </Typography>
                    <Typography paragraph>
                        Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
                        medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
                        occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
                        large plate and set aside, leaving chicken and chorizo in the pan. Add
                        pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
                        stirring often until thickened and fragrant, about 10 minutes. Add
                        saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                    </Typography>
                    <Typography paragraph>
                        Add rice and stir very gently to distribute. Top with artichokes and
                        peppers, and cook without stirring, until most of the liquid is absorbed,
                        15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
                        mussels, tucking them down into the rice, and cook again without
                        stirring, until mussels have opened and rice is just tender, 5 to 7
                        minutes more. (Discard any mussels that don&apos;t open.)
                    </Typography>
                    <Typography>
                        Set aside off of the heat to let rest for 10 minutes, and then serve.
                    </Typography>
                </CardContent>
            </Collapse> */}
        </Card>
    );
}

export default PostWidget;