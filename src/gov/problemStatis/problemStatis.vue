<template>
    <BasePage>
        <div>
            <div class="content-container-outer">
                <div class="top-title">
                    <div class="top-title-right">
                        <div class="top-title-nav">
                            <div
                                class="nav"
                                v-for="(item, index) in nav"
                                :class="{ 'nav-on': iscur == index }"
                                @click="(iscur = index), _getData(item.type)"
                            >
                                {{ item.name }}
                            </div>
                        </div>
                        <div class="flex-box aic top-title-time">
                            <span>发起时间：</span>
                            <div class="list-info time">
                                <div class="block">
                                    <el-date-picker
                                        v-model="value3"
                                        type="datetimerange"
                                        value-format="yyyy-MM-dd"
                                        format="yyyy-MM-dd"
                                        size="mini"
                                        @change="getValue"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                    >
                                    </el-date-picker>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="top-title-export">
                        <button class="btn data-export" @click="dataExport()">
                            <i class="iconfont icon-shangchuan"></i>数据导出
                        </button>
                    </div>
                </div>
                <div class="tables">
                    <el-table :data="listDatas" style="width: 100%">
                        <el-table-column
                            label="序号"
                            type="index"
                            align="center"
                            width="100"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="typeName"
                            :label="
                                iscur == 0
                                    ? '问题类型'
                                    : iscur == 1
                                    ? '职能部门'
                                    : iscur == 2
                                    ? '所属行业'
                                    : '关键字'
                            "
                            align="center"
                        >
                        </el-table-column>

                        <el-table-column
                            prop="problemNum"
                            align="center"
                            :label="iscur == 1 ? '发起问题数' : '问题数量'"
                        >
                        </el-table-column>

                        <el-table-column
                            v-if="iscur == 1"
                            prop="exportNum"
                            align="center"
                            label="派单问题"
                        >
                        </el-table-column>

                        <el-table-column
                            prop="pendingNum"
                            align="center"
                            label="待解决"
                        >
                        </el-table-column>

                        <el-table-column
                            prop="solvedNum"
                            align="center"
                            label="已解决"
                        >
                        </el-table-column>

                        <el-table-column
                            prop="solvedRate"
                            align="center"
                            label="解决率（%）"
                        >
                        </el-table-column>

                        <el-table-column
                            prop="useTime"
                            align="center"
                            label="平均耗费时长"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="fiveStarAssess"
                            align="center"
                            label="好评率"
                        >
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
    </BasePage>
</template>

<script>
import BasePage from "@/components/BasePage";

import { findList } from "@api/gov/problemStatis";

export default {
    data() {
        return {
            iscur: 0,
            nav: [
                { name: "问题类型", type: 1 },
                { name: "责任部门", type: 2 },
                { name: "所属行业", type: 3 },
                { name: "关键字", type: 4 }
            ],
            common: {
                searchType: 1,
                startTime: "",
                endTime: ""
            },
            listDatas: [],
            value3: []
        };
    },
    created() {
        this._getData(1);
    },
    watch: {
        iscur(newVAl, oldVal) {
            this.value3 = [];
            this.reset();
        }
    },
    methods: {
        _getData(type) {
            this.common.searchType = type;

            findList(this.common).then(res => {
                if (res.code == "0000") {
                    let totalData = res.data.total;
                    this.listDatas = res.data.list;

                    this.listDatas.unshift(totalData);
                } else {
                    this.$message.error(res.msg);
                }
            });
        },

        getValue() {
            this.common.startTime = this.value3[0] || "";
            this.common.endTime = this.value3[1] || "";
            this._getData(this.common.searchType);
        },
        reset() {
            this.common.startTime = "";
            this.common.endTime = "";
        },

        dataExport() {
            window.open(
                `/gov/problemCount/exportList?searchType=${
                    this.common.searchType
                }&startTime=${this.common.startTime}&endTime=${
                    this.common.endTime
                }`
            );
        }
    },
    components: {
        BasePage
    }
};
</script>

<style lang="less" scoped>
@import "../../common/less/reset.less";
@navColor: #5c7cec;

.content-container-outer {
    .list-info {
        //border: 1px solid #e3eaf1;
        height: 30px;
        .datepicker-input-c {
            height: 100%;
        }
        .formsControl {
            border: none;
            height: 100%;
            outline: none;
            width: 100px;
            text-align: center;
        }
        .fa-calendar {
            display: none !important;
        }
    }

    .top-title {
        width: 100%;
        display: flex;
        justify-content: space-between;
        //border-bottom: 1px solid #EBEBEB;
        position: relative;
        &-nav {
            display: flex;
            width: 400px;
            height: 30px;
            box-sizing: border-box;
            font-size: 12px;
            border: 1px solid #e3eaf1;
            padding: 0;
            margin-right: 20px;
            .nav {
                width: 25%;
                height: 100%;
                text-align: center;
                line-height: 30px;
                color: @navColor;
                border-right: 1px solid #e3eaf1;
            }
            .nav:last-child {
                border-right: none;
            }
            .nav.nav-on,
            .nav:hover {
                color: #fff;
                background: @navColor;
            }
        }
        .top-title-time {
            margin-right: 40px;
            .list-info {
                display: flex;
                align-items: center;
                .form-control {
                    height: 30px;
                }
            }
        }
        .top-title-export {
            height: 40px;
            display: flex;
            align-items: center;
        }
    }
    .top-title:after {
        position: absolute;
        content: "";
        width: 100%;
        height: 1px;
        bottom: -20px;
        background: #ebebeb;
    }

    .top-title-right {
        display: flex;
        align-items: center;
    }
    .data-export {
        height: 30px;
        background: rgba(92, 124, 236, 0.2);
        color: @navColor;
        font-weight: 500;
        padding: 4px 10px;
        border: 1px solid transparent;
        outline: none;
        cursor: pointer;
    }
    .tables {
        margin-top: 40px;
    }
    //form-control
}
</style>
