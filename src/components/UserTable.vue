<template>
  <div>
    <span>用户列表</span>
    <div>
      <el-button type="primary" @click="handAdd()" class="addUser">
        新增</el-button
      >
    </div>
    <el-table :data="userList" border stripe="">
      <el-table-column prop="username" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"> </el-table-column>
      <el-table-column prop="mobile" label="电话"> </el-table-column>
      <el-table-column prop="role_name" label="角色"> </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="info" @click="handleView(scope.row)"
            >查看</el-button
          >
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[5, 10, 20, 100]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagetotal"
    >
    </el-pagination>

    <!--查看用户信息 dialog -->
    <user-dialog
      dialogTitle="查看用户信息"
      type="view"
      :userdata="userinfo"
      ref="viewUserDialog"
      @close="handClose()"
    ></user-dialog>

    <!--编辑用户信息 dialog userinfo -->
    <user-dialog
      dialogTitle="编辑用户信息"
      type="edit"
      :userdata="userinfo"
      ref="editUserDialog"
      @confirm="updateUserDetail()"
      @close="handClose()"
    ></user-dialog>

    <!--添加用户 dialog -->
    <user-dialog
      dialogTitle="添加用户"
      type="add"
      :userdata.sync="newUser"
      ref="addUserDialog"
      @confirm="addUser()"
      @close="handClose()"
    ></user-dialog>
  </div>
</template>

<script>
import UserDialog from "./Dialog/userDIalog";

export default {
  name: "UserTable",
  components: {
    UserDialog,
  },
  data() {
    return {
      userList: [],
      query: "",
      pagenum: 1,
      pagesize: 5,
      pagetotal: 0,
      addDialogVisible: false,
      editDialogVisible: false,
      viewDialogVisible: false,
      userinfo: {},
      newUser: {},
    };
  },
  created() {
    this.$store.dispatch("login");
  },
  mounted() {
    let that = this;
    setTimeout(function() {
      that.getUserList();
    }, 2000);
  },
  methods: {
    handleSizeChange(val) {
      this.pagesize = val;
      this.getUserList();
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      this.getUserList();
    },
    async getUserList() {
      let {
        data: { data: res },
      } = await this.$api.user.userList({
        query: this.query,
        pagenum: this.pagenum,
        pagesize: this.pagesize,
      });
      console.log(res);
      this.userList = res.users;
      this.pagetotal = res.total;
    },
    async getUserInfo(row) {
      let {
        data: { data: res },
      } = await this.$api.user.userDetail(row.id);
      this.userinfo = res;
      console.log(res);
    },

    handleView(row) {
      this.getUserInfo(row);
      this.$refs.viewUserDialog.DialogVisible = true;
    },
    async handleEdit(row) {
      await this.getUserInfo(row);
      this.$refs.editUserDialog.DialogVisible = true;
    },
    async handleDelete(id) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api.user.deleteUser(id);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.getUserList();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handAdd() {
      this.$refs.addUserDialog.DialogVisible = true;
    },
    async addUser() {
      let res = await this.$api.user.addUser(this.newUser);
      this.$message({
        message: "新增用户成功",
        type: "success",
      });
      this.getUserList();
      this.$refs.addUserDialog.DialogVisible = false;
    },
    async updateUserDetail() {
      let {
        data: { data: res },
      } = await this.$api.user.updateUserDetail(this.userinfo.id, {
        email: this.userinfo.email,
        mobile: this.userinfo.mobile,
      });
      this.$message({
        message: "更新用户成功",
        type: "success",
      });
      this.editDialogVisible = false;
      this.getUserList();
    },
    handClose() {
      this.newUser = {};
      this.userinfo = {};
    },
  },
};
</script>

<style>
.addUser {
  float: left;
  margin: 10px;
}
.el-table {
  margin: 10px;
}
</style>
