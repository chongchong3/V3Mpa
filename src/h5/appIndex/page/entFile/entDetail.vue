<template>
    <van-tabs v-model="active" swipeable sticky>
        <van-tab title="工商信息">
            <div class="wrapper" id="messagePage">
                <div id="message">
                    <div class="mess-bott">
                        <div class="mess-item stk">
                            <div class="mess-item-top item">企业名称</div>
                            <div class="mess-item-bott major">
                                {{ toHtmlStr(companyInfo.entName) }}
                            </div>
                        </div>
                        <div class="mess-bott-box stk">
                            <div class="mess-bott-box-left">
                                <div class="mess-desc item">注册资本</div>
                                <div class="mess-name major">
                                    {{
                                        toHtmlStr(companyInfo.regCap)
                                    }}万&nbsp;{{
                                        toHtmlStr(companyInfo.regCapCur)
                                    }}
                                </div>
                            </div>
                            <div class="mess-bott-box-right">
                                <div class="mess-desc item">在营状态</div>
                                <div class="mess-name major">
                                    {{ toHtmlStr(companyInfo.entStatus) }}
                                </div>
                            </div>
                        </div>
                        <div class="mess-bott-box stk">
                            <div class="mess-bott-box-left">
                                <div class="mess-desc item">
                                    统一社会信用代码
                                </div>
                                <div class="mess-name major">
                                    {{ toHtmlStr(companyInfo.creditCode) }}
                                </div>
                            </div>
                            <div class="mess-bott-box-right">
                                <div class="mess-desc item">开业日期</div>
                                <div class="mess-name major">
                                    {{ toHtmlStr(companyInfo.esDate) }}
                                </div>
                            </div>
                        </div>
                        <div class="mess-bott-box stk">
                            <div class="mess-bott-box-left">
                                <div class="mess-desc item">企业类型</div>
                                <div class="mess-name major">
                                    {{ toHtmlStr(companyInfo.entType) }}
                                </div>
                            </div>
                            <div class="mess-bott-box-right">
                                <div class="mess-desc item">法定人代表</div>
                                <div class="mess-name major">
                                    {{ toHtmlStr(companyInfo.frName) }}
                                </div>
                            </div>
                        </div>
                        <div class="mess-bott-box stk">
                            <div class="mess-bott-box-left">
                                <div class="mess-desc item">核准日期</div>
                                <div class="mess-name major">
                                    {{ toHtmlStr(companyInfo.apprDate) }}
                                </div>
                            </div>
                            <div class="mess-bott-box-right">
                                <div class="mess-desc item">
                                    行业门类名称(代码)
                                </div>
                                <div class="mess-name major">
                                    {{
                                        toHtmlStr(companyInfo.industryPhyName)
                                    }}({{ companyInfo.industryPhyCode }})
                                </div>
                            </div>
                        </div>
                        <div class="mess-item stk">
                            <div class="mess-item-top item">经营期限</div>
                            <div class="mess-item-bott major">
                                自{{ toHtmlStr(companyInfo.openFrom, "-") }}至{{
                                    toHtmlStr(companyInfo.openTo, "-")
                                }}
                            </div>
                        </div>
                        <div class="mess-item stk">
                            <div class="mess-item-top item">
                                国民经济行业名称(代码)
                            </div>
                            <div class="mess-item-bott major">
                                {{ toHtmlStr(companyInfo.industryName)
                                }}{{
                                    companyInfo.industryCode
                                        ? "(" + companyInfo.industryCode + ")"
                                        : ""
                                }}
                            </div>
                        </div>
                        <div class="mess-item stk">
                            <div class="mess-item-top item">登记机关</div>
                            <div class="mess-item-bott major">
                                {{ toHtmlStr(companyInfo.regOrg) }}
                            </div>
                        </div>
                        <div class="mess-item stk">
                            <div class="mess-item-top item">所属地区</div>
                            <div class="mess-item-bott major">
                                {{ toHtmlStr(companyInfo.province)
                                }}{{ toHtmlStr(companyInfo.city)
                                }}{{ toHtmlStr(companyInfo.county) }}
                            </div>
                        </div>
                        <div class="mess-item stk">
                            <div class="mess-item-top item">地址</div>
                            <div class="mess-item-bott major">
                                {{ toHtmlStr(companyInfo.address) }}
                            </div>
                        </div>
                        <div class="mess-item stk">
                            <div class="mess-item-top item">经营范围</div>
                            <div class="mess-item-bott major textmore">
                                <span id="bussinessScope">{{
                                    toHtmlStr(operateScope)
                                }}</span>
                                <span
                                    class="see-more-btn"
                                    v-if="isMore"
                                    @click="seeMore"
                                    >查看更多</span
                                >
                                <span
                                    class="see-more-btn"
                                    v-if="!isMore && !isLess"
                                    @click="seeMore"
                                    >收起</span
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </van-tab>
        <van-tab title="问题反馈">
            <div class="wrapper" id="problemFlowPage">
                <div class="content-list" id="problem-list">
                    <div
                        v-for="row in problemList"
                        v-bind="row.id"
                        class="problem-item"
                        :key="row.id"
                        @click.stop="showDetail(row)"
                    >
                        <div class="problem-item-top">
                            <span class="company-name">{{
                                toHtmlStr(row.companyName)
                            }}</span>
                            <span class="problem-type-label">
                                {{ toHtmlStr(row.problemTypeName) }}
                            </span>
                        </div>
                        <div class="problem-item-main">
                            问题描述：{{ toHtmlStr(row.problemContent) }}
                        </div>
                        <div class="problem-item-bottom">
                            <div class="createTime">
                                {{ toHtmlStr(row.createTime) }}
                            </div>
                            <div class="btn-container">
                                <div
                                    class="operateBtn btn-resolve"
                                    :class="
                                        row.handlerStatus == 0 ? 'hidden' : ''
                                    "
                                    @click.stop="handlerProblem(row.id)"
                                >
                                    处理问题
                                </div>
                                <div
                                    class="operateBtn btn-supervision"
                                    :class="
                                        row.superviseStatus == 0 ? 'hidden' : ''
                                    "
                                    @click.stop="handleSuperviseProblem(row.id)"
                                >
                                    督办问题
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </van-tab>
    </van-tabs>
</template>

<script>
import { toHtmlStr } from "@/common/utils/index";
import * as api from "@api/h5/entFile";
import "../../less/entFile.less";
export default {
    name: "entDetail",
    data() {
        return {
            active: 0,
            creditCode: "",
            company: "",
            companyInfo: {}, //企业信息
            problemList: [],
            toHtmlStr: () => {},
            isMore: false,
            isLess: false,
            operateScope: ""
        };
    },
    mounted() {
        this.company = this.$route.query.company;
        this.creditCode = this.$route.query.creditCode;
        this.toHtmlStr = toHtmlStr;
        this.queryEnt();
        this.showProblemList();
    },
    methods: {
        queryEnt() {
            api.queryEnt({ entName: this.company }).then(response => {
                if (response.code === "0000") {
                    this.companyInfo = response.data || {};
                    this.isMore = this.companyInfo.operateScope.length > 65;
                    this.isLess = this.companyInfo.operateScope.length <= 65;
                    this.operateScope = this.isMore
                        ? this.companyInfo.operateScope.substring(0, 65) + "..."
                        : this.companyInfo.operateScope;
                }
            });
        },
        showProblemList() {
            api.showProblemList({ creditCode: this.creditCode }).then(
                response => {
                    if (response.code === "0000") {
                        this.problemList = response.data || [];
                    }
                }
            );
        },
        seeMore() {
            this.isMore = !this.isMore;
            this.operateScope = this.isMore
                ? this.companyInfo.operateScope.substring(0, 65) + "..."
                : this.companyInfo.operateScope;
        },
        handlerProblem(id) {},
        handleSuperviseProblem(row) {
            if (row.handlerStatus == 0 && row.superviseStatus == 0) {
            }
        },
        showDetail(id) {}
    }
};
</script>

<style lang="less" scoped>
</style>