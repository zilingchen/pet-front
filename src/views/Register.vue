import VueFormWizard from 'vue-form-wizard'

<template lang="pug">
b-container#register
  b-row
    b-col(cols="12")
      b-jumbotron#rejb(text-variant="white")
        h1.text-center.m-4 建立你的ID
      br(m-auto)
    b-col.m-auto(cols="6")
      h3.text-left 個人資料
      //- form-wizard(@on-complete='onComplete')
        tab-content
      b-form(@submit.prevent="submit" @reset="reset")
        b-form-group(
          label-for="input-account"
          :state="state.account"
          invalid-feedback="帳號格式不正確"
        )
          b-form-input#input-account(
            v-model="form.account"
            type="account"
            required
            placeholder="帳號"
            :state="state.account"
          )
        b-form-group(
          label-for="input-name"
          :state="state.name"
          invalid-feedback="姓名格式不正確"
        )
          b-form-input#input-name(
            v-model="form.name"
            type="text"
            required
            placeholder="名字"
            :state="state.name"
          )
            //- b-form-group(
            //-   label-for="input-email"
            //-   :state="state.email"
            //-   invalid-feedback="信箱格式不正確"
            //- )
            //-   b-form-input#input-email(
            //-     v-model="form.email"
            //-     type="text"
            //-     required
            //-     placeholder="電子信箱"
            //-     :state="state.email"
            //-   )
        b-form-group(
          label-for="input-password"
          :state="state.password"
          description="密碼長度限制為 4 到 20 個字"
          invalid-feedback="密碼格式不正確"
        )
          b-form-input#input-password(
            v-model="form.password"
            type="password"
            required
            placeholder="密碼"
            :state="state.password"
          )
        b-form-group(
          label-for="input-phone"
          :state="state.phone"
          invalid-feedback="電話格式不正確"
        )
          b-form-input#input-phone(
            v-model="form.phone"
            type="text"
            required
            placeholder="電話號碼"
            :state="state.phone"
            )
        br
            //- .text-center
            //-   b-btn(variant="outline-secondary" type="button" to='/member') 繼續
            //-   b-btn.mx-1(variant="danger" type="reset") 重設
            //- hr
            //- b-row#petInfo
              tab-content
        h3.text-left 寵物資料
        b-form#petinfo(@submit.prevent="submit" @reset="reset")
          b-form-group(
            label-for="input-petName"
            :state="state.petName"
            invalid-feedback="必填"
          )
            b-form-input#input-petName.m-3(
              v-model="form.petName"
              type="text"
              required
              placeholder="寵物名字"
              :state="state.petName"
            )
          b-form-select#petGender.m-3(
            :options="[{ text: '寵物性別', value: null }, '公', '母']"
            required
            :state="state.petGender"
            v-model="form.petGender"
          )
          b-form-select#petType.m-3(
            :options="[{ text: '寵物種類', value: null }, '狗類', '貓類', '鼠類', '兔類', '其他']"
            required
            :state="state.petType"
            v-model="form.petType"
          )
          br
          .text-center
            //- b-btn(@click= variant="outline-secondary" type="button") 新增寵物
            br
            b-btn.mt-3(variant="outline-primary" type="submit") 註冊
          br
</template>

<script>
// import isEmail from 'validator/es/lib/isEmail'
import isMobilePhone from 'validator/es/lib/isMobilePhone'
import '../style/app.stylus'

export default {
  data () {
    return {
      form: {
        account: '',
        name: '',
        password: '',
        // email: '',
        phone: '',
        petName: '',
        petGender: '',
        petType: ''
      }
    }
  },
  computed: {
    state () {
      const account = this.form.account
      const name = this.form.name
      const password = this.form.password
      // const email = this.form.email
      const phone = this.form.phone
      const petName = this.form.petName
      const petGender = this.form.petGender
      const petType = this.form.petType
      return {
        account: account.length === 0 ? null : account.length >= 4 && account.length <= 20,
        name: name.length === 0 ? null : name.length >= 2 && name.length <= 4,
        password: password.length === 0 ? null : password.length >= 4 && password.length <= 20,
        // email: email.length === 0 ? null : isEmail(email),
        phone: phone.length === 0 ? null : isMobilePhone(phone, 'zh-TW'),
        petName: petName.length === 0 ? null : petName.length >= 1 && petName.length <= 5,
        petGender: petGender === null ? null : true,
        petType: petType === null ? null : true
      }
    }
  },
  methods: {
    reset () {
      this.form.account = ''
      this.form.password = ''
      // this.form.email = ''
      this.form.name = ''
      this.form.phone = ''
      this.form.petName = ''
      this.form.petGender = ''
      this.form.petType = ''
    },
    async submit () {
      try {
        await this.axios.post('/users', this.form)
        this.$swal({
          icon: 'success',
          title: '成功',
          text: '註冊成功'
        })
        this.$router.push('/login')
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
