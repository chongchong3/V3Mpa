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
import Vue from "vue";
import MassageTip from "@/components/business/massageTip";
import Tables from "@/components/business/tables";
// import * as inter from "@api/gov/entDetail";
import * as inter from "@api/bussiness.js";

import { toHtmlStr } from "@/common/utils/index.js";
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
            noMassage: [true, true, true, true, true],
            tabelsArr: [
                {
                    HeadList: [
                        { label: "类型", props: "invType" },
                        { label: "申请公布日", props: "subConam" },
                        { label: "名称", props: "shareholdingRatio" }
                    ],
                    TableList: [],
                    title: "专利信息",
                    current: 1, //当前页
                    pageSize: 1, //每页条数
                    totalRecord: 0 //总条数
                },
                {
                    HeadList: [
                        { label: "商标", props: "invType" },
                        { label: "商标名称", props: "subConam" },
                        { label: "申请日期", props: "shareholdingRatio" },
                        { label: "状态", props: "invType" },
                        { label: "注册号", props: "subConam" },
                        { label: "类别", props: "shareholdingRatio" }
                    ],
                    TableList: [],
                    title: "商标信息",
                    current: 1, //当前页
                    pageSize: 1, //每页条数
                    totalRecord: 0 //总条数
                },
                {
                    HeadList: [
                        { label: "软件名称", props: "invType" },
                        { label: "软件简称", props: "subConam" },
                        { label: "登记号", props: "shareholdingRatio" },
                        { label: "版本号", props: "invType" },
                        { label: "分类号", props: "subConam" },
                        { label: "登记批准日期", props: "shareholdingRatio" }
                    ],
                    TableList: [],
                    title: "软件著作权",
                    current: 1, //当前页
                    pageSize: 10, //每页条数
                    totalRecord: 0 //总条数
                },
                {
                    HeadList: [
                        { label: "作品名称", props: "invType" },
                        { label: "登记号", props: "subConam" },
                        { label: "类别", props: "shareholdingRatio" },
                        { label: "创作完成日期", props: "invType" },
                        { label: "登记日期", props: "subConam" },
                        { label: "首次发布日期", props: "shareholdingRatio" }
                    ],
                    TableList: [],
                    title: "著作权",
                    current: 1, //当前页
                    pageSize: 10, //每页条数
                    totalRecord: 0 //总条数
                },
                {
                    HeadList: [
                        { label: "网址", props: "invType" },
                        { label: "网站名称", props: "subConam" },
                        {
                            label: "网站备案/许可证号",
                            props: "shareholdingRatio"
                        },
                        { label: "登记批准日期", props: "invType" }
                    ],
                    TableList: [],
                    title: "域名",
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
            this.initData();
            this.initData1();
            this.initData2();
            this.initData3();
            this.initData4();
        },
        initData() {
            let params = {
                entName: enterpriseName,
                pageNum: this.tabelsArr[0].current,
                pageSize: this.tabelsArr[0].pageSize
            };
            inter.findPatentByEntName(params).then(res => {
                if (res.code == "0000") {
                    if (res.data.results == null) {
                        Vue.set(this.noMassage, 0, true);
                    } else {
                        this.tabelsArr[0].TableList = res.data.results;
                    }
                }
            });
        },
        initData1() {
            let params1 = {
                entName: enterpriseName,
                pageNum: this.tabelsArr[1].current,
                pageSize: this.tabelsArr[1].pageSize
            };
            inter.findTrademarkByEntName(params1).then(res => {
                if (res.code == "0000") {
                    if (res.data.results == null) {
                        // this.noMassage[1]=true
                        Vue.set(this.noMassage, 1, true);
                        // console.log(this.noMassage)
                    } else {
                        this.tabelsArr[1].TableList = res.data.results;
                    }
                }
            });
        },
        initData2() {
            let params2 = {
                entName: enterpriseName,
                pageNum: this.tabelsArr[2].current,
                pageSize: this.tabelsArr[2].pageSize
            };
            inter.findSoftCopyrightByEntName(params2).then(res => {
                if (res.code == "0000") {
                    if (res.data.results == null) {
                        //  this.noMassage[2]=true
                        Vue.set(this.noMassage, 2, true);
                    } else {
                        this.tabelsArr[2].TableList = res.data.results;
                    }
                }
            });
        },
        initData3() {
            let params3 = {
                entName: enterpriseName,
                pageNum: this.tabelsArr[3].current,
                pageSize: this.tabelsArr[3].pageSize
            };
            inter.findCopyrightByEntName(params3).then(res => {
                if (res.code == "0000") {
                    if (res.data.results == null) {
                        // this.noMassage[3]=true
                        Vue.set(this.noMassage, 3, true);
                    } else {
                        this.tabelsArr[3].TableList = res.data.results;
                    }
                }
            });
        },
        initData4() {
            let params4 = {
                entName: enterpriseName,
                pageNum: this.tabelsArr[4].current,
                pageSize: this.tabelsArr[4].pageSize
            };
            inter.findDomainByEntName(params4).then(res => {
                if (res.code == "0000") {
                    if (res.data.results == null) {
                        // this.noMassage[4]=true
                        Vue.set(this.noMassage, 4, true);
                    } else {
                        this.tabelsArr[4].TableList = res.data.results;
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
            }
        }
    },
    watch: {}
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

