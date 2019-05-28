<template>
  <BasePage>
    <div class="feedDetail">
      <div class="header">
        <div class="name">
          <i class="iconfont icon-qiyetubiaox"></i>
          {{listData.companyName}}
        </div>
        <div class="labels-outer">
          <span>{{listData.problemTypeName}}</span>
        </div>
      </div>
      <p>
        <span>联系人：{{listData.linkman}}</span>
        <span>联系方式：{{listData.mobile}}</span>
      </p>
      <p>
        <span>问题描述：{{listData.problemContent}}</span>
      </p>
      <div class="problem-process">
        <div v-for="(flow,index) in listData.recordDtoList" :key="index" class="lists">
          <div class="problem-process-item">
            <div class="left">
              <span class="line-v"></span>
              <span class="line-h"></span>
              <span class="stepNumber">{{index + 1}}</span>
            </div>
            <div class="right">
              <div class="item-content">
                <div class="item-content-top">
                  <span class="departmentName">{{flow.handlerName}}</span>
                  <span class="line-h"></span>
                  <span class="question-type">{{flow.handlerStatusStr}}</span>
                </div>
                <div class="item-content-bottom">
                  <div class="problem-reslove-suggestion">{{flow.content}}</div>
                  <div class="problem-reslove-time">{{flow.changeTime==null?'':flow.changeTime}}</div>
                </div>
                <div class="box-opinion-wrapper">{{flow.boxOpinion}}</div>
              </div>
            </div>
            <div
              id="id-div-rate-wrapper"
              v-if="listData.showFiveStarAssess === true && listData.problemStatus === 5"
            >
              <div id="id-div-rate">
                <label
                  class="control-label"
                >{{listData.fiveStarAssess==null?'请对我们的服务做出评价':'对我们服务的评价结果'}}</label>
                <div class="star">
                  <i
                    class="iconfont icon-wuxing"
                    :class="{'actives':classMap[count-1]==count,'no_click':listData.fiveStarAssess!==null}"
                    v-for="count in 5"
                    :key="count+'q'"
                    @click="ratingStars(count,listData.fiveStarAssess)"
                  ></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="ys-back-btn" @click="back"></div>
    
    </div>
  </BasePage>
</template>

<script>
import * as inter from "@api/bussiness.js";
import BasePage from "@/components/BasePage";
// import * as url from "@/common/utils/util.js"; //跳转路径
export default {
  components: {
    BasePage
  },
  data() {
    return {
      listData: [],
      problemId: location.search.split("=")[1],
      classMap: []
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      inter.problemDetail({ problemId: this.problemId }).then(response => {
        if (response.code == "0000") {
          this.listData = response.data;
          let len = response.data.fiveStarAssess;
          for (let i = 0; i < len; i++) {
            this.classMap.push(i + 1);
          }
        }
      });
    },
    ratingStars(numberOfStars, ratingStars) {
      if (ratingStars !== null) {
        return;
      }
      let params = {
        problemId: this.problemId,
        starLevel: numberOfStars
      };
      inter.starComment(params).then(response => {
        if (response.code == "0000") {
          this.$message.success(response.msg);
        }
      });
    },
    back(){
       window.history.go(-1)
    }
  }
};
</script>
<style lang="less" scoped>
@import "./less/feedBackDetail.less";
</style>
<style lang="less">
</style>


