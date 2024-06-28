import React from "react"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import styles from "./Header.module.scss"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { isAuthSelected, logout } from "../../redux/slices/auth"
import { UserInfo } from "../UserInfo"


export const Header = () => {

  const dispatch = useDispatch()
  const isAuth = useSelector(isAuthSelected)
  const userData = useSelector( state => state.auth.data )
  
  const onClickLogout = () => {
      dispatch(logout())
      window.localStorage.removeItem('token')
  }
 return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          
          <Link className={styles.logo} to="/">
            <div>Main</div>
          </Link>
          { isAuth ? <UserInfo avatarURL={userData.avatarURL} user={userData.name} /> 
                   : <></>
          }
          <div className={styles.buttons}>
            { isAuth ? (
                          <>
                            <Link to="/posts/create">
                              <Button variant="contained">Add Post</Button>
                            </Link>
                            <Button onClick = {onClickLogout} variant="contained" color="error">LogOut</Button>
                          </>
                       )
                     : (
                        <>
                          <Link to="/login"> 
                            <Button variant="outlined">Login</Button>
                          </Link>
                          <Link to="/register"> 
                            <Button variant="contained">Register</Button>
                          </Link>      
                        </>
                       )
            }    
          </div>
        </div>
      </Container>
    </div>
  )
}