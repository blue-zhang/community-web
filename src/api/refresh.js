import axios from '../utils/request'

const getRefresh = () => {
  return axios.get('/refresh')
}

export { getRefresh }