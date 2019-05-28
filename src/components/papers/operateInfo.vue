<template>
    <div data-type="7" data-title="经营数据" class="tab-box">
        <div class="operate-data" id="operateData">
            <div class="operate-item itempaper">
                <div class="itempaper-title">
                    <span class="splot"></span>
                    <span>基本信息</span>
                </div>
                <div class="itempaper-table">
                    <div style="width: 100%;" class="operate-content">
                        <el-row
                            :gutter="20"
                            class="data-cells"
                            v-for="item in land.operateData"
                            :key="item.key"
                        >
                            <el-col :span="10" class="data-cells-title">
                                <div>{{ item.name }}</div>
                            </el-col>
                            <el-col :span="14" class="data-cells-detail">
                                <div>{{ operateList[item.key] }}</div>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="edit-data edit-someone operate-data-btn">
                        <div
                            class="btn btn-edit"
                            v-show="param.action == 'entFile'"
                            @click="editOperate"
                        >
                            <i class="iconfont icon-xiugai"></i>
                            <div class="tip">
                                编辑
                                <span class="triangle-down"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog title="编辑经营数据" :visible.sync="dialogVisible">
            <el-form :model="operateList">
                <el-form-item
                    v-for="item in land.operateData"
                    :label="item.name"
                    :key="item.key"
                >
                    <el-input
                        v-if="item.key !== 'actualBusiness'"
                        v-model="operateList[item.key]"
                        autocomplete="off"
                    ></el-input>
                    <el-cascader
                        ref="getCas"
                        v-if="item.key == 'actualBusiness'"
                        :options="industryOptions"
                        :props="{
                            label: 'nameCode',
                            value: 'code',
                            children: 'children'
                        }"
                        v-model="actualBusiness"
                        :show-all-levels="false"
                        :change-on-select="true"
                        @change="searchEvent"
                    ></el-cascader>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addOperate">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
// import * as api from "@api/gov/companyPaperDetail";
 import {selectIndustry,getOperateData} from "@api/gov/companyPaperDetail";
import { landData } from "@/common/constant/constant";
import {getLocalStorage,setLocalStorage} from "@/common/utils/index.js";
export default {
  data() {
    return {
      actualBusiness: [],
      dialogVisible: false,
      industryOptions:
        !!getLocalStorage("reallyIndus") &&
        JSON.parse(getLocalStorage("reallyIndus"))
          ? JSON.parse(getLocalStorage("reallyIndus"))
          : [],
      operateFrom: {
        ss: ""
      },
      land: {
        operateData: landData.operateData
      },
      operateList: {
        frName: "",
        frTel: "",
        applicant: "",
        applicantTel: "",
        actualBusiness: ""
      },
      param: {
        action: ""
      },
      tempIndus: ""
    };
  },
  props: {
    department: {
      type: Object,
      default: null
    }
  },
  computed: {},
  mounted() {
    this.searchEvent();
    this.getDataList();
  },
  methods: {
    searchEvent() {
      if (this.industryOptions.length > 0) {
        this.industryOptions.map((v, i) => {
          this.$set(v, "nameCode", `${v.name}(${v.code})`);
          v.children.map((v1, j) => {
            this.$set(v1, "nameCode", `${v1.name}(${v1.code})`);
            v1.children.map((v2, j) => {
              this.$set(v2, "nameCode", `${v2.name}(${v2.code})`);
            });
          });
        });
      } else {
        selectIndustry().then(res => {
          if (res.code === "0000") {
            this.industryOptions = res.data.industry || [];
            setLocalStorage("reallyIndus", JSON.stringify(res.data.industry));
            this.industryOptions.map((v, i) => {
              this.$set(v, "nameCode", `${v.name}(${v.code})`);
              v.children.map((v1, j) => {
                this.$set(v1, "nameCode", `${v1.name}(${v1.code})`);
                v1.children.map((v2, j) => {
                  this.$set(v2, "nameCode", `${v2.name}(${v2.code})`);
                });
              });
            });
          }
        });
      }
    },
    getDataList() {
      this.param = this.$store.state.paperParam;
      const params = {
        creditCode: this.param.creditCode,
        dataYear: this.param.dataYear
      };
      getOperateData(params)
        .then(res => {
          if (res.code == "0000" && res.data !== null) {
            this.operateList = Object.assign({}, this.operateList, res.data);
            console.log(this.operateList,'lll')
            this.tempIndus = this.operateList.actualBusiness;
             let aa = Array.of();
            if (res.data.actualBusiness!=='') {
              let value = res.data.actualBusiness.split("(")[1].split(")")[0];
              if (value.length == 2) {
                aa = Array.of(value);
              } else if (value.length == 3) {
                let v1 = value.slice(0, 2);
                aa = Array.of(v1, value);
              } else if (value.length == 4) {
                let v1 = value.slice(0, 2);
                let v2 = value.slice(0, 3);
                aa = Array.of(v1, v2, value);
              }
            }
            this.actualBusiness = aa;
          }
        })
        .then(() => {
          this.$store.commit({
            type: "setSaveData",
            params: { value: this.operateList, type: "operateList" }
          });
        });
    },
    addOperate() {
      if (this.$refs["getCas"] !== undefined) {
        this.operateList.actualBusiness = this.$refs[
          "getCas"
        ][0].currentLabels.pop();
      }
      this.dialogVisible = false;
    },
        editOperate() {
            this.dialogVisible = true;
        }
    }
};
</script>
<style lang="less" scoped>
</style>
