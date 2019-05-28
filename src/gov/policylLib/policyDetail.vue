<template>
    <div class="policydetails">
        <div class="return" @click="routerToLastPage"></div>
        <div class="project_top">
            <h2>{{ policy.policyTitle }}</h2>
            <div class="pro_container">
                <div class="text_first">
                    <div>
                        索引号：<span>{{ policy.referNumber || "" }}</span>
                    </div>
                    <div>
                        支持对象：<span>{{ policy.supportTarget || "" }}</span>
                    </div>
                    <div>
                        政策类别：<span>{{ policy.policyType || "" }}</span>
                    </div>
                </div>
                <div class="text_second">
                    <div>
                        发文字号：<span>{{ policy.issuedNumber || "" }}</span>
                    </div>
                    <div>
                        发文机关：<span>{{ policy.policyType || "" }}</span>
                    </div>
                    <div>
                        执行期限：<span
                            >{{ policy.startDate || "" }} ~
                            {{ policy.endDate || "" }}</span
                        >
                    </div>
                </div>
                <div class="text-third">
                    <div>
                        政策提炼：<span title="政策提炼">{{
                            policy.policyRefinement || ""
                        }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="project_bottom clear">
            <div class="con_left">
                <!--<div class="tis">关于实施小微企业普惠性税收减免政策的通知</div>-->
                <!--<p class="ptext">对月销售额10万元以下(含本数)的增值税小规模纳税人，各省、自治区、直辖市、计划单列市财政厅(局)免征增值税。对月销售额10万元以下(含本数)的增值税小规模纳税人，免征增值税。对月销售额10万元以下(含本数)的增值税小规模纳税人，免征增值税。-->
                <!--</p>-->
                <div class="context_wrap">
                    <div class="tis">{{ policy.policyTitle }}</div>
                    <div class="ptext" v-html="policy.textContent">
                        
                    </div>
                </div>
                <div class="pdf_wrap">
                    <div
                        class="pdf_item flex-between"
                        v-for="file in files"
                        :key="file.ossUrl"
                    >
                        <div>{{ file.fileName }}</div>
                        <div>
                            <span
                                class="preview"
                                @click="showPdf(file.ossPdfUrl)"
                                >预览</span
                            >
                            <span
                                class="download"
                                @click="
                                    downloadFile(file.ossUrl, file.fileName)
                                "
                                >下载</span
                            >
                        </div>
                    </div>
                </div>
            </div>
            <div class="con_right">
                <!-- 二维码 -->
                <div class="cont">
                    <div class="qrcode_wrap" v-if="showQrcode">
                        <img :src="qrcodeSrc" alt="" />
                        <span style="color:#455467">扫一扫分享本页面</span>
                    </div>
                </div>
            </div>
        </div>
        <PDFViewer :src="pdfSrc" :isShow.sync="isShow" />
    </div>
</template>

<script>
import { getPolicyById, downloadFile } from "@api/gov/policylLib";

import QRCode from "qrcode";
import PDFViewer from "@/components/PDFViewer";

export default {
    data() {
        return {
            lastRoute: {},
            qrcodeSrc: "",
            isShow: false,
            pdfSrc: "",

            files: [],
            policy: {}
        };
    },
    // 路由守卫获取上一个的formData
    // 或者根据id去取
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.lastRoute = from;
            if (from.path === "/policyUpload" || !to.query.policyId) {
                let policy = to.params.formData;
                vm.formatterData(policy);
            } else if (to.query.policyId) {
                getPolicyById({ id: to.query.policyId }).then(res => {
                    if (res.code == 0) {
                        vm.formatterData(res.data);
                    } else {
                        vm.$message.error(res.msg);
                    }
                });
            }
        });
    },

    created() {
        let { policyId } = this.$route.query;
        this.policyId = policyId;
    },

    computed: {
        // 预览的时候不显示二维码
        showQrcode(){
            return this.lastRoute.path !== "/policyUpload"
        }
    },

    mounted() {
        let _this = this;
        QRCode.toDataURL(location.href, { width: 100 }, function(error, str) {
            if (error) console.log(error);
            _this.qrcodeSrc = str;
        });
    },

    methods: {
        routerToLastPage() {
            if (this.lastRoute.path === "/policyUpload") {
                this.$router.push({
                    name: "政策文库上传",
                    query: {
                        policyId: this.lastRoute.query.policyId
                    },
                    params: {
                        formData: this.policy
                    }
                });
            } else {
                window.history.go(-1);
            }
        },

        formatterData(data = {}) {
            data.startDate = data.startDate ? data.startDate.split(" ")[0] : "";
            data.endDate = data.endDate ? data.endDate.split(" ")[0] : "";
            this.policy = data;

            let fileNames = data.fileName.split(","),
                ossUrls = data.ossUrl.split(","),
                ossPdfUrls = data.ossPdfUrl.split(","),
                arr = [];

            fileNames.forEach((fileName, idx) => {
                if (fileName) {
                    arr.push({
                        fileName,
                        ossUrl: ossUrls[idx],
                        ossPdfUrl: ossPdfUrls[idx]
                    });
                }
            });
            this.files = arr;
        },

        showPdf(pdfSrc) {
            this.pdfSrc = pdfSrc;
            this.isShow = true;
        },

        downloadFile(file, name) {
            downloadFile({ ossUrl: file }, name, res => {
                // console.log(res);
            });
        }
    },
    components: {
        PDFViewer
    }
};
</script>

<style lang="less">
.has-analysis {
    text-decoration: underline;
    cursor: pointer;
    color: #5c7cec !important;
    font-weight: bold;
}

.flex-between {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.return {
    position: absolute;
    right: 10px;
    top: 8px;
    width: 63px;
    height: 63px;
    cursor: pointer;
    background: url("../../assets/back-btn.png") no-repeat center 100%/100%;
}

.policydetails {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    background: white;
    padding: 20px 40px;
    margin: 0 auto;

    .return {
        position: absolute;
        right: 10px;
        top: 8px;
        width: 63px;
        height: 63px;
        //cursor: pointer;
        //background: url("../../../../images/back-btn.png") no-repeat center 100%/100%;
    }

    .project_top {
        margin: 0 auto;

        h2 {
            color: #455467;
            font-size: 18px;
            text-align: center;
            font-weight: bold;
        }

        .pro_container {
            margin: 20px 58px;
            padding: 10px 70px;
            border: 1px dashed rgba(147, 153, 165, 0.4);

            .text_first,
            .text_second {
                display: flex;
                justify-content: space-around;
                color: #455467;

                div {
                    width: 33.3%;
                    margin: 5px 0;
                }
            }

            .text-third {
                margin: 5px 0;

                div {
                    color: #455467;
                    width: 60%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
        }
    }

    .project_bottom {
        position: relative;
        padding: 10px 70px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        height: 100%;

        .con_left {
            flex: 1;

            .pdf_item {
                color: #5c7cec;
                text-decoration: underline;

                .preview,
                .download {
                    color: #5c7cec;
                    cursor: pointer;
                    margin-right: 10px;
                }
            }

            .tis {
                font-size: 18px;
                text-align: center;
                font-weight: bold;
                margin-bottom: 10px;
            }

            p {
                text-indent: 2rem;
                color: #455467;
                line-height: 25px;
            }
            .ptext {
                box-sizing: border-box;
                padding: 10px;
            }
        }

        .con_right {
            flex-basis: 130px;

            .qrcode_wrap {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
            }
        }
    }
}

.ptext {
    font-weight: normal;
    font-size: 14px;

    a {
        text-decoration: underline;
        cursor: pointer;
    }
}

.dis {
    display: block;
}
</style>