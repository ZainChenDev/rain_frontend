<template>
    <el-aside width="isCollapse">
        <el-menu class="asideMenu" default-active="1" :collapse="isCollapse" router>
            <el-menu-item index="/rangeland-block" route="/rangeland-block">
                <el-icon size="30">
                    <PiCloverBold />
                </el-icon>
                <template #title>
                    草原地块
                </template>
            </el-menu-item>

            <el-menu-item index="/camera" route="/camera">
                <el-icon size="30">
                    <PiVideoCameraBold />
                </el-icon>
                <template #title>
                    摄像头
                </template>
            </el-menu-item>

            <el-menu-item index="/detection" route="/detection">
                <el-icon size="30">
                    <PiTagBold />
                </el-icon>
                <template #title>
                    实时检测
                </template>

            </el-menu-item>

            <el-menu-item index="/map" route="/map">
                <el-icon size="30">
                    <PiMapPinLineBold />
                </el-icon>
                <template #title>
                    地图
                </template>
            </el-menu-item>
        </el-menu>
    </el-aside>
    <div class="arrowBox" @click="isCollapse = !isCollapse">
        <el-icon class="folding" size="15" color="#000">
            <ArrowRightBold v-if="isCollapse" />
            <ArrowLeftBold v-if="!isCollapse" />
        </el-icon>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { PiCloverBold, PiVideoCameraBold, PiTagBold, PiMapPinLineBold } from "vue-icons-plus/pi";

const isCollapse = ref(true)
</script>

<style lang="scss" scoped>
.asideMenu:not(.el-menu--collapse) {
    width: 200px;
}

.arrowBox {
    display: flex;
    align-items: center;

    &:hover {
        background-color: rgb(163, 206, 255);
    }
}
</style>