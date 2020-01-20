<script>
import { eventBus } from '../main'
import * as d3 from 'd3'

export default {
  props: {
    data: { type: Object, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true }
  },
  computed: {
    parents() {
      return this.data.descendants().filter(d => d.depth === 2)
    },
    children() {
      return this.data.descendants().filter(d => d.depth > 2)
    },
    colors() {
      return d3.quantize(d3.interpolateSpectral, this.parents.length)
    }
  },
  methods: {
    openTooltip(item, event) {
      const label = 'Population: '
      eventBus.$emit('openTooltip', { item, event, label })
      event.target.style.fill = 'rgba(0, 0, 0, .25)'
      event.target.style.stroke = 'rgba(255, 255, 255, .5)'
    },
    closeTooltip(event) {
      eventBus.$emit('closeTooltip', { event })
      event.target.style.fill = 'rgba(0, 0, 0, 0)'
      event.target.style.stroke = 'rgba(255, 255, 255, .3)'
    }
  }
}
</script>

<template>
  <div class="visualization">
    <h2>Treemap Diagram (Hover to highlight each region)</h2>
    <svg
      :viewBox="`0, 0 ${width} ${height}`"
      :width="width"
      :height="height"
    >
      <rect
        v-for="(item, i) in parents"
        :key="`p${i}`"
        :x="item.x0"
        :y="item.y0"
        :width="(item.x1 - item.x0)"
        :height="(item.y1 - item.y0)"
        :fill="colors[i]"
      />
      <rect
        v-for="(item, i) in children"
        :key="`c${i}`"
        :class="$style.child"
        :x="item.x0"
        :y="item.y0"
        :width="(item.x1 - item.x0)"
        :height="(item.y1 - item.y0)"
        @mouseover="openTooltip(item, $event)"
        @mouseout="closeTooltip($event)"
      />
    </svg>
  </div>
</template>

<style module>
.child {
  fill: transparent;
  stroke: rgba(255, 255, 255, 0.3);
}
</style>
