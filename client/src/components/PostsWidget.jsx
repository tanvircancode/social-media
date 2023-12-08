import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { BASE_URL } from "../config";
import { setPosts } from "../store";
import { useEffect } from "react";
import PostWidget from "./PostWidget";

function PostsWidget({ userId, isProfile = false }) {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const posts = useSelector((state) => state.posts);

    const getPosts = async () => {

        await axios.get(`${BASE_URL}/posts/`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        ).then((res) => {
            const data = res.data;
            // console.log(data)

            dispatch(setPosts({ posts: data }));
        })
            .catch((error) => alert(error.response.data.message));
    }

    const getUserPosts = async () => {

        await axios.get(`${BASE_URL}/posts/${userId}/posts`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        ).then((res) => {
            const data = res.data;
            console.log(data)
            dispatch(setPosts({ posts: data }));
        })
            .catch((error) => alert(error.response.data.message));
    }

    useEffect(() => {

        if (isProfile) {
            getUserPosts();
        } else {
            getPosts();
        }
    }, []);

    return (
        <>
            {posts.map(
                ({
                    _id,
                    userId,
                    firstName,
                    lastName,
                    description,
                    likes,
                    comments,
                    picturePath,
                    userPicturePath
                }) => (
                    <PostWidget
                        key={_id}
                        postId={_id}
                        postUserId={userId}
                        name={`${firstName} ${lastName}`}
                        description={description}
                        likes={likes}
                        comments={comments}
                        picturePath={picturePath}
                        userPicturePath={userPicturePath}
                    />
                )
            )}
        </>
    )
}

export default PostsWidget;