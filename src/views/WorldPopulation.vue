<script>
import * as d3 from 'd3'
import DiagramSelect from '../components/DiagramSelect'
import ToolTip from '../components/ToolTip'
import CirclePack from '../components/CirclePack'
import TreeMap from '../components/TreeMap'
import Sunburst from '../components/Sunburst'

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
      hierarchy:{},
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
      selected: 'sunburst',
      height: 600,
      width: 600,
      radius: 400 // sunburst
    }
  },
  computed: {
    h(){
      let h = d3.hierarchy(this.nestedData, v => v.values)
      // Totals are used for regions and country dimensions
      h.sum(v => v.value)
      h.sort((a, b) => d3.ascending(a, b))

      return h
    },
    partition(){
      // https://github.com/d3/d3-hierarchy/blob/master/README.md#partition
      /*
      partition adds:
      node.x0 - the left edge of the rectangle
      node.y0 - the top edge of the rectangle
      node.x1 - the right edge of the rectangle
      node.y1 - the bottom edge of the rectangle
      */
      let h = d3.hierarchy(this.nestedData, v => v.values)
      h.sum(v => v.value)
      h.sort((a, b) => d3.ascending(a.value, b.value))
      return this.partitionLayout(h)
    },
    treemap(){
      return this.treemapLayout(this.h)
    },
    pack(){
      return this.packLayout(this.h)
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
    partitionLayout(){
      return d3
        .partition()
        .size([2 * Math.PI, this.radius])
    },
    treemapLayout(){
      return d3
        .treemap()
        .size([this.width, this.height])
    },
    packLayout() {
      return d3
        .pack()
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
  <div class="world-population">
    <ToolTip/>
    <h1>World Population</h1>
    <DiagramSelect
      v-model="selected"
      v-bind="{ select }"
    />
    <CirclePack
      v-if="selected==='pack'"
      v-bind="{ data: pack, width, height }"
    />
    <TreeMap
      v-if="selected==='treemap'"
      v-bind="{ data: treemap, width, height }"
    />
    <Sunburst
      v-if="selected==='sunburst'"
      v-bind="{ data: partition, radius }"
    />
  </div>
</template>

<style>
.world-population {
  max-width: 950px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}
</style>
