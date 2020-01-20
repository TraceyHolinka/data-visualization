<template>
  <div id="app">
    <div class="nav">
      <RouterLink to="/">Home</RouterLink> |
      <RouterLink to="/simple-reactivity">Simple Reactivity</RouterLink> |
      <RouterLink to="/world-population">World Population</RouterLink>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  width: 100%;
  min-height: 100vh;
}
h1 {
  margin-bottom: 0;
  font-size: 30px;
}
h2 {
  font-size: 20px;
}
.nav {
  padding: 16px 0 8px;
}
.nav a {
  font-size: 18px;
  font-weight: bold;
  color: #2c3e50;
}
.nav a.router-link-exact-active {
  color: #42b983;
}
</style>
