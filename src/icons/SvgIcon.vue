<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
import { reactive, ref, computed } from '@vue/composition-api'
export default {
  name: 'SvgIcon',
  // props: ['iconClass', 'className'],
  props: {
    iconClass: {
      type: String,
      default: '',
      required: true
      // validate:(value)=>{
      //   return value>=0
      // }
    },
    className: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const iconName = computed(() => {
      return `#icon-${props.iconClass}`
    })

    const svgClass = computed(() => {
      if (props.className) {
        return `svg-icon ${props.className}`
      } else {
        return 'svg-icon'
      }
    })

    return { iconName, svgClass }
  }
}
</script>
<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  // color: red;
  // &.font50 {
  //   font-size: 50px;
  // }
}
</style>
