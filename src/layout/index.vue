<template>
  <el-container class="main-container">
    <el-header>
      <Header />
    </el-header>
    <el-container>
      <Aside />
      <el-main>
        <RouterView />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import Header from './components/Header.vue'
import Aside from './components/Aside.vue'
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
