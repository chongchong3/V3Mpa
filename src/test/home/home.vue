<template>
<div id="app">
  <el-row>
  <el-button>默认按钮</el-button>
  <el-button type="primary" @click="login">主要按钮</el-button>
  <el-button type="success" @click="findByPage">成功按钮</el-button>
  <el-button type="info">信息按钮</el-button>
  <el-button type="warning">警告按钮</el-button>
  <el-button type="danger">危险按钮</el-button>
</el-row>
</div>
</template>
<script>
import {login,findByPage} from "../../common/interface/interface.js"
export default{
    data(){
        return {

        }
    },
    components:{

    },
    methods:{
      login:function(){
        login({
            username:'admin',
            password:'123456',
            source:1,//政务端1
        }).then(res=>{
            localStorage.setItem('token',res.data.token.token);
        })
      },
      findByPage:function(){
          findByPage({
              pageSize: 10,
              pageNum: 1
              }).then(res=>{
                console.log(res)
              },err=>{
                console.log(err);
              })
      }
    },
    mounted(){
      console.error('something is missing !')
    }
}
</script>
<style>
</style>
