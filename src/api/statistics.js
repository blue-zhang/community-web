import axios from '../utils/request'
import qs from 'qs'
const achieve = (params) => {
  return axios.get('/sttc/achieve?' + qs.stringify(params))
}
export {
  achieve
}
