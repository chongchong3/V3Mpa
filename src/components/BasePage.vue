<template>
    <div id="app">
        <el-container>
            <Header />
        </el-container>
        <el-container class="container-outer">
            <nav-menu />
            <el-container>
                <el-main class="flex-col">
                    <bread-crumb ref="bread" />
                    <slot></slot>
                </el-main>
                <el-footer>
                    <Footer />
                </el-footer>
            </el-container>
        </el-container>
    </div>
</template>
<script>
import "@/common/less/reset.less";
import NavMenu from "@/components/NavMenu/NavMenu";
import BreadCrumb from "@/components/Breadcrumb";
import Footer from "@/components/footer";
import Header from "@/components/header";

import "@/assets/font/iconfont.css";
export default {
    components: {
        NavMenu,
        BreadCrumb,
        Footer,
        Header
    }
};
</script>

<style lang="less" scoped>
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    // text-align: center;
    color: #2c3e50;
    position: absolute;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
}

.container-outer {
    height: calc(~"100% - 60px");
}
.el-main {
    background: #f0f2f5;
    position: relative;
}
.el-footer {
    background: #ccc;
}
.flex-col {
    display: flex;
    flex-direction: column;
}
</style>
