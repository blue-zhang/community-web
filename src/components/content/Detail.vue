<template>
  <div>
    <div class="middle-container2 mt20">
      <div class="seat"></div>
      <div class="fly-panel mainContainer">
        <div class="fly-detail-info">
        </div>
        <div class="detail-about">
          <div class="fly-avatar">
            <img :src="detail.uid.pic"
                 style="height: 50px; width: 50px;borderRadius: 50%">
          </div>
          <div class="fly-detail-user"
               style="marginLeft: 10px">
            <a>
              <router-link target="_blank"
                           class="ToUidHome"
                           rel="noopener noreferrer"
                           :to="{name: 'UserHome', params: { uid: detail.uid._id }}">
                <b class="blink"
                   :class="{ 'vip-color': detail.uid.isVip !== '0'}">{{ detail.uid.fakename }}</b>
              </router-link>
              <i style="fontSize:8px"
                 class="co-origin">{{ ' LV' + detail.uid.lv }}</i>
            </a>
            <span class="layui-badge"
                  style="marginLeft: 10px">{{detail.catalog | _catalog}}</span>
            <span v-show="detail.favs"
                  style="marginLeft: 10px; color: #FF7200">{{'悬赏:' + detail.favs + '积分'}}</span>
          </div>
          <div class="detail-hits"
               style="margin: 10px 0 0 10px">
            <span>{{ detail.created | _moment }}</span>
            <span style="marginLeft: 20px"><i class="layui-icon layui-icon-read"></i> {{ detail.reads }}</span>
            <span style="marginLeft: 20px"><i class="layui-icon layui-icon-reply-fill"></i> {{ detail.answer }}</span>
            <button type="button"
                    style="float: right; marginLeft: 20px"
                    v-show="detail.uid._id === userObj._id"
                    @click="update(detail._id, detail)"
                    class="layui-btn layui-btn-sm">
              <i class="layui-icon"></i> 编辑
            </button>
            <button type="button"
                    style="float: right"
                    v-show="detail.uid._id === userObj._id"
                    @click="delPost(detail)"
                    class="layui-btn layui-btn-sm">
              <i class="layui-icon"></i> 删除
            </button>
          </div>
        </div>
        <div class="detail-body">
          <div style="margin: 0 auto;maxHeight:700px">
            <img v-show="detail.picUrl"
                 :src="detail.picUrl"
                 alt="图片不见了">
          </div>
          <h1 class="detail-title">{{detail.title}}</h1>
          <div class="detail-content">
          </div>
          <div class="detail-footer">
            <span class="authority">本文为我原创</span>
            <span class="authority">本文禁止转载或摘编</span>
            <div class="footer-btn">
              <span style="color: #999;fontSize: 14px"><i style="paddingRight: 3px;fontSize:30px"
                   @click="praisePost"
                   :class="{ 'co-origin': detail.handed === '1' }"
                   class="layui-icon layui-icon-praise pointer"></i>{{ detail.hands }}</span>
              <span style="color: #999;fontSize: 14px;paddingLeft: 35px"><i style="paddingRight: 3px;fontSize:30px"
                   @click="showCol"
                   :class="{ 'co-origin': detail.collected === '1' }"
                   class="layui-icon layui-icon-star pointer"></i>{{ detail.stars }}</span>
              <alert-collect v-if="isShow"
                             :postUid='detail.uid._id'
                             @confirmCollect='confirmCollect'
                             @close='isShow = false'></alert-collect>
            </div>
          </div>
        </div>
        <div class="layui-form layui-form-pane mt20">
          <editor class="commentEditor"
                  style="width: 100%"
                  :comments='true'
                  @submitComments="submitComments"></editor>
        </div>
        <ul class="jieda commentsUl">
          <li class="jieda-daan"
              :data-id="'comments' + item._id"
              style="borderBottom: 1px solid #f1f1f1"
              v-for="(item, index) in comments"
              :key="item._id + 'comments'">
            <div class="comments-body">
              <div class="comments-userpic">
                <img class="userPic"
                     :src="item.cuid.pic">
              </div>
              <div class="comments-content">
                <div class="fly-detail-user">
                  <router-link target="_blank"
                               class="ToUidHome"
                               rel="noopener noreferrer"
                               :to="{name: 'UserHome', params: { uid: item.cuid._id }}">
                    <b class="blink"
                       :class="{ 'vip-color': item.cuid.isVip !== '0'}">{{ item.cuid.fakename }}</b>
                  </router-link>
                  <span v-show="item.cuid._id === item.uid">(作者)</span>
                </div>
                <div class="wrapContent"
                     v-html="item.content"></div>
                <div class="jieda-reply"
                     style="marginTop: 5px">
                  <span>{{item.created | _moment}}</span>
                  <span>
                    <i @click="praiseComments(item, item._id, item.cuid._id, item.handed)"
                       :class="{ 'co-origin': item.handed === '1' }"
                       class="layui-icon layui-icon-praise"></i>
                    <em>{{ item.hands }}</em>
                  </span>
                  <span @click="showEditor(item._id + 'comments', item.cuid.fakename)">回复</span>
                  <span v-show="userObj._id === item.cuid._id"
                        @click="delComments(item._id, index)">删除</span>
                  <span v-show="userObj._id === item.uid && detail.catalog === 'askdiscuss'">采纳</span>
                </div>
                <div class="layui-form layui-form-pane"
                     v-if="editorClass === item._id + 'comments'"
                     style="width: 100%;max-width: 650px">
                  <editor-reply :comments='true'
                                style="width: 100%"
                                :preContent='"回复: " + item.cuid.fakename'
                                @submitComments="submitComments('reply', item._id, item._id, item.cuid._id)"></editor-reply>
                </div>
              </div>
              <i class="iconfont icon-caina"
                 v-show="item.cuid.isBest === '1'"
                 style="fontSize: 25px"
                 title="最佳答案"></i>
            </div>
            <!-- 对评论的回复 -->
            <ul class="replyUl">
              <li v-for="(reply, num) in replys[item._id]"
                  :data-id="'comments' +reply._id "
                  :key="reply._id + 'reply'"
                  style="borderBottom: none; padding: 0">
                <div class="reply-body">
                  <div class="reply-userpic">
                    <img class="userPic"
                         :src="reply.rcuid.pic">
                  </div>
                  <div class="reply-content"
                       style="width: 100%">
                    <div class="reply-text">
                      <router-link target="_blank"
                                   class="ToUidHome"
                                   rel="noopener noreferrer"
                                   :to="{name: 'UserHome', params: { uid: reply.rcuid._id }}">
                        <span class="blink"
                              :class="{ 'vip-color': item.cuid.isVip !== '0'}">{{ reply.rcuid.fakename }}</span>
                      </router-link>
                      <span v-show="reply.rcuid._id === item.uid">(作者)</span>
                      回复:
                      <router-link target="_blank"
                                   class="ToUidHome"
                                   rel="noopener noreferrer"
                                   :to="{name: 'UserHome', params: { uid: reply.ruid._id }}">
                        <span class="blink"> {{ reply.ruid.fakename }}</span>
                      </router-link>
                      <span>:</span>
                      <div class="wrapContent"
                           style="marginLeft: 16px"
                           v-html="reply.content">
                      </div>
                    </div>
                    <div class="jieda-reply">
                      <span>{{reply.created | _moment}}</span>
                      <span>
                        <i @click="praiseReply(reply, reply._id, reply.rcuid._id, reply.handed)"
                           :class="{ 'co-origin': reply.handed === '1' }"
                           class="layui-icon layui-icon-praise"></i>
                        <em>{{ reply.hands }}</em>
                      </span>
                      <span @click="showEditor(reply._id + 'reply', reply.rcuid.fakename)">回复</span>
                      <span v-show="userObj._id === reply.rcuid._id"
                            @click="delReply(reply._id, item._id, num)">删除</span>
                    </div>
                    <div class="layui-form layui-form-pane"
                         v-if="editorClass === reply._id + 'reply'"
                         style="width: 100%;max-width: 650px">
                      <editor-reply :comments='true'
                                    style="width: 100%"
                                    :preContent='"回复: " + reply.rcuid.fakename'
                                    @submitComments="submitComments('reply', item._id, reply._id, reply.rcuid._id)"></editor-reply>
                    </div>
                  </div>
                </div>
              </li>
              <!-- replys[item._id] 是 undefined 时不能获取 length -->
              <div class="moreReply"
                   :key="item._id + 'showMore'"
                   v-if="replyLastPage[item._id]"><span @click.prevent="moreReply(item._id, index)">展开更多回复</span>
              </div>
            </ul>
          </li>
        </ul>
      </div>
      <div class="rightContainer">
        <MyAchieve :fixed='fixed'
                   :userInfo='detail.uid'
                   :margin='margin' />
      </div>
      <div class="seat"></div>
    </div>
  </div>
</template>

<script>
import Editor from '@/components/modules/editor/Editor'
import EditorReply from '@/components/modules/editor/EditorReply'
import AlertCollect from '@/components/content/AlertCollect'
import MyAchieve from '@/components/user-home/MyAchieve'
import { getDetail, delPost, praisePost, incReads } from '@/api/content'
import { submitComments, getCommentsLs, delComments, delReply, submitReply, getReplyLs, praiseComments } from '@/api/comments'
import mixinLoad from '@/mixin/mixin-load'
import { scrollToElem } from '@/utils/scrollToElem'
import { getParams } from '@/utils/urlHandler'

export default {
  name: 'Deatil',
  components: {
    Editor,
    AlertCollect,
    EditorReply,
    MyAchieve
  },
  mixins: [mixinLoad],
  data () {
    return {
      detail: {
        uid: {}
      },
      pid: '',
      comments: [],
      // rcuid是发表回复的人，ruid是被回复的人，cid是回复列表上面的那个评论
      replys: {},
      editorClass: '', // 控制显示回复的编辑器
      page: 0,
      limit: 20,
      repLimit: 15,
      // reply 的加载，不能用 mixin ，需要再重写一遍，或者把 reply 列表拆分成一个组件
      replyPage: 0,
      replyIsWait: false,
      isShow: false,
      replyLastPage: {},
      repIdLs: [],
      // 传给MyAchieve的属性
      offset: 0,
      margin: '0px',
      fixed: false
    }
  },
  computed: {
    userObj () {
      return this.$store.state.userInfo
    }
  },
  methods: {
    isLogin () {
      if (!this.$store.state.isLogin) {
        this.$alert('请先登录')
        return ''
      } else { return 1 }
    },
    // 初始化加载评论和回复
    async _getList (rid = '') {
      this.isWait = true
      // 加载评论
      const comments = await getCommentsLs({
        rid: rid,
        pid: this.pid,
        page: this.page,
        limit: this.limit
      })
      // 添加评论数据
      if (comments.code === 200 && comments.data.length > 0) {
        this.isWait = false
        // 判断评论是不是最后一页
        if (comments.data.length < this.limit) {
          this.isLastPage = true
        } else {
          this.isLastPage = false
        }
        if (this.comments.length === 0) {
          this.comments = comments.data
        } else {
          this.comments = this.comments.concat(comments.data)
        }
        // 添加回复数据
        this.replys = comments.replys
        this.replyPage = comments.replyPage
        for (let id of Object.keys(this.replys)) {
          if (this.replys[id].length < (this.repLimit * (this.replyPage + 1))) {
            this.replyLastPage[id] = false
          } else {
            this.replyLastPage[id] = true
          }
        }
        // 判断回复是不是最后一页
      }
    },
    // 点击加载更多回复
    moreReply (id, index) {
      if (this.comments[index].isLastPage) return
      if (this.replyIsWait) return
      this.replyPage++
      this.getReplysById(id, index)
    },
    // 加载更多回复
    async getReplysById (id, index) {
      this.replyIsWait = true
      const reply = await getReplyLs({
        cid: id,
        page: this.replyPage,
        limit: this.repLimit
      })
      if (reply.code === 200) {
        if (reply.data.length !== 0) {
          let data = []
          // 判断是否不加载某些回复
          if (this.repIdLs.length !== 0) {
            reply.data.forEach((item, index, arr) => {
              if (!this.repIdLs.includes(item._id)) {
                data.push(item)
              }
            })
          }
          this.replys[id] = this.replys[id].concat(data)
          this.replyIsWait = false
        }
        if (reply.data.length < this.repLimit) {
          this.replyLastPage[id] = false
        } else {
          this.replyLastPage[id] = true
        }
      }
    },
    // 展示评论或回复的编辑器
    showEditor (val, user) {
      if (!this.isLogin()) {
        return
      }
      if (this.editorClass === val) {
        this.editorClass = ''
        return
      }
      this.editorClass = val
    },
    // 提交 评论 或 回复
    // 评论是由新到旧排序! 回复是由旧到新排序！
    // 注意，提交的回复的id要生成一个列表，防止点击加载更多的时候重复加载这个数据
    // 不让有可能会造成有两个相同的回复，然后还会报 dublekey 错误
    submitComments (val, cid, rid, ruid) {
      if (!this.isLogin()) {
        return
      }
      // reply.ruid 不是通过内嵌查询到的，注意！！
      const comments = this.$store.state.comments
      if (comments === '') {
        this.$alert('请输入评论内容!')
      } else if (val === 'reply') {
        submitReply({
          content: comments, cid, rid, ruid, pid: this.pid
        }).then((res) => {
          if (res.code === 200) {
            this.$alert('回复成功')
            const ar = this.replys[cid] ? this.replys[cid] : []
            res.data.handed = '0'
            ar.push(res.data)
            // 提交的回复的id要生成一个列表, 防止点击加载更多的时候重复加载这个数据
            this.repIdLs.push(res.data._id)
            this.replys[cid] = ar
            this.$store.state.comments = ''
            this.editorClass = ''
            this.detail.answer++
          }
        })
      } else {
        submitComments({ content: comments, pid: this.pid }).then((res) => {
          if (res.code === 200) {
            this.$alert('评论成功')
            res.data.cuid = this.userObj
            res.data.handed = '0'
            this.comments.unshift(res.data)
            this.$store.state.comments = ''
            this.detail.answer++
          }
        })
      }
    },
    update (updatePid, post) {
      if (post.isEnd === '1') {
        this.$pop('shake', '帖子已经结贴，无法编辑')
      } else {
        this.$router.push({ name: 'PostUpdate', params: { updatePid, post } })
      }
    },
    // 删除
    delPost (post) {
      this.$confirm('您确定要删除这篇文章吗？', () => {
        if (post.isEnd === '1') {
          this.$pop('shake', '帖子已经结贴，无法删除')
        } else {
          delPost({ pid: this.detail._id }).then((res) => {
            this.$bubble(res.msg)
            this.$router.push({ name: 'index' })
          })
        }
      }, () => { })
    },
    delComments (cid, index) {
      this.$confirm('删除后对该评论的回复都会删除', () => {
        // 删除 评论 及 该评论的回复
        delComments({ cid, pid: this.pid }).then((res) => {
          this.comments.splice(index, 1)
          this.replys[cid] = []
          this.$bubble(res.msg)
          this.detail.answer = this.detail.answer + res.num
        })
      }, () => { })
    },
    delReply (rid, cid) {
      this.$confirm('删除后对该评论的回复都会删除', () => {
        delReply({ rid, pid: this.pid }).then((res) => {
          const newReply = []
          if (res.code === 200) {
            // 前端 replys 数组中删除 _id 为 rid 的回复 及 该回复的回复
            this.replys[cid].forEach((item) => {
              if (item._id !== rid && item.rid !== rid) {
                newReply.push(item)
              }
            })
            this.replys[cid] = newReply
            this.$bubble(res.msg)
            this.detail.answer = this.detail.answer + res.num
          }
        })
      }, () => { })
    },
    // 显示提交收藏弹框
    showCol () {
      if (!this.isLogin()) {
        return
      }
      this.isShow = true
    },
    // 确认收藏之后的回调
    confirmCollect (val, num) {
      this.detail.collected = val
      this.detail.stars = num
      this.isShow = false
    },
    /**
   * @description: 点赞评论
   * @param {*} index 评论数据在列表的位置
   * @param {*} cid 评论id
   * @param {*} cuid 被点赞的用户
   * @param {*} isPraised 点赞，false: 取消点赞
   */
    async praiseComments (item, cid, cuid, isPraised) {
      if (!this.isLogin()) {
        return
      }
      let res = await praiseComments({ cid, cuid, isPraised, pid: this.pid })
      if (res.code === 200) {
        item.handed = '1'
        item.hands++
      } else if (res.code === 201) {
        item.handed = '0'
        item.hands--
      } else {
        this.$alert(res.msg)
      }
    },
    async praiseReply (reply, rcid, cuid, isPraised) {
      if (!this.isLogin()) {
        return
      }
      const res = await praiseComments({ rcid, cuid, isPraised, pid: this.pid })
      if (res.code === 200) {
        reply.handed = '1'
        reply.hands++
      } else if (res.code === 201) {
        reply.handed = '0'
        reply.hands--
      } else {
        this.$alert(res.msg)
      }
    },
    async praisePost () {
      if (!this.isLogin()) {
        return
      }
      const res = await praisePost({ pid: this.detail._id })
      if (res.code === 200) {
        this.detail.handed = res.isPraised
        this.detail.hands = res.hands
      } else if (res.code === 201) {
        this.detail.handed = res.isPraised
        this.detail.hands = res.hands
      }
    },
    scrollHandler (e) {
      const debounce = this._.debounce(() => {
        this.offset = document.querySelector('.mainContainer').getBoundingClientRect().top
      }, 100)
      debounce()
    }
  },
  async mounted () {
    // 获取文章详情
    this.pid = this.$route.params.pid
    let rid = getParams('rid') // 跳转到具体的评论或回复
    let cid = getParams('cid') // 跳转到文章评论
    let to = getParams('to') // 跳转到评论区
    // 获取文章详情
    if (this.$route.params.detail) {
      this.detail = this.$route.params.detail
      // 暂时废弃，因为跳转到一个新窗口，一定会发送请求，没有params.detail
      // 不发送请求就不能增加阅读数，所以要单独增加一个接口
      const update = await incReads({ pid: this.pid })
      if (update.code === 200) {
        this.detail.reads++
      }
    } else {
      const detail = await getDetail(this.pid)
      if (detail.code === 200) {
        this.detail = detail.data
      }
    }
    // 加载评论回复
    if (rid) {
      // 加载直到指定的回复被加载出来
      await this._getList(rid)
    } else {
      // 获取评论列表
      await this._getList()
    }

    await this.$nextTick()
    document.querySelector('.detail-content').innerHTML = this.detail.content
    // MyAchieve 滚动效果
    window.addEventListener('scroll', this.scrollHandler)
    this.$watch('offset', function (n, o) {
      if (n - o >= 0) {
        this.fixed = true
        this.margin = '0px'
      } else {
        this.fixed = true
        this.margin = '-80px'
      }
    })
    // 跳转逻辑
    if (to) {
      // 滚动到评论区
      scrollToElem('.commentEditor', 500, -97)
    } else if (rid) {
      // 滚动到回复
      this.editorClass = rid + 'reply'
      rid = `li[data-id=comments${rid}]`
      scrollToElem(rid, 500, -97)
    } else if (cid) {
      // 滚动到评论
      this.editorClass = cid + 'comments'
      cid = `li[data-id=comments${cid}]`
      scrollToElem(cid, 500, -97)
    }
  }
}
</script>

<style lang="scss" scoped>
.mainContainer {
  width: 700px;
  min-width: 500px;
  max-width: 700px;
  padding: 0 20px;
  margin: 0 20px;
}
.rightContainer {
  width: 200px;
  min-width: 200px;
  max-width: 200px;
}
.jieda {
  li {
    padding: 12px 0 0;
  }
}
.detail-about {
  background-color: white;
}
.detail-body {
  display: flex;
  flex-flow: column;
  justify-content: center;
}
.detail-title {
  font-size: 35px;
  text-align: left;
  font-weight: bolder;
  margin: 30px 0 40px 0;
}
.detail-content {
  background-image: linear-gradient(
      90deg,
      rgba(221, 219, 219, 0.15) 5%,
      rgba(0, 0, 0, 0) 5%
    ),
    linear-gradient(rgba(204, 202, 202, 0.15) 5%, rgba(0, 0, 0, 0) 5%);
  background-size: 15px 15px;
}
.detail-footer {
  margin: 40px 0 0 0;
  .footer-btn {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    span {
      font-size: 20px;
      padding-right: 40px;
      i {
        font-size: 20px;
      }
    }
  }
}
.comments-body {
  display: flex;
  .comments-userpic {
    width: 45px;
    padding-right: 15px;
    img {
      width: 45px;
      height: 45px;
    }
  }
  .comments-content {
    flex: 1;
    display: flex;
    flex-flow: column;
    align-items: flex-start;
    justify-content: flex-start;
  }
  div {
    padding: 2px 0;
  }
}
.replyUl {
  background-color: #fafbfc;
  margin: 0 0 10px 50px;
  li:last-child {
    div {
      border-bottom: none;
    }
  }
  .reply-body {
    padding: 6px 0;
    margin-left: 10px;
    display: flex;
    border-bottom: 1px solid #f1f1f1;
    .reply-userpic {
      width: 30px;
      padding-right: 10px;
      img {
        width: 30px;
        height: 30px;
      }
    }
    .reply-content {
      flex: 1;
      display: flex;
      flex-flow: column;
      align-items: flex-start;
      justify-content: flex-start;
      .reply-text {
        width: 100%;
      }
    }
    div {
      padding: 2px 0;
    }
  }
}
.authority {
  padding-right: 40px;
  margin-bottom: 12px;
  color: silver;
  font-size: 12px;
  line-height: 15px;
}
.post-reply {
  margin: 0 0 20px 0;
  width: 100px;
  float: right;
}
.moreReply {
  padding: 3px;
  color: #8590a6;
  text-align: center;
  span {
    cursor: pointer;
    &:hover {
      color: #393d49;
    }
  }
}
</style>
