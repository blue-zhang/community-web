<template>
  <div class="overflow">
    <table class="layui-table"
           border="0">
      <thead>
        <tr class="layui-table-header">
          <th>
            <div class="layui-table-cell pl0">
              <span>收藏夹</span>
            </div>
          </th>
          <th>
            <div class="layui-table-cell">
              <span>文章数量</span>
            </div>
          </th>
          <th class="min-cell"
              v-if="$route.params.uid === $store.state.userInfo._id">
            <div class="layui-table-cell">
              <span>操作</span>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="text-center pointer"
            v-for="(item, index) in colLists"
            :key="item._id + 'colLists'"
            @click="toCollection(item._id)">
          <td class="text-left">
            <div>{{item.name}}</div>
          </td>
          <td style="width:80px">
            <em style="fontSize: 14px">{{item.num}}</em>
          </td>
          <td v-if="$route.params.uid === $store.state.userInfo._id"
              style="width:100px">
            <div class="layui-btn layui-btn-xs"
                 v-if="item.name !== '默认收藏夹'"
                 @click.stop="delCol(item._id, index)">删除</div>
            <div class="layui-btn layui-btn-xs layui-btn-danger"
                 v-if="item.name !== '默认收藏夹'"
                 @click.stop="showInput(item.name, item._id, index)">重命名</div>
          </td>

        </tr>
      </tbody>
    </table>
    <select-alert v-if="isrename"
                  @close="isrename = false">
      <template v-slot:lists>
        <form class="input-group">
          <input type="text"
                 class="input-item"
                 maxlength="20"
                 v-model="newname"
                 placeholder="最多可输入20个字">
          <button type="button"
                  @click="rename()"
                  class="submit">确定</button>
        </form>
      </template>
    </select-alert>
    <router-link class="collection-link"
                 target="_blank"
                 rel="noopener noreferrer"
                 :to="{ name: 'UserCollection', params: {colId: colId} }"></router-link>
  </div>
</template>

<script>
import { getUserLists, delCol, rename } from '@/api/postCollect'
import SelectAlert from '@/components/modules/alert/SelectAlert'
export default {
  name: 'PostCollection',
  components: {
    SelectAlert
  },
  data () {
    return {
      colLists: [],
      newname: '',
      isrename: false,
      // 都是收藏夹id
      id: '',
      colId: '1',
      index: 0
    }
  },
  methods: {
    async toCollection (id) {
      this.colId = id
      setTimeout(() => {
        document.querySelector('.collection-link').click()
      }, 0)
    },
    async showInput (name, id, index) {
      this.isrename = true
      this.newname = name
      this.id = id
      this.index = index
    },
    async delCol (id, index) {
      this.$confirm('收藏夹删除后不可恢复', async () => {
        const res = await delCol({ id })
        if (res.code === 200) {
          this.colLists.splice(index, 1)
          this.$bubble(res.msg)
        }
      }, () => {

      })
    },
    async rename () {
      const res = await rename({ id: this.id, newname: this.newname })
      if (res.code === 200) {
        this.colLists[this.index].name = this.newname
      }
      this.index = 0
      this.id = ''
      this.isrename = false
    }
  },
  async mounted () {
    const data = await getUserLists({ uid: this.$route.params.uid })
    this.colLists = data.lists
  }
}
</script>

<style lang="scss" scoped>
</style>
