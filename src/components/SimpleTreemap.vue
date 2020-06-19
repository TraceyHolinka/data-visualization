<script>
export default {
  props: {
    data: { type: Object, required: true },
    height: { type: Number, required: true },
    width: { type: Number, required: true }
  }
}
</script>

<template>
  <svg
    :class="$style.treemap"
    :width="width"
    :height="height"
  >
    <g
      v-for="(item, i) in data.children"
      :key="i"
      :class="$style.item"
      :style="{transform: `translate(${item.x0}px, ${item.y0}px)`}"
    >
      <rect
        :class="$style.rect"
        :width="(item.x1 - item.x0)"
        :height="(item.y1 - item.y0)"
        :fill="item.data.color"
      />
      <text
        :class="$style.label"
        :style="{transform: `translate(${(item.x1 - item.x0)/2}px, ${(item.y1 - item.y0)/2}px)`}"
      >
        {{ item.data.name }}
      </text>
    </g>
  </svg>
</template>

<style module>
.treemap {
  display: block;
  margin: 0 auto;
}
.item {
  transition: transform 0.2s ease-in;
}
.label {
  fill: #fff;
  font-size: 16px;
  font-weight: bold;
  pointer-events: none;
  text-anchor: middle;
}
</style>
