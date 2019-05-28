<template>
  <div class="contentbox">
    <div class="tabbox">
      <div class="content">
        <div class="contentlist" data-name="经营情况">
          <div class="jbxx">
            <div class="yearSelect" id="yearSelect">
              <el-select v-model="dataYear" placeholder="请选择" @change="entPosition(dataYear)">
                <el-option
                  v-for="item in years"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
            <section class="list-item businessData" v-for="(item) in tableArr" :key="item.key">
              <section class="subSection">
                <div class="sectionSubTitle">{{item.title}}</div>
                <div class="info-table">
                  <div class="tables" v-for="(items,index) in item.children" :key="index">
                    <span class="th">
                      <span class="border" v-html="items.name"></span>
                    </span>
                    <span class="td" :data-num="items.key" ref="keyValue">
                      <span class="border" :name="items.key"></span>
                    </span>
                  </div>
                </div>
              </section>
            </section>
            <section class="list-item businessData">
              <section class="subSection">
                <div class="sectionSubTitle">用水数据</div>
                <div class="info-table water" v-for="(item,index) in tableArr1" :key="index">
                  <div class="tables">
                    <span class="th">
                      <span class="border">水表户名</span>
                    </span>
                    <span class="td">
                      <span class="border">{{item.waterMeterName}}</span>
                    </span>
                  </div>
                  <div class="tables">
                    <span class="th">
                      <span class="border">水表户号</span>
                    </span>
                    <span class="td">
                      <span class="border">{{item.waterMeterNumber}}</span>
                    </span>
                  </div>
                  <div class="tables">
                    <span class="th">
                      <span class="border">自来水（万立方米）</span>
                    </span>
                    <span class="td">
                      <span class="border">{{item.waterConsumption}}</span>
                    </span>
                  </div>
                </div>
              </section>
            </section>
             <section class="list-item businessData">
              <section class="subSection">
                <div class="sectionSubTitle">用电数据</div>
                <div class="info-table water" v-for="(item,index) in tableArr2" :key="index+'a'">
                  <div class="tables">
                    <span class="th">
                      <span class="border">电表户名</span>
                    </span>
                    <span class="td">
                      <span class="border">{{item.ammeterName}}</span>
                    </span>
                  </div>
                  <div class="tables">
                    <span class="th">
                      <span class="border">电表户号</span>
                    </span>
                    <span class="td">
                      <span class="border">{{item.ammeterNum}}</span>
                    </span>
                  </div>
                  <div class="tables">
                    <span class="th">
                      <span class="border">用电量（万千瓦时）</span>
                    </span>
                    <span class="td">
                      <span class="border">{{item.electricityConsumption}}</span>
                    </span>
                  </div>
                </div>
              </section>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import * as inter from "@api/gov/entDetail";
import * as inter from "@api/bussiness.js";
// import store from '@/store.js'
export default {
  props: {
    creditCodes: {
      type: String
    }
  },
  data() {
    return {
      dataYear: "",
      years: [
        { label: "2017年", value: 2017 },
        { label: "2018年", value: 2018 },
        { label: "2019年", value: 2019 }
      ].reverse(),
      tableArr: [
        {
          title: "基本信息",
          children: [
            {
              name: "企业负责人",
              key: "frName"
            },
            {
              name: "负责人联系方式",
              key: "frTel"
            },
            {
              name: "填报人",
              key: "applicant"
            },
            {
              name: "填报人联系方式",
              key: "applicantTel"
            },
            {
              name: "实际经营业务",
              key: "actualBusiness"
            }
          ]
        },
        {
          title: "总量指标",
          children: [
            {
              name: "用地面积（亩）"
              // key: "frName"
            },
            {
              name: "税收实际贡献（万元）"
              // key: "frTel"
            },
            {
              name: "工业增加值（万元）"
              // key: "applicant"
            },
            {
              name: "综合能耗（吨标煤）"
              // key: "applicant"
            },
            {
              name: "研发经费支出（万元）"
              // key: "frName"
            },
            {
              name: "主营业务收入（万元）"
              // key: "frTel"
            },
            {
              name: "年平均职工人数（人）"
              // key: "applicant"
            },
            {
              name: "固定资产投资（万元）"
              // key: "applicant"
            },
            {
              name: "年实际用电量（万千瓦时）"
              // key: "applicant"
            },
            {
              name: "年实际用水量（万立方米）"
              // key: "applicant"
            }
          ]
        },
        {
          title: "亩均指标",
          children: [
            {
              name: "亩均税收（万元/亩）"
              // key: "frName"
            },
            {
              name: "亩均增加值（万元/亩）"
              // key: "frTel"
            },
            {
              name: "单位能耗增加值（万元/吨标煤）"
              // key: "applicant"
            },
            {
              name: "R&D经费支出占比（%）"
              // key: "applicant"
            },
            {
              name: "全员劳动生产率（万元/人年）"
              // key: "frName"
            },
            {
              name: "单位排放增加值（万元/吨标煤）"
              // key: "frTel"
            }
          ]
        },
        {
          title: "登记土地",
          children: [
            {
              name: "土地使用权面积",
              key: "landUseArea"
            },
            {
              name: "不动产权证号",
              key: "realPropertyNumber"
            },
            {
              name: "土地坐落",
              key: "landLocated"
            },
            {
              name: "供地日期",
              key: "landSupply"
            }
          ]
        },
        {
          title: "承租土地",
          children: [
            {
              name: "出租方统一社会信用代码",
              key: "lessorCreditCode"
            },
            {
              name: "出租方企业名称",
              key: "lessor"
            },
            {
              name: "不动产权证号",
              key: "realPropertyNumber"
            },
            {
              name: "承租用地面积（亩）",
              key: "areaOfInLand"
            },
            {
              name: "土地坐落",
              key: "areaOfInLand"
            },
            {
              name: "租期起",
              key: "rentBegin"
            },
            {
              name: "租期止",
              key: "rentEnd"
            },
            {
              name: "出租方联系方式",
              key: "lessorTel"
            },
            {
              name: "年实际用水量（万立方米）",
              key: "waterTotal"
            },
            {
              name: "年实际用电量（万千瓦时）",
              key: "electricityTotal"
            }
          ]
        },
        {
          title: "出租土地",
          children: [
            {
              name: "承租方统一社会信用代码",
              key: "lesseeCreditCode"
            },
            {
              name: "承租方企业名称",
              key: "lessee"
            },
            {
              name: "不动产权证号",
              key: "realPropertyNumber"
            },
            {
              name: "出租用地面积（亩）",
              key: "areaOfOutLand"
            },
            {
              name: "土地坐落",
              key: "landLocated"
            },
            {
              name: "租期起",
              key: "rentBegin"
            },
            {
              name: "租期止",
              key: "rentEnd"
            },
            {
              name: "承租方联系方式",
              key: "lesseeTel"
            },
            {
              name: "年实际用水量（万立方米）",
              key: "waterTotal"
            },
            {
              name: "年实际用电量（万千瓦时）",
              key: "electricityTotal"
            }
          ]
        },
        {
          title: "其他土地",
          children: [
            {
              name: "用地性质",
              key: "landType"
            },
            {
              name: "其他用地面积（亩）",
              key: "otherLand"
            },
            {
              name: "土地坐落",
              key: "landLocated"
            },
            {
              name: "备注",
              key: "remark"
            }
          ]
        },
        {
          title: "经营数据",
          children: [
            {
              name: "规下企业主营业务收入（万元）",
              key: "mainServiceIncome"
            },
            {
              name: "应税销售收入（万元）",
              key: "taxableSaleIncome"
            },
            {
              name: "利润总额（万元）",
              key: "totalProfit"
            },
            {
              name: "固定资产投资（万元）",
              key: "fixedAssetsInvestment"
            }
          ]
        },
        {
          title: "税务数据",
          children: [
            {
              name: "税收实际贡献（万元）",
              key: "taxRevenue"
            },
            {
              name: "增值税（万元）",
              key: "incrementTax"
            },
            {
              name: "增值税净入库数（万元）",
              key: "incrementTax"
            },
            {
              name: "出口企业“免抵”税额（万元）",
              key: "exportTax"
            },
            {
              name: "增值税先征后退（福利企业）（万元）",
              key: "retreatInAdvanceTax"
            },
            {
              name: "增值税即征即退（资源综合利用）（万元）",
              key: "immediateWithdrawalTax"
            },
            {
              name: "房产税（万元）",
              key: "personTax"
            },
            {
              name: "城镇土地使用税（万元）",
              key: "cityLandTax"
            },
            {
              name: "车船税（万元）",
              key: "carTax"
            },
            {
              name: "土地增值税（万元）",
              key: "landIncrementTax"
            },
            {
              name: "印花税（万元）",
              key: "yhTax"
            },
            {
              name: "城市维护建设税（万元）",
              key: "cswhTax"
            },
            {
              name: "资源税（万元）",
              key: "resourceTax"
            },
            {
              name: "教育费附加（万元）",
              key: "jyfj"
            },
            {
              name: "地方教育附加（万元）",
              key: "placeJyfj"
            },
            {
              name: "环境保护税（万元）",
              key: "hjbhTax"
            }
          ]
        },
        {
          title: "统计数据",
          children: [
            {
              name: "工业产值（万元）",
              key: "industryValue"
            },
            {
              name: "工业增加值（万元）",
              key: "industryAddValue"
            },
            {
              name: "研发经费支出（万元）",
              key: "researchMoney"
            },
            {
              name: "年平均职工人数（人/年）",
              key: "yearAverageWorker"
            },
            {
              name: "规上企业主营业务收入（万元）",
              key: "upRuleIncome"
            },
            {
              name: "综合能耗（吨标煤）",
              key: "allEnergyConsume"
            },
            {
              name: "原煤（吨）",
              key: "coalTotal"
            },
            {
              name: "蒸汽（百万千焦）",
              key: "streamTotal"
            },
            {
              name: "天然气（万立方米）",
              key: "naturalGasTotal"
            }
          ]
        },
        {
          title: "排污权",
          children: [
            {
              name: "化学需氧量排污权（吨）",
              key: "needOxygenRight"
            },
            {
              name: "二氧化硫排污权（吨）",
              key: "sulfurDioxideRight"
            },
            {
              name: "氨氮排污权（吨）",
              key: "ammoniaNitrogenRight"
            },
            {
              name: "氮氧化物排污权（吨）",
              key: "nitrogenOxidesRiight"
            }
          ]
        },
        {
          title: "排放量",
          children: [
            {
              name: "化学需氧量排放量（吨）",
              key: "needOxygenDischarge"
            },
            {
              name: "二氧化硫排放量（吨）",
              key: "sulfurDioxideDischarge"
            },
            {
              name: "氨氮排放量（吨）	",
              key: "ammoniaNitrogenDischarge"
            },
            {
              name: "氮氧化物排放量（吨）",
              key: "nitrogenOxidesDischarge"
            }
          ]
        }
      ],
      tableArr1: [
        {
          waterMeterName: "",
          waterMeterNumber: "",
          waterConsumption: "",
          selfExtractingWater: ""
        }
       
      ],
       tableArr2: [
        {
          ammeterName: "",
          ammeterNum: "",
          electricityConsumption: "",
        }
      ],
      // creditCode: "",
      listArr: {},
      manageData: {},
      landData: {},
      rentInLand: {},
      rentOutLand: {},
      otherLand: {},
      taxData: {},
      staticsData: {},
      environmentData: {}
    };
  },
  mounted() {
    this.getYear();
  },
  methods: {
    entPosition(years) {
      let params = {
        creditCode: this.creditCodes,
        dataYear: years
      };
      inter.showManagementData(params).then(res => {
        if (res.code === "0000") {
        }
      });
      inter.showLandData(params).then(res => {
        if (res.code === "0000") {
          this.landData = res.data.landData[0] || {};
          this.rentInLand = res.data.rentInLand[0] || {};
          this.rentOutLand = res.data.rentOutLand[0] || {};
          this.otherLand = res.data.otherLand[0] || {};
        }
      });
      inter.showTaxData(params).then(res => {
        if (res.code === "0000") {
          this.taxData = res.data;
        }
      });
      inter.staticsData(params).then(res => {
        if (res.code === "0000") {
          this.staticsData = res.data;
        }
      });
      inter.showWaterData(params).then(res => {
        if (res.code === "0000") {
          let a = document.querySelectorAll(".water");
          let div = document.createElement("div");
          div.setAttribute("class", "tables");
          div.innerHTML = ` <span class="th">
                      <span class="border">自取水（万立方米）</span>
                    </span>
                    <span class="td">
                      <span class="border">${
                        this.tableArr1[0].selfExtractingWater
                      }</span>
                    </span>`;
          a[a.length - 1].appendChild(div);
        }
      });
      inter.showElectricData(params).then(res => {
        if (res.code === "0000") {
        }
      });
      inter
        .showEnvironmentData(params)
        .then(res => {
          if (res.code === "0000") {
            this.environmentData = res.data || {};
          }
        })
        .then(() => {
          this.listArr = Object.assign(
            {},
            this.manageData,
            this.landData,
            this.rentInLand,
            this.rentOutLand,
            this.otherLand,
            this.taxData,
            this.staticsData,
            this.environmentData
          );
          for (let i = 0; i < this.$refs.keyValue.length; i++) {
            let name = this.$refs.keyValue[i].dataset.num;
            let htmls = document.getElementsByName(name);
            for (let i = 0; i < htmls.length; i++) {
              if (this.listArr[name]) {
                htmls[i].innerText = this.listArr[name];
              }
            }
          }
        });
    },
    getYear() {
      inter.showYear().then(res => {
        if (res.code === "0000") {
         this.dataYear = res.data || new Date().getFullYear();
        return this.dataYear
        }
      }).then((res)=>{
          this.entPosition(res);
      });
    }
  },
  watch: {
    // creditCodes(newV, oldV) {
    //   this.getYear();
    // }
  }
};
</script>
<style lang="less">
</style>

