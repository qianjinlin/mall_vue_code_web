<template>
  <div v-if="showPro">
    <a-input-group compact size="default">
      <a-select default-value="商品名">
        <a-select-option value="商品名"> 商品名 </a-select-option>
        <a-select-option value="商品类型"> 商品类型 </a-select-option>
      </a-select>
      <a-input-search
        style="width: 60%"
        size="default"
        @search="onSearch"
        enter-button
        placeholder="请输入商品名或者商品类型"
      />
    </a-input-group>
    <a-table
      :columns="columns"
      :data-source="data"
      bordered
      style="margin-top: 20px"
      :loading="loading"
      size="small"
    >
      <template
        v-for="col in ['name', 'age', 'address']"
        :slot="col"
        slot-scope="text, record"
      >
        <div :key="col">
          <a-input
            v-if="record.editable"
            style="margin: -5px 0"
            :value="text"
            @change="(e) => handleChange(e.target.value, record.key, col)"
          />
          <template v-else>
            {{ text }}
          </template>
        </div>
      </template>
      <template slot="operation" slot-scope="text, record">
        <div class="editable-row-operations">
          <span v-if="record.editable">
            <a @click="() => save(record.key)">Save</a>
            <a-popconfirm
              title="Sure to cancel?"
              @confirm="() => cancel(record.key)"
            >
              <a>Cancel</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a-button
              :disabled="record.key % 2 === 0"
              type="primary"
              @click="upProduct(record.key)"
              >上架</a-button
            >
            <a-button
              :disabled="record.key % 2 !== 0"
              style="margin-left: 10px"
              type="danger"
              >下架</a-button
            >
            <a-button :disabled="editkey" style="margin-left: 10px"
              >编辑</a-button
            >
          </span>
        </div>
      </template>
    </a-table>
  </div>
</template>
<script>
const columns = [
  {
    title: "商品名",
    dataIndex: "name",
    width: "25%",
    scopedSlots: { customRender: "name" },
  },
  {
    title: "商品链接",
    dataIndex: "age",
    width: "15%",
    scopedSlots: { customRender: "age" },
  },
  {
    title: "商品价格",
    dataIndex: "address",
    width: "20%",
    scopedSlots: { customRender: "address" },
  },
  {
    title: "商品类型",
    dataIndex: "type",
    width: "20%",
    scopedSlots: { customRender: "address" },
  },
  {
    title: "操作",
    dataIndex: "operation",
    scopedSlots: { customRender: "operation" },
  },
];

const data = [];
for (let i = 1; i < 100; i++) {
  data.push({
    key: i.toString(),
    name: "苹果",
    age: 32,
    address: `$ ${i} 元`,
    type: "电子成品",
  });
}
export default {
  created() {
    this.showPro = true;
  },
  data() {
    this.cacheData = data.map((item) => ({ ...item }));
    return {
      data,
      columns,
      editingKey: true,
      loading: false,
      editkey: false,
      visible: false,
      showPro: false,
    };
  },
  computed: {},
  methods: {
    handleOk() {
      this.$message.success("上架成功");
      this.visible = false;
    },
    handleCancel() {
      this.visible = false;
    },
    upProduct(key) {
      const _this = this;
      this.$confirm({
        title: "确认上架该商品吗",
        okText: "确认上架",
        cancelText: "取消",
        onOk() {
          _this.$message.success("上架成功");
        },
      });
    },
    onSearch() {
      this.loading = true;
    },
    handleChange(value, key, column) {
      const newData = [...this.data];
      const target = newData.filter((item) => key === item.key)[0];
      if (target) {
        target[column] = value;
        this.data = newData;
      }
    },
    edit(key) {
      const newData = [...this.data];
      const target = newData.filter((item) => key === item.key)[0];
      this.editingKey = key;
      if (target) {
        target.editable = true;
        this.data = newData;
      }
    },
  },
};
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>