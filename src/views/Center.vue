<template>
  <div class="layui-container fly-marginTop fly-user-main">
    <ul class="layui-nav layui-nav-tree layui-inline" lay-filter="user">
      <li
        class="layui-nav-item"
        v-for="(item, index) in lists"
        :key="'center' + index"
      >
        <a>
          {{ item.name }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Center',
  data() {
    return {
      lists: [
        {
          name: '我的主页'
        },
        {
          name: '用户中心'
        },
        {
          name: '基本设置'
        },
        {
          name: '我的帖子'
        },
        {
          name: '我的消息'
        },
        {
          name: '其他设置'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/iconfont/iconfont.css';
@import '../assets/scss/color.scss';
.iconfont {
  width: 50px;
  margin-right: 3px;
  padding: 0;
}
::v-deep ul {
  width: 150px;
  background: $gray-bgcolor;
}
::v-deep .layui-nav-item {
  width: 140px;
  a {
    color: $gray-color;
    padding: 0;
    display: block;
    height: 60px;
    line-height: 60px;
    text-align: left;
    padding-left: 16px;
    font-size: 18px;
    .iconfont {
      font-size: 20px;
      margin-right: 4px;
    }
  }
}
</style>