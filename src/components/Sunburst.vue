<script>
import * as d3 from 'd3'
import { calArc } from '../main'

export default {
  props: {
    data: { type: Object, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    radius: { type: Number, required: true }
  },
  data() {
    return {
      format: d3.format(',')
    }
  },
  computed: {
    test() {
      return this.data.descendants()
    }
  },
  mounted() {
    // this.drawVisualization()
  },
  methods: {
    // Starburst chart is multiple donut chart: https://github.com/d3/d3-shape/blob/v1.3.7/README.md#arcs
    transform(d) {
      const x = (((d.x0 + d.x1) / 2) * 180) / Math.PI
      const y = (d.y0 + d.y1) / 2
      return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`
    },
    calArc(y0, y1, x0, x1, radius) {
      return calArc(y0, y1, x0, x1, radius)
    },
    drawVisualization() {
      // https://github.com/d3/d3-scale/blob/v2.2.2/README.md#ordinal-scales
      // https://github.com/d3/d3-scale-chromatic#diverging
      const color = d3.scaleOrdinal(d3.quantize(d3.interpolateSpectral, this.data.length))

      // Starburst chart is multiple donut chart: https://github.com/d3/d3-shape/blob/v1.3.7/README.md#arcs
      const arc = d3
        .arc()
        .innerRadius(d => d.y0)
        .outerRadius(d => d.y1 - 1)
        .startAngle(d => d.x0)
        .endAngle(d => d.x1)
        .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
        .padRadius(this.radius / 2)

      const svg = d3.select('#sunburst')

      svg
        .append('g')
        .selectAll('path')
        // Binds data. https://github.com/d3/d3-selection/blob/v1.4.1/README.md#selection_data
        .data(this.data.descendants().filter(d => d.depth))
        // Adds elemet for each data point. https://github.com/d3/d3-selection/blob/maater/README.md#selection_enter
        .enter()
        .append('path')
        .attr('class', 'region')
        .attr('d', arc)
        .attr('fill', d => {
          while (d.depth > 1) d = d.parent
          return color(d.data.key)
        })
        .attr('fill-opacity', 0.8)

      svg
        .append('g')
        .attr('pointer-events', 'none')
        .attr('text-anchor', 'middle')
        .selectAll('text')
        .data(this.data.descendants().filter(d => d.depth && ((d.y0 + d.y1) / 2) * (d.x1 - d.x0) > 10))
        .enter()
        .append('text')
        .attr('class', 'label')
        .attr('transform', d => this.transform(d))
        .attr('dy', '0.35em')
        .text(d => d.data.key)
    }
  }
}
</script>

<template>
  <div class="visualization">
    <h2>Sunburst (Hover to highlight each region)</h2>
    <svg
      id="sunburst"
      :viewBox="`-${radius}, -${radius} ${radius * 2} ${radius * 2}`"
      :width="width"
      :height="height"
    >
      <g>
        <path
          v-for="(item, i) in data.descendants()"
          :key="i"
          :class="item.y0"
          :d="calArc(item.y0, item.y1, item.x0, item.x1, radius)"
        />
      </g>
    </svg>
  </div>
</template>

<style module>
@media (min-width: 768px) {
}

@media (min-width: 960px) {
}
</style>
