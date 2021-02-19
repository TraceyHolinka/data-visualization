<script>
import * as d3 from "d3"
import { nest } from 'd3-collection'
import DiagramSelect from '@/components/Select'
import ToolTip from '@/components/ToolTip'
import CirclePack from '@/components/CirclePack'
import TreeMap from '@/components/TreeMap'
import Sunburst from '@/components/Sunburst'

export default {
  components: {
    DiagramSelect,
    ToolTip,
    CirclePack,
    TreeMap,
    Sunburst
  },
  data() {
    return {
      data: [],
      groupOrder: ['region', 'subregion'],
      select: [
        {
          label: 'Circle Pack',
          value: 'pack'
        },
        {
          label: 'Treemap',
          value: 'treemap'
        },
        {
          label: 'Sunburst',
          value: 'sunburst'
        }
      ],
      selected: 'pack',
      height: 600,
      width: 600,
      radius: 400 // sunburst
    }
  },
  computed: {
    colors() {
      return d3.scaleOrdinal(d3.schemeBlues[this.nestedData.values.length])
      // return d3.scaleOrdinal(d3.interpolateSpectral[this.nestedData.values.length])
      // return d3.scaleQuantize.domain(this.nestedData.values.length).range(d3.interpolateSpectral)
    },
    hierarchy() {
      let i = -1
      let colors = this.colors
      let h = d3.hierarchy(this.nestedData, v => v.values)
      // Totals are used for regions and country dimensions
      h.sum(v => v.value)
      h.sort((a, b) => d3.ascending(a, b))

      // https://github.com/d3/d3-hierarchy/blob/v1.1.9/README.md#node_each
      return h.each(function(d) {
        if (d.depth === 1) {
          d.color = colors[i]
        }
        i++
      })
    },
    partition() {
      // https://github.com/d3/d3-hierarchy/blob/master/README.md#partition
      /*
      partition adds:
      node.x0 - the left edge of the rectangle
      node.y0 - the top edge of the rectangle
      node.x1 - the right edge of the rectangle
      node.y1 - the bottom edge of the rectangle
      */
      let i = -1
      let colors = this.colors
      let h = d3.hierarchy(this.nestedData, v => v.values)
      h.sum(v => v.value)
      h.sort((a, b) => d3.ascending(a.value, b.value))
      h.each(function(d) {
        if (d.depth === 1) {
          d.color = colors[i]
        }
        i++
      })
      return this.partitionLayout(h)
    },
    treemap() {
      return this.treemapLayout(this.d3.hierarchy)
    },
    pack() {
      return this.packLayout(this.d3.hierarchy)
    },
    nestedData() {
      return {
        name: 'World Population',
        values: this.nester.entries(this.data)
      }
    },

    // https://github.com/d3/d3-collection/blob/v1.0.7/README.md#nest
    nester() {
      const n = nest()
      this.groupOrder.forEach(v => {
        n.key(node => node[v])
      })
      return n
    },
    partitionLayout() {
      return d3.partition().size([2 * Math.PI, this.radius])
    },
    treemapLayout() {
      return d3.treemap().size([this.width, this.height])
    },
    packLayout() {
      return d3.pack()
        .size([this.width, this.height])
        .padding(1)
    }
  },
  // https://github.com/thegoodideaco/visualizing-hierarchies/blob/master/datasets/populations.json
  async mounted() {
    const url = await d3.json('/data/populations.json')
    this.data = Object.freeze(url)
  }
}
</script>

<template>
  <div :class="$style.population">
    <ToolTip />
    <h1>World Population</h1>
    <DiagramSelect
      v-model="selected"
      v-bind="{ select }"
    >
      Diagram Type:
    </DiagramSelect>
    <CirclePack
      v-if="selected === 'pack'"
      v-bind="{ data: pack, width, height }"
    />
    <TreeMap
      v-if="selected === 'treemap'"
      v-bind="{ data: treemap, width, height }"
    />
    <Sunburst
      v-if="selected === 'sunburst'"
      v-bind="{ data: partition, radius }"
    />
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
