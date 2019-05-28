var config = {
    /*桐庐配置项*/
    tl:{
        login:{
            smallTitle:'桐庐县数字经信',
            loginBg:'logo',
        },
        tipBg:'tl-bg',


    },
    /*临海配置项*/
    lh:{
        login: {
            loginBg: 'logo-lh',
            smallTitle: '临海市数字经信',
        },
        tipBg:'lh-bg'

    }
}

/**设定当前配置项**/
var currentConf = 'lh';

var conf = localStorage.getItem("pjtconf");
if(conf != currentConf){
    localStorage.setItem('pjtconf',currentConf);
}else{
    currentConf = conf;
}


$(".small-title").text(config[currentConf].login.smallTitle);
$('.tips-c').addClass(config[currentConf].tipBg);
$(".login-title .logo").addClass(config[currentConf].login.loginBg)
$(".body-content").css("opacity",1);