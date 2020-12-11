<template>
  <div class="bottom-bar">
    <div class="bar-item bar-icons" @click="threeClick">
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icon service"></i>
        <span class="text active">客服</span>
      </div>
      <div>
        <i class="icon select"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item bar-btns">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy" @click="buyTocart">立即购买</div>
    </div>
    <sport-ball class="sport-ball" ref="ball" />
  </div>
</template>

<script>
  import SportBall from 'components/content/sportBall/SportBall'

  export default {
    name: 'DetailBottomBar',
    components: {
			SportBall
    },
    methods: {
      addToCart(event) {
      	this.$refs.ball.run(event.target)
        this.$emit('addCart')
      },
      buyTocart() {
        this.$emit('buyNow')
      },
      threeClick() {
        this.$toast.show('敬请期待', 1500)
      }
    },
  }
</script>
<style scoped>
  .bottom-bar {
    height: 50px;
    background-color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;

    display: flex;
    text-align: center;
  }

  .bar-icons {
    flex: 46;
  }

  .bar-btns {
    flex: 54;
  }

  .bar-item {
    display: flex;
  }

  .bar-item>div {
    flex: 1;
  }

  .bar-icons .text {
    font-size: 12px;
  }

  .active {
    color: #ff5777;
  }

  .bar-icons .icon {
    display: block;
    width: 22px;
    height: 22px;
    margin: 6px auto 1px;
    background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
  }

  .bar-icons .shop {
    background-position:0 -98px;
  }

  .bar-icons .service {
    background-position:0 -54px;
  }

  .bar-btns {
    font-size: 14px;
    line-height: 50px;
  }

  .bar-btns .cart {
    background-color: #ffe6e8;
    color: #ff5777;
  }

  .bar-btns .buy {
    background: linear-gradient(90deg,#ff5777,#ff468f);
    color: #fff;
  }

  .sport-ball {
    position: absolute;
    left: 180px;
    bottom: 20px;
  }
</style>