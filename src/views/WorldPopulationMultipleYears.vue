<script>
import * as d3 from 'd3'
import DiagramSelect from '../components/Select'
import ToolTip from '../components/ToolTip'
import CirclePack from '../components/CirclePack'

export default {
  components: {
    DiagramSelect,
    ToolTip,
    CirclePack
  },
  data() {
    return {
      data: [],
      groupOrder: ['region', 'subregion'],
      height: 600,
      width: 600,
      radius: 400,
      select: [],
      selected: ''
    }
  },
  computed: {
    colors() {
      return d3.quantize(d3.interpolateCool, this.nestedData.values.length)
    },
    hierarchy() {
      let i = -1
      let colors = this.colors
      let h = d3.hierarchy(this.nestedData, v => v.values)
        // Totals are used for regions and country dimensions
        .sum(v => v[this.selected])
        .sort((a, b) => d3.ascending)

      // https://github.com/d3/d3-hierarchy/blob/v1.1.9/README.md#node_each
      return h.each(function(d) {
        if (d.depth === 1) {
          d.color = colors[i]
        }
        i++
      })
    },
    pack() {
      return this.packLayout(this.hierarchy)
    },
    nestedData() {
      return {
        name: 'World Population',
        values: this.nester.entries(this.data)
      }
    },
    // https://github.com/d3/d3-collection/blob/v1.0.7/README.md#nest
    nester() {
      const n = d3.nest()
      this.groupOrder.forEach(v => {
        n.key(node => node[v])
      })
      return n
    },
    packLayout() {
      return d3
        .pack()
        .size([this.width, this.height])
        .padding(1)
    }
  },
  // https://data.worldbank.org/indicator/SP.POP.TOTL
  async mounted() {
    const url = await d3.csv('/data/world_population.csv')
    this.data = Object.freeze(url)
    const keys = d3.keys(this.data[0]).filter(k => k > 2000)
    keys.forEach(k =>
      this.select.push({'label': k, 'value': k})
    )
    this.selected = this.select[0]['value']
  }
}
</script>

<template>
  <div :class="$style.population">
    <DiagramSelect
      v-model="selected"
      v-bind="{ select }"
    >
      Year:
    </DiagramSelect>
    <ToolTip />
    <h1>Recent World Population (by years)</h1>
    <CirclePack v-bind="{ data: pack, width, height }" />
  </div>
</template>

<style module>
.population {
  max-width: 950px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}
</style>
