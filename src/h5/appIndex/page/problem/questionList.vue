<template>
    <section class="wrapper">
        <van-search placeholder="请输入搜索关键词" v-model="filters.appKey" />
        <section class="list">
            <div
                class="item"
                v-for="item in problemList"
                :key="item.id"
                @click="routerToDetail(item.id)"
            >
                <div class="flex-between">
                    <div>
                        <span class="item-tit">{{ item.companyName }}</span>
                        <van-tag type="primary">
                            {{ item.problemTypeName }}
                        </van-tag>
                    </div>
                    <span style="color:#ffa007">
                        {{ problemStatusMapper[item.problemStatus] }}
                    </span>
                </div>
                <div style="color: #999;">
                    <p class="item-desc">问题描述：{{ item.problemContent }}</p>
                    <template v-if="item.problemStatus === 6">
                        <p>退回理由：{{ item.backReason }}</p>
                        <p>
                            操作：
                            <van-button
                                size="mini"
                                @click.stop="routerToForm('update', item.id)"
                                type="info"
                            >
                                修改
                            </van-button>
                            <van-button
                                size="mini"
                                @click.stop="deleteProblem(item.id)"
                                type="danger"
                            >
                                删除
                            </van-button>
                        </p>
                    </template>
                </div>
                <div style="color: #999;">{{ item.createTime }}</div>
            </div>
            <div class="flex-center" v-show="isLoadingList">
                <van-loading type="spinner" style="margin-right: 10px;" />
                正在加载
            </div>
        </section>

        <van-button
            size="large"
            class="btn-add"
            type="info"
            @click="routerToForm('created')"
            >新增问题</van-button
        >
    </section>
</template>
<script>
import { getProblemList, deleteProblem } from "@api/h5/questionList";
// import { problemStatusMapper } from "@/common/constant.js";
import { LISTOPTION, problemStatusMapper } from "@/common/constant/constant";
import mutipartFilter from "@/common/mixins/mutipartFilter.js";
import scrollToBottom from "@/common/mixins/scrollToBottom.js";
export default {
    data() {
        return {
            problemStatusMapper,

            isLoadingList: false,
            total: 0,
            filters: {
                pageSize: 20,
                pageNum: 1,
                appKey: ""
            },
            problemList: []
        };
    },

    mixins: [mutipartFilter, scrollToBottom],

    created() {
        this.getFilterList(LISTOPTION.COVER);
    },

    methods: {
        handlerScroll() {
            if (
                this.isBottomOut() &&
                this.total > this.problemList.length &&
                this.isLoadingList === false
            ) {
                this.isLoadingList = true;
                this.filters.pageNum++;
            }
        },

        routerToDetail(id) {
            this.$router.push({
                name: "questionDetail",
                query: {
                    id
                }
            });
        },

        routerToForm(type, id) {
            this.$router.push({
                name: "questionForm",
                query: {
                    type,
                    id
                }
            });
        },

        deleteProblem(problemId) {
            deleteProblem({ problemId }).then(res => {
                if (res.coed == 0) {
                    this.$toast.success("删除成功!");
                    if (this.filters.pageNum === 1) {
                        this.getFilterList(LISTOPTION.COVER);
                    } else {
                        this.filters.pageNum = 1;
                    }
                } else {
                    this.$notify(res.msg);
                }
            });
        },

        /**
         * @params { 0: 覆盖 1: 往后加} status
         */
        getFilterList(status) {
            return getProblemList(this.filters).then(res => {
                if (res.code == 0) {
                    if (status === LISTOPTION.COVER) {
                        this.problemList = res.data.results;
                    } else {
                        this.problemList.push(...res.data.results);
                    }
                    this.total = res.data.totalRecord;
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
.wrapper {
    box-sizing: border-box;
    background-color: #f8f8f9;
    min-height: 100vh;
    padding-bottom: 48px;
}
.van-search {
    position: sticky;
    top: 0;
    z-index: 999;
}
.list {
    padding: 10px 17px 40px;
    font-size: 12px;
}

.item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 10px;
    padding: 10px;
    box-shadow: 0 1px 4px 2px hsla(0, 0%, 80%, 0.5);
    background-color: #fff;
    min-height: 70px;

    &-tit {
        font-size: 14px;
        margin-right: 10px;
    }

    &-desc{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}
.btn-add {
    position: fixed;
    bottom: 0;
}
</style>