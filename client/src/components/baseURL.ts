export let baseURL = 'https://mern-blog-chappo050.herokuapp.com/api'
if (process.env.NODE_ENV === 'development') {
    baseURL = "http://localhost:5000"
}
else{
    baseURL = "https://mern-blog-chappo050.herokuapp.com"
}
