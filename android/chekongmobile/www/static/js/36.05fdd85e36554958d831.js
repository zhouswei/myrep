webpackJsonp([36],{A8wg:function(e,a){},vGtI:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s={props:{id:{default:0}},data:function(){return{loading:!0,canAddUp:!1,shopsUseData:[],checkUseShop:[],shopsSendData:[],checkSendShop:[],para:{ID:"",GroupID:"",Title:"",SavePrice:"",SalePrice:"",IsScore:"",IsAllowPay:"",ActiveMonth:"",AddDate:"",AdminID:"",AdminCode:"",AdminName:"",Discount:"",IsClose:!1,SaleComm:"",SaleCommType:0,FillComm:"",FillCommType:0,OrderNo:"",UCardFillScore:"",UCardPayScore:"",IDStr:"",UCardInfoGroupID:"",useShopIDs:"",sendShopIDs:""},SaleCommTypes:[{label:"--请选择--",SaleCommType:0},{label:"卡储金额",SaleCommType:1},{label:"售卡金额",SaleCommType:2},{label:"按张提成",SaleCommType:3}],FillCommTypes:[{label:"--请选择--",FillCommType:0},{label:"卡储金额",FillCommType:1},{label:"售卡金额",FillCommType:2}],SaleCommUnit:"%",SaleCommDisable:!0,FillCommDisable:!0}},created:function(){this.update()},methods:{update:function(){this.getInfo(),this.getshops()},getInfo:function(){var e=this;this.loading=!0,this.$store.dispatch("queryUCardInfo",{id:this.id}).then(function(a){e.para=a.info,e.checkSelectState(),e.loading=!1}).catch(function(){})},clickSave:function(){var e=this;this.dataValidation()&&(this.setSendShops(),this.setUseShops(),this.loading=!0,this.$store.dispatch("queryChangeUCardInfo",this.para).then(function(a){e.$message({type:"success",message:"修改成功"}),e.$emit("close"),e.loading=!1}).catch(function(){e.loading=!1}))},clickCancel:function(){this.$emit("close")},SaleCommTypeChange:function(e){switch(this.checkSelectState(),e){case 0:this.para.SaleComm="",this.SaleCommUnit="%";break;case 1:case 2:this.para.SaleComm=0,this.SaleCommUnit="%";break;case 3:this.para.SaleComm=0,this.SaleCommUnit="元/张"}},FillCommTypeChange:function(e){switch(this.checkSelectState(),e){case 0:this.para.FillComm="";break;case 1:case 2:this.para.FillComm=0}},dataValidation:function(){return""===this.para.Title.trim()?(this.$message.error("请输入会员卡名称"),!1):""===this.para.Discount?(this.$message.error("请输入消费折扣"),!1):!this.isPositiveInteger(this.para.Discount)||this.para.Discount>100||this.para.Discount<=0?(this.$message.error("消费折扣只能输入1-100之间的正整数"),!1):""===this.para.SavePrice?(this.$message.error("请输入初始储值"),!1):isNaN(this.para.SavePrice)||this.para.SavePrice<0?(this.$message.error("初始储值只能输入正数，最多保留两位小数"),!1):""===this.para.SalePrice?(this.$message.error("请输入售卡金额"),!1):isNaN(this.para.SalePrice)||this.para.SalePrice<0?(this.$message.error("售卡金额只能输入正数，最多保留两位小数"),!1):this.para.SalePrice>this.para.SavePrice?(this.$message.error("售卡金额不得大于初始储值"),!1):""===this.para.ActiveMonth?(this.$message.error("请输入会员卡有效期"),!1):this.isPositiveInteger(this.para.ActiveMonth)?this.para.IsScore&&""===this.para.UCardPayScore&&""===this.para.UCardFillScore?(this.$message.error("充值和消费金额不能同时为空"),!1):this.para.IsScore&&!this.isPositiveInteger(this.para.UCardPayScore)&&""!==this.para.UCardPayScore?(this.$message.error("积分规则必须为大于0的整数"),!1):this.para.IsScore&&!this.isPositiveInteger(this.para.UCardFillScore)&&""!==this.para.UCardFillScore?(this.$message.error("积分规则必须为大于0的整数"),!1):0!==this.para.FillCommType&&(this.para.FillComm<=0||this.para.FillComm>100||!this.isPositiveInteger(this.para.FillComm))?(this.$message.error("提成数请输入1-100的正整数"),!1):!(0!==this.para.SaleCommType&&(this.para.SaleComm>100||!this.isPositiveInteger(this.para.SaleComm)))||(this.$message.error("提成数请输入1-100的正整数"),!1):(this.$message.error("会员卡有效期只能输入正整数"),!1)},isPositiveInteger:function(e){return/^[0-9]+$/.test(e)},getshops:function(){var e=this;this.loading=!0,this.$store.dispatch("queryBindShops",{id:this.id}).then(function(a){e.shopsUseData=[],a.shopsUseL.forEach(function(a){var t={};t.key=a.ID,t.label=a.Title,e.shopsUseData.push(t)}),e.checkUseShop=[],a.shopsUse.forEach(function(a){var t={};t.key=a.ID,t.label=a.Title,e.shopsUseData.push(t),e.checkUseShop.push(t.key)}),e.shopsSendData=[],a.shopsSendL.forEach(function(a){var t={};t.key=a.ID,t.label=a.Title,e.shopsSendData.push(t)}),e.checkSendShop=[],a.shopsSend.forEach(function(a){var t={};t.key=a.ID,t.label=a.Title,e.shopsSendData.push(t),e.checkSendShop.push(t.key)}),e.loading=!1}).catch(function(){})},checkSelectState:function(){0===this.para.SaleCommType?(this.SaleCommDisable=!0,this.para.SaleComm=""):this.SaleCommDisable=!1,0===this.para.FillCommType?(this.FillCommDisable=!0,this.para.FillComm=""):this.FillCommDisable=!1},setSendShops:function(){var e=[];this.checkSendShop.forEach(function(a){e.push(a+",")}),this.para.sendShopIDs=e.join("")},setUseShops:function(){var e=[];this.checkUseShop.forEach(function(a){e.push(a+",")}),this.para.useShopIDs=e.join("")}}},i={render:function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",[t("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}]},[t("p",{staticClass:"infoPerLine1"},[t("span",{staticClass:"infoShowName"},[e._v("会员卡名称：")]),e._v(" "),t("el-input",{staticClass:"el-input",attrs:{placeholder:"请输入会员卡名称",type:"text",autoComplete:"off"},model:{value:e.para.Title,callback:function(a){e.$set(e.para,"Title",a)},expression:"para.Title"}}),e._v(" "),t("span",{staticStyle:{color:"#e33c32"}},[e._v("*")])],1),e._v(" "),t("p",{staticClass:"infoPerLine1 position"},[t("span",{staticClass:"infoShowName"},[e._v("消费折扣：")]),e._v(" "),t("el-input",{staticClass:"el-input",attrs:{type:"text",placeholder:"请输入折扣",autoComplete:"off"},model:{value:e.para.Discount,callback:function(a){e.$set(e.para,"Discount",a)},expression:"para.Discount"}}),e._v(" "),t("em",{staticStyle:{position:"absolute",top:"10px",left:"340px"}},[e._v("%")]),e._v(" "),t("span",{staticStyle:{color:"#e33c32"}},[e._v("*")])],1),e._v(" "),t("p",{staticClass:"infoPerLine1 position"},[t("span",{staticClass:"infoShowName"},[e._v("初始储值：")]),e._v(" "),t("el-input",{staticClass:"el-input",attrs:{placeholder:"请输入金额",type:"text",autoComplete:"off"},model:{value:e.para.SavePrice,callback:function(a){e.$set(e.para,"SavePrice",a)},expression:"para.SavePrice"}}),e._v(" "),t("span",{staticStyle:{color:"#e33c32"}},[e._v("*")]),e._v(" "),t("em",{staticStyle:{position:"absolute",top:"10px",left:"340px"}},[e._v("元")])],1),e._v(" "),t("p",{staticClass:"infoPerLine1 position"},[t("span",{staticClass:"infoShowName"},[e._v("售卡金额：")]),e._v(" "),t("el-input",{staticClass:"el-input",attrs:{placeholder:"请输入售卡金额",type:"text",autoComplete:"off"},model:{value:e.para.SalePrice,callback:function(a){e.$set(e.para,"SalePrice",a)},expression:"para.SalePrice"}}),e._v(" "),t("em",{staticStyle:{position:"absolute",top:"10px",left:"340px"}},[e._v("元")]),e._v(" "),t("span",{staticStyle:{color:"#e33c32"}},[e._v("*")])],1),e._v(" "),t("p",{staticClass:"infoPerLine1 position"},[t("span",{staticClass:"infoShowName"},[e._v("会员卡有效期：")]),e._v(" "),t("el-input",{staticClass:"el-input",attrs:{placeholder:"请输入有效期",type:"text",autoComplete:"off"},model:{value:e.para.ActiveMonth,callback:function(a){e.$set(e.para,"ActiveMonth",a)},expression:"para.ActiveMonth"}}),e._v(" "),t("em",{staticStyle:{position:"absolute",top:"10px",left:"340px"}},[e._v("月")]),e._v(" "),t("span",{staticStyle:{color:"#e33c32"}},[e._v("*")])],1),e._v(" "),t("p",{staticClass:"infoPerLine1",staticStyle:{position:"relative",display:"inline-block"}},[t("span",{staticClass:"infoShowName"},[e._v("开卡提成类型：")]),e._v(" "),t("el-select",{staticClass:"statu_select",attrs:{placeholder:"请选择"},on:{change:e.SaleCommTypeChange},model:{value:e.para.SaleCommType,callback:function(a){e.$set(e.para,"SaleCommType",a)},expression:"para.SaleCommType"}},e._l(e.SaleCommTypes,function(e){return t("el-option",{key:e.SaleCommType,attrs:{label:e.label,value:e.SaleCommType}})})),e._v(" "),t("span",{staticClass:"infoShowName"},[e._v("提成数：")]),e._v(" "),t("el-input",{staticClass:"el-input",attrs:{disabled:e.SaleCommDisable,type:"text",placeholder:"请输入提成数",autoComplete:"off"},model:{value:e.para.SaleComm,callback:function(a){e.$set(e.para,"SaleComm",a)},expression:"para.SaleComm"}}),e._v(" "),t("em",{staticStyle:{position:"absolute",top:"10px",left:"740px"}},[e._v(e._s(e.SaleCommUnit))])],1),e._v(" "),t("p",{staticClass:"infoPerLine1",staticStyle:{position:"relative",display:"inline-block"}},[t("span",{staticClass:"infoShowName",attrs:{placeholder:"请输入提成数"}},[e._v("充值提成类型：")]),e._v(" "),t("el-select",{staticClass:"statu_select",attrs:{placeholder:"请选择"},on:{change:e.FillCommTypeChange},model:{value:e.para.FillCommType,callback:function(a){e.$set(e.para,"FillCommType",a)},expression:"para.FillCommType"}},e._l(e.FillCommTypes,function(e){return t("el-option",{key:e.FillCommType,attrs:{label:e.label,value:e.FillCommType}})})),e._v(" "),t("span",{staticClass:"infoShowName"},[e._v("提成数：")]),e._v(" "),t("el-input",{staticClass:"el-input",attrs:{disabled:e.FillCommDisable,placeholder:"请输入提成数",type:"text",autoComplete:"off"},model:{value:e.para.FillComm,callback:function(a){e.$set(e.para,"FillComm",a)},expression:"para.FillComm"}}),e._v(" "),t("em",{staticStyle:{position:"absolute",top:"10px",left:"740px"}},[e._v("%")])],1),e._v(" "),t("p",{staticClass:"infoPerLine1"},[t("span",{staticClass:"infoShowName"},[e._v("状态：")]),e._v(" "),t("el-radio-group",{model:{value:e.para.IsClose,callback:function(a){e.$set(e.para,"IsClose",a)},expression:"para.IsClose"}},[t("el-radio",{attrs:{label:!1}},[e._v("启用")]),e._v(" "),t("el-radio",{attrs:{label:!0}},[e._v("禁用")])],1)],1),e._v(" "),t("p",{staticClass:"infoPerLine1"},[t("span",{staticClass:"infoShowName"}),e._v(" "),t("el-checkbox",{model:{value:e.para.IsAllowPay,callback:function(a){e.$set(e.para,"IsAllowPay",a)},expression:"para.IsAllowPay"}},[e._v("可充值 ")]),e._v(" "),t("el-checkbox",{model:{value:e.para.IsScore,callback:function(a){e.$set(e.para,"IsScore",a)},expression:"para.IsScore"}},[e._v("可积分")])],1),e._v(" "),t("div",{directives:[{name:"show",rawName:"v-show",value:e.para.IsScore,expression:"para.IsScore"}]},[t("p",{staticClass:"infoPerLine1"},[t("span",{staticClass:"infoShowName"},[e._v("积分规则：")]),e._v("\n        充值\n        "),t("el-input",{staticClass:"el-input",attrs:{type:"text",autoComplete:"off"},model:{value:e.para.UCardFillScore,callback:function(a){e.$set(e.para,"UCardFillScore",a)},expression:"para.UCardFillScore"}}),e._v("\n        元即可获得1积分\n      ")],1),e._v(" "),t("p",{staticClass:"infoPerLine1"},[t("span",{staticClass:"infoShowName"}),e._v("\n        消费\n        "),t("el-input",{staticClass:"el-input",attrs:{type:"text",autoComplete:"off"},model:{value:e.para.UCardPayScore,callback:function(a){e.$set(e.para,"UCardPayScore",a)},expression:"para.UCardPayScore"}}),e._v("\n        元即可获得1积分\n      ")],1)]),e._v(" "),t("p",{staticClass:"infoPerLine1"},[t("span",{staticClass:"infoShowName"},[e._v("可发卡门店：")]),e._v(" "),t("el-transfer",{staticStyle:{"margin-left":"187px"},attrs:{titles:["全选","全选"],data:e.shopsSendData},model:{value:e.checkSendShop,callback:function(a){e.checkSendShop=a},expression:"checkSendShop"}})],1),e._v(" "),t("p",{staticClass:"infoPerLine1"},[t("span",{staticClass:"infoSh owName"},[e._v("可用卡门店：")]),e._v(" "),t("el-transfer",{staticStyle:{"margin-left":"187px"},attrs:{titles:["全选","全选"],data:e.shopsUseData},model:{value:e.checkUseShop,callback:function(a){e.checkUseShop=a},expression:"checkUseShop"}})],1),e._v(" "),t("el-button",{staticClass:"el_save_btn",on:{click:e.clickSave}},[e._v("确定")]),e._v(" "),t("el-button",{staticClass:"el_cancel_btn",on:{click:e.clickCancel}},[e._v("取消")])],1)])},staticRenderFns:[]};var o=t("VU/8")(s,i,!1,function(e){t("A8wg")},"data-v-2e2d34c8",null);a.default=o.exports}});
//# sourceMappingURL=36.05fdd85e36554958d831.js.map