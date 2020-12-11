<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  //通过 props 的形式，把一些对 better-scroll 定制化的控制权交给父组件
  props: {
    /**
     * 0 默认值，即不派发scroll事件
     * 1 滚动的时候会派发scroll事件，会截流。
     * 2 滚动的时候实时派发scroll事件，不会截流。
     * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
     */
    probeType: {
      type: Number,
      default: 0,
    },
    /**
     * 点击列表是否派发click事件
     * false 默认值，BetterScroll 默认会阻止浏览器的原生 click 事件。
     * true BetterScroll 会派发一个 click 事件，我们会给派发的 event 参数加一个私有属性 _constructed，值为 true。
     */
    click: {
      type: Boolean,
      default: true
    },
    /**
     * 是否派发滚动到底部的事件，用于上拉加载
     * 触发时机：当底部下拉距离超过阈值
     */
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    // 1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType,
      click: this.click,
      pullUpLoad: this.pullUpLoad,
    });

    // 2.监听滚动的位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", (position) => {
        // console.log(position);
        this.$emit("scroll", position);
      });
    }

    // 3.监听scroll滚动到底部
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        this.$emit("pullingUp");
      });
    }
    // console.log(this.scroll);//创建的BScroll对象有一个scrollerHeight属性: 4629
  },
  // 通过 methods 暴露的一些方法对 better-scroll 的方法做一层代理
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    refresh() {
      this.scroll && this.scroll.refresh();
      // console.log("只打印一次即只刷新一次，实现防抖");
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0;
    },
  },
};
</script>

<style scoped>
</style>
