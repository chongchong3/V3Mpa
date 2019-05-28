<template>
    <div id="declarationPageOuter">
        <div class="search-outer">
            <i 
                class="iconfont icon-sousuo"
                @click="_getData"
                aria-hidden="true"></i>
            <input 
                type="text" 
                name="search"
                v-model="data.title"
                placeholder="请输入标题关键词"/>
        </div>
            <van-list
                v-model="loading"
                :finished="finished"
                class="policy-outer"
                finished-text="没有更多了"
                @load="_getData"
            >
                <van-cell
                    v-for="(item,index) in list"
                    class="policy-item"
                    @click="gotoDetails(item.id)"
                    :key="index"
                    >

                    <div class="policy-item-title">
                        {{item.title}}
                    </div>
                    <div class="policy-item-depart-date">
                    <span class="dpt">
                        起止日期：
                    </span>
                        <span class="date" >
                       {{item.createTime}}
                    </span>
                    </div>
                    
                </van-cell>    
            </van-list>
     
    </div>
</template>
<script>
    
import {getDeclareResultList} from '@api/h5/declaration'
import "@/assets/font/iconfont.css";
// import * as urlUtil from '@/common/utils/util';
import { Toast } from 'vant';

export default{
    data(){
        return {
            data:{
                title:'',
                pageNum: 1,
                pageSize: 10,  
            },
            dataList:[],
            loading: false,//是否处于加载状态
            finished: false,//是否已加载完所有数据
            totalRecord:0,
            totalPage:0,
            list:[],
        }
    },
    created(){
        // this._getData();
    },
    methods:{
        _getData(){
            getDeclareResultList(this.data).then(res=>{
                if(res.code=='0000'){
                    this.dataList=res.data.results || [];
                    this.totalRecord=res.data.totalRecord;
                    this.totalPage=res.data.totalPage;
                    if(this.dataList.length == 0){
                        // Toast('无数据');
                        this.loading = false;
                        this.finished = true;

                    }else{
                        setTimeout(() => {
                            this.list = this.data.pageNum === 1 ? this.dataList : this.list.concat(this.dataList);
                            this.loading = false;
                            if (this.dataList.length < this.list) {

                                this.finished = true;
                                // Toast('加载完成');
                            } else {
                                // Toast('查询成功');
                            }
                            this.data.pageNum++;

                        },500)
                    }


                }
            })
        },
        gotoDetails(id){
            this.$router.push({
                name: 'declarationDetail',
                query: {
                    id
                }
            });
            // urlUtil.gotoH5URL(`declarationDetail.html?id=${id}`) 
        },
    },
    mounted(){
        
    }
}
</script>
<style lang="less">
@import "../../less/declaration.less";    
    
// less已使用px2rem，直接使用375适配的px就行
</style>