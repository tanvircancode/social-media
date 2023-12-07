import {
  Card,
  CardHeader,
  Avatar,
  Box,
  Grid,
  IconButton,
  Typography,
  CardContent,
  CardMedia,
  CardActions,
  useMediaQuery,
} from "@mui/material";
import {
  FavoriteOutlined,
  SendOutlined,
  ChatBubbleOutlineOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@mui/icons-material";
import { BASE_URL } from "../config";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import { setPost, setPosts } from "../store";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { toast, ToastContainer } from "react-toastify";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ff5722", // Replace with your desired primary color
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
  userPicturePath,
}) => {
  const dispatch = useDispatch();
  const matches = useMediaQuery("(min-width:900px)");
  const matchesMov = useMediaQuery("(max-width:600px)");
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
 

  const handleDelete = async () => {
    await axios
      .delete(
        `${BASE_URL}/posts/${postId}/deletepost`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        // console.log(res.data);
        const posts = res.data.posts;
        dispatch(setPosts({ posts }));
        toast.dismiss();
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };

  const showToast = () => {
    toast.warning(
      <div>
        <p>Are you sure you want to delete this item?</p>
        <button onClick={handleDelete} style={{ padding: 5 }}>
          Yes
        </button>
        <button
          style={{ marginLeft: "20px", padding: 5 }}
          onClick={() => toast.dismiss()}
        >
          No
        </button>
      </div>,
      {
        autoClose: false,
        position: "top-center",
        closeButton: false,
      }
    );
  };

  const handleComment = async () => {
    console.log(loggedInUserId);
    await axios
      .patch(
        `${BASE_URL}/posts/${postId}/comment`,
        {
          userId: loggedInUserId,
          name: commentedUserName,
          userPicturePath: loggedInUserPicture,
          description: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
          },
        }
      )
      .then((res) => {

        const updatedPost = res.data;
        dispatch(setPost({ post: updatedPost }));
       

        setComment("");
      })
      .catch((error) => {
        
        alert(error.response);
      });
  };

  const patchLike = async () => {
    await axios
      .patch(
        `${BASE_URL}/posts/${postId}/like`,
        {
          userId: loggedInUserId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
          },
        }
      )
      .then((res) => {
        
        const updatedPost = res.data;
        dispatch(setPost({ post: updatedPost }));
      })
      .catch((error) => {
       
        alert(error.response);
      });
  };
  return (
    <Card
      style={{
        width: "100%",
        padding: "15px 25px",
        minHeight: 200,
        margin: matches ? "40px 0 0 130px" : matchesMov ? "20px" : "60px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <CardHeader
          avatar={
            <Avatar
              src={`${BASE_URL}/assets/${userPicturePath}`}
              alt="User Avatar"
              aria-label="user-avatar"
            />
          }
          title={name}
          titleTypographyProps={{
            style: { fontSize: "16px", textAlign: "left" },
          }}
          style={{ padding: 0 }}
        />
        {postUserId === loggedInUserId && (
          <DeleteOutlined style={{ cursor: "pointer" }} onClick={showToast} />
        )}
      </div>
      <ToastContainer />
      <CardContent style={{ padding: 0 }}>
        <Typography
          variant="body2"
          style={{ textAlign: "left", margin: "14px 0 10px" }}
        >
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

      <CardActions
        style={{ padding: 0, display: "flex", justifyContent: "space-between" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            marginTop: "20px",
          }}
        >
          <IconButton aria-label="add to favorites" onClick={patchLike} style={{padding:0}} >
            <ThemeProvider theme={theme}>
              <FavoriteOutlined color={isliked ? "primary" : "default"} />
            </ThemeProvider>
          </IconButton>
          <Typography style={{ marginTop: "2px" }}>{likedCount}</Typography>
          <IconButton
          style={{padding:0, marginLeft:10}}
            aria-label="add to favorites"
            onClick={() => setIsComments(!isComments)}
          >
            <ChatBubbleOutlineOutlined />
          </IconButton>
          <Typography style={{ marginRight: 5 }}>{comments.length}</Typography>
        </div>

        <div
          style={{ marginTop: "20px", display: "flex", alignItems: "center" }}
        >
          <input
            type="text"
            value={comment}
            placeholder="Write your comment"
            style={{ padding: "10px", borderRadius: "0.75rem", width: "250px" }}
            
            onChange={(e) => setComment(e.target.value)}
          />
          <SendOutlined
            fontSize="medium"
            style={{ marginLeft: "10px", cursor: "pointer" }}
            onClick={handleComment}
          />
        </div>
      </CardActions>

      {(isComments && comments.length == 0) && (
        <div style={{textAlign:'left',marginTop:10}}>
          No comments
        </div>
      )}

      {(isComments && comments.length > 0) && (
        <Card
          style={{
            marginTop: "1rem",
            padding: "1rem 0.75rem 1rem",
            boxShadow: "none",
          }}
        >
          {comments.map((comment, i) => (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 40,
                marginTop: 10,
              }}
            >
              <img
                src={`${BASE_URL}/assets/${comment.userPicturePath}`}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: "2rem",
                  objectFit: "cover",
                }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Typography style={{ fontWeight: "bold" }}>
                  {comment.name}
                </Typography>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Typography>{comment.description}</Typography>
                </div>
              </div>
            </div>
          ))}
        </Card>
      )}
    </Card>
  );
};

export default PostWidget;
// onClick={() => setEditComment(!editComment)}
