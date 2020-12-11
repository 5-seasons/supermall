<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
    <div class="info-desc clear-fix">
      <div class="start"></div>
      <div class="desc">{{ detailInfo.desc }}</div>
      <div class="end"></div>
    </div>
    <div v-for="(images, index) in detailInfo.detailImage" :key="index" class="key-list">
      <!-- 像流行页第18个商品，detailInfo.detailImage的2、3项没有list，干脆key也不显示 -->
      <div v-if="images.desc == ''">
        <div class="info-key">
          <div class="cell"><hr /></div>
          <span class="text-fixed">{{ images.key }}</span>
          <div class="cell"><hr /></div>
        </div>
        <div class="info-list">
          <img v-for="(item, index) in images.list" :key="index" :src="item" @load="imgLoad" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
	export default {
		name: "DetailGoodsInfo",
    props: {
      detailInfo: {
        type: Object
      }
    },
    data() {
			return {
				counter: 0,
        imagesLength: 0
      }
    },
    methods: {
	    imgLoad() {
        // 判断：所有的图片都加载完了, 那么进行一次回调就可以了  ps:也可以用防抖实现
        if (++this.counter === this.imagesLength) {
          this.$emit('imageLoad', 'GoodsInfo');
        }
	    }
    },
    watch: {
	    detailInfo() {
        // 获取图片的个数 
        // detailInfo.detailImage可能不止一项 例如：流行页第六个商品就有两项，第七个有三项 故用switch
        // 像流行页第18个商品，detailInfo.detailImage的2、3项没有list,所以用一个条件运算符判断
        switch (this.detailInfo.detailImage.length) {
          case 1:
            this.imagesLength =
            (this.detailInfo.detailImage[0].list ? this.detailInfo.detailImage[0].list.length : 0);
            break;
          case 2:
            this.imagesLength =
            (this.detailInfo.detailImage[0].list ? this.detailInfo.detailImage[0].list.length : 0) +
            (this.detailInfo.detailImage[1].list ? this.detailInfo.detailImage[1].list.length : 0);
            break;
          case 3:
            this.imagesLength =
            (this.detailInfo.detailImage[0].list ? this.detailInfo.detailImage[0].list.length : 0) +
            (this.detailInfo.detailImage[1].list ? this.detailInfo.detailImage[1].list.length : 0) +
            (this.detailInfo.detailImage[2].list ? this.detailInfo.detailImage[2].list.length : 0);
            break;
        }
	    }
    }
	}
</script>

<style scoped>
  .goods-info {
    padding: 20px 0;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-desc {
    padding: 0 15px;
  }

  .info-desc .start, .info-desc .end {
    width: 90px;
    height: 1px;
    background-color: #a3a3a5;
    position: relative;
  }

  .info-desc .start {
    float: left;
  }

  .info-desc .end {
    float: right;
  }

  .info-desc .start::before, .info-desc .end::after {
    content: '';
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: #333;
    bottom: 0;
  }

  .info-desc .end::after {
    right: 0;
  }

  .info-desc .desc {
    padding: 15px 0;
    font-size: 14px;
    text-indent: 2em;
    line-height: 1.5;
  }

  .info-key {
    padding: 0 25%;
    margin: 10px 0 ;
    text-align: center;
    color: #999;
    font-size: 15px;
    display: flex;
    align-items: center;
  }

  .cell {
    flex: 1;
  }

  .text-fixed {
    padding: 0 10px;
  }

  .info-list img {
    width: 100%;
  }
</style>
