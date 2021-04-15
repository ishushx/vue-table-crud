<template>
  <el-container>
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="20vh">Aside</el-aside>
      <el-main>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>首页</el-breadcrumb-item>
          <el-breadcrumb-item>用户管理</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/home">用户列表</a></el-breadcrumb-item>
        </el-breadcrumb>
        <user-table></user-table>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import UserTable from "@/components/UserTable.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
    UserTable,
  },
};
</script>

<style scoped>
.table {
  height: 100vh;
}
.el-aside {
  background-color: #fff;
  height: 100%;
}
.el-header {
  background-color: #324057;
  border-radius: 5px 5px 0 0;
}
.el-main {
  margin: 10px;
  padding: 10px;
}
.el-container {
  height: 100%;
}
</style>
