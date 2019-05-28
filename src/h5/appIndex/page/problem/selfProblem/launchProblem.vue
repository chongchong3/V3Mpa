<template>
    <div class="launchProblemPage">
        <van-cell-group>
            <van-cell title="企业名称：" class="companyNameCell">
                <el-autocomplete
                    v-model="problem.companyName"
                    :fetch-suggestions="querySearchAsync"
                    placeholder="请输入企业/非企名称"
                    @select="handleSelect"
                    value-key="name"
                ></el-autocomplete>
            </van-cell>

            <van-cell
                title="问题类型："
                is-link
                :value="problemType"
                @click="showPicker = true"
            />

            <van-field
                v-model="problem.linkman"
                label="联系人员："
                placeholder="请输入联系人姓名"
            />
            <van-field
                v-model="problem.mobile"
                label="联系电话："
                placeholder="请输入联系电话"
                type="tel"
            />
        </van-cell-group>

        <van-cell-group style="margin-top: 10px">
            <van-field
                class="problemContent"
                v-model="problem.problemContent"
                label="问题描述："
                type="textarea"
                placeholder="请您尽量一次性描述清楚问题，如目前您面临的问题？您的诉求是什么？"
                rows="10"
                autosize
            />
        </van-cell-group>

        <section id="sectionFooter">
            <button id="buttonCancel" @click="$router.go(-1)">取消</button>
            <button id="buttonEnsure" @click="submitQuestion">确定</button>
        </section>

        <van-popup v-model="showPicker" position="bottom">
            <van-picker
                show-toolbar
                :columns="problemTypeList"
                value-key="name"
                @confirm="onPickerChange"
                @cancel="showPicker = false"
            />
        </van-popup>
    </div>
</template>

<script>
import "../../../less/selfProblem.less";
import * as api from "@api/h5/selfProblem";
import { isEmptyString } from "@/common/utils/index";
import { Notify } from "vant";

export default {
    name: "launchProblem",
    data() {
        return {
            problemType: "",
            problem: {
                companyName: "",
                creditCode: "",
                linkman: "",
                mobile: "",
                problemContent: "",
                problemTypeId: ""
            },
            showPicker: false,
            problemTypeList: [],
            companySearchList: [],
            isLaunchProblem: false
        };
    },
    mounted() {
        this.getProblemTypeList();
    },
    methods: {
        onPickerChange(value, index) {
            this.problem.problemTypeId = value.id;
            this.problemType = value.name;
            this.showPicker = false;
        },
        getProblemTypeList() {
            api.problemTypeList().then(response => {
                this.problemTypeList = response.data || [];
            });
        },
        submitQuestion() {
            if (this.isLaunchProblem) {
                return;
            }
            if (!this.checkData()) {
                this.isLaunchProblem = false;
                return;
            }
            if (!this.checkData2()) {
                this.isLaunchProblem = false;
                return;
            }

            this.isLaunchProblem = true;
            api.launchOrEdit(this.problem)
                .then(data => {
                    if (data.code === "0000") {
                        Notify({
                            background: "#67C23A",
                            message: "问题发起成功"
                        });

                        setTimeout(function() {
                            history.go(-1);
                        }, 1000);
                    } else {
                        Notify("问题添加失败");
                    }
                    this.isLaunchProblem = false;
                })
                .catch(err => {
                    this.isLaunchProblem = false;
                    Notify("问题添加失败");
                });
        },
        checkData() {
            const vm = this;
            if (isEmptyString(this.problem.companyName)) {
                Notify("请输入企业名称");
                return false;
            }
            if (isEmptyString(this.problem.getCreditCode)) {
                const current = vm.companySearchList.find(
                    v => v.name === this.problem.companyName
                );
                if (current) {
                    vm.problem.companyName = current.name;
                    vm.problem.creditCode = current.creditCode;
                    return true;
                } else {
                    Notify("请输入正确的企业名称");
                    return false;
                }
            } else {
                return true;
            }
        },
        checkData2() {
            if (!this.problem.problemTypeId) {
                Notify("请选择问题类型");
                return false;
            }

            if (isEmptyString(this.problem.linkman)) {
                Notify("请输入联系人");
                return false;
            }

            if (isEmptyString(this.problem.mobile)) {
                Notify("请输入联系电话");
                return false;
            }

            if (isEmptyString(this.problem.problemContent)) {
                Notify("请输入问题描述");
                return false;
            }

            return true;
        },
        querySearchAsync(queryString, cb) {
            const vm = this;
            api.getCompanyInfoList({ name: queryString }).then(res => {
                vm.companySearchList = res.data || [];

                clearTimeout(this.timeout);
                vm.timeout = setTimeout(() => {
                    cb(vm.companySearchList);
                }, 3000 * Math.random());
            });
        },
        handleSelect(item) {
            this.problem.companyName = item.name;
            this.problem.creditCode = item.creditCode;
        }
    }
};
</script>

<style lang="less" scoped>
</style>