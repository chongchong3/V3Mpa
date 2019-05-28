// 表单验证方式，提示文案统一

// 非空，必填
export const notEmpty = (str) => ({ required: true, message: "请输入" + str, trigger: "blur" });

// 不能有空格
export const noBlank = () => ({ pattern: /^(\S)+$/, message: "不能有空格", trigger: "blur" })

// 必须为数字
export const isNumber = (min, max) => {
    let reg = new RegExp(`^(\d){${min},${max}}$`);
    return ({ pattern: /^(\d){}$/, message: `必须为${min}至${max}的数字`, trigger: "blur" })
}

// 手机号
export const isPhone = () => ({ pattern: /^1[34578]\d{9}$/, message: "不是合法的手机号", trigger: "blur" })

// 链接
export const isHttp = (str) => ({  required: true, pattern:/^(http|https)\S*/, message: "开头必须是http或者https", trigger: "blur" })

