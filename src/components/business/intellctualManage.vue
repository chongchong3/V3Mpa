<template>
    <div class="contentlist">
        <div class="use-bulk" id="intellctualManage">
            <div class="ultimateShareholderTable" id="ultimateShareholderTable">
                <table>
                    <tr>
                        <td>企业名称</td>
                        <td>{{ toHtmlStr(datas.entName) }}</td>
                        <td>注册资本</td>
                        <td>
                            {{ toHtmlStr(datas.regCap) }}万&nbsp;{{
                                toHtmlStr(datas.regCapCur)
                            }}
                        </td>
                        <td>经营状态</td>
                        <td>{{ toHtmlStr(datas.entStatus) }}</td>
                    </tr>
                    <tr>
                        <td>统一社会信用代码</td>
                        <td>{{ toHtmlStr(datas.creditCode) }}</td>
                        <td>开业日期</td>
                        <td>{{ toHtmlStr(datas.esDate) }}</td>
                        <td>企业类型</td>
                        <td>{{ toHtmlStr(datas.entType) }}</td>
                    </tr>
                    <tr>
                        <td>法定代表人</td>
                        <td>{{ toHtmlStr(datas.frName) }}</td>
                        <td>核准日期</td>
                        <td colspan="3">{{ toHtmlStr(datas.apprDate) }}</td>
                    </tr>
                    <tr>
                        <td>行业门类名称（代码）</td>
                        <td>
                            {{ toHtmlStr(datas.industryPhyName)
                            }}{{ toHtmlStr(datas.industryPhyCode) }}
                        </td>
                        <td>经营期限</td>
                        <td colspan="3">
                            自{{ toHtmlStr(datas.openFrom, "-") }}至{{
                                toHtmlStr(datas.openTo, "-")
                            }}
                        </td>
                    </tr>
                    <tr>
                        <td>国民经济行业名称（代码）</td>
                        <td>
                            {{ toHtmlStr(datas.industryName) }}
                            {{
                                toHtmlStr(datas.industryCode) !== ""
                                    ? toHtmlStr(datas.industryCode)
                                    : ""
                            }}
                        </td>
                        <td>登记机关</td>
                        <td colspan="3">{{ toHtmlStr(datas.regOrg) }}</td>
                    </tr>
                    <tr>
                        <td>所属地区</td>
                        <td>
                            {{ toHtmlStr(datas.province)
                            }}{{ toHtmlStr(datas.city)
                            }}{{ toHtmlStr(datas.county) }}
                        </td>
                        <td>地址</td>
                        <td colspan="3">{{ toHtmlStr(datas.address) }}</td>
                    </tr>
                    <tr>
                        <td>经营范围</td>
                        <td
                            colspan="5"
                            style="line-height: 25px;padding-top:10px;padding-bottom:10px"
                        >
                            {{ toHtmlStr(datas.operateScope) }}
                        </td>
                    </tr>
                </table>
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
    data() {
        return {
            datas: [],
            toHtmlStr: toHtmlStr
        };
    },
    mounted() {
        this.initData();
    },
    methods: {
        initData() {
            let params = {
                entName: enterpriseName
            };
            inter.queryEnt(params).then(res => {
                if (res.code == "0000") {
                    this.datas = res.data;
                }
            });
        }
    }
};
</script>
<style lang="less" scoped>
.el-tabs__header {
    margin: 0;
}
#intellctualManage {
    background: #fff;
    border: 1px solid rgba(213, 218, 224, 1);
    table {
        border-collapse: collapse;
    }
    table td {
        width: 130px;
        padding-left: 15px;
        height: 43px;
        line-height: 25px;
        font-size: 12px;
        border: 1px solid rgba(213, 218, 224, 1);
    }
    table td:nth-of-type(1),
    table td:nth-of-type(3),
    table td:nth-of-type(5) {
        font-size: 15px;
    }
    table td:nth-of-type(1) {
        width: 205px;
    }
    table td:nth-of-type(2) {
        width: 278px;
    }
    table td:nth-of-type(4) {
        width: 150px;
    }
    table td:nth-of-type(6) {
        width: 210px;
    }
}
</style>

