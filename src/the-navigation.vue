
<script>
  import localforage from 'localforage'
  import { mapActions, mapGetters, mapState } from 'vuex'
  export default {
    computed: {
      ...mapGetters(['email']),
      ...mapState('categories', ['list']),
      shouldDisplayNavigation () {
        return this.$route.name !== 'auth.index'
      }
    },
    methods: {
      ...mapActions(['removeToken']),
      logout () {
        localforage.removeItem('token').then(() => {
          this.removeToken()
          this.$router.push({ name: 'auth.index' })
        })
      }
    }
  }
</script>

<template>
  <div>
    <nav class="navbar navbar-default" v-show="shouldDisplayNavigation">
      <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <router-link class="navbar-brand" :to="{ name: 'index' }">Single Page Application</router-link>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav">
            <li><router-link :to="{ name: 'index' }">Dashboard</router-link></li>
            <li><router-link :to="{ name: 'categories.index' }">Categorias</router-link></li>
            <li><router-link :to="{ name: 'users.index' }">Usuários</router-link></li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li>
              <v-gravatar :email="email" width="50"/>
            </li>
            <li><a href="#" @click.prevent="logout">Sair</a></li>
          </ul>
        </div><!-- /.navbar-collapse -->
      </div><!-- /.container-fluid -->
    </nav>
  </div>
</template>
