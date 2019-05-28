<template>
    <div class="wrapper">
        <div class="main">
            <van-field
                v-model="entName"
                readonly
                clearable
                label="企业名称:"               
                placeholder="请输入企业名称"  
                
            />
            <van-cell title="问题类型:" is-link value="请输入文本类型"  @click="show=true" v-model="type"/>
            <van-popup v-model="show" position="bottom" :overlay="true">
                <van-picker
                    show-toolbar
                    title="请选择"
                    :columns="columns"
                    @cancel="onCancel"
                    @confirm="onConfirm"
                />
            </van-popup>
            
            <van-field
                v-model="contact"
                clearable
                label="联系人:"              
                placeholder="请输入联系人"               
            />
            <van-field
                v-model="phone"
                clearable
                label="联系电话:"
                placeholder="请输入联系电话"

            />       

            
        </div>
        <div class="container">
            <div class="descript">企业描述：</div>
            <van-field 
                v-model="contents" 
                placeholder="请输入内容" 
                type="textarea"                
                autosize
                rows="10"
            />
        </div>
        <div class="sectionFooter">
            <button id="buttonCancel" @click="onCancelBtn">取消</button>
            <button id="buttonEnsure" @click="onConfirmBtn">确定</button>
        </div>
    </div>
    
</template>
<script>
import {getEntDetails,problemTypeList,policyLaunch} from '@api/h5/policyConsultation';
import { getUrlParam } from "@/common/utils/index";
import { Toast } from 'vant';
export default{
    data(){
        return {            
           entName:'',
           columns:[],//问题类型筛选
           questionType:'',
           contact:'',//联系人
           phone:'',
           contents:'',//企业描述
           id:'',
           account:'',
           show: false,
           type:'请输入问题类型',//问题类型筛选显示文字
           
        }
    },
    components:{

    },
    mounted(){
        this._getCompany();//获取企业名称和统代的;
        this.setupQuestionType();//问题类型
    },
    methods:{
        _getCompany(){
            getEntDetails().then(res=>{
                let {code ,msg , data} = res;
                if(code == '0000'){
                    this.creditCode = data.creditCode;
                    this.entName = data.entName;                    

                }else{

                }
            })
        },
        setupQuestionType(){
            problemTypeList().then(response=>{
                if (response.code === '0000') {                 
                    this.columns = response.data.map((item,index)=>{
                       return {
                            text:item.name,
                            id:item.id
                        }
                    })                  
                    //苹果手机键盘呼出禁掉 
                }
            })
        },
        onConfirm(value, index) {
            this.show=false;            
            this.questionType = value.id;
            this.type=value.text;
            console.log(this.questionType,this.type)
        },
        onCancel() {
            this.show=false;
        },
        onConfirmBtn(){
           
            this.getJudge() && this.getSuccess();
        },
        getJudge(){
           
            let reg =/^1[3456789][0-9]{9}$/;
            if(this.entName ==''){
                Toast('请输入企业名称');            
                return false
            }else if(this.questionType ==''){
                Toast('请选择问题类型');             
                return false
            }else if(this.contact ==''){
                Toast('请输入联系人');            
                return false
            }else if(this.phone ==''){
                Toast('请输入联系电话');               
                return false
            } else if(!reg.test(this.phone)){
                Toast('手机号不正确');               
                return false
            }else if(this.contents ==''){
                Toast('请输入企业描述');        
                return false
            }
            return true
        },
        getSuccess(){       
            let that = this;
            this.account = getUrlParam("account");
            this.id=getUrlParam("id");           
            let data = {
                    companyName:this.entName,
                    creditCode:this.creditCode,
                    linkman:this.contact,//联系人
                    mobile:this.phone,//联系电话
                    problemTypeId:this.questionType,//问题类型id
                    problemContent:this.contents,//问题描述
                    account:this.account//用户
            };
            policyLaunch(data).then(res=>{
                let {code ,msg} = res;
                if(code == '0000'){
                    Toast(msg);
                    setTimeout(function () {
                        // gotoH5URL('policyLibraryDetail.html?id='+that.id);
                        that.$router.push({
                            name: 'policyLibraryDetail',
                            query: {
                                id:that.id
                            }
                        })
                    },3000)

                }else{
                    Toast(msg);
                }
            })
        },
        onCancelBtn(){
            this.id=getUrlParam("id");           
            // gotoH5URL('policyLibraryDetail.html?id='+this.id);
            this.$router.push({
                name: 'policyLibraryDetail',
                query:{
                    id:this.id
                }
            })
        }
    
    }
}
</script>
<style lang="less" >
// less已使用px2rem，直接使用375适配的px就行
    .wrapper{
        background-color:#F2F4F7;
        min-height: 100vh;
        padding:10px 10px;        
        position: relative;
        font-size: 14px;
        .main{
            background-color: white;            
        }
        .container{            
            margin:10px 0;            
            background-color:white;
            .descript{
                padding:10px 10px 0 12px;
            }
        }
        .sectionFooter {
            display: flex;
            position: absolute;
            margin-left: -10px;
            bottom: 0;
            height: 48px;
            width: 100%;
            #buttonCancel,
            #buttonEnsure {
                width: 50%;
                outline: none;
                border: none;
                font-size: 16px;
                font-weight: 500;
            }
            #buttonCancel {
                color: #131313;
                background: white;
            }
            #buttonEnsure {
                color: white;
                background: #1492FF;
            }
        }
       
        
    }
.van-cell:not(:last-child)::after {
    border-bottom: 1px solid #e5e5e5 ;
}
.van-cell__title{
    max-width: 3rem
}
.van-cell__value{
    text-align: left;
}
.van-field__label {    
    max-width: 3rem   
}

</style>