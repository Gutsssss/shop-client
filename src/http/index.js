import axios from "axios";

const $host = axios.create({
    baseURL:import.meta.env.VITE_APP_API_URL
})
const $authHost = axios.create({
    baseURL:import.meta.env.VITE_APP_API_URL
})

const authInterceptors = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$authHost.interceptors.request.use(authInterceptors)

export {
    $authHost,
    $host
}