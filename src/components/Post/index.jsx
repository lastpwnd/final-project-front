import React from "react"
import clsx from "clsx"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Clear"
import EditIcon from "@mui/icons-material/Edit"
import EyeIcon from "@mui/icons-material/RemoveRedEyeOutlined"
import { Link } from "react-router-dom"
import styles from "./Post.module.scss"
import { UserInfo } from "../UserInfo"
import { PostSkeleton } from "./Skeleton"
import { useDispatch } from "react-redux"
import { removePost } from "../../redux/slices/posts"

export const Post = ({
  id,
  title,
  user,
  viewsCount,
  text,
  tags,
  isFullPost,
  isLoading,
  isEditable,
  createdAt
}) => {
  const dispatch = useDispatch()
  if (isLoading) {
    return <PostSkeleton />
  }

  // Instead, should have added normal dates to schemas, but for now...
  const dateTransform = (mongoDate) => {
    let date = new Date(mongoDate)
    let d = date.getDate()
    let m = date.getMonth()+1
    let y = date.getFullYear()
    let hs = date.getHours()
    if ( hs < 10) {
      hs = "0" + hs
    }
    let ms = date.getMinutes()
    if ( ms < 10) {
      ms = "0" + ms
    }
    return `Posted/updated: ${m}/${d}/${y} ${hs}:${ms}`
  }

  const removeOnClick = () => {
    if(window.confirm("You're trying to delete post, proceed?")) {
      dispatch(removePost(id))
    }
  }

 return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
      {isEditable && (
        <div className={styles.editButtons}>
          <IconButton color="primary" component={ Link } to={`/posts/${id}/edit`} >
            <EditIcon />
          </IconButton>
          <IconButton color="secondary" onClick={ removeOnClick }>
            <DeleteIcon  />
          </IconButton>
        </div>
      )}
      <div className={styles.wrapper}>
        <UserInfo user={user.name} avatarURL={user.avatarURL} additionalText={dateTransform(createdAt)} />
        <div className={styles.indention}>
          <h2
            className={clsx(styles.title, { [styles.titleFull]: isFullPost })}
          >
            {isFullPost ? title : <Link to={`/posts/${id}`}>{title}</Link>}
          </h2>
          <ul className={styles.tags}>
            {tags.map((name) => (
              <li key={name}>
                <Link to={`/posts/tags/${name}`}>#{name}</Link>
              </li>
            ))}
          </ul>
          <div> 
            {isFullPost ? <pre className={styles.content}> {text} </pre> : <pre className={styles.contentPreview}> {text} </pre> }
            </div> 
          <ul className={styles.postDetails}>
            <li>
              <EyeIcon />
              <span>{viewsCount}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
