<template>
    <BasePage>
        <div class="main-content common-page-outer" id="entFilePageOuter">

            <el-row>
                <el-col :span="24" class="enterprise_filterbox">
                    <div class="selector">
                        <el-cascader
                            :options="industryOptions"
                            placeholder="行业筛选"
                            :props="{
                            label: 'name',
                            value: 'code',
                            children: 'children'
                        }"
                            v-model="industry"
                            :show-all-levels="false"
                            :change-on-select="true"
                            @change="searchEvent"
                        ></el-cascader>
                    </div>
                    <div class="selector">
                        <el-select
                            v-model="regCap"
                            placeholder="注册资本"
                            @change="searchEvent"
                        >
                            <el-option
                                v-for="item in regCapDatasOptions"
                                :key="item.name"
                                :label="item.name"
                                :value="item.regCap"
                            ></el-option>
                        </el-select>
                    </div>
                    <div class="selector">
                        <el-select
                            v-model="esdate"
                            placeholder="注册时间"
                            @change="searchEvent"
                        >
                            <el-option
                                v-for="item in esdateDatasOptions"
                                :key="item.name"
                                :label="item.name"
                                :value="item.esdate"
                            ></el-option>
                        </el-select>
                    </div>
                    <div class="selector">
                        <el-select
                            v-model="companyType"
                            multiple
                            filterable
                            allow-create
                            default-first-option
                            placeholder="企业分类"
                            @change="searchEvent"
                        >
                            <el-option
                                v-for="(item, index) in companyTypeOptions"
                                :key="index + 'a'"
                                :label="item.name"
                                :value="item.key"
                            ></el-option>
                        </el-select>
                    </div>
                    <div class="selector">
                        <el-select
                            v-model="query.entStatus"
                            placeholder="经营状态"
                            @change="searchEvent"
                        >
                            <el-option
                                v-for="item in businessStatusOptions"
                                :key="item.name"
                                :label="item.name"
                                :value="item.name"
                            ></el-option>
                        </el-select>
                    </div>
                    <div class="selector">
                        <el-select
                            v-model="query.town"
                            placeholder="地区筛选"
                            @change="searchEvent"
                        >
                            <el-option
                                v-for="item in regionDatasOptions"
                                :key="item.town"
                                :label="item.town"
                                :value="item.town"
                            ></el-option>
                        </el-select>
                    </div>
                    <div class="selector">
                        <el-select
                            v-model="developType"
                            placeholder="培育企业"
                            @change="searchEvent"
                        >
                            <el-option
                                v-for="item in billionEntDatasOptions"
                                :key="item.code"
                                :label="item.name"
                                :value="item.code"
                            ></el-option>
                        </el-select>
                    </div>
                    <div class="selector">
                        <el-select
                            v-model="entRule"
                            placeholder="企业规模"
                            @change="searchEvent"
                        >
                            <el-option
                                v-for="item in entRuleOptions"
                                :key="item.value"
                                :label="item.name"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </div>
                    <div class="selector">
                        <el-select
                            v-model="typeLabel"
                            placeholder="企业类型"
                            @change="searchEvent"
                        >
                            <el-option
                                v-for="item in entTypeOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.code"
                            ></el-option>
                        </el-select>
                    </div>
                    <div class="selector">
                        <el-select
                            v-model="query.industryLabel"
                            placeholder="产业类型"
                            @change="searchEvent"
                        >
                            <el-option
                                v-for="item in industryLabelOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.code"
                            ></el-option>
                        </el-select>
                    </div>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="24" class="enterprise-search">
                    <div class="input-group">
                        <el-input
                            placeholder="请输入企业名称、法定代表人、公司地址进行查询"
                            suffix-icon="el-icon-search"
                            v-model="query.key"
                        ></el-input>
                    </div>
                    <el-button type="primary" @click="searchEvent">搜索</el-button>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="24" class="search-list-desc">
                    共检索到
                    <span class="total">{{ totalRecord }}</span
                    >家符合要求的企业
                </el-col>
            </el-row>

            <el-row class="search-list-outer">
                <el-col :span="24" id="searchList">
                    <div
                        class="detail-item-outer use-bulk"
                        @click="linkDatail(item.entName)"
                        v-for="item in listArr"
                        :key="item.name"
                    >
                        <div class="detail-item-outer-top-c">
                            <div class="detail-item-top-left-c">
                                {{toHtmlStr(item.entName, "-")}}
                            </div>
                        </div>
                        <div class="detail-item-outer-bottom-c">
                            <div class="wrap">
                                <div class="detail-item-outer-bottom-item">
                                    亩均税收：{{
                                    toHtmlStr(item.muPerTax, "-")
                                    }}万元/亩
                                </div>
                                <div class="detail-item-outer-bottom-item">
                                    亩均增加值：{{
                                    toHtmlStr(item.muIndustAdd, "-")
                                    }}万元/亩
                                </div>
                                <div class="detail-item-outer-bottom-item">
                                    单位能耗增加值：{{
                                    toHtmlStr(item.consumeAdd, "-")
                                    }}万元/吨标煤
                                </div>
                            </div>
                            <div class="wrap">
                                <div class="detail-item-outer-bottom-item">
                                    R&D经费支出占比：{{
                                    toHtmlStr(item.researchRate, "-")
                                    }}%
                                </div>
                                <div class="detail-item-outer-bottom-item">
                                    全员劳动生产率：{{
                                    toHtmlStr(item.allWorkRate, "-")
                                    }}万元/人年
                                </div>
                                <div class="detail-item-outer-bottom-item">
                                    单位排放增加值：{{
                                    toHtmlStr(item.blowdownAdd, "-")
                                    }}万元/吨标煤
                                </div>
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="24" class="pagination">
                    <el-pagination v-show="totalRecord>0"
                                   @current-change="handleCurrentChange"
                                   :current-page="current"
                                   :page-sizes="[10, 20, 30, 40]"
                                   :page-size="10"
                                   layout="total, prev, pager, next, jumper"
                                   :total="totalRecord"
                                   background
                    ></el-pagination>
                </el-col>
            </el-row>
           
            <!--<section>-->
                <!--<div class="input-group">-->
                    <!--<el-input-->
                        <!--placeholder="请输入企业名称、法定代表人、公司地址进行查询"-->
                        <!--suffix-icon="el-icon-search"-->
                        <!--v-model="query.key"-->
                    <!--&gt;</el-input>-->
                <!--</div>-->
                <!--<el-button type="primary" @click="searchEvent">搜索</el-button>-->
            <!--</section>-->
            <!--<section class="search-list-outer">-->
                <!--<div class="search-list-desc">-->
                    <!--共检索到-->
                    <!--<span class="total">{{ totalRecord }}</span-->
                    <!--&gt;家符合要求的企业-->
                <!--</div>-->
                <!--<div id="searchList">-->
                    <!--<div-->
                        <!--class="detail-item-outer use-bulk"-->
                        <!--@click="linkDatail(item.entName)"-->
                        <!--v-for="item in listArr"-->
                        <!--:key="item.name"-->
                    <!--&gt;-->
                        <!--<div class="detail-item-outer-top-c">-->
                            <!--<div class="detail-item-top-left-c">-->
                                <!--{{toHtmlStr(item.entName, "-")}}-->
                            <!--</div>-->
                        <!--</div>-->
                        <!--<div class="detail-item-outer-bottom-c">-->
                            <!--<div class="wrap">-->
                                <!--<div class="detail-item-outer-bottom-item">-->
                                    <!--亩均税收：{{-->
                                        <!--toHtmlStr(item.muPerTax, "-")-->
                                    <!--}}万元/亩-->
                                <!--</div>-->
                                <!--<div class="detail-item-outer-bottom-item">-->
                                    <!--亩均增加值：{{-->
                                        <!--toHtmlStr(item.muIndustAdd, "-")-->
                                    <!--}}万元/亩-->
                                <!--</div>-->
                                <!--<div class="detail-item-outer-bottom-item">-->
                                    <!--单位能耗增加值：{{-->
                                        <!--toHtmlStr(item.consumeAdd, "-")-->
                                    <!--}}万元/吨标煤-->
                                <!--</div>                                -->
                            <!--</div>-->
                            <!--<div class="wrap">-->
                                <!--<div class="detail-item-outer-bottom-item">-->
                                    <!--R&D经费支出占比：{{-->
                                        <!--toHtmlStr(item.researchRate, "-")-->
                                    <!--}}%-->
                                <!--</div>-->
                                <!--<div class="detail-item-outer-bottom-item">-->
                                    <!--全员劳动生产率：{{-->
                                    <!--toHtmlStr(item.allWorkRate, "-")-->
                                    <!--}}万元/人年-->
                                <!--</div>-->
                                <!--<div class="detail-item-outer-bottom-item">-->
                                    <!--单位排放增加值：{{-->
                                        <!--toHtmlStr(item.blowdownAdd, "-")-->
                                    <!--}}万元/吨标煤-->
                                <!--</div>-->
                            <!--</div>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->
                <!--<el-pagination v-show="totalRecord>0"-->
                    <!--@current-change="handleCurrentChange"-->
                    <!--:current-page="current"-->
                    <!--:page-sizes="[10, 20, 30, 40]"-->
                    <!--:page-size="10"-->
                    <!--layout="total, prev, pager, next, jumper"-->
                    <!--:total="totalRecord"-->
                    <!--background-->
                <!--&gt;</el-pagination>                -->
            <!--</section>-->
            <el-row v-show="totalRecord==0">
                <el-col :span="24" class="noData">
                    <div class="noData-img"></div>
                    <div class="noData-desc">
                        <p>暂无数据</p>
                        <p>Have no Data</p>
                    </div>
                </el-col>
            </el-row>
        </div>
    </BasePage>
</template>

<script>
import BasePage from "@/components/BasePage";
import { setLocalStorage, toHtmlStr, gotoGovURL } from "@/common/utils/index";
import {
    // data
    regCapDatas,
    esdateDatas,
    companyType,
    businessStatusDatas,
    entRuleDatas
} from "@/common/constant/constant";
import * as api from "@api/gov/entFile";

export default {
    data() {
        return {
            query: {
                isPatent: "" /**企业分类*/, //有无专利
                isSoftware: "", //有无软著
                isTrademark: "", //有无商标
                entStatus: "" /**经营状态*/,
                town: "" /**地区*/,
                developLabel: "" /**培育企业*/,
                industryLabel:undefined, /**产业类型*/
                key: "" /**搜索关键字*/
            },
            developType: undefined,
            entRule: null /**企业规模*/,
            typeLabel: null /**企业类型*/,
            industry: [],
            regCap: null,
            esdate: null,
            companyType: [],
            regCapDatasOptions: regCapDatas /**注册资本*/,
            industryOptions: [], //行业筛选
            regionDatasOptions: [], //地区筛选
            esdateDatasOptions: esdateDatas, //注册时间
            companyTypeOptions: companyType, //企业分类
            businessStatusOptions: businessStatusDatas, //经营状态
            entRuleOptions: entRuleDatas, //企业规模
            entTypeOptions: [], //企业类型
            industryLabelOptions:[], //产业类型
            billionEntDatasOptions: [
                //百亿产业
                { code: "", name: "全部" },
                { code: 1, name: "是" },
                { code: 2, name: "否" }
            ],
            listArr: [],
            developLabelCode: "",
            current: 1, //当前页
            pageSize: 10, //每页条数
            totalRecord: 0 //总条数
        };
    },
    created() {},
    mounted() {
        this.toHtmlStr = toHtmlStr;
        this.searchEvent();
        api.getIndustry().then(res => {
            this.industryOptions = [
                { name: "全部", code: "" },
                ...res.data.industry
            ];
            setLocalStorage("reallyIndus", res.data.industry);
            this.regionDatasOptions = [{ town: "全部" }, ...res.data.area];
            this.entTypeOptions = [
                { code: "", name: "全部" },
                ...res.data.typeLabel
            ];
            this.developLabelCode = res.data.developLabel[0].code;
            this.industryLabelOptions=[{name:'全部',code:''},...res.data.industryLabel];
        });
    },
    methods: {
        handleChange(value) {},
        searchEvent() {
            // this.companyType.map((v, index) => {
            //     if (v == "isSoftware") {
            //         this.query.isSoftware = 1;
            //     } else if (v == "isPatent") {
            //         this.query.isPatent = 1;
            //     } else if (v == "isTrademark") {
            //         this.query.isTrademark = 1;
            //     }
            // });

            this.query.isSoftware =  this.companyType.includes("isSoftware") ? 1 : 0;
            this.query.isPatent =  this.companyType.includes("isPatent") ? 1 : 0;
            this.query.isTrademark =  this.companyType.includes("isTrademark") ? 1 : 0;
            
            if (!this.developType) {
                this.query.developLabel = "";
            } else {
                this.query.developLabel = this.developLabelCode || "";
            }

            console.log(this.developType);
            console.log("1111111");
            console.log(this.developLabel);

            let newIndustry = this.industry.map((item, index, arr) => {
                return item;
            });

            const params = {
                t: Date.now(),
                pageNum: this.current,
                industry: newIndustry.length == 0 ? "" : newIndustry.pop(),
                industryType:
                    this.industry.length > 1
                        ? 2
                        : this.industry.length == 1
                        ? 1
                        : "",
                pageSize: this.pageSize,
                regCapStart:
                    this.regCap !== null ? this.regCap.split("-")[0] : "",
                regCapEnd:
                    this.regCap !== null ? this.regCap.split("-")[1] : "",
                esdateStart:
                    this.esdate !== null ? this.esdate.split("-")[0] : "",
                esdateEnd:
                    this.esdate !== null ? this.esdate.split("-")[1] : "",
                developType: !this.developType ? "" : this.developType,
                entRule: this.entRule === null ? "" : this.entRule,
                typeLabel: this.typeLabel === null ? "" : this.typeLabel,
                ...this.query
            };
            api.getEntList(params).then(res => {
                this.listArr = res.data.results;
                this.current = res.data.pageNum;
                this.totalRecord = res.data.totalRecord;
            });
        },
        linkDatail(name) {
            gotoGovURL(`entDetail.html?entName=${name}`);
        },
        handleCurrentChange(val) {
            this.current = val;
            this.searchEvent();
            // console.log(`当前页: ${val}`);
        }
    },
    components: {
        BasePage
    }
};
</script>

<style lang="less">    
@import "../../common/less/base";
@fontSize12: 12px;
@fontSize14: 14px;
@majorColor: #555;

#entFilePageOuter {
    margin: 10px;
    padding: 0;
    .enterprise_filterbox {
        display: flex;
        padding: 10px 40px 20px 40px;
        flex-wrap: wrap;
        border-bottom: 1px solid #f2f4f7;
        background-color: #fff;
        .selector {
            width: 20%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 20px;
        }
    }

    .enterprise-search {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding-right: 20px;
        height: 60px;
        align-items: center;
        border-bottom: 1px solid #f2f4f7;
        background-color: #fff;

        .input-group {
            position: relative;
            margin-right: 20px;
            width: 20%;
        }
    }

    .search-list-desc {
        color: @majorColor;
        font-size: 16px;
        height: 54px;
        line-height: 54px;
        text-align: left;
        background-color: #ffffff;
        padding-left: 30px;
        .total {
            color: @majorColor;
        }
    }
    
    .search-list-outer {
        background-color: #ffffff;               

        #searchList {
            width: 100%;
            padding: 0 30px;

            .detail-item-outer {
                cursor: pointer;
                width: 100%;
                height: 120px;
                display: flex;
                flex-direction: column;
                border-bottom: 1px solid rgba(0, 0, 0, 0.08);
                
                &:first-child {
                    border-top: 1px solid rgba(0, 0, 0, 0.08);
                }

                &-top-c {
                    height: 60px;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    padding: 0px 24px 0px 24px;

                    .detail-item-top-left-c {
                        color: #40485D;
                        font-size: 17px;
                    }

                    .detail-item-top-right-c {
                        width: 140px;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        margin-left: 40px;
                    }
                }

                &-bottom-c {
                    width: 100%;
                    padding: 0px 24px 0px 24px;
                    color: @majorColor;
                    font-size: 10px;

                    .wrap {
                        display: flex;
                        flex-wrap: nowrap;
                    }

                    .detail-item-outer-bottom-item {
                        display: inline-block;
                        width: 33.3%;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        margin-bottom: 8px;
                    }
                }
            }

            .detail-item-outer:first-child,
            .detail-item-outer-current,
            .detail-item-outer:hover {
                background: rgba(0, 0, 0, 0.02);

                .sm-text,
                .big-text {
                    color: rgba(255, 255, 255, 1);
                }
            }
        }
    }
    .pagination {
        background-color: #fff;
    }

}
</style>
