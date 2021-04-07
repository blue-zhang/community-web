/*
 * @Author: your name
 * @Date: 2021-03-03 16:40:01
 * @LastEditTime: 2021-03-03 16:50:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front\src\utils\selectToEnd.js
 */
// 把光标设置在富文本编辑器的最后面
function selectionToEnd(node) {
  const dom = document.querySelector(node)
  let selection = window.getSelection()
  selection.selectAllChildren(dom)
  selection.collapseToEnd()
}
export default selectionToEnd
