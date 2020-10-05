import axios from 'axios'
const getCaptcha = async () => {
  let result = ''
  try {
    result = await axios.get('/api/captcha')
    if (result.status === 200) {
      return result.data
    }
  } catch (e) {
  }
}
const forget = async (option) => {
  let result = ''
  try {
    result = await axios.post('/api/forget', {
      ...option
    })
    if (result.status === 200) {
      return result.data
    }
  } catch (e) {
  }
}
export { getCaptcha, forget }
