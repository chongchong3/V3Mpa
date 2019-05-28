<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item
                v-for="path in routePaths"
                :key="path._id"
                :to="path"
                >{{ path.name }}</el-breadcrumb-item
            >
        </el-breadcrumb>
    </div>
</template>

<script>
export default {
    data() {
        return {
            routePaths: []
        };
    },
    created() {
        let paths = this.$store.getters.getRoutePath;
        this.routePaths = paths.map(path => ({
            _id: path.id,
            path: `/${path.url}`,
            name: path.name
        }));
    }
};
</script>
<style lang="less" scoped>
.el-breadcrumb{
    margin-bottom: 20px;
}
</style>

