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
                    问题类型：
                    <el-select
                        class="select"
                        v-model="condition.problemTypeId"
                        placeholder="请选择问题类型"
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
                            v-for="(item, index) in problemSolveStatus"
                            :key="index"
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
                    <div class="sel-text">
                        <input
                            type="text"
                            class="search"
                            id="search"
                            placeholder="请输入企业名称、发起人、问题描述关键字"
                            v-model="condition.key"
                        />
                        <!--<el-input class="search" id="search" v-model="condition.key" placeholder="请输入企业名称、发起人、问题描述关键字"></el-input>-->
                    </div>
                    <span class="search-btn" @click="fetchData">搜索</span>
                </div>
            </el-col>
            <el-col :span="2" :offset="1" class="sel-btn">
                <div
                    class="right-btn"
                    id="addNewProblemBtn"
                    @click="exportOutData"
                >
                    <i class="iconfont icon-xiazai"></i> 数据导出
                </div>
            </el-col>
        </el-row>
        <el-row v-show="!noData" class="wrapper">
            <el-col :span="24" class="result-list">
                <div
                    class="wareList"
                    v-for="row in dataList"
                    :key="row.id"
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
    </BasePage>
</template>

<script>
import BasePage from "@/components/BasePage";
import * as api from "@api/gov/problemFlow";

import { toHtmlStr, gotoGovURL, isEmptyString } from "@/common/utils/index";
import { linHaiData } from "@/common/constant/constant";

export default {
    data() {
        return {
            companyLabelList: [],
            problemTypes: [],
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
            dateRange: "", //时间范围
            condition: {
                labelCode: "" /**企业类型标签*/,
                problemSolveStatus: "" /**问题状态*/,
                problemTypeId: "" /**问题类型Id*/,
                startTime: "" /**开始时间*/,
                endTime: "" /**截止时间*/,
                key: "" /**搜索关键字*/
            },
            isLoading: false,
            pageSize: 5,
            currentPage: 1,
            dataList: [],
            total: 0,
            toHtmlStr: () => {}
        };
    },
    created() {},
    mounted() {
        this.toHtmlStr = toHtmlStr;
        this.getCompanyLabelList();
        this.getProblemTypelList();
        this.fetchData();
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
                    this.problemTypes = [{ name: "全部", id: "" }, ...arr];
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
            if (!options.endTime) {
                options.endTime = "";
            }

            api.getProblemFlowList(options)
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
        /**事件处理*/
        exportOutData() {
            let {
                labelCode,
                problemTypeId,
                startTime,
                problemSolveStatus,
                key
            } = this.condition;
            window.open(
                `/gov/problem/exportProblemReportInfo?labelCode=${labelCode}&startTime=${startTime}&problemTypeId=${problemTypeId}&problemSolveStatus=${problemSolveStatus}&key=${key}`
            );
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
    
    .sel-content {
        flex: 1;
        
        label{
            min-width: 60px;
        }
    }

    .select.el-select,.el-date-editor {
        //width: 120px;
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
            //width: 225px;
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
}

.el-pagination.pagination {
    background-color: #fff;
    padding-bottom: 20px;
}

.el-row {
    //min-width: 1414px;
    margin: 0 !important;
    &:nth-child(3) {
        height: 658px;
        overflow-y: auto;
    }
}


</style>
