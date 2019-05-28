<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane v-for="(item,index) in paperData" :key="index" :label="item.name" :type="item.type"></el-tab-pane>
    </el-tabs>
    <div class="tab-content">
      <BussinessInfo v-show="labName == paperTabData[0].name"></BussinessInfo>
      <LandInfo
        v-show="labName == paperTabData[1].name"
        @backText="backEvent"
        @reviseText="reviseEvent"
        :field="field1"
        :department="getDeparment(1)"
        :rejectUpdateList="rejectUpdateList1"
      ></LandInfo>
     
      <TaxInfo
        v-show="labName == paperTabData[2].name"
        @backText="backEvent"
        @reviseText="reviseEvent"
        :field="field2"
        :rejectUpdateList="rejectUpdateList2"
        :department="getDeparment(2)"
      ></TaxInfo>
       <!-- <span>{{field3}}</span> -->
      <TotalInfo
        v-show="labName == paperTabData[3].name"
        @backText="backEvent"
        :rejectUpdateList="rejectUpdateList3"
        @reviseText="reviseEvent"
        :field="field3"
        :department="getDeparment(3)"
      ></TotalInfo>
      <WaterInfo
        v-show="labName == paperTabData[4].name"
        @backText="backEvent"
        :rejectUpdateList="rejectUpdateList4"
        @reviseText="reviseEvent"
        :field="field4"
        :department="getDeparment(4)"
      ></WaterInfo>
      <ElectricInfo
        v-show="labName == paperTabData[5].name"
        @backText="backEvent"
        :rejectUpdateList="rejectUpdateList5"
        @reviseText="reviseEvent"
        :field="field5"
        :department="getDeparment(5)"
      ></ElectricInfo>
      <PollutionInfo
        v-show="labName == paperTabData[6].name"
        @backText="backEvent"
        @reviseText="reviseEvent"
        :field="field6"
        :rejectUpdateList="rejectUpdateList6"
        :department="getDeparment(6)"
      ></PollutionInfo>
      <OperateInfo v-show="labName == paperTabData[7].name"></OperateInfo>
    </div>
  </div>
</template>
<script>
    import {paperTabData} from '@/common/constant/constant'
    import BussinessInfo from '@/components/papers/bussinessInfo.vue'
    import ElectricInfo from '@/components/papers/electricInfo.vue'
    import LandInfo from '@/components/papers/landInfo.vue'
    import OperateInfo from '@/components/papers/operateInfo.vue'
    import PollutionInfo from '@/components/papers/pollutionInfo.vue'
    import TaxInfo from '@/components/papers/taxInfo.vue'
    import TotalInfo from '@/components/papers/totalInfo.vue'
    import WaterInfo from '@/components/papers/waterInfo.vue'
    import * as api from '@api/gov/companyPaperDetail'
export default {
  data() {
    return {
      action: this.$store.state.paperParam.action, //拿取store存储的路径action状态
      activeName: "0",
      labName: "",
      tab: null,
      paperTabData: paperTabData,
      department: [],
      param: this.$store.state.paperParam,
      erroList: [],
      appealData: {}, //申诉回选
      contents: [],
      field1:  { field:'' }, //部门审核状态拿到数据后，传递给子组件"土地数据"进行回显
      field2:  { field:'' }, 
      field3:  { field:'' },
      field4:  { field:'' },
      field5:  { field:'' },
      field6:  { field:'' }, 
      rejectUpdateList1: [], //部门备注信息拿到数据后，传递给子组件进行回显
      rejectUpdateList2:[],
      rejectUpdateList3: [], 
      rejectUpdateList4:[], 
      rejectUpdateList5:[],
      rejectUpdateList6:[], 
      rejectUpdateList: [], //后台返回的所有驳回备注，传递给子组件进行回显
      publicParams: {}
    };
  },
  props: {
    paperData: {
      type: Array,
      default: []
    },
    changeIndex: {
      type: String,
      default: "0"
    }
  },
  mounted() {
    this.publicParams = {
      list: [
        {
          type: this.param.userType,
          dataYear: this.param.dataYear,
          creditCode: this.param.creditCode
        }
      ]
    };
  },
  watch: {
    paperData(val) {
      this.labName = val[0].name || "";
    },
    changeIndex(val) {
      this.activeName = val;
      this.labName =
        this.paperTabData.find((v, i) => {
          return i == val;
        }).name || "";
      this.$emit("tabClick", { index: this.activeName });
    }
  },
  created() {
    this._getConsultData();
    this.beforeInitPage();
  },
  methods: {
    //appealRecord 子组件返回的修改信息以及修改请求事件
    reviseEvent(data) {
      let obj = {
        dataYear: this.param.dataYear,
        creditCode: this.param.creditCode,
        entName: this.param.entName
      };
      data = JSON.parse(data);
      let updateData = Object.assign(
        {},
        {
          complainType: 2,
          field: data.field,
          content: data.content,
          type: data.type,
          updateFiled: null,
          before: null,
          complainId: this.appealData[0].id,
          typeId: data.typeId
        },
        obj
      );
      api.insertRejectUpdate(updateData).then(res => {
        if (res.code == "0000") {
          this.reqContent();
        }
      });
      api.toUpdate(this.publicParams).then(res => {});
    },
    //子组件返回的驳回信息以及请求事件
    backEvent(data) {
      api.reject(this.publicParams).then(res => {
        if (res.code == "0000") {
        }
      });
      let datas = JSON.parse(data);
      let insetParams = {
        complainType: 1,
        field: datas.field,
        content: datas.content,
        type: datas.type,
        updateFiled: null,
        before: null,
        complainId: this.appealData[0].id,
        typeId: datas.backId,
        dataYear: this.param.dataYear,
        creditCode: this.param.creditCode,
        entName: this.param.entName
      };
      api.insertRejectUpdate(insetParams).then(res => {
        if (res.code == "0000") {
          this.reqContent();
        }
      });
    },
    getDeparment(type) {
      return (
        this.department.find((v, i) => {
          return v.dataType == type;
        }) || {
          department: "",
          contacts: "",
          contactsTel: ""
        }
      );
    },
    _getConsultData() {
      this.param = this.$store.state.paperParam;
      let params = {
        dataYear: this.param.dataYear
      };
      api.showApartment(params).then(res => {
        if (res.code == "0000") {
          this.department = res.data || [];
        }
      });
    },
    //切换tab事件向子组件传递当前点击的index
    handleClick(tab, event) {
      this.labName = tab.label;
      this.$emit("tabClick", { index: tab.index });
    },
    beforeInitPage() {
      this.reqContent();
      api
        .getPollution({
          creditCode: this.param.creditCode,
          dataYear: this.param.dataYear
        })
        .then(res => {
          if (res.code == "0000") {
            this.entRule = res.data.entRule;
          }
        });
 
    },
    //申诉记录页面 申诉回选
    reqContent() {
      if (this.action == "appealRecord" || this.action == "check") {
        api
          .showComplain({
            dataYear: this.param.dataYear,
            creditCode: this.param.creditCode,
            dataType: this.param.userType
          })
          .then(res => {
            if (res.code == "0000") {
              let arr = res.data || [];
              this.appealData =
                arr.map(v => {
                  return v.complainRecord;
                }) || [];
              this.contents = arr; //所有备注
              // console.log(this.appealData);
              // if (this.appealData) {
              //   //appealRecord 审核状态回显
              //   this.appealData.map((v, ind) => {

              //     if(v.type==1){
              //       this.field1= { field: v.field, type:1 }
              //     }else{
              //        this.field1= { field:'', type:1 }
              //     }
              //     if(v.type==2){
              //       this.field2= { field: v.field, type:2 }
              //     }
              //   });
              // }
             if (this.contents) {
                //appealRecord 审核状态回显
                //---------------------------------------------------------------------chen
                this.contents.map((v, i) => {
                  if(v.complainRecord.type=='1'){
                    this.field1= { field: v.complainRecord.field}
                    this.rejectUpdateList1 = v.rejectUpdateList;
                  }
                  if(v.complainRecord.type=='2'){
                    this.field2= { field: v.complainRecord.field}
                     this.rejectUpdateList2 = v.rejectUpdateList;
                  }
                  if(v.complainRecord.type=='3'){
                    this.field3= { field: v.complainRecord.field }
                    this.rejectUpdateList3 = v.rejectUpdateList;
                  }
                  if(v.complainRecord.type=='6'){
                    this.field6= { field: v.complainRecord.field }
                    this.rejectUpdateList6 = v.rejectUpdateList;
                  }
                });
               
              }
              // this.entFileContent();
            }
          });
      }
    },
    //驳回理由成功后，后台返回的信息进行回显信息
    entFileContent() {
      this.contents.map(val => {
        this.rejectUpdateList = val.rejectUpdateList;
        
      });
    },
    renderError() {
      this.erroList.map((v, i) => {
        let $div =
          v.type == "rentInLand"
            ? $(".landin")
            : v.type == "rentOutLand"
            ? $(".landout")
            : null;
        let creditCode =
          v.type == "rentInLand"
            ? "lessorCreditCode"
            : v.type == "rentOutLand"
            ? "lesseeCreditCode"
            : null;
      });
    }
  },
  components: {
    WaterInfo,
    TotalInfo,
    TaxInfo,
    PollutionInfo,
    OperateInfo,
    LandInfo,
    ElectricInfo,
    BussinessInfo
  }
};
</script>