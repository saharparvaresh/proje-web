import server from "./server";

async function axiosHandler() {
    const res = await server.post('/auth/login', {
        "username": "admin",
        "password": "admin"
    })
    if (res.status === 200) {
        localStorage.setItem("token", res.data.token)
    }
}


export const isLoggin = () => {
    let token = localStorage.getItem("token")
    if (token) {
        return true
    }
    return false
}


export const isLogout = () => {
    localStorage.removeItem("token")
}


export default axiosHandler