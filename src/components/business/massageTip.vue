<template>
 <div class="no_massage">
			<div class="massage_img"></div>
			<div class="massage_tips">
			暂无数据
			   </br>
			Have no Message
			</div>
        </div>
</template>
<script>
export default {

}
</script>
<style lang="less" scoped>

.no_massage{
    display: flex;
    justify-content: center;
	    margin-top: 50px;
}
.massage_img{
    width: 328px;
    height: 270px;
    background:url("~@/assets/es-sfss.png") center/cover;
    background-size: 328px 270px;
    margin-right: 60px;
	}
	.massage_tips{
	    margin-top: 105px;
    font-size: 18px;
    color: #999;
    line-height: 39px;
	}
</style>

