<template>
    <div class="wrapper">
        <form action="/" class="toolbar">
            <van-search
                v-model="filters.key"
                placeholder="请输入企业名称、问题类型等关键词"
                show-action
            >
                <van-icon
                    slot="action"
                    name="calender-o"
                    size=".8rem"
                    @click="showDataPicker = true"
                />
            </van-search>
            <div class="flex-around">
                <div @click="showCompanyLabelListPikcer = true">
                    企业类型<van-icon name="arrow-down" size="14px" />
                </div>
                <div @click="showProblemTypeListPikcer = true">
                    问题类型<van-icon name="arrow-down" size="14px" />
                </div>

                <!-- 额外筛选条件 -->
                <slot name="filterItem"></slot>
            </div>
        </form>

        <section class="list-wrap">
            <span>当前共有{{ total }}条记录</span>

            <slot v-for="item in data" :item="item"> </slot>

            <div class="flex-center" v-show="isLoadingList">
                <van-loading type="spinner" style="margin-right: 20px;" />
                正在加载
            </div>
        </section>

        <van-popup v-model="showDataPicker" position="bottom">
            <van-datetime-picker
                :value="filters.startTime"
                type="date"
                :min-date="minDate"
                @confirm="
                    setPopoverValue($event, 'startTime', 'showDataPicker')
                "
                @cancel="showDataPicker = false"
            />
        </van-popup>

        <van-popup v-model="showCompanyLabelListPikcer" position="bottom">
            <van-picker
                show-toolbar
                title="企业类型"
                :columns="companyLabelList"
                value-key="name"
                @cancel="showCompanyLabelListPikcer = false"
                @confirm="
                    setPopoverValue(
                        $event,
                        'labelCode',
                        'showCompanyLabelListPikcer'
                    )
                "
            />
        </van-popup>

        <van-popup v-model="showProblemTypeListPikcer" position="bottom">
            <van-picker
                show-toolbar
                title="问题类型"
                :columns="problemTypeList"
                value-key="name"
                @cancel="showProblemTypeListPikcer = false"
                @confirm="
                    setPopoverValue(
                        $event,
                        'problemTypeId',
                        'showProblemTypeListPikcer'
                    )
                "
            />
        </van-popup>

        <slot name="pickers"></slot>
    </div>
</template>
<script>
import { getCompanyLabelList, getProblemTypeList } from "@api/h5/problemFlow";
import { format } from "@/common/utils/index";

import { LISTOPTION } from "@/common/constant/constant.js";
import mutipartFilter from "@/common/mixins/mutipartFilter.js";
import scrollToBottom from "@/common/mixins/scrollToBottom.js";

export default {
    props: {
        baseFilters: {
            required: true,
            type: Object
        },

        getFilterList: {
            required: true,
            type: Function
        },

        total: {
            required: true,
            type: Number
        },
        data: {
            required: true,
            type: Array
        }
    },
    mixins: [mutipartFilter, scrollToBottom],
    data() {
        return {
            showDataPicker: false,
            minDate: new Date(2015, 0, 1),

            filters: {
                pageNum: 1,
                labelCode: "",
                problemTypeId: "",
                startTime: "",
                problemSolveStatus: "",
                key: ""
            },
            isLoadingList: false,

            showCompanyLabelListPikcer: false,
            companyLabelList: [],
            showProblemTypeListPikcer: false,
            problemTypeList: []
        };
    },

    created() {
        this.filters = this.baseFilters;
        this.getCompanyLabel();
        this.getProblemType();
    },

    methods: {
        handlerScroll() {
            if (
                this.isBottomOut() &&
                this.total > this.data.length &&
                this.isLoadingList === false
            ) {
                this.isLoadingList = true;
                this.filters.pageNum++;
            }
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

        getProblemType() {
            getProblemTypeList().then(res => {
                if (res.code == 0) {
                    res.data.unshift({ name: "全部", id: "" });
                    this.problemTypeList = res.data;
                } else {
                    this.$notify(res.msg);
                }
            });
        },

        getCompanyLabel() {
            getCompanyLabelList().then(res => {
                if (res.code == 0) {
                    res.data.unshift({ name: "全部", id: "" });
                    this.companyLabelList = res.data;
                } else {
                    this.$notify(res.msg);
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

    .list-wrap {
        padding: 10px 16px 0;
    }
}
</style>