<script>
import * as d3 from 'd3'
import { eventBus } from '../main'

export default {
  data(){
    return {
      item: {},
      event: {},
      label: ''
    }
  },
  created(){
    eventBus.$on('openTooltip', (data) => {
      this.item = data.item
      this.event = data.event
      this.label = data.label
      this.openTooltip()
    })

    eventBus.$on('closeTooltip', (data) => {
      this.event = data.event
      this.closeTooltip()
    })
  },
  methods: {
    openTooltip() {
      const tooltip = d3.select('#tooltip')
      const format = d3.format(",");

      tooltip
        .select('.tt-parent')
        .text(this.item.parent.data.key)
      tooltip
        .select('.tt-current')
        .text(this.item.data.key)
      tooltip
        .select('.tt-value')
        .text(`${this.label}${format(this.item.value)}`)

      const tooltipElement = tooltip.node().getBoundingClientRect()
      const { height } = tooltipElement

      tooltip
        .style('opacity', 1)
        .style('left', `${this.event.pageX}px`)
        .style('top', `${this.event.pageY - height}px`)
    },
    closeTooltip() {
      d3
        .select('#tooltip')
        .style('opacity', 0)
    }
  }
}
</script>

<template>
  <div
    id="tooltip"
    class="tooltip"
  >
    <div class="tt-parent"/>
    <div class="tt-current"/>
    <div class="tt-value"/>
  </div>
</template>

<style>
.tooltip {
  position: absolute;
  opacity: 0;
  pointer-events: none;
  transition: all 0.2s ease-in-out;
  max-width: 400px;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 1px 5px rgba(51, 51, 51, 0.5);
  padding: 1rem;
}
.tt-parent,
.tt-current,
.tt-value {
  margin: 0;
}
.tt-parent,
.tt-current {
  padding-bottom: 3px;
}
.tt-current {
  font-size: 18px;
  font-weight: bold;
}
</style>
