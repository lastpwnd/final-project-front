import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styles from "./AddPost.module.scss";
import axios from "../../axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { isAuthSelected } from "../../redux/slices/auth";
import { useSelector } from "react-redux";

export const AddPost = () => {
  const { id } = useParams()
  const isAuth = useSelector(isAuthSelected)
  const navigate = useNavigate()
  const [text, setText] = useState("")
  const [title, setTitle] = useState("")
  const [tags, setTags] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const isEditing = Boolean(id)

  const onSubmut = async () => {
    try {

      setIsLoading(true)
      const tagsArray = tags.split(',')
      const trimmedArray = tagsArray.map(ele => ele.trim().toLowerCase())
      const fields = { title, tags:trimmedArray, text }
      
      const { data } = isEditing 
      ? await axios.patch(`/posts/${id}`, fields)
      : await axios.post('/posts/create', fields)

      const _id = isEditing ? id : data._id

      navigate(`/posts/${_id}`)
      setIsLoading(false)
    } catch (error) {
      console.warn(error)
      alert("Error uploading post")
    }
  }

  useEffect( () => {
    if (id) {
      axios.get(`/posts/${id}`).then( ({data}) => {
        setTitle(data.title)
        setText(data.text)
        setTags(data.tags.join(','))
      }).catch(error =>
      {
        console.warn(error)
        alert("Error retrieving postInfo")
      })
    }
   }, [] )

  if (!window.localStorage.getItem('token') && !isAuth) {
    return <Navigate to="/" />
  }


  return (
    <div className={styles.common}>  
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Post title..."
        value={title}
        onChange={(element) => setTitle(element.target.value)}
        fullWidth
      />
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder = "tag1, tag2, ..."
        value={tags}
        onChange={(element) => setTags(element.target.value)}

      />
      <TextField
        variant="standard"
        value={text}
        placeholder = "Enter some text..."
        onChange={(element) => setText(element.target.value)}
        multiline
        fullWidth
        sx={{ my: 5 }}         
      />
      <div className={styles.buttons}>
        <Button onClick={onSubmut} size="large" variant="contained">
          {isEditing ? "Update" : "Upload"}
        </Button>
        <Button size="large" onClick={() => {navigate('/')}}>Cancel</Button>
      </div>
    </div>
  );
};
