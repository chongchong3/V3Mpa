<template>
    <BasePage>
        <div id="wrapper_content">
            <div class="policydetails">
                <div class="return"></div>
                <div class="project_top">
                    <h2>{{ toHtmlStr(con.policyTitle, "-") }}</h2>
                    <div class="pro_container">
                        <div class="text_first">
                            <div>
                                索引号：<span>{{
                                    toHtmlStr(con.referNumber, "-")
                                }}</span>
                            </div>
                            <div>
                                支持对象：<span>{{
                                    toHtmlStr(con.supportTarget, "-")
                                }}</span>
                            </div>
                            <div>
                                政策类别：<span>{{
                                    toHtmlStr(con.policyType, "-")
                                }}</span>
                            </div>
                        </div>
                        <div class="text_second">
                            <div>
                                发文字号：<span>{{
                                    toHtmlStr(con.issuedNumber, "-")
                                }}</span>
                            </div>
                            <div>
                                发文机关：<span>{{
                                    toHtmlStr(con.publishDepartment, "-")
                                }}</span>
                            </div>
                            <div>
                                执行期限：<span
                                    >{{
                                        toHtmlStr(
                                            con.startDate == null
                                                ? "-"
                                                : con.startDate.substring(
                                                      0,
                                                      10
                                                  ),
                                            "-"
                                        )
                                    }}至{{
                                        toHtmlStr(
                                            con.endDate == null
                                                ? "-"
                                                : con.endDate.substring(0, 10),
                                            "-"
                                        )
                                    }}</span
                                >
                            </div>
                        </div>
                        <div class="text-third">
                            <div>
                                政策提炼：<span
                                    :title="
                                        toHtmlStr(con.policyRefinement, '-')
                                    "
                                    >{{
                                        toHtmlStr(con.policyRefinement, "-")
                                    }}</span
                                >
                            </div>
                        </div>
                    </div>
                </div>
                <div class="project_bottom clear">
                    <div class="con_left">
                        <div class="tis">
                            {{ toHtmlStr(con.policyTitle, "-") }}
                        </div>
                        <p
                            class="ptext"
                            v-html="toHtmlStr(con.textContent, '-')"
                        ></p>
                        <div class="returns">
                            <div
                                class="left-link"
                                v-for="(item, index) in fileName"
                            >
                                <div
                                    class="linkes"
                                    v-bind:data-pdf="
                                        con.ossPdfUrl == null
                                            ? ''
                                            : con.ossPdfUrl.split(',')[index]
                                    "
                                    @click="
                                        _goTo(con.ossPdfUrl.split(',')[index])
                                    "
                                >
                                    <i class="iconfont icon-lianjie"></i
                                    >{{ item.split(".")[0] }}
                                </div>
                                <div class="r_download">
                                    <span
                                        v-bind:data-pdf="
                                            con.ossPdfUrl == null
                                                ? ''
                                                : con.ossPdfUrl.split(',')[
                                                      index
                                                  ]
                                        "
                                        @click="
                                            _goTo(
                                                con.ossPdfUrl.split(',')[index]
                                            )
                                        "
                                        >预览</span
                                    ><span
                                        v-bind:data-url="
                                            con.ossUrl == null
                                                ? ''
                                                : con.ossUrl.split(',')[index]
                                        "
                                        :data-filename="item.split('.')[0]"
                                        @click="
                                            _goDown(
                                                con.ossUrl.split(',')[index],
                                                item
                                            )
                                        "
                                        >下载</span
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="con_right">
                        <div class="policy" @click="dialogVisible = true">
                            政策咨询
                        </div>
                        <div class="fa-saoyisao">
                            <div class="weixins" id="qrcode">
                                <img :src="qrcodeSrc" alt="" />
                            </div>
                            <p>扫一扫分享本页面</p>
                        </div>
                        <div class="cont" id="cont"></div>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog
            title="发起问题"
            :visible.sync="dialogVisible"
            width="600px"
            :before-close="handleClose"
        >
            <div class="containers">
                <div class="box_container">
                    <div class="entname">
                        <span>*企业名称</span>
                        <div class="name">
                            <input
                                type="text"
                                placeholder="请输入企业名称"
                                disabled
                                name="company"
                                v-model="entName"
                            />
                        </div>
                    </div>
                    <div class="tit">
                        <span>*问题类型</span>
                        <div class="name" id="questions">
                            <el-select
                                v-model="questionType"
                                placeholder="请选择"
                            >
                                <el-option
                                    v-for="item in questionList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                                >
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </div>
                <br />
                <div class="box_container">
                    <div class="entname">
                        <span>*联系人</span>
                        <div class="name">
                            <input
                                type="text"
                                placeholder="请输入联系人"
                                name="person"
                                v-model="contact"
                            />
                        </div>
                    </div>

                    <div class="tit">
                        <span>*联系电话</span>
                        <div class="name">
                            <input
                                type="text"
                                placeholder="请输入联系电话"
                                name="phone"
                                v-model="phone"
                            />
                        </div>
                    </div>
                </div>
                <br />
                <div class="box_container">
                    <div class="entname">
                        <span>*企业描述</span>
                        <div class="name">
                            <textarea
                                class="det"
                                id=""
                                cols="30"
                                rows="8"
                                placeholder="请输入内容"
                                name="detai"
                                v-model="contents"
                                style="width:440px"
                            ></textarea>
                        </div>
                    </div>
                </div>
                <div class="btns">
                    <el-button @click="handleClose">取 消</el-button>
                    <el-button type="primary" @click="submits">确 定</el-button>
                </div>
            </div>
        </el-dialog>
    </BasePage>
</template>

<script>
import BasePage from "@/components/BasePage";
import {
    policyDetail,
    problemTypeList,
    getEntDetails,
    policyLaunch
} from "@api/ent/policydetails"; //接口请求
import { getUrlParam, toHtmlStr } from "@/common/utils/index"; //query传参
import QRCode from "qrcode";

export default {
    data() {
        return {
            id: getUrlParam("id"),
            toHtmlStr: toHtmlStr,
            qrcodeSrc: "",
            con: {},
            account: "", //用户传给modal
            fileName: [],
            dialogVisible: false, //弹出框
            questionList: [], //问题类型list
            questionType: "", //问题类型参数
            entName: "", //企业名称
            creditCode: "",
            contact: "", //联系人
            phone: "", //联系电话
            contents: "" //企业描述
        };
    },
    components: {
        BasePage
    },
    mounted() {
        this._getDatailAll(); //详情
        this._getEw(); //二维码
        this._getSelQuest(); //弹出框问题类型
        this._getEntDetails(); //获取企业名称和统代的
    },
    methods: {
        _getDatailAll() {
            let data = { id: this.id };
            policyDetail(data).then(res => {
                let { code, data, msg } = res;
                if (code == "0000") {
                    this._getDetail(data); //获取详情
                } else {
                    this.$message.error(msg);
                }
            });
        },
        _getDetail(data) {
            this.con = data.hpolicyUpload;
            this.account = this.con.account;
            this.fileName = this.con.fileName
                ? this.con.fileName.split(",")
                : [];
        },
        //二维码
        _getEw() {
            let that = this;
            QRCode.toDataURL(location.href, { width: 132 }, function(
                error,
                str
            ) {
                if (error) console.log(error);
                that.qrcodeSrc = str;
            });
        },
        //pdf预览
        _goTo(pdf) {
            window.open(pdf);
        },
        //下载
        _goDown(file, name) {
            let urls = window.location.origin;
            window.open(
                `${urls}` + `/gov/selfCheck/downloadFile?ossUrl=` + file
            );
        },
        //弹出框类型
        _getSelQuest() {
            problemTypeList().then(res => {
                let { code, data, msg } = res;
                if (code == "0000") {
                    this.questionList = data;
                } else {
                    this.$message.error(msg);
                }
            });
        },
        submits() {
            this._check() && this._determine(); //提交
        },
        // 获取企业名称和统代的
        _getEntDetails() {
            getEntDetails().then(res => {
                let { code, msg, data } = res;
                if (code == "0000") {
                    this.creditCode = data.creditCode;
                    this.entName = data.entName;
                } else {
                    this.$message.error(msg);
                }
            });
        },
        //发起问题弹出框检测
        _check() {
            let reg = /^1[3456789][0-9]{9}$/;
            if (this.entName == "") {
                this.$message({
                    message: "请输入企业名称",
                    type: "warning"
                });
                return false;
            } else if (this.questionType == "") {
                this.$message({
                    message: "请选择问题类型",
                    type: "warning"
                });
                return false;
            } else if (this.contact == "") {
                this.$message({
                    message: "请输入联系人",
                    type: "warning"
                });
                return false;
            } else if (this.phone == "") {
                this.$message({
                    message: "请输入联系电话",
                    type: "warning"
                });
                return false;
            } else if (!reg.test(this.phone)) {
                this.$message({
                    message: "手机号码不正确",
                    type: "warning"
                });
                return false;
            } else if (this.contents == "") {
                this.$message({
                    message: "请输入企业描述",
                    type: "warning"
                });
                return false;
            }
            return true;
        },
        //弹出框正确执行
        _determine() {
            let that = this;
            let data = {
                companyName: this.entName,
                creditCode: this.creditCode,
                linkman: this.contact, //联系人
                mobile: this.phone, //联系电话
                problemTypeId: this.questionType, //问题类型id
                problemContent: this.contents, //问题描述
                account: this.account //用户
            };
            policyLaunch(data).then(res => {
                let { code, msg } = res;
                if (code == "0000") {
                    this.$message({
                        message: msg,
                        type: "success"
                    });
                    setTimeout(function() {
                        that.dialogVisible = false;
                        that.creditCode = "";
                        that.contact = "";
                        that.phone = "";
                        that.questionType = "";
                        that.contents = "";
                    }, 2000);
                } else {
                    this.$message.error(msg);
                }
            });
        },
        //取消
        handleClose() {
            this.dialogVisible = false;
            this.creditCode = "";
            this.contact = "";
            this.phone = "";
            this.questionType = "";
            this.contents = "";
        }
    }
};
</script>

<style lang="less">

#questions {
    width: 200px;
    height: 30px;
    input {
        border-bottom: none;
    }
}
.el-select {
    border: 1px solid #cccccc;
}
.el-dialog__header {
    padding: 10px 20px 10px;
    background: #4465e7;
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;
}
.el-dialog__title {
    color: white;
}
.el-dialog__headerbtn {
    top: 12px;
}
.el-dialog__headerbtn .el-dialog__close {
    color: white;
    font-size: 18px;
}
.el-dialog__headerbtn .el-dialog__close:hover {
    color: #cccccc;
}
::-webkit-scrollbar {
    width: 0.5rem;
    height: 0.5rem;
    background: hsla(0, 0%, 100%, 0.6);
}
::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 5px; /*滚动条的背景区域的圆角*/
}
::-webkit-scrollbar-thumb {
    border-radius: 0;
    background-color: rgba(95, 95, 95, 0.4);
    transition: all 0.2s;
    border-radius: 0.5rem;
    &:hover {
        background-color: rgba(95, 95, 95, 0.7);
    }
}

#wrapper_content{
    flex-grow: 1;
    background: #fff;
    overflow-y: auto;
  font-size: 14px;
  .policydetails{
    position: relative;
    width: 92.8%;
    height: 100%;
    background: white;
    padding:20px 40px;
    margin:0 auto;
    .return{
      position: absolute;
      right:10px;
      top:8px;
      width: 63px;
      height: 63px;
      //cursor: pointer;
      //background: url("../../../../images/back-btn.png") no-repeat center 100%/100%;
    }
    .project_top{
      margin: 0 auto;
      h2{
        color:#455467;
        font-size:18px;
        text-align: center;
        font-weight: bold;
      }
      .pro_container{
        margin:20px 58px;
        padding:10px 70px;
        border:1px dashed rgba(147, 153, 165, 0.4);
        .text_first,.text_second{
          display: flex;
          justify-content: space-around;
          color:#455467;
          div{
            width:33.3%;
            margin:5px 0;
          }
        }
        .text-third{
          margin:5px 0;
          div{
            color:#455467;
            width:60%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space:nowrap;

          }
        }
      }
    }
    .project_bottom{
      padding:10px 70px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      height:100%;
      .con_left{
          min-height: 300px;
        .tis{
          font-size:18px;
          text-align: center;
          font-weight: bold;
          margin-bottom: 10px;
        }
        width:74%;
        //min-width:640px;
        margin-right:2%;
        float: left;
        height:100%;
        p{
          text-indent: 2rem;
          color:#455467;
          line-height: 25px;
        }
      }
      .con_right{
        min-height:460px;
        position: fixed;
        overflow-y: auto;
        right: 95px;
        width: 20%;
        min-width: 270px;
        height: 100%;
        max-height: 400px;
        min-height: 300px;

        .info{
          width:80px;
          height:25px;
          line-height: 25px;
          text-align: center;
          border-radius: 2px;
          background: rgba(0, 0, 0, 0.6);
          color:white;
        }
        .policy{
          margin-left: 10%;
          width:80%;
          height:36px;
          text-align: center;
          background: rgba(92,124,236,.8);
          color:white;
          line-height:36px;
          cursor: pointer;
          letter-spacing: 5px;
        }
        .text_czt{
          margin: 10px 0;
          width:100%;
          //display: none;

          padding:10px;
          background-color: rgba(249, 249, 249, 1);
          border: 1px solid rgba(242, 244, 247, 1);
          .tit{
            font-weight: bold;
            margin-bottom: 5px;
            color:rgba(69, 84, 103, 1);
          }
          .tit_cont{
            color:#707B8B;
            line-height: 25px;
            height:300px;

          }

        }



      }

    }

  }

}
.ptext{
  font-weight:normal;
  font-size:14px;
  a{
    text-decoration: underline;
    cursor: pointer;
  }
  strong{
    color:rgba(92, 124, 236, 1);
    display: block;
    cursor: pointer;
    //border-bottom: 1px dashed rgba(92, 124, 236, 1);
    text-decoration:underline;
    p{
      text-indent: 2rem !important;
      line-height: 25px;
      color:rgba(92, 124, 236, 1) !important;
    }
  }
}
.dis{
  display: block;
}
.ty{
  display: none;
}

.con_right::-webkit-scrollbar {
  width: 8px;
  height:8px;
}
.con_right::-webkit-scrollbar-track {
  background-color:white;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius:2em;
}
.con_right::-webkit-scrollbar-thumb {
  background-color:rgba(147, 153, 165, 0.4);
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius:2em;
}

.modal-backdrop.in {
  opacity: 0.5 !important;
}
.fa-saoyisao{
  width:100%;
  margin-top: 30px;
  .weixins{
    width: 132px;
    height: 132px;
    //border:1px solid #ccc;
    margin:0 auto;

  }
  p{
    margin-top: 15px;
    text-align: center;
    color:#455467;
  }

}

.left-link{
  display: flex;
  justify-content: space-between;
  .linkes{
    margin:5px 0;
    width: 70%;
    color: #5c7cec;
    cursor: pointer;
    .icon-lianjie{
      color: #5c7cec;
    }
  }
  .r_download{
    color: #5c7cec;
    width: 20%;
    display: flex;
    justify-content:space-around;
    span{
      text-decoration: underline;
      cursor: pointer;
    }
  }
}
.containers{
    padding:10px  50px;
    color:black;
    .box_container{
        display: flex;
        justify-content: flex-start;
        .name{
            margin-top: 15px
        }
        .entname{
            margin-right:50px;
        }
        input{
            width:200px;
            height:30px;
            text-indent: 1rem;

            border:none;
            outline: none;
            border-bottom:1px solid rgba(217, 217, 217, 1);
            border-radius: 4px;
            line-height: 30px;
        }
        input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
            /* WebKit browsers */
            color: rgba(147, 153, 165, 1)
        }
        input:-moz-placeholder, textarea:-moz-placeholder {
            /* Mozilla Firefox 4 to 18 */
            color:rgba(147, 153, 165, 1)
        }
        input::-moz-placeholder, textarea::-moz-placeholder {
            /* Mozilla Firefox 19+ */
            color:rgba(147, 153, 165, 1)
        }
        input:-ms-input-placeholder, textarea:-ms-input-placeholder {
            /* Internet Explorer 10+ */
            color:rgba(147, 153, 165, 1)
        }
    }
    .btns{
        margin-top: 10px;
        display: flex;
        justify-content: flex-end;
    }
}
</style>
