

import { Box, Grid, useMediaQuery } from "@mui/material"
import Navbar from "../navbar";
import { useSelector } from "react-redux";
import Widget from "../../components/Widget";
import NewPost from "../../components/NewPost";
import PostsWidget from "../../components/PostsWidget";

const Profile = () => {

  const { _id, picturePath } = useSelector((state) => state.user)

    return (
        <Box >
        <Grid container >
  
  
          <Grid item lg={2} md={2} >
            <Widget userId={_id} picturePath={picturePath} />
          </Grid >
  
  
          <Grid item lg={4} md={6} xs={8}>
            <div
              style={{
                width: '100%',
                padding: '15px 25px',
                minHeight: 200,
                margin: '0 auto',
                textAlign: 'center',
              }}
            >
              <NewPost picturePath={picturePath} />
              <PostsWidget userId={_id} isProfile={true}/>
            </div>
          </Grid>
        </Grid>
      </Box>
    )
}
export default Profile;