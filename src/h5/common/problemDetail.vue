<template>
    <div>
        <section class="module">
            <van-cell title="企业名称" :value="problem.companyName" />
            <van-cell title="问题类型" :value="problem.problemTypeName" />
            <van-cell title="联系人员" :value="problem.linkman" />
            <van-cell title="联系电话" :value="problem.mobile" />
            <!--协作部门-->
            <!-- <van-cell
                title="协作部门"
                :value="problem.cooperateList.map(item => item.name).join(',')"
                v-if="
                    resolveType === 'problemDetail' &&
                        problem.cooperateList.length > 0
                "
            /> -->
        </section>

        <section class="module">
            <van-cell title="企业描述" :label="problem.problemContent" />
        </section>

        <section class="module">
            <van-steps
                direction="vertical"
                :active="0"
            >
                <van-step
                    v-for="record in problem.recordDtoList"
                    :key="record.id"
                >
                    <div class="flex-between">
                        <span class="item-name">{{
                            record.handlerName
                        }}</span>
                        <span class="item-time">{{ record.createTime }}</span>
                    </div>
                    <div>{{ record.content }}</div>
                    <div class="step-bottom">
                        <div class="item-status">{{ record.handlerStatusStr }}</div>
                        <div
                            class="leader-opinion"
                            :class="showOpinion ? 'leader-opinion-shadow' : ''"
                            @click="changeOpinion"
                            v-if="record.superviseList.length"
                        >
                            <div style="text-align:right">
                                <span>领导督办</span>
                                <van-icon
                                    :name="
                                        showOpinion ? 'arrow-down' : 'arrow-up'
                                    "
                                    style="position:static"
                                />
                            </div>
                            <section v-show="showOpinion">
                                <div
                                    class="opinion-item"
                                    v-for="supervise in record.superviseList"
                                    :key="supervise.id"
                                >
                                    <div class="opinion-name">
                                        {{ supervise.leaderName }}
                                    </div>
                                    <div class="opinion-con">
                                        {{ supervise.leaderOpinion }}
                                    </div>
                                    <div class="opinion-time">
                                        {{ supervise.createTime }}
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </van-step>
            </van-steps>
        </section>
    </div>
</template>

<script>
export default {
    props: {
        problem: {
            required: true,
            type: Object
        }
    },
    data() {
        return {
            arrowIcon: "arrow-up",
            showOpinion: false
        };
    },
    methods: {
        changeOpinion() {
            this.showOpinion = !this.showOpinion;
        }
    }
};
</script>

<style lang="less" scoped>
.module {
    margin-bottom: 10px;
    border-radius: 4px;
    box-shadow: 0 1px 4px 2px hsla(0, 0%, 80%, 0.5);

    .van-steps {
        overflow: visible;
    }
    .van-step--vertical {
        font-size: 12px;
    }

    .step-bottom {
        position: relative;
    }

    .leader-opinion {
        position: absolute;
        width: 50vw;
        right: 0;
        top: -10px;
        padding: 10px;
        z-index: 999;

        &-shadow {
            box-shadow: 0 1px 4px 2px hsla(0, 0%, 80%, 0.5);
            background-color: #fff;
        }
    }

    .item{
        &-name{
            line-height: 28px;
            font-size: 14px;
            color: #101d37;
        }
        &-time,&-status {
            color: #1492ff;
        }
    }

    .opinion {
        &-item {
            border-bottom: 1px solid #ccc;
            padding: 6px;
        }
        &-name {
            font-size: 14px;
            line-height: 24px;
        }
        &-con {
            color: #999;
        }
        &-time {
            color: #1492ff;
        }
    }
}

</style>