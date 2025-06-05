<template>
    <div class="header-content">
        <img src="@/assets/images/logo.png" alt="Logo" class="header-logo" />
        <h1 class="header-title">草畜平衡</h1>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.header-content {
    display: flex;
    align-items: center;

    padding-left: 80px;
    height: 100%;
    gap: 12px;

    .header-logo {
        height: 36px;
        width: auto;
        object-fit: contain;
    }

    .header-title {
        margin: 0;
        font-size: 20px;
        font-weight: 600;
        color: #333;
        letter-spacing: 1px;
    }
}
</style>