
const isDev = process.env.NODE_ENV === 'development'
export default {
  baseUrl: {
    dev: 'http://localhost:3000/',
    pro: 'http://www.toimc.com:12000/'
  },
  // 不需要jwt鉴权的路径

  // 添加图片路径
  publicPath: [/^\/public/, /^\/login/, /^\/src/],
  sendCount: 60,
  indexCount: 5,
  wsconfig: {
    url: isDev ? '127.0.0.1' : 'api.dev.toimc.com',
    port: isDev ? '3001' : 22001
  }
}
