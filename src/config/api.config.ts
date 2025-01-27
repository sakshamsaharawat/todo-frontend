import axios from "axios";

export const API_BASE_URL = "http://localhost:3000"
const jwt = localStorage.getItem("jwt")
export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Authorization": `Bearer ${jwt}`, //The Bearer ${jwt} part is used to pass the token in the request header for secure authentication.
        "Content-Type": "application/json"   // which tells the server that the data being sent in requests will be in JSON format.
    }
})