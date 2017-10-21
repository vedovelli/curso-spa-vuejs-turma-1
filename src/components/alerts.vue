
<script>
  export default {
    mounted () {
      this.$bus.$on('display-alert', obj => {
        const { type, message } = obj
        this.messages[type] = message
      })
      this.$bus.$on('clear-alerts', () => {
        this.messages.success = ''
        this.messages.error = ''
      })
    },
    data () {
      return {
        messages: {
          success: '',
          error: ''
        }
      }
    },
    computed: {
      shouldDisplaySuccessMessage () {
        const condicao = this.messages.success !== ''
        if (condicao) {
          setTimeout(() => {
            this.messages.success = ''
          }, 6000)
        }
        return condicao
      },
      shouldDisplayErrorMessage () {
        const condicao = this.messages.error !== ''
        if (condicao) {
          setTimeout(() => {
            this.messages.error = ''
          }, 6000)
        }
        return condicao
      }
    },
    methods: {
      close (type) {
        this.messages[type] = ''
      }
    }
  }
</script>

<template>
  <div>
    <div
      v-show="shouldDisplaySuccessMessage"
      class="alert alert-success alert-dismissible" role="alert">
      <button @click="close('success')" type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
      {{ messages.success }}
    </div>
    <div
      v-show="shouldDisplayErrorMessage"
      class="alert alert-danger alert-dismissible" role="alert">
      <button @click="close('error')" type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
      {{ messages.error }}
    </div>
  </div>
</template>
