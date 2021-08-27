<template lang="pug">
b-container#member
  b-row
    b-col.mt-5(cols="12")
      b-jumbotron#jb(text-variant="white")
        h1.mt-3 {{ user.name }} 您好
    b-col(cols="3")
      //- h3.m-5 帳號
    b-col(cols="6")
      //- h5.m-5 姓名
      //- p.m-5 {{ user.name }}
      //- p {{ user.petName }}
      //- b-btn.float-right(variant="outline-secondary" type="button" @) 編輯
</template>

<script>
import '../style/app.stylus'
export default {
  name: 'Member',
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
  }
  // async mounted () {
  //   if (this.$store.state.jwt.token.length === 0) return
  //   const diff = Date.now() - this.$store.state.jwt.received
  //   try {
  //     // 如果進入網頁時，距離收到 jwt 過了六天，重新取得一次新的 jwt
  //     // 1000 * 60 * 60 * 24 * 6 = 6 天的毫秒數
  //     if (diff > 1000 * 60 * 60 * 24 * 6) {
  //       const { data } = await this.axios.post('/users/extend', {}, {
  //         headers: {
  //           authorization: 'Bearer ' + this.$store.state.jwt.token
  //         }
  //       })
  //       this.$store.commit('extend', data.result)
  //     }
  //     // 進入網頁時重新取一次使用者資料
  //     const { data } = await this.axios.get('/users/', {
  //       headers: {
  //         authorization: 'Bearer ' + this.$store.state.jwt.token
  //       }
  //     })
  //     this.$store.commit('getinfo', data.result)
  //   } catch (error) {
  //     this.$store.commit('logout')
  //   }
  // }
}
</script>
