webpackJsonp([44],{iNx4:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={props:{shops:{type:Array,default:function(){return[]}}},mounted:function(){this.getShops()},data:function(){return{para:{PageIndex:1,PageSize:20,ID:"",ShopName:""},pageTotal:20,shopList:[],checkShops:[],loading:!0,enable:0}},methods:{changePageHandle:function(){this.getShops()},getShops:function(){var e=this;this.loading=!0,this.$store.dispatch("queryShopsList",this.para).then(function(t){e.shopList=[],e.pageTotal=t.PageTotal,e.para.PageIndex=t.PageIndex,e.$refs.bottomPagination.lastEmittedPage=e.para.PageIndex,t.listInfo.forEach(function(t){var a={};a.ID=t.ID,a.ShopCode=t.ShopCode,a.Title=t.Title,a.isDel=!0,e.shopList.push(a)}),e.loading=!1,e.check()}).catch(function(){})},check:function(){this.$nextTick(function(){var e=this;this.shopList.forEach(function(t){e.shops.forEach(function(a){t.ID===a.ID&&e.$refs.multipleTable.toggleRowSelection(t)})})})},clickSearch:function(){this.getShops()},clickSave:function(){this.$emit("result",this.checkShops)},handleSelectionChange:function(e){var t=this;this.checkShops=[],this.checkShops=e,this.checkShops.forEach(function(e){t.shops.forEach(function(t){e.ID===t.ID&&(t.isDel||(e.isDel=!1))})})},checkboxInit:function(e,t){var a=!0;return this.shops.forEach(function(t){t.isDel||t.ID===e.ID&&(a=!1)}),a?1:0}}},i={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}]},[a("div",{staticStyle:{"margin-left":"20px"}},[e._v("\n    注册码\n    "),a("el-input",{staticStyle:{width:"150px","margin-right":"50px"},attrs:{type:"text",autoComplete:"off",placeholder:"请输入注册码"},model:{value:e.para.ID,callback:function(t){e.$set(e.para,"ID",t)},expression:"para.ID"}}),e._v("\n    门店名称\n    "),a("el-input",{staticStyle:{width:"150px"},attrs:{type:"text",autoComplete:"off",placeholder:"请输入门店名称"},model:{value:e.para.ShopName,callback:function(t){e.$set(e.para,"ShopName",t)},expression:"para.ShopName"}}),e._v(" "),a("el-button",{staticClass:"el_search_btn",on:{click:e.clickSearch}},[e._v("搜索")])],1),e._v(" "),a("div",{staticStyle:{"margin-left":"20"}},[a("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:e.shopList,"tooltip-effect":"dark","select-on-indeterminate":"false"},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",selectable:e.checkboxInit,width:"55"}}),e._v(" "),a("el-table-column",{attrs:{prop:"ShopCode",label:"注册码"}}),e._v(" "),a("el-table-column",{attrs:{prop:"Title",label:"门店名称"}})],1),e._v(" "),a("el-pagination",{ref:"bottomPagination",staticClass:"paging_class",attrs:{background:"",layout:"prev, pager, next","current-page":e.para.PageIndex,"page-size":e.para.PageSize,total:e.pageTotal},on:{"current-change":e.changePageHandle,"update:currentPage":function(t){e.$set(e.para,"PageIndex",t)}}})],1),e._v(" "),a("el-button",{staticClass:"el_save_btn",on:{click:e.clickSave}},[e._v("确定")])],1)},staticRenderFns:[]};var o=a("VU/8")(n,i,!1,function(e){a("mScE")},"data-v-077be144",null);t.default=o.exports},mScE:function(e,t){}});
//# sourceMappingURL=44.3fe9ae03ca5010c20ad2.js.map