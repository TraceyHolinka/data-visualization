<script>
export default {
  props:{
    value: { type: String, required: true },
    select: { type: Array, required: true }
  }
}
</script>

<template>
  <label :class="$style.selectLabel">
    Diagram Type:
    <select
      v-bind="{ value }"
      @change="$emit('input', $event.target.value)"
    >
      <option
        v-for="(option, i) in select"
        :key="i"
        :value="option.value"
      >
        {{option.label}}
      </option>
    </select>
  </label>
</template>

<style module>
.selectLabel {
  display: block;
  margin: 16px 0;
}
</style>
