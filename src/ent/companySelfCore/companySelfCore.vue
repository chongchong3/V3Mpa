<template>
    <BasePage>
        <div id="companySelfCorePageOuter">
            <div id="companySelfCorePageCOuter">
                <section v-show="!noData">
                    <el-table
                        :data="tableData"
                        style="width: 100%"
                        class="search-list"
                        id="searchSelf"
                    >
                        <el-table-column label="序号" width="80" type="index">
                        </el-table-column>
                        <el-table-column label="数据年份" width="120">
                            <template slot-scope="scope">
                                <span>{{ scope.row.dataYear }}年</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="企业名称" min-width="160">
                            <template slot-scope="scope">
                                <span
                                    @click="goToEntFile(scope.row.entName)"
                                    class="ent-name"
                                    >{{ scope.row.entName }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="核对期限" min-width="160">
                            <template slot-scope="scope">
                                <span
                                    >{{ scope.row.startTime }}--{{
                                        scope.row.endTime
                                    }}</span
                                >
                            </template>
                        </el-table-column>
                        <el-table-column label="审核状态" width="100">
                            <template slot-scope="scope">
                                <span>{{ scope.row.status | getStatus }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <span class="seeSomeOne"
                                    v-if="
                                        scope.row.status == 3 ||
                                            scope.row.status == 5
                                    "
                                    @click="watchDetail(scope.$index, scope.row)"
                                    >查看</span
                                >
                                <div class="flexBox" v-else>
                                    <section
                                        :class="[
                                            'btn',
                                            'btn-entFile',
                                            {
                                                'disable-click':
                                                    scope.row.status == 6
                                            },
                                            { setGary: scope.row.status == 2 }
                                        ]"
                                        @click="entFile(scope.index, scope.row)"
                                    >
                                        填报<i class="iconfont icon-xiugai"></i>
                                        <div class="tip">
                                            填报<span
                                                class="triangle-down"
                                            ></span>
                                        </div>
                                    </section>
                                    <section
                                        :class="[
                                            'btn',
                                            'btn-check',
                                            {
                                                'disable-click':
                                                    scope.row.status == 1 ||
                                                    scope.row.status == 4
                                            }
                                        ]"
                                        @click="
                                            selfCheck(scope.$index, scope.row)
                                        "
                                    >
                                        核对<i class="iconfont icon-hedui"></i>
                                        <div class="tip">
                                            核对<span
                                                class="triangle-down"
                                            ></span>
                                        </div>
                                    </section>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination
                        background
                        layout="sizes, prev, pager, next ,jumper"
                        :total="totalRecord"
                        :page-sizes="[10, 20, 30, 40]"
                        @current-change="handleCurrentChange"
                        @size-change="handleSizeChange"
                    ></el-pagination>
                </section>
                <div class="noData" v-show="noData">
                    <div class="noData-img"></div>
                    <div class="noData-desc">
                        <p>暂无数据</p>
                        <p>Have no Message</p>
                    </div>
                </div>
            </div>
        </div>
    </BasePage>
</template>

<script>
import { getCheckList } from "@api/ent/companySelfCore";
import {
    getLocalStorage,
    nowInDateBetwen,
    gotoEntURL
} from "@/common/utils/index";

import { statusdata } from "@/common/constant/constant";
import BasePage from "@/components/BasePage";

export default {
    data() {
        return {
            tableData: [],
            pageNum: 1,
            pageSize: 10,
            totalRecord: 0,
            unitlevel: getLocalStorage("unitlevel") || ""
        };
    },
    components: {
        BasePage
    },
    computed: {
        isEntFile() {
            return this.$store.state.isEntFile;
        },
        noData() {
            return this.tableData.length === 0;
        }
    },
    filters: {
        getStatus(sta) {
            let status = statusdata.checkProcess.find((v, i, arr) => {
                return v.status == sta;
            });
            return status.name || "";
        }
    },
    mounted() {
        this.getList();
    },

    methods: {
        goToEntFile(entName) {
            if (!this.isEntFile) {
                this.$message({
                    message:
                        "当前账号没有设置企业档案权限，不可点击跳转到企业档案中",
                    type: "warning"
                });
            } else {
                gotoEntURL(`entDetail.html?entName=${entName}`);
            }
        },
        getList() {
            const params = {
                pageSize: this.pageSize,
                pageNum: this.pageNum
            };
            getCheckList(params).then(res => {
                let data = res.data;
                if (res.code == "0000") {
                    this.tableData = data.results;
                    this.totalRecord = data.totalRecord;
                }
            });
        },
        watchDetail(index,row){
            let { creditCode, dataYear, entName,status} = row;
            gotoEntURL(
                `companyPaperDetail.html?action=watch&creditCode=${creditCode}&dataYear=${dataYear}&entName=${entName}&status=${status}`
            );
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.getList();
        },
        handleCurrentChange(val) {
            this.pageNum = val;
            this.getList();
        },
        entFile(index, row) {
            let flag = nowInDateBetwen(row.startTime, row.endTime);
            if (this.unitlevel != 3) {
                //非企业
                this.$message({
                    message: "您无操作权限",
                    type: "warning"
                });
            } else if (!flag) {
                this.$message({
                    message: "核对期限已过，不能进行操作",
                    type: "warning"
                });
            } else {
                if (row.status == 6) return;
                let { creditCode, dataYear, entName,status} = row;
                gotoEntURL(
                    `companyPaperDetail.html?action=entFile&creditCode=${creditCode}&dataYear=${dataYear}&entName=${entName}&status=${status}`
                );
            }
        },
        selfCheck(index, row) {
            let flag = nowInDateBetwen(row.startTime, row.endTime);
            if (this.unitlevel != 3) {
                //非企业
                this.$message({
                    message: "您无操作权限",
                    type: "warning"
                });
            } 
            else if (!flag) {
                this.$message({
                    message: "核对期限已过，不能进行操作",
                    type: "warning"
                });
            }
             else {
                if (row.status == 1 || row.status == 4) return;
                let { creditCode, dataYear, entName, status } = row;
                gotoEntURL(
                    `companyPaperDetail.html?action=check&creditCode=${creditCode}&dataYear=${dataYear}&entName=${entName}&status=${status}`
                );
            }
        }
    }
};
</script>

<style lang="less">
@import "../../common/less/reset.less";
@import '../../common/less/base';
@import '../../common/less/paperCommon';

#companySelfCorePageOuter{
  padding-top: 10px;
  #companySelfCorePageCOuter{
    min-height: 700px;
    .bg-com;
    .search-list{
      .flexBox{
        display: flex;
        justify-content: center;
        align-items: center;
        .btn{
          width: 60px;
          color: @hoverColor;
          cursor: pointer;
          i{
            margin-left: 4px;
          }
        }
      }
      .disable-click{
        color:rgba(147, 153, 165, .5) !important;
        cursor: not-allowed;
      }
      .setGary{
        color:rgba(147, 153, 165, .5) !important;
      }
    }
    #searchSelf {
    & .el-table__body-wrapper{
        overflow: unset !important;
        .el-table__body{
            width:auto !important;
        }
      }
    }
    & .el-table__header-wrapper{
      .el-table__header{
          width:auto !important;
      }
    }
  }
}

.el-table td, .el-table th.is-leaf{
  text-align: center;
}
.el-pagination{
  text-align: center;
  margin-top: 25px !important;
}
.el-table .cell, .el-table th div{
  overflow: inherit;
}
.el-pagination.is-background .el-pager li:not(.disabled).active{
  background: @hoverColor;
}
.tip{
  top: -26px;
  left: 12px;
}
.btn:hover{
  & .tip{
    display: block;
  }
}

</style>


