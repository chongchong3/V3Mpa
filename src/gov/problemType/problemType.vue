<template>
    <BasePage>
        <div class="wrapper content-container-outer">
            <div class="flex-end">
                <el-button type="primary" @click="showDialogFunc('add')"
                    >新增类型</el-button
                >
            </div>
            <!-- HTML内容 -->
            <el-table :data="dataList" height="100%" style="margin-top:20px;">
                <el-table-column
                    label="序号"
                    align="center"
                    type="index"
                    width="80"
                ></el-table-column>
                <el-table-column
                    label="问题类型"
                    align="center"
                    prop="name"
                    min-width="200"
                ></el-table-column>
                <el-table-column label="操作" align="center" min-width="80">
                    <template slot-scope="scope">
                        <el-button
                            icon="el-icon-edit"
                            type="text"
                            @click="showDialogFunc('edit', scope)"
                            style="margin-right:10px;"
                        ></el-button>
                        <el-popover
                            placement="top"
                            width="160"
                            v-model="scope.row.showPopover"
                        >
                            <p>确定删除？</p>
                            <div style="text-align: right; margin: 0">
                                <el-button
                                    size="mini"
                                    type="text"
                                    @click="scope.row.showPopover = false"
                                    >取消</el-button
                                >
                                <el-button
                                    type="primary"
                                    size="mini"
                                    @click="deleteRow(scope)"
                                    >确定</el-button
                                >
                            </div>
                            <el-button
                                type="text"
                                slot="reference"
                                icon="el-icon-delete"
                            ></el-button>
                        </el-popover>
                    </template> </el-table-column
            ></el-table>
            <div class="flex-end">
                <el-pagination
                    background
                    :page-size="filters.pageSize"
                    :current-page.sync="filters.pageNum"
                    layout="prev, pager, next"
                    :total="total"
                >
                </el-pagination>
            </div>

            <el-dialog :title="dialogTit" :visible.sync="showDialog">
                <el-form :model="currentRow" :rules="rules" inline>
                    <el-form-item label="问题类型">
                        <el-input v-model="currentRow.name"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="showDialog = false">取 消</el-button>
                    <el-button type="primary" @click="submitDialog"
                        >确 定</el-button
                    >
                </span>
            </el-dialog>
        </div>
    </BasePage>
</template>

<script>
import BasePage from "@/components/BasePage";

import {
    delProblemType,
    modifyProblemType,
    addProblemType,
    getProblemList
} from "@api/gov/problemType";

export default {
    data() {
        return {
            total: 0,
            filters: {
                pageNum: 1,
                pageSize: 10
            },

            rules: {
                name: [
                    {
                        required: true,
                        trigger: "blur",
                        message: "请输入问题类型"
                    }
                ]
            },

            showDialog: false,
            dialogTit: "",

            // [add, edit]
            dialogType: "",
            currentRow: {},
            dataList: []
        };
    },
    watch: {
        filters: {
            handler(newVal){
                this.getFilterList();
            },
            deep:true
        }
    },
    created() {
        this.getFilterList();
    },

    methods: {
        showDialogFunc(type, scope) {
            if (type == "add") {
                this.currentRow = {};
                this.dialogTit = "新增问题类型";
            } else if (type == "edit") {
                let { row } = scope;
                this.currentRow = { id: row.id, name: row.name };
                this.dialogTit = "修改问题类型";
            }

            this.dialogType = type;
            this.showDialog = true;
        },

        submitDialog() {
            let reqFunc;
            switch (this.dialogType) {
                case "add":
                    reqFunc = addProblemType;
                    break;
                case "edit":
                    reqFunc = modifyProblemType;
                    break;
            }

            reqFunc(this.currentRow).then(res => {
                if (res.code == 0) {
                    this.$message.success(res.msg);
                    this.getFilterList();
                    this.showDialog = false;
                } else {
                    this.$message.error(res.msg);
                }
            });
        },

        deleteRow({ row }) {
            delProblemType({ id: row.id }).then(res => {
                if (res.code == 0) {
                    this.$message.success(res.msg);
                    this.getFilterList();
                    row.showPopover = false;
                } else {
                    this.$message.error(res.msg);
                }
            });
        },

        getFilterList() {
            getProblemList(this.filters).then(res => {
                if (res.code == 0) {
                    res.data.results.forEach(item => {
                        item.showPopover = false;
                    });
                    this.dataList = res.data.results;
                    this.total = res.data.totalRecord;
                } else {
                    this.$message.error(res.msg);
                }
            });
        }
    },
    components: {
        BasePage
    }
};
</script>

<style lang="less" scoped>
@import "../../common/less/reset.less";
</style>
