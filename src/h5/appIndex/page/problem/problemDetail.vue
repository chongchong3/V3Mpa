<template>
    <section class="wrapper">
        <problemDetail :problem="problem" />

        <section class="module">
            <van-cell
                title="处理结果"
                :label="popupList[resolveType].label"
                is-link
                @click="showPopup = true"
            ></van-cell>
        </section>

        <template v-if="resolveType === 0">
            <section class="module">
                <van-field
                    label="牵头部门"
                    is-link
                    readonly
                    input-align="right"
                    :value="problemDispatch.leadDepartment.name"
                    :error-message="problemDispatchError.leadDepartment"
                    @click="showDepRadio = true"
                ></van-field>
                <van-field
                    label="协作部门"
                    :value="
                        problemDispatch.cooperateDepartment
                            .map(item => item.name)
                            .join(',')
                    "
                    is-link
                    readonly
                    input-align="right"
                    @click="showDepCheckBox = true"
                ></van-field>
            </section>
        </template>

        <template v-if="resolveType === 1">
            <section class="module">
                <van-field
                    v-model="problemBack.backReason"
                    :error-message="problemBackError.backReason"
                    label="退回理由"
                    type="textarea"
                    placeholder="请输入退回理由"
                    rows="3"
                    autosize
                    @blur="
                        checkProp(
                            'backReason',
                            problemBackRules.backReason,
                            problemBack
                        )
                    "
                />
            </section>
        </template>

        <section class="footer">
            <van-button @click="routerBack">取消</van-button>
            <van-button type="info" @click="submitForm">确定</van-button>
        </section>

        <van-popup v-model="showPopup" position="bottom">
            <van-picker
                show-toolbar
                title="处理结果"
                :columns="popupList"
                value-key="label"
                @cancel="showPopup = false"
                @confirm="confirmResolveType"
            />
        </van-popup>

        <van-popup v-model="showDepRadio" position="bottom">
            <van-picker
                show-toolbar
                title="领头部门"
                :columns="depList"
                value-key="name"
                @cancel="showDepRadio = false"
                @confirm="confirmDepRadio"
            />
        </van-popup>

        <van-actionsheet v-model="showDepCheckBox" title="协作部门">
            <van-checkbox-group v-model="problemDispatch.cooperateDepartment">
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
    </section>
</template>

<script>
import problemDetail from "../../../common/problemDetail";
import {
    problemGoBack,
    problemDispatch,
    getProblemDetail,
    getDepartmentList
} from "@api/h5/problemWarehouse";

import { checkProp, checkProps } from "@/common/utils/index";

export default {
    data() {
        return {
            problem: {},

            resolveType: 0,
            problemBack: {
                problemId: "",
                backReason: ""
            },
            problemBackError: { backReason: "" },
            problemBackRules: {
                backReason: {
                    required: true,
                    cb: flag =>
                        (this.problemBackError.backReason = flag
                            ? ""
                            : "请输入退回原因")
                }
            },

            showPopup: false,
            popupList: [
                {
                    id: 0,
                    label: "问题派单"
                },
                {
                    id: 1,
                    label: "问题退回"
                }
            ],

            showDepRadio: false,
            showDepCheckBox: false,
            depList: [],
            problemDispatch: {
                problemId: "",
                leadDepartment: {},
                leadDepartmentId: "",
                cooperateDepartment: [],
                cooperateDepartmentIdStr: ""
            },
            problemDispatchError: {
                leadDepartment: ""
            },
            problemDispatchRules: {
                leadDepartment: {
                    validator(value, obj){
                        console.log(!!value.id)
                        return !!value.id;
                    },
                    cb: flag =>
                        (this.problemDispatchError.leadDepartment = flag
                            ? ""
                            : "请选择牵头部门")
                }
            }
        };
    },
    components: {
        problemDetail
    },
    created() {
        let { id } = this.$route.query;

        this.problemBack.problemId = id;
        this.problemDispatch.problemId = id;
        this.getProblemDetail(id);
        this.getDepList();
    },
    methods: {
        checkProp,

        routerBack() {
            this.$router.go(-1);
        },

        submitForm() {
            let req, param;
            if (this.resolveType === 0) {
                if(!checkProps(this.problemDispatchRules, this.problemDispatch)){
                    return;
                }
                req = problemDispatch;
                param = {
                    problemId: this.problemDispatch.problemId,
                    leadDepartmentId: this.problemDispatch.leadDepartment.id,
                    cooperateDepartmentIdStr: this.problemDispatch.cooperateDepartment
                        .map(item => item.id)
                        .join(",")
                };
            } else {
                if(!checkProps(this.problemBackRules, this.problemBack)){
                    return;
                }
                req = problemGoBack;
                param = this.problemBack;
            }

            req(param).then(res => {
                if (res.code == 0) {
                    this.$toast(res.msg);
                    this.routerBack();
                } else {
                    this.$notify(res.msg);
                }
            });
        },

        toggleCooDep(idx) {
            this.$refs.cooDepCheckboxes[idx].toggle();
        },
        confirmResolveType(val) {
            this.showPopup = false;
            this.resolveType = val.id;
        },
        confirmDepRadio(val) {
            this.problemDispatch.leadDepartment = val;
            this.showDepRadio = false;
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

<style lang="less" scoped>
.wrapper {
    min-height: 100vh;
    box-sizing: border-box;
    padding: 10px 12px 44px;
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