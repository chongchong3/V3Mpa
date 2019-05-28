<template>
  <div class="tab_content">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane v-for="item in tabName" :key="item.label" :label="item.label" :name="item.name">          
      </el-tab-pane>
    </el-tabs>
      <component v-bind:is="currentTabComponent" :creditCodes="creditCode"></component>
  </div>
</template>
<script>
import Operate from "@/components/business/operate";
import FeedBack from "@/components/business/feedBack";
import RelateSpectrum from "@/components/business/relateSpectrum";
import ProfileSpectrum from "@/components/business/profileSpectrum";
import FinalProfile from "@/components/business/finalProfile";
import IntellctualRight from "@/components/business/intellctualRight";
import IntellctualManage from "@/components/business/intellctualManage";
import JudicialLitigation from "@/components/business/judicialLitigation";
export default {    
  props: {
    tabName:{
        type:Array,
        default:[]
    },
    creditCode:{
        type:String,
        default:''
    }
  },
  data() {
    return {
        activeName: "0",
        labName: '', 
        currentTabComponent:'',
    };
  },
  mounted() {
      this.labName = this.tabName[0].label;
      this.renderComponent();
  },
  methods: {
      handleClick(tab, event) {
          if (this.labName === tab.label) return;
          this.labName = tab.label;
          this.activeName = tab.name;
          this.renderComponent();
      },
      renderComponent() {          
          const label = this.labName;
          if (label === '经营情况') {
              this.currentTabComponent = Operate;
          } else if (label === '工商登记信息') {
              this.currentTabComponent = IntellctualManage;
          } else if (label === '关系图谱') {
              this.currentTabComponent = RelateSpectrum;
          } else if (label === '持股人图谱') {
              this.currentTabComponent = ProfileSpectrum;
          } else if (label === '最终持股人') {
              this.currentTabComponent = FinalProfile;
          } else if (label === '知识产权') {
              this.currentTabComponent = IntellctualRight;
          } else if (label === '司法诉讼') {
              this.currentTabComponent = JudicialLitigation;
          } else if (label === '问题反馈') {
              this.currentTabComponent = FeedBack;
          }
      }
  },
  components: {
    Operate,
    FeedBack,
    RelateSpectrum,
    ProfileSpectrum,
    FinalProfile,
    IntellctualRight,
    IntellctualManage,
    JudicialLitigation
  },
  watch: {
    creditCode(newV,oldV) {
    //  console.log(this.creditCode,'21')
    } 
  }
}
    
</script>
<style lang="less" scoped>
.tab_content{
    background: #fff;
    margin-top: 10px;
    padding: 10px;
}
</style>

