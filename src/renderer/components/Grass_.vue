<template>
  <div id="grass" ref="grass"></div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'grass',
  created () {
    this.$store.dispatch('Grass/getContributions')
    this.$store.dispatch('Grass/initScene')
  },
  mounted () {
    this.$store.dispatch('Grass/initRenderer')
    this.$store.dispatch('Grass/render')
  },
  computed: {
    ...mapState('Grass', [
      'contributions'
    ])
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
