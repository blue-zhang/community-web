export default {
  baseUrl: {
    dev: 'http://localhost:3000/',
    pro: 'http://www.toimc.com:12000/'
  },
  // 不需要jwt鉴权的路径

  // 添加图片路径
  publicPath: [/^\/public/, /^\/login/, /^\/src/],
  sendCount: '70s',
  indexCount: '6s'
}
