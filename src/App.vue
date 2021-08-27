<template lang="pug">
#app
  b-navbar(toggleable='lg' variant='light')
    b-container
      b-navbar-brand(v-bind='mainProps' to='/')
        img(src='./assets/logo-s.png')
      b-navbar-toggle(target='nav-collapse')
      b-collapse#nav-collapse(is-nav)
        b-navbar-nav.ml-auto
          b-nav-item(v-if="!user.islogin" to='/login')
            font-awesome-icon(:icon='["fas", "sign-in-alt"]')
            |   登入
          b-nav-item(v-if="user.islogin" to='/member')
            font-awesome-icon(:icon='["fas", "user-circle"]')
            |   帳戶
          b-nav-item(v-if="user.islogin" to='/cart')
            font-awesome-icon(:icon='["fas", "shopping-cart"]')
            |   購物車
          b-nav-item(v-if="user.islogin" to='/orders')
            font-awesome-icon(:icon='["fas", "cube"]')
            |   訂單
          b-nav-item(v-if="user.islogin && user.isAdmin" to='/admin')
            font-awesome-icon(:icon='["fas", "user-cog"]')
            |   管理
          b-nav-item(v-if="user.islogin" @click="logout")
            font-awesome-icon(:icon='["fas", "sign-out-alt"]')
            |   登出
          //- b-nav-item(v-if="!user.islogin" to='/register') 註冊
          //- b-nav-item(v-if="!user.islogin" to='/login') 登入
          //- b-nav-item(v-if="user.islogin" to='/cart') 購物車
          //- b-nav-item(v-if="user.islogin" to='/orders') 訂單
          //- b-nav-item(v-if="user.islogin && user.isAdmin" to='/admin') 管理
          //- b-nav-item(v-if="user.islogin" @click="logout") 登出
          //- b-nav-item(v-b-toggle.collapse-2)
            font-awesome-icon(:icon='["fas", "shopping-bag"]' size='2x')
          //- b-dropdown(variant="light")
  router-view
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      mainProps: ''
    }
  },
  methods: {
    async logout () {
      try {
        await this.axios.delete('/users/logout', {
          headers: {
            authorization: 'Bearer ' + this.$store.state.jwt.token
          }
        })
        this.$store.commit('logout')
        if (this.$route.path !== '/') this.$router.push('/')
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '發生錯誤'
        })
      }
    }
  },
  async mounted () {
    if (this.$store.state.jwt.token.length === 0) return
    const diff = Date.now() - this.$store.state.jwt.received
    try {
      // 如果進入網頁時，距離收到 jwt 過了六天，重新取得一次新的 jwt
      // 1000 * 60 * 60 * 24 * 6 = 6 天的毫秒數
      if (diff > 1000 * 60 * 60 * 24 * 6) {
        const { data } = await this.axios.post('/users/extend', {}, {
          headers: {
            authorization: 'Bearer ' + this.$store.state.jwt.token
          }
        })
        this.$store.commit('extend', data.result)
      }
      // 進入網頁時重新取一次使用者資料
      const { data } = await this.axios.get('/users/', {
        headers: {
          authorization: 'Bearer ' + this.$store.state.jwt.token
        }
      })
      this.$store.commit('getinfo', data.result)
    } catch (error) {
      this.$store.commit('logout')
    }
  }
}
</script>
