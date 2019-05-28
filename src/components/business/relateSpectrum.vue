<template>
  <div class="contentlist">
    <div class="gxtupu">
      <p class="big-title"></p>
      <div class="map-container">
        <div class="tuli">
          <div class="tuli-i">
            <div
              class="tuli-i-icon"
              style="width: 20px;height:20px;background: url('/static/plugins/images/gd.png'); background-size: cover;"
            ></div>
            <span>股东</span>
          </div>
          <div class="tuli-i">
            <div
              class="tuli-i-icon"
              style="width: 20px;height:20px;background: #0AADFF; background-size: cover;"
            ></div>
            <span>企业</span>
          </div>
          <div class="tuli-i">
            <div
              class="tuli-i-icon"
              style="width: 20px;height:20px;
                                             background: rgba(0, 80, 255, 1);
                                             border:2px solid rgba(0, 80, 255, 0.5);"
            ></div>
            <span>当前节点</span>
          </div>
          <div class="tuli-i">
            <div
              class="tuli-i-icon"
              style="width: 20px;height:20px;background: url('/static/plugins/images/djg.png'); background-size: cover;"
            ></div>
            <span>董监高法</span>
          </div>
          <div class="tuli-i">
            <div
              class="tuli-i-icon"
              style="width: 20px;height:20px;background: url('/static/plugins/images/rz.png'); background-size: cover;"
            ></div>
            <span>自然人</span>
          </div>
          <div class="tuli-i">
            <div
              class="tuli-i-icon"
              style="margin-top:10px;width:20px;border-top:1px solid #3b9df4;border-radius: 0; position: relative"
            >
              <div
                style="width:0;height:0;border-width:4px 0 4px 6px;border-style:solid;border-color:transparent transparent transparent #3b9df4;margin-right: -5px; position: absolute; right:0; top: -4px"
              ></div>
            </div>
            <span>投资</span>
          </div>
          <div class="tuli-i">
            <div
              class="tuli-i-icon"
              style="margin-top:10px;width:20px;border-top:2px dotted #0eacb1; border-radius: 0;"
            ></div>
            <span>任职</span>
          </div>
        </div>
        <div class="chart" id="demo"></div>
      </div>
    </div>
    <div class="noData">
      <div class="noData-img"></div>
      <div class="noData-desc">
        <p>暂无数据</p>
        <p>Have no Data</p>
      </div>
    </div>
  </div>
</template>
<script>
// import * as goUrl from "@/common/utils/url.js"; //获取路径名
import {enterpriseName} from "@/common/constant/constantConst.js"; //获取路径名
export default {
  mounted() {
    getEntNameMap(enterpriseName);
  }
};
</script>
<style lang="less" scoped>
    //关系图谱
          .gxtupu {
            position: relative;
            background: #fff;
            border: 1px solid rgba(213, 218, 224, 1);
            box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.5) inset;
            min-height: 960px;
            .big-title {
              padding: 20px;
              color: #666;
              font-size: 16px;
              font-weight: bold;
            }
            .map-container {
              .tuli {
                width: 160px;
                position: absolute;
                bottom: 30px;
                min-height: 200px;
                padding: 10px 20px;
                left: 30px;
                border-radius: 3px;
                background-color: rgba(3, 13, 43, 0.22);
                border: 1px solid rgba(68, 255, 255, 0.29)
              }
              .tuli-i {
                display: inline-block;
                width: 110px;
                margin: 7px 0;
                text-align: left;
              }
              .tuli-i-icon {
                display: inline-block;
                margin-right: 10px;
                position: relative;
                vertical-align: top;
                border-radius: 50%;
              }
              .tuli-i span {
                display: inline-block;
                text-align: left;
                font-size: 14px;
                color: #666;
              }
              .tuli-i-title {
                line-height: 20px;
              }
              .chart {
                width: 1166px !important;
                height: 870px !important;
              }
            }
          }
          .gxtupu+.noData,#sshareholding+.noData {
            display: none;
            border: 1px solid #d5dae0;
          }
</style>

