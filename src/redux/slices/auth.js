import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "../../axios"

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params) => {
    const { data } = await axios.post('/auth/login', params)
    return data
})

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params) => {
    
    try {
        const { data } = await axios.post('/auth/register', params)
        return data
    } catch (error) {
        console.log(error.response.data.msg);  
    }
    
})

export const fetchLogin = createAsyncThunk('auth/fetchLogin', async () => {
    const { data } = await axios.get('/auth/me')
    return data
})

const initialState = {
    data: null,
    status: 'loading'
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        logout: (state) => {
            state.data = null
        }
    },
    extraReducers:builder => {
        builder
        .addCase(fetchAuth.pending, (state, actions) => {
            state.status = 'loading'
            state.data = null
        })
        .addCase(fetchAuth.fulfilled, (state, actions) => {
            state.status = 'loaded'
            state.data = actions.payload
        })
        .addCase(fetchAuth.rejected, (state, actions) => {
            state.status = 'error'
            state.data = null
        })
        .addCase(fetchLogin.pending, (state, actions) => {
            state.status = 'loading'
            state.data = null
        })
        .addCase(fetchLogin.fulfilled, (state, actions) => {
            state.status = 'loaded'
            state.data = actions.payload
        })
        .addCase(fetchLogin.rejected, (state, actions) => {
            state.status = 'error'
            state.data = null
        })
        .addCase(fetchRegister.pending, (state, actions) => {
            state.status = 'loading'
            state.data = null
        })
        .addCase(fetchRegister.fulfilled, (state, actions) => {
            state.status = 'loaded'
            state.data = actions.payload
        })
        .addCase(fetchRegister.rejected, (state, actions) => {
            state.status = 'error'
            state.data = null
        })
    }
}) 

export const isAuthSelected = (state) => Boolean(state.auth.data)
export const authReducer = authSlice.reducer
export const { logout } = authSlice.actions