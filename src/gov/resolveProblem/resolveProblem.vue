<template>
    <BasePage>
        <div>
            <div class="ys-back-btn" @click="goBack"></div>
            <!-- HTML内容 -->
            <el-row>
                <el-col :span="24" class="companyBox">
                    <div class="header">
                        <div class="name">
                            <i class="iconfont icon-qiyetubiaox"></i>
                            {{ toHtmlStr(problemInfo.companyName) }}
                        </div>
                        <div class="labels-outer">
                            <span>{{
                                toHtmlStr(problemInfo.problemTypeName)
                            }}</span>
                        </div>
                    </div>
                    <p>
                        <span
                            >联系人：{{ toHtmlStr(problemInfo.linkman) }}</span
                        >
                        <span
                            >联系方式：{{ toHtmlStr(problemInfo.mobile) }}</span
                        >
                    </p>
                    <p>
                        <span
                            >问题描述：{{
                                toHtmlStr(problemInfo.problemContent)
                            }}</span
                        >
                    </p>
                </el-col>
            </el-row>
            <el-row class="">
                <el-col :span="24" class="problem-process">
                    <div
                        class="problem-process-item"
                        v-for="(item, index) in recordDtoList"
                        :key="index + 1"
                        data-state="${item.handlerStatus}"
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
                                        toHtmlStr(item.handlerName)
                                    }}</span>
                                    <span class="line-h"></span>
                                    <span class="question-type">{{
                                        toHtmlStr(item.handlerStatusStr)
                                    }}</span>
                                </div>
                                <div class="item-content-bottom">
                                    <div class="item-content-main">
                                        <div class="problem-reslove-suggestion">
                                            {{ toHtmlStr(item.content) }}
                                        </div>
                                        <div class="problem-reslove-time">
                                            {{ toHtmlStr(item.changeTime) }}
                                        </div>
                                    </div>

                                    <div class="leader-indicate-list">
                                        <div
                                            class="leader-indicate-item"
                                            v-for="leader in item.superviseList"
                                            :key="leader.id"
                                        >
                                            <div
                                                class="problem-reslove-suggestion"
                                            >
                                                <span class="leader"
                                                    >{{
                                                        toHtmlStr(
                                                            leader.leaderName
                                                        )
                                                    }}：</span
                                                >{{
                                                    toHtmlStr(
                                                        leader.leaderOpinion
                                                    )
                                                }}
                                            </div>
                                            <div class="problem-reslove-time">
                                                {{
                                                    toHtmlStr(leader.createTime)
                                                }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <!--处理问题-->
            <el-row v-if="resolveType === 'resolveProblem'">
                <el-col :span="24" class="bottom-container resolveProblem">
                    <el-form
                        ref="form"
                        :model="resolveProblem"
                        class="content"
                        :inline="true"
                    >
                        <el-form-item
                            label="处理意见："
                            class="is-must"
                            :inline="true"
                        >
                            <el-input
                                type="textarea"
                                v-model="resolveProblem.opinion"
                                placeholder=""
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="处理结果："
                            class="is-must resolve-result-outer"
                        >
                            <el-button
                                style="margin-right: 20px;"
                                :class="
                                    resolveProblem.handlerStatus == 7
                                        ? 'active'
                                        : ''
                                "
                                @click="handlerStatusChanged(7)"
                                ><span
                                    ><i class="iconfont icon-chuliwenti"></i
                                ></span>
                                派单退回</el-button
                            >
                            <el-select
                                style="margin-right: 20px;"
                                v-model="resolveProblem.handlerStatus2"
                                placeholder="我来回复"
                                :class="selectActiveClass"
                                @change="handlerStatusSelected"
                            >
                                <el-option
                                    label="无法处理"
                                    value="6"
                                ></el-option>
                                <el-option
                                    label="稍后处理"
                                    value="9"
                                ></el-option>
                                <el-option
                                    label="处理完成"
                                    value="8"
                                ></el-option>
                            </el-select>
                            <el-button
                                :class="
                                    resolveProblem.handlerStatus == 5
                                        ? 'active'
                                        : ''
                                "
                                @click="handlerStatusChanged(5)"
                                ><span
                                    ><i class="iconfont icon-chuliwenti"></i
                                ></span>
                                继续流转</el-button
                            >
                        </el-form-item>
                        <el-form-item
                            label="流转部门："
                            class="is-must"
                            v-show="resolveProblem.handlerStatus == 5"
                        >
                            <div
                                class="department-outer circulation-department-outer"
                            >
                                <div
                                    class="department"
                                    v-if="resolveProblem.nextDepartmentId"
                                >
                                    {{ nextDepartmentName }}
                                    <div
                                        class="del-btn"
                                        @click="deleteNextDepartment"
                                    >
                                        x
                                    </div>
                                </div>
                            </div>
                            <div
                                class="addBtn circulation-department-add-btn"
                                @click.stop="showDepartmentList = true"
                            >
                                +
                                <div
                                    class="department-list"
                                    v-show="showDepartmentList"
                                >
                                    <div
                                        class="list-item"
                                        v-for="v in totalCirculationDepartList"
                                        :key="v.id"
                                        @click.stop="nextDepartmentSelected(v)"
                                    >
                                        {{ v.name }}
                                    </div>
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item size="small" class="flex-end footer">
                            <el-button @click="goBack">取消</el-button>
                            <el-button type="primary" @click="handlerProblem"
                                >确定</el-button
                            >
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <!--督办问题-->
            <el-row v-if="resolveType === 'supervisionProblem'">
                <el-col :span="24" class="bottom-container supervisionProblem">
                    <el-form
                        ref="form2"
                        :model="supervisionProblem"
                        class="content"
                        :inline="true"
                    >
                        <el-form-item
                            label="督办问题："
                            class="is-must"
                            :inline="true"
                        >
                            <el-input
                                type="textarea"
                                v-model="supervisionProblem.leaderOpinion"
                                placeholder=""
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="处理结果："
                            class="is-must resolve-result-outer"
                        >
                            <el-checkbox
                                v-model="supervisionProblem.leaderDepartment"
                                >允许部门查看</el-checkbox
                            >
                            <el-checkbox
                                v-model="supervisionProblem.leaderCompany"
                                >允许企业查看</el-checkbox
                            >
                        </el-form-item>
                        <el-form-item size="small" class="flex-end footer">
                            <el-button @click="goBack">取消</el-button>
                            <el-button
                                type="primary"
                                @click="handlerSuperviseProblem"
                                >确定</el-button
                            >
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <!--企业评价-->
            <el-row v-if="showEvaluatetBox">
                <el-col :span="24" class="evaluatetBox">
                    <p>企业评价结果</p>
                    <div class="star-outer">
                        <span
                            class="iconfont icon-wuxing"
                            v-for="index in 5"
                            :key="index"
                            :class="
                                index <= problemInfo.fiveStarAssess
                                    ? 'active'
                                    : ''
                            "
                        ></span>
                    </div>
                </el-col>
            </el-row>
        </div>
    </BasePage>
</template>

<script>
import BasePage from "@/components/BasePage";
import * as api from "@api/gov/resolveProblem";

import { toHtmlStr, getUrlParam, isEmptyString } from "@/common/utils/index";

export default {
    data() {
        return {
            problemInfo: {}, //详情信息
            problemId: "",
            resolveType: "", //处理方式 解决问题（resolveProblem）or 督办问题（supervisionProblem）or 问题详情页(problemDetail)
            recordDtoList: [], //处理流程数据
            // cooperateList:[],   //协助部门
            totalDepartList: [],
            totalCirculationDepartList: [], //所有的流转部门
            selectedCirculationDepartList: [], //选择的流转部门
            toHtmlStr: () => {},
            showEvaluatetBox: false,
            nextDepartmentName: "",
            resolveProblem: {
                handlerStatus2: "",
                opinion: "",
                nextDepartmentId: "",
                handlerStatus: 7
            },
            showDepartmentList: false,
            supervisionProblem: {
                leaderDepartment: false,
                leaderCompany: false,
                leaderOpinion: ""
            }
        };
    },
    created() {},
    computed: {
        selectActiveClass() {
            return [6, 8, 9].indexOf(+this.resolveProblem.handlerStatus) !== -1
                ? "active"
                : "";
        }
    },
    mounted() {
        this.problemId = getUrlParam("id"); //this.$route.query.id;
        this.resolveType = getUrlParam("type"); //this.$route.query.type;

        document.title =
            this.resolveType === "resolveProblem"
                ? "处理问题"
                : this.resolveType === "supervisionProblem"
                ? "督查问题"
                : "问题详情";

        this.toHtmlStr = toHtmlStr;
        this.getTownDepartmentList();
        this.fetchData();
    },
    methods: {
        fetchData() {
            const vm = this;
            api.problemDetail({ problemId: this.problemId }).then(res => {
                vm.problemInfo = res.data || {};
                vm.recordDtoList = vm.problemInfo.recordDtoList || [];
                vm.cooperateList = vm.problemInfo.cooperateList || [];

                // problemStatus : 问题状态：0、删除问题，1、待派单，2、已派单，3、派单退回，4、无法解决，5、已解决，6、问题退回
                if (
                    vm.problemInfo.problemStatus === 5 &&
                    this.resolveType === "problemDetail" &&
                    vm.problemInfo.fiveStarAssess
                ) {
                    this.showEvaluatetBox = true;
                }
            });
        },
        getTownDepartmentList() {
            const vm = this;
            api.getTownDepartmentList().then(res => {
                vm.totalDepartList = res.data || [];
                vm.totalCirculationDepartList = res.data || []; //流转部门
            });
        },
        handlerProblem() {
            const vm = this;

            const resolveProblem = vm.resolveProblem;

            if (isEmptyString(resolveProblem.opinion)) {
                this.$message({
                    showClose: true,
                    message: "请输入处理意见",
                    type: "error"
                });
                return false;
            }
            if (
                resolveProblem.handlerStatus == 5 &&
                resolveProblem.nextDepartmentId == 0
            ) {
                this.$message({
                    showClose: true,
                    message: "请选择流转部门",
                    type: "error"
                });
                return false;
            }
            const params = {
                problemId: vm.problemId,
                opinion: resolveProblem.opinion,
                nextDepartmentId:
                    resolveProblem.nextDepartmentId > 0
                        ? +resolveProblem.nextDepartmentId
                        : "",
                handlerStatus: +resolveProblem.handlerStatus
            };
            api.handlerProblem(params).then(data => {
                if (data.code === "0000") {
                    this.$notify({
                        title: "成功提示",
                        message: "问题处理成功",
                        type: "success"
                    });
                    vm.goBack();
                } else {
                    this.$notify({
                        type: "error",
                        title: "错误提示",
                        message: data.msg || "问题处理失败"
                    });
                }
            });
        },
        handlerSuperviseProblem() {
            const vm = this;

            const supervisionProblem = vm.supervisionProblem;

            if (isEmptyString(supervisionProblem.leaderOpinion)) {
                this.$message({
                    showClose: true,
                    message: "请输入督办问题",
                    type: "error"
                });
                return false;
            }

            const params = {
                problemId: vm.problemId,
                leaderOpinion: supervisionProblem.leaderOpinion,
                leaderDepartment: supervisionProblem.leaderDepartment ? 1 : 0,
                leaderCompany: supervisionProblem.leaderCompany ? 1 : 0
            };
            api.problemSupervise(params).then(data => {
                if (data.code === "0000") {
                    this.$notify({
                        title: "成功提示",
                        message: "督办问题成功",
                        type: "success"
                    });
                    vm.goBack();
                } else {
                    this.$notify({
                        type: "error",
                        title: "错误提示",
                        message: data.msg || "督办问题失败"
                    });
                }
            });
        },
        handlerStatusChanged(status) {
            const vm = this;

            vm.resolveProblem.handlerStatus = status;
            vm.resolveProblem.handlerStatus2 = "";

            console.log(vm.resolveProblem.handlerStatus);
        },
        handlerStatusSelected(status) {
            const vm = this;
            vm.resolveProblem.handlerStatus = status;
            vm.resolveProblem.handlerStatus2 = status;
            console.log(vm.resolveProblem.handlerStatus);
        },
        nextDepartmentSelected(depart) {
            const vm = this;
            vm.totalCirculationDepartList = vm.totalDepartList.filter(
                v => v.id != depart.id
            );
            vm.resolveProblem.nextDepartmentId = depart.id;
            vm.nextDepartmentName = depart.name;
            vm.showDepartmentList = false;
        },
        deleteNextDepartment() {
            const vm = this;
            vm.totalCirculationDepartList = vm.totalDepartList;
            vm.resolveProblem.nextDepartmentId = "";
            vm.nextDepartmentName = "";
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

<style lang="less">
@import "../../common/less/linHaiCommon.less";

.el-main.flex-col, .el-row {
  background-color: #fff;
}

.is-must .el-form-item__label {
  &::before {
    content: '* ';
    color: @errorColor;
  }
}

.bottom-container {
  //display: none;
  margin-left: 119px;
  width: 65%;
  padding-bottom: 100px;
  background-color: rgba(255, 255, 255, 1);
  .content {
    position: relative;
    min-height: 465px;
    border-radius: 2px;
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 8px 0px rgba(222, 222, 222, 0.5);
    padding: 25px 20px;


    .el-form-item .el-form-item__content {
      width: 515px !important;
    }
    .el-form-item .el-form-item__content .el-textarea textarea {
      min-height: 156px !important;
    }

    .resolve-result-outer {
      .el-form-item__content {

        .el-button {
          padding: 0;
          display: inline-block;
          width: 100px;
          height: 33px;
          line-height: 31px;
          background-color: rgba(255, 255, 255, 1);
          //border: 1px solid rgba(227, 234, 241, 1);
          color: rgba(147, 153, 165, 1);
          font-size: 14px;
          text-align: center;
          font-family: PingFangSC-Medium;
          margin-right: 20px;
          //border-radius: 2px;

          .icon-chuliwenti {
            color: #5C7CEC;
          }

          &:first-child .icon-chuliwenti {
            color: #ff6d60;
          }

          &.active, &:hover {
            color: #fff;
            background-color: rgba(92, 124, 236, 1);
            .icon-chuliwenti {
              color: #fff;
            }
          }
        }
        .el-button:first-child > span > span {
          transform: rotateY(180deg);
          display: inline-block;
        }

        .el-select {
          width: 110px;
          .el-input {
            .el-input__inner {
              height: 33px;
              line-height: 31px;
            }
          }
          .el-input__icon {
            line-height: 31px;
          }
          &.active {
            .el-input {
              .el-input__inner {
                //height: 33px;
                //line-height: 31px;
                color: #fff;
                background-color: rgba(92, 124, 236, 1);
              }
              .el-select__caret {
                color: #fff;
              }
            }
          }
        }
      }
    }

    .footer .el-form-item__content {
      width:auto !important;
      position: absolute;
      bottom: 50px;
      right: 50px;
    }
  }
}

.supervisionProblem .content {
  min-height: 302px;
  .checkbox-container {
    margin-left: 70px;
    label {
      margin-right: 30px;
    }
  }
}
.evaluatetBox {
  //display: none;
  position: fixed;
  left: 65%;
  margin-left: 200px;
  top: 257px;
  width: 228px;
  height: 120px;
  border-radius: 2px;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 8px 0px rgba(222, 222, 222, 0.5);
  padding: 17px 0px 17px 19px;

  &>p {
    color: rgba(112, 123, 139, 1);
    font-size: 14px;
    text-align: left;
    font-family: PingFangSC-Regular;
  }
  .star-outer {
    margin-top: 15px;
    .icon-wuxing {
      color: #D3D9E1;
      margin-right: 12px;
      font-size: 25px;
      //cursor: pointer;

      &:last-child {
        margin-right: 0;
      }
      &.active {
        color: #FF7B7B;
      }
    }
  }
}

</style>
