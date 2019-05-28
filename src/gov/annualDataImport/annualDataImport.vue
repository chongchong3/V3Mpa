<template>
    <BasePage>
        <div>
            <div
                class="main-content common-page-outer"
                id="annualDataImportPageOuter"
            >
                <div
                    class="content-container-outer "
                    style="min-height:100%"
                    id="annualDataImportOuter"
                >
                    <div class="box-outer">
                        <div
                            class="box"
                            v-for="item in match"
                            :class="item.match == -1 ? 'noPower' : ''"
                            @click="gotoDetails(item)"
                        >
                            <div class="box-top"><div class="pic"></div></div>
                            <div class="box-line"></div>
                            <div class="box-bott">{{ item.name }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </BasePage>
</template>

<script>
import BasePage from "@/components/BasePage";

import { gotoBaseURL, getLocalStorage } from "@/common/utils/index";
// import * as url from "@/common/utils/util.js";   //跳转路径

// import getLocalStorage from "@/common/utils/getLocalStorage.js";

export default {
    data() {
        return {
            urls: JSON.parse(getLocalStorage("curl")),
            datas: [
                "土地数据",
                "税务数据",
                "统计数据",
                "环保数据",
                "用电数据",
                "用水数据"
            ],
            yearData: [],
            match: []
        };
    },
    created() {
        this.Jurisdiction(); //权限
    },
    mounted() {
        let dataCenter = this.urls.find(v => v.name == "数据中心");

        if (dataCenter) {
            let yearData = dataCenter.child.find(v => v.name == "年度数据导入");

            if (yearData) {
                this.yearData = yearData.child.map(v => {
                    return v.name;
                });
                this.datas.map((v, i) => {
                    if (this.yearData.indexOf(v) === -1) {
                        this.match.push({ name: v, match: -1 });
                    } else {
                        this.match.push({ name: v, match: 1 });
                    }
                });
            }
        }
    },

    methods: {
        Jurisdiction() {
            // console.log(this.curls);
        },
        gotoDetails(item) {
            console.log(name.substring(0, 2));
            if (item.match == -1) {
                this.$message.error("暂无权限");
            } else {
                gotoBaseURL(
                    "annualDataImportDetail?name=" + item.name.substring(0, 2)
                );
            }
        }
    },
    components: {
        BasePage
    }
};
</script>

<style lang="less" scoped>
@import "../../common/less/reset.less";
.noPower {
    background: #e4e7ec;
}
@tudiColor: #37a0ff;
@shuiwuColor: #fa9779;
@tongjiColor: #66c4b0;
@huanbaoColor: #39b3d6;
@yongdianColor: #6b93ff;
@yongshuiColor: #6bbdff;

.content-container-outer {
    background: #fff;
    -webkit-box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.08);
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.08);
    padding: 25px;
    margin-top: 20px;
}

#annualDataImportOuter {
    .box-outer {
        display: flex;
        flex-wrap: wrap;
        width: 800px;
        margin: 30px auto;
        .box {
            width: 160px;
            height: 150px;
            border: 1px solid #ebebeb;
            padding: 20px;
            margin-right: 60px;
            border-radius: 4px;
            margin-bottom: 40px;
            font-size: 14px;
            color: #707b8b;
            &-top {
                width: 100%;
                height: 100px;
                border-radius: 4px;
                background: #6bbdff;
                display: flex;
                justify-content: center;
                align-items: center;
                .pic {
                    width: 54px;
                    height: 54px;
                    background: url("~@/assets/tudi.png") no-repeat center/cover;
                }
            }
            &-line {
                width: 100%;
                height: 1px;
                background: #ebebeb;
                margin-bottom: 15px;
                margin-top: 10px;
            }
        }
        .noPower {
            background: #e4e7ec;
        }
        .box:hover {
            box-shadow: 0px 10px 13px 0px rgba(0, 0, 0, 0.08);
            cursor: pointer;
        }
        .box:nth-child(1) > .box-top {
            background: @tudiColor;
            .pic {
                background: url("~@/assets/tudi.png") no-repeat center/cover;
            }
        }
        .box:nth-child(2) > .box-top {
            background: @shuiwuColor;
            .pic {
                background: url("~@/assets/shuiwu.png") no-repeat center/cover;
            }
        }
        .box:nth-child(3) > .box-top {
            background: @tongjiColor;
            .pic {
                background: url("~@/assets/tongji.png") no-repeat center/cover;
            }
        }
        .box:nth-child(4) > .box-top {
            background: @huanbaoColor;
            .pic {
                background: url("~@/assets/huanbao.png") no-repeat center/cover;
            }
        }
        .box:nth-child(5) > .box-top {
            background: @yongdianColor;
        }
        .box:nth-child(6) > .box-top {
            background: @yongshuiColor;
        }
    }
}
</style>
