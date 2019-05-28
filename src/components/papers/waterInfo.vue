<template>
  <div data-type="4" data-title="用水数据" class="tab-box">
    <div id="waterData">
      <div class="water-data">
        <div class="swa-depart itempaper" id="depart4">
          <div class="itempaper-title">
            <span class="splot"></span>
            <span>
              咨询部门
              <span v-show="false">{{totalWaterCom}}</span>
            </span>
          </div>
          <div class="itempaper-table">
            <el-row
              :gutter="20"
              class="data-cells"
              v-for="(item,index) in land.departmentList"
              :key="index+'qw'"
            >
              <el-col :span="10" class="data-cells-title">
                <div>{{item.name}}</div>
              </el-col>
              <el-col :span="14" class="data-cells-detail" >
                <div>{{department[item.key]}}</div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="water-total itempaper">
          <div class="itempaper-title">
            <span class="splot"></span>
            <span>总量指标</span>
          </div>
          <div class="itempaper-table">
            <el-row :gutter="20" class="data-cells">
              <el-col :span="10" class="data-cells-title">
                <div>用水量(万吨)</div>
              </el-col>
              <el-col :span="14" class="data-cells-detail">
                <div>{{waterList.totalWaterUsed}}</div>
              </el-col>
            </el-row>
          </div>
        </div>
        <!--水表户号-->
        <div class="water-num itempaper">
          <div class="itempaper-title">
            <span class="splot"></span>
            <span>水表户号</span>
          </div>
          <div class="itempaper-table list-table">
            <div class="table-header">
              <div>序号</div>
              <div style="position: relative">水表户号</div>
              <div>水表户名</div>
              <div>自来水量(万吨)</div>
              <div>备注</div>
            </div>
            <div class="total-cell waterTotal">
              <div class="text">用水量合计</div>
              <div class="val">{{waterList.waterTotal}}</div>
            </div>
            <div class="table-tbody">
              <div
                class="tbody-li water-body"
                v-for="(v,i) in waterList.waterMap"
                :key="i+'gh'"
              >
                <el-row class="flex-content2" :gutter="20">
                  <el-col :span="2">{{i+1}}</el-col>
                  <el-col :span="6" class="waterMeterNumber">{{v.waterMeterNumber}}</el-col>
                  <el-col :span="6" class="waterMeterName">{{v.waterMeterName}}</el-col>
                  <el-col :span="6" class="waterConsumption">{{v.waterConsumption}}</el-col>
                  <el-col class="waterConsumption" :span="4">{{obj1[v.id]}}</el-col>
                </el-row>
                <div
                  class="edit-data edit-someone water-num-btn"
                  v-show="action=='entName'"
                >
                  <div class="btn btn-edit" @click="editWater(v,i)">
                    <i class="iconfont icon-xiugai"></i>
                    <div class="tip">
                      编辑
                      <span class="triangle-down"></span>
                    </div>
                  </div>
                  <div class="btn btn-delete" @click="delWater(i,v.id)">
                    <i class="iconfont icon-shanchu"></i>
                    <div class="tip">
                      删除
                      <span class="triangle-down"></span>
                    </div>
                  </div>
                </div>
                <div class="buttons" v-show="action=='check'&&v.importType == 1" ref="sureApeal">
                  <button class="sendIdea" @click="sendIdeas($event)">发起申诉</button>
                  <button class="sureIdea" @click="sendIdeas($event)">确认无误</button>
                </div>
                <div class="buttons" v-show="action=='check'&&param.status=='6'&&v.importType == 1" v-if="fileArr!==''">
                  <button 
                    class="sendIdea"
                    @click="sendIdeas($event)"
                    :class="fileArr.includes(itemArr[i])==true?'disableStatus':''"
                  >{{fileArr.includes(itemArr[i])==true?'已申诉':'发起申诉'}}</button>
                  <button
                    class="sureIdea"
                    @click="sendIdeas($event)"
                    :class="fileArr.includes(itemArr[i])==false?'disableStatus1':''"
                  >{{fileArr.includes(itemArr[i])!==true?'已确认':'确认无误'}}</button>
                </div>
                <div class="buttons appeal" v-show="action=='appealRecord'" v-if="fileArr!==''">
                  <div v-show="fileArr.indexOf('electricityConsumption'+(i+1))!==-1">
                    <button class="sendIdea" @click="backReason(v.id,$event,'驳回原因',i)">驳回</button>
                    <button class="sureIdea" @click="backReason(v.id,$event,'修改',i)">修改</button>
                  </div>
                  <div v-show="fileArr.indexOf('electricityConsumption'+(i+1))==-1">
                    <i class="iconfont icon-dagoux"></i>核实无误
                  </div>
                </div>
              </div>
            </div>
            <div class="add-data waterNumBtn" @click="openDio" v-show="param.action=='entFile'">
              <i class="iconfont icon-jia"></i>添加
            </div>
          </div>
        </div>
        <div class="water-get itempaper">
          <div class="itempaper-title">
            <span class="splot"></span>
            <span>取水数据</span>
          </div>
          <div class="itempaper-table">
            <el-row :gutter="20" class="data-cells">
              <el-col :span="10" class="data-cells-title">
                <div>自取水(万吨)</div>
              </el-col>
              <el-col :span="14" class="data-cells-detail">
                <div>{{waterList.selfExtractingWater}}</div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <div class="appeal-content">
        <textarea name cols="30" rows="5" placeholder="请输入申诉内容和理由"></textarea>
      </div>
    </div>
    <el-dialog :title="title" :visible.sync="dialogVisible">
      <el-form :model="waterForm">
        <el-form-item v-for="(item,index) in land.waterNum" :label="item.name" :key="index+'qq'">
          <el-autocomplete
            v-if="item.key == 'waterMeterNumber'"
            v-model="waterForm.waterMeterNumber"
            :fetch-suggestions="numSearch"
            :placeholder="'请输入'+item.name"
            @select="selectNum"
          ></el-autocomplete>
          <el-autocomplete
            v-else-if="item.key == 'waterMeterName'"
            v-model="waterForm.waterMeterName"
            :fetch-suggestions="nameSearch"
            :placeholder="'请输入'+item.name"
            @select="selectName"
          ></el-autocomplete>
          <el-input
            v-else  
            v-model="waterForm[item.key]"
            autocomplete="off"
            :placeholder="'请输入'+item.name"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="addWater(waterForm.waterMeterNumber,waterForm.waterMeterName,waterForm.waterConsumption)"
        >确 定</el-button>
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
import * as api from "@api/gov/companyPaperDetail";
import { landData } from "@/common/constant/constant";
export default {
  data() {
    return {
      title: "",
      backReas: "", //当前驳回的理由
      dialogBack: false,
      backId: "", //当前驳回和修改的ID
      fileArr: [], //审核状态数据
      obj1: {}, //驳回成功后，返回的驳回备注
      targetIndex: "", //触发的下标
      isApeal: "", //驳回成功后，‘驳回’，‘修改’按钮回显状态控制
      files: new Set(), //自核状态下，把所有‘已自核’的字段添加到改属性传给后台
      textReason: false, //控制文本的显示
      appealReason: "",
      action: this.$store.state.paperParam.action, //路径的action状态
      editIndex: "",
      land: {
        departmentList: landData.departmentList,
        waterNum: landData.waterNum
      },
      dialogVisible: false,
      waterList: {
        selfExtractingWater: null,
        waterTotal: null,
        totalWaterUsed: null,
        waterMap: []
      },
      waterForm: {
        waterMeterNumber: "",
        waterMeterName: "",
        waterConsumption: ""
      },
      itemArr:['waterMeterNumber','waterMeterName','waterConsumption'],
      param: this.$store.state.paperParam
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
      type: Array,
      default: []
    }
  },
  computed: {
    totalWaterCom() {
      let totalWater = 0;
      for (let i = 0, len = this.waterList.waterMap.length; i < len; i++) {
        totalWater += Number(this.waterList.waterMap[i].waterConsumption);
      }
      this.waterList.waterTotal = totalWater;
      this.waterList.totalWaterUsed = totalWater + this.$store.state.totalWater;
      return this.waterList.totalWaterUsed;
    }
  },
  mounted() {
    this.getDataList();
  },
  methods: {
    //驳回原因
    backReason(backId, event, title, index) {
      if (title == "修改") {
        this.title = title;
        this.dialogVisible = true;
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
            field: "waterMeterNumber",
            backId: this.backId,
            type: 4
          })
        );
      }
    },
    //部门审核显示
    partmentApeal(arr) {
      //具有驳回的所有字段
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
      //驳回备注信息
      this.rejectUpdateList.map((v, i) => {
        this.obj1[v.typeId] = v.content;
        this.dialogBack = false;
        this.backReas = "";
      });
      //  console.log( this.obj1)
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
        this.files.add(key);
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
      this.$store.commit("setList4", {
        field: field,
        type: 4,
        content: this.appealReason
      });
    },
    openDio() {
      this.editIndex = "";
      this.dialogVisible = true;
      this.title = "新增水表";
      this.reset();
    },
    editWater(v, index) {
      this.waterForm = v;
      this.editIndex = index;
      this.dialogVisible = true;
      this.title = "编辑水表";
    },
    delWater(i, ID) {
      if (ID !== undefined) {
        api.deleteWaterUsed({ id: ID }).then(res => {
          if (res.code == "0000") {
          }
        });
      }
      this.waterList.waterMap.splice(i, 1);
      // this.$store.commit({
      //         type: "setSaveData",
      //         params: { value: this.waterList, type: "waterList" }
      //       });
    },
    getDataList() {
      this.param = this.$store.state.paperParam;
      const params = {
        creditCode: this.param.creditCode,
        dataYear: this.param.dataYear
      };
      api
        .getWaterData(params)
        .then(res => {
          if (res.code == "0000") {
            this.waterList = Object.assign({}, this.waterList, res.data);
            this.waterList.waterMap && this.waterList.waterMap.length > 0
              ? ""
              : (this.waterList.waterMap = []);
          }
        })
        .then(() => {
          this.$store.commit({
            type: "setSaveData",
            params: { value: this.waterList, type: "waterList" }
          });
        });
    },
    nameSearch(queryString, cb) {
      let params = {
        size: 10,
        num: "",
        name: queryString
      };
      api.getListWaterEntName(params).then(res => {
        if (res.code == "0000") {
          let results = res.data || [];
          results = results.map(v => {
            return {
              value: v.waterMeterName,
              label: v.waterMeterName,
              num: v.waterMeterNumber,
              total: v.waterConsumption
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
      api.getListWaterEntName(params).then(res => {
        if (res.code == "0000") {
          let results = res.data || [];
          results = results.map(v => {
            return {
              value: v.waterMeterNumber,
              label: v.waterMeterNumber,
              name: v.waterMeterName,
              total: v.waterConsumption
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
      this.waterForm.waterConsumption = item.total;
      this.waterForm.waterMeterName = item.name;
    },
    selectName(item) {
      this.waterForm.waterConsumption = item.total;
      this.waterForm.waterMeterNumber = item.num;
    },
    addWater(nowa, nowb, nowc) {
      if (this.title == "修改") {
        let obj = {
          dataYear: this.param.dataYear,
          creditCode: this.param.creditCode,
          entName: this.param.entName
        };
        let beforea = this.waterList.waterMap[this.targetIndex][
          "waterMeterNumber"
        ];
        let beforeb = this.waterList.waterMap[this.targetIndex][
          "waterMeterName"
        ];
        let beforec = this.waterList.waterMap[this.targetIndex][
          "waterConsumption"
        ];
        let arr = JSON.parse(JSON.stringify(this.waterList.waterMap));
        arr[this.targetIndex] = Object.assign(
          {},
          {
            waterMeterNumber: nowa ? nowa : beforea,
            waterMeterName: nowb ? nowb : beforeb,
            waterConsumption: nowc ? nowc : beforec
          }
        );
        let list = arr.map((v, i) => {
          v.entName = this.param.entName;
          v.creditCode = this.param.creditCode;
          v.dataYear = this.param.dataYear;
          v.selfExtractingWater = this.waterList.selfExtractingWater;
          return v;
        });
        api.addWaterUsed({ waterUsedList: list }).then(res => {});
        let $arr = [
          {
            before: beforea,
            after: nowa
          },
          {
            before: beforeb,
            after: nowb
          },
          {
            before: beforec,
            after: nowc
          }
        ];
        let content = "";
        $arr.map(v => {
          if (v.after) {
            content += `修改前:${v.before}修改后:${v.after}`;
          }
        });
        this.$emit(
          "reviseText",
          JSON.stringify({
            content: content,
            field: "ammeterNum",
            type: 4,
            typeId: this.backId
          })
        );
        this.rejectUpdateList.map((v, i) => {
          this.obj1[v.typeId] = v.content;
          this.dialogVisible = false;
          this.reset();
        });
        return;
      }
      if (this.editIndex !== "") {
        this.waterList.waterMap.splice(this.editIndex, 1, this.waterForm);
      } else {
        let filtering = this.waterList.waterMap.find((v, i, arr) => {
          return (
            v.waterMeterName == this.waterForm.waterMeterName &&
            v.waterMeterNumber == this.waterForm.waterMeterNumber
          );
        });
        if (filtering) {
          this.$message.warning("该水表已经存在");
        } else {
          this.waterList.waterMap.push(this.waterForm);
        }
        this.dialogVisible = false;
      }
      this.reset();
    },
    reset() {
      this.waterForm = {
        waterMeterNumber: "",
        waterMeterName: "",
        waterConsumption: ""
      };
    }
  }
};
</script>
<style lang="less" scoped>
</style>
