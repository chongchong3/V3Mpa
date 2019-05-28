<template>
    <BasePage>
        <el-row class="sel-condition">
            <el-col :span="20" class="sel-content">
                <div>
                    企业类型：
                    <!--<div class="ent-type-select" >-->
                    <el-select
                        class="select"
                        v-model="condition.labelCode"
                        placeholder="请选择"
                        @change="fetchData"
                    >
                        <el-option
                            v-for="item in companyLabelList"
                            :key="item.code"
                            :label="item.name"
                            :value="item.code"
                        >
                        </el-option>
                    </el-select>
                    <!--</div>-->
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
                <div>
                    与我相关：
                    <el-select
                        class="select"
                        v-model="condition.myStatus"
                        placeholder="请选择"
                        @change="fetchData"
                    >
                        <el-option
                            v-for="item in myStatus"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        >
                        </el-option>
                    </el-select>
                </div>
                <div>
                    起始时间：
                    <el-date-picker
                        class="time"
                        v-model="condition.startTime"
                        type="date"
                        placeholder="选择日期"
                        value-format="yyyy-MM-dd"
                        @change="fetchData"
                    >
                    </el-date-picker>
                </div>
                <div>
                    <div class="sel-text">
                        <input
                            type="text"
                            class="search"
                            id="search"
                            placeholder="请输入企业名称、发起人、问题描述关键字"
                            v-model="condition.key"
                        />
                    </div>
                    <span class="search-btn" @click="fetchData">搜索</span>
                </div>
            </el-col>
            <el-col :span="2" class="sel-btn">
                <div
                    class="right-btn"
                    id="addNewProblemBtn"
                    @click="dialogFormVisible = true"
                >
                    <i class="iconfont icon-chuliwenti"></i>发起问题
                </div>
            </el-col>
        </el-row>
        <el-row v-show="!noData" class="wrapper">
            <el-col :span="24" class="result-list">
                <div
                    class="wareList"
                    v-for="(row, index) in dataList"
                    :key="index"
                    @click.stop="handleWareListClicked(row)"
                >
                    <div class="wareList-top">
                        <div class="wareList-top-title">
                            <div class="wareList-bott-name qsk">
                                {{ toHtmlStr(row.companyName) }}
                            </div>
                            <div
                                class="wareList-bott-question qsk"
                                :style="styleForProblemType(row)"
                            >
                                {{ toHtmlStr(row.problemTypeName) }}
                            </div>
                        </div>
                        <div class="wareList-top-desc">
                            {{ toHtmlStr(row.problemContent) }}
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
                                :class="row.problemStatus != 5 ? 'hidden' : ''"
                            >
                                <span>解决日期：</span>
                                <span>{{ toHtmlStr(row.finishTime) }}</span>
                            </div>
                        </div>
                        <div class="wareList-bottRight">
                            <div
                                class="btn btn-link btn-supervision"
                                v-if="row.superviseStatus == 1"
                                @click="handlerSupervision(row.id)"
                            >
                                <i class="iconfont icon-chuliwenti"></i>督办问题
                            </div>
                            <div
                                class="btn btn-link btn-resolve"
                                v-if="row.handlerStatus == 1"
                                @click="handlerResolve(row.id)"
                            >
                                <i class="iconfont icon-chuliwenti"></i>处理问题
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
                    <p>Have no Data</p>
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
                    <el-autocomplete
                        v-model="problem.companyName"
                        :fetch-suggestions="querySearchAsync"
                        placeholder="请输入企业名称"
                        @select="handleSelect"
                        value-key="name"
                    ></el-autocomplete>
                </el-form-item>
                <el-form-item label="问题类型" class="is-must">
                    <el-select
                        v-model="problem.problemTypeId"
                        placeholder="请选择问题类型"
                    >
                        <el-option
                            v-for="item in problemTypes"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <el-form :model="problem" class="flex-between" :inline="true">
                <el-form-item label="联系人：" prop="linkman" class="is-must">
                    <el-input
                        v-model="problem.linkman"
                        autocomplete="off"
                        placeholder="请输入联系人"
                    ></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="mobile" class="is-must">
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
                <el-button class="btn-cancel" @click="dialogFormVisible = false"
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
    </BasePage>
</template>

<script>
import BasePage from "@/components/BasePage";
import * as api from "@api/gov/selfProblem";

import {
    toHtmlStr,
    gotoGovURL,
    isEmptyString
} from "@/common/utils/index";
import { linHaiData } from "@/common/constant/constant";

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
            condition: {
                labelCode: "" /**企业类型标签*/,
                problemSolveStatus: "" /**问题状态*/,
                myStatus: "",
                startTime: "" /**开始时间*/,
                key: "" /**搜索关键字*/
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
                companyName: "",
                problemTypeId: "",
                linkman: "",
                problemContent: "",
                creditCode: ""
            },
            problemTypes: [],
            //模糊查询列表
            companySearchList: [],
            timeout: null,
            isLaunchProblem: false //是否正在发起问题
        };
    },
    created() {},
    mounted() {
        this.toHtmlStr = toHtmlStr;
        this.getCompanyLabelList();
        this.fetchData();
        this.getProblemTypelList();
    },
    computed: {
        noData() {
            return this.dataList.length === 0;
        }
    },
    methods: {
        /**数据请求*/
        getCompanyLabelList() {
            api.getCompanyLabelList()
                .then(data => {
                    let arr = data.data || [];
                    this.companyLabelList = [
                        { name: "全部", code: "" },
                        ...arr
                    ];
                })
                .catch(err => {});
        },
        getProblemTypelList() {
            api.getProblemTypelList()
                .then(data => {
                    let arr = data.data || [];
                    this.problemTypes = arr;
                    this.problem.problemTypeId =
                        arr.length > 0 ? arr[0].id : "";
                })
                .catch(err => {});
        },
        fetchData() {
            Object.keys(this.condition).forEach(key => {
                this.condition[key] =
                    this.condition[key] === "全部" ? "" : this.condition[key];
            });

            const options = {
                t: Date.now(),
                pageNum: this.currentPage,
                pageSize: this.pageSize,
                ...this.condition
            };

            if (!options.startTime) {
                options.startTime = "";
            }

            api.getMyProblemList(options)
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
            if (!this.checkData2()) {
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
        //  dialog
        querySearchAsync(queryString, cb) {
            const vm = this;
            api.getCompanyInfoList({ name: queryString }).then(res => {
                vm.companySearchList = res.data || [];

                clearTimeout(this.timeout);
                vm.timeout = setTimeout(() => {
                    cb(vm.companySearchList);
                }, 3000 * Math.random());
            });
        },
        handleSelect(item) {
            this.problem.companyName = item.name;
            this.problem.creditCode = item.creditCode;
        },
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
            const vm = this;
            if (isEmptyString(this.problem.companyName)) {
                this.$message({
                    showClose: true,
                    message: "请输入企业名称",
                    type: "error"
                });
                return false;
            }
            if (isEmptyString(this.problem.getCreditCode)) {
                const current = vm.companySearchList.find(
                    v => v.name === this.problem.companyName
                );
                if (current) {
                    vm.problem.companyName = current.name;
                    vm.problem.creditCode = current.creditCode;
                    return true;
                } else {
                    this.$message({
                        showClose: true,
                        message: "请输入正确的企业名称",
                        type: "error"
                    });
                    return false;
                }
            } else {
                return true;
            }
        },
        checkData2() {
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
        handleCurrentChange(val) {
            this.currentPage = val;
            this.fetchData();
        },
        handleWareListClicked(row) {
            if (row.superviseStatus != 1 && row.handlerStatus != 1) {
                gotoGovURL(
                    "resolveProblem.html?type=problemDetail&id=" + row.id
                );
            }
        },
        handlerSupervision(id) {
            gotoGovURL("resolveProblem.html?type=supervisionProblem&id=" + id);
        },
        handlerResolve(id) {
            gotoGovURL("resolveProblem.html?type=resolveProblem&id=" + id);
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
    }
  }
  .sel-content .el-date-editor {
    width: auto;
  }
}

.result-list {
    background-color: #fff;
}

.el-pagination.pagination {
    background-color: #fff;
    padding-bottom: 20px;
}

.el-row {
  min-width: 1073px;
    &:nth-child(3) {
        height: 658px;
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
