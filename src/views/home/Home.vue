<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"/>
    <recommend-view :recommends="recommends"/>
    <feature-view/>
    <tab-control class="tab-control" 
                 :titles="['流行','新款','精选']"
                 @tabClick="tabClick"/>
    <goods-list :goods="showGoods"/>
    <ul>
      <li>list1</li>
      <li>list2</li>
      <li>list3</li>
      <li>list4</li>
      <li>list5</li>
      <li>list6</li>
      <li>list7</li>
      <li>list8</li>
      <li>list9</li>
      <li>list10</li>
      <li>list11</li>
      <li>list12</li>
      <li>list13</li>
      <li>list14</li>
      <li>list15</li>
      <li>list16</li>
      <li>list17</li>
      <li>list18</li>
      <li>list19</li>
      <li>list20</li>
      <li>list21</li>
      <li>list22</li>
      <li>list23</li>
      <li>list24</li>
      <li>list25</li>
      <li>list26</li>
      <li>list27</li>
      <li>list28</li>
      <li>list29</li>
      <li>list30</li>
      <li>list31</li>
      <li>list32</li>
      <li>list33</li>
      <li>list34</li>
      <li>list35</li>
      <li>list36</li>
      <li>list37</li>
      <li>list38</li>
      <li>list39</li>
      <li>list40</li>
      <li>list41</li>
      <li>list42</li>
      <li>list43</li>
      <li>list44</li>
      <li>list45</li>
      <li>list46</li>
      <li>list47</li>
      <li>list48</li>
      <li>list49</li>
      <li>list50</li>
      <li>list51</li>
      <li>list52</li>
      <li>list53</li>
      <li>list54</li>
      <li>list55</li>
      <li>list56</li>
      <li>list57</li>
      <li>list58</li>
      <li>list59</li>
      <li>list60</li>
      <li>list61</li>
      <li>list62</li>
      <li>list63</li>
      <li>list64</li>
      <li>list65</li>
      <li>list66</li>
      <li>list67</li>
      <li>list68</li>
      <li>list69</li>
      <li>list70</li>
      <li>list71</li>
      <li>list72</li>
      <li>list73</li>
      <li>list74</li>
      <li>list75</li>
      <li>list76</li>
      <li>list77</li>
      <li>list78</li>
      <li>list79</li>
      <li>list80</li>
      <li>list81</li>
      <li>list82</li>
      <li>list83</li>
      <li>list84</li>
      <li>list85</li>
      <li>list86</li>
      <li>list87</li>
      <li>list88</li>
      <li>list89</li>
      <li>list90</li>
      <li>list91</li>
      <li>list92</li>
      <li>list93</li>
      <li>list94</li>
      <li>list95</li>
      <li>list96</li>
      <li>list97</li>
      <li>list98</li>
      <li>list99</li>
      <li>list100</li>
    </ul>
  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import NavBar from 'components/common/navbar/NavBar';
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'


  import { getHomeMultidata, getHomeGoods } from "network/home";

  export default {
    name: "Home",
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    created() {
       // 1.请求多个数据
      this.getHomeMultidata()

      // 2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    methods: {
       /**
       * 事件监听相关的方法
       */
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
      },
      // backClick() {
      //   this.$refs.scroll.scrollTo(0, 0)
      // },
      // contentScroll(position) {
      //   this.isShowBackTop = (-position.y) > 1000
      // },
      // loadMore() {
      //   this.getHomeGoods(this.currentType)
      // },
      /**
       * 网络请求相关的方法
       */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          // this.result = res;
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          // this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
    /* height: 100vh; */
    /* position: relative; */
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  }
</style>
