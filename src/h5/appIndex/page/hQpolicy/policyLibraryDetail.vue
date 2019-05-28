<template>
    <div>
        <div class="wrapper" v-if="shows">
            <div class="detail-summary">
                <div class="detail-summary-item" style="height: auto">
                    <div class="detail-summary-item-title">
                        标题
                    </div>
                    <div class="detail-summary-item-name">
                        {{toHtmlStr(hpolicyUpload.policyTitle,'-')}}
                    </div>
                </div>
                <div class="detail-summary-item">
                    <div class="detail-summary-item-title">
                        索引号
                    </div>
                    <div class="detail-summary-item-name">
                        {{toHtmlStr(hpolicyUpload.referNumber,'-')}}
                    </div>
                </div>
                <div class="detail-summary-item">
                    <div class="detail-summary-item-title">
                        发文机关
                    </div>
                    <div class="detail-summary-item-name">
                        {{toHtmlStr(hpolicyUpload.publishDepartment,'-')}}
                    </div>
                </div>
                <div class="detail-summary-item">
                    <div class="detail-summary-item-title">
                        发文字号
                    </div>
                    <div class="detail-summary-item-name">
                        {{toHtmlStr(hpolicyUpload.issuedNumber,'-')}}
                    </div>
                </div>
                <div class="detail-summary-item">
                    <div class="detail-summary-item-title">
                        政策类别
                    </div>
                    <div class="detail-summary-item-name">
                        {{toHtmlStr(hpolicyUpload.policyType,'-')}}
                    </div>
                </div>
                <div class="detail-summary-item">
                    <div class="detail-summary-item-title">
                        政策提炼
                    </div>
                    <div class="detail-summary-item-name">
                        {{toHtmlStr(hpolicyUpload.policyRefinement,'-')}}
                    </div>
                </div>
                <div class="detail-summary-item">
                    <div class="detail-summary-item-title">
                        支持对象
                    </div>
                    <div class="detail-summary-item-name">
                        {{toHtmlStr(hpolicyUpload.supportTarget,'-')}}
                    </div>
                </div>
                <div class="detail-summary-item">
                    <div class="detail-summary-item-title">
                        执行期限
                    </div>
                    <div class="detail-summary-item-name">
                        {{hpolicyUpload.startDate==null?'-':hpolicyUpload.startDate.substring(0,10)}}至{{hpolicyUpload.endDate==null?'-':hpolicyUpload.endDate.substring(0,10)}}
                    </div>
                </div>
            </div>
            <div class="policy-title-outer">
                <div class="policy-title-outer-title">
                    {{toHtmlStr(hpolicyUpload.policyTitle,'-')}}
                </div>
                <div class="policy-title-outer-date">
                    {{hpolicyUpload.updateTime}}
                </div>
            </div>
            <div class="links" v-for="(item,index) in fileNames" :key="item.id">
                <div class="link-c"  @click="goToPdf(hpolicyUpload.ossPdfUrl==null?'':hpolicyUpload.ossPdfUrl.split(',')[index])">
                    <i class="iconfont icon-lianjie" aria-hidden="true"></i> {{item.split('.')[0]}}
                </div>
            </div>
            <div class="main-body" v-html="hpolicyUpload.textContent">

            </div>
            <div class="pjt-btn" @click="toConsultation">
                <span>政策咨询</span>
            </div>

        </div>
        <div style="width: 100%;height: 100%;overflow: auto" class="iframs" v-if="!shows">
            <iframe width="100%" :src="pdf" style="overflow: scroll;overflow-x: hidden;min-height: 100vh">
            </iframe>
        </div>
    </div>
    
    
</template>
<script>
import {policyDetail} from '@api/h5/policyLibraryDetail'
import { getUrlParam, toHtmlStr } from "@/common/utils/index";
// import { getUrlParam } from "@/common/utils/url.js";
// import toHtmlStr from "@/common/utils/toHtmlStr";
import { Toast } from 'vant';
import "@/assets/font/iconfont.css";
export default{
    data(){
        return {
            id:'',
            hpolicyUpload:{},
            fileNames:[],
            toHtmlStr:toHtmlStr,
            pdf:'',//pdf预览
            shows:true,
            account:'',//政策咨询的用户        
        }
    },
    mounted(){
        this._getDetail();
    },
    methods:{
        _getDetail(){            
            this.id = getUrlParam("id")        
            let id = {
                id:this.id
            }
            policyDetail(id).then(res=>{
               let {code , data ,msg} =res;
               if(code == '0000'){
                   this.hpolicyUpload =data.hpolicyUpload;
                   this.account = data.hpolicyUpload.account;//政策咨询用到的用户
                   let name=data.hpolicyUpload.fileName;                   
                   if(name){
                       this.fileNames = name.split(',');                      
                   }else{
                       return ``
                   }              
                 
               }else{
                   Toast(msg)
               }               
            })
        },
        //pdf预览
        goToPdf(pdf){            
           this.pdf = pdf;
           this.shows=false
        },
        //政策咨询跳转
        toConsultation(){        
            // gotoH5URL('policyConsultation.html?id='+this.id+'&account='+this.account);     
            this.$router.push({
                name: 'policyConsultation',
                query: {
                    id: this.id,
                    account: this.account
                }
            })      
        }
    }
}
</script>
<style lang="less" scoped='scoped'>
// less已使用px2rem，直接使用375适配的px就行
    .wrapper{
        background-color:#F2F4F7;
        min-height: 100vh;
        padding:10px 10px;
        /*font-size: 14px;*/
        position: relative;
        .detail-summary{
          
            margin: 5px 5px 15px 5px;
            border-radius: 4px;
            background-color: rgba(255, 255, 255, 1);
            box-shadow: 0px 1px 4px 2px rgba(203, 203, 203, 0.5);
            
            &-item{
                padding:.05rem .28rem .05rem;
                display: flex;
                justify-content: space-between;
                color: rgba(16, 29, 55, 1);
                font-size: 14px;
               
                &-title{
                    
                    width: 1.6rem;
                    text-align: justify;
                    margin-right: .2rem;
                   
                }
                &-name{
                    flex: 1;
                    font-size: 13px;
                    width:60%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space:nowrap;
                }
            }
            &-item:first-child{
                padding-top: 10px;
            }
            &-item:last-child{
                padding-bottom: 10px;
            }
        }
        .policy-title-outer{         
            padding:0 0.25rem;
            margin-bottom: 10px;
            &-title{
                line-height: 30px;
                color: rgba(16, 29, 55, 1);
                font-size: 15px;
                text-align: left;
                margin-bottom: 5px;
            }
            &-date{
                line-height:20px;
                color: rgba(139, 139, 139, 1);
                font-size: 13px;
            }
        }
        .links{
            /*padding: 0 0.20rem;*/
            .link-c{
                height: 30px;
                margin-bottom: 5px;
                line-height: 30px;
                color: rgba(20, 146, 255, 1);
                font-size: 13px;
                text-indent: .20rem;
                background-color: rgba(255, 255, 255, 1);
                width:100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space:nowrap;
            }
        }
        .main-body{       
            padding: 10px 10px;        
            color: rgba(139, 139, 139, 1);
            font-size: 13px;
            text-align: justify;
            background-color: white !important;
           
            margin-bottom: 30px; 
            p{
                text-indent: 2em;
            }
           
        }
        .pjt-btn{
            position: fixed;
            left: 0px;
            bottom: 0px;
            height: 45px;
            width: 100%;
            background-color: rgba(20, 146, 255, 1);
            color: rgba(255, 255, 255, 1);
            font-size: 16px;
            line-height: 45px;
            text-align: center;

        }
    }
   
</style>