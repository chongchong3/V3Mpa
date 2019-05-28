<template>
    <div class="contentlist visible">
        <div class="use-bulk" id="ultimateShareholder" v-if="!getData">
            <div class="contentlist visible" data-name="问题反馈">
                <div id="problemFlow">
                    <div class="result-list">
                        <div
                            class="wareList"
                            :class="
                                isEnt || (row.handlerStatus == 0 && row.superviseStatus == 0)
                                    ? 'contentAble'
                                    : ''
                            "
                            @click="handleWareListClicked(row)"
                            v-for="(row, index) in feedList"
                            :key="index"
                        >
                            <div class="wareList-top">
                                <div class="wareList-top-title">
                                    <div class="wareList-bott-name qsk">
                                        {{ row.companyName }}
                                    </div>
                                    <div class="wareList-bott-question qsk" v-if="row.problemTypeName">
                                        {{ row.problemTypeName }}
                                    </div>
                                </div>
                                <div class="wareList-top-desc">
                                    {{ row.problemContent }}
                                </div>
                                <div class="wareList-top-process">
                                    <div
                                        class="pross"
                                        v-for="(item, index) in row.recordDtoList || []"
                                        :key="index"
                                        :class="classForProcessItem(item)"
                                        :style="
                                    index === 0
                                        ? '{color: #5C7CEC, border-color: #5C7CEC}'
                                        : 'color: #FF6D60, border-color: #FF6D60'
                                "
                                    >
                                        &nbsp;{{ item.handlerName }}({{
                                        statusForProcessItem(item)
                                        }})
                                    </div>
                                    <p class="back-reason" v-if="row.problemStatus === 6">
                                        <span class="back-reason-title">[退回理由]</span>
                                        {{toHtmlStr((row.backReason))}}
                                    </p>
                                </div>                                
                            </div>
                            <div class="wareList-bott">
                                <div class="wareList-bottLeft">
                                    <div
                                        class="wareList-bott-startTime time qsk"
                                    >
                                        <span>发起日期：</span>
                                        <span>{{ row.createTime }}</span>
                                    </div>
                                    <div
                                        :class="
                                            row.problemStatus != 5
                                                ? 'hidden'
                                                : ''
                                        "
                                        class="wareList-bott-solveTime time qsk"
                                    >
                                        <span>解决日期：</span>
                                        <span>{{ row.finishTime }}</span>
                                    </div>
                                </div>
                                <div class="wareList-bottRight" v-if="!isEnt">
                                    <div
                                        @click="handlerSupervision(row.id)"
                                        :class="
                                            row.superviseStatus == 0
                                                ? 'hidden'
                                                : ''
                                        "
                                        class="btn btn-link btn-supervision"
                                    >
                                        <i class="iconfont icon-chuliwenti"></i> 督办问题
                                    </div>
                                    <div
                                        @click="handlerResolve(row.id)"
                                        :class="
                                            row.handlerStatus == 0
                                                ? 'hidden'
                                                : ''
                                        "
                                        class="btn btn-link btn-resolve"
                                    >
                                        <i class="iconfont icon-chuliwenti"></i> 处理问题
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="getData">
            <MassageTip></MassageTip>
        </div>
    </div>
</template>

<script>
import * as inter from "@api/bussiness.js";
import MassageTip from "@/components/business/massageTip";
import { handerSta } from "@/common/constant/constantConst.js";
import { gotoEntURL } from "@/common/utils/index";
import {gotoGovURL, toHtmlStr} from "../../common/utils";
import {linHaiData} from "../../common/constant/constant"; //跳转路径
export default {
    props: {
        creditCodes: {
            type: String
        }
    },
    components: {
        MassageTip
    },
    data() {
        return {
            getData: true,
            feedList: [],
            toHtmlStr: toHtmlStr,
            isEnt:window.location.pathname.split('/').includes('ent')
        };
    },

    mounted() {
        this.initData();
    },
    methods: {
        initData() {
            let params = {
                creditCode: this.creditCodes
            };
            inter.showProblemList(params).then(response => {
                if (response.code == "0000") {
                    this.feedList = response.data || [];
                    this.getData = this.feedList.length === 0;
                } 
            });
        },
        handleWareListClicked(row) {
            if (this.isEnt) {
                gotoEntURL("questionFeedbackDetail.html?problemId="+row.id);
            } else if (row.superviseStatus != 1 && row.handlerStatus != 1) {
                this.jumpToUrl("resolveProblem.html?type=problemDetail&id=" + row.id,row.id);               
            }
        },
        handlerSupervision(id) {
            this.jumpToUrl("resolveProblem.html?type=supervisionProblem&id=" + id,id);
        },
        handlerResolve(id) {
            this.jumpToUrl("resolveProblem.html?type=resolveProblem&id=" + id,id);
        },
        jumpToUrl(url,id) {
            if (this.isEnt) {
                gotoEntURL("questionFeedbackDetail.html?problemId="+id);
            } else {
                gotoGovURL(url);
            }
        },
        classForProcessItem(item) {
            return item.handlerStatus == 8
                ? "complete"
                : item.handlerStatus == 1
                    ? "noHandle"
                    : "";
        },
        statusForProcessItem(item) {
            let a = linHaiData.handerStatus.find(val => {
                return item.handlerStatus == val.key;
            });
            return a.name;
        }
    }
};
</script>
<style lang="less" scoped>
   @import "../../common/less/linHaicommon";
</style>

