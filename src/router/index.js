import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '寵物網'
    }
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: () =>
      import(/* webpackChunkName: 'product' */ '../views/Product.vue'),
    meta: {
      title: '商品'
    }
  },
  {
    path: '/shop/:id',
    name: 'Shop',
    component: () =>
      import(/* webpackChunkName: 'product' */ '../views/Shop.vue'),
    meta: {
      title: '店家'
    }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import(/* webpackChunkName: 'cart' */ '../views/Cart.vue'),
    meta: {
      title: '購物車',
      login: true
    }
  },
  {
    path: '/member',
    name: 'Member',
    component: () =>
      import(/* webpackChunkName: 'cart' */ '../views/Member.vue'),
    meta: {
      title: '帳戶',
      login: true
    }
  },
  {
    path: '/orders',
    name: 'Orders',
    component: () =>
      import(/* webpackChunkName: 'orders' */ '../views/Orders.vue'),
    meta: {
      title: '訂單',
      login: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () =>
      import(/* webpackChunkName: 'register' */ '../views/Register.vue'),
    meta: {
      title: '註冊'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: 'login' */ '../views/Login.vue'),
    meta: {
      title: '登入'
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () =>
      import(/* webpackChunkName: 'admin' */ '../views/Admin.vue'),
    children: [
      {
        path: '',
        name: 'AdminHome',
        component: () =>
          import(/* webpackChunkName: 'admin' */ '../views/AdminHome.vue'),
        meta: {
          login: true,
          admin: true,
          title: '管理 | 寵物網'
        }
      },
      {
        path: 'products',
        name: 'AdminProducts',
        component: () =>
          import(/* webpackChunkName: 'admin' */ '../views/AdminProducts.vue'),
        meta: {
          login: true,
          admin: true,
          title: '商品管理 | 寵物網'
        }
      },
      {
        path: 'orders',
        name: 'AdminOrders',
        component: () =>
          import(/* webpackChunkName: 'admin' */ '../views/AdminOrders.vue'),
        meta: {
          login: true,
          admin: true,
          title: '訂單管理 | 寵物網'
        }
      },
      {
        path: 'shops',
        name: 'AdminShops',
        component: () =>
          import(/* webpackChunkName: 'admin' */ '../views/AdminShops.vue'),
        meta: {
          login: true,
          admin: true,
          title: '店家管理 | 寵物網'
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.login && store.state.user.account.length === 0) {
    next('/login')
  } else if (to.meta.admin && store.state.user.role !== 1) {
    next('/')
  } else {
    next()
  }
})

router.afterEach((to, from) => {
  document.title = to.meta.title
})

export default router
