<template>
    <BasePage>
        <section class="content-container-outer content-container">
            <div class="content-title">
                <!--<div class="select">开始时间:&nbsp;<input class="start-date"/></div>-->
                <!--<div class="select">结束时间:&nbsp;<input class="end-date"/></div>-->
                <div class="select">
                    <el-date-picker
                        v-model="value3"
                        type="datetimerange"
                        value-format="yyyy-MM-dd"
                        format="yyyy-MM-dd"
                        size="large"
                        @change="setTime"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                    >
                    </el-date-picker>
                </div>
                <div class="select select1">
                    操作人:
                    <el-select
                        class="role-select"
                        v-model="condition.department"
                        placeholder="全部"
                        @change="getDatas('reset')"
                    >
                        <el-option
                            v-for="item in options"
                            :key="item"
                            :value="item"
                            :label="item"
                        >
                        </el-option>
                    </el-select>
                </div>
                <div class="searchs">
                    <el-input
                        placeholder="请输入企业名称"
                        v-model="condition.entNameLike"
                        clearable
                    >
                        <el-button
                            slot="append"
                            icon="el-icon-search"
                            @click="getDatas('reset')"
                        ></el-button>
                    </el-input>
                </div>
            </div>
            <div class="table">
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column
                        type="index"
                        label="序号"
                        align="center"
                        width="50"
                    >
                    </el-table-column>
                    <el-table-column
                        property="dataYear"
                        align="center"
                        label="数据年份"
                    >
                    </el-table-column>
                    <el-table-column
                        property="entName"
                        align="center"
                        label="企业名称"
                    >
                    </el-table-column>
                    <el-table-column
                        property="editField"
                        align="center"
                        label="修改指标"
                    >
                    </el-table-column>
                    <el-table-column
                        property="beforeEdit"
                        align="center"
                        label="修改前"
                    >
                    </el-table-column>
                    <el-table-column
                        property="afterEdit"
                        align="center"
                        label="修改后"
                    >
                    </el-table-column>
                    <el-table-column
                        property="department"
                        align="center"
                        label="操作人"
                    >
                    </el-table-column>
                    <el-table-column
                        property="createTime"
                        align="center"
                        label="修改时间"
                    >
                    </el-table-column>
                </el-table>
                <el-pagination
                    background
                    layout="prev, pager, next"
                    @current-change="handleCurrentChange"
                    :current-page="condition.pageNum"
                    :page-size="condition.pageSize"
                    :total="total"
                >
                </el-pagination>
            </div>
        </section>
    </BasePage>
</template>

<script>
import BasePage from "@/components/BasePage";

import { findByPage } from "@api/gov/modifyRecord";

export default {
    data() {
        return {
            condition: {
                startTime: "",
                endTime: "",
                department: "",
                entNameLike: "",
                pageNum: 1,
                pageSize: 10
            },
            tableData: [],
            total: 0,
            options: [
                "全部",
                "税务局",
                "国土局",
                "统计局",
                "环保局",
                "供电公司",
                "水利局"
            ],
            value: "",
            value3: []
        };
    },
    created() {
        this.getDatas();
    },

    methods: {
        handleCurrentChange(val) {
            this.condition.pageNum = val;
            this.getDatas();
        },
        getDatas(type) {
            if (type == "reset") {
                this.condition.pageNum = 1;
            }
            findByPage(this.condition).then(res => {
                if (res.code == "0000") {
                    this.tableData = res.data.results || [];
                    this.total = res.data.totalRecord;
                } else {
                    this.$message.error(res.msg);
                }
            });
        },
        setTime() {
            this.condition.startTime = this.value3[0] || "";
            this.condition.endTime = this.value3[1] || "";
            this.getDatas("reset");
        }
    },
    components: {
        BasePage
    }
};
</script>

<style lang="less" >
@import "../../common/less/reset.less";
.table {
    margin-top: 20px;
}
.searchs {
    margin-left: 20px;
}

//#modifyRecordPageOuter{
//  display: flex;
//  flex-direction: column;
//}
.content-container {
    flex: 1;
    background: #fff;
    .content-title {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        height: 60px;
        padding: 0 20px;
        border-bottom: 1px solid #ebebeb;

        .select {
            display: flex;
            align-items: center;
            color: #666;
            margin-left: 20px;
            .start-date,
            .end-date,
            .role-select {
                width: 120px;
                height: 32px;
                line-height: 25px;
                border-radius: 2px;
                background-color: #fff;
                //border: 1px solid #ccc;
                //margin-right: 20px;
                //margin-left: 15px;
            }
            .start-date,
            .end-date {
                text-indent: 1em;
            }
            .date-select {
                text-indent: 1em;
                height: 32px;
                width: 120px;
                //  //line-height: 35px;
                border-radius: 2px;
                border: 1px solid #ccc;
                //  margin-right: 20px;
                //  margin-left: 15px;
            }
        }
        .search {
            width: 450px;
            height: 34px;
            display: flex;
            margin-left: 20px;
            input {
                width: 350px;
                height: 34px;
                border: 1px solid #ccc;
                border-right-style: none;
                outline: none;
                text-indent: 1em;
            }
            .btn-search {
                width: 100px;
                height: 34px;
                line-height: 34px;
                background: #4465e7;
                border-bottom-right-radius: 2px;
                border-top-right-radius: 2px;
                color: #fff;
                cursor: pointer;
                text-align: center;
                letter-spacing: 6px;
                font-size: 15px;
            }
        }
    }
    .table {
        margin-top: 20px;
        thead tr {
            height: 20px;
            background: #f2f4f7;
        }
        .table-btn {
            text-wrap: none;
            a {
                cursor: pointer;
                color: #4465e7;
                &:hover {
                    text-decoration: none;
                }
            }
            .btn-edit {
                margin-right: 15px;
            }
        }
    }
}
</style>
