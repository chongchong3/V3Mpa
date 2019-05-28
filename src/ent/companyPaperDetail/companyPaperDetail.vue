<template>
  <BasePage>
    <div id="companyPaperDetailPageOuter">
      <div class="ys-back-btn" @click="backToPrevPage"></div>
      <div id="companyPaperDetailPageCOuter">
        <section class="company-name">
          <div>
            <i class="iconfont icon-qiyetubiaox"></i>
            <span class="name">{{paramObj.entName}}</span>
          </div>
          <div class="btn-recall btn-front" v-show="paramObj.status!=1" @click="recall"><span>撤回</span></div>
        </section>
        <paperTabs
          :paperData="curModAuthority"  v-if="isReload"
          @tabClick="tabClick"
          :changeIndex="changeIndex"
        ></paperTabs>
        <section>
          <div class="btns-finally entFile" v-show="paramObj.action == 'entFile'">
            <div class="right-finally prevItem" v-show="tabIndex != 0" @click="prevTab">上一项</div>
            <div class="right-finally nextItem" v-show="tabIndex != 7" @click="nextTab">下一项</div>
            <div class="right-finally nextItem"  @click="confirmData(0)">暂存</div>
            <div class="right-finally saveItem" v-show="tabIndex == 7" @click="confirmData(1)">保存</div>
          </div>
          <div class="btns-finally check" v-show="paramObj.action == 'check'">
            <div class="right-finally prevItem" v-show="tabIndex != 0" @click="prevTab">上一项</div>
            <div class="right-finally nextItem" v-show="tabIndex != 7" @click="nextTab">下一项</div>
            <div class="right-finally submitItem" v-show="tabIndex == 7" @click="confirmCheck">提交</div>
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
import {
  showApartment,
  recall,
  getConfirm,
  updateOrAddTaxData,
  updateRentLand,
  insertLandImg,
  updateInputLandData,
  addWaterUsed,
  addElectricData,
  updateOraddManagementData,
  haveBeenReported,
  complain,
  getPollution
} from "@api/ent/companyPaperDetail";
import { getUrlParam, compareProperty ,gotoEntURL} from "@/common/utils/index";

import { log } from "util";
import { Promise } from 'q';
export default {
  data() {
    return {
      paperTabData: paperTabData,
      confirmStatus: 0,
      curModAuthority: [],
      noClick: false,
      department: [],
      tabIndex: 0,
      changeIndex: "0",
      isReload:true,
      isEntRule:null,//规上规下
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
    this.paperParam = this.$store.state.paperParam;
    const params = {
    creditCode: this.paperParam.creditCode,
    dataYear: this.paperParam.dataYear
    };
    getPollution(params).then(res => {
        if (res.code == "0000") {
            this.isEntRule = res.data.entRule;
        }
        this.controlPremission();
    });
    this.saveDatas = this.$store.state.saveData;
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
    //   this.$router.go(-1);
        gotoEntURL("companySelfCore.html");
    },
    
    saveAppeal() {},
    
    controlPremission() {//tab权限
        let arr = Object.assign([],paperTabData);
        if(this.entRule == 1){
            arr = paperTabData.filter((v,i)=>{
                return v.type != 6 && v.type != 3
            })
        }
        let a = Object.assign([],arr);
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
    confirmData(type = 0) {
      this.confirmStatus = type;
      if (type == 0) {
        this.saveEntFileData();
      } else if (type == 1) {
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
          getConfirm(obj).then(d => {
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
                    updateOrAddTaxData(params).then(res => {});
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
        updateRentLand(params).then(d => {
          if (d.code == "0000") {
          }
        });
      }
      insertLandImg(params1).then(d => {
        if (d.code == "0000") {
        }
      });
      if (this.landList.landDataList.length > 0) {
        let arr = this.landList.landDataList.map((v, i) => {
          let data = Object.assign({}, v, {
            entName: this.paramObj.entName,
            creditCode: this.paramObj.creditCode
          });
          return data;
        });
        updateInputLandData({ dataList: arr }).then(res => {});
      }
      if (!!this.waterList.waterMap && this.waterList.waterMap.length > 0) {
        let params = this.waterList.waterMap.map((v, i) => {
          v.entName = this.paramObj.entName;
          v.creditCode = this.paramObj.creditCode;
          v.dataYear = this.paramObj.dataYear;
          v.selfExtractingWater = this.waterList.selfExtractingWater;
          return v;
        });
        addWaterUsed({ waterUsedList: params }).then(res => {});
      }
      if (!!this.electricList.mapList && this.electricList.mapList.length > 0) {
        let params = this.electricList.mapList.map((v, i) => {
          v.entName = this.paramObj.entName;
          v.creditCode = this.paramObj.creditCode;
          v.dataYear = this.paramObj.dataYear;
          return v;
        });
        addElectricData({ electricUsedList: params }).then(res => {});
      }
      return  Promise.resolve()
    },
    saveEntFileData() {
      this.addRequest().then(()=>{
         let params = Object.assign({}, this.operateList, {
            creditCode: this.paperParam.creditCode,
            dataYear: this.paperParam.dataYear
         });
        if (!!this.operateList) {
          updateOraddManagementData(params).then(d => {
            if (d.code == "0000") {
              if (this.confirmStatus == 0) {
                this.$message.success("暂存成功");
                this.isReload=false
                let time=setTimeout(()=>{this.isReload=true}, 0)
              }
            }
          });
        }
        if (this.confirmStatus == 1) {
        
          haveBeenReported({
            creditCode: this.paperParam.creditCode,
            dataYear: this.paperParam.dataYear
          }).then(res => {
            if (res.code == "0000") {
              gotoEntURL("companySelfCore.html");
            }
          });
        }
      });
     
   
    },
    //自核事件
    confirmCheck() {
      let showDio = this.$store.state.apealButs;
      if (
        showDio.landInfo ||
        showDio.pollution ||
        showDio.taxInfo ||
        showDio.totalInfo
      ) {
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
    recall(){
        //撤回
        this.$confirm('将企业的填报数据状态修改为未填报状态？但会保留所有已经填报的数据，您确定要撤回吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            recall({
                creditCode: this.paperParam.creditCode,
                dataYear: this.paperParam.dataYear,
            }).then((d)=>{
                if(d.code=='0000'){
                    this.$message({
                        type: 'success',
                        message: d.msg
                    });
                    gotoEntURL('companySelfCore.html')
                }

            }).catch()

        }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消'
            });
        });

    },
    submitCheck() {
      let stores = this.$store.state;
      let checks = [];
      let arr = [];
      for (let i = 1; i < 7; i++) {
        let sendName = `sendList${i}`;
        checks.push(stores[sendName]);
      }
      checks.map((v, i) => {
        if (JSON.stringify(v) !== "{}") {
          arr.push(v);
        }
      });
      complain({
        creditCode: this.paperParam.creditCode,
        dataYear: this.paperParam.dataYear,
        entName: this.paperParam.entName,
        list: arr
      }).then(res => {
         gotoEntURL("companySelfCore.html");
      });
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
