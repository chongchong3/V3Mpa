<template>
    <div class="contentbox">
        <div class="tabbox">
            <div class="content">
                <div class="contentlist" data-name="经营情况">
                    <div class="jbxx">
                        <div class="yearSelect" id="yearSelect">
                            <el-select v-model="dataYear" size="small" placeholder="请选择年份" @change="getShowPass">
                                <el-option
                                    v-for="item in years"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                ></el-option>
                            </el-select>
                        </div>
                        <section class="list-item" v-for="(item) in tableArr" :key="item.title" :class="item.key">
                            <section class="subSection">
                                <div class="sectionSubTitle">{{item.title}}</div>
                                <div class="info-table">
                                    <div class="tables" v-for="(items,index) in item.children" :key="index">
                                        <span class="th">
                                            <span class="border">{{items.name}}</span>
                                        </span>
                                        <span class="td">
                                            <span class="border" :name="items.key"></span>
                                        </span>
                                    </div>
                                </div>
                            </section>
                        </section>
                        <MassageTip v-if="noData"></MassageTip>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import * as inter from "@api/bussiness.js";
    import {businessDataInEntDetail} from "../../common/constant/constant";
    import {toHtmlStr} from "../../common/utils";
    import MassageTip from "@/components/business/massageTip";
    export default {
        props: {
            creditCodes: {
                type: String
            }
        },
        data() {
            return {
                dataYear: "",
                years: [
                    { label: "2017年", value: 2017 },
                    { label: "2018年", value: 2018 },
                    { label: "2019年", value: 2019 }
                ].reverse(),
                tableArr: [],
                businessAuthData:[], //经营数据权限
                noData:false,
                toHtmlStr: toHtmlStr,
            };
        },
        mounted() {
            this.controlPermission();
            this.getYear();
        },
        methods: {
            entPosition() {
                let params = {
                    creditCode: this.creditCodes,
                    dataYear: this.dataYear,
                };
                if (this.businessAuthData.includes('基本信息')) {
                    this.getBusinessData(params);
                }
                if (this.businessAuthData.includes('亩均指标')) {
                    this.getPerMuIndexData(params);
                }
                if (this.businessAuthData.includes('用地数据')) {
                    this.getLandData(params);
                }
                if (this.businessAuthData.includes('税务数据')) {
                    this.getTaxData(params);
                }
                if (this.businessAuthData.includes('统计数据')) {
                    this.getStatisticData(params);
                }
                if (this.businessAuthData.includes('用水数据')) {
                    this.getWaterData(params);
                }
                if (this.businessAuthData.includes('用电数据')) {
                    this.getElectricData(params);
                }
                if (this.businessAuthData.includes('排污数据')) {
                    this.getEnvironmentData(params);
                }
            },            
            getYear() {
                inter.showYear().then(res => {
                    if (res.code === "0000") {
                        this.dataYear = res.data || new Date().getFullYear();
                        return this.dataYear
                    }
                }).then((res)=>{
                    this.getShowPass(res);
                });
            },
            getShowPass() {
                inter.showPass({ dataYear: this.dataYear, creditCode: this.creditCode }).then(res => {
                    if (res.code === "0000") {
                        if (data.data == 1) {
                            this.noData = false;
                            this.tableArr = businessDataInEntDetail.filter(v => this.businessAuthData.includes(v.category));                            
                            this.entPosition(res);
                        } else {
                            this.tableArr = [];
                            this.noData = true;                            
                        }
                    } else {
                        this.tableArr = [];
                        this.noData = true;
                    }
                });
            },
            controlPermission() {
                let curModAuthorityList = this.$store.state.curModAuthority || [];
                const businessObj = curModAuthorityList.children.find(v=>v.name==='经营情况');
                this.businessAuthData =  businessObj ? businessObj.children.map(v=>v.name) : [];
                console.log(this.businessAuthData);
            },
            /**基本信息*/
            getBusinessData(params) {
                inter.showManagementData(params).then(res => {
                    if (res.code === "0000") {
                        const manageData = res.data || {} ;
                        this.renderData(manageData, 'businessData');
                    }
                });
            },
            /**亩均指标*/
            getPerMuIndexData() { 
                
            },
            /**土地数据*/
            getLandData(params) {
                inter.showLandData(params).then(res => {
                    if (res.code === "0000") {
                        const landData = res.data.landData[0] || {};
                        const rentInLand = res.data.rentInLand[0] || {};
                        const rentOutLand = res.data.rentOutLand[0] || {};
                        const otherLand = res.data.otherLand[0] || {};

                        this.renderData(landData, 'logLand');
                        this.renderData(rentInLand, 'rentInLand');
                        this.renderData(rentOutLand, 'rentOutLand');
                        this.renderData(otherLand, 'otherLand');
                    }
                });
            },
            /**税务数据*/
            getTaxData(params) {
                inter.showTaxData(params).then(res => {
                    if (res.code === "0000") {
                        const taxData = res.data || {};
                        this.renderData(taxData, 'taxData');
                    }
                });
            },
            /**统计数据*/
            getStatisticData(params) {
                inter.staticsData(params).then(res => {
                    if (res.code === "0000") {
                        const staticsData = res.data || {};
                        this.renderData(staticsData, 'statisticData');
                    }
                });
            },
            /**用水数据*/
            getWaterData(params) { 
                inter.showWaterData(params).then(res => {
                    if (res.code === "0000") {

                        const datas = res.data || [];
                        if (datas.length === 0) {
                            return;
                        }

                        $('.waterData .info-table').html(`${datas.map((item, index) => {
                            return `<div class="tables">
                                        <span class="th">
                                            <span class="border">水表户名</span>
                                        </span>
                                        <span class="td">
                                            <span class="border">${item.waterMeterName}</span>
                                        </span>
                                    </div><div class="tables">
                                        <span class="th">
                                            <span class="border">水表户号</span>
                                        </span>
                                        <span class="td">
                                            <span class="border">${item.waterMeterNumber}</span>
                                        </span>
                                    </div><div class="tables">
                                        <span class="th">
                                            <span class="border">自来水（万立方米）</span>
                                        </span>
                                        <span class="td">
                                            <span class="border">${toHtmlStr(item.waterConsumption)}</span>
                                        </span>
                                    </div>`
                        }).join('')}`);

                        $('.waterData .info-table').append(`<div class="tables">
                                        <span class="th">
                                            <span class="border">自取水（万立方米）</span>
                                        </span>
                                        <span class="td">
                                            <span class="border">${toHtmlStr(datas[0].selfExtractingWater)}</span>
                                        </span>
                                    </div>`);
                    }
                });
            },
            /**用电数据*/
            getElectricData(params) { 
                inter.showElectricData(params).then(res => {
                    if (res.code === "0000") {
                        const datas = res.data || [];
                        if (datas.length === 0) {
                            return;
                        }

                        $('.electricData .info-table').html(`${datas.map((item, index) => {
                            return `<div class="tables">
                                        <span class="th">
                                            <span class="border">电表户名</span>
                                        </span>
                                        <span class="td">
                                            <span class="border">${item.ammeterName}</span>
                                        </span>
                                    </div><div class="tables">
                                        <span class="th">
                                            <span class="border">电表户号</span>
                                        </span>
                                        <span class="td">
                                            <span class="border">${item.ammeterNum}</span>
                                        </span>
                                    </div><div class="tables">
                                        <span class="th">
                                            <span class="border">用电量（万千瓦时）</span>
                                        </span>
                                        <span class="td">
                                            <span class="border">${toHtmlStr(item.electricityConsumption)}</span>
                                        </span>
                                    </div>`
                        }).join('')}`);
                    }
                });
            },
            /**排污数据*/
            getEnvironmentData(params) {
                inter.showEnvironmentData(params).then(res => {
                    if (res.code === "0000") {
                        const environmentData = res.data || {};
                        this.renderData(environmentData, 'pollutionRight');
                    }
                })
            },
            renderData(data, className) {
                Array.from($(`.${className} .info-table span[name]`)).forEach(v=> {
                    const key = $(v).attr('name');
                    $(v).text(toHtmlStr(data[key]));
                });
            }
        },
        components: {
            MassageTip
        }
    };
</script>
<style lang="less">
</style>

