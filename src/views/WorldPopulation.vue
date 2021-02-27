<script>
import Select from '@/components/Select'
import ToolTip from '@/components/ToolTip'
import CirclePack from '@/components/CirclePack'
import TreeMap from '@/components/TreeMap'
import Sunburst from '@/components/Sunburst'

export default {
  components: {
    Select,
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
    group() {
      return this.$d3.group(this.data, d => d.region, d => d.subregion)
    }
  },
  methods: {
    // Creates new instance rather than appending to one instance via computed
    hierarchy(data){
      let h = this.$d3.group(data, d => d.region, d => d.subregion)
      h = this.$d3.hierarchy(h).sum(d => d.values)
      // Totals are used for regions and country dimensions
      h.sum(d => d.value)
      return h.sort((a, b) => this.$d3.ascending(a, b))
    },
  },

  // https://github.com/thegoodideaco/visualizing-hierarchies/blob/master/datasets/populations.json
  async mounted() {
    const url = await this.$d3.json('/data/populations.json')
    this.data = Object.freeze(url)
  }
}
</script>

<template>
  <div :class="$style.population">
    <ToolTip />
    <h1>World Population</h1>
    <Select
      v-model="selected"
      v-bind="{ select }"
    >
      Diagram Type:
    </Select>
    <CirclePack
      v-if="selected === 'pack'"
      v-bind="{ data: hierarchy(data), width, height }"
    />
    <TreeMap
      v-if="selected === 'treemap'"
      v-bind="{ data: hierarchy(data), width, height }"
    />
    <Sunburst
      v-if="selected === 'sunburst'"
      v-bind="{ data: hierarchy(data), radius }"
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
