<template>
  <div class="fly-panel fly-panel-user"
       pad20>
    <div class="layui-tab layui-tab-brief"
         lay-filter="message">
      <ul class="layui-tab-title">
        <router-link tag="li"
                     v-for="(item, index) in postLists"
                     :key="'mymessage'+index"
                     :to="{name: item.name}">
          {{item.title}}</router-link>
        <div v-show="$store.state.unreadNum.postCom"
             class="css-ybodb leftpos">{{$store.state.unreadNum.postCom | limit99}}</div>
        <div v-show="$store.state.unreadNum.comReply"
             class="css-ybodb rightpos">{{$store.state.unreadNum.comReply | limit99}}</div>
      </ul>
      <div class="layui-tab-content"
           style="padding: 20px 0;">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserMessage',
  data () {
    return {
      postLists: [
        {
          title: '评论回复',
          name: 'UserMessage'
        },
        {
          title: '文章评论',
          name: 'PostComment'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.leftpos {
  bottom: 20px;
  left: 171px;
}
.rightpos {
  bottom: 20px;
  left: 76px;
}
</style>
