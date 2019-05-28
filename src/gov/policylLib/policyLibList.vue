<template>
    <div class="wrapper content-container-outer">
        <div class="flex-between">
            <div>
                <el-select
                    v-model="filters.type"
                    clearable
                    style="margin-right: 10px;"
                >
                    <el-option
                        v-for="type in typeList"
                        :key="type.name"
                        :value="type.id"
                        :label="type.name"
                        placeholder="政策类别"
                    ></el-option>
                </el-select>
                <el-select v-model="filters.department" clearable>
                    <el-option
                        v-for="dep in depList"
                        :key="dep.name"
                        :value="dep.id"
                        :label="dep.name"
                        placeholder="政策发布部门"
                    ></el-option>
                </el-select>
            </div>
            <div style="display:flex">
                <el-input
                    v-model="filters.keyword"
                    placeholder="请输入政策标题"
                    style="margin-right: 10px;"
                >
                </el-input>
                <el-button
                    icon="el-icon-circle-plus"
                    type="primary"
                    @click="$router.push('/policyUpload')"
                    >政策上传</el-button
                >
            </div>
        </div>
        <el-table
            :data="dataList"
            height="100%"
            @row-click="routerToDetail"
            style="margin-top:20px;"
        >
            <el-table-column align="center" width="80">
                <template slot-scope="scope">
                    <div class="table-tag">
                        {{ scope.row.policyType[0] }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="标题"
                min-width="400"
                show-overflow-tooltip
                prop="policyTitle"
                class="table-title"
            >
            </el-table-column>
            <el-table-column
                align="center"
                label="政策类别"
                min-width="120"
                prop="policyType"
                show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
                align="center"
                label="适用企业"
                prop="supportTarget"
                min-width="120"
                show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
                align="center"
                label="发布日期"
                min-width="100"
                show-overflow-tooltip
            >
                <template slot-scope="scope">
                    <span>
                        {{ scope.row.updateTime.split(" ")[0] }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="状态"
                min-width="80"
                show-overflow-tooltip
            >
                <template slot-scope="scope">
                    <span>
                        {{ scope.row.status === 1 ? "暂存" : "已发布" }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作" min-width="100">
                <template slot-scope="scope">
                    <el-button
                        icon="el-icon-edit"
                        type="text"
                        style="margin-right: 10px;"
                        @click.stop="
                            $router.push(
                                '/policyUpload?policyId=' + scope.row.id
                            )
                        "
                    ></el-button>
                    <el-popover
                        placement="top"
                        width="160"
                        v-model="scope.row.showPopover"
                    >
                        <p>确定删除吗？</p>
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
                            slot="reference"
                            type="text"
                            icon="el-icon-delete"
                            @click.stop=""
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
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
import {
    getDropDownList,
    getDataList,
    delPolicyById
} from "@api/gov/policylLib";
export default {
    data() {
        return {
            depList: [],
            typeList: [],
            total: 0,
            filters: {
                pageSize: 10,
                pageNum: 1,
                type: "",
                department: "",
                keyWord: ""
            },
            dataList: []
        };
    },
    created() {
        this.getDropDownList();
        this.getFilterData();
    },
    watch: {
        filters: {
            handler() {
                this.getFilterData();
            },
            deep: true
        }
    },
    methods: {
        routerToDetail(row) {
            this.$router.push("/policyDetail?policyId=" + row.id);
        },

        deleteRow({ row }) {
            delPolicyById({ id: row.id }).then(res => {
                if (res.code == 0) {
                    this.$message.success(res.msg);
                    row.showPopover = false;
                    this.getFilterData();
                } else {
                    this.$message.error(res.msg);
                }
            });
        },
        getFilterData() {
            getDataList(this.filters).then(res => {
                if (res.code == 0) {
                    res.data.results.forEach(
                        item => (item.showPopover = false)
                    );
                    this.total = res.data.totalRecord;
                    this.dataList = res.data.results;
                } else {
                    this.$message.error(res.msg);
                }
            });
        },

        getDropDownList() {
            getDropDownList().then(res => {
                if (res.code == 0) {
                    let { policyDepartment, policyType } = res.data;
                    policyDepartment.forEach(item => (item.id = item.name));

                    policyType.forEach(item => (item.id = item.name));

                    this.depList = policyDepartment;
                    this.typeList = policyType;
                } else {
                    this.$message.error(res.msg);
                }
            });
        }
    }
};
</script>

<style lang="less" scoped>
.table {
    &-tag {
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background: linear-gradient(180deg, #19b9ff, #179aff);
        color: #fff;
        font-size: 18px;
    }

    &-title {
        line-height: 20px;
        color: #455467;
        font-size: 14px;
        font-weight: bolder;
    }
    &-text {
        color: rgba(69, 84, 103, 0.5);
        font-size: 12px;
    }
}
</style>

