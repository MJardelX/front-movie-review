import axios from "axios";

const client = axios.create({
    baseURL: 'http://localhost:8000/api'
    // baseURL: 'https://movie-review-backend.onrender.com/api'
})

export default client;