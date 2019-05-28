<template>
    <BasePage>
        <div id="appealRecordPageOuter">
            <div id="appealRecordPageCOuter">
                <section class="search-common">
                    <el-row :gutter="20" style="width: 100%;">
                        <el-col :span="16">
                            <div class="select-items common">
                                审核状态：
                                <el-select
                                    v-model="searchCondition.status"
                                    clearable
                                    placeholder="请选择"
                                    @change="changeCondition"
                                >
                                    <el-option
                                        v-for="item in appealRecordList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                                申诉类型：
                                <el-select
                                    v-model="searchCondition.type"
                                    clearable
                                    placeholder="请选择"
                                    @change="changeCondition"
                                >
                                    <el-option
                                        v-for="item in appealList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                                <el-date-picker
                                    v-model="value1"
                                    type="daterange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    @change="changeTime"
                                    value-format="yyyy-MM-dd"
                                    end-placeholder="结束日期"
                                >
                                </el-date-picker>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="search-text common">
                                <input
                                    type="text"
                                    class="search"
                                    id="search"
                                    v-model="searchCondition.entNameLike"
                                    placeholder="请输入企业名称、法定代表人、公司地址"
                                />
                                <div class="btn-search" @click="handerSearch">
                                    搜索
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </section>
                <section v-show="!noData">
                    <el-table
                        :data="tableData"
                        style="width: 100%"
                        class="search-list"
                        id="searchCheckList"
                        height="400"
                    >
                        <el-table-column label="序号" width="80" type="index">
                        </el-table-column>
                        <el-table-column label="数据年份" width="120">
                            <template slot-scope="scope">
                                <span>{{ scope.row.dataYear }}年</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="企业名称" min-width="160">
                            <template slot-scope="scope">
                                <span
                                    @click="goToEntFile(scope.row.entName)"
                                    class="ent-name"
                                    >{{ scope.row.entName }}</span
                                >
                            </template>
                        </el-table-column>
                        <el-table-column label="申诉时间" min-width="160">
                            <template slot-scope="scope">
                                <span>{{
                                    scope.row.updateTime ||
                                        scope.row.createTime ||
                                        ""
                                }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="申诉类型" width="120">
                            <template slot-scope="scope">
                                <span>{{
                                    scope.row.type | getAppealType
                                }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="审核状态" width="120">
                            <template slot-scope="scope">
                                <span>{{ scope.row.status | getStatus }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <span
                                    v-if="
                                        scope.row.status == 1 ||
                                            scope.row.status == 3
                                    "
                                    style="color:#ccc"
                                    >查看</span
                                >
                                <span
                                    v-else
                                    @click="
                                        watchRecord(scope.$index, scope.row)
                                    "
                                    style="color:#5C7CEC;cursor: pointer;"
                                    >查看</span
                                >
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination
                        background
                        layout="sizes, prev, pager, next ,jumper"
                        :total="totalRecord"
                        :page-sizes="[10, 20, 30, 40]"
                        @current-change="handleCurrentChange"
                        @size-change="handleSizeChange"
                    ></el-pagination>
                </section>
                <div class="noData" v-show="noData">
                    <div class="noData-img"></div>
                    <div class="noData-desc">
                        <p>暂无数据</p>
                        <p>Have no Data</p>
                    </div>
                </div>
            </div>
        </div>
    </BasePage>
</template>

<script>
import BasePage from "@/components/BasePage";
import { getAppealList } from "@api/gov/appealRecord";
import { nowInDateBetwen, gotoGovURL } from "@/common/utils/index";
import { appealTypeList, statusdata } from "@/common/constant/constant";

export default {
    data() {
        return {
            value1: "",
            searchCondition: {
                entNameLike: null,
                status: 2,
                startTime: null,
                endTime: null,
                type: ""
            },
            pageSize: 10,
            pageNum: 1,
            tableData: [],
            totalRecord: 0,
            appealList: [
                {
                    label: "全部",
                    value: ""
                },
                ...appealTypeList
            ],
            appealRecordList: [
                {
                    label: "全部",
                    value: ""
                },
                ...statusdata.appealRecordList
            ]
        };
    },
    created() {},
    mounted() {
        this.getList();
    },
    computed: {
        isEntFile() {
            return this.$store.state.isEntFile;
        },
        noData() {
            return this.tableData.length === 0;
        }
    },
    filters: {
        getAppealType(type) {
            const types = appealTypeList.find((v, i, arr) => {
                return v.value == type;
            });
            return types.label || "";
        },
        getStatus(sta) {
            let status = statusdata.appealRecordList.find((v, i, arr) => {
                return v.value == sta;
            });
            return status ? status.label : "";
        }
    },
    methods: {
        getList() {
            const params = Object.assign({}, this.searchCondition, {
                pageSize: this.pageSize,
                pageNum: this.pageNum
            });
            getAppealList(params).then(res => {
                let data = res.data;
                if (res.code == "0000") {
                    this.tableData = data.results;
                    this.totalRecord = data.totalRecord;
                }
            });
        },
        goToEntFile(entName) {
            if (!this.isEntFile) {
                this.$message({
                    message:
                        "当前账号没有设置企业档案权限，不可点击跳转到企业档案中",
                    type: "warning"
                });
            } else {
                gotoGovURL(`entDetail.html?entName=${entName}`);
            }
        },
        changeTime(val) {
            this.searchCondition.startTime = val[0];
            this.searchCondition.endTime = val[1];
            this.getList();
        },
        changeCondition() {
            this.getList();
        },
        handerSearch() {
            this.getList();
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.getList();
        },
        handleCurrentChange(val) {
            this.pageNum = val;
            this.getList();
        },
        watchRecord(index, row) {
            let flag = nowInDateBetwen(row.startTime, row.endTime);
            if (!flag) {
                this.$message({
                    message: "核对期限已过，不能进行操作",
                    type: "warning"
                });
            } else {
                let { creditCode, dataYear, entName, type, userType } = row;
                gotoGovURL(
                    `companyPaperDetail.html?action=appealRecord&creditCode=${creditCode}&dataYear=${dataYear}&entName=${entName}&dataType=${type}&userType=${userType}`
                );
            }
        }
    },
    components: {
        BasePage
    }
};
</script>

<style lang="less">
@import "../../common/less/reset.less";
@import "../../common/less/base";
@import "../../common/less/paperCommon";

#appealRecordPageOuter {
    padding-top: 10px;
    #appealRecordPageCOuter {
        //min-height: 700px;
        .bg-com;
        .select-items {
            & > div {
                border: none;
                width: 110px;
            }
        }
    }
}

.el-table td,
.el-table th.is-leaf {
    text-align: center;
}
.el-pagination {
    text-align: center;
    /*margin-top: 25px !important;*/
}
.el-table__body-wrapper{
    overflow: unset !important;
    overflow-y: scroll !important;
}
.el-pagination.is-background .el-pager li:not(.disabled).active {
    background: @hoverColor;
}
.el-date-editor.el-range-editor.el-input__inner.el-date-editor--daterange {
    width: 360px !important;
    border: 1px solid #e3eaf1 !important;
    .el-range__icon,
    .el-range__close-icon,
    .el-range-separator {
        height: 32px;
    }
}
.el-select {
    .el-input__inner,
    .el-input__icon {
        height: 32px;
        line-height: 32px;
    }
}
.el-select-dropdown__item {
    text-align: center;
}

.el-date-editor .el-range-separator {
    width: auto;
}
</style>
