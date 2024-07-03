import axios from "axios"

const instance = axios.create({
    //baseURL: 'http://localhost:4444/'
    baseURL: process.env.REACT_APP_API_URL
})

instance.interceptors.request.use( function (config) {
    config.headers.Authorization = "Bearer "+ window.localStorage.getItem('token')
    return config
}, function (error) {
    return Promise.reject(error)
})

export default instance