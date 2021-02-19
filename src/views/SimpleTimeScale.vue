<script>
import Select from '../components/Select'
import SimpleCirclePack from '../components/SimpleCirclePack'
import SimpleTreemap from '../components/SimpleTreemap'

export default {
  components: {
    Select,
    SimpleCirclePack,
    SimpleTreemap
  },
  data() {
    return {
      selectTime: [
        {
          label: '2001',
          value: 2001
        },
        {
          label: '2002',
          value: 2002
        },
        {
          label: '2003',
          value: 2003
        }
      ],
      selectedTime: '2001',
      selectType: [
        {
          label: 'Circle Pack',
          value: 'pack'
        },
        {
          label: 'Treemap',
          value: 'treemap'
        }
      ],
      selectedType: 'pack',
      items: [
        {
          name: 'Item 1',
          2001: 5,
          2002: 15,
          2003: 10
        },
        {
          name: 'Item 2',
          2001: 6,
          2002: 26,
          2003: 30
        },
        {
          name: 'Item 3',
          2001: 7,
          2002: 17,
          2003: 25
        },
        {
          name: 'Item 4',
          2001: 8,
          2002: 10,
          2003: 19
        },
        {
          name: 'Item 5',
          2001: 9,
          2002: 25,
          2003: 5
        },
        {
          name: 'Item 6',
          2001: 10,
          2002: 15,
          2003: 30
        }
      ],
      height: 500,
      width: 600,
      radius: 300
    }
  },
  computed: {
    d() {
      const d = this.items
      // add color key
      d.forEach((x, i) => (x.color = `hsl(${(360 / this.items.length) * i}, 70%, 50%)`))
      return d
    },
    pack(){
      let h = this.$d3.group(this.d, v => v.name)
      h = this.$d3.hierarchy(h).sum(v => v[this.selectedTime])
      return this.packLayout(h)
    },
    tree(){
      let h = this.$d3.group(this.d, v => v.name)
      h = this.$d3.hierarchy(h).sum(v => v[this.selectedTime])
      return this.treemapLayout(h)
    },
    treemapLayout() {
      return this.$d3.treemap().size([this.width, this.height])
    },
    packLayout() {
      return this.$d3.pack().size([this.width, this.height]).padding(1)
    },
    diagramType() {
      switch (this.selected) {
        case 'pack':
          return 'Circle Pack'
        case 'treemap':
          return 'Treemap'
      }
      return ''
    }
  }
}
</script>

<template>
  <div :class="$style.container">
    <h1>
      {{ diagramType }} Diagram
    </h1>
    <div :class="$style.controls">
      <Select
        v-model="selectedType"
        v-bind="{ select: selectType }"
      >
        Diagram Type:
      </Select>
      <Select
        v-model="selectedTime"
        v-bind="{ select: selectTime }"
      >
        Year:
      </Select>
    </div>
    <SimpleCirclePack
      v-if="selectedType === 'pack'"
      v-bind="{ data: pack, width, height }"
    />
    <SimpleTreemap
      v-if="selectedType === 'treemap'"
      v-bind="{ data: tree, width, height }"
    />
  </div>
</template>

<style module>
.container {
  max-width: 950px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  font-family: Arial, sans-serif;
}
.controls {
  display: flex;
}
</style>
