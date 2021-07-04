<template>
  <a-layout
    id="components-layout-demo-side"
    style="min-height: 105vh"
    v-if="layoutShow"
  >
    <a-layout-sider v-model="collapsed" collapsible>
      <div class="logo">
        <img src="../images/logo.svg" height="32" width="45" />
        <a v-show="this.collapsed === true ? false : true" @click="refresh">{{
          title
        }}</a>
        <!-- <img src="../images/name.svg" height="16" style="color:white"/> -->
      </div>
      <a-menu :theme="theme" :default-selected-keys="['1']" mode="inline">
        <a-menu-item
          :key="menu.key"
          v-for="menu in menulist"
          @click="addTab(menu)"
        >
          <a-icon :type="menu.icon" />
          <span>{{ menu.title }}</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <label
          id="locate"
          style="margin-left: 1200px; position: fixed; transform: none"
        >
          <a-dropdown>
            <a-avatar :size="35" icon="user" id="avatar" :src="imgSrc" />
            <a-menu slot="overlay">
              <a-menu-item>
                <a-upload @change="upload()">
                  <a-icon type="user" style="margin-right: 10px" />上传头像
                </a-upload>
              </a-menu-item>
              <a-menu-item>
                <a @click="setting">
                  <a-icon type="setting" style="margin-right: 10px" />
                  个人设置</a
                >
              </a-menu-item>
              <a-menu-divider />
              <a-menu-item>
                <a @click="exit"
                  ><a-icon
                    type="poweroff"
                    style="margin-right: 10px"
                  />退出登录</a
                >
              </a-menu-item>
            </a-menu>
          </a-dropdown>
          <a>
            <label id="Namelocation">{{ currentUser }}</label>
          </a>
        </label>
      </a-layout-header>
      <a-layout-content style="margin: 0 16px">
        <a-tabs
          :defaultActiveKey="activeKey"
          :activeKey="activeKey"
          :tab-position="tabPosition"
          @change="callback"
        >
          <a-tab-pane
            v-for="pane in panes"
            :key="pane.key"
            :tab="pane.title"
            :closable="pane.closable"
          >
          </a-tab-pane>
        </a-tabs>
        <div
          :style="{ padding: '24px', background: '#fff', minHeight: '360px' }"
        >
          <transition-group name="el-fade-in-linear">
            <setttings v-if="IsSetting" :key="0"></setttings>
            <productManage v-if="currentKey === 2" :key="2"></productManage>
            <statistic v-if="currentKey === 1" :key="1"></statistic>
            <user-info-setting ref="user" :key="3"></user-info-setting>
          </transition-group>
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        ©2021 Created by QianJinLin
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
import * as api from "../utils/request";
import setttings from "./Base/UserSetting.vue";
import productManage from "./menu/productManage.vue";
import statistic from "./Statistic/Statistic.vue";
import userInfoSetting from "./Base/UserInfoSetting.vue";
import UserInfoSetting from "./Base/UserInfoSetting.vue";
export default {
  components: {
    setttings,
    productManage,
    statistic,
    UserInfoSetting,
  },
  data() {
    const panes = [{ title: "控制台", key: 1, icon: "" }];
    const menulist = [
      { key: 1, title: "控制台", icon: "pie-chart" },
      { key: 2, title: "商品管理", icon: "account-book" },
      { key: 3, title: "用户管理", icon: "team" },
      { key: 4, title: "菜单3", icon: "sync" },
      { key: 5, title: "菜单4", icon: "solution" },
      { key: 6, title: "菜单5", icon: "wifi" },
      { key: 7, title: "菜单6", icon: "laptop" },
      { key: 8, title: "菜单7", icon: "global" },
    ];
    return {
      layoutShow: true,
      collapsed: false,
      title: this.settings.logoName,
      theme: this.settings.theme,
      currentUser: "",
      IsSetting: false,
      activeKey: 1,
      panes,
      menulist,
      tabPosition: "top",
      existKey: [],
      keyArray: [],
      IsUpload: false,
      currentKey: 0,
      imgSrc: "",
      userKey: 0,
    };
  },
  created() {
    if (this.cookie.getCookie("username") === null) {
      this.layoutShow = false;
      this.$message.error("用户未登录,该页面无法访问");
      this.$warning({
        title: "用户未登录,该页面无法访问,请登录!",
      });
    }
    this.currentUser = this.cookie.getCookie("username");
  },
  mounted() {
    this.currentKey = 1;
  },

  methods: {
    closeAll() {
      this.panes.splice(1, this.panes.length);
      this.activeKey = 1;
    },
    callback(key) {
      this.activeKey = key;
      this.currentKey = key;
    },
    addTab(e) {
      this.activeKey = e.key;
      this.currentKey = e.key;
      this.existKey = this.panes.filter((item) => item.key === e.key);
      if (this.existKey.length === 0) {
        this.panes.push(e);
        this.activeKey = e.key;
      } else {
        return;
      }
    },
    setting() {
      this.$refs.user.display();
    },
    refresh() {
      location.reload();
    },
    onSearch() {},
    clickA() {
      //alert("as");
    },
    exit() {
      if (this.cookie.getCookie("token")) {
        api
          .LoginOut("loginOut", {
            token: this.cookie.getCookie("token"),
          })
          .then((res) => {
            if (res.data.flag) {
              this.cookie.clearCookie("username");
              this.cookie.clearCookie("password");
              this.cookie.clearCookie("token");
              this.$message.success("退出登录成功");
              this.$router.push({ path: "/" });
            } else {
              this.$router.push("/");
            }
          });
      }
    },
  },
};
</script>

<style scoped>
#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
}
/* #locate {
  margin-left: 1200px;
  position: fixed;
  transform: none;
} */
#logoApp {
  color: white;
  font-weight: bold;
  height: 1px;
  width: auto;
  font-size: 25px;
}
#Namelocation {
  margin-left: 8px;
  font-weight: bold;
}
</style>