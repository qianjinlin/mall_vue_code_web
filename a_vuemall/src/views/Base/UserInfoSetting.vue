<template>
  <div>
    <a-drawer
      title="个人基本信息设置"
      placement="right"
      :visible="visible"
      :closable="false"
      :after-visible-change="afterVisibleChange"
      :maskClosable="false"
      :mask="true"
      width="600"
    >
      <slot :cKey="9" />
      <a-form-model
        :model="form"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="当前登录用户">
          <a-input v-model="form.name" :disabled="true" />
        </a-form-model-item>
        <a-form-model-item label="角色权限">
          <a-select v-model="form.region" :disabled="true">
            <a-select-option value="admin">管理员</a-select-option>
            <a-select-option value="user"> 普通用户 </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="个人介绍">
          <a-input v-model="form.desc" type="textarea" />
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" @click="onSubmit"> 修改 </a-button>
          <a-button style="margin-left: 10px" @click="handleDrawerCancel">
            取消
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </a-drawer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        name: "admin",
        region: "admin",
        date1: undefined,
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        closable: false,
        showMask: true,
      },
      cKey: 0, //向父组件传值
    };
  },
  methods: {
    afterVisibleChange(val) {
      console.log("visible", val);
      if (!val) {
        this.$message.success("个人信息修改成功");
      }
    },
    handleDrawerCancel() {
      this.visible = false;
    },
    onSubmit() {
      console.log(this.form);
      this.visible = false;
    },
    display() {
      this.visible = true;
    },
  },
};
</script>