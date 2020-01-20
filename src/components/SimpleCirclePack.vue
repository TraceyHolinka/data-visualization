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
    :class="$style.pack"
    :viewBox="`0, 0 ${width} ${height}`"
    :width="width"
    :height="height"
  >
    <g
      v-for="(item, i) in data.children"
      :key="i"
      :class="$style.item"
      :style="{transform: `translate(${item.x}px, ${item.y}px)`}"
    >
      <circle
        class="circle"
        :r="item.r"
        :fill="item.data.color"
      />
      <text :class="$style.text">
        {{ item.data.name }}
      </text>
    </g>
  </svg>
</template>

<style module>
.pack {
  display: block;
  margin: 0 auto;
}
.item,
.circle {
  transition: transform 0.2s ease-in;
}
.text {
  fill: #fff;
  font-family: Arial, sans-serif;
  font-weight: bold;
  text-anchor: middle;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}
</style>
