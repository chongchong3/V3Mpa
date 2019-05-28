<template>
    <BasePage>
        <section class="wrapper content-container-outer">
            <!-- HTML内容 -->
            <el-table :data="dataList">
                <el-table-column
                    label="序号"
                    align="center"
                    type="index"
                    width="80"
                ></el-table-column>
                <el-table-column
                    label="数据时间"
                    align="center"
                    prop="dataYear"
                    min-width="120"
                ></el-table-column>
                <el-table-column
                    label="自核期限"
                    align="center"
                    min-width="200"
                >
                    <template slot-scope="scope">
                        {{ scope.row.startTime + " ~ " + scope.row.updateTime }}
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <div>
                            <el-button
                                type="text"
                                @click="showDialogFunc(scope)"
                                >修改</el-button
                            >
                        </div>
                    </template>
                </el-table-column>
            </el-table>
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

            <el-dialog :visible.sync="showDialog" title="修改">
                <el-form :model="currentRow" ref="form">
                    <el-form-item
                        label="自核期限"
                        prop="dateRange"
                        :rules="[
                            {
                                validator: checkRange,
                                message: '请选择时间范围',
                                trigger: 'blur'
                            }
                        ]"
                    >
                        <el-date-picker
                            v-model="currentRow.dateRange"
                            type="daterange"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="yyyy-MM-dd"
                            :default-time="['00:00:00', '23:59:59']"
                        >
                        </el-date-picker>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="flex-center">
                    <el-button @click="showDialog = false">取 消</el-button>
                    <el-button type="primary" @click="modifyDateRange"
                        >确定</el-button
                    >
                </div>
            </el-dialog>
        </section>
    </BasePage>
</template>

<script>
import BasePage from "@/components/BasePage";

import { getCheckList, modifyData } from "@api/gov/limitDateSet";

export default {
    data() {
        return {
            total: 0,
            filters: {
                pageSize: 10,
                pageNum: 1
            },
            dataList: [],

            showDialog: false,
            currentRow: {
                dateRange: [],
                id: 0,
                startTime: "",
                endTime: ""
            }
        };
    },
    watch: {
        filters: {
            handler(newVal, oldVal) {
                this.getFilterData();
            },
            deep: true
        }
    },
    created() {
        this.getFilterData();
    },

    methods: {
        checkRange(rule, value, cb) {
            if (!Array.isArray(value)) {
                cb(new Error("请选择时间范围"));
            }
            if (value.length !== 2) {
                cb(new Error("请选择时间范围"));
            }
            this.currentRow.startTime = value[0];
            this.currentRow.endTime = value[1];
            cb();
        },
        showDialogFunc({ row }) {
            this.currentRow.id = row.id;
            this.showDialog = true;
        },

        getFilterData() {
            getCheckList(this.filters).then(res => {
                if (res.code == 0) {
                    this.dataList = res.data.results;
                    this.total = res.data.totalRecord;
                } else {
                    this.$message.error(res.msg);
                }
            });
        },

        modifyDateRange() {
            this.$refs["form"].validate(valid => {
                if (valid) {
                    let { dateRange, ...postData } = this.currentRow;
                    modifyData(postData).then(res => {
                        if (res.code == 0) {
                            this.$message.success(res.msg);
                        } else {
                            this.$message.error(res.msg);
                        }
                    });
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
