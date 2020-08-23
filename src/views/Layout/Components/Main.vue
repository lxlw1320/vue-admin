<template>
  <div id="main-wrap">
    <div class="main-content">
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},

  computed: {},

  methods: {}
}
</script>
<style lang="scss" scoped>
@import '@/styles/config.scss';
#main-wrap {
  height: 100vh;
  // width: calc(100vh-$navMenu);
  // // height: calc(100vh-75px);
  // // position: fixed;
  // // left: 250px;
  // // top: 75px;
  // // right: 0;
  // // bottom: 0;
  // padding: 75px 0 0 250px;
  // border: 30px solid #f7f7f7;
  // border-bottom: none;
}

.main-content {
  width: 100%;
  height: 100%;
  padding: $layoutHeader + 30 30px 30px $navMenu + 30;
  // padding-top: $layoutHeader + 30;
  // padding-left: $navMenu + 30;
  box-sizing: border-box;
  @include webkit(-webkit-box-sizing, border-box);
  @include webkit(transition, all 0.3s ease 0s);
}
.open {
  .main-content {
    padding-left: $navMenu + 30;
  }
}
.close {
  .main-content {
    padding-left: $navMenuMin + 30;
  }
}
.content {
  width: 100%;
  height: 100%;
  padding-top: 30;
  padding-left: 30;

  box-sizing: border-box;
  background-color: #fff;
  @include webkit(-webkit-box-sizing, border-box);
}
</style>

