<script>
import D3Logo from '../components/D3Logo'

export default {
  name: 'Home',
  components: {
    D3Logo
  }
}
</script>
<template>
  <div class="home">
    <img
      class="vue"
      src="../assets/logo.png"
    />
    <D3Logo class="d3" />
  </div>
</template>

<style>
.home {
  display: flex;
  flex-flow: column;
  align-items: center;
  max-width: 350px;
  margin: 0 auto;
}
.vue {
  max-width: 350px;
}
.d3 {
  max-width: 300px;
}
</style>
