<template>
    <div class="wrapper">
        <div class="login-tit">
            <div>您好</div>
            <div>欢迎来到临海政企服务通</div>
        </div>

        <div class="login_nav" @click="toggleLogin">
            <div
                class="login_nav-item"
                :class="loginType === 0 ? 'login_nav-checked' : ''"
            >
                手机
            </div>
            <div
                class="login_nav-item"
                :class="loginType === 1 ? 'login_nav-checked' : ''"
            >
                账号
            </div>
        </div>

        <section v-if="loginType === 0" key="phone">
            <div class="login-phone userBody">
                <van-field
                    v-model="phoneInfo.mobile"
                    clearable
                    label="手机号"
                    :error-message="phoneInfoError.phoneError"
                    placeholder="请输入手机号"
                    @blur="
                        checkProp('mobile', phoneInfoRules.mobile, phoneInfo)
                    "
                />

                <van-field
                    v-model="phoneInfo.smsCode"
                    label="验证码"
                    placeholder="请输入验证码"
                    :error-message="phoneInfoError.smsCodeError"
                    @blur="
                        checkProp('smsCode', phoneInfoRules.smsCode, phoneInfo)
                    "
                >
                    <van-button
                        slot="button"
                        size="small"
                        type="info"
                        @click="getVerifyCode"
                        >{{
                            countDown ? `${countDown}S后重新获取` : "发送验证码"
                        }}</van-button
                    ></van-field
                >
            </div>

            <div class="flex-center">
                <van-button
                    size="normal"
                    round
                    class="login-button"
                    @click="mobileLogin"
                    >登录</van-button
                >
            </div>
        </section>

        <section v-else-if="loginType === 1" key="username">
            <div class="login-phone userBody">
                <van-field
                    v-model="userInfo.username"
                    clearable
                    label="用户名"
                    placeholder="请输入用户名"
                    :error-message="userInfoError.username"
                    @blur="
                        checkProp('username', userInfoRules.username, userInfo)
                    "
                />

                <van-field
                    v-model="userInfo.password"
                    type="password"
                    label="密码"
                    placeholder="请输入密码"
                    :error-message="userInfoError.password"
                    @blur="
                        checkProp('password', userInfoRules.password, userInfo)
                    "
                />
            </div>

            <div class="flex-center">
                <van-button
                    size="normal"
                    round
                    class="login-button"
                    @click="login"
                    >登录</van-button
                >
            </div>
        </section>

        <div class="login-register">
            <span @click="$router.push('/register')">
                企业账户注册
            </span>
        </div>
    </div>
</template>
<script>
import { login, mobileLogin, getVerifyCode } from "@api/h5/login";
import { checkProp, checkProps, gotoH5URL } from "@/common/utils/index";
// import { checkProp, checkProps } from "@/common/utils/vant_check";
// import { gotoH5URL } from "@/common/utils/util";

export default {
    data() {
        return {
            loginType: 0,

            timer: null,
            countDown: 0,

            phoneInfo: {
                mobile: "",
                smsCode: ""
            },
            phoneInfoError: {
                phoneError: "",
                smsCodeError: ""
            },

            phoneInfoRules: {
                mobile: [
                    {
                        required: true,
                        cb: flag =>
                            (this.phoneInfoError.phoneError = flag
                                ? ""
                                : "请输入手机号")
                    },
                    {
                        reg: /^1[34578][0-9]{9}$/,
                        cb: flag =>
                            (this.phoneInfoError.phoneError = flag
                                ? ""
                                : "请输入正确格式的手机号")
                    }
                ],
                smsCode: {
                    required: true,
                    cb: flag =>
                        (this.phoneInfoError.smsCodeError = flag
                            ? ""
                            : "请输入验证码")
                }
            },

            userInfo: {
                username: "",
                password: "",
                source: 2
            },
            userInfoError: {
                username: "",
                password: ""
            },
            userInfoRules: {
                username: {
                    required: true,
                    cb: v =>
                        (this.userInfoError.username = v ? "" : "请输入用户名")
                },
                password: {
                    required: true,
                    cb: v =>
                        (this.userInfoError.password = v ? "" : "请输入密码")
                }
            }
        };
    },
    created() {
        localStorage.setItem("loginUrl", location.href);
    },
    methods: {
        checkProp,

        countDownStart(cb, val, wait) {
            this.timer = setTimeout(() => {
                if (~--val) {
                    cb();
                    this.countDownStart(cb, val, wait);
                } else {
                    this.timer = null;
                }
            }, wait);
        },

        getVerifyCode() {
            if (!checkProps(this.phoneInfoRules, this.phoneInfo)) {
                return;
            }

            getVerifyCode({
                phone: this.phoneInfo.mobile
            }).then(res => {
                if (res.code == 0) {
                    this.$toast.success("已发送验证码");
                    this.countDownStart(
                        () => this.countDown--,
                        (this.countDown = 60),
                        1000
                    );
                } else {
                    this.$notify(res.data);
                }
            });
        },

        toggleLogin() {
            this.loginType = +!this.loginType;
        },

        requestCallBack(data) {
            localStorage.setItem("token", data.token.token);
            localStorage.setItem("curl", data.permission);
            localStorage.setItem("username", data.username);
            localStorage.setItem("name", data.name);
            localStorage.setItem("firstLogin", data.first_login);
            localStorage.setItem("source", 2);
            if (data.first_login) {
                gotoH5URL(`appIndex.html`);
            } else {
                gotoH5URL(`personalCenter.html`);
            }
        },

        mobileLogin() {
            if (!checkProps(this.phoneInfoRules, this.phoneInfo)) {
                return;
            }

            mobileLogin(this.phoneInfo).then(res => {
                if (res.code == 0) {
                    this.requestCallBack(res.data);
                } else {
                    this.$notify(res.data.loginMsg);
                }
            });
        },
        login() {
            if (!checkProps(this.userInfoRules, this.userInfo)) {
                return;
            }

            login(this.userInfo).then(res => {
                if (res.code == 0) {
                    this.requestCallBack(res.data);
                } else {
                    this.$notify(res.data.loginMsg);
                }
            });
        }
    }
};
</script>
<style lang="less" scoped='scoped'>
.wrapper {
    position: relative;
    box-sizing: border-box;
    height: 100vh;
    padding: 20px 27.5px;
    background: url("../../assets/h5-loginbg.png") no-repeat center/cover;
    .login-tit {
        font-size: 24px;
        margin: 70px 0;
        color: #fff;
    }

    .login_nav {
        display: flex;
        font-size: 14px;
        width: 90px;
        border-radius: 23px;
        background-color: #a5d5ff;
        height: 26px;
        line-height: 26px;
        &-item {
            flex: 1;
            height: 100%;

            text-align: center;
            color: #fff;
        }
        &-checked {
            background: #fff;
            color: #1e96ff;
            font-weight: 500;
            border-radius: 20px;
        }
    }

    .login-phone {
        margin-top: 60px;
        height: 94px;
        padding: 20px 25px;
        background-color: #fff;
        border-radius: 20px;
        box-shadow: 0 1px 19px 0 rgba(150, 206, 255, 0.3);
    }

    .login-button {
        margin-top: 50px;
        width: 250px;
        font-size: 16px;
        font-weight: 600;
        color: #fff;
        box-shadow: 0 10px 15px 1px rgba(44, 196, 249, 0.26);
        background: linear-gradient(90deg, #42cfff, #4098ff);
    }

    .login-register {
        position: absolute;
        width: 100%;
        text-align: center;
        left: 0;
        bottom: 20px;
        font-size: 12px;
        text-align: center;
        color: rgb(30, 150, 255);
    }
}
</style>