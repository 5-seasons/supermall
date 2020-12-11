<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="" />
      </div>
      <div slot="center" class="title">
        <div
          v-for="(item, index) in titles"
          :key="index"
          class="title-item"
          :class="{ active: index === currentIndex }"
          @click="titleClick(index)">
          {{ item }}
        </div>
      </div>
      <div slot="right" class="cart" @click="cartClick">
        <img src="~assets/img/detail/cart.svg" alt="" />
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";

  export default {
    name: "DetailNavBar",
    components: {
      NavBar,
    },
    data() {
      return {
        titles: ["商品", "参数", "评论", "推荐"],
        currentIndex: 0,
      };
    },
    methods: {
      titleClick(index) {
        this.currentIndex = index;
        this.$emit('titleClick', index)
      },
      backClick() {
        this.$router.back();
      },
      cartClick() {
        this.$router.push('/cart')
      }
    },
  };
</script>

<style scoped>
  .title {
    display: flex;
    font-size: 15px;
  }

  .title-item {
    flex: 1;
  }

  .active {
    color: var(--color-high-text);
  }

  .back img,.cart img {
    vertical-align: middle;
  }
</style>
