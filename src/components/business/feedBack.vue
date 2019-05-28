<template>
    <div class="contentlist visible">
        <div class="use-bulk" id="ultimateShareholder" v-if="!getData">
            <div class="contentlist visible" data-name="问题反馈">
                <div id="problemFlow">
                    <div class="result-list">
                        <div
                            class="wareList"
                            :class="
                                row.handlerStatus == 0 &&
                                row.superviseStatus == 0
                                    ? 'contentAble'
                                    : ''
                            "
                            @click="
                                enter(
                                    row.handlerStatus,
                                    row.superviseStatus,
                                    row.id
                                )
                            "
                            v-for="(row, index) in feedList"
                            :key="index"
                        >
                            <div class="wareList-top">
                                <div class="wareList-top-title">
                                    <div class="wareList-bott-name qsk">
                                        {{ row.companyName }}
                                    </div>
                                    <div class="wareList-bott-question qsk">
                                        {{ row.problemTypeName }}
                                    </div>
                                </div>
                                <div class="wareList-top-desc">
                                    {{ row.problemContent }}
                                </div>
                                <div
                                    class="wareList-top-process"
                                    v-if="row.recordDtoList"
                                >
                                    <div
                                        v-for="(v, index) in row.recordDtoList"
                                        :key="index + 'q'"
                                        class="pross"
                                        :class="
                                            v.handlerStatus == 8
                                                ? 'complete'
                                                : v.handlerStatus == 1
                                                ? 'noHandle'
                                                : ''
                                        "
                                    >
                                        {{ index != 0 ? "@" : "" }}&nbsp;{{
                                            v.handlerName
                                        }}({{ v.name }})
                                    </div>
                                </div>
                            </div>
                            <div class="wareList-bott">
                                <div class="wareList-bottLeft">
                                    <div
                                        class="wareList-bott-startTime time qsk"
                                    >
                                        <span>发起日期：</span>
                                        <span>{{ row.createTime }}</span>
                                    </div>
                                    <div
                                        :class="
                                            row.problemStatus != 5
                                                ? 'hidden'
                                                : ''
                                        "
                                        class="wareList-bott-solveTime time qsk"
                                    >
                                        <span>解决日期：</span>
                                        <span>{{ row.finishTime }}</span>
                                    </div>
                                </div>
                                <div class="wareList-bottRight">
                                    <div
                                        @click="enter('', '', row.id)"
                                        :class="
                                            row.handlerStatus == 0
                                                ? 'hidden'
                                                : ''
                                        "
                                        class="btn btn-link btn-edit resolve"
                                    >
                                        <i class="iconfont icon-chuliwenti"></i
                                        >处理问题
                                    </div>
                                    <div
                                        @click="enter('', '', row.id)"
                                        :class="
                                            row.superviseStatus == 0
                                                ? 'hidden'
                                                : ''
                                        "
                                        class="btn btn-link btn-edit check "
                                    >
                                        <i class="iconfont icon-chuliwenti"></i
                                        >督办问题
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="getData">
            <MassageTip></MassageTip>
        </div>
    </div>
</template>

<script>
import * as inter from "@api/bussiness.js";
import MassageTip from "@/components/business/massageTip";
import { handerSta } from "@/common/constant/constantConst.js";
import { gotoEntURL } from "@/common/utils/index"; //跳转路径
export default {
    props: {
        creditCodes: {
            type: String
        }
    },
    components: {
        MassageTip
    },
    data() {
        return {
            getData: true,
            feedList: []
        };
    },

    mounted() {
        this.initData();
    },
    methods: {
        initData() {
            let params = {
                creditCode: this.creditCodes
            };
            inter.showProblemList(params).then(response => {
                if (response.code == "0000") {
                    this.getData = false;
                    response.data.map((v, i) => {
                        v.recordDtoList.map((value, i) => {
                            this.$set(
                                value,
                                "name",
                                handerSta.get(value.handlerStatus)
                            );
                        });
                    });
                    this.feedList = response.data;
                }
            });
        },
        enter(h, s, id) {
            if (h == 0 && s == 0) {
                gotoEntURL(`feedBackDetail.html?problemId=${id}`);
            }
        }
    }
};
</script>
<style lang="less" scoped>
@borderColor: #e3eaf1;
@inputBg: rgba(0, 0, 0, 0.04);
@inputBorder: #d9d9d9;
@fontNorma: #9399a5;
@successColor: #5c7cec;
@errorColor: #ff6d60;
@wanchenColor: #25b499;
@inputText: rgba(0, 0, 0, 0.25);
@defaultBlueColor: #6b8af0;
.result-list {
    width: 100%;
    padding: 20px;
    .wareList {
        width: 100%;
        min-height: 152px;
        background-color: rgba(255, 255, 255, 1);
        box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.08),
            inset 0px -1px 0px 0px rgba(235, 235, 235, 1);
        margin-bottom: 10px;
        &-top {
            width: 100%;
            min-height: 112px;
            padding: 15px 20px;
            padding-bottom: 0;
            border-bottom: 1px solid #ebebeb;
            font-size: 12px;
            &-title {
                font-size: 14px;
                color: #455467;
                margin-bottom: 6px;

                display: flex;
                .wareList-bott-question {
                    padding: 0 6px;
                    height: 20px;
                    line-height: 20px;
                    background: rgba(255, 109, 96, 0.1);
                    color: #ff6d60;
                    font-size: 12px;
                    margin-left: 10px;
                }
                .wareList-bott-name {
                    font-weight: 600;
                }
            }
            &-desc {
                color: #9399a5;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                line-height: 20px;
            }
            &-process {
                width: 100%;
                min-height: 30px;
                //background: rgba(0,0,0,0.04);
                margin-top: 10px;
                font-size: 12px;
                display: flex;
                align-items: center;
                flex-wrap: wrap;
                .pross {
                    padding: 2px 4px;
                    height: 24px;
                    border: 1px solid @successColor;
                    border-radius: 2px;
                    position: relative;
                    color: @successColor;
                    margin-right: 30px;
                    margin-bottom: 15px;
                    &:after {
                        content: ">";
                        position: absolute;
                        top: 2px;
                        right: -20px;
                        font-weight: 500;
                        color: @successColor;
                    }
                }
                .pross:last-child {
                    &:after {
                        content: "";
                    }
                }
                .noHandle {
                    color: @errorColor;
                    border: 1px solid @errorColor;
                }
                .complete {
                    color: @wanchenColor;
                    border: 1px solid @wanchenColor;
                }
            }
        }
        &-bott {
            height: 40px;
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 20px;
            font-size: 12px;
            .wareList-bottLeft {
                display: flex;
                color: @successColor;
                align-items: center;
                .wareList-bott-question {
                    padding: 0 6px;
                    height: 20px;
                    line-height: 20px;
                    background: rgba(92, 124, 236, 0.1);
                }
                .time {
                    color: #9399a5;
                }
                .qsk {
                    margin-right: 20px;
                }
            }
            .wareList-bottRight {
                .btn-link {
                    text-decoration: none;
                    font-size: 12px;
                }
                .btn-back,
                .btn-supervision {
                    color: @errorColor;
                }
                .btn-resolve {
                    color: @successColor;
                }
            }
        }
    }
}
.hidden {
    display: none;
}
.contentAble {
    cursor: pointer;
}
</style>

