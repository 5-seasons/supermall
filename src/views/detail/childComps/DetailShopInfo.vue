<template>
  <div class="shop-info">
    <div class="shop-top">
      <img :src="shop.logo" />
      <span class="title">{{ shop.name }}</span>
    </div>
    <div class="shop-middle">
      <div class="shop-middle-item shop-middle-left">
        <div class="info-goods">
          <div class="goods-count">
            {{ shop.goodsCount }}
          </div>
          <div class="goods-text">在架商品</div>
        </div>
        <div class="info-sells">
          <div class="sells-count">
            {{ shop.sells | sellCountFilter }}
          </div>
          <div class="sells-text">累计销量</div>
        </div>
      </div>
      <div class="shop-middle-item shop-middle-right">
        <table>
          <tr v-for="(item, index) in shop.score" :key="index">
            <td>{{ item.name }}</td>
            <td class="score" :class="{ 'score-better': item.isBetter }">
              {{ item.score }}
            </td>
            <td class="better" :class="{ 'better-more': item.isBetter }">
              <span>{{ item.isBetter ? "高" : "低" }}</span>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="shop-bottom">
      <a class="all-goods" :href="shop.allGoods">全部宝贝</a>
      <a class="go-shop" :href="shop.url">进店逛逛</a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailShopInfo",
    props: {
      shop: {
        type: Object,
        default() {
          return {};
        },
      },
    },
    filters: {
      sellCountFilter: function (value) {
        if (value < 10000) return value;
        return (value / 10000).toFixed(1) + "w";
      },
    },
  };
</script>

<style scoped>
  .shop-info {
    padding: 20px 8px;
    border-bottom: 5px solid #f2f5f8;
  }

  .shop-top {
    line-height: 45px;
    /* 让元素水平居中和垂直居中 */
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .shop-top img {
    width: 45px;
    height: 45px;
    /* border-radius: 50%; */
    border: 1px solid rgba(0, 0, 0, 0.1);
    margin-right: 8px;
  }

  .shop-top .title {
    margin-left: 8px;
  }

  .shop-middle {
    margin-top: 15px;
    display: flex;
    align-items: center;
  }

  .shop-middle-item {
    flex: 1;
  }

  .shop-middle-left {
    display: flex;
    justify-content: space-evenly;
    color: #333;
    text-align: center;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
  }

  .goods-count,
  .sells-count {
    font-size: 18px;
  }

  .goods-text,
  .sells-text {
    margin-top: 10px;
    font-size: 12px;
  }

  .shop-middle-right {
    font-size: 13px;
    color: #333;
  }

  .shop-middle-right table {
    width: 120px;
    margin-left: 30px;
  }

  .shop-middle-right table td {
    padding: 5px 0;
  }

  .shop-middle-right .score, .shop-middle-right .better {
    color: #47b34f;
  }

  .shop-middle-right .score-better, .shop-middle-right .better-more {
    color: #e93b3d;
  }

  .shop-bottom {
    display: flex;
    justify-content: space-evenly;
    margin-top: 10px;

    font-size: 14px;
    text-align: center;
  }

  .all-goods {  
    flex: 1;
    border:1px solid rgba(255,0,54,0.5);
    border-radius: 12px;

    height: 24px;
    line-height: 22px;
    color: rgba(255,0,54,0.8);
    display: inline-block;
    max-width: 96px;
  }

  .go-shop {
    flex: 1;
    border:1px solid rgba(255,0,54,0.5);
    border-radius: 12px;

    height: 24px;
    line-height: 22px;
    color: rgba(255,0,54,0.8);
    display: inline-block;
    max-width: 96px;
  }
</style>
