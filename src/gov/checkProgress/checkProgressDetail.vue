<template>
    <div id="checkProgressDetailPageOuter">
        <div class="ys-back-btn" @click="backToPrevPage"></div>
        <div id="checkProgressDetailPageCOuter">
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
                                style="width:150px;"
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
                        </div>
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
                    style="width: 100%"
                    height="420"
                >
                    <el-table-column
                        label="序号"
                        type="index"
                        :index="indexMethod"
                        width="100"
                    ></el-table-column>
                    <el-table-column
                        prop="entName"
                        label="企业名称"
                        min-width="200"
                    >
                        <template slot-scope="scope">
                            <div
                                class="ent-name"
                                @click="handleEntNameClick(scope.row)"
                            >
                                {{ toHtmlStr(scope.row.entName, "-") }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="town"
                        label="所属乡镇"
                        min-width="200"
                    ></el-table-column>
                    <el-table-column
                        prop="dataYear"
                        label="数据时间"
                        width="180"
                    >
                        <template slot-scope="scope">
                            {{
                                scope.row.dataYear
                                    ? scope.row.dataYear + "年"
                                    : "-"
                            }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="status" label="审核状态" width="180">
                        <template slot-scope="scope">
                            {{ checkProgress[scope.row.status] }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        width="80">
                        <template slot-scope="scope">
                            <span v-if="scope.row.status == 1">退回</span>
                            <el-button v-else  @click="recall(scope.row)" type="text">退回</el-button>
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
                    <p>Have no Data</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as api from "@api/gov/checkProgress";
import { gotoGovURL, getLocalStorage, toHtmlStr } from "@/common/utils/index";
import { dataTime, statusdata } from "@/common/constant/constant";
import {recall} from "@api/gov/companyPaperDetail";
export default {
    data() {
        return {
            year: "",
            town: "全部",
            status: "全部",
            entNameLike: "",
            searchCondition: {},
            townDatas: [],
            checkProgress: ["全部", ...statusdata.checkProgress],
            dataTime: [
                {
                    name: "全部",
                    val: ""
                },
                ...dataTime
            ],
            total: 0,
            pageSize: 10,
            currentPage: 1,
            dataList: [],
            toHtmlStr: () => {}
        };
    },
    created() {},
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
        isAdmin() {
            return this.$store.state.isAdmin;
//            return 2;
        }
    },
    methods: {
        recall(row){//撤回
            let {dataYear,creditCode} = row;
            this.$confirm('将企业的填报数据状态修改为未填报状态？但会保留所有已经填报的数据，您确定要继续吗?', '提示', {
                confirmButtonText: '继续',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                recall({
                    creditCode: creditCode,
                    dataYear: dataYear,
                }).then((d)=>{
                    if(d.code=='0000'){
                        this.$message({
                            type: 'success',
                            message: d.msg
                        });
                        this.fetchData();
                    }

                }).catch()

            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });
            });
        },
        getTownList() {
            api.getTownList()
                .then(res => {
                    if (res.code === "0000") {
                        if(this.isAdmin==1){
                            this.townDatas = ["全部", ...res.data];
                        }else{
                            this.townDatas = res.data ||[];
                        }

                    }
                })
                .catch(reason => {});
        },
        fetchData() {
            const params = {
                entNameLike: this.entNameLike,
                dataYear: this.year,
                status: this.status == "全部" ? "" : this.status,
                town: this.town == "全部" ? "" : this.town,
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
            const urls = JSON.parse(getLocalStorage("curl"));
            let isEntFile = urls.find(v => v.id === 1) ? true : false;
            if (isEntFile) {
                $(this).css("cursor", "pointer");
                gotoGovURL(`entDetail.html?entName=${row.entName}`);
            } else {
                this.$notify({
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
        backToPrevPage() {
            this.$router.go(-1);
        }
    },
    components: {}
};
</script>

<style lang="less">
@import './checkProgress.less';
</style>
