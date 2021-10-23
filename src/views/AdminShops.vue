<template lang="pug">
#adminshops.mt-3
  h1.text-center 店家管理
  b-btn.m-6.float-right(variant="outline-success" @click="$bvModal.show('modal-shop')") 新增
  br.mb-2
  br.mb-2
  br.mb-2
  b-table(:items="shops" :fields="fields" ref="shopTable")
    template(#cell(image)="data")
      img(v-if="data.item" :src="data.item.image" style="height: 50px")
    template(#cell(sell)="data")
      | {{ data.item.sell ? 'v' : 'X' }}
    template(#cell(action)="data")
      b-btn(variant="outline-success" @click="editshop(data.index)") 編輯
      b-btn.ml-3(variant="outline-danger" @click="$bvModal.del('modal-shop')") 刪除
  b-modal#modal-shop(
    :title="form._id.length > 0 ? '編輯店家' : '新增店家'"
    ok-variant="success"
    ok-title="送出"
    cancel-variant="danger"
    cancel-title="取消"
    @ok="submitModal"
    @hidden="resetForm"
    :ok-disabled="submitDisable"
    :cancel-disabled="submitDisable"
  )
    b-form-group(
      label="品名"
      label-for="input-name"
      :state="state.name"
      description="店名長度限制為 1 個字以上"
      invalid-feedback="店名格式不正確"
    )
      b-form-input#input-name(
        v-model="form.name"
        type="text"
        required
        placeholder="請輸入店名"
        :state="state.name"
      )
    b-form-group(
      label="地址"
      label-for="input-address"
      :state="state.address"
      description="價格限制為 1 以上"
      invalid-feedback="地址格式不正確"
    )
      b-form-input#input-address(
        v-model="form.address"
        type="text"
        required
        placeholder="請輸入地址"
        :state="state.address"
      )
    b-form-group(
      label="說明"
      label-for="input-description"
    )
      b-form-textarea#input-description(
        v-model="form.description"
        type="text"
        placeholder="請輸入說明文字"
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
    b-form-group(
          label-for="input-time"
          :state="state.time"
          invalid-feedback="營業時間格式不正確"
        )
      b-form-input#input-time(
        v-model="form.time"
        type="text"
        required
        placeholder="營業時間"
        :state="state.time"
        )
    b-form-group(
      label="上架"
      label-for="input-sell"
    )
      b-form-radio(v-model="form.sell" :value="true") 上架
      b-form-radio(v-model="form.sell" :value="false") 下架
    img-inputer(v-model="form.image" theme="dark" size="large" placeholder="點擊或拖曳選擇圖片" bottom-text="點擊或拖曳以修改")
</template>

<script>
export default {
  data () {
    return {
      shops: [],
      fields: [
        {
          key: 'image',
          label: '圖片'
        },
        {
          key: 'name',
          label: '店名'
        },
        {
          key: 'phone',
          label: '電話'
        },
        {
          key: 'time',
          label: '營業時間'
        },
        {
          key: 'address',
          label: '地址'
        },
        {
          key: 'sell',
          label: '上架'
        },
        {
          key: 'action',
          label: '操作'
        }
      ],
      submitDisable: false,
      form: {
        name: '',
        phone: '',
        address: '',
        time: '',
        sell: false,
        image: null,
        _id: ''
      }
    }
  },
  computed: {
    state () {
      return {
        name: this.form.name.length === 0 ? null : true,
        phone: this.form.phone === 0 ? null : true,
        address: this.form.address.length === 0 ? null : true
      }
    }
  },
  methods: {
    editshop (index) {
      this.form = {
        name: this.shops[index].name,
        time: this.shops[index].time,
        phone: this.shops[index].phone,
        address: this.shops[index].address,
        sell: this.shops[index].sell,
        image: this.shops[index].image,
        _id: this.shops[index]._id,
        index
      }
      this.$bvModal.show('modal-shop')
    },
    resetForm (event) {
      if (this.submitDisable) {
        event.preventDefault()
        return
      }
      this.form = {
        name: '',
        phone: '',
        address: '',
        time: '',
        sell: false,
        image: null,
        _id: ''
      }
    },
    async submitModal () {
      this.submitDisable = true
      try {
        const fd = new FormData()
        for (const key in this.form) {
          fd.append(key, this.form[key])
        }
        if (this.form._id.length === 0) {
          await this.axios.post('/shops', fd, {
            headers: {
              authorization: 'Bearer ' + this.$store.state.jwt.token
            }
          })
        } else {
          const { data } = await this.axios.patch('/shops/' + this.form._id, fd, {
            headers: {
              authorization: 'Bearer ' + this.$store.state.jwt.token
            }
          })
          this.shops[this.form.index] = {
            name: this.form.name,
            phone: this.form.phone,
            address: this.form.address,
            time: this.form.time,
            sell: this.form.sell,
            image: `${process.env.VUE_APP_API}/files/${data.result.image}`,
            _id: this.form._id
          }
          this.$refs.shopTable.refresh()
        }
        this.$bvModal.hide('modal-shop')
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: error.response.data.message
        })
      }
      this.submitDisable = false
    }
  },
  async mounted () {
    try {
      const { data } = await this.axios.get('/shops/all', {
        headers: {
          authorization: 'Bearer ' + this.$store.state.jwt.token
        }
      })
      this.shops = data.result.map(shop => {
        if (shop.image) {
          shop.image = `${process.env.VUE_APP_API}/files/${shop.image}`
        }
        return shop
      })
    } catch (error) {
      this.$swal({
        icon: 'error',
        title: '錯誤',
        text: '取得商品失敗'
      })
    }
  }
}
</script>
