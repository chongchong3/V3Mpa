<template>
    <div id="checkProcessPageOuter">
        <!-- HTML内容 -->
        <el-select
            class="date-select"
            v-model="year"
            placeholder="请选择"
            @change="dataTimeChange"
        >
            <el-option
                v-for="item in dateTime"
                :key="item.val"
                :label="item.name"
                :value="item.val"
            >
            </el-option>
        </el-select>

        <div class="progress-line">
            <div class="title">
                <div class="town-name">{{ toHtmlStr(mapTotal.area, "-") }}</div>
                <span class="progress-change" :style="{ left: progressLeft }">{{
                    toHtmlStr(mapTotal.num, "-")
                }}</span>
                <span class="total">{{ toHtmlStr(mapTotal.total, "-") }}</span>
            </div>
            <div class="content" :data-town="toHtmlStr(mapTotal.area, '-')">
                <div class="content-on" :style="{ width: progressWidth }"></div>
            </div>
        </div>
        <div class="town-list">
            <div
                class="town-list-li"
                v-for="(item, index) in dataList"
                :key="item.area"
                :class="[item.num === item.total ? 'town-list-li-on' : '']"
                @click="gotoDetailPage(item)"
            >
                <div class="name">{{ item.area }}</div>
                <div class="number">{{ item.num }} / {{ item.total }}</div>
                <div
                    class="complate-flag"
                    :style="{
                        display:
                            item.num === item.total ? 'inline-block' : 'none'
                    }"
                >
                    已完成
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as api from "@api/gov/checkProgress";

import { toHtmlStr } from "@/common/utils/index";
import { dataTime } from "@/common/constant/constant";

export default {
    name: "checkProcessList",
    data() {
        return {
            dateTime: dataTime,
            year: 2018,
            dataList: [],
            mapTotal: {},
            progressWidth: 0,
            progressLeft: 0,
            toHtmlStr: () => {}
        };
    },
    created() {},
    mounted() {
        this.toHtmlStr = toHtmlStr;
        this.dataTimeChange();
    },
    computed: {},
    methods: {
        dataTimeChange: function() {
            const params = { year: this.year };
            api.uploadResult(params).then(res => {
                if (res.code === "0000") {
                    this.dataList = res.data.dataList || [];
                    this.mapTotal = res.data.mapTotal || {};

                    let total = this.mapTotal.total || 0;
                    let pro = this.mapTotal.num || 0;
                    let area = this.mapTotal.area || "-";
                    let proWidth = ((pro / total) * 100).toFixed(2);
                    let proLeft = proWidth;
                    if (proWidth > 1) {
                        proLeft = proLeft - 3;
                    }
                    this.progressWidth = proWidth;
                    this.progressLeft = proLeft;
                }
            });
        },
        gotoDetailPage: function(item) {
            this.$router.push({
                name: "detail",
                query: { town: item.area, year: this.year }
            });
        }
    }
};
</script>

<style lang="less">
@import './checkProgress.less';
</style>
