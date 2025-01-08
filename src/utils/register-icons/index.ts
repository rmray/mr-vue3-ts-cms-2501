import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import type { App } from 'vue'
function registerIcons(app: App<Element>) {
  for (const [key, value] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, value)
  }
}
export default registerIcons
