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
        :field="fields.field1"
        :department="getDeparment(1)"
        :rejectUpdateList="rejects.rejectUpdateList1"
      ></LandInfo>
     
      <TaxInfo
        v-show="labName == paperTabData[2].name"
        @backText="backEvent"
        @reviseText="reviseEvent"
        :field="fields.field2"
        :rejectUpdateList="rejects.rejectUpdateList2"
        :department="getDeparment(2)"
      ></TaxInfo>
       <!-- <span>{{fields.field3}}</span>
       <span>{{rejectUpdateList3}}</span> -->
      <TotalInfo
        v-show="labName == paperTabData[3].name"
        @backText="backEvent"
        :rejectUpdateList="rejects.rejectUpdateList3"
        @reviseText="reviseEvent"
        :field="fields.field3"
        :department="getDeparment(3)"
      ></TotalInfo>
      <WaterInfo
        v-show="labName == paperTabData[4].name"
        @backText="backEvent"
        :rejectUpdateList="rejects.rejectUpdateList4"
        @reviseText="reviseEvent"
        :field="fields.field4"
        :department="getDeparment(4)"
      ></WaterInfo>
      <ElectricInfo
        v-show="labName == paperTabData[5].name"
        @backText="backEvent"
        :rejectUpdateList="rejects.rejectUpdateList5"
        @reviseText="reviseEvent"
        :field="fields.field5"
        :department="getDeparment(5)"
      ></ElectricInfo>
    
      <PollutionInfo
        v-show="labName == paperTabData[6].name"
        @backText="backEvent"
        @reviseText="reviseEvent"
        :field="fields.field6"
        :rejectUpdateList="rejects.rejectUpdateList6"
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
      fields:{},//部门审核状态拿到数据后，传递给子组件"土地数据"进行回显
      rejects:{rejectUpdateList1:[]}, //部门备注信息拿到数据后，传递给子组件进行回显
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
    if(this.paperData.length>0){
      this.labName = this.paperData[0].name;
    }
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
    for(var i=1;i<7;i++){
      if(i!==1){
          this.$set(this.rejects,`rejectUpdateList${i}`,{})
      }
      this.$set(this.fields,`field${i}`,{field:''})
    }
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
    //申诉记录页面 申诉回选和驳回信息数据请求
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
              this.contents= res.data || [];
              this.appealData =
                this.contents.map(v => {
                  return v.complainRecord;
                }) || [];
             if (this.contents) {
                //appealRecord 审核状态回显
                this.contents.map((v, i) => {
                  this.rejectEvent(v.rejectUpdateList,v.complainRecord.type,v.complainRecord.content,v.complainRecord.field)
                });
              }
            }
          });
      }
    },
    //check--field发起申诉的所有字段；rejectUpdateList所有驳回的备注信息
    rejectEvent(arr,index,content,fieldStr){
      let field=`field${index}`
      this.fields[field]= { field: fieldStr,content:content}
      if(index==1){
        this.rejects.rejectUpdateList1=arr
      }else{
          let rejectUpdateList=`rejectUpdateList${index}`
          arr.map((v, i) => {
            this.$set(this.rejects[rejectUpdateList],v.field,v.content)
          });
      }
     
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