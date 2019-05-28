/**
 * 单页应用的页面切换，需要配合特定的html格式实现
 * @param id
 */

// import { getLocalStorage } from "./utils/getLocalStorage";

// //获取当前平台的url集合
// let tree = JSON.parse(getLocalStorage("curl"));

// window.jumpUrl = tree ? tree : [];

// let arr = window.jumpUrl.filter((v) => {
//     return v.id == 1
// })
// window.isEntFile = arr.length > 0 ? true : false; //是否有档案权限

/**
 * 获取前n年的年份
 * parameter 单位
 */
export const yearRetreat = (n, parameter = '') => {
    const ny = new Date().getFullYear();
    return new Array(n).fill(1).map((v, i) => {
        return {
            name: parameter ? ny - i + parameter : ny - i,
            id: ny - i
        }
    })
};

/**
 * 获取从fromYear年开始到当前时间的年分
 * parameter 单位
 */
export const yearFromYear = (fromYear, parameter = '') => {
    const ny = new Date().getFullYear();
    const yearNumber = ny - fromYear + 1;

    return new Array(yearNumber).fill(1).map((v, i) => {
        return {
            label: parameter ? ny - i + parameter : ny - i,
            value: ny - i,
        }
    }).reverse();
};

/**
 * 判断是否在某时间段内
 * parameter 开始和结束时间
 */
export const nowInDateBetwen =(time1,time2)=>{
    if(!time1 || !time2){
        return false;
    } 
    var time = Date.parse( new Date());    
    var date1 = Date.parse(new Date(time1.replace(/-/g, '/')));    
    var date2 = Date.parse(new Date(time2.replace(/-/g, '/')));    
    if (date1<time&&date2>time) {
         return true;			    
    };			    
    return false;
}

/**
 * 转换日期格式
 * @param time 可以标准化的日期
 * @param format 日期格式
 * @returns {*}
 */
export const format = (time,format='yyyy-MM-dd') => {
    if(typeof time === 'string' && time.indexOf('+')>-1 && time.indexOf('T')>-1){
        time = time.substr(0,10);
    }
    const date = new Date(time);
    if(!date.getTime()) return '';
    const o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds(),
        "q+": Math.floor((date.getMonth() + 3) / 3),
        "S": date.getMilliseconds()
    };
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
};



// const PDFViewer = new PdfViewer();
// export const func = (time1, time2) => {
//     if (!time1 || !time2) {
//         return false;
//     }
//     var time = Date.parse(new Date());
//     var date1 = Date.parse(new Date(time1.replace(/-/g, '/')));
//     var date2 = Date.parse(new Date(time2.replace(/-/g, '/')));
//     if (date1 < time && date2 > time) {
//         return true;
//     };
//     return false;
// }





