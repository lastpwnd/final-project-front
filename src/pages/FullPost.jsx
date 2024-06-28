import React, { useEffect, useState } from "react"
import axios from "../axios"
import { useParams } from "react-router-dom"
import { Post } from "../components/Post"

export const FullPost = () => {

  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const { id } = useParams()

  useEffect(() => {
    axios.get(`/posts/${id}`).then( res => {
      setData(res.data)
      setIsLoading(false)
    }).catch( error => {
      console.warn(error)
      alert("Error occurred while retrieving the post")
    })
  }, [id])

  if (isLoading) {
    return <Post isLoading={isLoading} />
  }

    return (
      <>
        <Post
          id={data.id}
          title={data.title}
          avatarURL={data.avatarURL}
          user={data.user}
          createdAt={data.createdAt}
          viewsCount={data.viewsCounter}
          tags={data.tags}
          text={data.text}
          isFullPost
        >
            {data.text}         
        </Post>
      </>
    )
}
