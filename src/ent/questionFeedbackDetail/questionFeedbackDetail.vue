<template>
    <BasePage>
        <div>
            <div class="ys-back-btn" @click="goBack"></div>
            <el-row>
                <el-col :span="24" class="companyBox">
                    <div class="header">
                        <div class="name">
                            <i class="iconfont icon-qiyetubiaox"></i>
                            {{ toHtmlStr(problemInfo.companyName) }}
                        </div>
                        <div class="labels-outer">
                            <span>{{
                                toHtmlStr(problemInfo.problemTypeName)
                            }}</span>
                        </div>
                    </div>
                    <p>
                        <span
                            >联系人：{{ toHtmlStr(problemInfo.linkman) }}</span
                        >
                        <span
                            >联系方式：{{ toHtmlStr(problemInfo.mobile) }}</span
                        >
                    </p>
                    <p>
                        <span
                            >问题描述：{{
                                toHtmlStr(problemInfo.problemContent)
                            }}</span
                        >
                    </p>
                </el-col>
            </el-row>
            <el-row class="">
                <el-col :span="24" class="problem-process">
                    <div
                        class="problem-process-item"
                        v-for="(item, index) in recordDtoList"
                        :key="index + 1"
                        data-state="${item.handlerStatus}"
                    >
                        <div class="left">
                            <span class="line-v"></span>
                            <span class="line-h"></span>
                            <span class="stepNumber">{{ index + 1 }}</span>
                        </div>
                        <div class="right">
                            <div class="item-content">
                                <div class="item-content-top">
                                    <span class="departmentName">{{
                                        toHtmlStr(item.handlerName)
                                    }}</span>
                                    <span class="line-h"></span>
                                    <span class="question-type">{{
                                        toHtmlStr(item.handlerStatusStr)
                                    }}</span>
                                </div>
                                <div class="item-content-bottom">
                                    <div class="item-content-main">
                                        <div class="problem-reslove-suggestion">
                                            {{ toHtmlStr(item.content) }}
                                        </div>
                                        <div class="problem-reslove-time">
                                            {{ toHtmlStr(item.changeTime) }}
                                        </div>
                                    </div>

                                    <div class="leader-indicate-list">
                                        <div
                                            class="leader-indicate-item"
                                            v-for="leader in item.superviseList"
                                            :key="leader.id"
                                        >
                                            <div
                                                class="problem-reslove-suggestion"
                                            >
                                                <span class="leader"
                                                    >{{
                                                        toHtmlStr(
                                                            leader.leaderName
                                                        )
                                                    }}：</span
                                                >{{
                                                    toHtmlStr(
                                                        leader.leaderOpinion
                                                    )
                                                }}
                                            </div>
                                            <div class="problem-reslove-time">
                                                {{
                                                    toHtmlStr(leader.createTime)
                                                }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <!--企业评价-->
            <el-row v-if="showEvaluatetBox">
                <el-col :span="24" class="evaluatetBox">
                    <p>{{ starMessage }}</p>
                    <el-rate
                        v-model="starLevel"
                        void-color="#d3d9e1"
                        :disabled="isDisabled"
                        disabled-void-color="#d3d9e1"
                        :icon-classes="[
                            'iconfont icon-wuxing',
                            'iconfont icon-wuxing',
                            'iconfont icon-wuxing'
                        ]"
                        void-icon-class="iconfont icon-wuxing"
                        disabled-void-icon-class="iconfont icon-wuxing"
                        :colors="['#ff7b7b', '#ff7b7b', '#ff7b7b']"
                        @change="starComment"
                    >
                    </el-rate>
                </el-col>
            </el-row>
        </div>
    </BasePage>
</template>

<script>
import BasePage from "@/components/BasePage";
import {
    toHtmlStr,
    getUrlParam,
    isEmptyString
} from "@/common/utils/index";
import * as api from "@api/ent/questionFeedbackDetail";

export default {
    data() {
        return {
            problemInfo: {}, //详情信息
            problemId: "",
            recordDtoList: [], //处理流程数据
            toHtmlStr: () => {},
            showEvaluatetBox: false,
            starLevel: 0,
            starMessage: "请对我们的服务做出评价",
            isDisabled: false
        };
    },
    components: {
        BasePage
    },
    mounted() {
        this.problemId = getUrlParam("problemId");
        this.toHtmlStr = toHtmlStr;
        this.fetchData();
    },
    methods: {
        fetchData() {
            const vm = this;
            api.problemDetail({ problemId: this.problemId }).then(res => {
                vm.problemInfo = res.data || {};
                vm.recordDtoList = vm.problemInfo.recordDtoList || [];
                vm.cooperateList = vm.problemInfo.cooperateList || [];

                // problemStatus : 问题状态：0、删除问题，1、待派单，2、已派单，3、派单退回，4、无法解决，5、已解决，6、问题退回
                if (vm.problemInfo.problemStatus === 5) {
                    // && vm.problemInfo.fiveStarAssess
                    this.showEvaluatetBox = true;
                    if (vm.problemInfo.fiveStarAssess) {
                        this.starMessage = "对我们服务的评价结果";
                        this.isDisabled = true;
                        this.starLevel = vm.problemInfo.fiveStarAssess;
                    }
                }
            });
        },
        starComment() {
            console.log(this.starLevel);

            const vm = this;
            api.starComment({
                problemId: this.problemId,
                starLevel: this.starLevel
            }).then(response => {
                let { code, msg } = response;
                let type = "error",
                    title = "错误提示";
                if (code === "0000") {
                    type = "success";
                    title = "成功提示";

                    this.starMessage = "对我们服务的评价结果";
                    this.isDisabled = true;
                }
                this.$notify({
                    title,
                    message: msg,
                    type
                });
            });
        },
        goBack() {
            history.go(-1);
        }
    }
};
</script>

<style lang="less" scoped>
@import "../../common/less/linHaiCommon.less";

.el-main.flex-col, .el-row {
    background-color: #fff;
}

.is-must .el-form-item__label {
    &::before {
        content: '* ';
        color: @errorColor;
    }
}

.evaluatetBox {
    //display: none;
    position: fixed;
    left: 65%;
    margin-left: 200px;
    top: 273px;
    width: 228px;
    height: 120px;
    border-radius: 2px;
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 8px 0px rgba(222, 222, 222, 0.5);
    padding: 17px 0px 17px 19px;

    &>p {
        color: rgba(112, 123, 139, 1);
        font-size: 14px;
        text-align: left;
        font-family: PingFangSC-Regular;
    }
    
    .el-rate {
        margin-top: 15px;
        height: auto;
        line-height: normal;
        .el-rate__item {
            margin-right: 8px;
            .icon-wuxing {
                font-size: 25px;
            }
        }        
    }
}

</style>