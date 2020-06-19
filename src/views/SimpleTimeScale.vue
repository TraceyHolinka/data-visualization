<script>
import { hierarchy, pack } from 'd3-hierarchy'
import SimpleCirclePack from '../components/SimpleCirclePack'
import DiagramSelect from '../components/DiagramSelect'

export default {
  components: {
    SimpleCirclePack,
    DiagramSelect
  },
  data() {
    return {
      data: [],
      select: [
        {
          label: '2001',
          value: '2001'
        },
        {
          label: '2002',
          value: '2002'
        },
        {
          label: '2003',
          value: '2003'
        }
      ],
      selected: '2001',
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
      const h = hierarchy(this.nestedData)
        // build sum with dropdown selected value
        .sum(v => v[this.selected])
      this.packLayout(h)
      return h
    },
    packLayout() {
      return pack()
        .size([this.width, this.height])
        .padding(1)
    }
  }
}
</script>

<template>
  <div :class="$style.container">
    <h1>Circle Pack Diagram</h1>
    <DiagramSelect
      v-model="selected"
      v-bind="{ select }"
    >
      Year:
    </DiagramSelect>
    <SimpleCirclePack v-bind="{ data: hierarchy, width, height }" />
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
</style>
