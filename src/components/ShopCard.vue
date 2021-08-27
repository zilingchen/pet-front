<template lang="pug">
b-card.shop-card.mb-2(
  :title="shop.name"
  :sub-title="shop.address"
  img-top
  :img-src="shop.image"
)
</template>

<script>
export default {
  name: 'shopCard',
  props: {
    shop: {
      type: Object,
      required: true
    }
  }
}
</script>
