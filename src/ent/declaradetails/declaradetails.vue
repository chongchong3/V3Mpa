<template>
    <BasePage>
        <!-- <div class="wrapper"> 是列表用这个 -->
        <!-- HTML内容 -->
        <div id="wrapper_content">
            <div class="declaradetails">
                <div class="return" @click="_return"></div>
                <div class="project_top">
                    <h2 class="titls">{{ toHtmlStr(info.title, "-") }}</h2>
                    <!--<div class="pro_container">-->
                    <!--<div class="text_first">-->
                    <!--<div>索引号：<span>000014349/2019-000021</span></div>-->
                    <!--<div>支持对象：<span>000014349/2019-000021</span></div>-->
                    <!--<div>政策类别：<span>财政补助</span></div>-->
                    <!--</div>-->
                    <!--<div class="text_second">-->
                    <!--<div>发文字号：<span>国办发【2019】9号</span></div>-->
                    <!--<div>发文机关：<span>国务院办公厅</span></div>-->
                    <!--<div>执行期限：<span>2019年03月13日</span></div>-->
                    <!--</div>-->
                    <!--<div class="text-third">-->
                    <!--<div>政策提炼：<span title="财政补助财政补助财政补助财">财政补助财政补助财政补助财政补助财政补助财政补助财政补助财政补助财政补助财政补助财政补助财政补助财政补助财政补助财政补助财政补助财政补助财政补助财政补助财政补助财政补助财政补助财政补助财政补助财政补助财政补助财政补助财政补助</span></div>-->

                    <!--</div>-->
                    <!--</div>-->
                </div>
                <div class="project_bottom clear">
                    <div class="con_left">
                        <div class="conts">
                            {{ toHtmlStr(info.content, "-") }}
                        </div>
                        <div class="files">
                            <div
                                class="left-link"
                                v-for="(item, index) in fileList"
                            >
                                <div
                                    class="linkes"
                                    @click="_goTo(item.fileName)"
                                >
                                    <i class="iconfont icon-lianjie"></i
                                    >{{ toHtmlStr(item.pdf, "-") }}
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
                    <div
                        class="links"
                        @click="_seeText(info.associatedPolicyId)"
                    >
                        <i class="iconfont icon-lianjie"></i>查看政策原文
                    </div>
                </div>
            </div>
        </div>
    </BasePage>
</template>

<script>
import BasePage from "@/components/BasePage";

import {
    getDecalreResultDetail,
    previewOnHtml,
    downloadFile
} from "@api/ent/declaradetails";

import { gotoEntURL, getUrlParam, toHtmlStr } from "@/common/utils/index"; //query传参

export default {
    data() {
        return {
            id: getUrlParam("id"),
            toHtmlStr: toHtmlStr,
            info: {},
            fileList: []
        };
    },
    components: {
        BasePage
    },
    mounted() {
        this._getDetails();
    },
    methods: {
        _getDetails() {
            let data = { id: this.id };
            getDecalreResultDetail(data).then(res => {
                let { code, msg, data } = res;
                if (code == "0000") {
                    this.info = data;
                    this.fileList = data.maplist;
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
            downloadFile({ ossUrl: file }, name, res => {
                console.log(res);
            });
        },
        //查看政策原文
        _seeText(id) {
            gotoEntURL(`policydetails.html?id=${id}`);
        },
        _return() {
            gotoEntURL(`declaration.html`);
        }
    }
};
</script>

<style lang="less" scoped>
#wrapper_content{
    flex-grow: 1;
    background: #fff;
    overflow-y: auto;
    font-size: 14px;
    .declaradetails{
        position: relative;
        //width: 92.8%;
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
            cursor: pointer;
            background: url("~@/assets/back-btn.png") no-repeat center 100%/100%;
        }
        .project_top{
            margin: 0 auto;
            margin-bottom: 40px;
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
            padding:10px 70px 10px 0px;
            margin: 0 auto;
            position: relative;

            height:100%;
            .con_left{
                width:74%;
                min-width:640px;
                margin-right:2%;

                height:100%;
                margin: 0 auto;
                text-indent: 2rem;
                color:#455467;
                line-height: 25px;

            }
            .links{
                cursor: pointer;
                position: absolute;
                right:58px;
                top:10px;
                color:rgba(92, 124, 236, 1);
                i{
                    font-size: 16px;
                }
            }

        }

    }

}
//.files{
//  .linkes{
//    color: #5c7cec;
//    cursor: pointer;
//    .icon-lianjie{
//      color: #5c7cec;
//    }
//  }
//}

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
</style>