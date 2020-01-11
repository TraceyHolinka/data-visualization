<script>
  export default {
    props: {
      data: { type: Object, required: true },
      height: { type: Number, required: true },
      width: { type: Number, required: true }
    },
  }
</script>

<template>
  <div class="visualization">
    <svg
      class="svg"
      :width="width"
      :height="height"
    >
      <rect
        v-for="(item, i) in data.children"
        :key="i"
        class="item"
        :x="item.x0"
        :y="item.y0"
        :width="(item.x1 - item.x0)"
        :height="(item.y1 - item.y0)"
        :fill="`hsl(${(360 / data.children.length) * i}, 70%, 50%)`"
        />
    </svg>
  </div>
</template>

<style>
.svg {
  display: block;
  margin: 0 auto;
}
</style>
