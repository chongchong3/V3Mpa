<template>
    <BasePage>
        <section>
            <div
                class="content-container-outer"
                id="problemWarehousePageCOuter"
            >
                <div class="sel-condition flex-box">
                    <div class="sel-content common flex-box">
                        <div class="flex-box setHeight">
                            企业类型：
                            <el-select
                                class="role-select"
                                v-model="searchCondition.labelCode"
                                placeholder="全部"
                                @change="searchList('reset')"
                            >
                                <el-option key="" value="" label="全部">
                                </el-option>
                                <el-option
                                    v-for="item in companyList"
                                    :key="item.name"
                                    :value="item.code"
                                    :label="item.name"
                                >
                                </el-option>
                            </el-select>
                        </div>
                        <div class="flex-box setHeight">
                            问题类型：
                            <el-select
                                class="role-select"
                                v-model="searchCondition.problemTypeId"
                                placeholder="全部"
                                @change="searchList('reset')"
                            >
                                <el-option key="" value="" label="全部">
                                </el-option>
                                <el-option
                                    v-for="item in problemList"
                                    :key="item.id"
                                    :value="item.id"
                                    :label="item.name"
                                >
                                </el-option>
                            </el-select>
                        </div>
                        <div
                            class="flexbox setHeights aic top-title-time flex-box"
                        >
                            <span>发起时间：</span>
                            <div class="list-info time">
                                <el-date-picker
                                    v-model="value3"
                                    type="datetimerange"
                                    value-format="yyyy-MM-dd"
                                    format="yyyy-MM-dd"
                                    size="mini"
                                    @change="setTime()"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                >
                                </el-date-picker>
                            </div>
                        </div>
                        <div class="flexbox setHeight">
                            派单状态：
                            <el-select
                                class="role-select"
                                v-model="searchCondition.problemStatus"
                                placeholder="全部"
                                @change="searchList('reset')"
                            >
                                <el-option key="" value="" label="全部">
                                </el-option>
                                <el-option
                                    v-for="item in orderStauts"
                                    :key="item.val"
                                    :value="item.val"
                                    :label="item.name"
                                >
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="sel-btns common">
                        <el-input
                            placeholder="请输入企业名称、发起人、问题描述关键字"
                            v-model="searchCondition.key"
                            clearable
                        >
                            <el-button
                                slot="append"
                                icon="el-icon-search"
                                @click="searchList('reset')"
                            ></el-button>
                        </el-input>
                    </div>
                </div>
                <div class="result-list">
                    <el-table :data="datas" style="width: 100%">
                        <el-table-column
                            label="序号"
                            type="index"
                            align="center"
                            width="180"
                        >
                        </el-table-column>
                        <el-table-column
                            label="企业名称"
                            prop="companyName"
                            align="center"
                        >
                        </el-table-column>
                        <el-table-column
                            label="问题类型"
                            prop="problemTypeName"
                            align="center"
                        >
                        </el-table-column>
                        <el-table-column
                            label="发起人"
                            prop="launchName"
                            align="center"
                        >
                        </el-table-column>
                        <el-table-column
                            label="发起时间"
                            prop="createTime"
                            align="center"
                        >
                        </el-table-column>
                        <el-table-column
                            label="派单状态"
                            prop="problemStatus"
                            :formatter="format"
                            align="center"
                        >
                        </el-table-column>

                        <el-table-column label="操作" align="center">
                            <template slot-scope="scope">
                                <el-button
                                    type="text"
                                    icon="el-icon-view"
                                    class="btn-add"
                                    @click="gotoDetail(scope.row)"
                                ></el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <el-pagination
                    background
                    layout="prev, pager, next"
                    @current-change="handleCurrentChange"
                    :current-page="pageNum"
                    :page-size="pageSize"
                    :total="total"
                >
                </el-pagination>
            </div>
        </section>
    </BasePage>
</template>

<script>
import BasePage from "@/components/BasePage";
import { linHaiData } from "@/common/constant/constant";
import {
    companyLabelList,
    problemTypeList,
    problemDepotList
} from "@api/gov/problemWarehouse";
import { gotoGovURL } from "@/common/utils/index";

export default {
    data() {
        return {
            searchCondition: {
                labelCode: null,
                problemTypeId: null,
                startTime: null,
                endTime: null,
                problemStatus: null,
                key: null
            },
            list: [],
            total: 0,
            pageNum: 1,
            pageSize: 10,
            companyList: [],
            problemList: [],
            linHaiData: linHaiData,
            orderStauts: linHaiData.orderStauts,
            value3: [],
            datas: []
        };
    },
    created() {
        this._getDoQuest();
        this.searchList();
    },
    methods: {
        handleCurrentChange(val) {
            this.pageNum = val;
            this.searchList();
        },
        _getDoQuest() {
            companyLabelList().then(res => {
                this.companyList = res.data;

                console.log(this.companyList);
            });
            problemTypeList().then(res => {
                this.problemList = res.data;
            });
        },
        searchList() {
            problemDepotList({
                pageNum: this.pageNum,
                pageSize: this.pageSize,
                ...this.searchCondition
            }).then(res => {
                this.datas = res.data.results || [];
                this.total = res.data.totalRecord;
            });
        },
        gotoDetail(row) {
            let status = row.problemStatus;
            if (status == "2") {
                //已派单
                gotoGovURL(
                    `resolveProblem.html?type=problemDetail&id=${row.id}`
                );
            } else {
                gotoGovURL(`problemDetail.html?status=${status}&id=${row.id}`);
            }
        },
        format(row) {
            let a = linHaiData.orderStauts.filter(v => {
                return v.val == row.problemStatus;
            });
            return a[0].name;
        },
        setTime() {
            this.searchCondition.startTime = this.value3[0] || "";
            this.searchCondition.endTime = this.value3[1] || "";
            this.searchList();
        }
    },
    components: {
        BasePage
    }
};
</script>

<style lang="less">
@import "../../common/less/reset.less";
// @import "./less/problemWarehouse.less";
@import "../../common/less/linHaiCommon.less";
.setHeight {
    .el-select {
        width: 100px;
        height: 30px;
    }
}
.setHeights {
    .el-select {
        width: 200px;
        height: 30px;
    }
}
.el-input__inner {
    height: 30px !important;
}
.sel-condition .sel-content > div > .list-info {
    width: 360px;
    .input {
        width: 100px;
    }
}

.sel-btns {
    width: 300px !important;
}
.result-list {
    width: 100%;
    height: 600px;
    overflow-x: hidden;
    overflow-y: auto;
}
/*.sel-condition .sel-content .el-date-editor.datePicker*/


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

.el-pagination {
    background-color: #fff;
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
