<template>
  <div>
    <a-input-search
      placeholder="请输入用户信息"
      enter-button
      @search="onSearch"
      style="width: 60%"
    />
    <a-table
      style="margin-top: 30px"
      :columns="columns"
      :data-source="data"
      bordered
      :loading="tabLoading"
      rowKey="id"
    >
      <a slot="action" slot-scope="record" @click="getInfo(record)">修改权限</a>
    </a-table>
    <Auth ref="auth" />
  </div>
</template>
<script>
import * as api from "../utils/request";
import Auth from "./Modal/UserAuthChange.vue";
const columns = [
  {
    title: "用户名",
    dataIndex: "username",
    key: "username",
    align: "center",
    ellipsis: true,
  },
  {
    title: "身份",
    dataIndex: "typeName",
    key: "typeName",
    align: "center",
    ellipsis: true,
  },
  {
    title: "联系电话",
    dataIndex: "cellphone",
    key: "cellphone",
    align: "center",
    ellipsis: true,
  },
  {
    title: "邮箱地址",
    dataIndex: "email",
    key: "email",
    align: "center",
    ellipsis: true,
  },
  {
    title: "用户状态",
    dataIndex: "statusName",
    key: "statusName",
    align: "center",
    ellipsis: true,
  },
  {
    title: "操作",
    dataIndex: "",
    key: "x",
    scopedSlots: { customRender: "action" },
  },
];
export default {
  components: {
    Auth,
  },
  data() {
    return {
      data: [],
      columns,
      tabLoading: false,
      visible: false,
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      this.tabLoading = true;
      api.getUserInfo().then((res) => {
        if (res.data.code === 500) {
          this.$message.warn(res.data.msg);
          this.$router.push("/login");
        }
        this.data = res.data.data;
        this.tabLoading = false;
      });
    },
    getInfo(e) {
      this.$refs.auth.display();
      this.$nextTick(() => {
        this.$refs.auth.get(e);
      });
    },
    onSearch() {},
  },
};
</script>