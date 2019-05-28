module.exports = {
    h5: [
        'login',        // 企业端登录
        'appIndex',     // 首页
        // 'menu',

        'loginGov',     //政务端登录
        // 'problemFlow',  // 政务问题流转
        // 'resolveProblem',
        // 'questionList', // 企业问题流转 --> questionList + questionDetail + questionAlteration
        // 'problemWarehouse', // 问题仓库

        //企业档案
        // 'entFile',

        //企业档案
        // 'entFile',//企业档案
        // 'entDetail', //企业档案详情

        // 'personalCenter',//个人中心
        // 'editMobile'  ,//修改电话号码 
        // 'editPassword',//修改密码
        // "problemStatis",//问题统计

        //我的问题
        // 'selfProblem', //我的问题
        // 'resolveProblem', //处理问题-督查问题-问题详情      

        // 'hQpolicy',//惠企政策进入页面
        // "policyLibrary",//政策文库
        // "policyLibraryDetail",//政策文库详情
        // 'policyConsultation',//政策咨询

        // 'declareItem',//项目申报
        // "declarationGuide",//申报指南
        // "declaration",//申报公示
        // "declarationDetail",//申报详情
        // 'messageCenter' ,//个人中心
    ],
    gov: [
        // 系统设置
        'roleSet', //权限列表
        'accountSet', //账号设置
        'limitDateSet', //自核期限设置
        'problemType', //问题类型设置

        //数据中心
        'dataCenter', //企业名单导入
        'annualDataImport', //年度数据导入
        'typeLabelImport', //类型标签导入
        'componyLabel', //2513企业导入
        'typeLabelDetail', //（数据中心）类型标签导入详情页
        "annualDataImportDetail", //(数据中心)年度数据导入详情

        "personalCenter",//个人中心

        //企业档案
        'login',        //登录
        'index',        //首页
        'entFile',      //企业档案
        'entDetail',        //企业详情
        'checkProgress', //核对进展
        'companySelfCore', //企业自核
        'appealRecord', //申诉记录
        'townCheck', //乡镇审核

        "modifyRecord",//修改记录
        'companyPaperDetail', //企业直报详情

        //问题反馈
        'selfProblem', //我的问题
        'resolveProblem', //处理问题-督查问题-问题详情
        "problemWarehouse",//问题仓库
        "problemStatis",//问题统计
        "problemFlow",//问题流转
        "problemDetail",

        "declartionEntry",//惠企政策-->项目申报录入
        "declartionPublic",  //惠企政策-->项目结果发布


        // 惠企政策
        'policylLib'
    ],
    ent: [
        'index',
        'login',
        
        //惠企政策-企业端
        'policyLibrary',//企业端-政策文库
        'policydetails',//企业端-政策文库-文件详情
        'project',//企业端-项目申报
        'projectdeclarate',//企业端-申报指南
        'declaration',//企业端-申报公示
        'declaradetails',//企业端-公示详情
        'personalCenter',//个人中心
        "companycenter",//企业中心

        // 问题反馈
        'questionList', //问题列表 
        'questionFeedbackDetail', //问题反馈详情


        //企业档案
        'entDetail',        //企业详情
        'feedBackDetail',         //问题反馈详情

        //直报中心 
        'companySelfCore', //企业自核
        'companyPaperDetail', //企业直报详情
    ],
}
