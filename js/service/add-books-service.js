
const GOOGLE_BOOKS='https://www.googleapis.com/books/v1/volumes?printType=books&q='

function getBooks(search) {
    return axios.get(`${GOOGLE_BOOKS}+${search}`).then(res => res = res.data)
}