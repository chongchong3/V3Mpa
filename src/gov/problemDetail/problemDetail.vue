<template>
    <BasePage>
        <section>
            <div class="content-container-outer" id="problemDetailPageCOuter">
                <div class="ys-back-btn" @click="goBack"></div>
                <section class="companyBox">
                    <div class="header">
                        <div class="name">
                            <i class="iconfont icon-qiyetubiaox"></i>
                            {{ problemDetail.companyName }}
                        </div>
                        <div class="labels-outer">
                            <span>{{ problemDetail.problemTypeName }}</span>
                        </div>
                    </div>
                    <p>
                        <span>联系人：{{ problemDetail.linkman }}</span>
                        <span>联系方式：{{ problemDetail.mobile }}</span>
                    </p>
                    <p>
                        <span
                            >问题描述：{{ problemDetail.problemContent }}</span
                        >
                    </p>
                </section>
                <section class="problem-process">
                    <div
                        class="problem-process-item"
                        v-for="(item, index) in problemDetail.recordDtoList"
                    >
                        <div class="left">
                            <span class="line-v"></span>
                            <span class="line-h"></span>
                            <span class="stepNumber">{{ index + 1 }}</span>
                        </div>
                        <div class="right">
                            <div class="item-content">
                                <div class="item-content-top">
                                    <span class="departmentName">{{
                                        item.handlerName
                                    }}</span>
                                    <span class="line-h"></span>
                                    <span class="question-type">{{
                                        item.handlerStatusStr
                                    }}</span>
                                </div>
                                <div class="item-content-bottom">
                                    <div class="item-content-main">
                                        <div class="problem-reslove-suggestion">
                                            {{ item.content }}
                                        </div>
                                        <div class="problem-reslove-time">
                                            {{ item.changeTime }}
                                        </div>
                                    </div>
                                    <div class="leader-indicate-list">
                                        <div
                                            v-for="v in item.superviseList"
                                            class="leader-indicate-item"
                                        >
                                            <div
                                                class="problem-reslove-suggestion"
                                            >
                                                <span class="leader"
                                                    >{{ v.leaderName }}：</span
                                                >{{ v.leaderOpinion }}
                                            </div>
                                            <div class="problem-reslove-time">
                                                {{ v.createTime }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="resolve">
                    <div class="resolve-content">
                        <div class="resolve-process">
                            <div class="sel-cond">
                                <span class="requirdFile">*</span>
                                <span>处理结果：</span>
                                <el-select v-model="value" placeholder="请选择">
                                    <el-option
                                        v-for="item in companyType"
                                        :key="item.flag"
                                        :label="item.name"
                                        :value="item.flag"
                                    >
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="order" v-show="value == 2">
                                <div class="order-con common-con">
                                    <label>牵头部门：</label>
                                    <div
                                        class="department-outer circulation-department-outer"
                                    >
                                        <div
                                            class="department"
                                            v-show="role.show"
                                        >
                                            {{ role.name }}
                                            <div
                                                class="del-btn"
                                                :data="role.id"
                                                @click="deleteRole(role)"
                                            >
                                                x
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        class="addBtn circulation-department-add-btn"
                                        @click="addBtn"
                                    >
                                        +
                                        <div class="department-list">
                                            <div
                                                v-if="selectBox"
                                                class="list-item"
                                                v-for="item in totalDepartmentList"
                                                @click.stop="selectRole(item)"
                                            >
                                                {{ item.name }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="return" v-show="value == 1">
                                <span class="requirdFile">*</span>
                                <span>退回理由：</span>
                                <textarea
                                    v-model="returnReason"
                                    name=""
                                    id=""
                                    cols="30"
                                    rows="7"
                                    placeholder="请填写退回理由"
                                >
                                </textarea>
                            </div>
                        </div>
                        <div class="resolve-bot">
                            <span class="cancel" @click="goBack">取消</span>
                            <span class="confirm" @click="confirm">确定</span>
                        </div>
                    </div>
                </section>
            </div>
        </section>
    </BasePage>
</template>



<script>
import BasePage from "@/components/BasePage";

import {
    departmentList,
    problemDetail,
    goBack,
    dispatch
} from "@api/gov/problemDetail";
import { getUrlParam, gotoURL } from "@/common/utils/index";

export default {
    data() {
        return {
            companyType: [
                { name: "问题派单", flag: 2 },
                { name: "问题退回", flag: 1 }
            ],
            value: "",
            totalDepartmentList: [],
            totalCollaborationDepartList: [],
            totalCirculationDepartList: [],
            problemDetail: {},
            selectBox: false,
            role: {
                name: "",
                id: "",
                show: false
            },
            returnReason: ""
        };
    },
    created() {
        this.id = getUrlParam("id");
        this.status = getUrlParam("status");
        this._getDepartmentList();
        this.beforeInit();
    },
    methods: {
        _getDepartmentList() {
            departmentList().then(res => {
                this.totalDepartmentList = res.data || [];
                this.totalCollaborationDepartList = res.data || []; //协作部门
                this.totalCirculationDepartList = res.data || []; //牵头部门
            });
        },
        beforeInit() {
            problemDetail({ problemId: this.id }).then(res => {
                this.problemDetail = res.data || {};
            });
        },
        selectRole(item) {
            this.role.name = item.name;
            this.role.id = item.id;
            this.role.show = true;
            this.selectBox = false;
        },
        addBtn() {
            this.selectBox = true;
        },
        deleteRole(roleId) {
            this.role = {
                name: "",
                id: "",
                show: false
            };
        },
        _checkSelect() {
            if (this.value == 1) {
                //问题退回
                if (!this.returnReason.length) {
                    this.$message.error("请输入退回理由");
                    return false;
                }
            } else if (this.value == 2) {
                //问题派单
                if (!this.role.name) {
                    this.$message.error("请选择牵头部门");
                    return false;
                }
            } else if (!this.value.length) {
                this.$message.error("请选择处理结果");
                return false;
            }
            return true;
        },
        confirm() {
            if (this._checkSelect()) {
                let data1 = {
                    problemId: this.id,
                    backReason: this.returnReason
                };
                let data2 = {
                    problemId: this.id,
                    leadDepartmentId: this.role.id,
                    cooperateDepartmentIdStr: "" //arrId
                };

                let url = this.value == 1 ? goBack : dispatch;
                let data = this.value == 1 ? data1 : data2;
                url(data).then(res => {
                    if (data.code == "0000") {
                        gotoURL("problemWarehouse.html");
                    }
                });
            }
        },
        goBack() {
            history.go(-1);
        }
    },
    components: {
        BasePage
    }
};
</script>

<style lang="less" >
@import "../../common/less/reset.less";
@import "../../common/less/linHaiCommon.less";

@borderColor: #e3eaf1;
@inputBg: rgba(0, 0, 0, 0.04);
@inputBorder: #d9d9d9;
@fontNorma: #9399a5;
@successColor: #5c7cec;
@errorColor: #ff6d60;
@wanchenColor: #25b499;
@inputText: rgba(0, 0, 0, 0.25);
@defaultBlueColor: #6b8af0;
@bgContentColor: rgba(253, 253, 254, 1);
@textColor: #455467;


.el-input__inner {
    height: 28px;
}

.bg-com {
    //margin:10px;
    background-color: @bgContentColor;
}
#problemDetailPageCOuter {
    .bg-com;
    padding: 0 0 40px 0;
    .resolve {
        height: 310px;
        margin: 20px 0 20px 119px;
        width: 65%;
        .resolve-content {
            border-radius: 2px;
            background-color: rgba(255, 255, 255, 1);
            box-shadow: 0px 2px 8px 0px rgba(222, 222, 222, 0.5);
            padding: 20px;
            position: relative;
            height: 100%;
            .resolve-process {
                height: 80%;
                display: flex;
                flex-direction: column;
                & > div {
                    margin-bottom: 20px;
                    .requirdFile {
                        position: absolute;
                        color: red;
                        width: 10px;
                        height: auto;
                        left: -11px;
                    }
                }
                .sel-cond {
                    position: relative;
                    display: flex;
                    align-items: center;
                    & > div {
                        width: 140px;
                        height: 28px;
                        border-radius: 2px;
                        border: 1px solid #e3eaf1;
                    }
                }
                .return {
                    //display: none;
                    position: relative;
                    textarea {
                        padding: 5px;
                        width: 92%;
                        border-radius: 2px;
                        background-color: rgba(253, 253, 253, 1);
                        border: 1px solid rgba(242, 244, 247, 1);
                    }
                }
                .order {
                    //display: none;
                    .common-con {
                        display: flex;
                        align-items: center;
                        .jia {
                            width: 40px;
                            height: 24px;
                            border-radius: 12px;
                            border: 1px dashed rgba(107, 138, 240, 1);
                            color: #6b8af0;
                            display: inline-block;
                            text-align: center;
                            line-height: 24px;
                            cursor: pointer;
                        }
                    }
                    & > div {
                        margin-bottom: 10px;
                    }
                }
            }
            .resolve-bot {
                text-align: right;
                span {
                    cursor: pointer;
                    display: inline-block;
                    width: 65px;
                    height: 32px;
                    line-height: 32px;
                    text-align: center;
                    border-radius: 4px;
                    background-color: rgba(255, 255, 255, 1);
                    border: 1px solid rgba(217, 217, 217, 1);
                }
                .cancel {
                    color: @textColor;
                    background: white;
                }
                .confirm {
                    color: white;
                    background-color: rgba(107, 147, 255, 1);
                }
            }
        }
    }
    .jia {
        position: relative;
        .dorpdown {
            width: 100px;
            height: 30px;
            position: absolute;
            border: 1px solid #e3eaf1;
            border-radius: 2px;
            z-index: 1;
        }
    }
    .addBtn {
        display: inline-block;
        padding: 0px 10px;
        height: 20px;
        line-height: 18px;
        border-radius: 10px;
        border: 1px dashed @defaultBlueColor;
        color: @defaultBlueColor;
        margin-top: 10px;
        position: relative;

        .userList1,
        .userList2 {
            display: none;
            max-height: 150px;
            overflow: auto;
            width: 100px;
            position: absolute;
            top: 100%;
            left: 50%;
            margin-top: 10px;
            box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
            list-style: none;
            padding-left: 0px;
            background-color: #fff;
            border-radius: 4px;
            background-color: #fff;
            z-index: 100;

            .list-item {
                width: 150px !important;
                height: 24px;
                line-height: 24px;
                padding: 0 15px;
                margin: 1px 0;
                cursor: pointer;
                //min-width: 100%;
                box-sizing: border-box;
                color: #333;
                text-align: left;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                font-size: 12px;

                &:hover {
                    background-color: rgba(24, 144, 255, 0.1);
                    color: #1890ff;
                }
            }

            &::-webkit-scrollbar {
                display: none;
            }
        }
    }
}
label {
    color: rgba(112, 123, 139, 1);
    font-size: 14px;
    text-align: left;
    font-family: PingFangSC-Medium;
    white-space: nowrap;
}
.collaboration-department-outer,
.circulation-department-outer {
    & > span {
        display: inline-block;
        height: 24px;
        line-height: 22px;
        padding: 0 10px;
        border-radius: 12px;
        background-color: rgba(240, 244, 255, 1);
        color: rgba(107, 138, 240, 1);
        font-size: 12px;
        text-align: center;
        font-family: PingFangSC-Regular;
        margin-right: 10px;

        &:last-child {
            width: 40px;
            background-color: #fff;
            border: 1px dashed rgba(107, 138, 240, 1);
        }
    }
}

.ys-dropdown-outer {
    height: 100%;
    .btn.ys-dropdown-btn {
        height: 100%;
        .ys-dropdown-value {
            line-height: 28px;
            font-size: 12px;
            text-align: left;
        }
        i {
            line-height: 28px;
        }
    }
}
</style>
