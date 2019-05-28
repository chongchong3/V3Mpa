<template>
    <div class="wrapper">
        <div class="main-content-title">企业信息查询</div>
        <div class="main-content-min-title">精准信息·企业画像</div>
        <div class="main-content-search">
            <el-autocomplete
                class="input-entName"
                v-model="companyName"
                :fetch-suggestions="querySearchAsync"
                placeholder="请输入企业名称/统一社会信用代码"
                value-key="entName"
                @select="handleSelect"
            >
                <i
                    class="el-icon-search el-input__icon"
                    slot="suffix"
                >
                </i>
            </el-autocomplete>
        </div>
    </div>
</template>

<script>
    import * as api from '@api/h5/entFile.js'
    
    export default {
        name: "entSearch",
        data() {
            return {
                companyName:'',
                companySearchList:[],
                timeout: null,
            }
        },
        methods: {
            querySearchAsync(queryString, cb) {
                const vm = this;
                api.getLikeEnt({ key: queryString }).then(res=>{

                    vm.companySearchList = res.data || [];
                    

                    clearTimeout(this.timeout);
                    vm.timeout = setTimeout(() => {
                        cb(vm.companySearchList);
                    }, 3000 * Math.random());

                });
            },
            handleSelect(item) {
                this.$router.push({ name:'entDatail', query: { company: item.entName, creditCode: item.creditCode }});
            },
        }        
        
    }
</script>

<style lang="less" scoped='scoped'>
    @import '../../less/entFile.less';
  
    .wrapper {
        background:url('../../../../assets/Stripebg@2x.png') no-repeat center/cover;
        position: relative;
        box-sizing: border-box;
        height: 100vh;
        text-align: center;
        padding:0 10px;

        .main-content{
            &-title{
                font-size: 24px;
                font-family: PingFangSC-Regular;
                margin: 37px auto 0;
                color:rgba(255, 255, 255, 1);
            }
            &-min-title{
                font-size: 16px;
                font-family: PingFangSC-Regular;
                margin: 0 auto;
                color:rgba(255, 255, 255, 1);
            }
            &-search{
                width: 100%;
                position: relative;
                margin: 34px auto;
                .input-entName {
                    -webkit-appearance:none;
                    outline:none;
                    border:0;
                    width: 100%;
                    height: 40px;
                    box-shadow: 0 2px 8px 0 rgba(0,0,0,0.15);
                    border-radius:3px;
                    box-sizing: border-box;
                    
                    color:rgba(61, 75, 102, 0.45);
                    font-size: 14px;
                    color: #666;
                    input {
                        width: 100%;height: 100%;
                        padding:5px 15px;
                    }
                }
                .el-input__icon {
                    width: 28px;
                }
            }
        }

    }
</style>