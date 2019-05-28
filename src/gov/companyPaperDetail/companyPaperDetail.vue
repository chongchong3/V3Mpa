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
          <div class="btn-next btn-front" v-show="paramObj.action == 'townCheck'" @click="checkNext"><span>下一项</span></div>
        </section>
        <paperTabs
          :paperData="curModAuthority"  v-if="isReload"
          @tabClick="tabClick"
          :changeIndex="changeIndex"
          ref="tabMode"
        ></paperTabs>
        <section>
          <!--<div class="btns-finally entFile" v-show="paramObj.action == 'entFile'">-->
            <!--<div class="right-finally prevItem" v-show="tabIndex != 0" @click="prevTab">上一项</div>-->
            <!--<div class="right-finally nextItem" v-show="tabIndex != 7" @click="nextTab">下一项</div>-->
            <!--<div class="right-finally nextItem"  @click="confirmData(0)">暂存</div>-->
            <!--<div class="right-finally saveItem" v-show="tabIndex == 7" @click="confirmData(1)">保存</div>-->
          <!--</div>-->
          <!--<div class="btns-finally check" v-show="paramObj.action == 'check'">-->
            <!--<div class="right-finally prevItem" v-show="tabIndex != 0" @click="prevTab">上一项</div>-->
            <!--<div class="right-finally nextItem" v-show="tabIndex != 7" @click="nextTab">下一项</div>-->
            <!--<div class="right-finally submitItem" v-show="tabIndex == 7" @click="confirmCheck">提交</div>-->
          <!--</div>-->
          <div class="btns-finally appealRecord" v-show="paramObj.action == 'appealRecord'">
            <!-- <div class="right-finally saveUpdateData" @click="saveAppeal">保存</div>
            <div class="orange-finally reject">驳回</div>
            <div class="right-finally updateSomeData">修改</div>-->
          </div>
          <div class="btns-finally townCheck" v-show="paramObj.action == 'townCheck'">
             <div  v-show="paramObj.townStatus=='1'&&isAdmin=='1'"
              class="orange-finally adopt"
              @click="refillInEvent"
            >重新填报</div>
                <div v-show="!(paramObj.townStatus!='3'||isAdmin=='1')"
                  class="orange-finally notAdopt"
                  @click="notAdoptEvnet"
                  :class="noClick==true?'disabled-click':''"
                >不通过</div>
                <div  v-show="!(paramObj.townStatus!='3'||isAdmin=='1')"
                  class="right-finally adopt"
                  @click="adoptEvnet"
                  :class="noClick==true?'disabled-click':''"
                >通过</div>
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
// import * as api from "@api/gov/companyPaperDetail";
import {
  townUnPass,
  townPass,
  showApartment,
  getConfirm,
  updateOrAddTaxData,
  updateRentLand,
  insertLandImg,
  updateInputLandData,
  addWaterUsed,
  addElectricData,
  updateOraddManagementData,
  haveBeenReported,
  complain,refillIn,getPollution
} from "@api/gov/companyPaperDetail";
import { getUrlParam, compareProperty ,gotoGovURL} from "@/common/utils/index";

import { log } from "util";
import { Promise } from 'q';
import {getLocalStorage} from "../../common/utils/storage";
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
      this.getTabs();
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
      checkIndex:getUrlParam("index") ? +getUrlParam("index") : "",
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
    isAdmin() {
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
    getTabs(){
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
        return new Promise(function (resolve) {
            resolve()
        });
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
      if(this.paramObj.action=='townCheck'){
        gotoGovURL("townCheck.html");
      }else{
        gotoGovURL("appealRecord.html");
      }
    },
    checkNext(){//审核下一项
        let a = this.paramObj.checkIndex;
        let arr = JSON.parse(getLocalStorage('townList'))||[];
        if(a >= arr.length-1){
            this.$message.warning('已经是最后一项');
        }else{
            let {creditCode,entName,dataYear,townStatus,status} = arr[a+1];
//            console.log(arr[a + 1]);
            this.paramObj = {...this.paramObj,creditCode,entName,dataYear,townStatus,status}
            this.paramObj.checkIndex++;
            this.$store.commit({
                type: "setPaperParam",
                params: this.paramObj
            });
            this.getTabs().then(()=>{
                this.isReload = false;
                this.$nextTick(()=>{
                    this.isReload = true; //重新渲染子组件
                })
            });
        }
    },
    notAdoptEvnet() {
      let params = {
        dataYear: this.paramObj.dataYear,
        creditCode: this.paramObj.creditCode
      };
      townUnPass(params).then(res => {
        if (res.code == "0000") {
          this.$message.success("操作成功");
          this.noClick = true;
        }
      });
    },
    adoptEvnet() {
      let params = {
        dataYear: this.paramObj.dataYear,
        creditCode: this.paramObj.creditCode
      };
      townPass(params).then(res => {
        if (res.code == "0000") {
          this.$message.success("操作成功");
          this.noClick = true;
        }
      });
    },
    //重新填报
    refillInEvent(){
      let params = {
        dataYear: this.paramObj.dataYear,
        creditCode: this.paramObj.creditCode
      };
      refillIn(params).then((res)=>{
        if(res.code=='0000'){
                gotoGovURL('townCheck.html');
            }else{
               this.$message.error(res.msg)
            }
       })
    },
    saveAppeal() {},
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
        if(this.entRule == 1){
            this.curModAuthority = this.curModAuthority.filter((v,i)=>{
                return v.type != 6 && v.type != 3
            })
        }
    },
  },
  components: {
    BasePage,
    paperTabs
  }
};
</script>

<style lang="less" scoped>
</style>
