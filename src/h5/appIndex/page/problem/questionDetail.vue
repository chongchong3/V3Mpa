<template>
    <section class="wrapper">
        <problemDetail :problem="problem" />

        <template v-if="showRate">
            <section
                class="module flex-center"
                v-if="problem.fiveStarAssess == null"
            >
                <span>请对我门的服务做出评价</span>
                <van-rate v-model="starParams.starLevel" color="#1492ff"/>
            </section>

            <section class="module flex-center" v-else>
                <span>对我们服务的评价结果</span>
                <van-rate :value="problem.fiveStarAssess" color="#1492ff"/>
            </section>
        </template>

        <section class="footer">
            <van-button @click="routerBack" size="large">取消</van-button>
            <van-button
                @click="starComment"
                size="large"
                type="info"
                v-if="showRate && problem.fiveStarAssess == null"
                >确认</van-button
            >
        </section>
    </section>
</template>

<script>
import problemDetail from "../../../common/problemDetail";
import { getProblemDetail, starComment } from "@api/h5/questionList";
export default {
    data() {
        return {
            problem: {},
            starParams: {
                problemId: "",
                starLevel: 0
            }
        };
    },
    components: {
        problemDetail
    },
    created() {
        let { id } = this.$route.query;

        this.starParams.problemId = id;
        this.getProblemDetail(id);
    },
    computed: {
        showRate() {
            return (
                this.problem.showFiveStarAssess === true &&
                this.problem.problemStatus === 5
            );
        }
    },
    methods: {
        routerBack() {
            this.$router.go(-1);
        },

        getProblemDetail(problemId) {
            return getProblemDetail({ problemId }).then(
                ({ data, code, msg }) => {
                    if (code == 0) {
                        this.problem = data;
                    } else {
                        this.$notify(msg);
                    }
                }
            );
        },

        starComment() {
            starComment(this.starParams).then(res => {
                if (res.code == 0) {
                } else {
                    this.$notify(res.msg);
                }
            });
        }
    }
};
</script>

<style lang="less" scoped>
.wrapper {
    min-height: 100vh;
    padding: 10px 12px;
    background-color: #f7f7f7;

    .module {
        padding: 10px;
        background: #fff;
        box-shadow: 0 2px 8px 0 hsla(0, 0%, 80%, 0.5);
        margin-bottom: 10px;
        font-size: 16px;

        &.flex-center {
            flex-direction: column;
        }
    }
    .footer {
        position: fixed;
        display: flex;
        bottom: 0;
        left: 0;
        width: 100vw;

        .van-button {
            flex: 1;
        }
    }
}
</style>

