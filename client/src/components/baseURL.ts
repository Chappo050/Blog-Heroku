export let baseURL = ''
if (process.env.NODE_ENV === 'development') {
    baseURL = "http://localhost:5000"
}
else{
    baseURL = "https://shrouded-temple-70247.herokuapp.com"
}
