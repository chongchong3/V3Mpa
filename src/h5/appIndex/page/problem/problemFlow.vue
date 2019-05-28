<template>
    <problemList
        :baseFilters="filters"
        :getFilterList="getFilterList"
        :data="problemFlowList"
        :total="total"
    >
        <div @click="showProblemStatusPicker = true" slot="filterItem">
            问题类型<van-icon name="arrow-down" size="14px" />
        </div>

        <van-popup
            v-model="showProblemStatusPicker"
            position="bottom"
            slot="pickers"
        >
            <van-picker
                show-toolbar
                title="问题状态"
                :columns="problemStatus"
                value-key="label"
                @cancel="showProblemStatusPicker = false"
                @confirm="
                    setPopoverValue(
                        $event,
                        'problemSolveStatus',
                        'showProblemStatusPicker'
                    )
                "
            />
        </van-popup>

        <template slot-scope="scope">
            <section class="list-item" @click="routerToPage(scope.item.id)">
                <div>
                    <span style="margin-right: 10px;">
                        {{ scope.item.companyName }}
                    </span>
                    <van-tag type="primary">
                        {{ scope.item.problemTypeName }}
                    </van-tag>
                </div>
                <div class="item-con">
                    <div class="text">{{ scope.item.problemContent }}</div>
                </div>
                <div>{{ scope.item.createTime }}</div>
            </section>
        </template>
    </problemList>
</template>
<script>
import problemList from "../../../common/problemList";

import { getProblemFlowList } from "@api/h5/problemFlow";

import { LISTOPTION } from "@/common/constant/constant";

export default {
    components: {
        problemList
    },
    data() {
        return {
            showProblemStatusPicker: false,
            problemFlowList: [],
            total: 0,

            filters: {
                pageNum: 1,
                labelCode: "",
                problemTypeId: "",
                startTime: "",
                problemSolveStatus: "",
                key: ""
            },

            problemStatus: [
                {
                    label: "全部",
                    id: ""
                },
                {
                    label: "未解决",
                    id: 0
                },
                {
                    label: "已解决",
                    id: 1
                }
            ]
        };
    },

    methods: {
        routerToPage(id) {
            this.$router.push({
                name: 'resolveProblem',
                query:{
                    type: 'problemDetail',
                    id
                }
            })
        },

        // popover 的值set到filters中
        setPopoverValue(e, prop, popover) {
            if (e instanceof Date) {
                e = format(e);
            } else {
                e = e.id;
            }
            this.filters[prop] = e;
            this[popover] = false;
        },

        /**
         * @params { 1: 在之前往后加， 0: 覆盖} state
         */
        getFilterList(state) {
            return getProblemFlowList(this.filters).then(res => {
                if (res.code == 0) {
                    if (state === LISTOPTION.COVER) {
                        this.problemFlowList = res.data.results;
                    } else {
                        this.problemFlowList.push(...res.data.results);
                    }
                    this.showLoading = false;
                    this.total = res.data.totalRecord;
                } else {
                    this.$notify(res.data);
                }
            });
        }
    }
};
</script>
<style lang="less" scoped='scoped'>
// less已使用px2rem，直接使用375适配的px就行

.van-search__action {
    line-height: normal;
}
.wrapper {
    font-size: 14px;

    .toolbar {
        position: sticky;
        top: 0;
        background-color: #fff;
    }

    .list {
        &-wrap {
            padding: 10px 16px 0;
        }

        &-item {
            height: 90px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 10px;
            margin: 10px 0;
            box-shadow: 0 1px 4px 2px hsla(0, 0%, 80%, 0.5);

            .item-con {
                color: #999;

                height: 40px;
                line-height: 20px;
                overflow: hidden;

                .text {
                    float: right;
                    margin-left: -5px;
                    width: 100%;
                    word-break: break-all;
                }

                &::before {
                    float: left;
                    width: 5px;
                    content: "";
                    height: 40px;
                }

                &::after {
                    float: right;
                    content: "...";
                    height: 20px;
                    line-height: 20px;
                    /* 为三个省略号的宽度 */
                    width: 3em;
                    /* 使盒子不占位置 */
                    margin-left: -3em;
                    /* 移动省略号位置 */
                    position: relative;
                    left: 100%;
                    top: -20px;
                    padding-right: 5px;
                    background-color: #fff;
                }
            }
        }
    }
}
</style>