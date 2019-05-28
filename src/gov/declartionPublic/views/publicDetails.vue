<template>
  <div class="publicDetails">
        <div class="return" @click="back"></div>
        <div class="project_top">
            <h2 class="titls">{{publicData.title}}</h2>
            <!-- <div class="pro_container">
                <div class="text_first">
                <div>索引号：<span>-</span></div>
                <div>支持对象：<span>-</span></div>
                <div>政策类别：<span>财政补助</span></div>
                </div>
                <div class="text_second">
                <div>发文字号：<span>-</span></div>
                <div>发文机关：<span>-</span></div>
                <div>执行期限：<span>-</span></div>
                </div>
                <div class="text-third">
                <div>政策提炼：<span title="财政补助财政补助财政补助财">-助财政补助财政补助财政补助财政补助财政补助财政补助财政补助财政补助财政补助财政补助财政补助财政补助财政补助财政补助财政补助财政补助财政补助财政补助财政补助财政补助财政补助财政补助</span></div>
                </div>
            </div> -->
        </div>
        <div class="project_bottom clear">
            <div class="con_left">
                <div class="content">{{publicData.content}}</div>
                <div class="files" >
                    <div class="left-link" v-for="(item,index) in publicData.maplist" :key="index">
                    <div class="linkes"><i class="iconfont icon-lianjie"></i>{{item.pdf}}</div>
                    <div class="r_download"><span  @click="recheckPdf(item.fileName)">预览</span><span @click="downLoad(item.fileName)">下载</span></div>
                    </div>
                </div>
            </div>
            <div class="links"  @click="lookOriginal(publicData.associatedPolicyId)"><i class="iconfont icon-lianjie"></i>查看政策原文</div>
            <!-- <div class="con_right">
            <div class="info">有<span>2</span>条解读</div>
            <div class="text_czt">
            <div class="tit">财政厅</div>
            <div class="tit_cont">这是一条关于政策条目的解读这是一条关于政策条目的解读这是一条关于政策条目的解读这是一条关于政策条目的解读这是一条关于政策条目的解读这是一条关于政策条目的解读这是一条关于政策条目的解读这是一条关于政策条目的解读</div>
            </div>
            <div class="text_czt">
            <div class="tit">财政厅</div>
            <div class="tit_cont">这是一条关于政策条目的解读这是一条关于政策条目的解读这是一条关于政策条目的解读这是一条关于政策条目的解读这是一条关于政策条目的解读这是一条关于政策条目的解读这是一条关于政策条目的解读这是一条关于政策条目的解读</div>
            </div>
            </div> -->
        </div>
    </div>

</template>
<script>
import * as inter from "@api/gov/declartionPublic";
export default {
  data() {
    return {
      ID: this.$route.query.id,
      publicData: {},
    };
  },
  created() {},
  mounted() {
    this.initGuide();
  },
  methods: {
    initGuide() {
      inter.getDecalreResultDetail({ id: this.ID }).then(response => {
        if (response.code == "0000") {
          let reg=/<\/?.+?>/g;
          response.data.content= response.data.content.replace(reg,'')
          this.publicData = response.data;
        }
      });
    },
    // 预览pdf
    recheckPdf(fileName) {
      let params = { fileName:fileName };
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
      http: window.location.href =
        `${window.location.origin}/gov/policylLib.html#/policyDetail?` +
        "policyId=" +
        encodeURI(associatedPolicyId);
    },
    back(){
        this.$router.push({path:'/'})
    }
   
  }
};
</script>
<style lang="less" scoped>
@import "../less/declartionPublic";
</style>
