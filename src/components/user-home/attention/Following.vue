<template>
  <div>
    <ul class="following">
      <li v-for='(item, index) in lists'
          class="following-li"
          :key="'following' + index">
        <img :src="item.attention.pic"
             alt="wrong">
        <router-link target="_blank"
                     class="mes"
                     rel="noopener noreferrer"
                     :to="{name: 'UserHome', params: { uid: item.attention._id }}">
          {{item.attention.fakename}}
        </router-link>
        <div class="btn"><button type="button"
                  @click="cancel(item.attention._id, $store.state.userInfo._id, index)"
                  class="layui-btn layui-btn-primary layui-border-green">取消关注</button></div>
      </li>
    </ul>
    <page-bar v-show="total > limit"
              :total="total"
              :current="current"
              :align="'left'"
              :size="limit"
              :hasTotal="true"
              :hasSelect="false"
              @changeCurrent="handleChange"></page-bar>
  </div>
</template>

<script>

import { getAttentions, delAttention } from '@/api/user'
import PageBar from '@/components/modules/pagination/Index'
export default {
  name: 'Following',
  components: {
    PageBar
  },
  data () {
    return {
      lists: [],
      total: 0,
      current: 0,
      page: 0,
      limit: 12
    }
  },
  methods: {
    async cancel (attention, uid, index) {
      const res = await delAttention({ uid, attention })
      if (res.code === 200) {
        this.$bubble('取消关注成功')
        this.lists.splice(index, 1)
      }
    },
    handleChange (val) {
      this.current = val
      this.getLs()
    },
    async getLs () {
      const res = await getAttentions({
        uid: this.$route.params.uid,
        limit: this.limit,
        page: this.page
      })
      if (res.code === 200) {
        this.lists = res.data
      }
    }
  },
  async mounted () {
    await this.getLs()
  }
}
</script>

<style lang="scss" scoped>
.following {
  width: 100%;
  .following-li {
    margin: 15px 5px;
    display: flex;
    height: 60px;
    border-bottom: 1px solid #f2f2f2;
    line-height: 60px;
    text-align: center;
    align-items: center;
    img {
      height: 40px;
      width: 40px;
      border-radius: 100%;
      padding-right: 5px;
    }
    .mes {
      width: 40px;
      line-height: 40px;
      text-align: left;
      font-size: 16px;
      padding-left: 10px;
    }
    .btn {
      flex: 1;
      .layui-btn {
        float: right;
      }
    }
  }
}
</style>
