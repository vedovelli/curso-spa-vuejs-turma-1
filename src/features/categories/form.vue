
<script>
  import { required } from 'vuelidate/lib/validators'
  import { mapActions } from 'vuex'
  export default {
    name: 'Form',
    data () {
      return {
        category: {
          id: 0,
          name: ''
        }
      }
    },
    validations: {
      category: {
        name: {
          required
        }
      }
    },
    mounted () {
      this.fetch()
    },
    watch: {
      '$route' () {
        if (this.$route.params.id != null) {
          this.fetch()
        }
      }
    },
    methods: {
      ...mapActions('categories', ['fetchCategory', 'saveCategory']),
      async fetch () {
        const { id } = this.$route.params
        if (id !== undefined) {
          this.category = await this.fetchCategory(id)
        }
      },
      async submit () {
        if (this.isNameInvalid) {
          return
        }

        const verb = this.isNew ? 'post' : 'put'
        const { category } = this

        this.saveCategory({ verb, category }).then(() => {
          this.$bus.$emit('display-alert', {
            type: 'success',
            message: 'Categoria salva com sucesso!'
          })
        })
      }
    },
    computed: {
      isWholeModelValid () {
        return !this.$v.$invalid
      },
      isNameInvalid () {
        return this.$v.category.name.$invalid
      },
      isNew () {
        return this.category.id === 0
      }
    }
  }
</script>

<template>
  <div>
    <form @submit.prevent="submit" class="well">
      <div class="form-group"
        :class="{ 'has-error': isNameInvalid }">
        <label class="control-label">Nome</label>
        <input type="text" class="form-control" v-model="category.name">
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
