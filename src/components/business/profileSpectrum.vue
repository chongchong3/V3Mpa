<template>
  <div class="contentlist visible" data-name="持股人图谱">
    <div id="shareholdertupu">
      <div id="sshareholding" style="width: 100%; height: 100%;">
        <!-- Dialog div -->
        <div class="ush-div ush-container"></div>
        <span class="ush-div ush-close glyphicon glyphicon-remove"></span>
        <div class="ush-div ush-content">
          <div class="results-body" style="overflow-y: scroll;background:#fff"></div>
          <div class="main-container no-results-panel hidden">
            <div class="row no-results-body text-center">
              <img class="no-results-img" src="../../../static/plugins/stoHolder/images/zanwu.png">
              <div class="no-results-text">该公司股东数据暂未收集完整，无法准确计算最大持股人。</div>
            </div>
          </div>
        </div>
        <!-- Page contents -->
        <div style="position:absolute;z-index: 1;">
          <div style="position: relative;">
            <div
              id="gsname"
              style="font-size:35px;font-weight:bold;margin-bottom:20px;float: left; display:none"
            ></div>
            <div class="big-title-info">
              <span class="big-title"></span>
              <div class="div-nav"></div>
            </div>
          </div>
        </div>
        <div
          style="position: absolute;top: 150px;z-index: 1;right: 40px;width: 380px; display: none"
        >
          <div class="tool-header">
            <div class="tool-menu" style="box-shadow: 5px 3px 9px #ddd;">
              <ul class="nav nav-tabs">
                <li class="active" data-contenttab="tab_content1">
                  <div>
                    <span>持股人</span>
                    <i class="icon-ys"></i>
                  </div>
                </li>
                <li class="ush">
                  <span>最终持股人</span>
                  <i class="icon-ys hidden"></i>
                </li>
                <li class="last" data-contenttab="tab_content3">
                  <span>风险</span>
                  <i class="icon-ys"></i>
                </li>
              </ul>
            </div>
            <div class="tool-right" style="box-shadow: 5px 3px 9px #ddd;">
              <div class="tool-report" title="导出持股人数据"></div>
              <div class="tool-downImg" title="截取并保存当前持股展示"></div>
            </div>
            <div class="clearfix"></div>
          </div>
          <div
            class="tool-body"
            style="box-shadow: 5px 3px 9px #ddd;padding-top: 0;position: relative;"
          >
            <div style="height: 30px;width: 315px;position: absolute;">
              <img
                id="closebtn"
                style="float: right;margin-top: 8px;cursor: pointer"
                src="../../../static/plugins/stoHolder/images/qx.png"
                alt
              >
            </div>
            <div
              id="tab_content1"
              class="tool-body-item active"
              style="width: 300px;margin-top: 20px;"
            >
              <div class="range-div">
                <div class="range-left">
                  <span class="range-text range-text-1">持股：</span>
                  <div class="range-text range-text-2 range-text-small">
                    <span id="defuse_point" class="hidden">0%</span>
                  </div>
                </div>
                <div class="range-right">
                  <input type="text" id="range" value name="range" style="display:none;">
                  <div class="range-text">
                    <span class="range-text-point range-text-small">0</span>
                    <span></span>
                    <span class="range-defuse range-text-small" id="defuse">
                      去掉持股
                      <span id="dataFrom" class="data-from">0</span>%的股东
                    </span>
                    <span class="range-text-small" style="float:right;">100%</span>
                  </div>
                </div>
                <div class="clearfix"></div>
                <div style="text-align: right;font-size: 16px;margin-top: 20px;">总股比</div>
              </div>

              <div class="accounting-div" style="overflow: visible;">
                <table class="accounting"></table>
              </div>
            </div>

            <div id="tab_content3" class="tool-body-item">
              <div class="container-no-msg">
                <img src="../../../static/plugins/stoHolder/images/noyc.png">
                <p>该功能正在完善中，敬请期待！</p>
              </div>
            </div>

            <div class="clearfix"></div>
          </div>
        </div>

        <div id="main"></div>
        <div id="divToolbar" class="div_toolbar hidden" style="display: block;">
          <div class="tool_zoom zoom-container">
            <div style="position: relative; left: 14px;" class="amap-zoomcontrol">
              <div class="amap-zoom-plus"></div>
              <div style="display: block;" class="amap-zoom-ruler">
                <div class="amap-zoom-cursor" style="top: 77.2px;"></div>
              </div>
              <div class="amap-zoom-minus"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as chartConst from '../../common/constant/constantConst'
// import * as inter from "@api/gov/entDetail";
import {enterpriseName} from "@/common/constant/constantConst.js"; //获取路径名
import * as inter from "@api/bussiness.js";
export default {
  data() {
    const chartColor =chartConst.CHARTCOLOR ;

    return {
      ecClick: false,
      chartColor: chartConst.CHARTCOLOR,
      entName:enterpriseName,
      initSH: "",
      orderNo: "",
      shareholderItemListDatas: [],
      myChart: "",
      root: "",
      //datafilter
      datafilter: 0,
      //ajax ---> response
      data: [],
      //shareholder pool
      shareholderItemObject: {},

      //shares pool
      stocksCollection: {},

      //shares pool sort
      // "stocksCollectionSortList": [],

      // all nodes
      allShareholderObject: {},

      //count
      shareholderCountObject: {},

      //count list
      repeatShareholderList: [],

      // is leaf object
      shareholderIsLeafObject: {},

      //corresponds to color
      repeatShareholderColor: {},
      allShareholderColor: {},

      //checkRepeat：
      checkRepeat: {},

      //default colors
      color:chartConst.COLOR ,

      //echarts option
      option: {
        title: {
          text: "",
          x: 40,
          y: 20
        },
        tooltip: {
          show: !1,
          enterable: true,
          formatter: function(params, ticket, callback) {
            return "-------------------------------------------------";
          }
        },
        series: [
          {
            type: "tree",
            orient: "vertical",
            nodePadding: 100,
            layerPadding: 50,
            symbol: "circle",
            roam: "move",
            symbolSize: 8,
            itemStyle: {
              normal: {
                color: "#4883b4",
                label: {
                  show: true,
                  position: "right",
                  formatter: "{b}",
                  textStyle: {
                    color: chartColor.itemFontColor, //"#000",
                    fontSize: 16
                  }
                },
                lineStyle: {
                  color: chartColor.itemLineColor, //"#ccc",
                  type: "curve"
                }
              },
              emphasis: {
                color: "#4883b4",
                label: {
                  show: false
                },
                borderWidth: 0
              }
            },
            data: [
              {
                index: "",
                name: "",
                value: "",
                symbol: "circle", //"image://marker.png",
                symbolSize: [60, 60],
                shareholdingRatio: 1,
                itemStyle: {
                  normal: {
                    color: chartColor.rootItemColor, //"#0099cc",
                    borderWidth: "3",
                    borderColor: chartColor.itemBorderColor, //"#E8E8E8",
                    label: {
                      show: true,
                      textStyle: {
                        color: chartColor.rootFontColor, // '#f00', //"#0099cc",
                        fontFamily: "MicroSoft YaHei",
                        fontSize: 16,
                        fontStyle: "normal"
                      }
                    }
                  },
                  emphasis: {
                    color: chartColor.rootItemColor, //"#0099cc",
                    borderWidth: "3",
                    borderColor: chartColor.itemBorderColor //"#E8E8E8"
                  }
                },
                children: []
              }
            ],
            rootLocation: {
              x: "50%",
              y: "80%"
            },
            direction: "inverse"
          },
          {
            type: "tree",
            roam: "move",
            rootLocation: {
              x: -1000, //minX,
              y: -1000 //ops.series[0].rootLocation.y , // 'center' | 'top' | 'bottom' | 'y%' | 0
            },
            data: [
              {
                name: "watermark",
                symbol:
                  "image://../../../../static/plugins/stoHolder/images/yslogo.png",
                clickable: !1,
                hoverable: !1,
                symbolSize: [1, 1],
                symbolRotate: 45,
                tooltip: {
                  show: !1
                },
                itemStyle: {
                  normal: {
                    label: {
                      show: !1
                    }
                  }
                },
                children: []
              }
            ]
          }
        ],
        allShareholder: []
      },
      filterOption: {}
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    //初始化option
    filterData(data, replaceText) {
      replaceText = "其他";
      if (data.children && data.children.length !== 0) {
        var childNodes = data.children;
        var isExitNodeWillReplaced = 0;
        for (var i = 0; childNodes && i < childNodes.length; i++) {
          var currentLine = childNodes[i];
          var childNode = childNodes[i].children[0];
          if (childNode.shareholdingRatio <= this.datafilter) {
            if (this.isEmpty(replaceText)) {
              childNodes.splice(i, 1);
              i--;
            } else {
              //this.changeArrowDownText(childNode.name, childNode.shareholdingRatio);
              if (isExitNodeWillReplaced != 0) {
                // exits one '其他'
                childNodes.splice(i, 1);
                i--;
              } else {
                if (
                  currentLine.cacheName === childNode.name &&
                  currentLine.cacheShareholdingRatio ===
                    childNode.shareholdingRatio
                ) {
                  currentLine.name = "-";
                }
                childNode.children = [];
                childNode.isReplacedFlag = !0; // new flag
                childNode.value = childNode.name = replaceText;
                childNode.shareholdingRatio = "0";
                childNode.symbol = "circle";
                isExitNodeWillReplaced = 1; // flag one '其他'
              }
            }
          } else {
            this.filterData(childNode);
          }
        }
      }
    },
    ajaxInitSH() {
      let params = {
        entName: this.entName,
        token: window.localStorage.getItem("token")
      };
      inter
        .queryStockholder(params)
        .then(response => {
          if (response && response.code === "0000") {
            this.orderNo = response.orderNo;
            this.initSH = response.data;
            $("#gsname").text(this.entName);
            if (!this.isEmpty(this.initSH)) {
              this.data = this.initSH.shareholderItemList;
              this.option.series[0].data[0].name = this.option.series[0].data[0].value = this.entName;
              this.root = this.entName;
              this.generateNode(this.data, "");
            } else {
              this.ajaxData(this.entName, this.orderNo);
            }
          } else {
            throw new Error(response.msg);
          }
        })
        .then(() => {
          this.addDataSyn("");
          this.postprocess();
        });
    },
    
    addDataSyn(entIndex) {
      var data = this.option.series[0].data[0];
      var count = entIndex.length / 3;
      var index = [];
      for (var i = 0; i < count; i++) {
        index.push(entIndex.substr(i * 3, 3));
      }
      for (i = 0; i < index.length; i++) {
        data = data.children[+index[i]].children[0];
      }
      if (!data.children || data.children.length === 0) {
        data.children = [];
        var childNodes = this.shareholderItemObject[entIndex];
        for (i = 0; childNodes && i < childNodes.length; i++) {
          data.children.push($.extend(true, {}, childNodes[i]));
        }
      } else {
        data.children = [];
      }
      // console.log(data.children, 3);
    },
    //generate ---> shareholderItemObject  生成树节点
    generateNode(shareholderItemList, index) {
      //ajax ---> shareholderItemList ; parentNodeId ---> target
      if (!shareholderItemList) return;
      var shareholderItemListNew = [];
      var thatIndex = index;
      this.countRepeatShareholder();
      //var root = decodeURIComponent(window.location.search.split("&")[1].substring(12)); //TODO
      var root = "你妈嗨公司";
      this.allShareholder.push(root);
      if (this.shareholderItemListDatas.indexOf(root + ",1") == -1) {
        this.shareholderItemListDatas.push(root + ",1");
      }
      for (var i = 0; i < shareholderItemList.length; i++) {
        var shareholderItem = shareholderItemList[i];
        var index = thatIndex + i;
        var shareholderItemListData = shareholderItem.name + "," + index;
        var commonName;
        if (this.allShareholder.indexOf(shareholderItem.name) != -1) {
          var flag = 0;
          for (var x = 0; x < this.shareholderItemListDatas.length; x++) {
            if (
              this.shareholderItemListDatas[x].indexOf(shareholderItem.name) !=
              -1
            ) {
              if (
                this.shareholderItemListDatas[x].split(",")[1].length >
                  index.length &&
                this.shareholderItemListDatas[x]
                  .split(",")[1]
                  .substr(0, index.length) == index
              ) {
                flag++;
                return (commonName = true);
              } else if (
                this.shareholderItemListDatas[x].split(",")[1].length <=
                  index.length &&
                this.shareholderItemListDatas[x].split(",")[1] ==
                  index.substr(
                    0,
                    this.shareholderItemListDatas[x].split(",")[1].length
                  )
              ) {
                flag++;
                commonName = true;
              }
            } else {
              commonName = false;
            }
          }
          if (flag > 0 || shareholderItem.name == root) {
            commonName = true;
          } else {
            commonName = false;
          }
        } else {
          commonName = false;
        }
        if (
          this.shareholderItemListDatas.indexOf(shareholderItemListData) == -1
        ) {
          this.shareholderItemListDatas.push(shareholderItemListData);
        }

        //递归
        this.generateNode(shareholderItem.shareholderItemList, index);

        shareholderItem = {
          index: index,
          commonName: commonName,
          value: shareholderItem.name,
          name: (function(entName) {
            if (entName && entName.length > 4) {
              var entNameList = [];
              while (entName.length)
                entNameList.push(entName.slice(0, 4)),
                  (entName = entName.slice(4));
              return entNameList.join("\n");
            }
            if (shareholderItem.served) {
              return entName + "*";
            } else {
              return entName;
            }
          })(shareholderItem.name),
          shareholdingRatio: shareholderItem.shareholdingRatio, //shareholdingRatio
          shareholderType: shareholderItem.sharedholderType,
          quoted: shareholderItem.quoted,
          served: shareholderItem.served,
          symbol: "circleMinus",
          symbolSize: [30, 30],
          clickable: !0,
          itemStyle: {
            normal: {
              borderWidth: "3",
              borderColor: this.chartColor.itemBorderColor, //"#E8E8E8",
              label: {
                show: !0,
                position: "right",
                textStyle: {
                  fontFamily: "MicroSoft YaHei",
                  fontSize: 14,
                  fontStyle: "normal"
                }
              }
            },
            emphasis: {
              borderWidth: "3",
              borderColor: this.chartColor.itemBorderColor //"#E8E8E8",
            }
          }
        };

        shareholderItem = {
          /* cache for filter data compare. not useful 4 display. */
          cacheName: shareholderItem.name,
          cacheShareholdingRatio: shareholderItem.shareholdingRatio,
          /* nomarl properties */
          name: !shareholderItem.shareholdingRatio
            ? shareholderItem.shareholdingRatio === 0
              ? "0"
              : "-"
            : shareholderItem.shareholdingRatio > 1
            ? "-"
            : (shareholderItem.shareholdingRatio * 100).toFixed(2) + "%",
          symbol: "arrowdown",
          symbolSize: [12, 12],
          tooltip: {
            show: !1
          },
          clickable: !1,
          itemStyle: {
            normal: {
              color: this.chartColor.itemCrossColor, //"#666666",
              label: {
                show: !0,
                position: "left",
                textStyle: {
                  fontFamily: "MicroSoft YaHei",
                  fontSize: 14,
                  fontStyle: "normal",
                  color: this.chartColor.itemLineLabelFontColor
                }
              }
            },
            emphasis: {
              color: this.chartColor.itemCrossColor //"#666666"
            }
          },
          lineStyle: {
            width: 2,
            color: "#E8E8E8"
          },
          children: [shareholderItem]
        };
        shareholderItemListNew.push(shareholderItem);
      }
      // console.log(shareholderItemListNew, "2");
      if (
        !this.shareholderItemObject[thatIndex] ||
        this.shareholderItemObject[thatIndex].length === 0
      )
        this.shareholderItemObject[thatIndex] = shareholderItemListNew;
    },
    //实例化函数
    fetchData() {
      this.myChart = echarts.init(document.getElementById("main"));
      new window.zoomutil({
        dom: $("#main")[0],
        chart: this.myChart
      }); // add zoomutil feature

      if (this.entName) {
        this.ajaxInitSH();
      } else {
        //余额不足
        $("#noMoneyDialog_new").modal("show"); //TODO
      }
      // click event 	add delete node
      this.myChart.on("click", this.eClick);
    },
    isEmpty(obj) {
      for (var name in obj) {
        return false;
      }
      return true;
    },
    //init ajax 请求树节点数据
    ajaxData(entName, orderNo, index) {
      let params = {
        orderNo,
        entName,
        token: window.localStorage.getItem("token")
      };
      if (this.isEmpty(this.root)) {
        this.option.series[0].data[0].name = this.option.series[0].data[0].value = this.entName;
        this.root = entName;
      }
      return inter.oneLevelStockholder(params).then(response => {
        if (response && response.code === "0000") {
            // console.log(this.data, 1);
          return this.data = response.data.shareholderItemList;
        
        } else {
          throw new Error(response.message);
        }
      });
    },
    /* echarts点击事件 */
    eClick(param) {
      if (param.data.symbol === "rectangle") return;
      if (param.data.symbol === "circleCross") {
        
        this.ajaxData(param.value, this.orderNo, param.data.index).then(res => {
           this.generateNode(res, param.data.index);
           this.addDataSyn(param.data.index);
           this.postprocess(param.value);
        });
      }
    },
    //generate ---> stocksCollection
    //param ---> option.series[0].data[0]
    countStocks(children) {
      if (!children) return;
      var parentNode = children;
      var childNodes = parentNode.children;
      // console.log(childNodes,'kk')
      for (var i = 0; i < childNodes.length; i++) {
        var childNode = childNodes[i].children[0]; //real data
        if (childNode.shareholdingRatio == "2") {
          childNode.shareholdingRatio = 2;
        } else if (children.shareholdingRatio == 2) {
          childNode.shareholdingRatio = 2;
        } else {
          childNode.shareholdingRatio =
            (!childNode.shareholdingRatio ? 0 : childNode.shareholdingRatio) *
            (!parentNode.shareholdingRatio ? 0 : parentNode.shareholdingRatio);
        }
        if (!(childNode.children && childNode.children.length > 0)) {
          if (this.stocksCollection[childNode.value]) {
            this.stocksCollection[childNode.value] =
              this.stocksCollection[childNode.value] +
              childNode.shareholdingRatio;
          } else {
            this.stocksCollection[
              childNode.value
            ] = !childNode.shareholdingRatio ? 0 : childNode.shareholdingRatio;
          }
        } else {
          this.countStocks(childNode);
        }
      }
    },
    shareholderIsLeafCount(children) {
      if (!children) return;
      var parentNode = children;
      var childNodes = parentNode.children;
      for (var i = 0; childNodes && i < childNodes.length; i++) {
        var childNode = childNodes[i].children[0];
        if (!childNode.children || childNode.children.length == 0) {
          this.shareholderIsLeafObject[childNode.value] = !0; // is leaf node
        } else {
          this.shareholderIsLeafCount(childNode);
        }
      }
    },
    shareholderCount(children) {
      if (!children) return;
      var parentNode = children;
      var childNodes = parentNode.children;
      for (var i = 0; childNodes && i < childNodes.length; i++) {
        var childNode = childNodes[i].children[0];
        this.allShareholderObject[childNode.value] = childNode; // cache current node.
        // repeat count
        if (this.shareholderCountObject[childNode.value]) {
          this.shareholderCountObject[childNode.value] =
            this.shareholderCountObject[childNode.value] + 1;
        } else {
          this.shareholderCountObject[childNode.value] = 1;
        }
        if (childNode.children && childNode.children.length > 0) {
          this.shareholderCount(childNode);
        } else {
          // is leaf node, then color cache
          !this.allShareholderColor[childNode.value] &&
            (this.allShareholderColor[
              childNode.value
            ] = this.chartColor.itemColor); // = '#0099cc');
        }
      }
    },
    //节点颜色
    generateColor() {
      var color =
        "#" +
        ("00000" + ((Math.random() * 0x1000000) << 0).toString(16)).slice(-6);
      if (this.color.indexOf(color) === -1) {
        return color;
      }
    },
    countRepeatShareholder() {
      this.allShareholder = [];
      for (var shareholder in this.shareholderCountObject) {
        this.allShareholder.push(shareholder);
        if (this.shareholderCountObject[shareholder] > 1) {
          this.repeatShareholderList.push(shareholder);
          //color corresponds to
          this.repeatShareholderColor[shareholder]
            ? ""
            : (this.allShareholderColor[
                shareholder
              ] = this.repeatShareholderColor[
                shareholder
              ] = this.generateColor());
          this.color.push(this.repeatShareholderColor[shareholder]);
        }
      }
    },
    // rectangle
    changeColor(children) {
      if (!children) return;
      var parentNode = children;
      var childNodes = parentNode.children;
      for (var i = 0; childNodes && i < childNodes.length; i++) {
        var childNode = childNodes[i].children[0];
        if (this.repeatShareholderList.indexOf(childNode.value) > -1) {
          // repeat
          childNode.itemStyle.normal.color = childNode.itemStyle.emphasis.color = this.repeatShareholderColor[
            childNode.value
          ]; //;
          //childNode.symbol = "image://marker.png";
        } else if (this.shareholderIsLeafObject[childNode.value]) {
          // leaf
          childNode.itemStyle.normal.color = childNode.itemStyle.emphasis.color = this.chartColor.itemColor; //'#0099cc';
        } else {
          childNode.itemStyle.normal.color = childNode.itemStyle.emphasis.color =
            "#dfdfdf"; //"#FFCC00";
        }
        if (childNode.shareholderType === "C") {
          if (childNode.children && childNode.children.length > 0) {
            if (!childNode.isReplacedFlag) {
              childNode.symbol = "circleMinus";
              this.changeColor(childNode);
            }
          } else {
            if (this.shareholderItemObject[childNode.index]) {
              if (!childNode.isReplacedFlag) {
                childNode.symbol = "circleCross";
              }
              if (childNode.commonName) {
                childNode.symbol = "circle";
              }
              //childNode.itemStyle.normal.color = childNode.itemStyle.emphasis.color =  "#FFCC00";
            } else {
              childNode.symbol = "circle";
            }
          }
        } else {
          childNode.symbol = "rectangle";
        }
      }
    },
    postprocess(name) {
      this.filterOption = $.extend(true, {}, this.option);
      // this.filterOption = this.option;
      this.filterData(this.filterOption.series[0].data[0]);
      var data = this.filterOption.series[0].data[0];
      this.allShareholderObject = {};
      this.stocksCollection = {};
      this.shareholderCountObject = {};
      this.shareholderIsLeafObject = {};
      this.repeatShareholderList = [];
      //stocks pool
      var newDate = $.extend(true, {}, data);
      this.countStocks(newDate); // 计算股份
      this.shareholderIsLeafCount(data);
      //repeat shareholder
      this.shareholderCount(data);
      this.countRepeatShareholder();
      //change colors for nodes whih same name
      this.changeColor(data);

      this.myChart.clear();
      this.myChart.setOption(this.filterOption);
      this.myChart.resize();
      window.myChart = this.myChart;
    }
  }
};
</script>
<style lang="less" scoped>
.contentlist {
  font-size: 12px;
  color: #666;
}
//持股人图谱
#shareholdertupu {
  height: 650px;
  #main {
    width: 1000px;
    height: 600px;
    border: 1px solid #d5dae0 !important;
    background: #fff !important;
  }
}
</style>

