

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


function NewPost({ picturePath }) {
    const dispatch = useDispatch();
    const matches = useMediaQuery('(min-width:900px)');
    const matchesMov = useMediaQuery('(max-width:600px)');

    const [isImage, setIsImage] = useState(false);
    const [image, setImage] = useState(null);

    const onDrop = useCallback((acceptedFiles) => {
        setImage(acceptedFiles[0]);
        setIsImage(!isImage)
    }, [])
    const { getRootProps, getInputProps } = useDropzone({ onDrop });


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
                    style={{ padding: '0.5em', borderRadius: '0.75rem', width: '100%' }} />
            </div>
            {isImage &&
                <div {...getRootProps()} style={{marginLeft: '5.2rem', marginBottom: '0.75em', border: '1px dashed grey', width: '82%'}}>
                    <input {...getInputProps()} />
                    {!image ? (
                        <p>Drag 'n' drop some files here, or click to select files</p>
                    ) : <p>{image.name}</p>}
                </div>
            }



            {/* {image && <p>{image.name}</p>} */}



            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div onClick={() => setIsImage(!isImage)}  style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <ImageOutlined style={{ marginLeft: '3.4em' }} />
                    <Typography variant="h8" fontWeight="500">Image</Typography>
                </div>
                <Button variant="contained" style={{ marginRight: '0.5em' }}>Post</Button>
            </div>
        </Card>

    )
}

export default NewPost;