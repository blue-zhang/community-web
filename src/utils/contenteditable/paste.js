export default (event) => {
  let paste = (event.clipboardData || window.clipboardData).getData('text')
  // 获取文字后可以在这里进行一些骚操作

  const selection = window.getSelection()
  if (!selection.rangeCount) return false
  selection.deleteFromDocument()
  selection.getRangeAt(0).insertNode(document.createTextNode(paste))

  event.preventDefault()
}
