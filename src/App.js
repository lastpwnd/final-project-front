import Container from "@mui/material/Container"
import { Routes, Route } from "react-router-dom"
import { Header } from "./components"
import { Home, FullPost, Registration, AddPost, Login } from "./pages"
import { useDispatch } from "react-redux"
import { fetchLogin } from "./redux/slices/auth"
import { useEffect } from "react"

function App() {

  const dispatch  = useDispatch()

  useEffect( () => {
    dispatch(fetchLogin())
  }, [])


  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path = "/" element = { <Home /> } /> 
          <Route path = "/posts/tags/:tag" element = { <Home byTag = {true} /> } /> 
          <Route path = "/posts/:id" element = { <FullPost /> } /> 
          <Route path = "/posts/:id/edit" element = { <AddPost /> } /> 
          <Route path = "/posts/create" element = { <AddPost /> } /> 
          <Route path = "/login" element = { <Login /> } /> 
          <Route path = "/register" element = { <Registration /> } /> 
        </Routes>
      </Container>
    </>
  )
}

export default App
