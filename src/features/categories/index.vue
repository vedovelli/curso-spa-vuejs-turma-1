
<script>
  import http from '@/service/http'
  import findIndex from 'lodash/findIndex'
  export default {
    name: 'Categories',
    data () {
      return {
        list: []
      }
    },
    async mounted () {
      const response = await http.get('/categoria')
      if (response != null) {
        this.list = response.data.categories
      }
    },
    methods: {
      navigation (route) {
        this.$router.push({ name: route })
      },
      updateList (obj) {
        const { category } = obj
        const index = findIndex(this.list, category)

        if (index > -1) {
          this.list[index].name = category.name
          return false
        }

        this.list.unshift(category)
      }
    },
    computed: {
      shouldDisplayNew () {
        return this.$route.name === 'categories.index'
      },
      shouldDisplayBack () {
        return this.$route.name === 'categories.form'
      }
    }
  }
</script>

<template>
  <div>
    <h2>
      <div class="row">
        <div class="col-md-6">
          Categorias
        </div>
        <div class="col-md-6 text-right">
          <button
            class="btn btn-primary btn-xs"
            v-show="shouldDisplayNew"
            @click="navigation('categories.form')">nova</button>
          <button
            v-show="shouldDisplayBack"
            class="btn btn-default btn-xs"
            @click="navigation('categories.index')">voltar</button>
        </div>
      </div>
    </h2>

    <transition name="slide-fade">
      <router-view @update-category-list="updateList"></router-view>
    </transition>

    <div class="row">
      <div
        class="col-sm-6 col-md-4"
        v-for="category in list"
        :key="category.id">
        <div class="thumbnail">
          <div class="caption">
            <h3>{{ category.name }}</h3>
            <p class="text-right">
              <router-link class="btn btn-default btn-xs" :to="{ name: 'categories.form', params: { id: category.id } }">editar</router-link>
              <a href="#" class="btn btn-default btn-xs" role="button">excluir</a></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-fade-enter-active {
  transition: all .2s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter {
  transform: translateY(10px);
  opacity: 0;
}
.slide-fade-leave-to {
  opacity: 0;
}
</style>
