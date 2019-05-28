<template>
    <section class="wrapper">
        <problemDetail :problem="problem"/>
        <!--处理问题-->
        <template v-if="resolveType === 'resolveProblem'">
            <section class="module">
                <!-- <van-cell
                    title="协作部门"
                    :value="
                        resolveProblemParams.cooperateDepartment
                            .map(item => item.name)
                            .join(',')
                    "
                    is-link
                    @click="showCooDep = true"
                /> -->
                <van-field
                    v-model.trim="resolveProblemParams.opinion"
                    label="处理意见"
                    required
                    type="textarea"
                    placeholder="请输入处理意见"
                    rows="1"
                    autosize
                    :error-message="resolveProblemParamsError.opinion"
                    @blur="
                        checkProp(
                            'opinion',
                            resolveProblemParamsRules.opinion,
                            resolveProblemParams
                        )
                    "
                />
            </section>

            <section class="module">
                <van-cell
                    :value="resolveProblemParams.handlerStatusStr"
                    title="处理结果"
                    is-link
                    @click="showStatusPicker = true"
                />
                <van-cell
                    :value="resolveProblemParams.nextDepartmentIdStr"
                    title="流转部门"
                    is-link
                    @click="showDepPicker = true"
                />
            </section>
            <section class="btn-wrap">
                <van-button
                    type="default"
                    size="large"
                    @click="routerBack"
                    >取消</van-button
                >
                <van-button type="info" @click="confirmResolve" size="large"
                    >确定</van-button
                >
            </section>
        </template>
        <!--督办问题-->
        <template v-if="resolveType === 'supervisionProblem'">
            <section class="module">
                <van-field
                    v-model="superviseProblemParams.leaderOpinion"
                    label="督办问题"
                    type="textarea"
                    placeholder="请输入问题描述"
                    rows="1"
                    autosize
                    :error-message="superviseProblemParamsError.leaderOpinion"
                    @blur="
                        checkProp(
                            'leaderOpinion',
                            superviseProblemParamsRules.leaderOpinion,
                            superviseProblemParams
                        )
                    "
                />
                <div class="checkbox-wrap">
                    <van-checkbox
                        v-model="superviseProblemParams.leaderDepartment"
                        shape="square"
                        >允许部门查看</van-checkbox
                    >
                    <van-checkbox
                        v-model="superviseProblemParams.leaderCompany"
                        shape="square"
                        >允许企业查看</van-checkbox
                    >
                </div>
            </section>

            <div class="btn-wrap">
                <van-button @click="routerBack" style="margin-right: 10px;"
                    >取消</van-button
                >
                <van-button @click="confirmSupervise" type="info"
                    >提交</van-button
                >
            </div>
        </template>

        <!--评价-->
        <template v-if="resolveType === 'problemDetail'">
            <section
                class="module-rate"
                v-if="
                    problem.problemStatus == 5 && problem.fiveStarAssess != null
                "
            >
                <p>企业评价结果</p>
                <van-rate :value="problem.fiveStarAssess" color="#1492ff"/>
            </section>

            <div class="btn-wrap">
                <van-button @click="routerBack" size="large"
                    >取消</van-button
                >
            </div>
        </template>

        <van-popup v-model="showStatusPicker" position="bottom">
            <van-picker
                show-toolbar
                title="处理结果"
                :columns="handlerStatusList"
                value-key="name"
                @cancel="showStatusPicker = false"
                @confirm="
                    setResolveValue($event, 'handlerStatus', 'showStatusPicker')
                "
            />
        </van-popup>

        <van-actionsheet v-model="showCooDep" title="协作部门">
            <van-checkbox-group
                v-model="resolveProblemParams.cooperateDepartment"
            >
                <van-cell-group>
                    <van-cell
                        v-for="(item, index) in depList"
                        clickable
                        :key="item.id"
                        :title="`${item.name}`"
                        @click="toggleCooDep(index)"
                    >
                        <van-checkbox :name="item" ref="cooDepCheckboxes" />
                    </van-cell>
                </van-cell-group>
            </van-checkbox-group>
        </van-actionsheet>

        <van-popup v-model="showDepPicker" position="bottom">
            <van-picker
                show-toolbar
                title="流转部门"
                :columns="depList"
                value-key="name"
                @cancel="showDepPicker = false"
                @confirm="
                    setResolveValue($event, 'nextDepartmentId', 'showDepPicker')
                "
            />
        </van-popup>
    </section>
</template>

<script>
import problemDetail from "../../../common/problemDetail";
import {
    getProblemDetail,
    getDepartmentList,
    handlerProblem,
    superviseProblem
} from "@api/h5/resolveProblem";
// import { getUrlParam } from "@/common/utils/url.js";
import { checkProp, checkProps, getUrlParam } from "@/common/utils/index";

export default {
    data() {
        return {
            resolveType: "problemDetail",

            depList: [],
            showDepPicker: false,
            showCooDep: false,

            showStatusPicker: false,
            handlerStatusList: [
                { name: "继续流转", id: 5 },
                { name: "处理完成", id: 8 },
                { name: "无法处理", id: 6 },
                { name: "派单退回", id: 7 }
            ],

            problem: { cooperateList: [] },

            // 解决问题 params, errMsg, rules
            resolveProblemParams: {
                problemId: "",
                nextDepartmentIdStr: "",
                nextDepartmentId: "",
                opinion: "",
                cooperateDepartment: [],
                cooperateDepartmentIdStr: "",
                handlerStatus: 5,
                handlerStatusStr: "继续流转"
            },
            resolveProblemParamsError: {
                opinion: ""
            },
            resolveProblemParamsRules: {
                opinion: {
                    required: true,
                    cb: flag =>
                        (this.resolveProblemParamsError.opinion = flag
                            ? ""
                            : "请输入处理意见")
                },
                handlerStatus: {
                    required: true,
                    cb: flag => !flag && this.$notify("请选择处理结果")
                },
                nextDepartmentId: {
                    validator(val, obj) {
                        if (obj.handlerStatus === 5 && !val) {
                            return false;
                        }
                        return true;
                    },
                    cb: flag => !flag && this.$notify("请选择流转部门")
                }
            },

            superviseProblemParams: {
                problemId: "",
                leaderOpinion: "",
                leaderDepartment: false,
                leaderCompany: false
            },
            superviseProblemParamsError: {
                leaderOpinion: ""
            },
            superviseProblemParamsRules: {
                leaderOpinion: {
                    required: true,
                    cb: flag =>
                        (this.superviseProblemParamsError.leaderOpinion = flag
                            ? ""
                            : "请输入督办问题")
                }
            }
        };
    },
    components: {
        problemDetail
    },
    created() {
        // 协作部门已取消

        this.resolveType = getUrlParam("type") || "resolveProblem";

        let problemId = getUrlParam("id");
        this.getProblemDetail(problemId);
        if (this.resolveType == "resolveProblem") {
            document.title = "处理问题";
            this.resolveProblemParams.problemId = problemId;

            this.getDepList().then(res => {
                this.resolveProblemParams.nextDepartmentId = this.depList[0].id;
                this.resolveProblemParams.nextDepartmentIdStr = this.depList[0].name;
            });
        } else if (this.resolveType == "supervisionProblem") {
            document.title = "督办问题";
            this.superviseProblemParams.problemId = problemId;
        } else {
            document.title = "问题详情";
        }
    },

    methods: {
        checkProp,

        toggleCooDep(idx) {
            this.$refs.cooDepCheckboxes[idx].toggle();
        },

        routerBack() {
            this.$router.go(-1);
        },

        confirmSupervise() {
            if (
                !checkProps(
                    this.superviseProblemParamsRules,
                    this.superviseProblemParams
                )
            ) {
                return;
            }

            let { ...params } = this.superviseProblemParams;
            params.leaderDepartment = +params.leaderDepartment;
            params.leaderCompany = +params.leaderCompany;
            superviseProblem(params).then(res => {
                if (res.code == 0) {
                    this.$toast.success(res.msg);
                    this.routerBack();
                } else {
                    this.$notify(res.msg);
                }
            });
        },

        // 处理合作部门并提交===>处理问题
        confirmResolve() {
            if (
                !checkProps(
                    this.resolveProblemParamsRules,
                    this.resolveProblemParams
                )
            ) {
                return;
            }

            this.resolveProblemParams.cooperateDepartmentIdStr = this.resolveProblemParams.cooperateDepartment
                .map(item => item.id)
                .join(",");

            let {
                nextDepartmentIdStr,
                cooperateDepartment,
                handlerStatusStr,
                ...params
            } = this.resolveProblemParams;
            handlerProblem(params).then(res => {
                if (res.code == 0) {
                    this.$toast.success(res.msg);
                    this.routerBack();
                } else {
                    this.$notify(res.msg);
                }
            });
        },

        setResolveValue(event, prop, popup) {
            this.resolveProblemParams[prop] = event.id;
            this.resolveProblemParams[prop + "Str"] = event.name;
            this[popup] = false;
        },

        getProblemDetail(problemId) {
            return getProblemDetail({ problemId }).then(res => {
                if (res.code == 0) {
                    res.data.recordDtoList = res.data.recordDtoList.reverse();
                    this.problem = res.data;
                } else {
                    this.$notify(res.msg);
                }
            });
        },

        getDepList() {
            return getDepartmentList().then(res => {
                if (res.code == 0) {
                    this.depList = res.data;
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
    min-height: 100vh;
    padding: 12px 12px 60px;
    font-size: 14px;
    background-color: #f7f7f7;

    .module {
        margin-bottom: 10px;
        border-radius: 4px;
        box-shadow: 0 1px 4px 2px hsla(0, 0%, 80%, 0.5);

        .checkbox-wrap {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 15px;
            background-color: #fff;
        }

        &-rate {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 20px;
            background-color: #fff;
            border-radius: 4px;
            box-shadow: 0 1px 4px 2px hsla(0, 0%, 80%, 0.5);
            margin-bottom: 10px;
            font-size: 16px;
            line-height: 32px;
        }
    }
}

.btn-wrap{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;    
    display: flex;
    .van-button{
        flex: 1;
    }
}

</style>