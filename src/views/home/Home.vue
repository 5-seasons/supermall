<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab-control"
      v-show="isTabFixed"
    />
    <scroll
      class="wrapper"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :click="true"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      />
      <goods-list :goods="showGoods" />
    </scroll>
    <back-top @click.native="backTopClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll";

  import { getHomeMultidata, getHomeGoods } from "network/home";

  import { POP, NEW, SELL } from "common/const";
  import { debounce } from "common/utils";
  import { itemListenerMixin, backTopMixin } from "common/mixin"

  export default {
    name: "Home",
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
    },
    mixins:[itemListenerMixin, backTopMixin],
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': { page: 0, list: [] },
          'new': { page: 0, list: [] },
          'sell': { page: 0, list: [] },
        },
        currentType: POP,
        isTabFixed: false,
        tabOffsetTop: 0,
        saveY: 0,
      };
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list;
      },
    },
    methods: {
      /**
       * 事件监听相关的方法
       */
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = POP;
            break;
          case 1:
            this.currentType = NEW;
            break;
          case 2:
            this.currentType = SELL;
            break;
        }

        // 让tabcontrol保持一致
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;

        // 点击tabcontrol滚动到相应位置  
        if (-this.$refs.scroll.scroll.y >= this.tabOffsetTop) {
          this.$refs.scroll.scrollTo(0, -this.tabOffsetTop, 0)
        }
      },
      contentScroll(position) {
        // 1.判断BackTop是否显示
        this.listenerShowBackTop(position)

        // 2.决定tabControl是否吸顶(position: fixed)
        this.isTabFixed = -position.y > this.tabOffsetTop;
      },
      loadMore() {
        this._getHomeGoods(this.currentType);
      },
      swiperImageLoad() {
        // 获取tabControl的offsetTop  通过$el属性获取组件中的元素
        // offsetTop：当前元素相对于元素最近的非静态定位元素的距离
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;

        // console.log(this.tabOffsetTop); // 545
      },
      /**
       * 网络请求相关的方法
       */
      _getHomeMultidata() {
        getHomeMultidata().then((res) => {
          // console.log(res);//打印home/multidata接口的数据
          
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        });
      },
      _getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then((res) => {
          // console.log(res);//打印home/data接口三个类型的数据

          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;

          //完成上拉加载更多
          this.$refs.scroll.finishPullUp();
        });
      },
    },
    created() {
      // 1.请求多个数据
      this._getHomeMultidata();

      // 2.请求商品数据
      this._getHomeGoods(POP);
      this._getHomeGoods(NEW);
      this._getHomeGoods(SELL);
    },
    activated() {
      // 返回页面时刷新并滚动到离开时记录的位置  先刷新refresh再跳转scrollTo
      this.$refs.scroll.refresh();
      this.$refs.scroll.scrollTo(0, this.saveY , 0);
    },
    deactivated() {
      // 1.离开页面时记录页面离开时的滚动位置Y
      this.saveY = this.$refs.scroll.getScrollY();

      // 2.离开页面时取消全局事件的监听
      this.$bus.$off('itemImgLoad', this.itemImgListener)
    },
  };
</script>

<style scoped>
  #home {
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }

  .wrapper {
    overflow: hidden;
    position: absolute;  /* offsetTop是找到元素相对于父级定位元素的距离 */
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  /* .wrapper {
    overflow: hidden;
    height: calc(100% - 93px);
    position: absolute;
    top: 44px;   这样不会出现fixed的tabcontrol1渲染时把wrapper挤下去而出现的跳动问题 
  } */

  .tab-control {
    position: relative;
    z-index: 9;
  }
</style>
