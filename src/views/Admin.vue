<template lang="pug">
b-container#admin
  b-row
    b-col.mt-5.d-flex.justify-content-end(cols="12")
      b-btn.ml-2(variant="outline-primary" to="/admin/products") 商品管理
      b-btn.ml-2(variant="outline-primary" to="/admin/orders") 訂單管理
      b-btn.ml-2(variant="outline-primary" to="/admin/shops") 店家管理
    hr
    b-col(cols="12")
      router-view
</template>
