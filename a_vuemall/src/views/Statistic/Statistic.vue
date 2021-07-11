<template>
  <div id="acc">
    <a-row :gutter="16">
      <a-col :span="8">
        <a-card
          title="当前在线用户数"
          :bordered="true"
          :headStyle="headStyle"
          :hoverable="true"
        >
          <h1>1234</h1>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card
          title="总用户数"
          :bordered="true"
          :headStyle="headStyle"
          :hoverable="true"
        >
          <h1>1234</h1>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card
          title="当前会员数"
          :bordered="true"
          :headStyle="headStyle"
          :hoverable="true"
        >
          <h1>1234</h1>
        </a-card>
      </a-col>
    </a-row>
    <UserManage style="margin-top: 20px"></UserManage>
  </div>
</template>
<script>
import UserManage from "../../components/UserManage.vue";
export default {
  components: {
    UserManage,
  },
  data() {
    return {
      headStyle: {},
    };
  },
};
</script>


<style scoped>
.acc {
  padding: 20px;
}
</style>