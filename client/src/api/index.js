import http from '../axios';
const baseUrl = "http://localhost:3000/api/v1"

export const login = (params) =>{
    return  http.fetchPost(`${baseUrl}/user/login`,params)
}