<template>
    <div data-type="0" class="tab-box" data-title="工商数据">
        <div class="business-data" id="businessData">
            <el-row class="business-tr">
                <el-col :span="4" class="data-cell-title"
                    ><div>企业名称</div></el-col
                >
                <el-col :span="6" class="data-cell-detail"
                    ><div>{{ bussiness.entName }}</div></el-col
                >
                <el-col :span="3" class="data-cell-title"
                    ><div>注册资本</div></el-col
                >
                <el-col :span="4" class="data-cell-detail"
                    ><div>{{ bussiness.regCap }}</div></el-col
                >
                <el-col :span="3" class="data-cell-title"
                    ><div>经营状态</div></el-col
                >
                <el-col :span="4" class="data-cell-detail"
                    ><div>{{ bussiness.entStatus }}</div></el-col
                >
            </el-row>
            <el-row class="business-tr">
                <el-col :span="4" class="data-cell-title"
                    ><div>统一社会信用代码</div></el-col
                >
                <el-col :span="6" class="data-cell-detail"
                    ><div>{{ bussiness.creditCode }}</div></el-col
                >
                <el-col :span="3" class="data-cell-title"
                    ><div>开业日期</div></el-col
                >
                <el-col :span="4" class="data-cell-detail"
                    ><div>{{ bussiness.openFrom }}</div></el-col
                >
                <el-col :span="3" class="data-cell-title"
                    ><div>企业类型</div></el-col
                >
                <el-col :span="4" class="data-cell-detail"
                    ><div>{{ bussiness.entType }}</div></el-col
                >
            </el-row>
            <el-row class="business-tr">
                <el-col :span="4" class="data-cell-title"
                    ><div>法定代表人</div></el-col
                >
                <el-col :span="6" class="data-cell-detail"
                    ><div>{{ bussiness.frName }}</div></el-col
                >
                <el-col :span="6" class="data-cell-title"
                    ><div>核准日期</div></el-col
                >
                <el-col :span="8" class="data-cell-detail"
                    ><div>{{ bussiness.esDate }}</div></el-col
                >
            </el-row>
            <el-row class="business-tr">
                <el-col :span="4" class="data-cell-title"><div>行业门类名称</div></el-col>
                <el-col :span="6" class="data-cell-detail"><div>{{ bussiness.industryPhyName }}({{bussiness.industryPhyCode}})</div></el-col>
                <el-col :span="6" class="data-cell-title"><div>经营期限</div></el-col>
                <el-col :span="8" class="data-cell-detail"><div>{{ bussiness.openTo }}</div></el-col>
            </el-row>
            <el-row class="business-tr">
                <el-col :span="4" class="data-cell-title"><div>国民经济行业名称（代码）</div></el-col>
                <el-col :span="6" class="data-cell-detail"><div>{{ bussiness.industryName }}({{bussiness.industryCode}})</div></el-col>
                <el-col :span="6" class="data-cell-title"
                    ><div>登记机关</div></el-col
                >
                <el-col :span="8" class="data-cell-detail"
                    ><div>{{ bussiness.regOrg }}</div></el-col
                >
            </el-row>
            <el-row class="business-tr">
                <el-col :span="4" class="data-cell-title"
                    ><div>所属地区</div></el-col
                >
                <el-col :span="6" class="data-cell-detail"
                    ><div>{{ bussiness.province }}{{ bussiness.city}}{{ bussiness.county }}</div></el-col
                >
                <el-col :span="6" class="data-cell-title"
                    ><div>地址</div></el-col
                >
                <el-col :span="8" class="data-cell-detail"
                    ><div>{{ bussiness.address }}</div></el-col
                >
            </el-row>
            <el-row class="business-tr">
                <el-col :span="4" class="data-cell-title"
                    ><div>经营范围</div></el-col
                >
                <el-col :span="20" class="data-cell-detail"
                    ><div>{{ toHtmlStr(bussiness.operateScope, "-") }}
                    </div></el-col
                >
            </el-row>
        </div>
    </div>
</template>
<script>
import * as api from "@api/gov/companyPaperDetail";
import { toHtmlStr } from "@/common/utils/index";
// import toHtmlStr from "@/common/utils/toHtmlStr.js";
export default {
    data() {
        return {
            bussiness: {
                entName: "",
                esDate: "",
                openFrom: "",
                creditCode: "",
                entType: "",
                regCap: "",
                operateScope: "",
                frName: "",
                address: "",
                province: "",
                city: "",
                county: "",
                regOrg: "",
                industryName: "",
                industryCode: "",
                openTo: "",
                industryPhyName: "",
                industryPhyCode: ""
            },
            param: null,
            toHtmlStr: () => {}
        };
    },
    created() {
        this.toHtmlStr = toHtmlStr;
    },
    mounted() {
        this.getDataList();
    },
    methods: {
        getDataList() {
            this.param = this.$store.state.paperParam;
            const params = {
                creditCode: this.param.creditCode,
                dataYear: this.param.dataYear
            };
            api.getBussiness(params).then(res => {
                if (res.code == "0000") {
                    this.bussiness = Object.assign(
                        {},
                        this.bussiness,
                        res.data.map
                    );
                }
            });
        }
    }
};
</script>
<style lang="less" scoped>

</style>
