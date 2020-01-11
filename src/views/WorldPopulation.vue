<script>
import * as d3 from 'd3'
import DiagramSelect from '../components/DiagramSelect'
import ToolTip from '../components/ToolTip'
import CirclePack from '../components/CirclePack'
import TreeMap from '../components/TreeMap'

export default {
  components: {
    DiagramSelect,
    ToolTip,
    CirclePack,
    TreeMap
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
        }
      ],
      selected: 'pack',
      height: 600,
      width: 600,
      radius: 300
    }
  },
  computed: {
    h(){
      let h = d3.hierarchy(this.nestedData, v => v.values)
      // Totals are used for regions and country dimensions
      h.sum(v => v.value)
      h.sort((a, b) => d3.ascending(a.value, b.value))

      return h
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
