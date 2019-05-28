<template>
  <div data-type="2" data-title="税务数据" class="tab-box">
    <div id="taxData">
      <div class="tax-data">
        <div class="tax-depart itempaper" id="depart2">
          <div class="itempaper-title">
            <span class="splot"></span>
            <span>咨询部门</span>
          </div>
          <div class="itempaper-table">
            <el-table
              :data="department.list"
              stripe
              style="width: 100%" align="center" >
              <el-table-column   v-for="(item,index) in land.departmentList" :key="index+'q'"
                :prop="item.key" align="center" 
                :label="item.name"
              >
              </el-table-column>
            </el-table>
            
          </div>
        </div>

        <div class="status itempaper">
          <div class="itempaper-title">
            <span class="splot"></span>
            <span>经营信息</span>
          </div>
          <div class="itempaper-table">
            <el-row
              :gutter="20"
              class="data-cells"
              v-for="item in land.statusData"
              :key="item.name"
            >
              <el-col :span="10" class="data-cells-title">
                <div>{{item.name}}</div>
              </el-col>
              <el-col :span="7" class="data-cells-detail">
                <div>{{taxList[item.key]}}</div>
              </el-col>
              <el-col :span="7" class="data-cells-detail appeal_reason">
                <div>{{rejectUpdateList[item.key]}}</div>
              </el-col>
              <div class="buttons" v-show="action=='check'&&param.status!=='6'" ref="sureApeal">
                <button class="sendIdea" @click="sendIdeas($event,item.key)">发起申诉</button>
                <button class="sureIdea" @click="sendIdeas($event,item.key)">确认无误</button>
              </div>
              <div class="buttons" v-show="action=='check'&&param.status=='6'">
                <!-- <div>{{fileArr}}</div> -->
                <button class="sendIdea" @click="sendIdeas($event,item.key)" :class="fileArr.includes(item.key)==true?'disableStatus':''">{{fileArr.includes(item.key)==true?'已申诉':'发起申诉'}}</button>
                <button class="sureIdea" @click="sendIdeas($event,item.key)" :class="fileArr.includes(item.key)==false?'disableStatus1':''">{{fileArr.includes(item.key)!==true?'已确认':'确认无误'}}</button>
              </div>
              <!--<div class="buttons appeal" v-show="action=='appealRecord'" v-if="fileArr&&param.userType=='2'">-->
              <div class="buttons appeal" v-show="action=='appealRecord'">
                <!-- <span>{{item.key}}</span> -->
                <div v-if="fileArr.includes(item.key)">
                  <button class="sendIdea" @click="backReason(item.key,$event,'驳回原因')">驳回</button>
                  <button class="sureIdea" @click="backReason(item.key,$event,'修改')">修改</button>
                </div>
                <div v-if="!fileArr.includes(item.key)">
                  <i class="iconfont icon-dagoux"></i>核实无误
                </div>
              </div>
            </el-row>
          </div>
        </div>
        <div class="tax-item itempaper">
          <div class="itempaper-title">
            <span class="splot"></span>
            <span>税务数据</span>
          </div>
          <div class="itempaper-table">
            <el-row
              :gutter="20"
              class="data-cells"
              v-for="(item,index) in land.taxDatas"
              :key="index"
            >
              <el-col :span="10" class="data-cells-title">
                <span
                  v-for="(v,i) in item.index.split('.').splice(0,item.index.split('.').length-1)"
                  :key="i+'q'"
                ></span>
                <span>{{item.index}}</span>
                <span>{{item.name}}</span>
              </el-col>
              <el-col :span="7" class="data-cells-detail">
                <div>{{taxList[item.key]}}</div>
              </el-col>
              <el-col :span="7" class="data-cells-detail appeal_reason">
                <div>{{rejectUpdateList[item.key]}}</div>
              </el-col>
              <div class="buttons" v-show="action=='check'&&param.status!=='6'" ref="sureApeal">
                <button class="sendIdea" @click="sendIdeas($event,item.key)">发起申诉</button>
                <button class="sureIdea" @click="sendIdeas($event,item.key)">确认无误</button>
              </div>
              <div class="buttons" v-show="action=='check'&&param.status=='6'">
                <!-- <div>{{fileArr}}</div> -->
                <button class="sendIdea" @click="sendIdeas($event,item.key)" :class="fileArr.includes(item.key)==true?'disableStatus':''">{{fileArr.includes(item.key)==true?'已申诉':'发起申诉'}}</button>
                <button class="sureIdea" @click="sendIdeas($event,item.key)" :class="fileArr.includes(item.key)==false?'disableStatus1':''">{{fileArr.includes(item.key)!==true?'已确认':'确认无误'}}</button>
              </div>
              <div class="buttons appeal" v-show="action=='appealRecord'" v-if="fileArr">
                <!-- <span>{{item.key}}</span> -->
                <div v-if="fileArr.includes(item.key)">
                  <button class="sendIdea" @click="backReason(item.key,$event,'驳回原因')">驳回</button>
                  <button class="sureIdea" @click="backReason(item.key,$event,'修改')">修改</button>
                </div>
                <div v-if="!fileArr.includes(item.key)">
                  <i class="iconfont icon-dagoux"></i>核实无误
                </div>
              </div>
            </el-row>
          </div>
        </div>
      </div>
      <div class="appeal-content" v-show="textReason">
        <textarea
          name
          cols="30"
          rows="5"
          placeholder="请输入申诉内容和理由"
          @change="sendIdeas"
          v-model="appealReason"
        ></textarea>
      </div>
    </div>
    <el-dialog :title="title" :visible.sync="dialogBack">
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4}"
        placeholder="请输入内容"
        v-model="backReas"
      ></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogBack = false">取 消</el-button>
        <el-button type="primary" @click="sureBack()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
// import * as api from "@api/gov/companyPaperDetail";
import {updateOrAddTaxData,getTaxData} from "@api/gov/companyPaperDetail";
import { landData } from "@/common/constant/constant";

export default {
  data() {
    return {
      title: "",
      backField: "", //当前驳回的字段
      backReas: "", //当前驳回的理由
      dialogBack: false,
      fileArr: [], //审核状态数据
      // obj1: {}, //驳回成功后，返回的驳回备注
      isApeal: "", //驳回成功后，‘驳回’，‘修改’按钮回显状态控制
      action: this.$store.state.paperParam.action, //路径的action状态
      files: new Set(), //自核状态下，把所有‘已自核’的字段添加到改属性传给后台
      textReason: false, //控制文本的显示
      appealReason: "",
      land: {
        departmentList: landData.departmentList,
        statusData: landData.statusData,
        taxDatas: landData.taxDatas
      },
      taxList: {
        mainServiceIncome: "",
        taxableSaleIncome: "",
        totalProfit: "",
        fixedAssetsInvestment: "",
        taxRevenue: "",
        incrementTax: "",
        consumptionTax: "",
        businessIncomeTaxes: "",
        personalIncomeTaxes: "",
        personTax: "",
        cityLandTax: "",
        carTax: "",
        landIncrementTax: "",
        yhTax: "",
        cswhTax: "",
        resourceTax: "",
        jyfj: "",
        placeJyfj: "",
        hjbhTax: ""
      },
      param:this.$store.state.paperParam
    };
  },
  props: {
    department: {
      type: Object,
      default: null
    },
    field: {
      type: Object,
      default: null
    },
    rejectUpdateList: {
      type: Object,
      default: null
    }
  },
  watch: {
    field(val) {
      this.partmentApeal(val);
    }
  },
  computed: {},
  mounted() {
    // console.log(this.param.status)
    this.getDataList();
    
  },
  methods: {
    //驳回原因
    backReason(backField, event, title) {
      this.title = title;
      this.isApeal = event.target;
      this.dialogBack = true;
      this.backField = backField;
    },
    //确定驳回
    sureBack() {
      if (this.title == "驳回原因") {
        this.$emit(
          "backText",
          JSON.stringify({
            content: "驳回原因:" + this.backReas,
            field: this.backField,
            backId: this.backId,
            type: 2
          })
        );
      } else if (this.title == "修改") {
        let obj = {
          dataYear: this.param.dataYear,
          creditCode: this.param.creditCode,
          entName: this.param.entName
        };
        let before = this.taxList[this.backField];
        // let list = JSON.parse(JSON.stringify(this.taxList));
         let list =this.taxList;
        list[this.backField] = this.backReas;
        let arr = Object.assign({}, list, obj);
        updateOrAddTaxData(arr).then((res)=>{
        })
        this.$emit(
          "reviseText",
          JSON.stringify({
            content: "修改前:" + before + ",修改后:" + this.backReas,
            field: this.backField,
            type: 2,
            typeId: ""
          })
        );
      }
    },
    //部门审核显示
    partmentApeal(arr) {
      this.files=new Set()
      //具有驳回的所有字段
      if (arr.field!==undefined&&arr.field!=='') {
        this.fileArr = arr.field.split(",");
        if(this.action=='check'&&this.param.status=='6'){
          this.fileArr.map((v,i)=>{
            this.files.add(v)
          })
        }
        
      } else {
        // this.fileArr = [];
      }
      if(arr.content !== undefined && arr.content !== null && arr.content!==''){
        this.textReason=true
        this.appealReason=arr.content
      }
      //驳回备注信息
      // this.rejectUpdateList.map((v, i) => {
      //   this.obj1[v.field] = v.content;
      //   this.dialogBack = false;
      //   this.backReas = "";
      // });
      this.dialogBack = false;
      this.backReas = "";
      //驳回成功后按钮灰显
      if (this.isApeal !== "") {
        if (this.title == "驳回原因") {
          this.isApeal.classList.add("disabled-click");
          this.isApeal.nextSibling.classList.add("disabled-click");
        } else if (this.title == "修改") {
          this.isApeal.classList.add("disabled-click");
          this.isApeal.previousSibling.classList.add("disabled-click");
        }
      }
    },
    sendIdeas(e, key = "") {
          if (e.target.innerHTML == "发起申诉") {
                if(key!==''){
                    this.files.add(key);
                }
                e.target.innerHTML = "已申诉";
                e.target.nextSibling.innerHTML = "确认无误";
                e.target.nextSibling.classList.remove('disableStatus1')
                e.target.style.background = "#FDA79F";
                e.target.nextSibling.style.background = "#5C7CEC";
                this.commitApeal();
              } else if (e.target.innerHTML == "确认无误") {
                // console.log(this.files,key)
                this.files.delete(key);
                e.target.previousSibling.classList.remove('disableStatus')
                e.target.innerHTML = "已确认";
                e.target.previousSibling.innerHTML = "发起申诉";
                e.target.style.background = "#7BD1C1";
                e.target.previousSibling.style.background = "#FE6E61";
                this.commitApeal();
              } else if (e.target.innerHTML == "") {
                this.commitApeal();
              }
    },
    commitApeal() {
      let apealButs = this.$refs.sureApeal;
      apealButs = apealButs.filter((v, i) => {
        if (
          v.children[0].innerHTML == "发起申诉" &&
          v.children[1].innerHTML == "确认无误"
        ) {
          return v;
        }
      });
      //  console.log([...this.files],'ll')
      if (apealButs.length == 0) {
        this.$store.commit("setApealButs", { value: false, type: "taxInfo" });
      }
      let field = [...this.files].join(",");
      if (field == "") {
        this.textReason = false;
      } else {
        this.textReason = true;
      }
      this.$store.commit("setList2", {
        field: field,
        type: 2,
        content: this.appealReason
      });
    },
    getDataList() {
      const params = {
        creditCode: this.param.creditCode,
        dataYear: this.param.dataYear
      };
      getTaxData(params).then(res => {
        if (res.code == "0000") {
          this.taxList = Object.assign({}, this.taxList, res.data);
          this.$store.commit({
            type: "setSaveData",
            params: { value: this.taxList, type: "taxList" }
          });
          this.partmentApeal(this.field);
        }
    })
    }
  }
};
</script>
<style lang="less" scoped>
</style>
