<template>
    <Nav :routes="routes" :checkedRouteId="checkedRouteId" />
</template>

<script>
import Nav from "./nav";
import { getLocation, getUrlParam } from "@/common/utils/index";
export default {
    data() {
        return {
            routes: [],
            checkedRouteId: "-1"
        };
    },
    components: {
        Nav
    },
    created() {
        this.setRoutes();
    },
    methods: {
        setRoutes() {
            this.$store.commit("setPermissionFromStorage");

            this.routes = this.$store.getters.getRoutes;

            let routePath = this.getLocalRoute(
                this.routes,
                getLocation().lastPathname
            );

            this.$store.commit('setRoutePath', routePath);
        },

        /**
         * @desc 获取当前路由，返回当前路由的PathArr，最后一个是当前的route
         * @param { routes } 权限树
         * @param { pathArr } 不用传，是路由的path路径
         */
        getLocalRoute(routes, path, pathArr = []) {
            for (let i = 0; i < routes.length; i++) {
                let { child, ...route } = routes[i];

                if(this.checkedRouteId !== '-1'){
                    return pathArr;
                }

                if (route.url === path) {

                    // url === path的时候unshift并结束回调
                    pathArr.unshift(route);
                    this.checkedRouteId = route.id + ""
                    return pathArr;
                } else if (child && child.length) {

                    // 有child的时候回调，当回调结束的时候判断是否选中，选中unshift
                    this.getLocalRoute(child, path, pathArr);
                    this.checkedRouteId !== '-1' && pathArr.unshift(route)
                }
            }

            return pathArr;
        }
    }
};
</script>

