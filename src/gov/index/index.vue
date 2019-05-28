<template>
    <div class="mainContent">
        <Header></Header>
        <div class="common-page-outer" id="indexPageOuter">
            <div class="main-body">
                <div class="title-data">
                    <div class="calendar">
                        <div class="month">{{ dates[1] }}</div>
                        <div class="day">{{ dates[2] }}</div>
                    </div>
                    <div class="text">
                        <div class="title">你好，{{ loginName }}</div>
                        <div class="date">
                            今天是{{ date.getMonth() + 1 }}月{{ dates[2] }}日
                        </div>
                    </div>
                </div>
                <div class="body-content">
                    <div
                        class="list"
                        v-for="(item, index) in urls"
                        :key="index"
                        @click="listClick(index, item)"
                    >
                        <div class="list-icon"></div>
                        <div class="list-text">
                            <div class="list-title">{{ item.name }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// @/common
import { getLocalStorage, gotoGovURL } from "@/common/utils/index";
import Header from "@/components/header";

export default {
    data() {
        return {
            urls: JSON.parse(getLocalStorage("curl")),
            loginName: getLocalStorage("username"),
            dates: [],
            date: new Date()
        };
    },
    created() {},
    mounted() {
        this.dates = this.date.toDateString().split(" ");
    },
    methods: {
        listClick(index, item) {
            //    goUrl.gotoGovURL('entFile.html')
            let child = item.child[0];
            if (item.url) {
                gotoGovURL(item.url);
            } else if (child) {
                gotoGovURL(child.url);
            } else {
                this.$message.warn("功能模块完善中，敬请期待");
            }
            // let child = this.urls[index].child[0];
            // if(child && child.type == 1){
            //     // window.location.href=child.cUrls;
            // }else if(url){
            //     // window.location.href=url;
            // }else{
            //     this.$message({
            //         message: '功能模块完善中，敬请期待',
            //         type: 'warning'
            //     });
            // }
        }
    },
    components: {
        Header
    }
};
</script>

<style lang="less">
@import "../../common/less/reset.less";
@import "../../assets/font/iconfont.css";
body{
  padding-left: 0;
  padding-top:0;
  overflow: hidden;
}
.mainContent{
  width:100%;
  height:100%;
  background: #F2F5FA url("~@/assets/index-back.png") center/cover;

}
#indexPageOuter{
  height: 100%;
  display: flex;
  justify-content: center;
  .main-body{
    width: 1100px;
    .title-data{
      display: flex;
      margin-bottom: 30px;
      margin-top:70px;
      .calendar{
        width: 64px;
        height: 57px;
        background-color: #E6E4E2;
        border-radius: 4px;
        overflow: hidden;
        text-align: center;
        .month{
          height: 21px;
          line-height: 21px;
          color: white;
          background: rgba(243, 129, 129, 1);
        }
        .day{
          height: 36px;
          line-height: 36px;
          color: #5B5144;
          font-weight: bold;
          font-size: 17px;
        }
      }
      .text{
        color: #455467;
        margin-left: 32px;
        .title{
          height: 30px;
          line-height: 30px;
          font-size: 20px;
          font-weight: bold;
        }
        .date{
          height: 22px;
          line-height: 22px;
          font-size: 14px;
        }
      }
    }
    .body-content{
      display: flex;
      flex-wrap: wrap;
      .list{
        display: flex;
        align-items: center;
        cursor: pointer;
        width: 300px;
        height: 180px;
        padding: 50px 0 50px 40px;
        margin-right:100px;
        border-radius: 8px;
        background-color: rgba(255, 255, 255, 1);
        border: 1px solid rgba(214, 221, 239, 1);
        margin-bottom: 50px;
        box-sizing: border-box;
        .list-icon{
          width: 60px;
          height: 60px;
        }
        &:nth-child(3n){
          margin-right:0;
        }
        &:nth-child(1) .list-icon{
          background: url("~@/assets/entFile.png") center/cover no-repeat;
          background-size: 60px 50px;
        }
        &:nth-child(2) .list-icon{
          background: url("~@/assets/evaluate.png") center/cover no-repeat;
        }
        &:nth-child(3) .list-icon{
          background: url("~@/assets/multi-dimensional.png") center/cover no-repeat;
          background-size: 56px 60px;
        }
        &:nth-child(4) .list-icon{
          background: url("~@/assets/data-center.png") center/cover no-repeat;
          background-size: 60px 56px;
        }
        &:nth-child(5) .list-icon{
          background: url("~@/assets/ent-report.png") center/cover no-repeat;
        }
        &:nth-child(6) .list-icon{
          background: url("~@/assets/different.png") center/cover no-repeat;
        }
        .list-text{
          margin-left: 40px;
          .list-title{
            height: 33px;
            line-height: 33px;
            color: rgba(91, 101, 127, 1);
            font-size: 20px;
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>
