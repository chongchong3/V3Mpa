<template>
  <BasePage>
    <section>
      <!-- <div class="wrapper"> 是列表用这个 -->
      <!-- HTML内容 -->
      <div class="main_box">
        <div class="main_box_center">
          <div class="back">
            <div class="btn_class" @click="goBack"></div>
          </div>
          <div class="main_box_table">
            <div class="table_header">
              <div class="title">
                <span></span>账号设置
              </div>
            </div>
            <div class="table">
              <div class="changPsd" @click="dialogVisible=true">修改></div>
              <div class="change_num" @click="diaChangNum=true">修改></div>
              <div class="table-list" v-for="litm in list" :key="litm.id">
                <div class="name">{{litm.name}}</div>
                <!-- <div class="text">{{textData[litm.text]}}</div> -->
                <div class="text">{{setdata[litm.key]}}</div>
              </div>
            </div>
          </div>
        </div>
        <el-dialog title="修改密码" :visible.sync="dialogVisible" width="30%">
          <div class="inputOuter">
            <span class="is-must">* 新密码</span>
            <el-input v-model="input" placeholder="请输入新密码"></el-input>
          </div>
          <div class="inputOuter">
            <span class="is-must">* 确认新密码</span>
            <el-input v-model="input1" placeholder="请再次输入新密码"></el-input>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="editPass">确 定</el-button>
          </span>
        </el-dialog>

        <el-dialog title="修改电话" :visible.sync="diaChangNum" width="30%">
          <div class="inpotOuter">
            <span class="is-must">* 输入新号码</span>
            <el-input v-model="input_num" placeholder="请输入新号码"></el-input>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="diaChangNum=false">取消</el-button>
            <el-button type="primary" @click="editNum">确定</el-button>
          </span>
        </el-dialog>
      </div>
    </section>
  </BasePage>
</template>

<script>
import BasePage from "@/components/BasePage";

import { userCenter, modifyMyPwd, modifyByPhone } from "@api/ent/companycenter";
// import * as goUrl from "@/common/utils/util.js"; //跳转路径
export default {
  data() {
    return {
      input: "",
      input1: "",
      input_num: "",
      setdata: [],
      listData: [],
      diaChangNum: false,
      dialogVisible: false,
      list: [
        { name: "账号", key: "username" },
        { name: "密码", key: "pwd" },
        { name: "手机号", key: "mobile" },
        { name: "角色", key: "roleName" },
        { name: "职位", key: "position" },
        { name: "单位名称", key: "entname" },
        { name: "单位级别", key: "unitLevel" }
      ],
      check: false
    };
  },
  created() {
    this._pageInit();
  },
  methods: {
    _pageInit() {
      userCenter().then(res => {
        let that = this;
        let datas = res.data;
        this.setdata = res.data;

        if (res.data.unitLevel == 2) {
          this.list.push({ name: "乡镇街道", key: "town" });
        } else if (res.data.unitLevel == 3) {
          this.list.push({ name: "统一社会信用代码", key: "creditCode" });
        }

        let bodyContent = this.list
          .map(function(v) {
            if (v.key === "unitLevel") {
              datas[v.key] = that._toUnitLevel(datas[v.key]);
            }
            that.listData.push(v);
          })
          .join(" ");
      });
    },

    _toUnitLevel(num) {
      switch (num) {
        case 1:
          return "县级";
        case 2:
          return "乡镇、街道、经济开发区";
        case 3:
          return "企业";
        default:
          return "-";
      }
    },

    //修改电话号码
    editNum() {
      modifyByPhone({ mobile: this.input_num }).then(res => {
        if ((res.code = "0000")) {
          this.$message.success("号码修改成功");
          this.diaChangNu = false;
        } else {
          this.$message.error(res.msg);
        }
      });
    },

    //修改密码
    editPass() {
      this.checkInput();
      if (!this.check) {
        return;
      }
      modifyMyPwd({ pwd: this.input, againpwd: this.input1 }).then(res => {
        if (res.code == "0000") {
          this.$message.success("密码重置成功");
          this.dialogVisible = false;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    checkInput() {
      if (!this.input || this.input1.length === 0) {
        this.$message.warning("请输入新密码");
        return;
      }
      if (!this.input || this.input1.length === 0) {
        this.$message.warning("请再次输入新密码");
        return;
      }
      if (this.input != this.input1) {
        this.$message.warning("两次密码不一致");
        return;
      }
      this.check = true;
    },

    goBack() {
      history.back(-1);
    }
  },
  components: {
    BasePage
  }
};
</script>

<style lang="less" scoped>
// @import "../../common/reset.less";
// @import "./less/companycenter.less";
.inputOuter {
  width: 60%;
  margin: 20px auto;
}
html{
    height: 100%;
}
body{
    height: 100%;
    width: 0;
}
.main_box{
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .main_box_center{
        display: flex;
        justify-content: space-between;
        height: 500px;
        width: 1200px;
        align-items: center;
        .back{
            width: 350px;
            .btn_class{
                width: 63px;
                height: 63px;
                margin: 0 auto;
                background: url("~@/assets/back-btn.png") no-repeat center/cover;
            }
        }
        .main_box_table{
            width: 1045px;
            height: 470px;
            border-radius: 3px;
            border: 1px solid #ddd;
            padding: 30px 0 0 100px;
            .table_header{
                width: 560px;
                height: 40px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .title{
                    display: flex;
                    align-items: center;
                    span{
                        display: inline-block;
                        width: 5px;
                        height: 16px;
                        background: #5f7cE8;
                        margin-right: 12px;
                    }                   
                }
               
            }
            .table{
                margin-top: 15px;
                position: relative;
                .changPsd{             
                    width: 46px;
                    position: absolute;
                    top: 37px;
                    right: 300px;
                    color: #999;
                    cursor: pointer
                }
                .change_num{
                    width: 46px;
                    position: absolute;
                    top: 67px;
                    right: 300px;
                    color: #999;
                    cursor: pointer;
                }
                .table-list{
                    display: flex;
                    .name{
                        height: 30px;
                        line-height: 30px;
                        width: 258px;
                        text-align: center;
                        border: 1px solid #ddd;
                        border-bottom: none;
                        border-right: none;
                        background: #F5F5F5;
                        color: #999;
                    }

                    .text{
                        height: 30px;
                        line-height: 30px;
                        width: 258px;
                        text-align: center;
                        border: 1px solid #ddd;
                        border-bottom: none
                    }
                    &:last-child >div{
                        border-bottom: 1px solid #ddd;
                      }
                }
                
            }
        }
    }
}
</style>