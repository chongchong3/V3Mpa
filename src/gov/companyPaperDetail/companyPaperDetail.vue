<template>
  <BasePage>
    <div id="companyPaperDetailPageOuter">
      <div class="ys-back-btn" @click="backToPrevPage"></div>
      <div id="companyPaperDetailPageCOuter">
        <section class="company-name">
          <i class="iconfont icon-qiyetubiaox"></i>
          <span class="name">{{paramObj.entName}}</span>
        </section>
        <paperTabs
          :paperData="curModAuthority"
          @tabClick="tabClick"
          :changeIndex="changeIndex"
          ref="massage"
        ></paperTabs>
        <section>
          <div class="btns-finally entFile" v-show="paramObj.action == 'entFile'">
            <div class="right-finally prevItem" v-show="tabIndex != 0" @click="prevTab">上一项</div>
            <div class="right-finally nextItem" v-show="tabIndex != 7" @click="nextTab">下一项</div>
            <div class="right-finally saveItem" v-show="tabIndex == 7" @click="confirmData">保存</div>
          </div>
          <div class="btns-finally check" v-show="paramObj.action == 'check'">
            <div class="right-finally prevItem" v-show="tabIndex != 0" @click="prevTab">上一项</div>
            <div class="right-finally nextItem" v-show="tabIndex != 7" @click="nextTab">下一项</div>
            <div class="right-finally submitItem" v-show="tabIndex == 7" @click="confirmCheck">提交</div>
          </div>
          <div class="btns-finally appealRecord" v-show="paramObj.action == 'appealRecord'">
            <!-- <div class="right-finally saveUpdateData" @click="saveAppeal">保存</div>
            <div class="orange-finally reject">驳回</div>
            <div class="right-finally updateSomeData">修改</div> -->
          </div>
          <div class="btns-finally townCheck" v-show="paramObj.action == 'townCheck'">
            <div class="orange-finally notAdopt" @click="notAdoptEvnet" :class="noClick==true?'disabled-click':''">不通过</div>
            <div class="right-finally adopt" @click="adoptEvnet"  :class="noClick==true?'disabled-click':''">通过</div>
          </div>
        </section>
      </div>
    </div>
  </BasePage>
</template>

<script>
import paperTabs from "@/components/paperTabs";
import { paperTabData } from "@/common/constant/constant";
import BasePage from "@/components/BasePage";
import "./less/companyPaperDetail.less";
import * as api from "@api/gov/companyPaperDetail";
import { getUrlParam,compareProperty } from "@/common/utils/index";
// import * as url from "@/common/utils/util.js"; //跳转路径
// import compareProperty from "@/common/utils/compareObj.js";
import { log } from "util";
export default {
  data() {
    return {
      paperTabData: paperTabData,
      curModAuthority: [],
      noClick:false,
      department: [],
      tabIndex: 0,
      changeIndex: "0",
      paramObj: {
        action: "",
        creditCode: "",
        dataType: "",
        entName: "",
        dataYear: "",
        townStatus: "",
        status: ""
      },
      taxList: {},
      operateList: {},
      landList: {},
      paperParam: {},
      saveDatas: {}
    };
  },
  mounted() {
    this.controlPremission();
    this.saveDatas = this.$store.state.saveData;
    this.paperParam = this.$store.state.paperParam;
    this.init();
  },
  created() {
    this.paramObj = {
      userType: getUrlParam("dataType") ? getUrlParam("dataType") : "",
      townStatus: getUrlParam("townStatus") ? getUrlParam("townStatus") : "", //审核状态
      action: getUrlParam("action") ? getUrlParam("action") : "",
      creditCode: getUrlParam("creditCode") ? getUrlParam("creditCode") : "",
      entName: getUrlParam("entName") ? getUrlParam("entName") : "",
      dataYear: getUrlParam("dataYear") ? getUrlParam("dataYear") : "",
      status: getUrlParam("status") ? getUrlParam("status") : "" //自核审核状态
    };
    this.$store.commit({
      type: "setPaperParam",
      params: this.paramObj
    });
    this.$store.commit({
      type: "setCurModAuthority",
      np: window.location.pathname.split("/").reverse()[0]
    });
  },
  computed: {
    userType() {
      return this.$store.state.isAdmin;
    }
  },
  watch: {
    "$store.state.saveData": function(newVal, oldVal) {
      this.saveDatas = newVal;
      this.init();
    }
  },
  methods: {
    init() {
      this.taxList = this.saveDatas.taxList;
      this.operateList = this.saveDatas.operateList;
      this.landList = this.saveDatas.landList;
      this.waterList = this.saveDatas.waterList;
      this.electricList = this.saveDatas.electricList;
    },
    tabClick(val) {
      this.tabIndex = val.index;
    },
    prevTab() {
      this.changeIndex = +this.tabIndex - 1 + "";
    },
    nextTab() {
      this.changeIndex = +this.tabIndex + 1 + "";
    },
    backToPrevPage() {
      this.$router.go(-1);
    },
    notAdoptEvnet(){
      let params={
        dataYear:this.paramObj.dataYear,
        creditCode:this.paramObj.creditCode
      }
       api.townUnPass(params).then((res)=>{
          if(res.code=='0000'){
            this.$message.success( '操作成功')
            this.noClick=true
          }
       })
    },
    adoptEvnet(){
       let params={
        dataYear:this.paramObj.dataYear,
        creditCode:this.paramObj.creditCode
      }
       api.townPass(params).then((res)=>{
          if(res.code=='0000'){
            this.$message.success( '操作成功' )
             this.noClick=true
          }
       })
    },
    saveAppeal() {},
    _getConsultData() {
      let params = {
        dataYear: this.paramObj.dataYear
      };
      api.showApartment(params).then(res => {
        if (res.code == "0000") {
          this.department = res.data || [];
        }
      });
    },
    controlPremission() {
      let curModAuthorityList = this.$store.state.curModAuthority || [];
      let arr = curModAuthorityList ? curModAuthorityList.children : [];
      let a = null;
      if (this.action == "appealRecord") {
        let child = arr.filter(v => {
          return v.active == "appealRecord.html";
        });
        a = child[0] && child[0].children.length > 0 ? child[0].children : [];
      } else if (this.action == "townCheck") {
        let child = arr.filter(v => {
          return v.active == "townCheck.html";
        });
        a = child[0] && child[0].children.length > 0 ? child[0].children : [];
      } else {
        //企业自核和填报无权限
        a = Object.assign([], paperTabData);
      }
      this.curModAuthority =
        a.sort(compareProperty("seq")).map((v, i) => {
          let data = paperTabData.find((val, index, arr) => {
            return val.name == v.name;
          });
          return {
            name: v.name,
            type: data.type,
            seq: v.seq
          };
        }) || [];
       
    },
    //数据校验数据校验
    confirmData() {
      let a = this.checkLogLandData(this.landList.landDataList);
      let b = this.checkLogLandData(this.landList.rentOutLandList);
      let c = this.checkLogLandData(this.landList.rentInLandList);
      if (this.landList.landDataList.length > 0 && !a) {
        this.$message.warning("请上传不动产权证");
      } else if (this.landList.rentOutLandList.length > 0 && !b) {
        this.$message.warning("请上传承租合同");
      } else if (this.landList.rentInLandList.length > 0 && !c) {
        this.$message.warning("请上传承租合同");
      } else if (
        (this.landList.rentOutLandList.length > 0 ||
          this.landList.rentInLandList.length > 0) &&
        !this.landList.releateImg
      ) {
        this.$message.warning("请上传承租关系确认书");
      } else {
        //   console.log(this.taxList)
        let {
          taxRevenue,
          incrementTax,
          taxStorage,
          exportTax,
          retreatInAdvanceTax,
          immediateWithdrawalTax,
          consumptionTax,
          businessIncomeTaxes,
          personTax,
          cityLandTax,
          townReturnMoney,
          carTax,
          landIncrementTax,
          yhTax,
          cswhTax,
          resourceTax,
          jyfj,
          placeJyfj,
          hjbhTax
        } = this.taxList;
        let obj = {
          taxRevenue,
          incrementTax,
          taxStorage,
          exportTax,
          retreatInAdvanceTax,
          immediateWithdrawalTax,
          consumptionTax,
          businessIncomeTaxes,
          personTax,
          cityLandTax,
          townReturnMoney,
          carTax,
          landIncrementTax,
          yhTax,
          cswhTax,
          resourceTax,
          jyfj,
          placeJyfj,
          hjbhTax
        };
        api.getConfirm(obj).then(d => {
          if (d.code == "0000") {
            if (d.data != "-1") {
              let taxs = d.data.tax;
              let sum = d.data.sum;
              this.$confirm("税务数据校验不一致，是否确认修改?", "提示", {
                confirmButtonText: "是",
                cancelButtonText: "否",
                type: "warning"
              })
                .then(() => {
                  let params = {
                    dataYear: this.paperParam.dataYear,
                    creditCode: this.paperParam.creditCode,
                    entName: this.paperParam.entName,
                    updateTime: null,
                    createTime: null,
                    taxRevenue: sum,
                    incrementTax: taxs,
                    ...this.taxList
                  };
                  for (let v in params) {
                    params[v] == null ? (params[v] = "") : params[v];
                  }
                  api.updateOrAddTaxData(params).then(res => {});
                })
                .catch(() => {
                  this.$message({
                    type: "info",
                    message: "已取消校验"
                  });
                });
              this.saveEntFileData();
            } else {
              this.saveEntFileData();
            }
          }
        });
      }
    },
    //检验合同是否上传
    checkLogLandData(arr) {
      let a = arr.every(v => {
        return v.imgUrl;
      });
      return a;
    },
    addRequest() {
      let params = {
        dataYear: this.paperParam.dataYear,
        rentInLandList: this.landList.rentInLandList,
        rentOutLandList: this.landList.rentOutLandList,
        otherLandRequest: this.landList.otherLand,
        creditCode: this.paperParam.creditCode
      };
      let params1 = {
        releateImg: this.landList.releateImg,
        creditCode: this.paperParam.creditCode,
        dataYear: this.paperParam.dataYear
      };
      if (
        this.landList.rentInLandList.length > 0 ||
        this.landList.rentOutLandList.length > 0 ||
        !!this.landList.otherLand
      ) {
        api.updateRentLand(params).then(d => {
          if (d.code == "0000") {
          }
        });
      }
      if (this.landList.releateImg) {
        api.insertLandImg(params1).then(d => {
          if (d.code == "0000") {
          }
        });
      }
      if (this.landList.landDataList.length > 0) {
        let arr = this.landList.landDataList.map((v, i) => {
          let data = Object.assign({}, v, {
            entName: this.paramObj.entName,
            creditCode: this.paramObj.creditCode
          });
          return data;
        });
        api.updateInputLandData({ dataList: arr }).then(res => {});
      }
      if (!!this.waterList.waterMap && this.waterList.waterMap.length > 0) {
        let params = this.waterList.waterMap.map((v, i) => {
          v.entName = this.paramObj.entName;
          v.creditCode = this.paramObj.creditCode;
          v.dataYear = this.paramObj.dataYear;
          v.selfExtractingWater = this.waterList.selfExtractingWater;
          return v;
        });
        api.addWaterUsed({ waterUsedList: params }).then(res => {});
      }
      if (!!this.electricList.mapList && this.electricList.mapList.length > 0) {
        let params = this.electricList.mapList.map((v, i) => {
          v.entName = this.paramObj.entName;
          v.creditCode = this.paramObj.creditCode;
          v.dataYear = this.paramObj.dataYear;
          return v;
        });
        api.addElectricData({ electricUsedList: params }).then(res => {});
      }
    },
    saveEntFileData() {
      this.addRequest();
      let params = Object.assign({}, this.operateList, {
        creditCode: this.paperParam.creditCode,
        dataYear: this.paperParam.dataYear
      });
      if (!!this.operateList) {
        api.updateOraddManagementData(params).then(d => {
          if (d.code == "0000") {
          }
        });
      }
      api
        .haveBeenReported({
          creditCode: this.paperParam.creditCode,
          dataYear: this.paperParam.dataYear
        })
        .then(res => {
          if (res.code == "0000") {
            url.gotoGovURL("companySelfCore.html");
          }
        });
    },
    //自核事件
    confirmCheck() {
      let showDio = this.$store.state.apealButs;
      if (showDio.landInfo||showDio.pollution || showDio.taxInfo || showDio.totalInfo) {
        this.$confirm("未核对信息将默认为确认无误，是否确认?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.submitCheck();
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消"
            });
          });
      } else {
        this.submitCheck();
      }
    },
    submitCheck() {
      let check1 = this.$store.state.sendList1;
      let check2 = this.$store.state.sendList2;
      let check3 = this.$store.state.sendList3;
      let check4 = this.$store.state.sendList4;
      let check5 = this.$store.state.sendList5;
      let check6 = this.$store.state.sendList6;
      let arr = [];
      if (JSON.stringify(check1) !== "{}") {
        arr.push(check1);
      }
      if (JSON.stringify(check2) !== "{}") {
        arr.push(check2);
      }
      if (JSON.stringify(check3) !== "{}") {
        arr.push(check3);
      }
      if (JSON.stringify(check4) !== "{}") {
        arr.push(check4);
      }
      if (JSON.stringify(check5) !== "{}") {
        arr.push(check5);
      }
      if (JSON.stringify(check6) !== "{}") {
        arr.push(check6);
      }
      api
        .complain({
          creditCode: this.paperParam.creditCode,
          dataYear: this.paperParam.dataYear,
          entName: this.paperParam.entName,
          list: arr
        })
        .then(res => {});
    }
  },
  components: {
    BasePage,
    paperTabs
  }
};
</script>

<style lang="less" scoped>
</style>
