import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import styles from "./Registration.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { isAuthSelected, fetchRegister, logout } from "../../redux/slices/auth";
import { Navigate } from "react-router-dom";


export const Registration = () => {

  const dispatch  = useDispatch()
  const isAuth = useSelector(isAuthSelected)
  
  const { register, handleSubmit, watch, formState:{ errors, isValid } } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password2: "",
      avatarURL: ""
    }
  })
  const watchedPass = watch("password")
  const onSubmit = async (values) => {
   
      const data = await dispatch(fetchRegister(values))

        if (!data.payload) {
          alert("Registration error!")       
        }
        else if (data.payload.token) {   
          window.localStorage.setItem('token', data.payload.token)
        }
  }

  if (isAuth) {
    window.alert("You were successfully registered! Redirecting to login form... ")
    dispatch(logout())
    window.localStorage.removeItem('token')
    return <Navigate to="/login" />
  }

  return (
    <div className={ styles.root }>
      <Typography classes={{ root: styles.title }} variant="h5">
        Creating account
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
       <form onSubmit={handleSubmit(onSubmit)}>
        <TextField 
            className={styles.field} 
            label="name"  
            type="text"
            error={Boolean(errors.name?.message)}
            helperText={errors.name?.message}
            {...register('name', { required: "Type your name" })}
            fullWidth
          />
          <TextField 
            className={styles.field} 
            label="email" 
            type="email"
            error={Boolean(errors.email?.message)}
            helperText={errors.email?.message}
            {...register('email', { required: "Provide valid email" })}
            fullWidth
          />
          
          <TextField 
            className={styles.field} 
            label="password" 
            type="password"
            error={Boolean(errors.password?.message)}
            helperText={errors.password?.message}
            {...register('password', { required: "Type password (Min 5 letters)" })}
            fullWidth 
          />
          <TextField 
            className={styles.field} 
            label="repeat password" 
            type="password"
            error={Boolean(errors.password?.message)}
            helperText={errors.password?.message}
            {...register('password2', { required: "Type password again", validate: (value)=>{
              if(watchedPass !== value){
                return "Passwords do not match!"
              }
            }})}
            fullWidth 
          />
          <TextField 
            className={styles.field} 
            label="avatarURL" 
            type="url"
            error={Boolean(errors.avatarURL?.message)}
            helperText={errors.avatarURL?.message}
            {...register('avatarURL', { required: true })}
            fullWidth 
          />
            <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>Register</Button>
       </form>
    </div>
  );
};
