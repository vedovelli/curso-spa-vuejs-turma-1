
<script>
  import { mapState } from 'vuex'
  export default {
    name: 'Users',
    computed: {
      ...mapState('categories', ['list'])
    }
  }
</script>

<template>
  <div>
    <h2>Usuários</h2>
    <select style="width: 400px;">
      <option
        v-for="(category, index) in list"
        :key="index"
        :value="category.id">{{ category.name }}</option>
    </select>
  </div>
</template>
