import axios from "axios";


const movieDB = axios.create({
    baseURL: 'https://api.themoviedb.org/3/movie',
    params: {
        api_key: '1152c929c9e93dfd88b4c3605645eae4',
        language: 'es-ES'
    }
})

export default movieDB;