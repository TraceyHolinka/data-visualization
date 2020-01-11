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
  <div class="visualization">
    <svg
      :viewBox="`0, 0 ${width} ${height}`"
      :width="width"
      :height="height"
    >
      <g
        v-for="(item, i) in data.children"
        :key="i"
        class="item"
        :style="{transform: `translate(${item.x}px, ${item.y}px)`}"
      >
        <circle
          class="circle"
          :r="item.r"
          :fill="`hsl(${(360 / data.children.length) * i}, 70%, 50%)`"
        />
        <text class="text">
          {{ item.data.name }}
        </text>
      </g>
    </svg>
  </div>
</template>

<style>
  .svg {
    display: block;
    margin: 0 auto;
  }
  .item,
  .circle {
    transition: transform 0.2s ease-in;
  }
  .item {
    text-anchor: middle;
  }
  .text {
    transform: translate(0, 6px);
    fill: #fff;
    font-family: Arial, sans-serif;
    font-weight: bold;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  }
</style>
