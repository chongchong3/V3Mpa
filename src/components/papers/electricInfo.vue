<template>
  <div data-type="5" data-title="用电数据" class="tab-box">
    <div id="electricData">
      <div class="electric-data">
        <div class="swa-depart itempaper" id="depart5">
          <div class="itempaper-title">
            <span class="splot"></span>
            <span>咨询部门</span>
            <span v-show="false">{{ totalEleCom }}</span>
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
        <div class="electric-total itempaper">
          <div class="itempaper-title">
            <span class="splot"></span>
            <span>总量指标</span>
          </div>
          <div class="itempaper-table">
            <el-row :gutter="20" class="data-cells">
              <el-col :span="10" class="data-cells-title">
                <div>用电量(万千万时)</div>
              </el-col>
              <el-col :span="14" class="data-cells-detail">
                <div>{{ toHtmlStr((electricList.electricityTotal.toFixed(2)),'') }}</div>
              </el-col>
            </el-row>
          </div>
        </div>
        <!--电表户号-->
        <div class="electric-num itempaper">
          <div class="itempaper-title">
            <span class="splot"></span>
            <span>电表户号</span>
          </div>
          <div class="itempaper-table list-table">
            <div class="table-header">
              <div>序号</div>
              <div style="position: relative">电表户号</div>
              <div>电表户名</div>
              <div>电表用电量(万千万时)</div>
              <div>备注</div>
            </div>
            <div class="total-cell electricTotal">
              <div class="text">用电量合计</div>
              <div class="val">{{ toHtmlStr((electricList.countElectricity.toFixed(2)),'') }}</div>
              <div class="one"></div>
            </div>
            <div class="table-tbody">
              <div
                class="tbody-li"
                v-for="(v, i) in electricList.mapList"
                :key="i"
                :id="v.id"
              >
                <el-row class="flex-content2" :gutter="20">
                  <el-col :span="2">{{ i + 1 }}</el-col>
                  <el-col class="ammeterNum" :span="6">{{ v.ammeterNum }}</el-col>
                  <el-col class="ammeterName" :span="6">{{ v.ammeterName }} </el-col>
                  <el-col class="electricityConsumption" :span="6">{{ v.electricityConsumption }}</el-col>
                 <el-col class="electricityConsumption appeal_reason" :span="4">{{rejectUpdateList[v.id]}}</el-col>
                </el-row>
                <div class="edit-data edit-someone"  v-show="action=='entFile'&&v.importType != 1">
                  <div class="btn btn-edit" @click="editEle(v, i)">
                    <i class="iconfont icon-xiugai"></i>
                    <div class="tip">
                      编辑
                      <span class="triangle-down"></span>
                    </div>
                  </div>
                  <div class="btn btn-delete" @click="delEle(i, v.id)">
                    <i class="iconfont icon-shanchu"></i>
                    <div class="tip">
                      删除
                      <span class="triangle-down"></span>
                    </div>
                  </div>
                </div>
                <div class="buttons" v-show="action=='check'" ref="sureApeal">
                  <button class="sendIdea" @click="sendIdeas($event,`electricityConsumption${i+1}`)">发起申诉</button>
                  <button class="sureIdea" @click="sendIdeas($event,`electricityConsumption${i+1}`)">确认无误</button>
                </div>
                <!-- <div>{{fileArr.length}}</div> -->
                 <div class="buttons" v-show="action=='check'&&param.status=='6'" v-if="fileArr.length>0">
                <!--<div class="buttons" v-show="action=='check'&&param.status=='6'">-->
                  <button 
                    class="sendIdea"
                    @click="sendIdeas($event,`electricityConsumption${i+1}`)"
                    :class="fileArr.indexOf('electricityConsumption'+(i+1))!==-1?'disableStatus':''"
                  >{{fileArr.indexOf('electricityConsumption'+(i+1))!==-1?'已申诉':'发起申诉'}}</button>
                  <button
                    class="sureIdea"
                    @click="sendIdeas($event,`electricityConsumption${i+1}`)"
                    :class="fileArr.indexOf('electricityConsumption'+(i+1))==-1?'disableStatus1':''"
                  >{{fileArr.indexOf('electricityConsumption'+(i+1))==-1?'已确认':'确认无误'}}</button>
                </div>
                 <div class="buttons appeal" v-show="action=='appealRecord'" v-if="fileArr">
                <!--<div class="buttons appeal" v-show="action=='appealRecord'" >-->
                  <div v-show="fileArr.indexOf('electricityConsumption'+(i+1))!==-1">
                    <button class="sendIdea" @click="backReason(v.id,$event,'驳回原因',i)">驳回</button>
                    <button class="sureIdea" @click="backReason(v.id,$event,'修改',i,v)">修改</button>
                  </div>
                  <div v-show="fileArr.indexOf('electricityConsumption'+(i+1))==-1">
                    <i class="iconfont icon-dagoux"></i>核实无误
                  </div>
                </div>
              </div>
            </div>
            <div  class="add-data electricNumBtn"  @click="openDio"  v-show="param.action == 'entFile'" >
              <i class="iconfont icon-jia"></i>添加
            </div>
          </div>
        </div>
      </div>
      <div class="appeal-content"  v-show="textReason">
        <textarea name cols="30" rows="5" placeholder="请输入申诉内容和理由"></textarea>
      </div>
    </div>
    <el-dialog :title="title" :visible.sync="dialogVisible">
      <el-form :model="electricFrom">
        <el-form-item v-for="item in land.electricNum" :label="item.name" :key="item.key">
          <el-autocomplete
            v-if="item.key == 'ammeterNum'"
            v-model="electricFrom.ammeterNum"
            :fetch-suggestions="numSearch"
            :placeholder="'请输入' + item.name"
            @select="selectNum"
          ></el-autocomplete>
          <el-autocomplete
            v-else-if="item.key == 'ammeterName'"
            v-model="electricFrom.ammeterName"
            :fetch-suggestions="nameSearch"
            :placeholder="'请输入' + item.name"
            @select="selectName"
          ></el-autocomplete>
          <el-input
            v-else
            v-model="electricFrom[item.key]"
            autocomplete="off"
            :placeholder="'请输入' + item.name"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addElectric(electricFrom.ammeterNum,electricFrom.ammeterName,electricFrom.electricityConsumption)">确 定</el-button>
      </div>
    </el-dialog>
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
    import {getListElecticEntName,addElectricData,deleteElectricUsed,getElectricData}  from "@api/gov/companyPaperDetail";
import { landData } from "@/common/constant/constant";
    import {toHtmlStr} from "../../common/utils/dom";
export default {
  data() {
    return {
      title: "",
      backReas: "", //当前驳回的理由
      dialogBack: false,
      backId: "", //当前驳回和修改的ID
      fileArr: [], //审核状态数据
      targetIndex: "", //触发的下标
      isApeal: "", //驳回成功后，‘驳回’，‘修改’按钮回显状态控制
      files: new Set(), //自核状态下，把所有‘已自核’的字段添加到改属性传给后台
      textReason: false, //控制文本的显示
      appealReason: "",
      action: this.$store.state.paperParam.action, //路径的action状态
      editIndex: "",
      dialogVisible: false,
      land: {
        departmentList: landData.departmentList,
        electricNum: landData.electricNum
      },
      electricList: {
        electricityTotal: null,
        countElectricity: null,
        mapList: []
      },
      toHtmlStr:toHtmlStr,
      param: this.$store.state.paperParam,
      itemArr:['ammeterNum','ammeterName','electricityConsumption'],
      electricFrom: {
        ammeterNum: "",
        ammeterName: "",
        electricityConsumption: ""
      },
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
    },
    electricList(val){
      this.electricList = val;
    }
  },
  computed: {
    totalEleCom() {
      let totalEle = 0;
      for (let i = 0, len = this.electricList.mapList.length; i < len; i++) {
        totalEle += Number(this.electricList.mapList[i].electricityConsumption);
      }
      this.electricList.countElectricity = totalEle;
      return totalEle;
    }
  },
  mounted() {
    this.getDataList();
  },
  methods: {
       //驳回原因
    backReason(backId, event, title, index,v) {
      if (title == "修改") {
        this.title = title;
        this.dialogVisible = true;
//        this.electricFrom = v;
      } else {
        this.title = title;
        this.dialogBack = true;
      }
      this.title = title;
      this.isApeal = event.target;
      this.backId = backId;
      this.targetIndex = index;
    },
    //确定驳回
    sureBack() {
      if (this.title == "驳回原因") {
        this.$emit(
          "backText",
          JSON.stringify({
            content: "驳回原因:" + this.backReas,
            field: "ammeterNum",
            backId: this.backId,
            type: 5
          })
        );
      }
    },
    //部门审核显示--申诉的所有字段需要进行驳回和修改操作的显示按钮
    partmentApeal(arr) {
      this.files = new Set();
      if (arr.field !== undefined && arr.field !== "") {
        this.fileArr = arr.field.split(",");
        if (this.action == "check" && this.param.status == "6") {
          this.fileArr.map((v, i) => {
            this.files.add(v);
          });
        }
      } else {
        // this.fileArr = [];
      }
      if(arr.content !== undefined && arr.content !== null && arr.content!==''){
        this.textReason=true
        this.appealReason=arr.content
      }
      this.dialogBack = false;
      this.backReas = "";
      //驳回成功后按钮灰显
      if (this.isApeal !== "") {
        if (this.title == "驳回原因") {
          this.isApeal.classList.add("disabled-click");
          this.isApeal.nextSibling.classList.add("disabled-click");
        } else {
          this.isApeal.classList.add("disabled-click");
          this.isApeal.previousSibling.classList.add("disabled-click");
        }
      }
    },
    //发起申述
    sendIdeas(e, key = "") {
      if (e.target.innerHTML == "发起申诉") {
         if(key!==''){
              this.files.add(key);
          }
        e.target.innerHTML = "已申诉";
        e.target.nextSibling.innerHTML = "确认无误";
        e.target.nextSibling.classList.remove("disableStatus1");
        e.target.style.background = "#FDA79F";
        e.target.nextSibling.style.background = "#5C7CEC";
        this.commitApeal();
      } else if (e.target.innerHTML == "确认无误") {
        this.files.delete(key);
        e.target.innerHTML = "已确认";
        e.target.previousSibling.innerHTML = "发起申诉";
        e.target.previousSibling.classList.remove("disableStatus");
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
      if (apealButs.length == 0) {
        this.$store.commit("setApealButs", { value: false, type: "taxInfo" });
      }
      let field = [...this.files].join(",");
      if (field == "") {
        this.textReason = false;
      } else {
        this.textReason = true;
      }
      this.$store.commit("setList5", {
        field: field,
        type: 5,
        content: this.appealReason
      });
    },
    openDio() {
      this.reset();
      this.editIndex = "";
      this.title = "新增电表";
      this.dialogVisible = true;
    },
    getDataList() {
      this.param = this.$store.state.paperParam;
      const params = {
        creditCode: this.param.creditCode,
        dataYear: this.param.dataYear
      };
       getElectricData(params)
        .then(res => {
          if (res.code == "0000") {
            this.electricList = Object.assign({}, this.electricList, res.data);
            // console.log(this.electricList,'kk')
            this.electricList.mapList && this.electricList.mapList.length > 0
              ? ""
              : (this.electricList.mapList = []);
          }
        })
        .then(() => {
          this.$store.commit({
            type: "setSaveData",
            params: {
              value: this.electricList,
              type: "electricList"
            }
          });
          this.partmentApeal(this.field);
        });
    },
    nameSearch(queryString, cb) {
      let params = {
        size: 10,
        num: "",
        name: queryString
      };
      getListElecticEntName(params).then(res => {
        if (res.code == "0000") {
          let results = res.data || [];
          results = results.map(v => {
            return {
              value: v.ammeterName,
              label: v.ammeterName,
              num: v.ammeterNum,
              total: v.electricityConsumption
            };
          });
          clearTimeout(this.timeout);
          this.timeout = setTimeout(() => {
            cb(results);
          }, 1000);
        }
      });
    },
    numSearch(queryString, cb) {
      let params = {
        size: 10,
        num: queryString,
        name: ""
      };
      getListElecticEntName(params).then(res => {
        if (res.code == "0000") {
          let results = res.data || [];
          results = results.map(v => {
            return {
              value: v.ammeterNum,
              label: v.ammeterNum,
              name: v.ammeterName,
              total: v.electricityConsumption
            };
          });
          clearTimeout(this.timeout);
          this.timeout = setTimeout(() => {
            cb(results);
          }, 1000);
        }
      });
    },
    selectNum(item) {
      this.electricFrom.electricityConsumption = item.total;
      this.electricFrom.ammeterName = item.name;
    },
    selectName(item) {
      this.electricFrom.electricityConsumption = item.total;
      this.electricFrom.ammeterNum = item.num;
    },
    //添加用户电表
    addElectric(nowa, nowb, nowc) {
        if (this.title == "修改") {
        let obj = {
          dataYear: this.param.dataYear,
          creditCode: this.param.creditCode,
          entName: this.param.entName
        };
        let beforea = this.electricList.mapList[this.targetIndex][
          "ammeterNum"
        ];
        let beforeb =this.electricList.mapList[this.targetIndex][
          "ammeterName"
        ];
        let beforec = this.electricList.mapList[this.targetIndex][
          "electricityConsumption"
        ];
        let arr = JSON.parse(JSON.stringify(this.electricList.mapList));
        arr[this.targetIndex] = Object.assign(
          {},arr[this.targetIndex],
          {
            ammeterNum: nowa ? nowa : beforea,
            ammeterName: nowb ? nowb : beforeb,
            electricityConsumption: nowc ? nowc : beforec
          }
        );
        let list = arr.map((v, i) => {
          v.entName = this.param.entName;
          v.creditCode = this.param.creditCode;
          v.dataYear = this.param.dataYear;
          return v;
        });
        addElectricData({ electricUsedList: list }).then(res => {
            this.getDataList();
        });

        let $arr = [
          {
            before: beforea,
            after: nowa,
            name:'电表户号'
          },
          {
            before: beforeb,
            after: nowb,
            name:'电表户名'
          },
          {
            before: beforec,
            after: nowc,
            name:'电表用电量'
          }
        ];
        let content = "";
        $arr.map(v => {
          if (v.after) {
            content += `${v.name}修改前:${v.before},修改后:${v.after};`;
          }
        });
        this.$emit(
          "reviseText",
          JSON.stringify({
            content: content,
            field: "ammeterNum",
            type: 5,
            typeId: this.backId
          })
        );
        this.dialogVisible = false;
        this.reset();
        return;
      }
      if (this.editIndex !== "") {
        this.electricList.mapList.splice(this.editIndex, 1, this.electricFrom);
      } else {
        let filtering = this.electricList.mapList.find((v, i, arr) => {
          return (
            v.ammeterName == this.electricFrom.ammeterName &&
            v.ammeterNum == this.electricFrom.ammeterNum
          );
        });
        if (filtering) {
          this.$message.warning("该电表已经存在");
        } else {
          this.electricList.mapList.push(this.electricFrom);
        }
      }
      this.dialogVisible = false;
      this.reset();
    },
    //编辑用户电表
    editEle(v, index) {
      this.electricFrom = v;
      this.editIndex = index;
      this.title = "编辑电表";
      this.dialogVisible = true;
    },
    //删除用户电表
    delEle(index, ID) {
      if (ID !== undefined) {
        deleteElectricUsed({ id: ID }).then(res => {
          if (res.code == "0000") {
          }
        });
      }
      this.electricList.mapList.splice(index, 1);
    },
    reset() {
      this.electricFrom = {
        ammeterNum: "",
        ammeterName: "",
        electricityConsumption: ""
      };
    }
  }
};
</script>
<style lang="less" scoped>
</style>
