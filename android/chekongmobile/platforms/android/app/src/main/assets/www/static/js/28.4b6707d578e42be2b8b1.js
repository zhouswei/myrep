webpackJsonp([28],{"jKT/":function(t,c,a){"use strict";Object.defineProperty(c,"__esModule",{value:!0});var e={props:{id:{type:Number,default:0},shops:{type:Array,default:function(){return[]}}},data:function(){return{totalData:{}}},methods:{update:function(){this.getPowers()},setDate:function(t){var c=this;this.totalData={lebel:"全选",id:"全选",check:!1,data:[]},t.forEach(function(t){if("概况"!==t.Name){var a={};a.lebel=t.Name,a.id=t.ID,a.check=!1,a.data=[],t.SonClass.forEach(function(t){var c={};c.lebel=t.Name,c.id=t.ID,c.check=!1,c.data=[],t.SonClass.forEach(function(t){var a={};a.lebel=t.Name,a.id=t.ID,a.check=!1,a.data=[],c.data.push(a)}),t.Items.forEach(function(t){var a={};a.lebel=t.Name,a.id=t.ID,a.check=!1,a.data=[],t.FuncList.forEach(function(t){var c={};c.lebel=t.Name,c.id=t.ID,t.IsSelected>0?c.check=!0:c.check=!1,c.data=[],a.data.push(c)}),c.data.push(a)}),a.data.push(c)}),t.Items.forEach(function(t){var c={};c.lebel=t.Name,c.id=t.ID,c.check=!1,c.data=[],t.FuncList.forEach(function(t){var a={};a.lebel=t.Name,a.id=t.ID,t.IsSelected>0?a.check=!0:a.check=!1,a.data=[],c.data.push(a)}),a.data.push(c)}),c.totalData.data.push(a)}}),this.checkState()},getPowers:function(){var t=this;this.$store.dispatch("queryRolePowers",{ID:this.id}).then(function(c){t.setDate(c.ThisClass),t.shops=[],c.ShopInfoListForRole.forEach(function(c){var a={};a.Title=c.Title,a.ID=c.ID,t.shops.push(a)})}).catch(function(){})},tier:function(t){t?this.totalData.data.forEach(function(t){t.disable||(t.check=!0,t.data.forEach(function(t){t.disable||(t.check=!0,t.data.forEach(function(t){t.disable||(t.check=!0,t.data.forEach(function(t){t.disable||(t.check=!0)}))}))}))}):this.totalData.data.forEach(function(t){t.disable||(t.check=!1,t.data.forEach(function(t){t.disable||(t.check=!1,t.data.forEach(function(t){t.disable||(t.check=!1,t.data.forEach(function(t){t.check=!1}))}))}))})},tier1:function(t){t.check?t.data.forEach(function(t){t.check=!0,t.data.forEach(function(t){t.check=!0,t.data.forEach(function(t){t.check=!0})})}):t.data.forEach(function(t){t.check=!1,t.data.forEach(function(t){t.check=!1,t.data.forEach(function(t){t.check=!1})})})},tier2:function(t){t.check?t.data.forEach(function(t){t.check=!0,t.data.forEach(function(t){t.check=!0})}):t.data.forEach(function(t){t.check=!1,t.data.forEach(function(t){t.check=!1})})},tier3:function(t){t.check?t.data.forEach(function(t){t.check=!0}):t.data.forEach(function(t){t.check=!1})},tier4:function(t){},checkState:function(){this.totalData.data.forEach(function(t){var c=0;t.data.forEach(function(t){var a=0;t.data.forEach(function(t){var c=0;t.data.forEach(function(t){t.check&&c++}),c>0&&(t.check=!0),t.check&&a++}),a>0&&(t.check=!0),t.check&&c++}),c>0&&(t.check=!0)})},addShop:function(){this.$emit("clickOp",this.shops)},clickConfirm:function(){var t=this,c=[];this.totalData.data.forEach(function(t){t.data.forEach(function(t){t.data.forEach(function(t){0===t.data.length&&t.check&&c.push(t.id),t.data.forEach(function(t){t.check&&c.push(t.id)})})})});var a=[];this.shops.forEach(function(t){a.push(t.ID)}),this.$store.dispatch("setRolePowers",{RoleID:this.id,chkPowerID:c,ShopID:a}).then(function(c){t.$message({type:"success",message:"修改成功"}),t.$emit("close"),location.reload()}).catch(function(){})},clickCancel:function(){this.$emit("close")},clickDel:function(t){var c=this,a=-1;this.shops.forEach(function(e){e.ID===t&&(a=c.shops.indexOf(e))}),this.shops.splice(a,1)}}},i={render:function(){var t=this,c=t.$createElement,a=t._self._c||c;return a("div",[a("div",{staticStyle:{"background-color":"#37bfc8",padding:"10px","margin-top":"10px"}},[a("span",{staticStyle:{color:"#fff","font-size":"14px"}},[t._v("操作权限")]),t._v(" "),a("span",{staticStyle:{color:"#fff","font-size":"14px","margin-left":"50px"}},[t._v("设置权限")]),t._v(" "),a("el-checkbox",{staticStyle:{"margin-left":"50px",color:"#ffffff"},attrs:{fill:"#FFFFFF",disabled:t.totalData.disable},on:{change:t.tier},model:{value:t.totalData.check,callback:function(c){t.$set(t.totalData,"check",c)},expression:"totalData.check"}},[t._v(t._s(t.totalData.lebel))])],1),t._v(" "),a("div",t._l(t.totalData.data,function(c){return a("div",{key:c.id,staticStyle:{"margin-left":"10px"},attrs:{label:c.lebel}},[a("el-checkbox",{staticClass:"padding-class",attrs:{disabled:c.disable},on:{change:function(a){t.tier1(c)}},model:{value:c.check,callback:function(a){t.$set(c,"check",a)},expression:"item.check"}},[t._v(t._s(c.lebel))]),t._v(" "),t._l(c.data,function(c){return a("div",{key:c.id,staticStyle:{"margin-left":"100px"},attrs:{label:c.lebel}},[a("el-checkbox",{staticClass:"padding-class",attrs:{disabled:c.disable},on:{change:function(a){t.tier2(c)}},model:{value:c.check,callback:function(a){t.$set(c,"check",a)},expression:"item.check"}},[t._v(t._s(c.lebel))]),t._v(" "),t._l(c.data,function(c){return a("div",{key:c.id,staticStyle:{"margin-left":"50px"},attrs:{label:c.lebel}},[a("el-checkbox",{staticClass:"padding-class",attrs:{disabled:c.disable},on:{change:function(a){t.tier3(c)}},model:{value:c.check,callback:function(a){t.$set(c,"check",a)},expression:"item.check"}},[t._v(t._s(c.lebel))]),t._v(" "),t._l(c.data,function(e){return a("el-checkbox",{key:e.id,staticClass:"el-checkbox",attrs:{label:e.lebel},on:{change:function(a){t.tier4(c)}},model:{value:e.check,callback:function(c){t.$set(e,"check",c)},expression:"item1.check"}},[t._v(t._s(e.lebel))])})],2)})],2)})],2)})),t._v(" "),t._m(0),t._v(" "),a("div",{staticStyle:{"margin-left":"100px","vertical-align":"middle"}},[t._l(t.shops,function(c){return a("div",{key:c.ID,attrs:{label:c.Title}},[a("p",[a("img",{staticStyle:{"margin-right":"10px",cursor:"pointer"},attrs:{src:"http://r.handnear.com/chain/img/hongcha.png"},on:{click:function(a){t.clickDel(c.ShopCode)}}}),t._v(t._s(c.Title))])])}),t._v(" "),a("p",{staticStyle:{cursor:"pointer"},on:{click:t.addShop}},[a("img",{staticStyle:{"margin-right":"10px",cursor:"pointer"},attrs:{src:"http://r.handnear.com/chain/img/lvcha.png"}}),t._v("添加门店")])],2),t._v(" "),a("el-button",{staticClass:"el_save_btn",on:{click:t.clickConfirm}},[t._v("确定")]),t._v(" "),a("el-button",{staticClass:"el_cancel_btn",on:{click:t.clickCancel}},[t._v("取消")])],1)},staticRenderFns:[function(){var t=this.$createElement,c=this._self._c||t;return c("div",{staticStyle:{"background-color":"#37bfc8",padding:"10px","margin-top":"10px"}},[c("span",{staticStyle:{color:"#fff","font-size":"14px"}},[this._v("数据权限")])])}]};var n=a("VU/8")(e,i,!1,function(t){a("lzAi")},"data-v-56156e16",null);c.default=n.exports},lzAi:function(t,c){}});
//# sourceMappingURL=28.4b6707d578e42be2b8b1.js.map