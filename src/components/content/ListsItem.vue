<!--
 * @Author: your name
 * @Date: 2020-10-27 10:42:16
 * @LastEditTime: 2021-03-07 21:54:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front\src\components\content\ListsItem.vue
-->
<template>
  <div style="background-color: white">
    <ul>
      <li v-for="(item, index) in lists_item"
          :key="'listitem' + index">
        <div class="acti_con"
             v-show="showActivites === '1'">
          <div class="activites"
               v-if="!item.postAuth && !item.attention">{{ $store.state.userInfo._id === $route.params.uid ? '我' : '他' }}发表了这篇文章</div>
          <div v-else-if="item.attention"
               class="activites attention">{{ $store.state.userInfo._id === $route.params.uid ? '我' : '他' }}关注了
            <router-link target="_blank"
                         rel="noopener noreferrer"
                         :to="{name: 'UserHome', params: { uid: item.attention._id }}">
              <b class="blink"
                 :class="{ 'vip-color': item.attention.isVip !== '0'}">
                {{ item.attention.fakename }}
              </b>
            </router-link>
          </div>
          <div class="activites"
               v-else>{{ $store.state.userInfo._id === $route.params.uid ? '我' : '他' }}赞了这篇文章</div>
        </div>
        <div class="lsItemLi"
             v-if="!item.attention">
          <div class="lsItemMain">
            <div class="lsItemTop">
              <router-link target="_blank"
                           class="ToUidHome"
                           rel="noopener noreferrer"
                           :to="{name: 'UserHome', params: { uid: item.uid._id }}">
                <b class="blink"
                   :class="{ 'vip-color': item.uid.isVip !== '0'}">
                  {{ item.uid.fakename }}
                </b>
              </router-link>
              <span>{{ item.created | _moment }}</span>
              <a class="layui-badge layui-bg-orange"
                 v-show="tag.name"
                 v-for="(tag, index) in item.tags"
                 :key="'tag' + index"
                 :class="tag.class">{{ tag.name }}</a>
              <a class="layui-badge layui-bg-green"
                 v-show="item.isEnd === '1'">已结贴</a>
              <a class="layui-badge layui-bg-green"
                 v-if="item.status === '1'">不可回复</a>
              <a class="layui-badge layui-bg-green">{{ item.catalog | _catalog}}</a>
              <a class="isreply"
                 style="marginLeft: 10px; color: #FF7200"
                 v-if="item.favs !== 0">{{`悬赏: ${item.favs} `}}</a>
            </div>
            <router-link target="_blank"
                         rel="noopener noreferrer"
                         :to="{name: 'detail', params: { pid: item._id, detail: item }}">
              <h2 class="pointer ellip">
                {{ item.title }}
              </h2>
            </router-link>
            <div class="layui-btn-group">
              <button type="button"
                      class="layui-btn layui-btn-primary"
                      :class="{'handed':  item.handed === '1'}">
                <i @click="praisePost(index, item._id, item.uid._id)"
                   class="layui-icon layui-icon-praise"></i>{{ item.hands }}
              </button>
              <button type="button"
                      :class="{'handed':  item.collected === '1'}"
                      class="layui-btn layui-btn-primary">
                <i @click="showCol(item._id, index)"
                   class="layui-icon layui-icon-star"></i>{{item.stars}}
              </button>
              <router-link target="_blank"
                           class="itemToComment"
                           rel="noopener noreferrer"
                           :to="{path: `/detail/${item._id}?to=comment`}">
                <button class="layui-btn layui-btn-primary">
                  <i class="layui-icon layui-icon-reply-fill"></i>{{ item.answer }}
                </button>
              </router-link>
              <slot :pid="item._id"
                    :item="item"
                    :index="index"></slot>
            </div>
          </div>
          <div class="picRegin layui-hide-xs"><img v-if="item.picUrl"
                 :src="item.picUrl"
                 alt=""></div>
          <alert-collect v-if="isShowCol === item._id"
                         :pid='item._id'
                         :postUid='item.uid._id'
                         @confirmCollect='confirmCollect'
                         @close='isShowCol = ""'></alert-collect>
        </div>

      </li>
    </ul>
    <div style="text-align: center;margin:10px"
         v-show="isShow">
      <p style="text-align: center;padding:10px;color:#999999"
         v-if="isLastPage">已经到底了</p>
    </div>
    <div id="loadBottom"></div>
  </div>
</template>
<script>
import AlertCollect from '@/components/content/AlertCollect'
import { praisePost } from '@/api/content'

export default {
  components: {
    AlertCollect
  },
  name: 'ListsItem',
  data () {
    return {
      url: '',
      lists_item: [],
      isShowCol: false,
      index: '' // 利用index，向 lists 组件触发事件的方式，修改每篇文章的点赞和收藏属性
    }
  },
  props: {
    lists: {
      type: Array,
      default: function () {
        return []
      }
    },
    // 判断是否显示分页按钮
    // Top组件不需要分页按钮，传递一个false
    isShow: {
      type: Boolean,
      default: true
    },
    // 判断是否显示  显示更多
    isLastPage: {
      type: Boolean,
      default: false
    },
    type: {
      type: String
    },
    showActivites: {
      type: String,
      default: '0'
    }
  },
  watch: {
    lists: function (n, o) {
      this.lists_item = this.lists
    }
  },
  methods: {
    isLogin () {
      if (!this.$store.state.isLogin) {
        this.$alert('请先登录')
        return ''
      } else { return 1 }
    },
    // 显示提交收藏弹框
    showCol (val, index) {
      if (!this.isLogin()) {
        return
      }
      if (this.isShowCol === val) {
        this.isShowCol = ''
        this.index = ''
        return
      }
      this.isShowCol = val
      this.index = index
    },
    // 确认收藏之后的回调
    confirmCollect (val, num) {
      // 是否收藏 通过 Lists 修改首页是否收藏数据
      this.$emit('change-col', this.index, val, num)
      this.isShowCol = ''
      this.index = ''
    },
    // 文章点赞
    async praisePost (index, pid, postAuth) {
      this.index = index
      if (!this.isLogin()) {
        return
      }
      const res = await praisePost({ pid, postAuth })
      this.$emit('change-praise', this.index, res.isPraised, res.hands)
      this.index = ''
    }
  }
}
</script>
<style lang='scss' scoped>
.isreply {
  font-size: 10px;
  color: #c2ccd0;
}
.activites {
  padding: 30px 0 0 15px;
  color: #8a9aa9;
}
.attention {
  font-size: 16px;
  border-bottom: 1px solid rgba(178, 186, 194, 0.15);
  text-align: left;
}
.lsItemLi {
  border: 1px solid rgba(178, 186, 194, 0.15);
  padding: 10px 10px 0px 10px;
  height: auto;
  display: flex;
  flex-flow: row;
  justify-content: center;
  .lsItemMain {
    flex: 1;
    padding-bottom: 5px;
    .lsItemTop {
      font-size: 12px;
      color: #999999;
      a {
        margin-left: 5px;
      }
    }
    h2 {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 20px;
      margin-top: 10px;
      &:hover {
        transform: scale(1.05, 1.05);
        // color: #175199;
        color: #01aaed;
      }
      transition: transform 0.5s, color 0.5s;
      transform-origin: left;
    }
    ::v-deep .layui-btn-group {
      border: none;
      .layui-btn {
        width: 65px;
        border: 1px #eeeeee solid;
        color: #b2bac2;
        height: 30px;
        line-height: 30px;
        padding-left: 3px;
      }
      .layui-btn:nth-child(4) {
        border: none;
        color: #999999;
      }
      .layui-btn:nth-child(5) {
        border: none;
        color: #ff5722;
      }
    }
  }
  .picRegin {
    width: 100px;
    height: 75px;
    img {
      height: 75px;
      width: 100px;
    }
  }

  .handed {
    color: #ff5722 !important;
  }
}
</style>
