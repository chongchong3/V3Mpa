<template>
    <section class="wrapper">
        <section class="module-wrap">
            <section class="module">
                <van-cell
                    title="企业名称"
                    :value="questionParams.companyName"
                />
                <van-field
                    label="问题类型"
                    :value="questionParams.problemTypeStr"
                    :error-message="questionParamsError.problemTypeId"
                    placeholder="请选择问题类型"
                    readonly
                    is-link
                    @click.native="showPicker = true"
                />
                <van-field
                    label="联系人员"
                    v-model="questionParams.linkman"
                    :error-message="questionParamsError.linkman"
                    placeholder="请输入联系人姓名"
                    @blur="
                        checkProp(
                            'linkman',
                            questionParamsRules.linkman,
                            questionParams
                        )
                    "
                />
                <van-field
                    label="联系电话"
                    v-model="questionParams.mobile"
                    :error-message="questionParamsError.mobile"
                    placeholder="请输入联系电话"
                    @blur="
                        checkProp(
                            'mobile',
                            questionParamsRules.mobile,
                            questionParams
                        )
                    "
                />
            </section>

            <section class="module">
                <van-field
                    v-model="questionParams.problemContent"
                    label="问题描述"
                    type="textarea"
                    placeholder="请输入问题描述"
                    rows="3"
                    autosize
                />
            </section>
        </section>

        <section class="btn-wrap">
            <van-button class="btn" @click="routerBack">取消</van-button>
            <van-button type="info" class="btn" @click="submitForm"
                >确认</van-button
            >
        </section>

        <van-popup v-model="showPicker" position="bottom">
            <van-picker
                show-toolbar
                title="标题"
                :columns="problemType"
                value-key="name"
                @cancel="showPicker = false"
                @confirm="confirmPicker"
            />
        </van-popup>
    </section>
</template>

<script>
import {
    getProblemType,
    submitProblem,
    getUserInfo,
    getProblemDetail
} from "@api/h5/questionList";
import { checkProp, checkProps, getUrlParams } from "@/common/utils/index.js";
// import { getUrlParams } from "@/common/utils/url.js";
export default {
    data() {
        return {
            problemType: [],
            questionParams: {
                id: "",
                companyName: "",
                creditCode: "",
                problemTypeId: -1,
                problemTypeStr: "",
                linkman: "",
                mobile: "",
                problemContent: ""
            },
            questionParamsError: {
                problemTypeId: "",
                linkman: "",
                mobile: "",
                problemContent: ""
            },
            questionParamsRules: {
                problemTypeId: {
                    required: true,
                    cb: flag =>
                        (this.questionParamsError.problemTypeId = flag
                            ? ""
                            : "请选择问题类型")
                },
                linkman: {
                    required: true,
                    cb: flag => {
                        console.log(flag);
                        this.questionParamsError.linkman = flag
                            ? ""
                            : "请输入联系人员";
                    }
                },
                mobile: {
                    reg: /^1[3,4,5,7,8][0-9]{9}$/,
                    cb: flag =>
                        (this.questionParamsError.mobile = flag
                            ? ""
                            : "请输入正确的联系电话")
                },
                problemContent: {
                    required: true,
                    cb: flag =>
                        (this.questionParamsError.linkman = flag
                            ? ""
                            : "请输入联系人员")
                }
            },

            showPicker: false
        };
    },
    created() {
        let { type, id } = getUrlParams();
        this.getProblemType();
        this.getUserInfo();
        if (type === "update" && id) {
            this.getProblemDetail(id);
        }
    },
    methods: {
        checkProp,

        routerBack() {
            this.$router.back();
        },

        confirmPicker(e) {
            this.questionParams.problemTypeId = e.id;
            this.questionParams.problemTypeStr = e.name;
            this.showPicker = false;
        },

        submitForm() {
            if (!checkProps(this.questionParamsRules, this.questionParams)) {
                return;
            }

            submitProblem(this.questionParams).then(res => {
                if (res.code == 0) {
                    this.$toast.success("操作成功!");
                    this.routerBack();
                } else {
                    this.$notify(res.msg);
                }
            });
        },

        getUserInfo() {
            return getUserInfo().then(res => {
                if (res.code == 0) {
                    this.questionParams.companyName = res.data.entName;
                    this.questionParams.creditCode = res.data.creditCode;
                } else {
                    this.$notify(res.msg);
                }
            });
        },

        getProblemType() {
            return getProblemType().then(res => {
                if (res.code == 0) {
                    this.problemType = res.data;
                } else {
                    this.$notify(res.msg);
                }
            });
        },

        getProblemDetail(problemId) {
            return getProblemDetail({ problemId }).then(
                ({ data, code, msg }) => {
                    if (code == 0) {
                        this.questionParams.id = data.id;
                        this.questionParams.problemTypeStr =
                            data.problemTypeName;
                        this.questionParams.problemTypeId = data.problemTypeId;
                        this.questionParams.linkman = data.linkman;
                        this.questionParams.mobile = data.mobile;
                        this.questionParams.problemContent =
                            data.problemContent;
                    } else {
                        this.$notify(msg);
                    }
                }
            );
        }
    }
};
</script>

<style lang="less" scoped>
.wrapper {
    background-color: #f7f7f7;
    min-height: 100vh;
}
.module {
    box-shadow: 0 2px 8px 0 hsla(0, 0%, 80%, 0.5);
    margin-bottom: 10px;
    &-wrap {
        padding: 12px;
    }
}

.btn-wrap {
    position: fixed;
    width: 100vw;
    display: flex;
    bottom: 0;

    .btn {
        flex: 1;
    }
}
</style>
