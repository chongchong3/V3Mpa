// 文件类型的配置项以及默认项见 './config.file.js'
// 文件含css, js, html

module.exports = {
    h5: {
        'login': { title: '登录' },        // 企业端登录
        'appIndex': { title: '主页', vue: false },     // 首页
        'loginGov': { title: '登录' },     //政务端登录
        "test": {},
    },
    gov: {
        // 系统设置
        'roleSet': { title: '权限列表', router: true }, //权限列表
        'accountSet': { title: '账号设置' }, //账号设置
        'limitDateSet': { title: '自核期限设置' }, //自核期限设置
        'problemType': { title: '问题类型设置' }, //问题类型设置

        //数据中心
        'dataCenter': { title: '企业名单导入' }, //企业名单导入
        'annualDataImport': { title: '年度数据导入' }, //年度数据导入
        'typeLabelImport': { title: '类型标签导入' }, //类型标签导入
        'componyLabel': { title: '2513企业导入' }, //2513企业导入
        'typeLabelDetail': { title: '类型标签导入详情' }, //（数据中心）类型标签导入详情页
        "annualDataImportDetail": { title: '年度数据导入详情' }, //(数据中心)年度数据导入详情

        "personalCenter": { title: '权限列表' },//个人中心

        //企业档案
        'login': { title: '登录' },        //登录
        'index': { title: '首页' },        //首页
        'entFile': { title: '企业档案' },      //企业档案
        'entDetail': { title: '企业详情' },        //企业详情
        'checkProgress': { title: '核对进展', router: true }, //核对进展
        'companySelfCore': { title: '企业自核' }, //企业自核
        'appealRecord': { title: '申诉记录' }, //申诉记录
        'townCheck': { title: '乡镇审核', css: true, router: true }, //乡镇审核

        "modifyRecord": { title: '修改记录' },//修改记录
        'companyPaperDetail': { title: '企业直报详情' }, //企业直报详情

        //问题反馈
        'selfProblem': { title: '我的问题' }, //我的问题
        'resolveProblem': { title: '问题详情' }, //处理问题-督查问题-问题详情
        "problemWarehouse": { title: '问题仓库' },//问题仓库
        "problemStatis": { title: '问题统计' },//问题统计
        "problemFlow": { title: '问题流转' },//问题流转
        "problemDetail": { title: '问题详情' },

        "declartionEntry": { title: '项目申报录入' },//惠企政策-->项目申报录入
        "declartionPublic": { title: '项目结果发布', css: true, router: true },  //惠企政策-->项目结果发布


        // 惠企政策
        'policylLib': { title: '惠企政策', router: true },
    },
    ent: {
        'index': { title: '主页' },
        'login': { title: '登录' },

        //惠企政策-企业端
        'policyLibrary': { title: '政策文库' },//企业端-政策文库
        'policydetails': { title: '文件详情' },//企业端-政策文库-文件详情
        'project': { title: '项目申报' },//企业端-项目申报
        'projectdeclarate': { title: '申报指南' },//企业端-申报指南
        'declaration': { title: '申报公示' },//企业端-申报公示
        'declaradetails': { title: '公示详情' },//企业端-公示详情
        'personalCenter': { title: '个人中心' },//个人中心
        "companycenter": { title: '企业中心' },//企业中心

        // 问题反馈
        'questionList': { title: '问题列表 ' }, //问题列表 
        'questionFeedbackDetail': { title: '问题反馈详情' }, //问题反馈详情


        //企业档案
        'entDetail': { title: '企业详情' },        //企业详情
        'feedBackDetail': { title: '问题反馈详情', router: true, css: true }        //问题反馈详情
    },
}
