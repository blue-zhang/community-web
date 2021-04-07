import jwt from 'jsonwebtoken'

export default () => {
  const refreshToken = localStorage.getItem('refreshToken')
  const refPayload = jwt.decode(refreshToken)
  const uid = refPayload._id
  return uid
}
