<template>
  <div>
    <dl class="fly-panel fly-list-one">
      <dt class="fly-panel-title">本周热议 Top 10</dt>
      <dd v-for="(item, index) in lists"
          :key="'hotlist' + index">
        <router-link target="_blank"
                     rel="noopener noreferrer"
                     :to="{name: 'detail', params: { pid: item._id, detail: item }}">
          <span class="hotTitle pointer ellip">{{ item.title }}</span>
        </router-link>
        <span><i class="iconfont icon-pinglun1"></i> {{ item.reads }}次阅读</span>
      </dd>
      <!-- 无数据时 -->
      <!--
        <div class="fly-none">没有相关数据</div>
        -->
    </dl>
  </div>
</template>

<script>
import { getTop } from '../../api/content'
export default {
  name: 'HotLists',
  data () {
    return {
      lists: []
    }
  },
  mounted () {
    getTop().then(res => {
      if (res.code === 200) {
        this.lists = res.data
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.hotTitle {
  color: #666;
  font-size: 12px;
  font-weight: bold;
  &:hover {
    // transform: scale(1.05, 1.05);
    // color: #175199;
    color: #01aaed;
  }
  transition: transform 0.5s, color 0.5s;
  transform-origin: left;
}
</style>
