<template>
    <div class="contentlist visible">
        <div class="use-bulk" id="ultimateShareholder">
            <div class="header">最终持股人</div>
            <div
                id="shareHolderText"
                style="font-size: 20px;font-weight: bold;text-align: center;margin-bottom: 30px"
            >
                <span style="color:rgba(255,91,1,1)">{{
                    toHtmlStr(maxObj.name)
                }}</span
                >实际共持有
                <span style="color:rgba(0,144,198,1)">{{ company }}</span>
                <span>{{ maxObj.finalRatio }}的股份，是其最大持股股东</span>
            </div>
            <div class="ultimateShareholderTable" id="ultimateShareholderTable">
                <el-table :data="tableData" stripe style="width: 100%">
                    <el-table-column
                        :label="data.label"
                        :prop="data.props"
                        v-for="(data, index) of headList"
                        :key="index"
                    ></el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
import * as inter from "@api/bussiness.js";

import { toHtmlStr } from "@/common/utils/index";
// import toHtmlStr from "@/common/utils/toHtmlStr.js";
import { enterpriseName } from "@/common/constant/constantConst.js"; //获取路径名
export default {
    props: {
        creditCodes: {
            type: String
        }
    },
    data() {
        return {
            maxObj: [],
            company: enterpriseName,
            toHtmlStr: toHtmlStr,
            headList: [
                { label: "目标企业股东信息", props: "name" },
                { label: "股东类型", props: "invType" },
                { label: "认缴出资额", props: "subConam" },
                { label: "持股比例(直接持股)", props: "shareholdingRatio" },
                { label: "最终持股比例", props: "finalRatio" }
            ],
            tableData: []
        };
    },

    mounted() {
        this.initData();
    },
    methods: {
        initData() {
            let params = {
                entName: enterpriseName,
                t: 1555747803670
            };
            inter.getManyStockHolder(params).then(res => {
                if (res.code == "0000" && res.data !== null) {
                    res.data.map((v, i) => {
                        v.shareholdingRatio =
                            v.shareholdingRatio !== ""
                                ? (v.shareholdingRatio * 100).toFixed(2) + "%"
                                : "";
                        v.finalRatio =
                            v.finalRatio !== ""
                                ? (v.finalRatio * 100).toFixed(2) + "%"
                                : "";
                    });
                    this.maxObj = res.data[0];
                    this.tableData = res.data;
                }

                // console.log(this.tableData);
                // console.log(this.maxObj);
            });
        }
    }
};
</script>
<style lang="less" scoped>
.el-tabs__header {
    margin: 0;
}
#ultimateShareholder {
    padding: 0 40px 20px 40px;
    background: #fff;
    .header {
        color: #666;
        font-size: 16px;
        position: relative;
        padding: 33px 0;
        padding-left: 17px;
        &::before {
            content: "";
            display: inline-block;
            width: 6px;
            height: 20px;
            border-radius: 3px;
            background: #007bff;
            position: absolute;
            left: 0;
        }
    }
}
</style>

