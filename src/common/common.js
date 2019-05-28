/**
 * 单页应用的页面切换，需要配合特定的html格式实现
 * @param id
 */

import getLocalStorage from "./utils/getLocalStorage";
import setLocalStorage from "./utils/setLocalStorage";

//获取当前平台的url集合
let tree =JSON.parse(getLocalStorage("curl"));

window.jumpUrl = tree?tree:[];

let arr = window.jumpUrl.filter((v)=>{
    return v.id == 1
})
window.isEntFile = arr.length>0 ? true :false; //是否有档案权限

/**
 * 获取前n年的年份
 * parameter 单位
 */
export const yearRetreat = (n,parameter = '') =>{
    const ny = new Date().getFullYear();
    return new Array(n).fill(1).map((v,i)=>{
        return {
            name :parameter?ny-i+parameter:ny-i,
            id :ny-i
        }
    })
};

/**
 * 获取从fromYear年开始到当前时间的年分
 * parameter 单位
 */
export const yearFromYear = (fromYear, parameter = '') =>{
    const ny = new Date().getFullYear();
    const yearNumber = ny - fromYear + 1;

    return new Array(yearNumber).fill(1).map((v,i)=>{
        return {
            label: parameter?ny-i+parameter:ny-i,
            value: ny-i,
        }
    }).reverse();
};

/**
 * 判断是否在某时间段内
 * parameter 开始和结束时间
 */
export const nowInDateBetwen=(d1,d2)=>{
    //如果时间格式是正确的，那下面这一步转化时间格式就可以不用了
    // var dateBegin = new Date(d1.replace(/-/g, "/"));//将-转化为/，使用new Date
    // var dateEnd = new Date(d2.replace(/-/g, "/"));//将-转化为/，使用new Date
    var dateBegin = new Date(d1);//将-转化为/，使用new Date
    var dateEnd = new Date(d2);//将-转化为/，使用new Date
    var dateNow = new Date();//获取当前时间

    var beginDiff = dateNow.getTime() - dateBegin.getTime();//时间差的毫秒数
    var beginDayDiff = Math.floor(beginDiff / (24 * 3600 * 1000));//计算出相差天数

    var endDiff = dateEnd.getTime() - dateNow.getTime();//时间差的毫秒数
    var endDayDiff = Math.floor(endDiff / (24 * 3600 * 1000));//计算出相差天数
    if (endDayDiff < 0) {//已过期
        // console.log('已过期');
        return false
    }
    if (beginDayDiff < 0) {//没到开始时间
        // console.log('没到开始时间');
        return false;
    }
    return true;
}
// const PDFViewer = new PdfViewer();
export const func =(time1,time2)=>{
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







