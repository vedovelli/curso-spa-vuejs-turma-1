
<script>
  import TheNavigation from './the-navigation'
  export default {
    components: {
      TheNavigation
    }
  }
</script>

<template>
  <div id="app">
    <the-navigation></the-navigation>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<style lang="sass" src="./assets/sass/app.scss"></style>
