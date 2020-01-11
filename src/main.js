import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { arc } from 'd3-shape'

Vue.config.productionTip = false

export const eventBus = new Vue()

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

export function calArc(y0, y1, x0, x, radius) {
  return arc()
    .innerRadius(d => d.y0)
    .outerRadius(d => d.y1 - 1)
    .startAngle(d => d.x0)
    .endAngle(d => d.x1)
    .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
    .padRadius(radius / 2)
}
