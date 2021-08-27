<template lang="pug">
b-container.d-flex.justify-content-center#register
  b-row
    b-col(cols="12")
      h1.text-left.mt-5.mb-5 登入。
    b-col(cols="12")
      b-form(@submit.prevent="submit" @reset="reset")
        b-form-group(
          label-for="input-account"
          :state="state.account"
          invalid-feedback="帳號格式不正確"
        )
          b-form-input#input-account(
            v-model="form.account"
            type="text"
            required
            placeholder="帳號"
            :state="state.account"
          )
        //- b-form-group(
        //-   label-for="input-email"
        //-   :state="state.email"
        //-   invalid-feedback="信箱格式不正確"
        //- )
        //-   b-form-input#input-email.mr-2(
        //-     v-model="form.email"
        //-     type="text"
        //-     required
        //-     placeholder="信箱"
        //-     :state="state.email"
        //-   )
        b-form-group(
          label-for="input-password"
          :state="state.password"
          invalid-feedback="密碼格式不正確"
        )
          b-form-input#input-password(
            v-model="form.password"
            type="password"
            required
            placeholder="密碼"
            :state="state.password"
          )
          br
          .text-center
            b-btn.mx-3.w-50(variant="primary" type="submit") 登入
          // b-btn.mx-1(variant="danger" type="reset") 重設
        .text-center
          b-link(to='/register') 還沒用過嗎？建立新 ID
</template>

<script>
// import isEmail from 'validator/es/lib/isEmail'

export default {
  data () {
    return {
      form: {
        account: '',
        // email: '',
        password: ''
      }
    }
  },
  computed: {
    state () {
      const account = this.form.account
      // const email = this.form.email
      const password = this.form.password
      return {
        account: account.length === 0 ? null : account.length >= 4 && account.length <= 20,
        // email: email.length === 0 ? null : isEmail(email),
        password: password.length === 0 ? null : password.length >= 4 && password.length <= 20
      }
    }
  },
  methods: {
    reset () {
      this.form.account = ''
      // this.form.email = ''
      this.form.password = ''
    },
    async submit () {
      try {
        const { data } = await this.axios.post('/users/login', this.form)
        this.$swal({
          icon: 'success',
          title: '成功',
          text: '登入成功'
        })
        this.$store.commit('login', data)
        this.$router.push('/member')
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '失敗',
          text: error.response.data.message
        })
      }
    }
  }
}
</script>
