<template>
  <div>
    <el-button type="primary" @click="handAdd()"> 新增</el-button>
    <el-table :data="userList" border stripe="" style="width: 70%">
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
    <el-dialog title="用户信息" :visible.sync="viewDialogVisible" width="width">
      <el-form :model="userinfo">
        <el-form-item label="用户名">
          <el-input v-model="userinfo.username" readonly></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="userinfo.email" readonly> </el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="userinfo.mobile" readonly></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!--编辑用户信息 dialog -->
    <el-dialog
      title="编辑用户信息"
      :visible.sync="editDialogVisible"
      width="width"
    >
      <el-form :model="userinfo">
        <el-form-item label="用户名">
          <el-input v-model="userinfo.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="userinfo.email"> </el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="userinfo.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateUserDetail()">确 定</el-button>
      </div>
    </el-dialog>

    <!--添加用户 dialog -->
    <el-dialog title="新增用户" :visible.sync="addDialogVisible" width="width">
      <el-form :model="newUser">
        <el-form-item label="用户名">
          <el-input v-model="newUser.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="newUser.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="newUser.email"> </el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="newUser.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "UserTable",
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
      this.viewDialogVisible = true;
    },
    handleEdit(row) {
      this.getUserInfo(row);
      this.editDialogVisible = true;
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
      this.addDialogVisible = true;
    },
    async addUser() {
      let res = await this.$api.user.addUser(this.newUser);
      this.getUserList();
      this.addDialogVisible = false;
    },
    async updateUserDetail() {
      let {
        data: { data: res },
      } = await this.$api.user.updateUserDetail(this.userinfo.id, {
        email: this.userinfo.email,
        mobile: this.userinfo.mobile,
      });

      this.editDialogVisible = false;
      this.getUserList();
    },
  },
};
</script>

<style></style>
