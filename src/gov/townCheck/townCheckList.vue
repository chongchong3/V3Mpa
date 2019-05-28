<template>
    <div id="townCheckPageOuter">
        <div id="townCheckPageCOuter">
            <section class="search-common">
                <el-row :gutter="20" style="width: 100%;">
                    <el-col :span="16">
                        <div class="select-items common">
                            <!--<div>-->
                            数据时间：
                            <el-select
                                class="select"
                                v-model="year"
                                placeholder="请选择"
                                @change="fetchData"
                            >
                                <el-option
                                    v-for="item in dataTime"
                                    :key="item.val"
                                    :label="item.name"
                                    :value="item.val"
                                >
                                </el-option>
                            </el-select>
                            <!--</div>-->
                            <!--<div>-->
                            所属乡镇：
                            <el-select
                                class="select"
                                v-model="town"
                                placeholder="请选择"
                                @change="fetchData"
                            >
                                <el-option
                                    v-for="item in townDatas"
                                    :key="item"
                                    :label="item"
                                    :value="item"
                                >
                                </el-option>
                            </el-select>
                            <!--</div>-->
                            <!--<div>-->
                            审核状态：
                            <el-select
                                class="select"
                                v-model="status"
                                placeholder="请选择"
                                @change="fetchData"
                            >
                                <el-option
                                    v-for="(item, index) in checkProgress"
                                    :key="item"
                                    :label="item"
                                    :value="index === 0 ? '' : index"
                                >
                                </el-option>
                            </el-select>
                            <!--</div>-->
                            <!--<div>-->
                            数据异常：
                            <el-select
                                class="select"
                                v-model="dataErro"
                                placeholder="请选择"
                                @change="fetchData"
                            >
                                <el-option
                                    v-for="item in errors"
                                    :key="item.val"
                                    :label="item.name"
                                    :value="item.val"
                                >
                                </el-option>
                            </el-select>
                        </div>
                        <!--</div>-->
                    </el-col>
                    <el-col :span="8">
                        <div class="search-text common">
                            <input
                                type="text"
                                v-model="entNameLike"
                                class="search"
                                id="search"
                                placeholder="请输入企业名称、法定代表人、公司地址进行查询"
                            />

                            <div class="btn-search" @click="fetchData">
                                搜索
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </section>
            <div class="search-list" v-show="!noData">
                <el-table
                    :data="dataList"
                    :row-key="keyForRow"
                    height="410"
                    style="width: 100%"
                >
                    <el-table-column
                        label="序号"
                        type="index"
                        :index="indexMethod"
                        width="80"
                    ></el-table-column>
                    <el-table-column
                        prop="entName"
                        label="企业名称"
                        min-width="200"
                    >
                        <template slot-scope="scope">
                            <div
                                class="ent-name"
                                style="cursor: pointer"
                                @click="handleEntNameClick(scope.row)"
                            >
                                {{ toHtmlStr(scope.row.entName, "-") }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="town"
                        label="所属乡镇"
                        min-width="160"
                    ></el-table-column>
                    <el-table-column
                        prop="dataYear"
                        label="数据时间"
                        width="120"
                    >
                        <template slot-scope="scope">
                            {{
                                scope.row.dataYear
                                    ? scope.row.dataYear + "年"
                                    : "-"
                            }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="dataYear"
                        label="有无异常"
                        width="180"
                    >
                        <template slot-scope="scope">
                            {{
                                scope.row.dataErro == 0
                                    ? "无"
                                    : scope.row.dataErro == 1
                                    ? "有"
                                    : ""
                            }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="townStatus" label="审核状态" width="120">
                        <template slot-scope="scope">
                            {{ townCheckText[scope.row.townStatus] }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="status" label="操作" width="120">
                        <template slot-scope="scope">
                            <el-button
                                @click="handleViewDetailClick(scope.row)"
                                type="text"
                                size="small"
                                style="color: #5C7CEC;"
                                >查看</el-button
                            >
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    background
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="pageSize"
                    layout="total, prev, pager, next, jumper"
                    :total="total"
                >
                </el-pagination>
            </div>
            <div class="noData" v-show="noData">
                <div class="noData-img"></div>
                <div class="noData-desc">
                    <p>暂无数据</p>
                    <p>Have no Message</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import "./less/townCheck.less";

import * as api from "@api/gov/checkProgress";

import {
    toHtmlStr,
    gotoGovURL,
    nowInDateBetwen
} from "@/common/utils/index";
import { dataTime, statusdata } from "@/common/constant/constant";

// import { gotoGovURL } from "../../common/utils/util";
// import toHtmlStr from "@/common/utils/toHtmlStr.js";
// import { func } from "../../common/common";

export default {
    name: "townCheckList",
    data: function() {
        return {
            year: "",
            town: "全部",
            status: "全部",
            entNameLike: "",
            dataErro: "",
            townDatas: ["全部"],
            checkProgress: ["全部", ...statusdata.townCheck],
            townCheckText:statusdata.townCheckText,
            dataTime: [{ name: "全部", val: "" }, ...dataTime],
            errors: [
                { name: "全部", val: "" },
                { name: "是", val: 1 },
                { name: "否", val: 0 }
            ],
            total: 0,
            pageSize: 10,
            currentPage: 1,
            dataList: [],
            toHtmlStr: () => {}
        };
    },
    mounted() {
        this.town = this.$route.query.town || "全部";
        this.year = this.$route.query.year || "";
        this.toHtmlStr = toHtmlStr;
        this.getTownList();
        this.fetchData();
    },
    computed: {
        noData: function() {
            return this.dataList.length === 0;
        },
        isEntFile() {
            return this.$store.state.isEntFile;
        }
    },
    methods: {
        getTownList: function() {
            api.getTownList()
                .then(res => {
                    if (res.code === "0000") {
                        this.townDatas = ["全部", ...res.data] || ["全部"];
                    }
                })
                .catch(reason => {});
        },
        fetchData: function() {
            const params = {
                entNameLike: this.entNameLike,
                dataYear: this.year,
                status: this.status == "全部" ? "" : this.status,
                town: this.town == "全部" ? "" : this.town,
                dataErro: this.dataErro,
                pageSize: this.pageSize,
                pageNum: this.currentPage
            };

            api.findByPage(params)
                .then(res => {
                    if (res.code === "0000") {
                        this.dataList = res.data.results || [];
                        this.total = res.data.totalRecord;
                    }
                })
                .catch(reason => {
                    this.dataList = [];
                });
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.fetchData();
        },
        handleEntNameClick(row) {
            if (this.isEntFile) {
                gotoGovURL(`entDetail.html?entName=${row.entName}`);
            } else {
                this.$message({
                    title: "警告提示",
                    message:
                        "当前账号没有设置企业档案权限，不可点击跳转到企业档案中",
                    type: "warning"
                });
            }
        },
        indexMethod(index) {
            return (this.currentPage - 1) * this.pageSize + index + 1;
        },
        keyForRow(row) {
            return row.entNameLike;
        },
        handleViewDetailClick(row) {
//            console.log(row);

            let start = row.startTime;
            let end = row.endTime;
            let flag = nowInDateBetwen(start, end);

            if (!flag) {
                //超过期限
                this.$message({
                    title: "警告提示",
                    message: "警核对期限已过，不能进行操作告内容",
                    type: "warning"
                });
            } else {
                gotoGovURL(
                    `companyPaperDetail.html?action=townCheck&creditCode=${
                        row.creditCode
                    }&dataYear=${row.dataYear}&entName=${
                        row.entName
                    }&townStatus=${row.townStatus}`
                );
            }
        },
        backToPrevPage() {
            this.$router.go(-1);
        }
    }
};
</script>

<style lang="less" scoped>
</style>
