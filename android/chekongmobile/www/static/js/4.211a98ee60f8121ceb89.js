webpackJsonp([4,23,29,33,44],{"8rgU":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={props:{id:{type:Number,default:0},shops:{type:Array,default:function(){return[]}}},data:function(){return{totalData:{},UserID:0,chkPowerID:[],ShopID:[]}},methods:{update:function(){this.getPowers()},setDate:function(t){var e=this;this.totalData={lebel:"全选",id:"全选",check:!1,data:[]},t.forEach(function(t){if("概况"!==t.Name){var a={};a.lebel=t.Name,a.id=t.ID,a.check=!1,a.data=[],t.SonClass.forEach(function(t){var e={};e.lebel=t.Name,e.id=t.ID,e.check=!1,e.data=[],t.SonClass.forEach(function(t){var a={};a.lebel=t.Name,a.id=t.ID,a.check=!1,a.data=[],e.data.push(a)}),t.Items.forEach(function(t){var a={};a.lebel=t.Name,a.id=t.ID,a.check=!1,a.data=[],t.FuncList.forEach(function(t){var e={};e.lebel=t.Name,e.id=t.ID,t.IsSelected>0?e.check=!0:e.check=!1,t.IsRole>0?e.disable=!0:e.disable=!1,e.data=[],a.data.push(e)}),e.data.push(a)}),a.data.push(e)}),t.Items.forEach(function(t){var e={};e.lebel=t.Name,e.id=t.ID,e.check=!1,e.data=[],t.FuncList.forEach(function(t){var a={};a.lebel=t.Name,a.id=t.ID,t.IsSelected>0?a.check=!0:a.check=!1,t.IsRole>0?a.disable=!0:a.disable=!1,a.data=[],e.data.push(a)}),a.data.push(e)}),e.totalData.data.push(a)}}),this.checkState()},getPowers:function(){var t=this;this.$store.dispatch("queryUserPowers",{ID:this.id}).then(function(e){t.setDate(e.SpecThisClass),t.shops=[],e.SpecRoleShops.forEach(function(e){var a={};a.Title=e.Title,a.ID=e.ID,a.isDel=!1,t.shops.push(a)}),e.SpecShopInfoListForUser.forEach(function(e){var a={};a.Title=e.Title,a.ID=e.ID,a.isDel=!0,t.shops.push(a)})}).catch(function(){})},tier:function(t){t?this.totalData.data.forEach(function(t){t.check=!0,t.data.forEach(function(t){t.check=!0,t.data.forEach(function(t){t.disable||(t.check=!0,t.data.forEach(function(t){t.disable||(t.check=!0)}))})})}):this.totalData.data.forEach(function(t){t.check=!1,t.data.forEach(function(t){t.check=!1,t.data.forEach(function(t){t.disable||(t.check=!1,t.data.forEach(function(t){t.check=!1}))})})}),this.checkState()},tier1:function(t){t.check?t.data.forEach(function(t){t.disable||(t.check=!0,t.data.forEach(function(t){t.disable||(t.check=!0,t.data.forEach(function(t){t.disable||(t.check=!0)}))}))}):t.data.forEach(function(t){t.check=!1,t.data.forEach(function(t){t.check=!1,t.data.forEach(function(t){t.check=!1})})})},tier2:function(t){t.check?t.data.forEach(function(t){t.check=!0,t.data.forEach(function(t){t.check=!0})}):t.data.forEach(function(t){t.check=!1,t.data.forEach(function(t){t.check=!1})})},tier3:function(t){t.check?t.data.forEach(function(t){t.check=!0}):t.data.forEach(function(t){t.check=!1})},tier4:function(t){},checkState:function(){this.totalData.data.forEach(function(t){var e=0,a=0;t.data.forEach(function(t){var i=0,s=0;t.data.forEach(function(t){var e=0,a=0;t.data.forEach(function(t){t.check&&a++,t.disable&&e++}),a>0&&(t.check=!0),e>0&&(t.disable=!0),t.check&&s++,t.disable&&i++}),s>0&&(t.check=!0),i>0&&(t.disable=!0),t.check&&a++,t.disable&&e++}),a>0&&(t.check=!0),e>0&&(t.disable=!0)})},addShop:function(){this.$emit("clickOp",this.shops)},clickConfirm:function(){var t=this,e=[];this.totalData.data.forEach(function(t){t.data.forEach(function(t){t.data.forEach(function(t){0===t.data.length&&t.check&&e.push(t.id),t.data.forEach(function(t){t.check&&e.push(t.id)})})})});var a=[];this.shops.forEach(function(t){a.push(t.ID)}),this.$store.dispatch("setUserPowers",{UserID:this.id,chkPowerID:e,ShopID:a}).then(function(e){t.$message({type:"success",message:"修改成功"}),location.reload(),t.$emit("close")}).catch(function(){})},clickCancel:function(){this.$emit("close")},clickDel:function(t){var e=this,a=-1;this.shops.forEach(function(i){i.ID===t&&(a=e.shops.indexOf(i))}),this.shops.splice(a,1)}}},s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticStyle:{"background-color":"#37bfc8",padding:"10px","margin-top":"10px"}},[a("span",{staticStyle:{color:"#fff","font-size":"14px"}},[t._v("操作权限")]),t._v(" "),a("span",{staticStyle:{color:"#fff","font-size":"14px","margin-left":"50px"}},[t._v("设置权限")]),t._v(" "),a("el-checkbox",{staticStyle:{"margin-left":"50px",color:"#ffffff"},attrs:{fill:"#FFFFFF",disabled:t.totalData.disable},on:{change:t.tier},model:{value:t.totalData.check,callback:function(e){t.$set(t.totalData,"check",e)},expression:"totalData.check"}},[t._v(t._s(t.totalData.lebel))])],1),t._v(" "),a("div",t._l(t.totalData.data,function(e){return a("div",{key:e.id,staticStyle:{"margin-left":"10px"},attrs:{label:e.lebel}},[a("el-checkbox",{staticClass:"padding-class",attrs:{disabled:e.disable},on:{change:function(a){t.tier1(e)}},model:{value:e.check,callback:function(a){t.$set(e,"check",a)},expression:"item.check"}},[t._v(t._s(e.lebel))]),t._v(" "),t._l(e.data,function(e){return a("div",{key:e.id,staticStyle:{"margin-left":"100px"},attrs:{label:e.lebel}},[a("el-checkbox",{staticClass:"padding-class",attrs:{disabled:e.disable},on:{change:function(a){t.tier2(e)}},model:{value:e.check,callback:function(a){t.$set(e,"check",a)},expression:"item.check"}},[t._v(t._s(e.lebel))]),t._v(" "),t._l(e.data,function(e){return a("div",{key:e.id,staticStyle:{"margin-left":"50px"},attrs:{label:e.lebel}},[a("el-checkbox",{staticClass:"padding-class",attrs:{disabled:e.disable},on:{change:function(a){t.tier3(e)}},model:{value:e.check,callback:function(a){t.$set(e,"check",a)},expression:"item.check"}},[t._v(t._s(e.lebel))]),t._v(" "),t._l(e.data,function(i){return a("el-checkbox",{key:i.id,staticClass:"el-checkbox",attrs:{disabled:i.disable,label:i.lebel},on:{change:function(a){t.tier4(e)}},model:{value:i.check,callback:function(e){t.$set(i,"check",e)},expression:"item1.check"}},[t._v(t._s(i.lebel))])})],2)})],2)})],2)})),t._v(" "),t._m(0),t._v(" "),a("div",{staticStyle:{"margin-left":"100px","vertical-align":"middle"}},[t._l(t.shops,function(e){return a("div",{key:e.ID,attrs:{label:e.Title}},[a("p",[e.isDel?a("img",{staticStyle:{"margin-right":"10px",cursor:"pointer"},attrs:{src:"http://r.handnear.com/chain/img/hongcha.png"},on:{click:function(a){t.clickDel(e.ID)}}}):t._e(),t._v(t._s(e.Title))])])}),t._v(" "),a("p",{staticStyle:{cursor:"pointer"},on:{click:t.addShop}},[a("img",{staticStyle:{"margin-right":"10px",cursor:"pointer"},attrs:{src:"http://r.handnear.com/chain/img/lvcha.png"}}),t._v("添加门店")])],2),t._v(" "),a("el-button",{staticClass:"el_save_btn",on:{click:t.clickConfirm}},[t._v("确定")]),t._v(" "),a("el-button",{staticClass:"el_cancel_btn",on:{click:t.clickCancel}},[t._v("取消")])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticStyle:{"background-color":"#37bfc8",padding:"10px","margin-top":"10px"}},[e("span",{staticStyle:{color:"#fff","font-size":"14px"}},[this._v("数据权限")])])}]};var n=a("VU/8")(i,s,!1,function(t){a("baBJ")},"data-v-7132894a",null);e.default=n.exports},A2xj:function(t,e){},CCDe:function(t,e){},baBJ:function(t,e){},iNx4:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={props:{shops:{type:Array,default:function(){return[]}}},mounted:function(){this.getShops()},data:function(){return{para:{PageIndex:1,PageSize:20,ID:"",ShopName:""},pageTotal:20,shopList:[],checkShops:[],loading:!0,enable:0}},methods:{changePageHandle:function(){this.getShops()},getShops:function(){var t=this;this.loading=!0,this.$store.dispatch("queryShopsList",this.para).then(function(e){t.shopList=[],t.pageTotal=e.PageTotal,t.para.PageIndex=e.PageIndex,t.$refs.bottomPagination.lastEmittedPage=t.para.PageIndex,e.listInfo.forEach(function(e){var a={};a.ID=e.ID,a.ShopCode=e.ShopCode,a.Title=e.Title,a.isDel=!0,t.shopList.push(a)}),t.loading=!1,t.check()}).catch(function(){})},check:function(){this.$nextTick(function(){var t=this;this.shopList.forEach(function(e){t.shops.forEach(function(a){e.ID===a.ID&&t.$refs.multipleTable.toggleRowSelection(e)})})})},clickSearch:function(){this.getShops()},clickSave:function(){this.$emit("result",this.checkShops)},handleSelectionChange:function(t){var e=this;this.checkShops=[],this.checkShops=t,this.checkShops.forEach(function(t){e.shops.forEach(function(e){t.ID===e.ID&&(e.isDel||(t.isDel=!1))})})},checkboxInit:function(t,e){var a=!0;return this.shops.forEach(function(e){e.isDel||e.ID===t.ID&&(a=!1)}),a?1:0}}},s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}]},[a("div",{staticStyle:{"margin-left":"20px"}},[t._v("\n    注册码\n    "),a("el-input",{staticStyle:{width:"150px","margin-right":"50px"},attrs:{type:"text",autoComplete:"off",placeholder:"请输入注册码"},model:{value:t.para.ID,callback:function(e){t.$set(t.para,"ID",e)},expression:"para.ID"}}),t._v("\n    门店名称\n    "),a("el-input",{staticStyle:{width:"150px"},attrs:{type:"text",autoComplete:"off",placeholder:"请输入门店名称"},model:{value:t.para.ShopName,callback:function(e){t.$set(t.para,"ShopName",e)},expression:"para.ShopName"}}),t._v(" "),a("el-button",{staticClass:"el_search_btn",on:{click:t.clickSearch}},[t._v("搜索")])],1),t._v(" "),a("div",{staticStyle:{"margin-left":"20"}},[a("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:t.shopList,"tooltip-effect":"dark","select-on-indeterminate":"false"},on:{"selection-change":t.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",selectable:t.checkboxInit,width:"55"}}),t._v(" "),a("el-table-column",{attrs:{prop:"ShopCode",label:"注册码"}}),t._v(" "),a("el-table-column",{attrs:{prop:"Title",label:"门店名称"}})],1),t._v(" "),a("el-pagination",{ref:"bottomPagination",staticClass:"paging_class",attrs:{background:"",layout:"prev, pager, next","current-page":t.para.PageIndex,"page-size":t.para.PageSize,total:t.pageTotal},on:{"current-change":t.changePageHandle,"update:currentPage":function(e){t.$set(t.para,"PageIndex",e)}}})],1),t._v(" "),a("el-button",{staticClass:"el_save_btn",on:{click:t.clickSave}},[t._v("确定")])],1)},staticRenderFns:[]};var n=a("VU/8")(i,s,!1,function(t){a("mScE")},"data-v-077be144",null);e.default=n.exports},"jxk/":function(t,e){},kwtx:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("8rgU"),s=a("zdBy"),n=a("qfDR"),o=a("iNx4");var c=a("W/0o"),l=a("0xDb"),r={name:"usermanager",components:{secondUsermanagerAdd:s.default,secondUsermanagerMod:n.default,secUserPowerSetting:i.default,thrUerPowerSetting:o.default},mixins:[c.a],data:function(){return{status:[{label:"正常",statu:"1"},{label:"禁用",statu:"2"}],statu:"",userName:"",pageIndex:1,pageTotal:20,loadingview:!1,tableData:[],dialogVisible:!1,dialogVisible1:!1,dialogVisible2:!1,dialogWidth:"50%",dialogWidth1:"80%",sendData:{},stateOption:"禁用",roleName:"",shops:[],innerVisible:!1,id:0,currentAccount:""}},mounted:function(){this.currentAccount=this.$store.getters.avatar,this.queryHandleData(),this.isMobile()?(this.dialogWidth="100%",this.dialogWidth1="100%"):(this.dialogWidth="50%",this.dialogWidth1="80%")},methods:{tranlatePath:function(t){return Object(l.a)(t)},isPermission:function(t){for(var e=-1,a=0;a<this.$store.getters.funcList.length&&-1===e;a++)for(var i=0;i<this.$store.getters.funcList[a].length;i++)if(this.$store.getters.funcList[a][i].ID===t&&0!==this.$store.getters.funcList[a][i].IsSelected){e=t;break}return-1!==e},changePageHandle:function(){this.queryHandleData(this.pageIndex)},queryHandleData:function(t){var e=this;this.loadingview=!0,this.$store.dispatch("queryUserListInfo",{Name:this.userName,State:this.statu,PageIndex:t,PageSize:20}).then(function(t){if("null"===t)return e.tableData=[],void(e.loadingview=!1);e.loadingview=!1,e.pageTotal=t.PageTotal,e.pageIndex=t.PageIndex,e.$refs.bottomPagination.lastEmittedPage=e.pageIndex,e.tableData=[],t.listInfo.forEach(function(t){var a={};a.ID=t.ID,a.GroupID=t.GroupID,a.account_num=t.Account,a.name=t.ShowName,a.section=t.DepartmentTitle,a.DepartmentID=t.DepartmentID,a.role=t.RoleTitle,a.RoleID=t.RoleID,a.statu=1===t.State?"正常":"禁用",a.stateOption=1===t.State?"禁用":"启用",e.currentAccount===t.Account&&(a.stateOption=""),e.tableData.push(a)})}).catch(function(){e.loadingview=!1})},addUser:function(){this.dialogVisible=!0},clickPowerSetting:function(t){var e=this;this.roleName=t.name,this.id=t.ID,this.dialogVisible2=!0,this.$nextTick(function(){e.$refs.secUserPowerSettingRef.update()})},modify:function(t){var e=this;this.dialogVisible1=!0,this.sendData=t,this.$nextTick(function(){e.$refs.secondUsermanagerModRef.update()})},stopUse:function(t,e){var a=this;this.$confirm("确定要"+e+"吗？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){a.$store.dispatch("querydeleteUserInfo",{id:t}).then(function(t){a.$message({type:"success",message:"禁用成功!"}),a.queryHandleData(a.pageIndex)}).catch(function(){a.$message.error("删除失败")})}).catch(function(){})},closeAddDialog:function(){this.dialogVisible=!1,this.queryHandleData(this.pageIndex)},closeModDialog:function(){this.dialogVisible1=!1,this.queryHandleData(this.pageIndex)},clickOp:function(t){var e=this;this.shops=t,this.innerVisible=!0,this.$nextTick(function(){e.$refs.thrRolePowerSettingRef.getShops()})},closeDialog:function(){this.dialogVisible2=!1},onResult:function(t){this.innerVisible=!1,this.shops=t}}},d={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[t.isPermission(49)?a("div",[a("div",{staticClass:"padding_calss"},[t._v("\n      账号或姓名:\n      "),a("el-input",{staticClass:"member-input-content",attrs:{type:"text",autocomplete:"off",placeholder:"请输入账号或姓名"},model:{value:t.userName,callback:function(e){t.userName=e},expression:"userName"}}),t._v("\n      状态:\n      "),a("el-select",{staticClass:"padding-class",attrs:{placeholder:"请选择"},model:{value:t.statu,callback:function(e){t.statu=e},expression:"statu"}},t._l(t.status,function(t){return a("el-option",{key:t.statu,attrs:{label:t.label,value:t.statu}})})),t._v(" "),a("el-button",{staticClass:"seach_btn_class",attrs:{loading:t.loadingview},on:{click:function(e){t.queryHandleData(1)}}},[t._v("查询")])],1),t._v(" "),a("span",[t.isPermission(51)?a("el-button",{staticClass:"add_btn",on:{click:function(e){t.addUser()}}},[t._v(" +新增用户")]):t._e()],1),t._v(" "),a("div",[a("el-table",{staticClass:"el-table-class",staticStyle:{width:"100%"},attrs:{data:t.tableData,border:""}},[a("el-table-column",{attrs:{fixed:"",prop:"account_num",label:"账号",width:"200"}}),t._v(" "),a("el-table-column",{attrs:{prop:"name",label:"姓名",width:"150"}}),t._v(" "),a("el-table-column",{attrs:{prop:"section",label:"所属部门",width:"150"}}),t._v(" "),a("el-table-column",{attrs:{prop:"role",label:"角色",width:"150"}}),t._v(" "),a("el-table-column",{attrs:{prop:"statu",label:"状态",width:"150"}}),t._v(" "),a("el-table-column",{attrs:{prop:"option",label:"操作",width:"250"},scopedSlots:t._u([{key:"default",fn:function(e){return[t.isPermission(50)?a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){t.clickPowerSetting(e.row)}}},[t._v("权限配置")]):t._e(),t._v(" "),t.isPermission(52)?a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){t.modify(e.row)}}},[t._v("修改")]):t._e(),t._v(" "),t.isPermission(53)?a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){t.stopUse(e.row.ID,e.row.stateOption)}}},[t._v(t._s(e.row.stateOption))]):t._e()]}}])})],1)],1),t._v(" "),a("div",[a("el-pagination",{ref:"bottomPagination",staticClass:"paging_class",attrs:{background:"",layout:"prev, pager, next","current-page":t.pageIndex,"page-size":20,total:t.pageTotal},on:{"current-change":t.changePageHandle,"update:currentPage":function(e){t.pageIndex=e}}})],1),t._v(" "),a("el-dialog",{directives:[{name:"dialogDrag",rawName:"v-dialogDrag"}],ref:"dialog_wrapper",staticClass:"dialog-container",attrs:{title:"新增用户",visible:t.dialogVisible,"modal-append-to-body":!1,width:t.dialogWidth,"close-on-click-modal":!1},on:{"update:visible":function(e){t.dialogVisible=e}}},[a("div",{attrs:{slot:"title"},slot:"title"},[a("p",{staticStyle:{color:"#37bfc8"}},[t._v("新增用户")])]),t._v(" "),a("div",{staticClass:"dialog-body"},[a("secondUsermanagerAdd",{ref:"secondUsermanagerAddRef",on:{close:t.closeAddDialog}}),t._v(" "),a("div",{directives:[{name:"dialogDragWidth",rawName:"v-dialogDragWidth",value:t.$refs.dialog_wrapper,expression:"$refs.dialog_wrapper"}],staticClass:"line"})],1)]),t._v(" "),a("el-dialog",{directives:[{name:"dialogDrag",rawName:"v-dialogDrag"}],ref:"dialog_wrapper",staticClass:"dialog-container",attrs:{title:"修改用户",visible:t.dialogVisible1,width:t.dialogWidth,"modal-append-to-body":!1,"close-on-click-modal":!1},on:{"update:visible":function(e){t.dialogVisible1=e}}},[a("div",{attrs:{slot:"title"},slot:"title"},[a("p",{staticStyle:{color:"#37bfc8"}},[t._v("修改用户")])]),t._v(" "),a("div",{staticClass:"dialog-body"},[a("secondUsermanagerMod",{ref:"secondUsermanagerModRef",attrs:{sendData:t.sendData},on:{close:t.closeModDialog}}),t._v(" "),a("div",{directives:[{name:"dialogDragWidth",rawName:"v-dialogDragWidth",value:t.$refs.dialog_wrapper,expression:"$refs.dialog_wrapper"}],staticClass:"line"})],1)]),t._v(" "),a("el-dialog",{directives:[{name:"dialogDrag",rawName:"v-dialogDrag"}],ref:"dialog_wrapper",staticClass:"dialog-container",attrs:{title:"当前角色",visible:t.dialogVisible2,width:t.dialogWidth1,"modal-append-to-body":!1,"close-on-click-modal":!1},on:{"update:visible":function(e){t.dialogVisible2=e}}},[a("el-dialog",{attrs:{width:t.dialogWidth,"modal-append-to-body":!1,title:"门店列表","close-on-click-modal":!1,visible:t.innerVisible,"append-to-body":""},on:{"update:visible":function(e){t.innerVisible=e}}},[a("thrUerPowerSetting",{ref:"thrRolePowerSettingRef",attrs:{shops:t.shops},on:{result:t.onResult}}),t._v(" "),a("div",{directives:[{name:"dialogDragWidth",rawName:"v-dialogDragWidth",value:t.$refs.dialog_wrapper,expression:"$refs.dialog_wrapper"}],staticClass:"line"})],1),t._v(" "),a("div",{attrs:{slot:"title"},slot:"title"},[a("p",{staticStyle:{color:"#37bfc8"}},[t._v("当前用户:"+t._s(t.roleName))])]),t._v(" "),a("div",{staticClass:"dialog-body"},[a("secUserPowerSetting",{ref:"secUserPowerSettingRef",attrs:{id:t.id,shops:t.shops},on:{clickOp:t.clickOp,close:t.closeDialog}}),t._v(" "),a("div",{directives:[{name:"dialogDragWidth",rawName:"v-dialogDragWidth",value:t.$refs.dialog_wrapper,expression:"$refs.dialog_wrapper"}],staticClass:"line"})],1)],1)],1):a("div",[a("img",{staticClass:"title-image",attrs:{src:t.tranlatePath("static/img/noPermission.png"),width:"100%"}})])])},staticRenderFns:[]};var h=a("VU/8")(r,d,!1,function(t){a("jxk/")},"data-v-6249205b",null);e.default=h.exports},mScE:function(t,e){},qfDR:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={props:{sendData:{type:Object,default:function(){return{}}}},data:function(){return{loading:!0,departments:[],roles:[],para:{ID:0,Account:"",Password:"",ShowName:"",DepartmentID:"",RoleID:"",State:1}}},created:function(){this.update()},methods:{update:function(){this.loading=!0,this.getDepartments(),this.para.Account=this.sendData.account_num,this.para.ID=this.sendData.ID,this.para.Password="123456",this.para.ShowName=this.sendData.name,this.para.DepartmentID=this.sendData.DepartmentID,void 0!==this.para.DepartmentID&&""!==this.para.DepartmentID&&this.getRoles()},clickCancel:function(){this.$emit("close")},clickSave:function(){var t=this;this.dataValidation()&&this.$store.dispatch("queryChangeUserInfo",this.para).then(function(e){t.$message({type:"success",message:"修改成功"}),t.para={},t.$emit("close")}).catch(function(){})},getRoles:function(){var t=this;this.$store.dispatch("queryRoles",{departmentID:this.para.DepartmentID}).then(function(e){t.roles=[],e.forEach(function(e){var a={};a.id=e.ID,a.label=e.Title,t.roles.push(a)}),t.roles.forEach(function(e){e.label===t.sendData.role&&(t.para.RoleID=e.id)}),t.loading=!1}).catch(function(){})},getDepartments:function(){var t=this;this.$store.dispatch("queryDepartmentList",{id:0}).then(function(e){t.departments=[],e.departArray.forEach(function(e){var a={};a.department=e.ID,a.label=e.Title,t.departments.push(a)})}).catch(function(){})},departmentChange:function(t){this.para.RoleID="",this.getRoles()},dataValidation:function(){return""===this.para.Account?(this.$message.error("请输入账号"),!1):/^1[34578]\d{9}$/.test(this.para.Account)?""===this.para.Password?(this.$message.error("请输入密码"),!1):""===this.para.ShowName?(this.$message.error("请输入姓名"),!1):""===this.para.DepartmentID?(this.$message.error("请选择部门"),!1):""!==this.para.RoleID||(this.$message.error("请选择角色"),!1):(this.$message.error("请输入正确的手机号"),!1)}}},s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}]},[a("div",[a("span",{staticStyle:{color:"#e33c32","margin-left":"18px"}},[t._v("此处添加的是连锁店后台的操作人员，各分店人员帐号需去分店添加")]),t._v(" "),a("p",{staticClass:"infoPerLine1"},[a("span",{staticClass:"infoShowName"},[t._v("账号：")]),t._v(" "),a("el-input",{attrs:{disabled:!0,type:"text","auto-complete":"off"},model:{value:t.para.Account,callback:function(e){t.$set(t.para,"Account",e)},expression:"para.Account"}}),t._v(" "),a("span",{staticStyle:{color:"#e33c32"}},[t._v("*")])],1),t._v(" "),a("p",{staticClass:"infoPerLine1"},[a("span",{staticClass:"infoShowName"},[t._v("密码：")]),t._v(" "),a("el-input",{attrs:{disabled:!0,type:"password","auto-complete":"off"},model:{value:t.para.Password,callback:function(e){t.$set(t.para,"Password",e)},expression:"para.Password"}}),t._v(" "),a("span",{staticStyle:{color:"#e33c32"}},[t._v("*")])],1),t._v(" "),a("p",{staticClass:"infoPerLine1"},[a("span",{staticClass:"infoShowName"},[t._v("姓名：")]),t._v(" "),a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:t.para.ShowName,callback:function(e){t.$set(t.para,"ShowName",e)},expression:"para.ShowName"}}),t._v(" "),a("span",{staticStyle:{color:"#e33c32"}},[t._v("*")])],1),t._v(" "),a("p",{staticClass:"infoPerLine1"},[a("span",{staticClass:"infoShowName"},[t._v("所属部门：")]),t._v(" "),a("el-select",{staticClass:"statu_select",attrs:{placeholder:"请选择"},on:{change:t.departmentChange},model:{value:t.para.DepartmentID,callback:function(e){t.$set(t.para,"DepartmentID",e)},expression:"para.DepartmentID"}},t._l(t.departments,function(t){return a("el-option",{key:t.department,attrs:{label:t.label,value:t.department}})})),t._v(" "),a("span",{staticStyle:{color:"#e33c32"}},[t._v("*")])],1),t._v(" "),a("p",{staticClass:"infoPerLine1"},[a("span",{staticClass:"infoShowName"},[t._v("角色：")]),t._v(" "),a("el-select",{staticClass:"statu_select",attrs:{placeholder:"请选择"},model:{value:t.para.RoleID,callback:function(e){t.$set(t.para,"RoleID",e)},expression:"para.RoleID"}},t._l(t.roles,function(t){return a("el-option",{key:t.id,attrs:{label:t.label,value:t.id}})})),t._v(" "),a("span",{staticStyle:{color:"#e33c32"}},[t._v("*")])],1),t._v(" "),a("div",{staticStyle:{width:"260px",margin:"auto","white-space":"nowrap"}},[a("el-button",{staticClass:"el_save_btn",on:{click:t.clickSave}},[t._v("确定")]),t._v(" "),a("el-button",{staticClass:"el_cancel_btn",on:{click:t.clickCancel}},[t._v("取消")])],1)])])},staticRenderFns:[]};var n=a("VU/8")(i,s,!1,function(t){a("CCDe")},"data-v-3cc1eb3e",null);e.default=n.exports},zdBy:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",[a("p",{staticClass:"infoPerLine1"},[a("span",{staticClass:"infoShowName"},[t._v("账号：")]),t._v(" "),a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:t.para.Account,callback:function(e){t.$set(t.para,"Account",e)},expression:"para.Account"}}),t._v(" "),a("span",{staticStyle:{color:"#e33c32"}},[t._v("*")])],1),t._v(" "),a("p",{staticClass:"infoPerLine1"},[a("span",{staticClass:"infoShowName"},[t._v("密码：")]),t._v(" "),a("el-input",{attrs:{type:"password","auto-complete":"off"},model:{value:t.para.Password,callback:function(e){t.$set(t.para,"Password",e)},expression:"para.Password"}}),t._v(" "),a("span",{staticStyle:{color:"#e33c32"}},[t._v("*")])],1),t._v(" "),a("p",{staticClass:"infoPerLine1"},[a("span",{staticClass:"infoShowName"},[t._v("姓名：")]),t._v(" "),a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:t.para.ShowName,callback:function(e){t.$set(t.para,"ShowName",e)},expression:"para.ShowName"}}),t._v(" "),a("span",{staticStyle:{color:"#e33c32"}},[t._v("*")])],1),t._v(" "),a("p",{staticClass:"infoPerLine1"},[a("span",{staticClass:"infoShowName"},[t._v("所属部门：")]),t._v(" "),a("el-select",{staticClass:"statu_select",attrs:{placeholder:"请选择"},on:{change:t.departmentChange},model:{value:t.para.DepartmentID,callback:function(e){t.$set(t.para,"DepartmentID",e)},expression:"para.DepartmentID"}},t._l(t.departments,function(t){return a("el-option",{key:t.department,attrs:{label:t.label,value:t.department}})})),t._v(" "),a("span",{staticStyle:{color:"#e33c32"}},[t._v("*")])],1),t._v(" "),a("p",{staticClass:"infoPerLine1"},[a("span",{staticClass:"infoShowName"},[t._v("角色：")]),t._v(" "),a("el-select",{staticClass:"statu_select",attrs:{placeholder:"请选择"},model:{value:t.para.RoleID,callback:function(e){t.$set(t.para,"RoleID",e)},expression:"para.RoleID"}},t._l(t.roles,function(t){return a("el-option",{key:t.id,attrs:{label:t.label,value:t.id}})})),t._v(" "),a("span",{staticStyle:{color:"#e33c32"}},[t._v("*")])],1),t._v(" "),a("div",{staticStyle:{width:"260px",margin:"auto","white-space":"nowrap"}},[a("el-button",{staticClass:"el_save_btn",on:{click:t.clickSave}},[t._v("确定")]),t._v(" "),a("el-button",{staticClass:"el_cancel_btn",on:{click:t.clickCancel}},[t._v("取消")])],1)])])},staticRenderFns:[]};var s=a("VU/8")({data:function(){return{departments:[],roles:[],para:{Account:"",Password:"",ShowName:"",DepartmentID:"",RoleID:"",State:1}}},created:function(){this.update()},methods:{update:function(){this.getDepartments()},clickCancel:function(){this.$emit("close")},clickSave:function(){var t=this;this.dataValidation()&&this.$store.dispatch("queryAddUserInfo",this.para).then(function(e){t.$message({type:"success",message:"添加成功"}),t.para={},t.$emit("close")}).catch(function(){})},getRoles:function(){var t=this;this.$store.dispatch("queryRoles",{departmentID:this.para.DepartmentID}).then(function(e){t.roles=[],e.forEach(function(e){var a={};a.id=e.ID,a.label=e.Title,t.roles.push(a)})}).catch(function(){})},getDepartments:function(){var t=this;this.$store.dispatch("queryDepartmentList",{id:0}).then(function(e){t.departments=[],e.departArray.forEach(function(e){var a={};a.department=e.ID,a.label=e.Title,t.departments.push(a)})}).catch(function(){})},departmentChange:function(t){this.para.RoleID="",this.getRoles()},dataValidation:function(){return""===this.para.Account?(this.$message.error("请输入账号"),!1):/^1[34578]\d{9}$/.test(this.para.Account)?""===this.para.Password?(this.$message.error("请输入密码"),!1):""===this.para.ShowName?(this.$message.error("请输入姓名"),!1):""===this.para.DepartmentID?(this.$message.error("请选择部门"),!1):""!==this.para.RoleID||(this.$message.error("请选择角色"),!1):(this.$message.error("请输入正确的手机号"),!1)}}},i,!1,function(t){a("A2xj")},"data-v-559ae742",null);e.default=s.exports}});
//# sourceMappingURL=4.211a98ee60f8121ceb89.js.map