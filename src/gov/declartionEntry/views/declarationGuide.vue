<template>
  <div class="declarationGuide">
    <div class="project_top">
      <h2 class="project_texts">关于浙江省贯彻实施企业惠普性税收减免政策的申报</h2>
      <div class="pro_container">
        <div class="text_first">
          <div>
            发文机关：
            <span>{{guideData.issuedOffice}}</span>
          </div>
          <div>
            申报起止日期：
            <span>{{guideData.dataTime}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="project_bottom clear">
      <div class="con_left">
        <div class="content">{{guideData.content}}</div>
        <div class="pdf_link"></div>
        <div class="files">
          <div
            class="left-link"
            v-show="item.pdf!==''"
            v-for="(item,index) in guideData.mapList"
            :key="index+'a'"
          >
            <div class="linkes">
              <i class="iconfont icon-lianjie"></i>
              {{item.pdf==null?'':item.pdf}}
            </div>
            <div class="r_download">
              <span class="preview" @click="recheckPdf(item.fileName)">预览</span>
              <span class="down" @click="downLoad(item.fileName)">下载</span>
            </div>
          </div>
        </div>
        <!--内容-->
      </div>
      <div class="con_right">
        <div class="see_text" @click="lookOriginal(guideData.associatedPolicyId)">
          <i class="iconfont icon-lianjie"></i>查看原文
        </div>
        <div class="sb_link" @click="sbLink">
          <i class="iconfont icon-xiangmushenbaoguanli"></i>项目申报
        </div>
        <div class="cont">
          <div class="qrcode_wrap">
            <img :src="qrcodeSrc" alt>
            <span style="color:#455467">扫一扫分享本页面</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as inter from "@api/gov/declartionEntry";
import QRCode from "qrcode";
export default {
  data() {
    return {
      ID: this.$route.query.id,
      guideData: {},
      qrcodeSrc: ""
    };
  },
  created() {},
  mounted() {
    this.initGuide();
    let that = this;
    QRCode.toDataURL(location.href, { width: 150, height: 150 }, function(
      error,
      str
    ) {
      if (error) console.log(error);
      that.qrcodeSrc = str;
    });
  },
  methods: {
    initGuide() {
      inter.getProjectDeclareDetail({ id: this.ID }).then(response => {
        if (response.code == "0000") {
           let reg=/<\/?.+?>/g;
          response.data.content= response.data.content.replace(reg,'')
          this.guideData = response.data;
        }
      });
    },
    // 预览pdf
    recheckPdf(fileName) {
      let params = { fileName };
      inter.previewOnHtml(params).then(response => {
        if (response.code == "0000") {
          window.open(response.data);
        }
      });
    },
    downLoad(fileName) {    
      let urls = window.location.origin;    
      window.open(`${urls}` + `/gov/selfCheck/downloadFile?ossUrl=` + fileName);
    },
    lookOriginal(associatedPolicyId) {
      sessionStorage.setItem("declarationGuide", location.href);
      //localhost:9528/gov/policylLib.html#/policyDetail?policyId=2718
      http: window.location.href =
        `${window.location.origin}/gov/policylLib.html#/policyDetail?` +
        "policyId=" +
        encodeURI(associatedPolicyId);
    },
    sbLink() {
      window.location.href = `https://link.jiandaoyun.com/f/5c998e0f314d594e66ab441c`;
    }
  }
};
</script>
<style lang="less">
</style>

<style lang="less" scoped>
@import "../less/declartionEntry";
</style>
