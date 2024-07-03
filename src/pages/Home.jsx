import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, fetchPostsByTags, fetchTags } from "../redux/slices/posts";
import { Link, useParams } from "react-router-dom";


export const Home = ({ byTag }) => {

  const { tag } = useParams()
  const dispatch  = useDispatch()
  const [isSort, setIsSort] = useState(-1)
  const userData = useSelector( (state) => state.auth.data)
  const { posts, tags  } = useSelector( (state) => state.posts)

  const isPostsLoading = posts.status === "loading"
  const isTagsLoading = tags.status === "loading"

  

  useEffect(() => {
    if(!byTag) {
      dispatch(fetchPosts(isSort))
      dispatch(fetchTags())
    }
    }, [isSort, byTag, dispatch])

  useEffect(() => {
    if (byTag)  {
      dispatch(fetchPostsByTags(tag))
      dispatch(fetchTags())
    }
  }, [tag, byTag, dispatch])

  const sortChange = () => {
    setIsSort(-isSort)
  }

 

  return (
    <>
    {byTag ? <Link to="/"><Button variant="contained" sx={{ my: 2 }} > Back to Main </Button></Link> :<Button onClick={sortChange} variant="contained" sx={{ my: 2 }}> {isSort === -1 ? "Latest first" : "Older first"} </Button>  }
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(3)] : posts.items)
          .map((obj, index) => isPostsLoading 
              ? <Post key={index} isLoading={true} />
              :
                (<Post
                  key={obj._id}
                  id={obj._id}
                  title={obj.title}
                  imageUrl={obj.imageURL}
                  user={obj.user}
                  createdAt={obj.createdAt}
                  viewsCount={obj.viewsCounter}
                  tags={obj.tags}
                  text={obj.text}
                  isEditable={userData?._id===obj.user._id}
                />)
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock
            items={tags.items}
            isLoading={isTagsLoading}
          />
        </Grid>
      </Grid>
    </>
  );
};
