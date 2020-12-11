<template>
  <div class="cart-list">
    <scroll class="wrapper" ref="srcoll" :click="true"> 
      <cart-list-item 
        v-for="(item, index) in cartList" 
        :key="index"
        :product="item"
      />
    </scroll>
  </div>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll'
  import CartListItem from './CartListItem'

  import { mapGetters } from 'vuex'

  export default {
    name: 'CartList',
    components: {
      Scroll,
      CartListItem,
    },
    //监听属性 类似于data概念
    computed: {
      ...mapGetters([
        'cartList'
      ])
    },
    // 添加商品后再次来到购物车页面时，刷新一下可滚动高度
    activated() {
      this.$refs.srcoll.refresh()
    }
  }
</script>

<style scoped>
  .cart-list {
    height: calc(100% - 137px); 
    background-color: #efefef;
  }

  .wrapper {
    overflow: hidden;
    height: 100%;
    position: relative;
  }
</style>