<template>
  <!--添加用户 dialog -->
  <el-dialog
    :title="dialogTitle"
    :visible.sync="DialogVisible"
    width="width"
    @close="closeDialog"
  >
    <el-form :model="userdata" ref="From">
      <el-form-item label="用户名">
        <el-input
          v-model="userdata.username"
          :readonly="type == 'view'"
          :disabled="type == 'edit'"
        ></el-input>
      </el-form-item>
      <el-form-item v-if="type === 'add'" label="密码">
        <el-input v-model="userdata.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="userdata.email" :readonly="type == 'view'">
        </el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input
          v-model="userdata.mobile"
          :readonly="type == 'view'"
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="handCancel()">取 消</el-button>
      <el-button type="primary" @click="handComfirm()">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: "UserDialog",
  data() {
    return {
      selfUserdata: {},
      DialogVisible: false,
    };
  },
  props: {
    dialogTitle: String,
    type: String,
    userdata: Object,
  },
  methods: {
    handCancel() {
      this.$emit("close");
      this.DialogVisible = false;
    },
    handComfirm() {
      console.log(this.userdata);
      this.$emit("update:userdata", this.userdata);
      this.$emit("confirm", this.userdata);
    },
    closeDialog() {
      this.$emit("close");
      this.DialogVisible = false;
    },
  },
};
</script>

<style></style>
