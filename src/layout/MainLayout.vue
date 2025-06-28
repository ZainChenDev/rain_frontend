<template>
  <div>
    <app-sidebar />
    <div>
      <app-navbar />
    </div>
  </div>
</template>

<script setup lang="ts">
import AppNavbar from './components/Navbar/AppNavbar.vue'
import AppSidebar from './components/Sidebar/AppSidebar.vue'
</script>

<style lang="scss" scoped>
.main-container {
  height: 100vh;
}

.el-header {
  display: flex;
  align-items: center;

  border-bottom: 1px solid gray;
  padding-left: 80px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  padding: 0 20px;
}

.el-aside {
  padding: 0 !important;
}

.el-main {
  padding: 0 !important;
}
</style>
