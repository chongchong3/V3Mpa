<template>
    <!-- 当前路由 -->
    <el-menu-item :index="route.id + ''" v-if="route.type == 1 && route.url">
         <i v-if='route.class' class="route.class"></i><!-- 根据class 来判断是否显示导航小图标-->
                            {{ route.name }}
    </el-menu-item>

    <el-submenu :index="route.id  + ''" v-else-if="route.type == 1" :key="route.name + route.url">
        <template slot="title">
            <i class="el-icon-location" :class="route.class"></i>
            <span>{{ route.name }}</span>
        </template>

        <!-- 子路由 -->
        <el-menu-item-group>

            <navitem  v-for="routeChild in route.child" :route="routeChild" :key="routeChild.name + routeChild.url"></navitem>

        </el-menu-item-group>
    </el-submenu>
</template>

<script>
/**
 * menuItem的递归组件，递归出menu
 * @param route 路由的数组
 *
 */
export default {
    name: 'navitem',
    props: {
        route: {
            type: Object,
            required: true
        }
    },
}
</script>

<style lang="less" scoped>


</style>
