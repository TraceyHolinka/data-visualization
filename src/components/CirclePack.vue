<script>
import { eventBus } from '../main'

export default {
  props: {
    data: { type: Object, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true }
  },
  computed: {
    parents() {
      return this.data.descendants().filter(d => d.depth === 1)
    }
  },
  methods: {
    openTooltip(item, event) {
      const label = 'Population: '
      eventBus.$emit('openTooltip', { item, event, label })
    },
    closeTooltip(event) {
      eventBus.$emit('closeTooltip', { event })
    },
    mouseOverChildren(item, event) {
      this.openTooltip(item, event)
      event.target.style.fill = 'rgba(0, 0, 0, .25)'
      event.target.style.stroke = 'rgba(255, 255, 255, .75)'
    },
    mouseOutChildren(event) {
      this.closeTooltip(event)
      event.target.style.fill = 'rgba(0, 0, 0, 0)'
      event.target.style.stroke = 'rgba(255, 255, 255, .5)'
    }
  }
}
</script>

<template>
  <div class="circle-pack">
    <h2>Circle Pack Diagram (Hover to highlight each region)</h2>
    <svg
      :viewBox="`0, 0 ${width} ${height}`"
      :width="width"
      :height="height"
    >
      <circle
        v-for="(item, i) in parents"
        :key="`c${i}`"
        :r="item.r"
        :cx="item.x"
        :cy="item.y"
        :fill="item.color"
        @mouseover="openTooltip(item, $event)"
        @mouseout="closeTooltip($event)"
      />
      <circle
        v-for="(item, i) in data.descendants().filter(d => d.depth >= 2)"
        :key="`s${i}`"
        :class="$style.child"
        :r="item.r"
        :cx="item.x"
        :cy="item.y"
        @mouseover="mouseOverChildren(item, $event)"
        @mouseout="mouseOutChildren($event)"
      />
    </svg>
  </div>
</template>

<style module>
.child {
  fill: rgba(0, 0, 0, 0);
  stroke: rgba(255, 255, 255, 0.5);
}
</style>
