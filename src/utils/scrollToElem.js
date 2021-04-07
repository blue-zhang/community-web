/**
 * 滚动到指定的元素
 * @param {String} elem DOM元素
 * @param {Number} duration 滚动动画执行的时间
 * @param {Number} offset 滚动偏移量
 * @param {Number} up 滚动的方向，true是向上，false是向下
 * scrollTo 向下滚动为正
 * pageYOffset 滚动条滚过的距离（不包括滚动条本身的高度）
 * getBoundingClientRect().top 元素顶部距离浏览器客户端顶部的距离
 * offset 元素不一定要滚动到顶部，有一个 offset，对于向下滚，offset 正说明要继续向下滚，对于上滚，offset正说明继续上滚
 */
const scrollToElem = (elem, duration, offset, up = false) => {
  // 初始位置，startingY 可能为 0
  const startingY = window.pageYOffset
  const elementY = window.pageYOffset + document.querySelector(elem).getBoundingClientRect().top
  // 需要去滚动的距离
  let diff
  if (up) {
    diff = startingY + offset
  } else {
    diff = elementY - startingY + offset
  }
  // 如果 diff 0
  if (!diff) return
  const easing = t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
  let start

  window.requestAnimationFrame(function step (timestamp) {
    if (!start) start = timestamp
    // 计算时间的差值，根据差值计算偏移量
    const time = timestamp - start
    let percent = Math.min(time / duration, 1)
    percent = easing(percent)
    if (up) {
      window.scrollTo(0, startingY - diff * percent)
    } else {
      window.scrollTo(0, startingY + diff * percent)
    }

    if (time < duration) {
      window.requestAnimationFrame(step)
    }
  })
}

export { scrollToElem }
