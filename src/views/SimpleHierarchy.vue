<script>
import { hierarchy, pack, treemap } from 'd3-hierarchy'
import DiagramSelect from '../components/DiagramSelect'
import SimpleCirclePack from '../components/SimpleCirclePack'
import SimpleTreemap from '../components/SimpleTreemap'

export default {
  components: {
    SimpleTreemap,
    DiagramSelect,
    SimpleCirclePack
  },
  data() {
    return {
      items: [
        {
          name: 'Item 1',
          amount: 5
        },
        {
          name: 'Item 2',
          amount: 6
        },
        {
          name: 'Item 3',
          amount: 7
        },
        {
          name: 'Item 4',
          amount: 8
        },
        {
          name: 'Item 5',
          amount: 9
        },
        {
          name: 'Item 6',
          amount: 10
        }
      ],
      height: 500,
      width: 600,
      radius: 300,
      selected: 'pack',
      select: [
        {
          label: 'Circle Pack',
          value: 'pack'
        },
        {
          label: 'Treemap',
          value: 'treemap'
        }
      ]
    }
  },
  computed: {
    nestedData() {
      return {
        name: 'root',
        children: this.items
      }
    },
    hierarchy(){
      // https://github.com/d3/d3-hierarchy/blob/v1.1.9/README.md#hierarchy
      const h = hierarchy(this.nestedData)
        .sum(v => v.amount)
        .sort((a, b) => { return b.value - a.value })

      // https://github.com/d3/d3-hierarchy/blob/master/README.md#treemap
      /*
      treemap adds:
      node.x0 - the left edge of the rectangle
      node.y0 - the top edge of the rectangle
      node.x1 - the right edge of the rectangle
      node.y1 - the bottom edge of the rectangle
      */
      this.treemapLayout(h)

      // https://github.com/d3/d3-hierarchy/blob/master/README.md#pack
      /*
      pack adds:
      node.x - the x-coordinate of the circle’s center
      node.y - the y-coordinate of the circle’s center
      node.r - the radius of the circle
       */
      this.packLayout(h)

      return h
    },
    treemapLayout(){
      return treemap()
        .size([this.width, this.height])
    },
    packLayout() {
      return pack()
        .size([this.width, this.height])
        .padding(1)
    },
    diagramType() {
      switch (this.selected) {
        case 'pack':
          return 'Circle Pack'
        case 'treemap':
          return 'Treemap'
        case 'sunburst':
          return 'Sunburst'
      }
      return ''
    }
  }
}
</script>

<template>
  <div class="container">
    <h1>{{ diagramType }} Diagram</h1>
    <DiagramSelect v-model="selected" v-bind="{ select }"/>

    <SimpleCirclePack
      v-if="selected==='pack'"
      v-bind="{ data: hierarchy, width, height }"
    />
    <SimpleTreemap
      v-if="selected==='treemap'"
      v-bind="{ data: hierarchy, width, height }"
    />

    <div class="controls">
      <div
        v-for="(item, i) in items"
        :key="i"
        class="control"
      >
        <label
          class="label"
          :style="{color: `hsl(${(360 / hierarchy.children.length) * i}, 70%, 50%)`}">
          {{ item.name }}
          <input
            v-model="item.amount"
            class="input"
            type="number"
            step="5"
            min="5"
          >
        </label>
      </div>
    </div>
  </div>
</template>

<style>
  .container {
    max-width: 950px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    font-family: Arial, sans-serif;
  }
  .controls {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  .control {
    display: flex;
    flex-direction: column;
    margin: 0 4px;
  }
  .label {
    font-size: 14px;
    font-weight: bold;
  }
  .input {
    display: block;
    width: 70px;
    margin-top: 6px;
    text-align: center;
  }
</style>
