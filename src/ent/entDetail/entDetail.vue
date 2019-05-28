<template>
    <BasePage>
        <div class="container-1200">
            <div class="topbox">
                <div class="leftbox">
                    <div class="companybox">
                        <p class="name">
                            <i class="iconfont icon-qiyetubiaox"></i>
                            {{ toHtmlStr(ent1.entName, "") }}
                            <!-- ${toHtmlStr(ent.entName,'')} -->
                        </p>
                        <p class="address companyInfo">
                            <span>法定代表人：{{ ent1.frName }}</span>
                            <span>注册资本：{{ ent1.regCap }}万元</span>
                            <span>所属乡镇：{{ ent2.town }}</span>
                            <span>企业规模：{{ ent2.entRule }}</span>
                        </p>
                        <p class="address">
                            <span class="dizhiblock"
                                >地址：{{ ent1.address }}</span
                            >
                        </p>
                    </div>
                </div>
            </div>
            <Tabs
                :tabName="tabName"
                :creditCode="creditCode"
                v-if="ascynData"
            ></Tabs>
        </div>
    </BasePage>
</template>

<script>
import BasePage from "@/components/BasePage";
import * as inter from "@api/ent/entDetail";

import { getLocalStorage, toHtmlStr } from "@/common/utils/index";
import Tabs from "@/components/tabs";

export default {
    data() {
        return {
            toHtmlStr: toHtmlStr,
            ent1: {},
            ent2: {},
            tabName: [
                { name: "0", label: "经营情况" },
                { name: "1", label: "问题反馈" },
                { name: "2", label: "关系图谱" },
                { name: "3", label: "持股人图谱" },
                { name: "4", label: "最终持股人" },
                { name: "5", label: "知识产权" },
                { name: "6", label: "工商登记信息" },
                { name: "7", label: "司法诉讼" }
            ],
            creditCode: "",
            ascynData: false
        };
    },
    created() {},
    mounted() {
        let params = {
            entName: getLocalStorage("name")
        };
        inter.queryEnt(params).then(res => {
            if (res.code === "0000" && res.data !== null) {
                this.ent1 = res.data;
                //   store.commit('GET_CREDIT_CODE',res.data.creditCode)
                this.creditCode = res.data.creditCode;
                this.ascynData = true;
                //   console.log(this.creditCode,'1')
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
    methods: {},
    components: {
        BasePage,
        Tabs
    }
};
</script>

<style lang="less">
@import '../../common/less/base.less';
.container-1200 {
    width: 1200px;
    margin: 10px auto;
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
                                        width: 36%;
                                        color: #666;
                                    }
                                    .th>.border{
                                        border-left:  1px solid #eeeeee;
                                        border-bottom: 1px solid #eeeeee;
                                        border-right: 1px solid #eeeeee;
                                        background-color: #f7f9fc;
                                    }
                                    .td {
                                        width: 64%;
                                        color: #333;
                                    }
                                    .td>.border{
                                        border-bottom: 1px solid #eeeeee;
                                    }
                                }
                            }
                            .info-table .tables:nth-of-type(-n+3) .th .border{
                                border-top: 1px solid #eeeeee;
                            }
                            .info-table .tables:nth-of-type(3n+0) .td .border{
                                border-right: 1px solid #eeeeee;
                            }
                            .info-table .tables:last-child .td .border{
                                border-right: 1px solid #eeeeee;
                            }
                            .info-table .tables:nth-of-type(-n+3) .td .border{
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
