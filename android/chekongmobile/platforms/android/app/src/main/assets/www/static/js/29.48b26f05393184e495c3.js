webpackJsonp([29],{A2xj:function(t,e){},zdBy:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",[a("p",{staticClass:"infoPerLine1"},[a("span",{staticClass:"infoShowName"},[t._v("账号：")]),t._v(" "),a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:t.para.Account,callback:function(e){t.$set(t.para,"Account",e)},expression:"para.Account"}}),t._v(" "),a("span",{staticStyle:{color:"#e33c32"}},[t._v("*")])],1),t._v(" "),a("p",{staticClass:"infoPerLine1"},[a("span",{staticClass:"infoShowName"},[t._v("密码：")]),t._v(" "),a("el-input",{attrs:{type:"password","auto-complete":"off"},model:{value:t.para.Password,callback:function(e){t.$set(t.para,"Password",e)},expression:"para.Password"}}),t._v(" "),a("span",{staticStyle:{color:"#e33c32"}},[t._v("*")])],1),t._v(" "),a("p",{staticClass:"infoPerLine1"},[a("span",{staticClass:"infoShowName"},[t._v("姓名：")]),t._v(" "),a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:t.para.ShowName,callback:function(e){t.$set(t.para,"ShowName",e)},expression:"para.ShowName"}}),t._v(" "),a("span",{staticStyle:{color:"#e33c32"}},[t._v("*")])],1),t._v(" "),a("p",{staticClass:"infoPerLine1"},[a("span",{staticClass:"infoShowName"},[t._v("所属部门：")]),t._v(" "),a("el-select",{staticClass:"statu_select",attrs:{placeholder:"请选择"},on:{change:t.departmentChange},model:{value:t.para.DepartmentID,callback:function(e){t.$set(t.para,"DepartmentID",e)},expression:"para.DepartmentID"}},t._l(t.departments,function(t){return a("el-option",{key:t.department,attrs:{label:t.label,value:t.department}})})),t._v(" "),a("span",{staticStyle:{color:"#e33c32"}},[t._v("*")])],1),t._v(" "),a("p",{staticClass:"infoPerLine1"},[a("span",{staticClass:"infoShowName"},[t._v("角色：")]),t._v(" "),a("el-select",{staticClass:"statu_select",attrs:{placeholder:"请选择"},model:{value:t.para.RoleID,callback:function(e){t.$set(t.para,"RoleID",e)},expression:"para.RoleID"}},t._l(t.roles,function(t){return a("el-option",{key:t.id,attrs:{label:t.label,value:t.id}})})),t._v(" "),a("span",{staticStyle:{color:"#e33c32"}},[t._v("*")])],1),t._v(" "),a("div",{staticStyle:{width:"260px",margin:"auto","white-space":"nowrap"}},[a("el-button",{staticClass:"el_save_btn",on:{click:t.clickSave}},[t._v("确定")]),t._v(" "),a("el-button",{staticClass:"el_cancel_btn",on:{click:t.clickCancel}},[t._v("取消")])],1)])])},staticRenderFns:[]};var n=a("VU/8")({data:function(){return{departments:[],roles:[],para:{Account:"",Password:"",ShowName:"",DepartmentID:"",RoleID:"",State:1}}},created:function(){this.update()},methods:{update:function(){this.getDepartments()},clickCancel:function(){this.$emit("close")},clickSave:function(){var t=this;this.dataValidation()&&this.$store.dispatch("queryAddUserInfo",this.para).then(function(e){t.$message({type:"success",message:"添加成功"}),t.para={},t.$emit("close")}).catch(function(){})},getRoles:function(){var t=this;this.$store.dispatch("queryRoles",{departmentID:this.para.DepartmentID}).then(function(e){t.roles=[],e.forEach(function(e){var a={};a.id=e.ID,a.label=e.Title,t.roles.push(a)})}).catch(function(){})},getDepartments:function(){var t=this;this.$store.dispatch("queryDepartmentList",{id:0}).then(function(e){t.departments=[],e.departArray.forEach(function(e){var a={};a.department=e.ID,a.label=e.Title,t.departments.push(a)})}).catch(function(){})},departmentChange:function(t){this.para.RoleID="",this.getRoles()},dataValidation:function(){return""===this.para.Account?(this.$message.error("请输入账号"),!1):/^1[34578]\d{9}$/.test(this.para.Account)?""===this.para.Password?(this.$message.error("请输入密码"),!1):""===this.para.ShowName?(this.$message.error("请输入姓名"),!1):""===this.para.DepartmentID?(this.$message.error("请选择部门"),!1):""!==this.para.RoleID||(this.$message.error("请选择角色"),!1):(this.$message.error("请输入正确的手机号"),!1)}}},s,!1,function(t){a("A2xj")},"data-v-559ae742",null);e.default=n.exports}});
//# sourceMappingURL=29.48b26f05393184e495c3.js.map