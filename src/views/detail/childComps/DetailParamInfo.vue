<template>
  <div class="param-info" v-if="Object.keys(paramInfo).length !== 0">
    <div class="size-info">
      <div class="cell"><hr /></div>
      <span class="text-fixed">{{ paramInfo.sizeInfo }}</span>
      <div class="cell"><hr /></div>
    </div>
    <table v-for="(table, index) in paramInfo.sizes" :key="index" class="info-size">
      <tr v-for="(tr, indey) in table" :key="indey">
        <td v-for="(td, indez) in tr" :key="indez">{{td}}</td>
      </tr>
    </table>
    <div class="product-info">
      <div class="cell"><hr /></div>
      <span class="text-fixed">{{ paramInfo.productInfo }}</span>
      <div class="cell"><hr /></div>
    </div>
    <table class="info-param">
      <tr v-for="(info, index) in paramInfo.infos" :key="index">
        <td class="info-param-key">{{ info.key }}</td>
        <td class="param-value">{{ info.value }}</td>
      </tr>
    </table>
    <!-- images可能没有值(某些商品有值, 某些没有值 例如：流行页第四个商品就有值) -->
    <div class="info-img" v-if="paramInfo.images.length !== 0">
      <img v-for="(item, index) in paramInfo.images" :key="index" :src="item" @load="imgLoad" alt="">
    </div>
  </div>
</template>

<script>
	export default {
		name: "DetailParamInfo",
    props: {
		  paramInfo: {
		    type: Object,
        default() {
		      return {}
        }
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
          this.$emit('imageLoad', 'ParamInfo');
        }
	    }
    },
    watch: {
	    paramInfo() {
	      // 获取图片的个数
	    	this.imagesLength = this.paramInfo.images.length
	    }
    }
	}
</script>

<style scoped>
  .param-info {
    padding: 10px 15px;
    font-size: 14px;
    border-bottom: 5px solid #f2f5f8;
  }

  .param-info table {
    width: 100%;
    border-collapse: collapse;
  }

  .param-info table tr {
    height: 42px;
  }

  .param-info table tr td {
    border-top: 1px solid rgba(100,100,100,0.1);
  }

  .size-info, .product-info {
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

  .info-param-key {
    /*当value的数据量比较大的时候, 会挤到key,所以给一个固定的宽度*/
    width: 95px;
  }

  .param-value {
    color: #eb4868
  }

  .info-img img {
    width: 100%;
  }
</style>
