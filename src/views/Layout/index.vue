<template>
  <div id="layout" :class="[menuStatus?'close':'open']">
    <layout-header />
    <layout-nav />
    <layout-main />
  </div>
</template>

<script>
import { reactive, ref, computed } from '@vue/composition-api'
import LayoutHeader from './Components/Header.vue'
import LayoutNav from './Components/Nav.vue'
import LayoutMain from './Components/Main.vue'
export default {
  name: 'layout',
  components: {
    LayoutHeader,
    LayoutNav,
    LayoutMain
  },
  setup(props, { root }) {
    const menuStatus = computed(() => root.$store.state.app.isCollapse)
    return { menuStatus }
  }
}
</script>
<style lang="scss" scoped>
</style>
