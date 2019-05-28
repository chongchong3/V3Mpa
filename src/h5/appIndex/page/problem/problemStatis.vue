<template>
    <div id="problemStatisPageOuter">
        <div class="pro pro-back">
            <div
                class="pro-nav"
                v-for="(item, index) in nav"
                :class="{ navOn: isindex == index }"
                @click="(isindex = index), setTime(item.num)"
                :key="item.id"
            >
                {{ item.name }}
            </div>
        </div>
        <div class="main pro-back">
            <div class="main-time">
                发起时间：

                <div class="timeOuter" id="startTime" @click="timeShow = true">
                    <span>{{ common.startTime }}</span
                    ><i class="iconfont icon-rili"></i>
                </div>
                <div class="timeOuter" id="endTime" @click="timeShow1 = true">
                    <span>{{ common.endTime }}</span>
                    <i class="iconfont icon-rili"></i>
                </div>
            </div>
            <div class="main-contents">
                <div class="list" v-for="(v, i) in listDatas" :key="v.id">
                    <div class="list-title">{{ v.typeName }}</div>
                    <div class="list-common">
                        <div class="list-common-per">
                            <div class="list-name">问题数：</div>
                            <div class="list-num">{{ v.problemNum }}</div>
                        </div>
                        <div class="list-common-per">
                            <div class="list-name">待解决：</div>
                            <div class="list-num">{{ v.pendingNum }}</div>
                        </div>
                        <div class="list-common-per">
                            <div class="list-name">已解决：</div>
                            <div class="list-num">{{ v.solvedNum }}</div>
                        </div>
                        <div class="list-common-per max-per">
                            <div class="list-name">解决率：</div>
                            <div class="list-num">{{ v.solvedRate }}</div>
                        </div>
                        <div class="list-common-per max-pers">
                            <div class="list-name">平均耗费时长：</div>
                            <div class="list-num">{{ v.useTime }}</div>
                        </div>
                    </div>
                    <div class="list-good">
                        <span>好评率：</span>
                        <div class="score">
                            <van-rate v-model="v.fiveStarAssess" readonly />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <van-popup v-model="timeShow" position="bottom">
            <van-datetime-picker
                v-model="currentDate"
                type="date"
                :min-date="minDate"
                :max-date="maxDate"
                @cancel="timeShow = false"
                @confirm="startTime"
            />
        </van-popup>
        <van-popup v-model="timeShow1" position="bottom">
            <van-datetime-picker
                v-model="currentDate"
                type="date"
                :min-date="minDate"
                :max-date="maxDate"
                @cancel="timeShow1 = false"
                @confirm="endTime"
            />
        </van-popup>
    </div>
</template>
<script>
import "@/assets/font/iconfont.css";

import { findList } from "@api/h5/problemStatis";
export default {
    data() {
        return {
            nav: [
                { name: "问题类型", num: 1 },
                { name: "责任部门", num: 2 },
                { name: "所属行业", num: 3 },
                { name: "关键字", num: 4 }
            ],
            common: {
                searchType: 1,
                startTime: "",
                endTime: ""
            },
            timeShow: false,
            timeShow1: false,
            isindex: 0,
            listDatas: [],
            minDate: new Date(1990, 1, 1),
            maxDate: new Date(),
            currentDate: new Date()
        };
    },
    methods: {
        getData(type) {
            this.common.searchType = type;
            findList(this.common).then(res => {
                let totalData = res.data.total;
                this.listDatas = res.data.list;
                this.listDatas.unshift(totalData);
            });
        },
        startTime(time) {
            this.common.startTime = this.timeTranste(time);
            this.timeShow = false;
            this.getData(this.common.searchType);
        },
        endTime(time) {
            this.common.endTime = this.timeTranste(time);
            this.timeShow1 = false;
            this.getData(this.common.searchType);
        },
        timeTranste(time) {
            var d = new Date(time);
            var times =
                d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
            return times;
        },
        setTime(type) {
            this.common.startTime = "";
            this.common.endTime = "";
            this.getData(type);
        }
    },
    mounted() {
        this.getData(1);
    }
};
</script>
<style lang="less" scoped='scoped'>
@import "../../less/problemStatis.less";
.times {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 999;
}
.max-per {
    width: 30% !important;
}
.max-pers {
    width: 70% !important;
}
// less已使用px2rem，直接使用375适配的px就行
</style>