const constant = {
    test:'test',
}
const landData = {
    companyPaperModalText:['新增电表','新增水表','新增出租土地','新增承租土地'],
    updateText:['修改','取消修改'],
    logLandList:[
        {
            name:'土地使用权面积',
            key:'landUseArea',
            tip:'指企业经国土资源部门供地（含登记）的土地面积总和'
        },{
            name:'不动产权证号',
            key:'realPropertyNumber',
            tip:'土地证号，示例：23456664432'
        },{
            name:'土地坐落',
            key:'landLocated',
            tip:'示例：清江村南路22号'
        },{
            name:'供地日期',
            key:'landSupply',
            tip:'成交确认书或用地批准书办理时间'
        },{
            name:'不动产权证',
            key:'imgUrl'
        }
    ],
    departmentList :[
        {
            name:'咨询部门',
            key:'department'
        },{
            name:'联系人',
            key:'contacts'
        },{
            name:'联系方式',
            key:'contactsTel'
        }
    ],
    totalDatas:[
        {
            index:'1',
            name:'工业总产值（万元）',
            key:'industryValue'
        },{
            index:'2',
            name:'工业增加值(万元)',
            key:'industryAddValue'
        },{
            index:'3',
            name:'R&D经费支出(万元)',
            key:'researchMoney'
        },{
            index:'4',
            name:'年平均职工人数(人)',
            key:'yearAverageWorker'
        },{
            index:'5',
            name:'规上企业主营业务收入（万元）',
            key:'upRuleIncome'
        },{
            index:'6',
            name:'综合能耗(吨)',
            key:'allEnergyConsume'
        },{
            index:'6.1',
            name:'原煤(吨)',
            key:'coalTotal'
        },{
            index:'6.2',
            name:'热力(百万千焦)',
            key:'streamTotal'
        },{
            index:'6.3',
            name:'天然气(万立方米)',
            key:'naturalGasTotal'
        }
    ],
    taxDatas:[
        {
            index: '1',
            name: '税收实际贡献(万元)',
            key: 'taxRevenue',
        },
        {
            index:'1.1',
            name:'增值税(万元)',
            key:'incrementTax',
        },
        {
            index:'1.1.1',
            name:'增值税净入库数(万元)',
            key:'taxStorage'
        },{
            index:'1.1.2',
            name:'出口企业“免抵”税额(万元)',
            key:'exportTax'
        },{
            index:'1.1.3',
            name:'增值税先征后退(福利企业)(万元)',
            key:'retreatInAdvanceTax'
        },{
            index:'1.1.4',
            name:'增值税即征即退(资源综合利用)(万元)',
            key:'immediateWithdrawalTax'
        },
        {
            index:'1.2',
            name:'消费税(万元)',
            key:'consumptionTax'
        },{
            index:'1.3',
            name:'企业所得税(万元)',
            key:'businessIncomeTaxes'
        },{
            index:'1.4',
            name:'经营所得个人所得税(万元)',
            key:'personalIncomeTaxes'
        },{
            index:'1.5',
            name:'房产税(万元)',
            key:'personTax'
        },{
            index:'1.6',
            name:'城镇土地使用税(万元)',
            key:'cityLandTax',
        },{
            index:'1.6.1',
            name:'城镇土地使用税返回金额(万元)',
            key:'townReturnMoney'
        },{
            index:'1.7',
            name:'车船税(万元)',
            key:'carTax'
        },{
            index:'1.8',
            name:'土地增值税(万元)',
            key:'landIncrementTax'
        },{
            index:'1.9',
            name:'印花税(万元)',
            key:'yhTax'
        },{
            index:'1.10',
            name:'城市维护建设税(万元)',
            key:'cswhTax'
        },{
            index:'1.11',
            name:'资源税(万元)',
            key:'resourceTax'
        },{
            index:'1.12',
            name:'教育费附加(万元)',
            key:'jyfj'
        },{
            index:'1.13',
            name:'地方教育附加(万元)',
            key:'placeJyfj'
        },{
            index:'1.14',
            name:'环境保护税(万元)',
            key:'hjbhTax'
        }


    ],
    rendOutList : [
        {
            name:'承租方统一社会信用代码',
            key:'lesseeCreditCode'
        },{
            name:'承租方企业名称',
            key:'lessee'
        },{
            name:'承租方联系方式',
            key:'lesseeTel'
        },{
            name:'不动产权证号',
            key:'realPropertyNumber'
        },{
            name:'出租用地面积小计（平方米）',
            key:'areaOfOutLand'
        },{
            name:'土地坐落',
            key:'landLocated'
        },{
            name:'租期起',
            key:'rentBegin'
        },{
            name:'租期止',
            key:'rentEnd'
        },{
            name:'用水总量(万吨)',
            key:'waterTotal'
        },{
            name:'用电总量(万千瓦时)',
            key:'electricityTotal'
        },{
            name:'租赁合同',
            key:'imgUrl'
        }
    ],
    otherList:[
        {
            name:'用地性质',
            key:'landType'
        },{
            name:'其他用地面积（亩）',
            key:'otherLand'
        },{
            name:'土地坐落',
            key:'landLocated'
        },{
            name:'备注',
            key:'remark'
        }
    ],
    rendInListPerson:[
        {
            name:'姓名',
            key:'realName'
        },{
            name:'身份证号',
            key:'identityNum'
        },{
            name:'出租方联系方式',
            key:'lessorTel'
        },{
            name:'不动产权证号',
            key:'realPropertyNumber'
        },{
            name:'承租用地面积(亩)',
            key:'areaOfInLand'
        },{
            name:'土地坐落',
            key:'landLocated'
        },{
            name:'租期起',
            key:'rentBegin'
        },{
            name:'租期止',
            key:'rentEnd'
        },{
            name:'年实际用水量(万吨)',
            key:'waterTotal'
        },{
            name:'年实际用电量(万千瓦时)',
            key:'electricityTotal'
        },{
            name:'租赁合同',
            key:'imgUrl'
        }
    ],
    rendInList : [
        {
            name:'出租方统一社会信用代码',
            key:'lessorCreditCode'
        },{
            name:'出租方企业名称',
            key:'lessor'
        },{
            name:'出租方联系方式',
            key:'lessorTel'
        },{
            name:'不动产权证号',
            key:'realPropertyNumber'
        },{
            name:'承租用地面积(亩)',
            key:'areaOfInLand'
        },{
            name:'土地坐落',
            key:'landLocated'
        },{
            name:'租期起',
            key:'rentBegin'
        },{
            name:'租期止',
            key:'rentEnd'
        },{
            name:'年实际用水量(万吨)',
            key:'waterTotal'
        },{
            name:'年实际用电量(万千瓦时)',
            key:'electricityTotal'
        },{
            name:'租赁合同',
            key:'imgUrl'
        }
    ],
    statusData:[
        {
            name:'规下企业主营业务收入（万元）',
            key:'mainServiceIncome'
        },{
            name:'应税销售收入(万元)',
            key:'taxableSaleIncome'
        },{
            name:'利润总额(万元)',
            key:'totalProfit'
        },{
            name:'固定资产投资(万元)',
            key:'fixedAssetsInvestment'
        }
    ],
    taxData:[
        {
            name:'税收实际贡献(万元)',
            key:'taxRevenue'
        },{
            name:'增值税(万元)',
            key:'incrementTax'
        },{
            name:'增值税净入库数（万元）',
            key:'taxStorage'
        },{
            name:'出口企业“免抵”税额（万元）',
            key:'exportTax'
        },{
            name:'增值税先征后退（福利企业）（万元）',
            key:'retreatInAdvanceTax'
        },{
            name:'增值税即征即退（资源综合利用）（万元）',
            key:'immediateWithdrawalTax'
        },{
            name:'消费税(万元)',
            key:'consumptionTax'
        },{
            name:'企业所得税(万元)',
            key:'businessIncomeTaxes'
        },{
            name:'个人所得税(万元)',
            key:'personalIncomeTaxes'
        },{
            name:'房产税(万元)',
            key:'personTax'
        },{
            name:'城镇土地使用税(万元)',
            key:'cityLandTax'
        },{
            name:'车船税(万元)',
            key:'carTax'
        },{
            name:'土地增值税(万元)',
            key:'landIncrementTax'
        },{
            name:'印花税(万元)',
            key:'yhTax'
        },{
            name:'城市维护建设税(万元)',
            key:'cswhTax'
        },{
            name:'资源税(万元)',
            key:'resourceTax'
        },{
            name:'教育费附加(万元)',
            key:'jyfj'
        },{
            name:'地方教育附加(万元)',
            key:'placeJyfj'
        },{
            name:'环境保护税(万元)',
            key:'hjbhTax'
        }
    ],
    totalData:[
        {
            name:'工业总产值（万元）',
            key:'industryValue'
        },{
            name:'工业增加值(万元)',
            key:'industryAddValue'
        },{
            name:'研发经费支出(万元)',
            key:'researchMoney'
        },{
            name:'年平均职工人数(人/年)',
            key:'yearAverageWorker'
        },{
            name:'规上企业主营业务收入（万元）',
            key:'upRuleIncome'
        },{
            name:'综合能耗(吨)',
            key:'allEnergyConsume'
        },{
            name:'原煤(吨)',
            key:'coalTotal'
        },{
            name:'蒸汽(百万千焦)',
            key:'streamTotal'
        },{
            name:'天然气(万立方米)',
            key:'naturalGasTotal'
        }
    ],
    operateData:[
        {
            name:'企业负责人',
            key:'frName'
        },{
            name:'负责人联系方式',
            key:'frTel'
        },{
            name:'填报人',
            key:'applicant'
        },{
            name:'联系方式',
            key:'applicantTel'
        },{
            name:'实际经营业务',
            key:'actualBusiness'
        }
    ],
    sewageQData:[
        {
            name:'化学需氧量排污权(吨)',
            key:'needOxygenRight'
        },{
            name:'氨氮排污权(吨)',
            key:'ammoniaNitrogenRight'
        },{
            name:'二氧化硫排污权(吨)',
            key:'sulfurDioxideRight'
        },{
            name:'氮氧化物排污权(吨)',
            key:'nitrogenOxidesRiight'
        }
    ],
    sewageLData:[
        {
            name:'化学需氧量排放量(吨)',
            key:'needOxygenDischarge'
        },{
            name:'氨氮排放量(吨)',
            key:'ammoniaNitrogenDischarge'
        },{
            name:'二氧化硫排放量(吨)',
            key:'sulfurDioxideDischarge'
        },{
            name:'氮氧化物排放量(吨)',
            key:'nitrogenOxidesDischarge'
        }
    ],
    electricNum:[
        {
            name:'电表户号',
            key:'ammeterNum'
        },{
            name:'电表户名',
            key:'ammeterName'
        },{
            name:'电表用电量(万千瓦时)',
            key:'electricityConsumption'
        }
    ],
    waterNum:[
        {
            name:'水表户号',
            key:'waterMeterNumber'
        },{
            name:'水表户名',
            key:'waterMeterName'
        },{
            name:'自来水量(万吨)',
            key:'waterConsumption'
        }
    ]

}

/** 企业档案筛选项 */
// 注册资本
const regCapDatas = [
    { regCap: '', name: '全部' },
    { regCap:'0-100', name: '100万以下' },
    { regCap:'100-500', name: '100万-500万' },
    { regCap:'500-1000',name: '500万-1000万' },
    { regCap: '1000-3000', name: '1000万-3000万' },
    { regCap: "3000-''",  name: '3000万以上' }];
//注册时间
const esdateDatas =  [
    { esdate: '', name: '全部' },
    { esdate: '0-1',  name: '1年以下' },
    { esdate:'1-3' , name: '1-3年' },
    { esdate:'3-5' , name: '3-5年' },
    { esdate: '5-10',  name: '5-10年' },
    { esdate:"10-''", name: '10年以上' }];
const companyType=  [{name: '有专利', key: 'isPatent'}, {name: '有软著', key: 'isSoftware'}, {name: '有商标', key: 'isTrademark'}];
// 企业规模
const entRuleDatas = [{ name: '全部', value:'' } ,{ name: '规上工业企业', value: 0 },{ name: '规下工业企业', value: 1 }];
// 经营状态
const businessStatusDatas = [{name:'全部'},{name:'在营（开业）'},{name:'注销'},{name:'吊销'}];

const statusdata = {
    townCheck: ['通过','未通过','待审核'],
    appealRecord: ['已驳回','已修改','未处理'],
    appealRecordList:[
        {
            label:'审核不通过',
            value:4
        },
        {
            label:'已驳回',
            value:3
        },{
            label:'已修改',
            value:1
        },{
            label:'未处理',
            value:2
        }
    ],
    checkProgress:['未填报','已填报','已提交','乡镇退回','审核通过','驳回复核'],
    checkProcess: [
        {
            status:1,
            name:'未填报'
        },{
            status:2,
            name:'已填报'
        },{
            status:3,
            name:'已提交'
        },{
            status:4,
            name:'乡镇退回'
        },{
            status:5,
            name:'审核通过'
        },{
            status:6,
            name:'驳回复核'
        }
    ]
}
const appealTypes = ['土地数据','税务数据','统计数据','用水数据','用电数据','排污数据','经营数据'];
const appealTypeList = [
    {
        label:'土地数据',
        value:1
    },{
        label:'税务数据',
        value:2
    },{
        label:'统计数据',
        value:3
    },{
        label:'用水数据',
        value:4
    },{
        label:'用电数据',
        value:5
    },{
        label:'排污数据',
        value:6
    },{
        label:'经营数据',
        value:7
    }
]
const longYouTowns = ['龙州街道','东华街道','湖镇镇','小南海镇','詹家镇','溪口镇','横山镇','塔石镇','罗家乡','庙下乡','石佛乡','社阳乡','大街乡','牧尘畲族乡','模环乡','经济开发区(北)','经济开发区(南)'];

const linHaiData = {
    orderStauts:[{
        name:'已派单',
        val:2
    },{
        name:'待派单',
        val:1
    },{
        name:'派单退回',
        val:3
    },{
        name:'无法解决',
        val:4
    }],
    handerStatus:[
        {
            name:'待处理',
            key:1,
            color:'#FF6D60',
        },{
            name:'发起问题',
            key:2,
            color:'#5C7CEC'
        },{
            name:'问题派单',
            key:3,
            color:'#FFAF34'
        },{
            name:'问题退回',
            key:4,
            color:'#FF6D60'
        },{
            name:'继续流转',
            key:5,
            color:'#5C7CEC'
        },{
            name:'无法处理',
            key:6,
            color:'#DE2037'
        },{
            name:'派单退回',
            key:7,
            color:'#8B572A'
        },{
            name:'已解决',
            key:8,
            color:'#25B499'
        },{
            name:'稍后处理',
            key:9,
            color:'#25B499'
        }
    ],
    problemTypeColorDatas:[{
        name:'经济发展类',
        color:'#5C7CEC',
        bgColor: 'rgba(92,124,236,.1)'
    },{
        name:'资产财政类',
        color:'#FF6D60',
        bgColor: 'rgba(255,109,96,.1)'
    },{
        name:'人才科技类',
        color:'#FFAF34',
        bgColor: 'rgba(255,175,52,.1)'
    },{
        name:'规划建设类',
        color:'#67CAB8',
        bgColor: 'rgba(103,202,184,.1)'
    },{
        name:'党员建设类',
        color:'#FF7B7B',
        bgColor: 'rgba(255,123,123,.1)'
    },{
        name:'其它',
        color:'#5C7CEC',
        bgColor: 'rgba(92, 124, 236, .1)'
    }]
}

// web 端问题类型和处理流程色值
// 1，问题类型
// 经济发展类 5C7CEC
// 资产财政类 FF6D60
// 人才科技类 FFAF34
// 规划建设类 67CAB8
// 党员建设类 FF7B7B
// 其他 rgba(92, 124, 236, 1)
// 2，处理流程
// 待处理    FF6D60
// 发起问题 5C7CEC
// 问题派单 FFAF34
// 问题退回 FF6D60
// 继续流转 5C7CEC
// 无法处理 DE2037
// 派单退回 8B572A
// 已解决    25B499
const dataTime = [
    {
        name:'2018年',
        val:2018
    },{
        name:'2017年',
        val:2017
    }
]
const paperTabData = [
    {
        name:'工商数据',
        type:0,
        seq:1
    },{
        name:'土地数据',
        type:1,
        seq:2
    },{
        name:'税务数据',
        type:2,
        seq:3
    },{
        name:'统计数据',
        type:3,
        seq:4
    },{
        name:'用水数据',
        type:4,
        seq:5
    },{
        name:'用电数据',
        type:5,
        seq:6
    },{
        name:'排污数据',
        type:6,
        seq:7
    },{
        name:'经营数据',
        type:7,
        seq:8
    }
];
export {constant,appealTypeList, paperTabData,landData, regCapDatas, esdateDatas,companyType, entRuleDatas, businessStatusDatas,longYouTowns,dataTime,statusdata,appealTypes,linHaiData}
