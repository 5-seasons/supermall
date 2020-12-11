<template>
  <div class="goods">
    <!-- :key="item.iid"会有重复的 故使用:key="item.acm" 详情页的推荐商品没有iid -->
    <goods-list-item v-for="item in goods" :key="item.acm" :goods-item="item" />
  </div>
</template>

<script>
  import GoodsListItem from './GoodsListItem'

  export default {
    name: "GoodsList",
    components: {
      GoodsListItem
    },
    props: {
      goods: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .goods {
    display: flex;
    flex-wrap: wrap;
    /* justify-content: space-around;
    padding: 3px; */

    justify-content: space-evenly;
  }
</style>
