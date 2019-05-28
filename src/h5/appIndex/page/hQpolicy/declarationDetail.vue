<template>
    <div style="height:100%;">
        <div id="declarationDetailPageOuter" v-if="showFrame">
            <div class="detail-summary commons">
                {{ detailsData.title }}
            </div>
            <div class="links">
                <div
                    v-for="item in detailsData.maplist"
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
    getDecalreResultDetail,
    previewOnHtml
} from "@api/h5/declarationDetail";
import { getUrlParam } from "@/common/utils/index";
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
    created() {
        this.id = getUrlParam("id");
        this._getData();
    },
    methods: {
        _getData() {
            getDecalreResultDetail({ id: this.id }).then(res => {
                if (res.code == "0000") {
                    this.detailsData = res.data;
                    this.maplist = res.data.maplist;
                }
            });
        },
        gotoPolicy(id) {
            this.$router.push({
                name: "policyLibraryDetail",
                query: {
                    id
                }
            });
        },
        gotoDocx(fileName) {
            previewOnHtml({ fileName }).then(res => {
                this.showFrame = false;
                this.url = res.data;
            });
        }
    },
    mounted() {}
};
</script>
<style lang="less" >
@import "../../less/declarationDetail.less";
// less已使用px2rem，直接使用375适配的px就行
</style>