
<script>
  import TheNavigation from './the-navigation'
  import TheAlerts from '@/components/alerts'
  export default {
    components: {
      TheNavigation,
      TheAlerts
    }
  }
</script>

<template>
  <div id="app">
    <the-navigation></the-navigation>
    <div class="container">
      <the-alerts></the-alerts>
      <router-view/>
    </div>
  </div>
</template>

<style lang="sass" src="./assets/sass/app.scss"></style>
