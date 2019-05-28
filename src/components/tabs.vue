<template>
  <div class="tab_content">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane v-for="item in tabName" :key="item.label" :label="item.label" :name="item.name"></el-tab-pane>
    </el-tabs>
    <Operate v-if="tabName[0]?labName==tabName[0].label:false" :creditCodes="creditCode"></Operate>
    <FeedBack v-if="tabName[1]?labName==tabName[1].label:false" :creditCodes="creditCode"></FeedBack>
    <RelateSpectrum v-if="tabName[2]?labName==tabName[2].label:false"></RelateSpectrum>
    <ProfileSpectrum v-show="tabName[3]?labName==tabName[3].label:false"></ProfileSpectrum>
    <FinalProfile  v-if="tabName[4]?labName==tabName[4].label:false"></FinalProfile>
    <IntellctualRight  v-if="tabName[5]?labName==tabName[5].label:false"></IntellctualRight>
    <IntellctualManage v-if="tabName[6]?labName==tabName[6].label:false">></IntellctualManage>
    <JudicialLitigation  v-if="tabName[7]?labName==tabName[7].label:false">></JudicialLitigation>
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
      labName:'经营情况',
    };
  },
  mounted() {
  },
  methods: {
    handleClick(tab, event) {
        this.labName=tab.label
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

