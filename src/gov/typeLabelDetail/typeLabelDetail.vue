<template>
    <BasePage>
        <div>
            <router-view></router-view>
            <!-- HTML内容 -->
        </div>
    </BasePage>
</template>

<script>
import BasePage from '@/components/BasePage'

export default {
    components: {
        BasePage,
    }
};
</script>

<style lang="less" scoped>
@import "../../common/less/reset.less";
@import "./less/typeLabelDetail";
</style>
