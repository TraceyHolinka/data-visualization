<script>
  import * as d3 from 'd3'
  import Sunburst from '../components/Sunburst'
  import ToolTip from '../components/ToolTip'

  export default {
    components: {
      Sunburst,
      ToolTip
    },
    data() {
      return {
        data: [],
        hierarchy: d3.hierarchy({}),
        groupOrder: ['region', 'subregion'],
        radius: 300
      }
    },
    computed: {
      nestedData() {
        return {
          name: 'World Population',
          values: this.nester.entries(this.data)
        }
      },
      nester() {
        const n = d3.nest()
        this.groupOrder.forEach(v => {
          n.key(node => node[v])
        })
        return n
      }
    },
    watch: {
      nestedData(){
        // https://github.com/d3/d3-hierarchy/blob/v1.1.9/README.md#hierarchy
        let h = d3.hierarchy(this.nestedData, v => v.values)
        // Totals are used for regions and country dimensions
        h.sum(v => v.value)
        h.sort((a, b) => d3.ascending(a.value, b.value))

        this.hierarchy = h

        // https://github.com/d3/d3-hierarchy/blob/master/README.md#partition
        /*
        partition adds:
        node.x0 - the left edge of the rectangle
        node.y0 - the top edge of the rectangle
        node.x1 - the right edge of the rectangle
        node.y1 - the bottom edge of the rectangle
        */
        const partition = d3.partition()
        partition.size([2 * Math.PI, this.radius])
        this.hierarchy = partition(h)
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
    <Sunburst
      v-bind="{ data: hierarchy, radius }"
    />
  </div>
</template>

<style>
  h1 {
    margin: 0 auto;
    font-size: 30px;
  }
  h2 {
    font-size: 20px;
  }
  .world-population {
    max-width: 950px;
    margin: 1rem auto;
    display: flex;
    flex-direction: column;
  }
</style>
