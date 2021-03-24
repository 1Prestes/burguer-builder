import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://burger-builder-d8334-default-rtdb.firebaseio.com/'
})

export default instance
