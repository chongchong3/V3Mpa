<template>
 <div class="no_massage">
	 <div class="massage_img"></div>
     <div class="massage_tips">
         暂无数据
         <br/>
         Have no Data
     </div>
        </div>
</template>
<script>

</script>
<style lang="less" scoped>

    .no_massage{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 50px;
        height: 350px;
    }
    .massage_img{
        width: 328px;
        height: 270px;
        background:url("~@/assets/es-sfss.png") center/cover no-repeat;
        background-size: 328px 270px;
        margin-right: 60px;
    }
    .massage_tips{
        /*margin-top: 105px;*/
        font-size: 18px;
        color: #999;
        line-height: 39px;
    }
</style>

