<template>
    <!--<BasePage>-->
    <div>
        <!--主页面-->
        <div class="content-container-outer">
            <div class="topTitle">
                <div class="flexbox aic ">
                    <el-input
                        placeholder="请输入企业名称"
                        v-model="filters.entName"
                    >
                        <el-button
                            slot="append"
                            icon="el-icon-search"
                            @click="_fetchData()"
                        ></el-button>
                    </el-input>
                </div>
                <div class="flexbox-top">
                    <el-button type="primary" @click="_download()"
                        >模板下载</el-button
                    >
                    <el-button
                        type="primary"
                        class="batchAdd"
                        @click="$router.push('/batchAdd')"
                        >批量添加</el-button
                    >
                    <el-button
                        type="primary"
                        @click="$router.push('/accurateAdd')"
                        class="accurateAdd"
                    >
                        精准添加
                    </el-button>
                </div>
            </div>
            <div class="annualDataImportTable">
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column label="序号" align="center" width="180">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{
                                scope.$index + 1
                            }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="企业名称"
                        prop="entName"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{
                                scope.row.entName
                            }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作时间" align="center">
                        <template slot-scope="scope">
                            <!--<span style="margin-left: 10px">{{ format(scope.row.createTime,'yyyy-MM-dd hh:mm') }}</span>-->
                            <span style="margin-left: 10px">{{
                                scope.row.createTime
                            }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-popover
                                placement="left"
                                title="提示"
                                width="200"
                            >
                                <p>确定删除吗？</p>
                                <div style="text-align: right; margin: 0">
                                    <el-button size="mini" type="text"
                                        >取消</el-button
                                    >
                                    <el-button
                                        type="primary"
                                        size="mini"
                                        @click="handleDelete(scope.row)"
                                        >确定</el-button
                                    >
                                </div>
                                <el-button
                                    type="text"
                                    icon="el-icon-delete"
                                    slot="reference"
                                ></el-button>
                            </el-popover>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <el-pagination
                background
                layout="prev, pager, next"
                @current-change="handleCurrentChange"
                :current-page="filters.pageNum"
                :page-size="filters.pageSize"
                :total="total"
            >
            </el-pagination>
        </div>
    </div>
    <!--</BasePage>-->
</template>

<script>
import BasePage from "@/components/BasePage";

import { getLabel, deleteEntLable } from "@api/gov/typeLabelDetail";
import { getUrlParam, format } from "@/common/utils/url";

export default {
    data() {
        return {
            input10: "",
            filters: {
                entName: "",
                pageSize: 9,
                pageNum: 1,
                type: 0,
                name: ""
            },
            total: 0,
            tableData: []
        };
    },
    created() {
        this.type = getUrlParam("type");
        this.name = getUrlParam("num");

        this._fetchData();
    },

    methods: {
        handleDelete(row) {
            deleteEntLable({ id: row.id }).then(res => {
                if (res.code == "0000") {
                    this.$message.success(res.msg);
                    this._fetchData();
                } else {
                    this.$message.error(res.msg);
                }
            });
        },
        handleCurrentChange(val) {
            this.filters.pageNum = val;
            this._fetchData();
        },
        //页面显示
        _fetchData() {
            getLabel(this.filters).then(res => {
                if ((res.code = "0000")) {
                    this.tableData = res.data.results;
                    this.total = res.data.totalRecord;
                } else {
                    this.$message.error(res.msg || "查询错误");
                }
            });
        },
        //页面显示
        _download() {
            window.open("/gov/import/downloadModel");
        }
    },
    components: {
        BasePage
    }
};
</script>

<style lang="less" scoped>
@import "../../common/less/reset.less";
@import "./less/typeLabelDetail";
.topTitle {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}
</style>
