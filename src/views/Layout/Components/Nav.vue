<template>
  <div id="nav-wrap">
    <h1 class="logo">
      <img src="../../../assets/images/logo.png" alt />
    </h1>
    <el-menu
      default-active="1-4-1"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      text-color="#fff"
      active-text-color="#fff"
      background-color="transparent"
      router
    >
      <template v-for="(item, index) in routers">
        <el-submenu v-if="!item.hidden" :key="item.id" :index="item.path">
          <!-- 一级菜单 -->
          <template slot="title">
            <!-- <i :class="item.meta.icon"></i> -->
            <svg-icon :iconClass="item.meta.icon" :className="item.meta.icon" />
            <span slot="title">{{ item.meta.name }}</span>
          </template>
          <!-- 子菜单 -->
          <el-menu-item
            v-for="(subItem, subIndex) in item.children"
            :key="subItem.id"
            :index="subItem.path"
          >{{ subItem.meta.name }}</el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { reactive, ref, computed } from '@vue/composition-api'
export default {
  name: 'navMenu',
  setup(props, { root }) {
    /* 
    数据
    */
    // const isCollapse = ref(false)
    const routers = reactive(root.$router.options.routes)
    console.log(routers)
    console.log(root.$store.state.app.isCollapse)
    /* 
    computed
     */
    const isCollapse = computed(() => root.$store.state.app.isCollapse)
    /*  
    函数
    */
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath)
    }
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath)
    }
    return { isCollapse, handleOpen, handleClose, routers }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/config.scss';
.logo {
  text-align: center;
  img {
    margin: 28px auto 25px;
    width: 92px;
    @include webkit(transition, all 0.3s ease 0s);
  }
}
#nav-wrap {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  background-color: #344a5f;
  @include webkit(transition, all 0.3s ease 0s);
  svg {
    font-size: 20px;
    margin-right: 10px;
  }
}
.open {
  #nav-wrap {
    width: $navMenu;
  }
}
.close {
  #nav-wrap {
    width: $navMenuMin;
  }
  .logo img {
    margin: auto;
    width: 70%;
  }
}
</style>
