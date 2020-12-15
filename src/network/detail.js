import {request} from './request';

export function getDetail(iid){
  return request({
    url:'/detail',
    params:{
      iid
    }
  })
}

export function getRecommend() {
	return request({
		url: '/recommend'
	})
}

export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discountDesc = itemInfo.discountDesc  // 折扣
    this.discountBgColor = itemInfo.discountBgColor
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
  }
}

export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;  // 关注人数
    this.goodsCount = shopInfo.cGoods;  // 在架商品
    this.sells = shopInfo.cSells;  // 累计销量
    this.score = shopInfo.score;  // 评分
    this.allGoods = shopInfo.allGoodsUrl
    this.url = shopInfo.shopUrl;
  }
}

export class GoodsParam {
  constructor(info, rule) {
    this.sizeInfo = rule ? rule.key : '';
    this.sizes = rule ? rule.tables : '';
    this.disclaimer = rule ? rule.disclaimer : '';
    this.productInfo = info.key
    this.infos = info.set;
    // images可能没有值(某些商品有值, 某些没有值 例如：流行页第四个商品就有值)
    this.images = info.images ? info.images : '';
  }
}