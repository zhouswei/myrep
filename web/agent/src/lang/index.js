import Vue from 'vue'
import VueI18n from 'vue-i18n'
// import Cookies from 'js-cookie'
import { getCookies } from '@/utils/auth'
import ElementUienLocale from 'element-ui/lib/locale/lang/en'
import ElementUizhLocale from 'element-ui/lib/locale/lang/zh-CN'
import enLocale from './en'
import zhLocale from './zh'

Vue.use(VueI18n)

const messages = {
  en: {
    ...enLocale,
    ...ElementUienLocale
  },
  zh: {
    ...zhLocale,
    ...ElementUizhLocale
  }
}
const i18n = new VueI18n({
  locale: getCookies('language') || 'zh',
  messages
})

export default i18n
