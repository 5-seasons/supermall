import { debounce } from 'common/utils'
import BackTop from 'components/content/backTop/BackTop'
import { TOP_DISTANCE } from "./const"
import { POP, NEW, SELL } from "./const"

 
// 监听GoodsListItem中图片的加载，刷新可滚动高度
export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    // 1.图片加载完成的事件监听
    const refresh = debounce(this.$refs.scroll.refresh, 100)
    this.itemImgListener = () => {
      refresh()
    }
    this.$bus.$on("itemImageLoad", this.itemImgListener)
  }
}

// 返回顶部按钮
export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    backTopClick() {
      this.$refs.scroll.scrollTo(0, 0)
    },
    listenerShowBackTop(position) {
      this.isShowBackTop = -position.y >= TOP_DISTANCE;
    }
  }
}

export const tabControlMixin = {
	data: function () {
		return {
			currentType: POP
		}
	},
	methods: {
		tabClick(index) {
			switch (index) {
				case 0:
					this.currentType = POP
					break
				case 1:
					this.currentType = NEW
					break
				case 2:
					this.currentType = SELL
					break
			}
		}
	}
}