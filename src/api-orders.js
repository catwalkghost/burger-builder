import axios from 'axios'

const api = axios.create({
    baseURL: 'https://burger-builder-78558.firebaseio.com/'
})

export default api