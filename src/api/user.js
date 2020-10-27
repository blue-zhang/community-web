import axios from '../utils/request'

const getSign = () => {
  return axios.get('/user/fav')
}

export { getSign }