<template>
    <problemList
        :baseFilters="filters"
        :getFilterList="getFilterList"
        :data="problemFlowList"
        :total="total"
    >
        <div @click="showProblemStatusPicker = true" slot="filterItem">
            派单类型<van-icon name="arrow-down" size="14px" />
        </div>

        <van-popup
            slot="pickers"
            v-model="showProblemStatusPicker"
            position="bottom"
        >
            <van-picker
                show-toolbar
                title="派单状态"
                :columns="problemStatus"
                value-key="label"
                @cancel="showProblemStatusPicker = false"
                @confirm="
                    setPopoverValue(
                        $event,
                        'problemStatus',
                        'showProblemStatusPicker'
                    )
                "
            />
        </van-popup>

        <template slot-scope="scope">
            <section
                class="list-item"
                @click="routerToPage(scope.item.id, scope.item.problemStatus)"
            >
                <div class="flex-between">
                    <div>
                        <span class="list-tit">
                            {{ scope.item.companyName }}
                        </span>
                        <van-tag type="primary">
                            {{ scope.item.problemTypeName }}
                        </van-tag>
                    </div>
                    <span style="color:#ffa007">
                        {{ problemStatus[scope.item.problemStatus].label }}
                    </span>
                </div>
                <div class="item-con">
                    <div class="text">发起人：{{ scope.item.launchName }}</div>
                </div>
                <div>发起时间：{{ scope.item.createTime }}</div>
            </section>
        </template>
    </problemList>
</template>

<script>
import problemList from "../../../common/problemList";
import { getProblemDepotList } from "@api/h5/problemWarehouse";

import { LISTOPTION } from "@/common/constant/constant.js";

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
                problemStatus: "",
                key: ""
            },

            // id === idx 做map的时候比较方便
            problemStatus: [
                {
                    label: "全部",
                    id: null
                },
                {
                    label: "待派单",
                    id: 1
                },
                {
                    label: "已派单",
                    id: 2
                },
                {
                    label: "派单退回",
                    id: 3
                },
                {
                    label: "无法解决",
                    id: 4
                }
            ]
        };
    },

    methods: {
        // popover 的值set到filters中
        setPopoverValue(e, prop, popover) {
            this.filters[prop] = e.id;
            this[popover] = false;
        },

        routerToPage(id, status) {
            if (status == 2) {
                //已派单
                this.$router.push({
                    name: 'resolveProblem',
                    query: {
                        type: 'problemDetail',
                        id
                    }
                })
            } else {
                this.$router.push({
                    name: 'problemDetail',
                    query: {
                        id
                    }
                })
            }
        },

        /**
         * @params { 1: 在之前往后加， 0: 覆盖} state
         */
        getFilterList(state) {
            return getProblemDepotList(this.filters).then(res => {
                if (res.code == 0) {
                    if (state === LISTOPTION.COVER) {
                        this.problemFlowList = res.data.results;
                    } else {
                        this.problemFlowList.push(...res.data.results);
                    }
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
            font-size: 12px;
            color: #999;
        }
        &-tit {
            margin-right: 10px;
            font-size: 14px;
            color: #101d37;
        }
    }
}
</style>