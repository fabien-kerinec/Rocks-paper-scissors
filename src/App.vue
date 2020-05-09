<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #1e1e1e;
  width: 100vw;
  height: 100vh;
  @media screen and (max-width: 600px) {
    width: 100%;
    height: auto;
    overflow: auto !important;
  }
}
html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden !important;
  background-color: #1e1e1e;
  @media screen and (max-width: 600px) {
    width: 100%;
    height: auto;
    overflow: auto !important;
  }
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.v-application--wrap {
}
</style>
