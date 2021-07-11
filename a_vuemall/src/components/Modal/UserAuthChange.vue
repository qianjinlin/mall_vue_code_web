<template>
  <a-modal v-model="visible" title="权限修改" @ok="handleOk">
    <a-select
      style="width: 100%"
      :placeholder="currentType"
      @change="handleChange"
    >
      <a-select-option
        :value="item.value"
        v-for="item in option"
        :key="item.value"
        >{{ item.name }}
      </a-select-option>
    </a-select>
  </a-modal>
</template>
<script>
import * as api from "../../utils/request";
const option = [
  { value: "1", name: "普通管理员" },
  { value: "2", name: "普通用户" },
  { value: "0", name: "超级管理员" },
];
export default {
  data() {
    return {
      option,
      visible: false,
      userInfo: {},
      currentType: "",
      type: "",
    };
  },
  methods: {
    display() {
      this.visible = true;
    },
    handleOk() {
      if (this.type === "") {
        this.$message.warn("请选择需要变更的身份", 1);
        return;
      }
      if (this.type === this.userInfo.type) {
        this.visible = false;
        this.$message.warn(
          "当前用户权限已经是" + this.userInfo.typeName + "啦！"
        );
        return;
      } else {
        this.visible = false;
        const params = {
          id: this.userInfo.id,
          type: this.type,
        };
        api.updateUser(params).then((res) => {
          if (res) {
            this.$parent.getUserInfo();
            this.$message.success("更新用户身份成功");  
          }
        });

        //update
      }
    },
    handleChange(e) {
      this.type = e;
    },
    get(e) {
      this.userInfo = e;
      this.currentType = e.typeName;
      console.info(e);
    },
  },
};
</script>
