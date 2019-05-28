<template>
    <div class="wrapper content-container-outer">
        <!-- HTML内容 -->
        <section class="flex-between">
            <el-input
                placeholder="请输入企业名称"
                style="width:300px;"
                v-model.lazy="filters.key"
            >
                <el-button
                    slot="append"
                    icon="el-icon-search"
                    @click="getFilterData()"
                ></el-button>
            </el-input>
            <div>
                <el-button type="primary" @click="downloadTemplate"
                    >模板下载</el-button
                >

                <el-button
                    type="primary"
                    style="display:inline-block;margin:0 10px;"
                    @click="$router.push('/uploadList')"
                    >批量添加</el-button
                >

                <el-button
                    type="primary"
                    @click="$router.push('/addTable?type=3')"
                    >精准添加</el-button
                >
            </div>
        </section>

        <el-table :data="labelList" height="100%" style="margin-top:20px;">
            <el-table-column
                label="序号"
                type="index"
                width="50"
                align="center"
            ></el-table-column>
            <el-table-column
                label="企业名称"
                prop="entName"
                min-width="300"
                align="center"
            ></el-table-column>
            <el-table-column
                label="关注领导"
                prop="username"
                min-width="180"
                align="center"
            ></el-table-column>
            <el-table-column label="操作" align="center" min-width="120">
                <template slot-scope="scope">
                    <el-button
                        type="text"
                        icon="el-icon-edit-outline"
                        @click="showDialogFunc(scope, 'showEidtDialog')"
                        style="margin-right: 20px;"
                    ></el-button>

                    <el-popover placement="top-start" title="提示" width="200">
                        <p>确定删除吗？</p>
                        <div style="text-align: right; margin: 0">
                            <el-button size="mini" type="text">取消</el-button>
                            <el-button
                                type="primary"
                                size="mini"
                                @click="deleteRow(scope)"
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
        <div class="flex-center">
            <el-pagination
                background
                layout="prev, pager, next"
                :current-page.sync="filters.pageNum"
                :page-size="filters.pageSize"
                :total="total"
            ></el-pagination>
        </div>

        <el-dialog title="关注部门" :visible.sync="showEidtDialog">
            <el-form>
                <el-form-item label="关注领导">
                    <el-select v-model="editForm.userId">
                        <el-option
                            v-for="leader in leaderList"
                            :key="leader.id"
                            :value="leader.id"
                            :label="leader.name"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showEidtDialog = false">取消</el-button>
                <el-button type="primary" @click="updateLabel">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {
    getImportList,
    importLabel,
    getLeader,
    updateLabel,
    deleteLabel
} from "@api/gov/componyLabel";

export default {
    data() {
        return {
            filters: {
                key: "",
                pageSize: 10,
                pageNum: 1
            },
            total: 0,
            labelList: [],
            fileList: [],
            leaderList: [],

            showEidtDialog: false,
            editForm: {
                userId: ""
            },

            currentRow: {}
        };
    },
    created() {
        this.getFilterData();
    },

    methods: {
        deleteRow({ row, $index }) {
            deleteLabel({ id: row.id }).then(res => {
                if (res.code == 0) {
                    this.$message.success("删除成功");
                    this.labelList.splice($index, 1);
                } else {
                    this.$message.error(res.msg);
                }
            });
        },

        updateLabel() {
            this.editForm.id = this.currentRow.id;
            updateLabel(this.editForm).then(res => {
                if (res.code == 0) {
                    this.$message.success(res.msg);
                    this.showEidtDialog = false;
                    this.currentRow.username = this.editForm.name;
                    this.getFilterData();
                } else {
                    this.$message.error(res.msg);
                }
            });
        },

        getLeaderList() {
            !this.leaderList.length &&
                getLeader().then(res => {
                    if (res.code == 0) {
                        this.leaderList = res.data;
                    } else {
                        this.$message.error(res.msg);
                    }
                });
        },

        showDialogFunc({ row }, dialogName) {
            this[dialogName] = true;
            this.currentRow = row;
            switch (dialogName) {
                case "showEidtDialog":
                    this.getLeaderList();
                    this.editForm.userId = row.userId;
                    break;
            }
        },

        downloadTemplate() {
            location.href = "import/downloadAttention";
        },

        getFilterData() {
            getImportList(this.filters).then(res => {
                if (res.code == 0) {
                    this.labelList = res.data.results;
                } else {
                    this.$message.error(res.msg);
                }
            });
        }
    }
};
</script>

<style lang="less">
.full_content {
    height: 100%;
}
</style>