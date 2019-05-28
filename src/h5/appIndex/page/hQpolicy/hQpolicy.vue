<template>
    <div class="wrapper">
        <van-cell title="政策文库" is-link @click="routerTo('policyLibrary')" />
        <van-cell title="项目申报" is-link @click="routerTo('declareItem')" />
        <van-cell title="申报公示" is-link @click="routerTo('declaration')" />
    </div>
</template>
<script>
export default{
    methods: {
        routerTo(pathname){
            this.$router.push({name: pathname});
        }
    }
}
</script>
<style lang="less" scoped>
// less已使用px2rem，直接使用375适配的px就行
    .wrapper{
        height: 100vh;      
        padding:15px 20px 0rem;
        background-color:#F2F4F7;        
        .van-cell {
            height: 1.5rem;
            line-height: 1.05rem;            
            margin: 5px 0;
            box-shadow: 0 1px 4px 2px hsla(0,0%,80%,.5);
            font-size: 16px;
        }
        .van-cell__left-icon, .van-cell__right-icon {           
            line-height: 1.05rem;
            font-size: 16px;
            font-weight: bold;        
            color: #ccc;
        }
    }
</style>