<template>
  <div id="grass" ref="grass"></div>
</template>

<script>
export default {
  name: 'grass',
  mounted () {
    this.$store.dispatch('Grass/drawObject')
  }
}
</script>

<style>
#grass {
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0);
  -webkit-app-region: drag
}
</style>
