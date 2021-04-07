<!--
 * @Author: your name
 * @Date: 2021-03-05 09:18:31
 * @LastEditTime: 2021-03-07 16:53:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front\src\components\content\Collect.vue
-->
<template>
  <select-alert @close="$emit('close')">
    <template v-slot:lists>
      <ul class="colLists">
        <li v-for="(item,index) in colLists"
            :key="item._id + 'colLists'">
          <div class="layui-unselect layui-form-checkbox"
               :class="{'layui-form-checked': item.isBlong === '1'}"
               lay-skin="primary">
            <span :title="item.name">{{item.name}}</span>
            <i @click="chooseCollection(item, index)"
               class="layui-icon layui-icon-ok"></i>
          </div>
          <div>{{item.num}}</div>
        </li>
        <div class="creatColBtn pointer">
          <div @click="showCreate"
               v-show="isCreate">新建文件夹</div>
          <form v-show="!isCreate"
                class="input-group">
            <input type="text"
                   class="input-item"
                   maxlength="20"
                   v-model="name"
                   placeholder="最多可输入20个字">
            <button type="button"
                    @click="createCol"
                    class="submit">新建</button>
          </form>
        </div>
      </ul>
    </template>
    <template v-slot:btn>
      <button type="button"
              class="layui-btn layui-btn-radius"
              :class="{'layui-btn-disabled': disableBtn}"
              @click="doCol()">确定</button>
    </template>

  </select-alert>
</template>

<script>
import SelectAlert from '@/components/modules/alert/SelectAlert'
import { getColLists, createCol, doCol } from '@/api/postCollect'
export default {
  name: 'AlertCollect',
  components: {
    SelectAlert
  },
  props: {
    postUid: {
      type: String
    },
    // 首页路由没有 pid
    pid: {
      type: String
    }
  },
  data () {
    return {
      colLists: [],
      colData: [], // 传给后端的数据
      isCreate: true,
      disableBtn: true,
      name: '', // 新建收藏夹的名字
      ctrl: [] // 用来判断是否显示 收藏 按钮
    }
  },
  methods: {
    // 每点击一次多选框触发一次这个方法, 选择要收藏的收藏夹
    chooseCollection (item, index) {
      // 点击之后，改变是否收藏的显示
      item.isBlong = item.isBlong === '1' ? '0' : '1'
      // ctrl 默认都是 0，当用户点击index收藏夹，ctrl[index]就会按 1 0 1 0 变化，如果收藏夹情况不同，那么肯定有一项为 1
      this.ctrl[index] = this.ctrl[index] ? 0 : 1
      // ctrl 中有值为 1 的项，说明用户改变了收藏夹
      if (this.ctrl.some((item) => {
        return item === 1
      })) {
        this.disableBtn = false
      } else {
        this.disableBtn = true
      }
    },
    async doCol () {
      // 把状态改变了的收藏发送给后端，'1'代表要执行收藏
      this.ctrl.forEach((item, index) => {
        if (item === 1) {
          this.colData.push({
            isBlong: this.colLists[index].isBlong,
            colId: this.colLists[index]._id
          })
        }
      })
      let pid
      if (this.$route.params.pid) {
        pid = this.$route.params.pid
      } else {
        pid = this.pid
      }
      const data = await doCol({
        colData: this.colData,
        pid,
        source: this.postUid
      })
      // 传给Detail的参数是该文章是否被收藏
      if (data.code === 200) {
        this.$emit('confirmCollect', data.isBlong, data.num)
      }
    },
    // 创建收藏夹
    async createCol () {
      const res = await createCol({ name: this.name })
      if (res.code === 200) {
        const data = res.data
        data.isBlong = '0'
        this.colLists.splice(0, 0, data)
        this.ctrl.splice(0, 0, 0)
        this.name = ''
        this.isCreate = true
      } else if (res.code === 400) {
        this.$alert(res.msg)
        this.name = ''
      }
    },
    showCreate () {
      this.isCreate = false
      this.disableBtn = true
      // document.querySelector('.input-item').focus()
    }
  },
  async mounted () {
    let pid
    if (this.$route.params.pid) {
      pid = this.$route.params.pid
    } else {
      pid = this.pid
    }
    const data = await getColLists({ pid })
    this.colLists = data.lists
    let isBlongLs = []
    this.colLists.forEach((item) => {
      isBlongLs.push(item.isBlong)
    })
    this.ctrl = [...isBlongLs].fill(0)
  }
}
</script>

<style lang="scss" scoped>
.colLists {
  width: 100%;
  position: relative;
  padding: 5px 15px;
  .creatColBtn {
    padding: 7px 0;
    font-size: 14px;
    text-indent: 2px;
    color: #888;
    div {
      height: 34px;
      line-height: 34px;
      padding: 0 34px;
      border: 1px solid #ccd0d7;
      border-radius: 4px;
      font-size: 12px;
      color: #6d757a;
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAC5JREFUKBVjYMABZi5a9R+EcUgzMOGSICQ+EjQy4gs5fAFEduDgNHQ0HhnIT6sAudAOjNLnY/wAAAAASUVORK5CYII=)
        no-repeat 10px;
      cursor: pointer;
      &:hover {
        border: 1px solid #009688;
      }
    }
  }
  li:first-child {
    border-top: #e2e2e2 1px solid;
  }
  li {
    line-height: 27px;
    height: 27px;
    display: flex;
    border-bottom: #e2e2e2 1px solid;
    padding: 5px 0px 0px;
    font-size: 14px;
    div:nth-child(1) {
      flex: 9;
      span {
        color: #111;
        min-width: 220px;
        max-width: 220px;
        padding-right: 15px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    div:nth-child(2) {
      flex: 1;
      margin: 0;
      font-size: 14px;
      color: #777;
    }
  }
}
</style>
