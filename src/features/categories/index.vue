
<script>
  import { mapState, mapActions } from 'vuex'
  export default {
    name: 'Categories',
    async mounted () {
      this.fetch()
    },
    methods: {
      ...mapActions('categories', ['fetch', 'update', 'remove']),
      askRemove (category) {
        const msg = `Tem certeza que deseja remover ${category.name}?`
        const confirm = window.confirm(msg)

        if (confirm) {
          this.doRemove(category.id)
        }
      },
      async doRemove (id) {
        this.remove({ id }).then((message) => {
          this.$bus.$emit('display-alert', {
            type: 'success',
            message
          })
        })
      },
      navigation (route) {
        this.$router.push({ name: route })
      },
      updateList (obj) {
        this.update(obj.category)
      }
    },
    computed: {
      ...mapState(['isSearching']),
      ...mapState('categories', ['list']),
      hasCategories () {
        return this.list.length > 0
      },
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

    <div style="text-align: center" v-show="isSearching">
      <img src="../../assets/loading.gif" alt="Loading...">
    </div>

    <div class="no-categories" v-show="!hasCategories && !isSearching">
      <h4>Não há ainda categorias salvas</h4>
    </div>

    <div class="row" v-show="hasCategories">
      <div
        class="col-sm-6 col-md-4"
        v-for="category in list"
        :key="category.id">
        <div class="thumbnail">
          <div class="caption">
            <h3>{{ category.name }}</h3>
            <p class="text-right">
              <router-link class="btn btn-default btn-xs" :to="{ name: 'categories.form', params: { id: category.id } }">editar</router-link>
              <a href="#" @click.prevent="askRemove(category)" class="btn btn-default btn-xs" role="button">excluir</a></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.no-categories {
  padding: 35px;
}
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
