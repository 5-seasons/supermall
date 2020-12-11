<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" ref="nav" @titleClick="titleClick" />
    <scroll 
      class="wrapper" 
      ref="scroll" 
      :probe-type="3"
      @scroll="contentScroll" 
      :click="true"
    >
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info ref="param" :param-info="paramInfo" @imageLoad="imageLoad" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <goods-list ref="recommend" :goods="recommends" />
    </scroll>
    <detail-bottom-bar @addCart='addToCart' @buyNow='buyToNow' />
    <back-top @click.native="backTopClick" v-show="isShowBackTop" />
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
  import DetailBottomBar from "./childComps/DetailBottomBar"

  import GoodsList from "components/content/goods/GoodsList"
  import Scroll from "components/common/scroll/Scroll";

  import { getDetail, getRecommend, Goods, Shop, GoodsParam } from "network/detail";
  import { debounce } from 'common/utils';
  import { itemListenerMixin, backTopMixin } from "common/mixin"

  import { mapActions } from 'vuex'


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
      DetailBottomBar
    },
    mixins:[itemListenerMixin, backTopMixin],
    data() {
      return {
        iid: "",
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        currentIndex: 0,
      };
    },
    methods: {
      ...mapActions(['addCart', 'buyNow']),
      // 点击title滚动到对应主题的位置
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 500)
      },
      // 判断图片加载完成
      imageLoad(source) {
        // 1.刷新可滚动区域
        this.$refs.scroll.refresh();

        // console.log(source)
        /* 可以判断是谁发射:GoodsInfo/ParamInfo 
        同时验证子组件是否发射，之前GoodsInfo的watch逻辑写错了，导致没有发射 */

        /* 如果用的是防抖，不能：
        const refresh = debounce(this.$refs.scroll.refresh, 100)
        refresh()
        因为imageLoad会执行多次，每次的refresh都不是同一个函数，达不到防抖效果
        要这样做：
        this.refresh();
        混入中的refresh要保存到date中 */

        // 2.点击title滚动到对应主题的位置
        // offsetTop：当前元素相对于元素最近的非静态定位元素的距离
        this.themeTopYs = []
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.param.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        this.themeTopYs.push(Number.MAX_VALUE);

        // console.log(this.themeTopYs)
      },
      // 监听scroll的滚动
      contentScroll(position) {
        // 获取Y值
        const positionY = -position.y
        // 与themeTopY进行比对，滚动时让title与主题内容对应
        
        /* let length = this.themeTopYs.length;
        for (let i = 0; i < length - 1; i++) {
          if (this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])) {
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }; */
        // 用reduce方法重写
       /*  this.themeTopYs.reduce((acc, cur, index) => {
          if (this.currentIndex !== index-1 && (positionY >= acc && positionY < cur)) {
            this.currentIndex = index - 1;
            this.$refs.nav.currentIndex = this.currentIndex
          }
          return cur;
        }) */
        // 用forEach方法重写
        this.themeTopYs.forEach((value, index, arr) => {
          if (this.currentIndex !== index && (positionY >= value && positionY < arr[index + 1])) {
            this.currentIndex = index
            this.$refs.nav.currentIndex = this.currentIndex
          }
        })

        // 判断backtop是否显示
        this.listenerShowBackTop(position)
      },
      addToCart() {
        // 获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;
        // 放入到购物车中
        if (product.iid) {
          // this.$store.dispatch('addCart', product).then()
          this.addCart(product).then(res => {
            this.$toast.show(res, 1500)
          })
        } else {
          this.$toast.show('添加失败请刷新重试', 1500)
        }
      },
      buyToNow() {
        const product = {}
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;
        // 放入到购物车中
        if (product.iid) {
          this.buyNow(product).then(res => {
            this.$toast.show(res, 1500)
            this.$router.push('/cart')
          })
        } else {
          this.$toast.show('添加失败请刷新重试', 1500)
        }
      },
      _getDetail(iid) {
        getDetail(iid).then((res) => {
          // console.log(res);

          // 1.获取数据
          const data = res.result;

          // 2.获取顶部的图片数据
          this.topImages = data.itemInfo.topImages;

          // 3.获取商品基本信息
          this.goods = new Goods(
            data.itemInfo,
            data.columns,
            data.shopInfo.services
          );

          // 4.获取店铺信息
          this.shop = new Shop(data.shopInfo);

          // 5.获取商品详情信息
          this.detailInfo = data.detailInfo;

          // 6.获取参数信息
          this.paramInfo = new GoodsParam(
            data.itemParams.info,
            data.itemParams.rule,
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

          // 8.获取推荐数据
          this.recommends = res.data.list
        })
      }
    },
    created() {
      // 1.保存GoodsItem中传入的iid
      this.iid = this.$route.params.iid;

      // 2.发送商品详情请求 根据ID请求详情数据
      this._getDetail(this.iid);

      // 3.发送商品推荐请求
      this._getRecommend();
    },
    destroyed(){
      // 离开页面时取消全局事件的监听
      this.$bus.$off('itemImgLoad', this.itemImgListener)
    },
  };
</script>

<style scoped>
  #detail {
    height: 100vh;
    position: relative;
    
    z-index: 9;
    background-color: var(--color-background);
  }

  .detail-nav {
    background-color: var(--color-background);
  }

  .wrapper {
    overflow: hidden;
    height: calc(100% - 94px);
    position: relative;  /* offsetTop是找到元素相对于父级定位元素的距离 */
  }
</style>