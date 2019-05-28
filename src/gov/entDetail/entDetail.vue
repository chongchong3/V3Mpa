<template>
    <BasePage>
        <div class="container-1200">
            <div class="ys-back-btn" @click="goBack"></div>
            <el-row>
                <el-col :span="24" class="topbox">
                    <div class="leftbox">
                        <div class="companybox">
                            <p class="name">
                                <i class="iconfont icon-qiyetubiaox"></i>
                                {{ toHtmlStr(ent1.entName, "") }}
                            </p>
                            <p class="address companyInfo">
                                <span>法定代表人：{{ ent1.frName }}</span>
                                <span>注册资本：{{ ent1.regCap }}万元</span>
                                <span v-if="ent2.town">所属乡镇：{{ ent2.town }}</span>
                                <span v-if="ent2.entRule">企业规模：{{ ent2.entRule }}</span>
                            </p>
                            <p class="address">
                            <span class="dizhiblock"
                            >地址：{{ ent1.address }}</span
                            >
                            </p>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <Tabs :tabName="authorizationData" :creditCode="creditCode" v-if="ascynData"></Tabs>
                </el-col>
            </el-row>
        </div>
    </BasePage>
</template>

<script>
import BasePage from "@/components/BasePage";
import * as inter from "@api/gov/entDetail";

import { getUrlParam, toHtmlStr } from "@/common/utils/index.js"; //跳转路径
import Tabs from "@/components/tabs";

export default {
    data() {
        return {
            toHtmlStr: toHtmlStr,
            ent1: {},
            ent2: {},
            creditCode: "",
            authorizationData:[], //企业档案tab权限
            ascynData: false
        };
    },
    created() {
        this.$store.commit({
            type: "setCurModAuthority",
            np: window.location.pathname.split("/").reverse()[0]
        });
        this.controlPermission();
    },
    mounted() {
        let params = {
            entName: getUrlParam("entName")
        };
        inter.queryEnt(params).then(res => {
            if (res.code === "0000" && res.data !== null) {
                this.ent1 = res.data;
                this.creditCode = res.data.creditCode;
                this.ascynData = true;
            }
        });
        inter.queryEntSql(params).then(res => {
            if (res.code === "0000" && res.data !== null) {
                if (res.data.entRule == 1) {
                    res.data.entRule = "规下企业";
                } else if (res.data.entRule == 0) {
                    res.data.entRule = "规上企业";
                } else {
                    res.data.entRule = "";
                }
                this.ent2 = res.data;
            }
        });        
    },
    methods: {
        controlPermission() {
            let curModAuthorityList = this.$store.state.curModAuthority || [];
            this.authorizationData = curModAuthorityList.children.map((v,index)=>{
                return { name:index+'', label: v.name }
            }) || [];
        },
        goBack() {
            history.go(-1);
        }
    },
    components: {
        BasePage,
        Tabs
    }
};
</script>

<style lang="less">
@import '../../common/less/base';
.container-1200 {
    width: 1100px;
    margin: 0px auto;
}
.topbox {
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;

    .leftbox {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        background: #fff;
        border-radius: 4px;
        height: 140px;
        position: relative;
        .bgimg {
            position: absolute;
            right: 0;
            top: 0;
            z-index: 1;
            width: 270px;
            height: 180px;
            background-size: 270px 180px;
        }
        .companybox {
            position: absolute;
            z-index: 2;
            top: 0;
            left: 0;
            padding: 20px 25px;

            p {
                font-size: 14px;
                color: rgba(69, 84, 103, .5);
            }

            .name {
                font-size: 24px;
                color: #40485D;

                i {
                    font-size: 24px;
                    margin-right: 10px;
                }
            }

            .target {
                margin-top: 20px;

                span {
                    padding: 0 8px;
                    height: 30px;
                    line-height: 30px;
                    text-align: center;
                    display: inline-block;
                    border-radius: 2px;
                    background-color: rgba(24, 237, 255, 0.3);
                    border: 1px solid rgba(68, 255, 255, .6);
                    margin-right: 20px;
                }
            }

            .address {
                margin-top: 12px;

                span {
                    margin-right: 30px;
                    display: inline-block;
                    vertical-align: middle;
                }

                .dizhiblock {
                    overflow: hidden;
                    margin-right: 0;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
        }
    }

    .rightbox {
        background: linear-gradient(to right, rgba(145, 175, 249, 1), rgba(57, 96, 255, 1));
        border-radius: 4px;
        width: 265px;
        height: 180px;
        position: relative;

        .zhdfbg {
            height: 100%;
            padding: 30px;
            color: #fff;
            font-size: 14px;
            display: flex;
            align-items: center;

            .grade {
                span {
                    display: inline-block;
                    vertical-align: middle;
                }

                span:last-child {
                    margin-left: 50px;
                    font-size: 50px;
                }
            }
        }
    }
}
.contentbox {
    background-color: #fff;
    .tabbox {
        position: relative;
        .content {
            .contentlist {
                font-size: 12px;
                color: #666;
                // 基本信息
                .jbxx {
                    position: relative;
                    padding: 20px 20px;
                    .yearSelect {
                        position: absolute;
                        right: 35px;
                        top: 10px;
                        width: 100px;
                    }
                    .list-item {
                        margin-bottom: 10px;
                        &.businessData {
                            margin-top: 30px;
                        }
                        .sectionTitle {
                            font-size: 16px;
                            color: #333;
                            text-align: center;
                            width: 100%;
                            height: 40px;
                            line-height: 30px;
                            display: none;
                        }
                        .subSection {
                            margin-bottom: 20px;
                            .sectionSubTitle {
                                font-size: 14px;
                                color: #455467;
                                position: relative;
                                padding-left: 10px;
                                margin-bottom: 10px;
                                line-height: 16px;
                                font-family: PingFangSC-Semibold;
                                margin-bottom: 15px;
                                &::before {
                                    content: '';
                                    display: inline-block;
                                    width: 4px;
                                    height: 16px;
                                    border-radius: 2px;
                                    background-color: #6b8af0;
                                    position: absolute;
                                    left: 0;
                                }
                            }
                            .info-table {
                                width: 100%;
                                .tables{
                                    display: inline-flex;
                                    width: 33%;
                                    vertical-align: top;  
                                    font-size: 0;                              
                                    .th,
                                    .td {
                                        text-align: center;
                                        font-size: 12px;
                                        display: table;
                                        font-family: PingFangSC-Regular;
                                        vertical-align: top;
                                        .border{
                                            height: 32px;
                                            display: table-cell;
                                            vertical-align: middle;
                                        }
                                    }
                                    .th {
                                        width: 45%;
                                        color: #666;
                                    }
                                    .th{
                                        border-bottom: 1px solid #eeeeee;
                                        border-right: 1px solid #eeeeee;
                                        background-color: #f7f9fc;
                                    }
                                    .td {
                                        width: 55%;
                                        color: #333;
                                    }
                                    .td{
                                        border-right: 1px solid #eeeeee;
                                        border-bottom: 1px solid #eeeeee;
                                    }
                                }
                            }
                            .info-table .tables:nth-of-type(-n+3) .th {
                                border-top: 1px solid #eeeeee;
                            }
                            .info-table .tables:nth-of-type(3n+1) .th {
                                border-left: 1px solid #eeeeee;
                            }
                            .info-table .tables:nth-of-type(-n+3) .td {
                                border-top: 1px solid #eeeeee;
                            }
                        }
                    }
                }
              
            }
            .visible {
                height: 0;
                overflow: hidden;
            }
        }
    }
 
}
</style>
