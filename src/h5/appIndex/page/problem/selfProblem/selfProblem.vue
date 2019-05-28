<template>
    <div class="self-problem">
        <section class="search-box">
            <van-search
                v-model="condition.key"
                placeholder="请输入企业名称、问题类型、发起人等关键词"
                show-action
                @search="onSearch(1)"
            >
                <div slot="action" @click="showDatePicker = true">
                    <i class="iconfont icon-rili"></i>
                </div>
            </van-search>
        </section>
        <section class="picker-box">
            <div id="ent-type-picker" @click="showCompanyLabelPicker = true">
                企业类型 <van-icon name="arrow-down" size="14px" />
            </div>
            <div
                id="problem-resolve-status-picker"
                @click="showProblemStatusPicker = true"
            >
                问题状态 <van-icon name="arrow-down" size="14px" />
            </div>
            <div id="about-me-picker" @click="showMyStatusPicker = true">
                与我相关 <van-icon name="arrow-down" size="14px" />
            </div>
        </section>
        <section class="totalRecord">当前共有{{ total }}条记录</section>
        <section class="main-list">
            <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                :error.sync="error"
                error-text="请求失败，点击重新加载"
                @load="onSearch"
                class="problemList"
            >
                <van-cell
                    v-for="(row, index) in problemList"
                    :key="index"
                    class="problem-item"
                    @click.stop="viewDetail(row)"
                >
                    <template>
                        <div class="problem-item-top">
                            <span class="company-name">{{
                                toHtmlStr(row.companyName)
                            }}</span>
                            <span
                                v-if="row.problemTypeName"
                                class="problem-type-label"
                                >{{ toHtmlStr(row.problemTypeName) }}</span
                            >
                        </div>
                        <div class="problem-item-main">
                            问题描述：{{
                                row.problemContent &&
                                row.problemContent.length > 70
                                    ? row.problemContent.substring(0, 70) +
                                      "..."
                                    : toHtmlStr(row.problemContent)
                            }}
                        </div>
                        <div class="problem-item-bottom">
                            <div class="createTime">
                                {{ toHtmlStr(row.createTime) }}
                            </div>
                            <div class="btns">
                                <div
                                    v-if="row.superviseStatus == 1"
                                    class="operateBtn btn-supervision"
                                    @click.stop="supervisionBtnClicked(row.id)"
                                >
                                    督办问题
                                </div>
                                <div
                                    v-if="row.handlerStatus == 1"
                                    class="operateBtn btn-resolve"
                                    @click.stop="resolveBtnClicked(row.id)"
                                >
                                    处理问题
                                </div>
                            </div>
                        </div>
                    </template>
                </van-cell>
            </van-list>
        </section>

        <van-popup v-model="showDatePicker" position="bottom">
            <van-datetime-picker
                v-model="condition.startTime"
                type="date"
                :max-date="maxDate"
                @confirm="onDatePickerChange"
                @cancel="showDatePicker = false"
            />
        </van-popup>
        <van-popup v-model="showCompanyLabelPicker" position="bottom">
            <van-picker
                show-toolbar
                :columns="companyLabelList"
                value-key="name"
                @confirm="onCompanyLabelPickerChange"
                @cancel="showCompanyLabelPicker = false"
            />
        </van-popup>
        <van-popup v-model="showProblemStatusPicker" position="bottom">
            <van-picker
                show-toolbar
                :columns="problemSolveStatus"
                value-key="label"
                @confirm="onProblemStatusPickerChange"
                @cancel="showProblemStatusPicker = false"
            />
        </van-popup>
        <van-popup v-model="showMyStatusPicker" position="bottom">
            <van-picker
                show-toolbar
                :columns="aboutMe"
                value-key="label"
                @confirm="onMyStatusPickerChange"
                @cancel="showMyStatusPicker = false"
            />
        </van-popup>

        <van-button
            class="buttonLaunchQuestion"
            round
            type="info"
            @click="launchProblem"
            >发起问题</van-button
        >
    </div>
</template>

<script>
import * as api from "@api/h5/selfProblem";
import { toHtmlStr, format, gotoH5URL } from "@/common/utils/index";
// import toHtmlStr from "@/common/utils/toHtmlStr";
// import format from "@/common/utils/format";
// import { gotoH5URL } from "@/common/utils/util";
import "../../../less/selfProblem.less";

export default {
    data() {
        return {
            problemList: [],
            companyLabelList: [],
            problemSolveStatus: [
                { label: "全部", value: "" },
                { label: "未解决", value: 0 },
                { label: "已解决", value: 1 }
            ],
            aboutMe: [
                { label: "全部", value: "" },
                { label: "我发起的", value: 1 },
                { label: "我未处理", value: 2 },
                { label: "我已处理", value: 3 },
                { label: "我协助的", value: 4 }
            ],
            condition: {
                labelCode: "" /**企业类型标签*/,
                problemSolveStatus: "" /**问题状态*/,
                myStatus: "" /**与我相关*/,
                startTime: "" /**开始时间*/,
                key: "" /**搜索关键字*/
            },

            loading: false,
            finished: false,
            error: false,
            total: 0,
            currentPage: 1,
            pageSize: 10,

            toHtmlStr: () => {},

            showDatePicker: false,
            showCompanyLabelPicker: false,
            showProblemStatusPicker: false,
            showMyStatusPicker: false,
            maxDate: new Date()
        };
    },
    mounted() {
        this.getCompanyLabelList();
        this.toHtmlStr = toHtmlStr;
    },
    methods: {
        /** doRequest */
        getCompanyLabelList() {
            api.companyLabelList().then(response => {
                let arr = response.data || [];
                this.companyLabelList = [{ name: "全部", code: "" }, ...arr];
            });
        },
        onSearch(current) {
            if (current == 1) {
                this.currentPage = current;
                this.finished = false;
            }
            this.condition.startTime = format(this.condition.startTime);
            const options = {
                t: Date.now(),
                pageNum: this.currentPage,
                pageSize: this.pageSize,
                ...this.condition
            };
            api.myProblemList(options)
                .then(data => {
                    if (data.code === "0000") {
                        this.total = data.data.totalRecord;

                        const results = data.data.results || [];

                        this.problemList =
                            this.currentPage === 1
                                ? results
                                : this.problemList.concat(results);
                        this.loading = false;
                        if (results.length < this.pageSize) {
                            this.finished = true;
                        } else {
                        }

                        this.currentPage++;
                    } else {
                        this.error = true;
                    }
                })
                .catch(() => {
                    this.error = true;
                });
        },

        /** bind event */
        onDatePickerChange(value) {
            this.condition.startTime = format(value);
            this.showDatePicker = false;
            this.onSearch(1);
        },
        onCompanyLabelPickerChange(value, index) {
            this.condition.labelCode = value.code;
            this.showCompanyLabelPicker = false;
            this.onSearch(1);
        },
        onProblemStatusPickerChange(value, index) {
            this.condition.problemSolveStatus = value.value;
            this.showProblemStatusPicker = false;
            this.onSearch(1);
        },
        onMyStatusPickerChange(value, index) {
            this.condition.myStatus = value.value;
            this.showMyStatusPicker = false;
            this.onSearch(1);
        },
        viewDetail(row) {
            if (row.superviseStatus != 1 && row.handlerStatus != 1) {
                this.$router.push({
                    name: "resolveProblem",
                    query: {
                        type: "problemDetail",
                        id: row.id
                    }
                });
            }
        },
        resolveBtnClicked(id) {
            this.$router.push({
                name: "resolveProblem",
                query: {
                    type: "resolveProblem",
                    id: id
                }
            });
        },
        supervisionBtnClicked(id) {
            this.$router.push({
                name: "resolveProblem",
                query: {
                    type: "supervisionProblem",
                    id: id
                }
            });
        },
        launchProblem() {
            this.$router.push({ name: "launchProblem" });
        }
    }
};
</script>
<style lang="less" scoped='scoped'>
// less已使用px2rem，直接使用375适配的px就行
</style>