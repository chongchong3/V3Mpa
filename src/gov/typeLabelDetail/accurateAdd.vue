<template>
    <div>
        <!--精准添加-->
        <div class="content-container-outer">
            <el-input
                placeholder="请输入企业名称、法定代理人"
                v-model="common.keyName"
                clearable
            >
                <el-button
                    slot="append"
                    icon="el-icon-search"
                    @click="_getAccurateData()"
                ></el-button>
            </el-input>
            <div class="tableShow" v-if="show">
                <el-table :data="datas" style="width: 100%">
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
                    <el-table-column label="法人" prop="entName" align="center">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{
                                scope.row.frName
                            }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="注册地址"
                        prop="entName"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{
                                scope.row.address
                            }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button
                                v-if="scope.row.check == 0"
                                type="text"
                                icon="el-icon-circle-plus"
                                class="btn-add"
                                @click="_accurateAdd(scope.row)"
                            ></el-button>
                            <el-button
                                v-else
                                type="text"
                                icon="el-icon-circle-plus"
                                class="btn-alAdd"
                                @click="gotoUrl(scope.row.entName)"
                            ></el-button>
                            <!--:class="scope.row.check==0?'btn-add':'btn-alAdd'"-->
                        </template>
                    </el-table-column>
                </el-table>
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
        </div>
    </div>
</template>

<script>
import BasePage from "@/components/BasePage";

import { getEntData, insertEnt } from "@api/gov/typeLabelDetail";

import { getUrlParam } from "@/common/utils/index";

export default {
    data() {
        return {
            input10: "",
            common: {
                keyName: ""
            },
            pageSize: 10,
            pageNum: 1,
            type: "",
            name: "",
            total: 0,
            show: false,
            datas: [],
            check1: "btn-alAdd",
            check0: "btn-add"
        };
    },
    created() {
        this.type = getUrlParam("type");
        this.name = getUrlParam("num");
    },

    methods: {
        handleCurrentChange(val) {
            this.pageNum = val;
            this._getAccurateData();
        },
        //列表显示
        _getAccurateData() {
            if (!this.common.keyName.length) {
                this.$message.warning("请输入企业名称、法定代理人");
            } else {
                let datas = {
                    pageNum: this.pageNum,
                    pageSize: 10,
                    key: this.common.keyName,
                    name: this.name,
                    type: this.type
                };
                getEntData(datas).then(res => {
                    if (res.code == "0000") {
                        this.datas = res.data.results || [];
                        this.total = res.data.totalRecord;

                        this.show = true;
                    } else {
                        this.$message.error(res.msg);
                    }
                });
            }
        },
        //精准添加
        _accurateAdd(row) {
            console.log(row);
            let insert = {
                id: row.id,
                entName: row.entName,
                type: this.type,
                name: this.name,
                creditCode: row.creditCode
            };
            insertEnt(insert).then(res => {
                if (res.code == "0000") {
                    this._getAccurateData();
                } else {
                    this.$message.error(res.msg);
                }
            });
        },
        //
        gotoUrl(entName) {
            window.open(`entDetail.html?entName=${entName}`);
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
.el-input {
    width: 300px;
}
.el-input--mini .el-input__inner {
    height: 40px;
    line-height: 40px;
}
.tableShow {
    margin-top: 20px;
}
.btn-alAdd.el-button--text {
    color: #9ba7b6 !important;
}
.btn-add.el-button--text {
    color: #4465e7;
}
</style>
