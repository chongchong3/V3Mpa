<template>
    <div>
        <div
            class="contentlist"
            v-for="(item, index) in tabelsArr"
            :key="index + 'a'"
        >
            <div class="ultimateShareholder">
                <div class="header">{{ item.title }}</div>
                <div
                    class="ultimateShareholderTable"
                    v-show="!noMassage[index]"
                >
                    <el-table :data="item.TableList" stripe style="width: 100%">
                        <el-table-column
                            type="index"
                            width="50"
                        ></el-table-column>
                        <el-table-column
                            :label="data.label"
                            :prop="data.props"
                            v-for="(data, index) of item.HeadList"
                            :key="index + 'b'"
                        ></el-table-column>
                    </el-table>
                    <el-pagination
                        @current-change="handleCurrentChange($event, index)"
                        :current-page.sync="item.current"
                        :page-size="item.pageSize"
                        layout="total, prev, pager, next"
                        :total="item.totalRecord"
                    ></el-pagination>
                </div>
                <div class="noData" v-show="noMassage[index]">
                    <div class="noData-img"></div>
                    <div class="noData-desc">
                        <p>暂无数据</p>
                        <p>Have no Data</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import MassageTip from "@/components/business/massageTip";
import Tables from "@/components/business/tables";
import * as inter from "@api/bussiness.js";

import { toHtmlStr } from "@/common/utils/index";
// import toHtmlStr from "@/common/utils/toHtmlStr.js";
import { enterpriseName } from "@/common/constant/constantConst.js"; //获取路径名
export default {
    components: {
        MassageTip,
        Tables
    },
    data() {
        return {
            getData: "",
            maxObj: [],
            toHtmlStr: toHtmlStr,
            noMassage: new Array(3).fill(true),
            tabelsArr: [
                {
                    HeadList: [
                        { label: "立案时间", props: "sortTimeString" },
                        { label: "数据类型", props: "type" },
                        { label: "案号", props: "title" }
                    ],
                    TableList: [],
                    title: "开庭公告",
                    current: 1, //当前页
                    pageSize: 10, //每页条数
                    totalRecord: 0 //总条数
                },
                {
                    HeadList: [
                        { label: "立案时间", props: "sortTimeString" },
                        { label: "数据类型", props: "type" },
                        { label: "案号", props: "title" }
                    ],
                    TableList: [],
                    title: "裁判文书",
                    current: 1, //当前页
                    pageSize: 10, //每页条数
                    totalRecord: 0 //总条数
                },
                {
                    HeadList: [
                        { label: "立案时间", props: "sortTimeString" },
                        { label: "数据类型", props: "type" },
                        { label: "案号", props: "title" }
                    ],
                    TableList: [],
                    title: "法院公告",
                    current: 1, //当前页
                    pageSize: 10, //每页条数
                    totalRecord: 0 //总条数
                }
            ]
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.initData(this.tabelsArr[0].current, "开庭公告");
            this.initData(this.tabelsArr[1].current, "裁判文书");
            this.initData(this.tabelsArr[2].current, "法院公告");
        },
        initData(current, type) {
            let params = {
                entName: enterpriseName,
                type,
                t: Date.now(),
                pageNum: current,
                pageSize: this.tabelsArr[0].pageSize
            };
            inter.findSfByEntName(params).then(res => {
                if (res.code == "0000") {
                    if (type === "开庭公告") {
                        if (res.data.results == null) {
                            this.$set(this.noMassage, 0, true);
                        } else {
                            this.tabelsArr[0].TableList =
                                res.data.results || [];
                        }
                    } else if (type === "裁判文书") {
                        if (res.data.results == null) {
                            this.$set(this.noMassage, 1, true);
                        } else {
                            this.tabelsArr[1].TableList =
                                res.data.results || [];
                        }
                    } else if (type === "法院公告") {
                        if (res.data.results == null) {
                            this.$set(this.noMassage, 2, true);
                        } else {
                            this.tabelsArr[2].TableList =
                                res.data.results || [];
                        }
                    }
                }
            });
        },
        handleCurrentChange(val, index) {
            this.tabelsArr[index].pageNum = val;
            if (index == 0) {
                this.initData();
            } else if (index == 1) {
                this.initData1();
            } else if (index == 1) {
                this.initData2();
            }
        }
    }
};
</script>
<style lang="less" scoped>
.el-tabs__header {
    margin: 0;
}
.contentlist {
    border: 1px solid #e4e7ed;
    margin-bottom: 20px;
}
.ultimateShareholder {
    padding: 0 40px 20px 40px;
    background: #fff;
    box-shadow: 0 0px 2px 2px rgba(64, 158, 255, 0.5);
    .header {
        color: #666;
        font-size: 16px;
        position: relative;
        padding: 20px 0;
        padding-left: 17px;
        &::before {
            content: "";
            display: inline-block;
            width: 6px;
            height: 20px;
            border-radius: 3px;
            background: #007bff;
            position: absolute;
            left: 0;
        }
    }
}
</style>

