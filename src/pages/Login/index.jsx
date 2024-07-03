import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styles from "./Login.module.scss";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuth, isAuthSelected } from "../../redux/slices/auth";

export const Login = () => {

  const dispatch  = useDispatch()
  const isAuth = useSelector(isAuthSelected)

  const { register, handleSubmit, formState:{ errors } } = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values))
    if (!data.payload) {
      alert("Error occurred during logging...")
    }
    if (data.payload.token) {
      window.localStorage.setItem('token', data.payload.token)
    }
  }

  if (isAuth) {
    return <Navigate to="/" />
  }
 
  return (
    <div className = {styles.root} >
      <Typography classes={{ root: styles.title }} variant="h5">
        Logging In
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} > 
        <TextField
          className={styles.field}
          label="E-Mail"
          type="email"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register('email', { required: "Provide valid email" })}
          fullWidth
        />
        <TextField 
          className={styles.field} 
          label="Password" 
          type="password"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message} 
          {...register('password', { required: "Provide valid password" })}
          fullWidth 
        />
        
        <Button type="submit" size="large" variant="contained" fullWidth>
          Enter
        </Button>
      </form>
    </div>
  );
};
