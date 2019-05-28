<template>
    <BasePage>
        <div id="wrapper_content">
            <div class="projectdeclarate">
                <div class="project_top">
                    <h2 class="project_texts">
                        {{ toHtmlStr(dataObj.title, "-") }}
                    </h2>
                    <div class="pro_container">
                        <div class="text_first">
                            <div>
                                发文机关：<span>{{
                                    toHtmlStr(dataObj.issuedOffice, "-")
                                }}</span>
                            </div>
                            <div>
                                申报起止日期：<span>{{
                                    toHtmlStr(dataObj.dataTime, "-")
                                }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="project_bottom clear">
                    <div class="con_left">
                        <!--内容-->
                        <div
                            class="conts"
                            v-html="
                                dataObj.content == null ? '' : dataObj.content
                            "
                        ></div>
                        <div class="files" v-for="(item, index) in fileList">
                            <div
                                class="left-link"
                                :style="
                                    toHtmlStr(
                                        item.fileName == ''
                                            ? 'display:none'
                                            : '',
                                        'display:none'
                                    )
                                "
                            >
                                <div
                                    class="linkes"
                                    @click="_goTo(item.fileName)"
                                >
                                    <i class="iconfont icon-lianjie"></i
                                    >{{ item.pdf }}
                                </div>
                                <div class="r_download">
                                    <span @click="_goTo(item.fileName)"
                                        >预览</span
                                    ><span
                                        @click="
                                            _goDown(item.fileName, item.pdf)
                                        "
                                        >下载</span
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="con_right">
                        <div
                            class="see_text"
                            @click="_seeText(associatedPolicyId)"
                        >
                            <i class="iconfont icon-lianjie"></i>查看原文
                        </div>
                        <div class="sb_link" @click="_onProject">
                            <i class="iconfont icon-xiangmushenbaoguanli"></i
                            >项目申报
                        </div>
                        <div class="fa-saoyisao">
                            <div class="weixins" id="qrcode">
                                <img :src="qrcodeSrc" alt="" />
                            </div>
                            <p>扫一扫分析申报</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </BasePage>
</template>

<script>
import BasePage from "@/components/BasePage";
import { getDeclareDetail, previewOnHtml } from "@api/ent/projectdeclarate";

import { gotoEntURL, getUrlParam, toHtmlStr } from "@/common/utils/index"; //query传参
import QRCode from "qrcode";

export default {
    data() {
        return {
            id: getUrlParam("id"),
            toHtmlStr: toHtmlStr,
            qrcodeSrc: "",
            dataObj: {},
            fileList: [],
            associatedPolicyId: ""
        };
    },
    components: {
        BasePage
    },
    mounted() {
        this._getEw(); //二维码
        this._getDetails();
    },
    methods: {
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
        _getDetails() {
            let data = {
                id: this.id
            };
            getDeclareDetail(data).then(res => {
                let { code, msg, data } = res;
                if (code == "0000") {
                    this.dataObj = data;
                    this.fileList = data.mapList;
                    this.associatedPolicyId = data.associatedPolicyId;
                } else {
                    this.$message.error(msg);
                }
            });
        },
        _goTo(pdf) {
            let pdfUrl = {
                fileName: pdf
            };
            previewOnHtml(pdfUrl).then(res => {
                let { code, data, msg } = res;
                if (code == "0000") {
                    window.open(data);
                } else {
                    this.$message.error(msg);
                }
            });
        },
        //下载
        _goDown(file, name) {
            let urls = window.location.origin;
            window.open(
                `${urls}` + `/gov/selfCheck/downloadFile?ossUrl=` + file
            );
        },
        _onProject() {
            window.location.href = `https://link.jiandaoyun.com/f/5c998e0f314d594e66ab441c`;
        },
        //查看原文
        _seeText(id) {
            gotoEntURL(`policydetails.html?id=${id}`);
        }
    }
};
</script>

<style lang="less">
@import "../../common/less/reset.less";
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
    .projectdeclarate{
        width: 92.8%;
        height: 100%;
        background: white;
        padding:20px 40px;
        margin:0 auto;
        .project_top{
            margin: 0 auto;
            margin-bottom:40px;
            h2{
                color:#455467;
                font-size:18px;
                text-align: center;
                font-weight: bold;
            }
            .pro_container{
                //margin:20px 58px;
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
                width:70%;
                min-width:580px;
                margin-right:2%;
                float: left;
                height:100%;
                text-indent: 2rem;
                color:#455467;
                .conts{
                    margin-bottom: 30px;
                }
            }
            .con_right{
                width:20%;
                min-width: 220px;
                float: right;
                height:100%;
                background: rgba(249, 249, 249, 1);
                padding:10px 25px;
                min-height:460px;
                .see_text{
                    margin:15px;
                    text-align: center;
                    color:#5C7CEC;
                    cursor: pointer;
                    i{
                        font-size: 16px;
                    }
                }
                .sb_link{
                    text-align: center;
                    height:36px;
                    line-height: 36px;
                    color:white;
                    background-color:rgba(92, 124, 236, 0.8);
                    cursor: pointer;
                    i{
                        font-size: 16px;
                    }
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

            }

        }

    }
}
.modal-backdrop.in {
    opacity: 0.5 !important;
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
        width: 30%;
        display: flex;
        justify-content:space-around;
        span{
            text-align: center;
            text-decoration: underline;
            cursor: pointer;
        }
    }
}
</style>