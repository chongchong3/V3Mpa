<template>
    <BasePage>
        <section>
            <el-row class="sel-condition">
                <el-col :span="14" class="sel-content">
                    <div>
                        问题类型：
                        <el-select
                            class="select"
                            v-model="condition.problemTypeId"
                            placeholder="请选择"
                            @change="fetchData"
                        >
                            <el-option
                                v-for="item in problemTypes"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </div>
                    <div>
                        发起时间：
                        <el-date-picker
                            class="datePicker"
                            v-model="dateRange"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            @change="onDatePick"
                            value-format="yyyy-MM-dd"
                        >
                        </el-date-picker>
                    </div>
                    <div>
                        问题状态：
                        <div class="status problemStatus">
                            <span
                                v-for="item in problemSolveStatus"
                                :key="item.status"
                                :class="[
                                    condition.problemSolveStatus === item.status
                                        ? 'sel_on'
                                        : ''
                                ]"
                                @click="problemStatusChanged(item.status)"
                            >
                                {{ item.name }}</span
                            >
                        </div>
                    </div>
                </el-col>
                <el-col :span="2" :offset="8" class="sel-btn">
                    <div
                        class="right-btn"
                        id="addNewProblemBtn"
                        @click="handleLaunchProblem"
                    >
                        <i class="iconfont icon-chuliwenti"></i>发起问题
                    </div>
                </el-col>
            </el-row>
            <el-row v-show="!noData" class="wrapper">
                <el-col :span="24" class="result-list">
                    <div class="wareList" v-for="row in dataList" :key="row.id">
                        <div class="wareList-top">
                            <div class="wareList-top-title">
                                <a
                                    class="wareList-bott-name qsk"
                                    @click.stop="handleProblemDetail(row)"
                                >
                                    {{ toHtmlStr(row.companyName) }}
                                </a>
                                <div
                                    class="wareList-bott-question qsk"
                                    :style="styleForProblemType(row)"
                                >
                                    {{ toHtmlStr(row.problemTypeName) }}
                                </div>
                            </div>
                            <div class="wareList-top-desc">
                                问题描述：{{ toHtmlStr(row.problemContent) }}
                            </div>
                            <div
                                class="wareList-top-process"
                                v-if="row.recordDtoList"
                            >
                                <div
                                    class="pross"
                                    v-for="(item, index) in row.recordDtoList ||
                                        []"
                                    :key="item.id"
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
                            </div>
                            <div v-if="row.problemStatus === 6">
                                <p class="back-reason">
                                    <span class="back-reason-title"
                                        >[退回理由]</span
                                    >
                                    {{ row.backReason }}
                                </p>
                            </div>
                        </div>
                        <div class="wareList-bott">
                            <div class="wareList-bottLeft">
                                <div class="wareList-bott-startTime time qsk">
                                    <span>发起日期：</span>
                                    <span>{{ toHtmlStr(row.createTime) }}</span>
                                </div>
                                <div
                                    class="wareList-bott-solveTime time qsk"
                                    :class="
                                        row.problemStatus != 5 ? 'hidden' : ''
                                    "
                                >
                                    <span>解决日期：</span>
                                    <span>{{ toHtmlStr(row.finishTime) }}</span>
                                </div>
                            </div>
                            <div
                                class="wareList-bottRight"
                                v-if="row.problemStatus === 6"
                            >
                                <div
                                    class="btn btn-link modify-question"
                                    @click.stop="handlerModifyQuestion(row)"
                                >
                                    <i class="iconfont icon-xiugai"></i>
                                    修改问题
                                </div>
                                <div
                                    class="btn btn-link delete-question"
                                    @click.stop="handlerDeleteQuestion(row.id)"
                                >
                                    <i class="iconfont icon-shanchu1"></i>
                                    删除问题
                                </div>
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-row v-show="!noData">
                <el-col :span="24">
                    <el-pagination
                        background
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-size="pageSize"
                        layout="total, prev, pager, next, jumper"
                        :total="total"
                        class="pagination"
                    >
                    </el-pagination>
                </el-col>
            </el-row>
            <el-row v-show="noData">
                <el-col :span="24" class="noData">
                    <div class="noData-img"></div>
                    <div class="noData-desc">
                        <p>暂无数据</p>
                        <p>Have no Message</p>
                    </div>
                </el-col>
            </el-row>

            <el-dialog
                title="发起问题"
                :visible.sync="dialogFormVisible"
                @close="closeDialog"
            >
                <el-form :model="problem" class="flex-between" :inline="true">
                    <el-form-item
                        label="企业名称："
                        prop="companyName"
                        class="is-must"
                        id="companyNameSearchItem"
                    >
                        <el-input
                            v-model="problem.companyName"
                            placeholder="请输入企业名称"
                            readonly
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="问题类型" class="is-must">
                        <el-select
                            v-model="problem.problemTypeId"
                            placeholder="请选择问题类型"
                        >
                            <el-option
                                v-for="item in problemTypesDialog"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <el-form :model="problem" class="flex-between" :inline="true">
                    <el-form-item
                        label="联系人："
                        prop="linkman"
                        class="is-must"
                    >
                        <el-input
                            v-model="problem.linkman"
                            autocomplete="off"
                            placeholder="请输入联系人"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        label="联系电话"
                        prop="mobile"
                        class="is-must"
                    >
                        <el-input
                            v-model="problem.mobile"
                            autocomplete="off"
                            placeholder="请输入联系电话"
                            type="text"
                            onkeyup="(this.v=function(){this.value=this.value.replace(/[^0-9-]+/,'');}).call(this)"
                            onblur="this.v();"
                        ></el-input>
                    </el-form-item>
                </el-form>
                <el-form :model="problem" label-position="top">
                    <el-form-item
                        label="问题描述："
                        prop="problemContent"
                        class="is-must"
                    >
                        <el-input
                            class="input-problemContent"
                            v-model="problem.problemContent"
                            autocomplete="off"
                            placeholder="请您尽量一次性描述清楚问题，如目前您面临的问题？您的诉求是什么？"
                        ></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button
                        class="btn-cancel"
                        @click="dialogFormVisible = false"
                        >取 消</el-button
                    >
                    <el-button
                        class="btn-confirm"
                        type="primary"
                        @click="launchProblem"
                        >确 定</el-button
                    >
                </div>
            </el-dialog>
        </section>
    </BasePage>
</template>

<script>
// import "./less/questionList.less";
import BasePage from "@/components/BasePage";
import {
    toHtmlStr,
    gotoEntURL,
    gotoGovURL,
    isEmptyString,
    getLocalStorage
} from "@/common/utils/index";

import { linHaiData } from "@/common/constant/constant";
// import toHtmlStr from "../../common/utils/toHtmlStr";
// import { linHaiData } from "../../common/utils/constant";
// import { gotoEntURL, gotoGovURL } from "../../common/utils/util";
// import { isEmptyString } from "../../common/utils/check";
// import getLocalStorage from "../../common/utils/getLocalStorage";
import * as api from "@api/ent/questionList";

export default {
    data() {
        return {
            companyLabelList: [],
            problemSolveStatus: [
                { name: "全部", status: "" },
                { name: "未解决", status: 0 },
                { name: "已解决", status: 1 }
            ],
            myStatus: [
                { name: "全部", id: "" },
                { name: "我发起的", id: 1 },
                { name: "我未处理", id: 2 },
                { name: "我已处理", id: 3 },
                { name: "我协助的", id: 4 }
            ],
            dateRange: "",
            condition: {
                problemSolveStatus: "" /**问题状态*/,
                problemTypeId: "" /**问题类型Id*/,
                startTime: "" /**开始时间*/,
                endTime: "" /**截止时间*/
            },
            isLoading: false,
            pageSize: 5,
            currentPage: 1,
            dataList: [],
            total: 0,
            toHtmlStr: () => {},
            //----------dialog---------
            dialogFormVisible: false,
            // companyName:'',
            problem: {
                mobile: "",
                companyName: getLocalStorage("name"),
                problemTypeId: "",
                linkman: "",
                problemContent: "",
                creditCode: ""
            },
            problemTypes: [],
            problemTypesDialog: [],
            //模糊查询列表
            companySearchList: [],
            timeout: null,
            isLaunchProblem: false //是否正在发起问题
        };
    },
    mounted() {
        this.toHtmlStr = toHtmlStr;
        this.fetchData();
        this.getProblemTypelList();
        this.getCompanyInfo();
    },
    computed: {
        noData() {
            return this.dataList.length === 0;
        }
    },
    methods: {
        /**数据请求*/
        getProblemTypelList() {
            api.getProblemTypelList()
                .then(data => {
                    let arr = data.data || [];
                    this.problemTypes = [{ name: "全部", id: "" }, ...arr];
                    this.problemTypesDialog = arr;
                })
                .catch(err => {});
        },
        getCompanyInfo() {
            const vm = this;
            api.getCompanyInfo().then(res => {
                let { code, data } = res;
                if (code === "0000") {
                    this.problem.companyName = data.entName;
                    this.problem.creditCode = data.creditCode;
                }
            });
        },
        fetchData() {
            const options = {
                t: Date.now(),
                pageNum: this.currentPage,
                pageSize: this.pageSize,
                ...this.condition
            };

            if (!options.startTime) {
                options.startTime = "";
            }
            if (!options.endTime) {
                options.endTime = "";
            }

            api.getProblemFlowHandlerList(options)
                .then(data => {
                    if (data.code === "0000") {
                        this.dataList = data.data.results || [];
                        this.total = data.data.totalRecord || 0;
                        console.log(this.dataList);
                    } else {
                        this.dataList = [];
                    }
                })
                .catch(err => {
                    this.dataList = [];
                });
        },
        launchProblem() {
            if (this.isLaunchProblem) {
                return;
            }
            if (!this.checkData()) {
                this.isLaunchProblem = false;
                return;
            }

            this.isLaunchProblem = true;
            api.launchOrEditProblem(this.problem)
                .then(data => {
                    if (data.code === "0000") {
                        this.fetchData();
                        this.dialogFormVisible = false;
                        this.$notify({
                            title: "成功提示",
                            message: "问题发起成功",
                            type: "success"
                        });
                    } else {
                        this.$notify({
                            title: "错误提示",
                            message: "问题添加失败",
                            type: "error"
                        });
                    }
                    this.isLaunchProblem = false;
                })
                .catch(err => {
                    this.isLaunchProblem = false;
                    this.$notify({
                        title: "错误提示",
                        message: "问题添加失败",
                        type: "error"
                    });
                });
        },
        deleteProblem(id) {
            api.deleteProblem({ problemId: id })
                .then(data => {
                    if (data.code === "0000") {
                        this.fetchData();

                        this.$notify({
                            title: "成功提示",
                            message: "问题删除成功",
                            type: "success"
                        });
                    } else {
                        this.$notify({
                            title: "错误提示",
                            message: "问题删除失败",
                            type: "error"
                        });
                    }
                })
                .catch(err => {
                    this.$notify({
                        title: "错误提示",
                        message: "问题删除失败",
                        type: "error"
                    });
                });
        },
        //  dialog

        closeDialog() {
            this.problem = {
                mobile: "",
                companyName: "",
                problemTypeId: this.problem.problemTypeId,
                linkman: "",
                problemContent: "",
                creditCode: ""
            };
        },
        checkData() {
            if (isEmptyString(this.problem.creditCode)) {
                this.$message({
                    showClose: true,
                    message: "企业信息查询错误，请重试",
                    type: "error"
                });
                return false;
            }

            if (!this.problem.problemTypeId) {
                this.$message({
                    showClose: true,
                    message: "请选择问题类型",
                    type: "error"
                });
                return false;
            }

            if (isEmptyString(this.problem.linkman)) {
                this.$message({
                    showClose: true,
                    message: "请输入联系人",
                    type: "error"
                });
                return false;
            }

            if (isEmptyString(this.problem.mobile)) {
                this.$message({
                    showClose: true,
                    message: "请输入联系电话",
                    type: "error"
                });
                return false;
            }

            if (isEmptyString(this.problem.problemContent)) {
                this.$message({
                    showClose: true,
                    message: "请输入问题描述",
                    type: "error"
                });
                return false;
            }

            return true;
        },
        /**事件处理*/
        handlerModifyQuestion(row) {
            this.problem = {
                mobile: row.mobile,
                companyName: row.companyName,
                problemTypeId: row.problemTypeId,
                linkman: row.linkman,
                problemContent: row.problemContent,
                creditCode: row.creditCode,
                id: row.id
            };
            this.dialogFormVisible = true;
        },
        handleLaunchProblem() {
            this.problem = {
                mobile: "",
                companyName: this.problem.companyName,
                problemTypeId: "",
                linkman: "",
                problemContent: "",
                creditCode: this.problem.creditCode
            };
            this.dialogFormVisible = true;
        },
        handlerDeleteQuestion(id) {
            this.$confirm("您确定要删除该问题吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    this.deleteProblem(id);
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },
        onDatePick(maxDate, minDate) {
            this.condition.startTime = maxDate[0];
            this.condition.endTime = maxDate[1];
            this.fetchData();
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.fetchData();
        },
        handleProblemDetail(row) {
            gotoEntURL("questionFeedbackDetail.html?problemId=" + row.id);
        },
        problemStatusChanged(status) {
            this.condition.problemSolveStatus = status;
            this.fetchData();
        },
        /**列表样式和数据*/
        styleForProblemType(row) {
            const problemTypeColor =
                linHaiData.problemTypeColorDatas.find(
                    v => v.name == row.problemTypeName
                ) || [];
            return {
                color:
                    problemTypeColor.length > 0
                        ? problemTypeColor.bgColor
                        : linHaiData.problemTypeColorDatas[0].color,
                background:
                    problemTypeColor.length > 0
                        ? problemTypeColor.bgColor
                        : linHaiData.problemTypeColorDatas[0].bgColor
            };
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
    },
    components: {
        BasePage
    }
};
</script>

<style lang="less">
@import "../../common/less/linHaiCommon.less";

.sel-condition {

    .select.el-select,.el-date-editor {
        width: 100px;
        .el-input .el-input__inner {
            height: 30px;
            line-height: 30px;
            font-size: 12px;
        }
        .el-input__icon {
            line-height: 30px;
            height: 30px;
        }
    }
    .sel-content .el-date-editor {
        &.datePicker {
            width: 225px;
            .el-range-input {
                border: 0;
            }
            .el-range-separator {
                width: auto;
                height: 30px;
            }
        }
    }

}

.result-list {
    background-color: #fff;
    .wareList-bott-name {
        &:hover {
            text-decoration: underline;
        }
    }
}

.el-pagination.pagination {
    background-color: #fff;
    padding-bottom: 20px;
}

.el-row {
    min-width: 1073px;
    &:nth-child(2) {
        height: 604px;
        overflow-y: auto;
    }
}

.el-dialog {
    width: 560px;
    .el-dialog__body {
        .el-form--inline .el-form-item {
            width: 220px;
            &:first-child {
                margin-right: 32px;
            }
        }
        .el-form--inline .el-form-item__content {
            width: 100%;
            &>div {
                width: 100%;
            }
        }
        .input-problemContent .el-input__inner {
            border-top: 0;
            border-left: 0;
            border-right: 0;
        }
        .is-must .el-form-item__label {
            &::before {
                content: '* ';
                color: @errorColor;
            }
        }
    }
    .el-dialog__header {
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        background-color: rgba(68, 101, 231, 1);
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.15);

        .el-dialog__title {
            color: #fff;
        }
        .el-dialog__headerbtn {
            position: relative;
            top: 0;
            right: 0;
            .el-dialog__close {
                color: #fff;
                font-size: x-large;
            }
        }
    }
    .dialog-footer {
        .btn-cancel {
            border: none;
            color: rgba(68, 101, 231, 1);
            font-size: 16px;
            font-family: PingFangSC-Medium;
        }
        .btn-confirm {
            background-color: rgba(68, 101, 231, 1);
        }
    }
}
</style>