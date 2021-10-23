<template lang="pug">
b-container#home
  b-row
    b-col.mt-5.d-flex.justify-content-around(cols='12')
      //- b-btn.ml-4(variant="light" type="button" @click="show(1)")
      //-   font-awesome-icon(:icon='["fas", "hospital"]' size='2x')
      //-   | 動物醫院
      //- b-btn.ml-4(variant="light" type="button" @click="show(2)")
      //-   font-awesome-icon(:icon='["fas", "bath"]' size='2x')
      //-   | 寵物美容
      //- b-btn.ml-4(variant="light" type="button" @click="show(3)")
      //-   font-awesome-icon(:icon='["fas", "store"]' size='2x')
      //-   | 寵物用品店
    hr.m-2
    b-col(cols='12')
      b-carousel#carousel-1(v-model='slide' :interval='4000' controls indicators background='#ababab' img-width='1024' img-height='300' style='text-shadow: 1px 1px 2px #333;' @sliding-start='onSlideStart' @sliding-end='onSlideEnd')
        b-carousel-slide(img-src='../assets/trilagy.jpeg')
        b-carousel-slide(img-src='../assets/white.jpeg')
        b-carousel-slide(img-src='../assets/purina.jpeg')
      br.m-2
      br.m-2
      h3.mb-4.text-center  - 寵物用品店 -
    //- b-col(cols="12" md="6" lg="3" v-for="product in products" :key="product._id")
    //-   router-link(:to="'/product/'+product._id")
    //-     ProductCard(:product="product")
    b-col(cols="12" md="6" lg="3" v-for="shop in shops" :key="shop._id")
      router-link(:to="'/shop/'+shop._id")
        ShopCard(:shop="shop")
        br.m-6
        br.m-6
        br.m-6
        br.m-6
    b-col.mt-6.text-center#footer(cols="12")
      p
      p Copyright &copy; 2021 Ziling Chen
      p 所有圖片皆來自於網路，僅做為學習用途。
</template>
<script>
import ProductCard from '@/components/ProductCard.vue'
import ShopCard from '@/components/ShopCard.vue'
import '../style/app.stylus'

export default {
  // data () {
  //   return {
  //     slide: 0,
  //     sliding: null
  //   }
  // },
  name: 'Home',
  data () {
    return {
      // displayText: ['全部', '醫院', '美容院', '商店'],
      // display: 0,
      products: [],
      shops: [],
      slide: 0,
      sliding: null
    }
  },
  components: {
    ProductCard,
    ShopCard
  },
  methods: {
    show (value) {
      this.display = value
    },
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
    }
  },
  async mounted () {
    try {
      const { data } = await this.axios.get('/shops')
      this.shops = data.result.map(shop => {
        if (shop.image) {
          shop.image = `${process.env.VUE_APP_API}/files/${shop.image}`
        }
        return shop
      })
      // async mounted () {
      //   try {
      //     const { data } = await this.axios.get('/products')
      //     this.products = data.result.map(product => {
      //       if (product.image) {
      //         product.image = `${process.env.VUE_APP_API}/files/${product.image}`
      //       }
      //       return product
      //     })
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
