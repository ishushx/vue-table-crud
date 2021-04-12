<template>
  <div class="table">
    <user-table></user-table>
  </div>
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
</style>
