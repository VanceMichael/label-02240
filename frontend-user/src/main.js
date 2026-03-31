import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import router from './router'
import App from './App.vue'
import './styles/global.scss'

// 彻底阻止 Element Plus 修改 body style 导致弹窗闪动
// 拦截 body.style 上 overflow 和 paddingRight 的写入
const bodyStyle = document.body.style
const originalSetProperty = bodyStyle.setProperty.bind(bodyStyle)
const blockedProps = new Set(['overflow', 'padding-right'])

bodyStyle.setProperty = function(prop, value, priority) {
  if (blockedProps.has(prop)) return
  return originalSetProperty(prop, value, priority)
}

// 同时拦截直接赋值
const styleDescriptor = Object.getOwnPropertyDescriptor(CSSStyleDeclaration.prototype, 'overflow')
if (styleDescriptor && styleDescriptor.set) {
  const originalOverflowSet = styleDescriptor.set
  Object.defineProperty(bodyStyle, 'overflow', {
    set() { /* blocked */ },
    get() { return originalOverflowSet ? '' : '' },
    configurable: true
  })
}

const prDescriptor = Object.getOwnPropertyDescriptor(CSSStyleDeclaration.prototype, 'paddingRight')
if (prDescriptor && prDescriptor.set) {
  Object.defineProperty(bodyStyle, 'paddingRight', {
    set() { /* blocked */ },
    get() { return '' },
    configurable: true
  })
}

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
