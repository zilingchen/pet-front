<template lang="pug">
b-container#shop
  b-row
    b-col.mt-5(cols="12")
      h3.mb-4.text-center  - 寵物用品 -
    b-col(cols="12" md="6" lg="3" v-for="product in products" :key="product._id")
        router-link(:to="'/product/'+product._id")
          ProductCard(:product="product")
    b-col.mt-5(cols="12")
    b-col.mt-5(cols="12")
    b-col.mt-5(cols="12")
    b-col(cols="3")
      h3 資訊
    b-col(cols="5")
      h5 地址
      p {{ address }}
      br
      h5 聯絡電話
      p {{ phone }}
    b-col(cols="3")
      h5 營業時間
      p {{ time }}
</template>

<script>
import ProductCard from '@/components/ProductCard.vue'
import '../style/app.stylus'

export default {
  name: 'Shop',
  data () {
    return {
      name: '',
      phone: '',
      address: '',
      image: '',
      time: '',
      sell: true,
      amount: 0,
      products: []
    }
  },
  computed: {
    amountstate () {
      return this.amount === 0 ? null : this.amount > 0
    }
  },
  components: {
    ProductCard
  },
  methods: {
    async addcart () {
      if (!this.amountstate) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '請輸入正確數量'
        })
        return
      }

      if (this.$store.state.jwt.token.length === 0) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '請先登入'
        })
        return
      }

      try {
        await this.axios.post('/users/cart', { shop: this.$route.params.id, amount: this.amount }, {
          headers: {
            authorization: 'Bearer ' + this.$store.state.jwt.token
          }
        })
        this.$swal({
          icon: 'success',
          title: '成功',
          text: '成功購物車'
        })
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '加入購物車失敗'
        })
      }
    }
  },
  async mounted () {
    try {
      const { data: a } = await this.axios.get('/shops/' + this.$route.params.id)
      this.name = a.result.name
      this.phone = a.result.phone
      this.address = a.result.address
      this.time = a.result.time
      this.image = `${process.env.VUE_APP_API}/files/${a.result.image}`
      this.sell = a.result.sell
      document.title = `${this.name} | 寵物網`
      const { data: b } = await this.axios.get('/products')
      this.products = b.result.map(product => {
        if (product.image) {
          product.image = `${process.env.VUE_APP_API}/files/${product.image}`
        }
        return product
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
