<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
}
@font-face {
  font-family: "Montserrat";
  src: local("Montserrat"),
    url(./media/font/Montserrat-Regular.ttf) format("truetype");
}
@font-face {
  font-family: "Montserrat-Bold";
  src: local("Montserrat-Bold"),
    url(./media/font/Montserrat-Bold.ttf) format("truetype");
}
</style>
