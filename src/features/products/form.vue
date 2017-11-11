
<script>
  import { required } from 'vuelidate/lib/validators'
  import { mapActions, mapState } from 'vuex'
  export default {
    name: 'Form',
    data () {
      return {
        product: {
          id: 0,
          category_id: 0,
          name: ''
        }
      }
    },
    validations: {
      product: {
        name: {
          required
        }
      }
    },
    mounted () {
      this.fetch()
      this.fetchCategories()
    },
    watch: {
      '$route' () {
        if (this.$route.params.id != null) {
          this.fetch()
        }
      }
    },
    methods: {
      ...mapActions('products', ['fetchOne', 'save']),
      ...mapActions('categories', {
        fetchCategories: 'fetch'
      }),
      async fetch () {
        const { id } = this.$route.params
        if (id !== undefined) {
          this.product = await this.fetchOne(id)
        }
      },
      async submit () {
        if (this.isNameInvalid) {
          return
        }

        const verb = this.isNew ? 'post' : 'put'
        const { product } = this

        this.save({ verb, product }).then(() => {
          this.$bus.$emit('display-alert', {
            type: 'success',
            message: 'Produto salvo com sucesso!'
          })
        })
      }
    },
    computed: {
      ...mapState('categories', {
        categories (state) {
          return state.list
        }
      }),
      isWholeModelValid () {
        return !this.$v.$invalid
      },
      isNameInvalid () {
        return this.$v.product.name.$invalid
      },
      isNew () {
        return this.product.id === 0
      }
    }
  }
</script>

<template>
  <div>
    <form @submit.prevent="submit" class="well">
      <div class="form-group">
        <label class="form-label">Categoria</label>
        <select class="form-control" v-model="product.category_id">
          <option value=""></option>
          <option
            v-for="(category, index) in categories"
            :key="index"
            :value="category.id">{{ category.name }}</option>
        </select>
      </div>
      <div class="form-group"
        :class="{ 'has-error': isNameInvalid }">
        <label class="control-label">Nome</label>
        <input type="text" class="form-control" v-model="product.name">
      </div>
      <div class="text-right">
        <button
          :disabled="!isWholeModelValid"
          class="btn btn-primary btn-xs"
          type="submit">Salvar</button>
      </div>
    </form>
  </div>
</template>
