<template>
  <div>
    <div style="overflow:hidden">
      <panel></panel>
    </div>
    <div class="middle-container2"
         style="marginTop: 60px">
      <div class="seat"></div>
      <div class="mainContainer">
        <router-view></router-view>
      </div>
      <div class="rightContainer">
        <div class="homeSide">
          <!-- <tips v-if="$route.name != 'detail'" /> -->
          <ads v-if="$route.name != 'detail'" />
          <sign v-if="$route.name != 'detail'" />
          <hot-lists />
          <!-- <links v-if="$route.name != 'detail'" /> -->
        </div>
        <transition name="opacity">
          <div v-show="fixedAds"
               :style="{'top': top}"
               class="fixedAds">
            <ads v-if="$route.name != 'detail'" />
          </div>
        </transition>
      </div>
      <div class="seat"></div>
    </div>
    <base-to-top></base-to-top>
  </div>
</template>
<script>
import Ads from '../components/sidebar/Ads'
import Sign from '../components/sidebar/Sign'
// import Links from '../components/sidebar/Links'
import HotLists from '../components/sidebar/HotLists'
// import Tips from '../components/sidebar/Tips'
import Panel from '../components/Panel'

export default {
  name: 'Home',
  components: {
    Panel,
    Ads,
    Sign,
    // Links,
    HotLists
    // Tips
  },
  data () {
    return {
      fixedAds: false,
      homeSide: {},
      offset: 0,
      top: '125px'
    }
  },
  methods: {
    handler (e) {
      const debounce = this._.debounce(() => {
        this.offset = this.homeSide.getBoundingClientRect().top
      }, 100)
      debounce()
    }
  },
  async mounted () {
    await this.$nextTick()
    this.homeSide = document.querySelector('.homeSide')
    window.addEventListener('scroll', this.handler)
    this.$watch('offset', function (n, o) {
      const height = this.homeSide.scrollHeight
      // homeSide 部分的高度是871px
      if (n < -height - 15 && n < o) {
        this.fixedAds = true
        this.top = '65px'
      } else if (n < -900 && n > o) {
        this.fixedAds = true
        this.top = '125px'
      } else {
        this.fixedAds = false
      }
    })
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handler)
  }
}
</script>
<style
  lang="scss"
  scoped
>
.mainContainer {
  min-height: 200px;
  width: 700px;
  min-width: 500px;
  max-width: 700px;
  padding: 0 20px;
}
.rightContainer {
  width: 350px;
  min-width: 350px;
  max-width: 350px;
}
.fixedAds {
  position: fixed;
  width: 350px;
  transition: top 0.3s;
}
.opacity-enter,
.opacity-leave-to {
  opacity: 0;
}
.opacity-leave-active {
  transition: opacity 0.3s;
}
.opacity-enter-active {
  transition: opacity 0.3s;
}
</style>
