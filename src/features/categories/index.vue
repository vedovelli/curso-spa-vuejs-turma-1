
<script>
  import axios from 'axios'
  export default {
    name: 'Categories',
    mounted () {
      const url = 'http://localhost:3456/categoria'
      axios.get(url)
        .then(this.successHandler)
        .catch(this.errorHandler)
    },
    methods: {
      successHandler (res) {
        console.log(res.data)
      },
      errorHandler (error) {
        console.log(error)
      }
    }
  }
</script>

<template>
  <div>
    <h1>Sou o componente Categories.index</h1>
  </div>
</template>
