import axios from '../utils/request'

const getRefresh = (uid) => {
  return axios.post('/refresh', {
    uid
  })
}

export { getRefresh }