<template>
  <div id="shop-item">
    <div class="item-selector">
      <radio-button @click.native="radioClick" v-model="product.checked" />
    </div>
    <div class="item-img">
      <img :src="product.image" alt="商品图片" />
    </div>
    <div class="item-info">
      <div class="item-title">{{ product.title }}</div>
      <div class="item-desc">{{ product.desc }}</div>
      <div class="info-bottom">
        <div class="item-price left">¥{{ product.price }}</div>
        <div class="item-count right">x{{ product.count }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import RadioButton from './RadioButton'
  import { mapMutations } from 'vuex'

  export default {
    name: 'CartListItem',
    props: {
      product: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    components: {
      RadioButton
    },
    methods: {
      ...mapMutations(['check_toggle']),
      radioClick() {
        this.check_toggle(this.product)
      }
    },
  }
</script>

<style scoped>
  #shop-item {
    display: flex;
    padding: 20px 15px;
    margin: 9px;
    border-radius: 5px;
    background-color: #fff
  }

  .item-selector {
    flex-basis: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 9px;
  }

  .item-title, .item-desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .item-img img {
    width: 69px;
    height: 92px;
    border-radius: 2px;
  }

  .item-info {
    font-size: 16px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }

  .item-desc {
    font-size: 14px;
    color: #999;
    margin-top: 15px;
  }

  .info-bottom {
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }

  .item-price {
    color: #f46;
  }
</style>