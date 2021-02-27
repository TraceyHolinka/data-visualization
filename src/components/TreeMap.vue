<script>
import { eventBus } from '@/main'

export default {
  props: {
    data: { type: Object, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true }
  },
  computed: {
    maxColor() {
      return this.data.descendants().filter(d => d.depth === 2).length
    },
    skipGroup() {
      return this.data.descendants().filter(d => d.depth === 1).length
    },
    treemapLayout() {
      return this.$d3.treemap().size([this.width, this.height])
    },
    treemap(){
      let h = this.data
      const colors = this.$d3.scaleSequential(this.$d3.interpolateSpectral).domain([0, this.maxColor])
      let i = 0 - this.skipGroup

      h.each(function(d) {
        if (d.depth === 2) {
          d.color = colors(i)
          d.counter = i
        }
        i++
      })

      return this.treemapLayout(h)
    },
    subgroup() {
      return this.treemap.descendants().filter(d => d.depth === 2)
    },
    children() {
      return this.treemap.descendants().filter(d => d.depth > 2)
    }
  },
  methods: {
    openTooltip(h, event) {
      const label = 'Population: '
      const item = {
        parent: h.parent.data.key,
        current: h.data.key || h.data[0],
        value: h.value
      }
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
        v-for="(item, i) in subgroup"
        :key="`p${i}`"
        :x="item.x0"
        :y="item.y0"
        :width="(item.x1 - item.x0)"
        :height="(item.y1 - item.y0)"
        :fill="item.color"
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
