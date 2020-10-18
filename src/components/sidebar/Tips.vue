<template>
  <div class="fly-panel">
    <h3 class="fly-panel-title">温馨通道</h3>
    <div class="tips-container">
      <ul class="fly-panel-main layui-row">
        <li class="layui-col-md6">
          <a
            href="/jie/4281/"
            target="_blank"
          >layuiqq</a
          >
        </li>
        <li class="layui-col-md6">
          <a
            href="/jie/4281/"
            target="_blank"
          >layui</a
          >
        </li>
        <li class="layui-col-md6">
          <a
            href="/jie/4281/"
            target="_blank"
          >layui</a
          >
        </li>
        <li class="layui-col-md6">
          <a
            href="/jie/4281/"
            target="_blank"
          >layui</a
          >
        </li>
        <li class="layui-col-md6">
          <a
            href="/jie/4281/"
            target="_blank"
          >layui</a
          >
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Tips'
}
</script>
<style
  lang="scss"
  scoped
>
$border-color: #f2f2f2;
.tips-container {
  padding: 10px;
  .fly-panel-main {
    padding: 0;
  }
  ul {
    border-top: 1px solid $border-color;
    border-left: 1px solid $border-color;
    li {
      line-height: 25px;
      text-align: center;
      height: 25px;
      border-bottom: 1px solid $border-color;
      border-right: 1px solid $border-color;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      a {
        display: block;
      }
    }
  }
}
</style>
