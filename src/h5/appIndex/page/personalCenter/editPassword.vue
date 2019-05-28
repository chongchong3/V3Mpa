<template>
    <div class="main-conment">
        <div class="num-box">
            <van-field
                v-model="userInfo.oldPwd"
                label="旧密码"
                placeholder="请输入旧密码"
                :error-message="userInfoError.oldPwdError"
                @blur="checkProp('oldPwd', userInfoRules.oldPwd, userInfo)"
            />
            <van-field
                v-model="userInfo.pwd"
                label="新密码"
                placeholder="请输入密码"
                :error-message="userInfoError.pwdError"
                @blur="checkProp('pwd', userInfoRules.pwd, userInfo)"
            />
            <van-field
                v-model="userInfo.againPwd"
                label="确认密码"
                placeholder="请再次输入密码"
                :error-message="userInfoError.againPwdError"
                @blur="checkProp('againPwd', userInfoRules.againPwd, userInfo)"
            />   
        </div>
        <van-button size="large" type="info" class="queren-change"> 确认修改</van-button>
    </div>
</template>
<script>
import { modifyMyPwd } from "@api/h5/editPassword";
import { checkProp, checkProps } from "@/common/utils/index";
export default {
    data() {
        return {
            userInfo: {
                oldPwd: "",
                pwd: "",
                againPwd: ""
            },
            userInfoError: {
                oldPwdError: "",
                pwdError: "",
                againPwdError: ""
            },
            userInfoRules: {
                oldPwd: {
                    reg: /^[\S]{6,16}$/,
                    cb: flag =>
                        (this.userInfoError.oldPwdError = flag
                            ? ""
                            : "请输入正确的旧密码")
                },
                pwd: [
                    {
                        reg: /^[\S]{6,16}$/,
                        cb: flag =>
                            (this.userInfoError.pwdError = flag
                                ? ""
                                : "密码为6至16位的非空格组成")
                    },
                    {
                        validator(value, obj) {
                            return value === obj.againPwd;
                        },
                        cb: flag =>
                            (this.userInfoError.againPwdError = flag
                                ? ""
                                : "两次密码输入不相同")
                    }
                ],
                againPwd: {
                    validator(value, obj) {
                        return value === obj.pwd;
                    },
                    cb: flag =>
                        (this.userInfoError.againPwdError = flag
                            ? ""
                            : "两次密码输入不相同")
                }
            }
        };
    },
    methods: {
        checkProp,
        changePwd() {
            if (!checkProps(this.userInfoRules, this.userInfo)) {
                return;
            }

            modifyMyPwd({
                oldPwd: this.userInfo.oldPwd,
                pwd: this.userInfo.pwd,
                againpwd: this.userInfo.againPwd
            }).then(res => {
                if (res.code == "0000") {
                    this.$toast.success("密码重置成功");
                    history.back(-1);
                } else {
                    this.$notify(res.msg);
                }
            });
        }
    }
};
</script>
<style lang="less" scoped='scoped'>
// less已使用px2rem，直接使用375适配的px就行
.main-conment {
    height: 100vh;
    position: relative;
    div{
        box-shadow: 0 1px 4px 2px hsla(0, 0%, 80%, 0.5);
    }
    .queren-change {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
    }
}
</style>