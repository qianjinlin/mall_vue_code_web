import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Base/UserLogin.vue'
import PageNotFound from '../views/Exception/404.vue';
import nProgress from 'nprogress';
import 'nprogress/nprogress.css'
import Cookie from '../utils/cookie.js';
import {
  message
} from 'ant-design-vue';
Vue.use(VueRouter)

const routes = [{
    path: '/login',
    name: 'UserLogin',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/404',
    name: '404',
    component: PageNotFound
  },
]


const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  nProgress.start();
  nProgress.set(0.8);
  if (to.matched.length === 0) {
    next('/404');
  } else {
    next();
  }
  if (to.path === '/login') {
    next();
  }
  if (to.path === '/') return next('login');
  if (to.meta.requireAuth) {
    console.info(Cookie.getCookie('username'));
    if (Cookie.getCookie('username') !== null) {
      next();
    } else if (Cookie.getCookie('username') === null) {
      message.warn("用户验证信息登录过期,请重新登录");
      nProgress.start();
      next('/login');
    } else {
      next('/login');
    }
  }
})

router.afterEach(transition => {
  nProgress.done();
});


export default router