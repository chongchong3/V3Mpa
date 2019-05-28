<template>
    <el-aside>
        <el-row class="tac">
            <el-col :span="24">
                <el-menu
                    :default-active="checkedRouteId"
                    class="el-menu-vertical-demo"
                    @select="handleSelect"
                    unique-opened
                >
                    <!-- 第一层路由 -->
                    <nav-item
                        v-for="routeChild in routes"
                        :route="routeChild"
                        :key="routeChild.name + routeChild.url"
                    ></nav-item>
                </el-menu>
            </el-col>
        </el-row>
    </el-aside>
</template>

<script>
import navItem from "./navItem.vue";
import { gotoBaseURL } from "@/common/utils/index";
export default {
    props: {
        routes: {
            type: Array,
            required: true
        },
        checkedRouteId: {
            type: String,
            required: true
        }
    },
    components: {
        navItem
    },
    methods: {
        handleSelect(key, keyPath) {
            let route = this.getPagePath(keyPath, this.routes);

            location.href= `${location.origin}/${localStorage.getItem('baseUrl')}/${route.url}`
        },

        getPagePath(keyPath, routes) {
            let key = keyPath.shift();
            let route = routes.find(route => route.id == key);
            if (keyPath.length === 0) {
                return route;
            }
            return this.getPagePath(keyPath, route.child);
        }
    }
};
</script>
<style lang="less">
.el-menu {
    border-right: none;
    text-align: left;
}
.container-outer .el-aside {
    background: #fff;
    border-right: solid 1px #e6e6e6;
    width: 200px !important;
    overflow-x: hidden;
}
.el-submenu__title{
    height: 40px !important;
    line-height: 40px !important;
}
.el-menu-item{
    height: 40px !important;
    line-height: 40px !important;
}
.el-menu-item-group__title{
    padding:0px !important;
}
</style>


