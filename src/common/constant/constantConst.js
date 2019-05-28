import { getUrlParam, getLocalStorage } from "@/common/utils/index"; //获取路径名
// import getLocalStorage from "@/common/utils/getLocalStorage.js";
// 持股人图谱变量
export const CHARTCOLOR = {
    //必须传入
    itemBorderColor: "#E8E8E8", // 节点边框的颜色
    itemColor: "#0091FF", // 节点的颜色
    itemFontColor: "#999", // 节点字体的颜色
    itemLineColor: "#ccc", // 节点连线颜色
    itemCrossColor: "#666666", // 节点连线箭头颜色
    itemLineLabelFontColor: "#999", // 节点连线旁边字体颜色
    rootItemColor: "#0050FF", // 根节点的颜色
    rootFontColor: "#999", // 根节点字体的颜色
    stockholderColor: "#ff6600", // 最终持股人图中最终控股人的颜色, 上边文本字体颜色请至.text-start设置
    currentColor: "#0091FF", // 最终持股人图中当前企业的颜色, 上边文本字体颜色请至.text-end设置
    normalNodeColor: "#0091FF" // 其他一般节点的颜色
};

export const COLOR = [
    "#ff7f50",
    "#87cefa",
    "#da70d6",
    "#6495ed",
    "#ff69b4",
    "#ba55d3",
    "#cd5c5c",
    "#ffa500",
    "#40e0d0",
    "#1e90ff",
    "#ff6347",
    "#7b68ee",
    "#00fa9a",
    "#ffd700",
    "#6699FF",
    "#ff6666",
    "#3cb371",
    "#b8860b",
    "#30e0e0"
]


export const enterpriseName = getUrlParam("entName") == undefined ? getLocalStorage('name') : getUrlParam("entName")

//问题反馈
export const handerSta = new Map([
    [1, '待处理'],
    [2, '发起问题'],
    [3, '问题派单'],
    [4, '问题退回'],
    [5, '继续流转'],
    [6, '无法处理'],
    [7, '派单退回'],
    [8, '已解决'],
    [9, '稍后处理'],
    ['deflate', '']
])