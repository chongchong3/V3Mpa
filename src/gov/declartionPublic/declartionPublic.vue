<template>
    <BasePage>
        <router-view></router-view>
    </BasePage>
</template>

<script>
import BasePage from "@/components/BasePage";

export default {
    components: {
        BasePage
    }
};
</script>

<style lang="less" scoped>
@import "../../common/less/reset.less";
</style>
