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
      return this.data.descendants().filter(d => d.depth === 1).length
    },
    packLayout() {
      return this.$d3.pack().size([this.width, this.height]).padding(1)
    },
    pack(){
      let h = this.data
      // https://github.com/d3/d3-scale-chromatic/blob/master/README.md
      const colors = this.$d3.scaleSequential(this.$d3.interpolateCool).domain([0, this.maxColor])
      // https://github.com/d3/d3-hierarchy/blob/v1.1.9/README.md#node_each
      let i = -1

      h.each(function(d) {
        if (d.depth === 1) {
          d.color = colors(i)
        }
        i++
      })

      return this.packLayout(h)
    },
    group() {
      return this.pack.descendants().filter(d => d.depth === 1)
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
      <g
        v-for="(item, i) in group"
        :key="`c${i}`"
        :class="$style.group"
        :style="{transform: `translate(${item.x}px, ${item.y}px)`}"
      >
        <circle
          :r="item.r"
          :fill="item.color"
          @mouseover="openTooltip(item, $event)"
          @mouseout="closeTooltip($event)"
        />
      </g>
      <g
        v-for="(item, i) in data.descendants().filter(d => d.depth >= 2)"
        :key="`s${i}`"
        :class="$style.subgroup"
        :style="{transform: `translate(${item.x}px, ${item.y}px)`}"
      >
        <circle
          :r="item.r"
          @mouseover="mouseOverChildren(item, $event)"
          @mouseout="mouseOutChildren($event)"
        />
      </g>
    </svg>
  </div>
</template>

<style module>
.subgroup {
  fill: rgba(0, 0, 0, 0);
  stroke: rgba(255, 255, 255, 0.5);
}
.group,
.subgroup {
  transition: transform 0.2s ease-in;
}
</style>
