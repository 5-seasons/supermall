(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-06915b08"],{"0f4b":function(t,e,r){"use strict";r("9cd8")},"1fd4":function(t,e,r){"use strict";r("78fd")},"4de4":function(t,e,r){"use strict";var n=r("23e7"),a=r("b727").filter,i=r("1dde"),c=r("ae40"),o=i("filter"),s=c("filter");n({target:"Array",proto:!0,forced:!o||!s},{filter:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}})},5530:function(t,e,r){"use strict";r.d(e,"a",(function(){return i}));r("a4d3"),r("4de4"),r("4160"),r("e439"),r("dbb4"),r("b64b"),r("159b");var n=r("ade3");function a(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function i(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?a(Object(r),!0).forEach((function(e){Object(n["a"])(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}},5772:function(t,e,r){},"685e":function(t,e,r){},"789f":function(t,e,r){"use strict";r("5772")},"78fd":function(t,e,r){},"81b3":function(t,e,r){},"99af":function(t,e,r){"use strict";var n=r("23e7"),a=r("d039"),i=r("e8b5"),c=r("861d"),o=r("7b0b"),s=r("50c4"),u=r("8418"),l=r("65f0"),f=r("1dde"),d=r("b622"),g=r("2d00"),b=d("isConcatSpreadable"),h=9007199254740991,y="Maximum allowed index exceeded",p=g>=51||!a((function(){var t=[];return t[b]=!1,t.concat()[0]!==t})),m=f("concat"),v=function(t){if(!c(t))return!1;var e=t[b];return void 0!==e?!!e:i(t)},O=!p||!m;n({target:"Array",proto:!0,forced:O},{concat:function(t){var e,r,n,a,i,c=o(this),f=l(c,0),d=0;for(e=-1,n=arguments.length;e<n;e++)if(i=-1===e?c:arguments[e],v(i)){if(a=s(i.length),d+a>h)throw TypeError(y);for(r=0;r<a;r++,d++)r in i&&u(f,d,i[r])}else{if(d>=h)throw TypeError(y);u(f,d++,i)}return f.length=d,f}})},"9bd0":function(t,e,r){"use strict";var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"tab-control"},t._l(t.titles,(function(e,n){return r("div",{key:n,staticClass:"tab-control-item",class:{active:n===t.currentIndex},on:{click:function(e){return t.itemClick(n)}}},[r("span",[t._v(t._s(e))])])})),0)},a=[],i={name:"TabControl",props:{titles:{type:Array,default:function(){return[]}}},data:function(){return{currentIndex:0}},methods:{itemClick:function(t){this.currentIndex=t,this.$emit("tabClick",t)}}},c=i,o=(r("789f"),r("2877")),s=Object(o["a"])(c,n,a,!1,null,"23dd56c8",null);e["a"]=s.exports},"9cd8":function(t,e,r){},b64b:function(t,e,r){var n=r("23e7"),a=r("7b0b"),i=r("df75"),c=r("d039"),o=c((function(){i(1)}));n({target:"Object",stat:!0,forced:o},{keys:function(t){return i(a(t))}})},b760:function(t,e,r){"use strict";r("81b3")},bb51:function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{id:"category"}},[r("nav-bar",{staticClass:"category-nav"},[r("div",{attrs:{slot:"center"},slot:"center"},[t._v("商品分类")])]),r("div",{staticClass:"content"},[r("tab-menu",{attrs:{categories:t.categories},on:{selectItem:t.selectItem}}),r("scroll",{ref:"scroll",attrs:{id:"tab-content",data:[t.categoryData]}},[r("tab-content-category",{attrs:{subcategories:t.showSubcategory}}),r("tab-control",{attrs:{titles:["综合","新品","销量"]},on:{itemClick:t.tabClick}}),r("goods-list",{attrs:{goods:t.showCategoryDetail}})],1)],1)],1)},a=[],i=r("5530"),c=r("a7ac"),o=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("scroll",{attrs:{id:"tab-menu"}},[r("div",{staticClass:"menu-list"},t._l(t.categories,(function(e,n){return r("div",{key:n,staticClass:"menu-list-item",class:{active:n===t.currentIndex},on:{click:function(e){return t.itemClick(n)}}},[t._v(" "+t._s(e.title)+" ")])})),0)])},s=[],u=r("5d17"),l={name:"TabMenu",components:{Scroll:u["a"]},props:{categories:Array},data:function(){return{currentIndex:0}},methods:{itemClick:function(t){this.currentIndex=t,this.$emit("selectItem",t)}}},f=l,d=(r("0f4b"),r("2877")),g=Object(d["a"])(f,o,s,!1,null,"0223d145",null),b=g.exports,h=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[t.subcategories.list?r("grid-view",{attrs:{cols:3,lineSpace:15,"v-margin":20}},t._l(t.subcategories.list,(function(e,n){return r("div",{key:n,staticClass:"item"},[r("a",{attrs:{href:e.link}},[r("img",{staticClass:"item-img",attrs:{src:e.image,alt:""}}),r("div",{staticClass:"item-text"},[t._v(t._s(e.title))])])])})),0):t._e()],1)},y=[],p=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{ref:"gridView",staticClass:"grid-view"},[t._t("default")],2)},m=[],v=(r("99af"),r("a9e3"),{name:"GridView",props:{cols:{type:Number,default:2},hMargin:{type:Number,default:8},vMargin:{type:Number,default:8},itemSpace:{type:Number,default:8},lineSpace:{type:Number,default:8}},mounted:function(){setTimeout(this._autoLayout,20)},updated:function(){this._autoLayout()},methods:{_autoLayout:function(){var t=this.$refs.gridView,e=t.children;t.style.padding="".concat(this.vMargin,"px ").concat(this.hMargin,"px");for(var r=(t.clientWidth-2*this.hMargin-(this.cols-1)*this.itemSpace)/this.cols,n=0;n<e.length;n++){var a=e[n];a.style.width=r+"px",(n+1)%this.cols!==0&&(a.style.marginRight=this.itemSpace+"px"),n>=this.cols&&(a.style.marginTop=this.lineSpace+"px")}}}}),O=v,_=(r("ec21"),Object(d["a"])(O,p,m,!1,null,"6f51f6c4",null)),C=_.exports,w={name:"TabContentCategory",components:{GridView:C},props:{subcategories:{type:Object,default:function(){return[]}}}},x=w,j=(r("1fd4"),Object(d["a"])(x,h,y,!1,null,"05cca9d1",null)),D=j.exports,k=r("9bd0"),I=r("6d71"),S=r("1bab");function T(){return Object(S["a"])({url:"/category"})}function P(t){return Object(S["a"])({url:"/subcategory",params:{maitKey:t}})}function E(t,e){return Object(S["a"])({url:"/subcategory/detail",params:{miniWallkey:t,type:e}})}var M=r("eecb"),$={name:"Category",components:{NavBar:c["a"],TabMenu:b,TabControl:k["a"],Scroll:u["a"],TabContentCategory:D,GoodsList:I["a"]},mixins:[M["b"],M["c"]],data:function(){return{categories:[],categoryData:{},currentIndex:-1}},computed:{showSubcategory:function(){return-1===this.currentIndex?{}:this.categoryData[this.currentIndex].subcategories},showCategoryDetail:function(){return-1===this.currentIndex?[]:this.categoryData[this.currentIndex].categoryDetail[this.currentType]}},methods:{_getCategory:function(){var t=this;T().then((function(e){t.categories=e.data.category.list;for(var r=0;r<t.categories.length;r++)t.categoryData[r]={subcategories:{},categoryDetail:{pop:[],new:[],sell:[]}};t._getSubcategories(0)}))},_getSubcategories:function(t){var e=this;this.currentIndex=t;var r=this.categories[t].maitKey;P(r).then((function(r){e.categoryData[t].subcategories=r.data,e.categoryData=Object(i["a"])({},e.categoryData),e._getCategoryDetail("pop"),e._getCategoryDetail("sell"),e._getCategoryDetail("new")}))},_getCategoryDetail:function(t){var e=this,r=this.categories[this.currentIndex].miniWallkey;E(r,t).then((function(r){e.categoryData[e.currentIndex].categoryDetail[t]=r,e.categoryData=Object(i["a"])({},e.categoryData)}))},selectItem:function(t){this._getSubcategories(t)}},created:function(){this._getCategory()},mounted:function(){}},N=$,A=(r("b760"),Object(d["a"])(N,n,a,!1,null,"03f4b4d2",null));e["default"]=A.exports},dbb4:function(t,e,r){var n=r("23e7"),a=r("83ab"),i=r("56ef"),c=r("fc6a"),o=r("06cf"),s=r("8418");n({target:"Object",stat:!0,sham:!a},{getOwnPropertyDescriptors:function(t){var e,r,n=c(t),a=o.f,u=i(n),l={},f=0;while(u.length>f)r=a(n,e=u[f++]),void 0!==r&&s(l,e,r);return l}})},e439:function(t,e,r){var n=r("23e7"),a=r("d039"),i=r("fc6a"),c=r("06cf").f,o=r("83ab"),s=a((function(){c(1)})),u=!o||s;n({target:"Object",stat:!0,forced:u,sham:!o},{getOwnPropertyDescriptor:function(t,e){return c(i(t),e)}})},ec21:function(t,e,r){"use strict";r("685e")}}]);
//# sourceMappingURL=chunk-06915b08.049f3367.js.map