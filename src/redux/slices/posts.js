import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "../../axios"

export const fetchPosts = createAsyncThunk('posts/postsFetch', async(params) => {
    const { data } = await axios.get('/posts', {params: { sort : params }} )
    return data
})

export const fetchTags = createAsyncThunk('posts/postsTags', async() => {
    const { data } = await axios.get(`/tags`)
    return data
})

export const fetchPostsByTags = createAsyncThunk('posts/postsByTags', async(tag) => {
    const { data } = await axios.get(`/posts/tags/${tag}`)
    return data
})

export const removePost = createAsyncThunk('posts/removePost', async(id) => {
    await axios.delete(`/posts/${id}`)
})

const initialState = {
    posts: {
        items: [],
        status: "loading"
    },
    tags: {
        items: [],
        status: "loading"
    }
}

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
        // fetching Posts //
        .addCase(fetchPosts.pending, (state, actions) => {
            state.posts.status = 'loading'
            state.posts.items = []
        })
        .addCase(fetchPosts.fulfilled, (state, actions) => {
            state.posts.status = 'loaded'
            state.posts.items = actions.payload
        })
        .addCase(fetchPosts.rejected, (state, actions) => {
            state.posts.status = 'error'
            state.posts.items = []
        })
        // fetching Tags //
        .addCase(fetchTags.pending, (state, actions) => {
            state.tags.status = 'loading'
            state.tags.items = []
        })
        .addCase(fetchTags.fulfilled, (state, actions) => {
            state.tags.status = 'loaded'
            state.tags.items = actions.payload
        })
        .addCase(fetchTags.rejected, (state, actions) => {
            state.tags.status = 'error'
            state.tags.items = []
        })
        // removing Post //
        .addCase(removePost.pending, (state, actions) => {
            state.posts.items = state.posts.items.filter( item => item._id !== actions.meta.arg )
        })
        // fetching Posts by Tags//
        .addCase(fetchPostsByTags.pending, (state, actions) => {
            state.posts.status = 'loading'
            state.posts.items = []
        })
        .addCase(fetchPostsByTags.fulfilled, (state, actions) => {
            state.posts.status = 'loaded'
            state.posts.items = actions.payload
        })
        .addCase(fetchPostsByTags.rejected, (state, actions) => {
            state.posts.status = 'error'
            state.posts.items = []
        })
    }
})

export const postsReducer = postsSlice.reducer