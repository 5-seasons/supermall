<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" />
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info :param-info="paramInfo" />
      <detail-comment-info :comment-info="commentInfo" />
      <goods-list :goods="goodsList" />
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";

import GoodsList from "components/content/goods/GoodsList"

import Scroll from "components/common/scroll/Scroll";

import { getDetail, getRecommend, Goods, Shop, GoodsParam } from "network/detail";
import { debounce } from 'common/utils';
import { itemListenerMixin } from "common/mixin"

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    Scroll,
  },
  mixins:[itemListenerMixin],
  data() {
    return {
      iid: "",
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      goodsList: [],

    };
  },
  created() {
    // 1.保存GoodsItem中传入的iid
    this.iid = this.$route.params.iid;

    // 2.发送商品详情请求
    this._getDetail(this.iid);

    // 3.发送商品推荐请求
    this._getRecommend();
  },
  destroyed(){
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
      // this.refresh()
    },
    _getDetail(iid) {
      getDetail(iid).then((res) => {
        // console.log(res);

        // 1.获取数据
        const data = res.result;

        // 2.获取顶部的图片数据
        this.topImages = data.itemInfo.topImages;

        // 3.获取商品信息
        this.goods = new Goods(
          data.itemInfo,
          data.columns,
          data.shopInfo.services
        );

        // 4.获取店铺信息
        this.shop = new Shop(data.shopInfo);

        // 5.获取商品详情数据
        this.detailInfo = data.detailInfo;

        // 6.获取参数信息
        this.paramInfo = new GoodsParam(
          data.itemParams.info,
          data.itemParams.rule
        );

        // 7.获取评论数据
        if (data.rate.list) {
          this.commentInfo = data.rate.list[0];
        }
      });
    },
    _getRecommend() {
      getRecommend().then(res => {
        // console.log(res);

        this.goodsList = res.data.list
      })
    }
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  background-color: var(--color-background);
  height: 100vh;
  z-index: 9;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: var(--color-background);
}

.content {
  height: calc(100% - 44px);
}
</style>