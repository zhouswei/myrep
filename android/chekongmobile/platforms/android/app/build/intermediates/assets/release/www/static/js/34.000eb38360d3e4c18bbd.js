webpackJsonp([34],{"1VjP":function(t,e){},"2B1J":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s("0xDb"),o={computed:{currentIndex:function(){return this.index},projData:function(){return[{flex:1,textAlign:"center",values:this.$store.getters.projName,className:"slot1"}]},realtableData:function(){return this.tableData},realZones:function(){return this.zones}},data:function(){return{projKey:this.$store.getters.projName[0].ProjectNO.toString(),specHeight:this.$store.getters.statusBarHeight,index:0,popupVisible:!1,sheetVisible:!1,projname:this.$store.getters.projName[0].ProjectName,tableData:{},zones:{},accessToken:"",defaultImg:'this.src="static/img/defaultImg.jpg"'}},mounted:function(){var t=this,e=this;this.$store.getters.projName.forEach(function(s){t.$store.dispatch("GetVedioListInfo",s.ProjectNO).then(function(t){e.$store.getters.vedioList[e.projKey]&&e.$store.getters.vedioList[e.projKey][e.currentIndex].VideoList&&(e.tableData=e.$store.getters.vedioList[e.projKey][e.currentIndex].VideoList),e.zones=e.$store.getters.vedioList[e.projKey]}).catch(function(t){console.log(t)})}),this.$store.dispatch("GetVideoAccessToken").then(function(t){e.accessToken=t.AccessToken}).catch(function(t){console.log(t)})},methods:{testclick:function(){var t=this;this.$store.getters.projName.forEach(function(e){t.$store.dispatch("GetVedioListInfo",e.ProjectNO).then(function(e){t.$store.getters.vedioList[t.projKey]&&t.$store.getters.vedioList[t.projKey][t.currentIndex].VideoList&&(t.tableData=t.$store.getters.vedioList[t.projKey][t.currentIndex].VideoList),t.zones=t.$store.getters.vedioList[t.projKey]}).catch(function(t){console.log(t)})})},entryscreen:function(t){var e={methodname:"entryVideoScreen",AccessToken:this.accessToken,videoUrl:t};window.plugins.CustomBridgePlugin.js2android(e,null,null)},selectMenu:function(t){this.index=t;this.$store.getters.vedioList[this.projKey]&&this.$store.getters.vedioList[this.projKey][this.currentIndex].VideoList&&(this.tableData=this.$store.getters.vedioList[this.projKey][this.currentIndex].VideoList),this.zones=this.$store.getters.vedioList[this.projKey]},tranlatePath:function(t){return Object(i.a)(t)},onValuesChange:function(t,e){e[0]>e[1]&&t.setSlotValue(1,e[0].ProjectName),console.log(t.getValues()),this.projname=t.getValues()[0].ProjectName,this.projKey=t.getValues()[0].ProjectNO.toString();this.$store.getters.vedioList[this.projKey]&&this.$store.getters.vedioList[this.projKey][this.currentIndex].VideoList?this.tableData=this.$store.getters.vedioList[this.projKey][this.currentIndex].VideoList:this.tableData=[],this.zones=this.$store.getters.vedioList[this.projKey]},clickHandle:function(){this.sheetVisible=!this.sheetVisible}}},r={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticStyle:{"overflow-y":"hidden",height:"100%"}},[s("div",{staticStyle:{width:"100%"},style:{height:t.specHeight+"px"}}),t._v(" "),s("mt-header",{staticStyle:{padding:"0px"},attrs:{title:"视频监控"}},[s("router-link",{attrs:{slot:"left",to:"/"},slot:"left"},[s("mt-button",{attrs:{icon:"back"}},[t._v("返回")])],1)],1),t._v(" "),s("div",{on:{click:t.clickHandle}},[s("mt-cell",{staticStyle:{height:"50px"},attrs:{"is-link":""}},[s("span",{attrs:{slot:"title"},slot:"title"},[t._v(t._s(t.projname))])])],1),t._v(" "),s("div",{staticClass:"vedio_zone"},[s("div",{staticClass:"menu-wrapper"},[s("ul",{staticStyle:{"padding-left":"0px"}},t._l(t.realZones,function(e,i){return s("li",{key:e.AreaID,staticClass:"menu-item",class:{current:t.currentIndex===i},on:{click:function(e){t.selectMenu(i)}}},[s("span",{staticClass:"text"},[t._v("\n            "+t._s(e.AreaName)+"\n          ")])])}))]),t._v(" "),s("div",{staticClass:"item-wrapper"},[s("el-row",{staticStyle:{margin:"10px 10px 10px 10px"},attrs:{gutter:10}},t._l(t.realtableData,function(e){return s("el-col",{key:e.CameraNO,staticStyle:{"margin-bottom":"10px"},attrs:{span:12}},[s("el-card",{staticStyle:{height:"160px"},attrs:{"body-style":{padding:"0px"}},nativeOn:{click:function(s){t.entryscreen(e.VideoUrl)}}},[s("img",{staticClass:"image",staticStyle:{width:"100%"},attrs:{onerror:t.defaultImg,src:e.CoverUrl}}),t._v(" "),s("div",{staticStyle:{padding:"14px"}},[s("span",[t._v(t._s(e.CameraName))])])])],1)}))],1)]),t._v(" "),s("mt-popup",{staticClass:"mint-popup",staticStyle:{width:"100%"},attrs:{position:"bottom"},model:{value:t.sheetVisible,callback:function(e){t.sheetVisible=e},expression:"sheetVisible"}},[s("mt-picker",{staticStyle:{width:"100%"},attrs:{slots:t.projData,"value-key":"ProjectName"},on:{change:t.onValuesChange}})],1)],1)},staticRenderFns:[]};var n=s("VU/8")(o,r,!1,function(t){s("1VjP")},"data-v-38cab5c9",null);e.default=n.exports}});
//# sourceMappingURL=34.000eb38360d3e4c18bbd.js.map