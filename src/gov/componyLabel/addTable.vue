<template>
    <div class="content-container-outer wrapper">
        <div>
            <el-input
                v-model.lazy="filters.key"
                style="width:400px; text-align:left"
                placeholder="请输入企业名称、法定代理人"
            >
                <el-button
                    slot="append"
                    icon="el-icon-search"
                    @click="getEntList()"
                ></el-button>
            </el-input>
        </div>
        <template v-if="show">
            <el-table :data="entList">
                <el-table-column
                    label="序号"
                    align="center"
                    type="index"
                    width="80"
                ></el-table-column>
                <el-table-column
                    label="企业名称"
                    show-overflow-tooltip
                    align="center"
                    min-width="200"
                    prop="entName"
                ></el-table-column>
                <el-table-column
                    label="法人"
                    align="center"
                    min-width="100"
                    prop="frName"
                ></el-table-column>
                <el-table-column
                    label="注册地址"
                    show-overflow-tooltip
                    align="center"
                    min-width="200"
                    prop="address"
                ></el-table-column>
                <el-table-column
                    label="统一社会信用代码"
                    show-overflow-tooltip
                    align="center"
                    min-width="200"
                    prop="creditCode"
                ></el-table-column>
                <el-table-column label="操作" align="center" min-width="200">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-circle-plus"
                            :style="{
                                color: scope.row.check ? '#ccc' : '#409EFF'
                            }"
                            @click="addEnt(scope)"
                        ></el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div class="flex-center" style="margin-bottom: 10px;">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :current-page.sync="filters.pageNum"
                    :page-size="filters.pageSize"
                    :total="total"
                ></el-pagination>
            </div>
            <div class="flex-center">
                <el-button type="primary" @click="$router.back()"
                    >返回</el-button
                >
            </div>
        </template>
    </div>
</template>

<script>
import { getEntData, insertLabel2513 } from "@api/gov/componyLabel";
import { gotoGovURL } from "@/common/utils/index";
export default {
    data() {
        return {
            total: 0,
            filters: {
                pageSize: 10,
                paegNum: 1,
                key: "",
                name: "",
                type: -1
            },
            entList: [],
            show: false
        };
    },
    // watch: {
    //     filters: {
    //         handler(newVal) {
    //             this.getEntList();
    //         },
    //         deep: true
    //     }
    // },
    created() {
        this.filters.type = this.$route.query.type;
    },
    methods: {
        addEnt({ row }) {
            if (!row.check) {
                insertLabel2513({
                    id: row.id,
                    entName: row.entName,
                    creditCode: row.creditCode
                }).then(res => {
                    if (res.code == 0) {
                        this.$message.success("添加成功");
                        row.check = !row.check;
                    } else {
                        this.$message.error(res.msg);
                    }
                });
            } else {
                gotoGovURL("entDetail.html?entName=" + row.entName);
            }
        },

        getEntList() {
            if (!this.filters.key) {
                this.$message.warning("请输入企业名称、法定代理人");
            } else {
                getEntData(this.filters).then(res => {
                    if (res.code == 0) {
                        this.show = true;
                        this.entList = res.data.results;
                        this.total = res.data.totalRecord;
                    } else {
                        this.$message.error(res.msg);
                    }
                });
            }
        }
    }
};
</script>

<style lang="less">
.content-container-outer {
    min-height: 200px;
}
</style>
