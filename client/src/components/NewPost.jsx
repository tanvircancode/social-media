

import {
    ImageOutlined,
    EditOutlined,
    DeleteOutlined,
} from "@mui/icons-material";
import { Card, Divider, TextField, useMediaQuery, Button, Typography } from "@mui/material";
import { BASE_URL } from "../config";
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch } from 'react-redux';
import axios from "axios";
import { useSelector } from 'react-redux';
import { setPosts } from "../store";


function NewPost({ picturePath }) {
    const dispatch = useDispatch();
    const matches = useMediaQuery('(min-width:900px)');
    const matchesMov = useMediaQuery('(max-width:600px)');

    const [isImage, setIsImage] = useState(false);
    const [image, setImage] = useState(null);
    const [post, setPost] = useState("");

    const token = useSelector((state) => state.token);
    const { _id } = useSelector((state) => state.user);


    const onDrop = useCallback((acceptedFiles) => {
        setImage(acceptedFiles[0]);
        setIsImage(!isImage)
    }, [])
    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const handlePost = async () => {
        const formData = new FormData();
        formData.append("userId", _id);
        formData.append("description", post);
        if (image) {
            formData.append("picture", image);
            formData.append("picturePath", image.name);
        }

        await axios.post(`${BASE_URL}/posts/createpost`,
            formData ,
            {
                headers: {
                    "Content-Type": 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
        ).then((res) => {
            console.log(res)
            const posts = res.data;
            dispatch(setPosts({ posts }));
            setIsImage(!isImage);
            setImage(null);
            
            setPost("");
            console.log(post)
        }).catch((error) => alert(error.response.data.message));
    }


    return (

        <Card variant="outlined"
            style={{
                width: '100%',
                padding: '15px 25px',
                minHeight: 200,
                margin: matches ? '40px 0 0 130px' : (matchesMov ? '20px' : '60px'),
            }}>
                
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1.5rem' }}>
                <img src={`${BASE_URL}/assets/${picturePath}`} style={{ width: 60, height: 50, objectFit: "cover", borderRadius: "50%" }} alt="user" />
                <TextField id="outlined-basic" label="Write Something.." variant="outlined"
                    style={{ padding: '0.5em', borderRadius: '0.75rem', width: '100%' }} onChange={(e) => setPost(e.target.value)}/>
            </div>

            {isImage &&
                <div {...getRootProps()} style={{ margin: '0 0.5rem 0.75rem 5.3rem', border: '1px dashed grey' }}>
                    <input {...getInputProps()} />
                    {!image ? (
                        <p>Select a file</p>
                    ) : <p>{image.name}</p>}
                </div>
            }




            {/* {image && <p>{image.name}</p>} */}



            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div onClick={() => setIsImage(!isImage)} style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <ImageOutlined style={{ marginLeft: '3.4em' }} />
                    <Typography variant="h8" fontWeight="500">Image</Typography>
                </div>
                <Button variant="contained" style={{ marginRight: '0.5em' }} onClick={handlePost}>Post</Button>
            </div>
        </Card>

    )
}

export default NewPost;