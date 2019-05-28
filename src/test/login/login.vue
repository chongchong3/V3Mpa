<template>
    <div id="app">
        <el-container>
            <Header />
        </el-container>
        <el-container class="container-outer">
            <el-container>
                <el-main>1111</el-main>
                <el-footer>
                    <Footer />
                </el-footer>
            </el-container>
        </el-container>
        <el-button>默认按钮</el-button>
        <el-button type="primary" @click="login">主要按钮</el-button>
        <el-button type="success" @click="findByPage">成功按钮</el-button>
        <el-button type="info">信息按钮</el-button>
        <el-button type="warning">警告按钮</el-button>
        <el-button type="danger">危险按钮</el-button>
    </div>
</template>
<script>
import "../../common/reset.less";
import "./less/login.less";
// import Nav from "@/components/nav.vue";
import Footer from "@/components/footer.vue";
import Header from "@/components/header.vue";
import { getLocation } from "../../common/utils/url.js";

// setLocalstorage权限, 需要删除
import './mock.js'

export default {
    data() {
        return {
            routes: [],
            checkedRouteId: "-1",
        };
    },
    created() {
        this.setRoutes();
    },

    methods: {
        setRoutes() {
            this.$store.commit(
                "setPermissionFromStorage"
            );

            this.routes = this.$store.getters.getRoutes;

            this.getLocalRoute(this.routes, getLocation().pathname.slice(1, -1)+'.html');
        },

        getLocalRoute(routes, path) {
            for (let i = 0; i < routes.length; i++) {
                if (routes[i].url === path) {
                    this.checkedRouteId = routes[i].id + '';
                }else if(routes[i].child && routes[i].child.length){
                    this.getLocalRoute(routes[i].child, path)
                }
            }
        }
    },
    components: {
        // Nav,
        Footer,
        Header
    }
};
</script>

<style lang="less">
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
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
// .el-aside{
//   background: #f2f7ff;
// }

.el-footer {
    background: #ccc;
}
</style>
