// vuex 是一个全局单一状态树，用来完成对vue中通过data中的变量来改变来控制变化的写法，以满足在复杂项目中的需求
import Vuex from 'vuex'
import Vue from 'vue'
import app from '@/store/module/app'
import errorLog from '@/store/module/errorLog'
import permission from '@/store/module/permission'
import tagView from '@/store/module/tagView'
import user from '@/store/module/user'
import shop from '@/store/module/shop'
import data from '@/store/module/data'
import setting from '@/store/module/setting'
import member from '@/store/module/member'
import getters from '@/store/getters'
Vue.use(Vuex)
// 这是vuex的模块式写法用来完成核心代码的结构化和可读性
const store = new Vuex.Store({
  modules: {
    app,
    errorLog,
    permission,
    tagView,
    user,
    member,
    data,
    shop,
    setting
  },
  getters: getters // 当变量和对象名字相同时，可以使用简写例如 getters 《=》getters：getters
})
export default store
