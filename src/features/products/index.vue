
<script>
  import { mapState, mapActions } from 'vuex'
  export default {
    name: 'Products',
    async mounted () {
      this.fetch()
    },
    methods: {
      ...mapActions('products', ['fetch', 'update', 'remove']),
      askRemove (product) {
        const msg = `Tem certeza que deseja remover ${product.name}?`
        const confirm = window.confirm(msg)

        if (confirm) {
          this.doRemove(product.id)
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
        this.update(obj.product)
      }
    },
    computed: {
      ...mapState(['isSearching']),
      ...mapState('products', ['list']),
      hasProducts () {
        return this.list.length > 0
      },
      shouldDisplayNew () {
        return this.$route.name === 'products.index'
      },
      shouldDisplayBack () {
        return this.$route.name === 'products.form'
      }
    }
  }
</script>

<template>
  <div>
    <h2>
      <div class="row">
        <div class="col-md-6">
          Produtos
        </div>
        <div class="col-md-6 text-right">
          <button
            class="btn btn-primary btn-xs"
            v-show="shouldDisplayNew"
            @click="navigation('products.form')">novo</button>
          <button
            v-show="shouldDisplayBack"
            class="btn btn-default btn-xs"
            @click="navigation('products.index')">voltar</button>
        </div>
      </div>
    </h2>

    <transition name="slide-fade">
      <router-view @update-product-list="updateList"></router-view>
    </transition>

    <div style="text-align: center" v-show="isSearching">
      <img src="../../assets/loading.gif" alt="Loading...">
    </div>

    <div class="no-products" v-show="!hasProducts && !isSearching">
      <h4>Não há ainda produtos salvos</h4>
    </div>

    <div class="row" v-show="hasProducts">
      <div
        class="col-sm-6 col-md-4"
        v-for="product in list"
        :key="product.id">
        <div class="thumbnail custom-height">
          <div class="caption">
            <h3>{{ product.name }}</h3>
            <p class="text-right">
              <router-link class="btn btn-default btn-xs" :to="{ name: 'products.form', params: { id: product.id } }">editar</router-link>
              <a href="#" @click.prevent="askRemove(product)" class="btn btn-default btn-xs" role="button">excluir</a></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-height {
  min-height: 160px;
}
.no-products {
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
