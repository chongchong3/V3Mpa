<template>
    <div style="height:100%;">
        <div id="declarationGuide" v-if="showFrame">
            <div class="detail-summary commons">
                <div class="title">
                    <span>标&nbsp;&nbsp;&nbsp;题</span>
                    {{ detailsData.title }}
                </div>
                <div class="title">
                    <span>申报起止日期</span>
                    {{ detailsData.dataTime }}
                </div>
            </div>
            <div class="links">
                <div
                    v-for="item in maplist"
                    @click="gotoDocx(item.fileName)"
                    class="link-c commons"
                    :key="item.id"
                >
                    <i class="iconfont icon-lianjie" aria-hidden="true"></i>
                    {{ item.pdf }}
                </div>
            </div>
            <div
                class="returns commons"
                @click="gotoPolicy(detailsData.associatedPolicyId)"
            >
                <span>提到一项政策</span>
            </div>
            <div v-html="detailsData.content" class="main-body commons"></div>
            <div @click="gotoDeclare" class="main-bottom">项目申报</div>
        </div>
        <iframe
            :src="url"
            v-else
            width="100%"
            height="100%"
            border="0"
            style="overflow: scroll;overflow-x: hidden"
        ></iframe>
    </div>
</template>
<script>
import {
    getProjectDeclareDetail,
    previewOnHtml
} from "@api/h5/declarationGuide";
import {getUrlParam} from "@/common/utils/index";
import "@/assets/font/iconfont.css";
export default {
    data() {
        return {
            id: "",
            detailsData: {},
            maplist: [],
            showFrame: true,
            url: ""
        };
    },
    components: {},
    created() {
        this.id = getUrlParam("id");
        this._getData();
    },
    methods: {
        _getData() {
            getProjectDeclareDetail({ id: this.id }).then(res => {
                if (res.code == "0000") {
                    this.detailsData = res.data;
                    this.maplist = res.data.mapList || [];
                    console.log(this.maplist);
                }
            });
        },
        gotoPolicy(id) {
            this.$router.push({
                name: 'policyLibraryDetail',
                query:{
                    id
                }
            })
        },
        gotoDocx(fileName) {
            previewOnHtml({ fileName }).then(res => {
                this.showFrame = false;
                this.url = res.data;
            });
        },
        gotoDeclare() {
            window.location.href =
                "https://link.jiandaoyun.com/f/5c998e0f314d594e66ab441c";
        }
    },
    mounted() {}
};
</script>
<style lang="less" >
@import "../../less/declarationGuide.less";
.title {
    span {
        display: inline-block;
        width: 100px;
    }
}
.main-bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 45px;
    background-color: #1492ff;
    text-align: center;
    line-height: 45px;
    color: #fff;
    font-size: 16px;
    z-index: 888;
}
</style>