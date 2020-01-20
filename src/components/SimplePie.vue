<script>
import * as d3 from 'd3'

export default {
  props: {
    data: { type: Array, required: true },
    radius: { type: Number, required: true }
  },
  computed: {
    labelX() {
      return this.arcLabel(this.data[0])
    },
    trans() {
      return this.transform(this.data[0])
    }
  },
  methods: {
    arc(d) {
      const arc = d3
        .arc()
        .innerRadius(0)
        .outerRadius(this.radius - 1)
        .startAngle(d.startAngle)
        .endAngle(d.endAngle)
        .padAngle(d.padAngle)
        .padRadius(this.radius / 2)
      return arc()
    },
    arcLabel(d) {
      const arc = d3
        .arc()
        .innerRadius(this.radius * 0.6)
        .outerRadius(this.radius * 0.6)
      // https://github.com/d3/d3-shape/blob/v1.3.7/README.md#arc_centroid
      return arc.centroid(d)
    },
    transform(d) {
      const label = this.arcLabel(d)
      const x = label[1]
      const y = label[0]
      return `transform: translate(${y}px,${x}px);`
    }
  }
}
</script>

<template>
  <svg
    :viewBox="`-${radius}, -${radius} ${radius * 2} ${radius * 2}`"
    :width="radius * 2"
    :height="radius * 2"
    :class="$style.pie"
  >
    <g
      v-for="(item, i) in data"
      :key="i"
      :class="$style.item"
    >
      <path
        :d="arc(item)"
        :fill="item.data.data.color"
      />
      <text
        :class="$style.label"
        :style="transform(item)"
      >
        {{ item.data.data.name }}
      </text>
    </g>
  </svg>
</template>

<style module>
.pie {
  display: block;
  margin: 0 auto;
}
.item {
  transition: transform 0.2s ease-in;
}
.label {
  fill: #fff;
  font-size: 16px;
  font-weight: bold;
  pointer-events: none;
  text-anchor: middle;
}
</style>
