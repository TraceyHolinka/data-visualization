<script>
import { hierarchy, pack, treemap } from 'd3-hierarchy'
import { pie } from 'd3-shape'
import DiagramSelect from '../components/DiagramSelect'
import SimpleCirclePack from '../components/SimpleCirclePack'
import SimpleTreemap from '../components/SimpleTreemap'

export default {
  components: {
    DiagramSelect,
    SimpleCirclePack,
    SimpleTreemap
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
        children: this.h
      }
    },
    h() {
      let h = this.items
      // add color key
      h.forEach((x, i) => (x.color = `hsl(${(360 / this.items.length) * i}, 70%, 50%)`))
      return h
    },
    hierarchy() {
      // https://github.com/d3/d3-hierarchy/blob/v1.1.9/README.md#hierarchy
      const h = hierarchy(this.nestedData)
        .sum(v => v.amount)

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
    treemapLayout() {
      return treemap().size([this.width, this.height])
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
    <DiagramSelect
      v-model="selected"
      v-bind="{ select }"
    >
      Diagram Type:
    </DiagramSelect>
    <SimpleCirclePack
      v-if="selected === 'pack'"
      v-bind="{ data: hierarchy, width, height }"
    />
    <SimpleTreemap
      v-if="selected === 'treemap'"
      v-bind="{ data: hierarchy, width, height }"
    />

    <div :class="$style.controls">
      <div
        v-for="(item, i) in items"
        :key="i"
        :class="$style.control"
      >
        <label
          :class="$style.label"
          :style="`color: ${item.color}`"
        >
          {{ item.name }}
          <input
            v-model="item.amount"
            :class="$style.input"
            type="number"
            step="5"
            min="5"
          />
        </label>
      </div>
    </div>
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
