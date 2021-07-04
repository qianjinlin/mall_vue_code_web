import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import cookie from './utils/cookie';
import settings from './utils/defaultSetting'
import Axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import _ from 'lodash';

Vue.prototype.this = this;

Vue.prototype._ = _;

Vue.use(ElementUI);

Vue.prototype.$axios = Axios

//设置cookie为全局变量
Vue.prototype.cookie = cookie;

Vue.prototype.settings = settings;


//使用AntDesign框架
Vue.use(antd);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  Axios,
  render: h => h(App)
}).$mount('#app')