
<template>
    <div class="common-page-outer loginOuter" id="loginPageOuter">
        <div class="body-content">
            <div class="left-content">
                <div class="small-title">{{ config.title }}</div>
                <div class="title">大数据平台</div>
                <div class="intro">
                    <div>深化"亩均论英雄"改革</div>
                    <div>加快推动高质量发展</div>
                </div>
                <div class="pc"></div>
            </div>
            <div class="right-content">
                <div class="login">
                    <div class="login-title">
                        <div
                            class="logo"
                            :class="`logo_${config.login_name}`"
                        ></div>
                    </div>
                    <div class="login-nav">
                        <div
                            class="navLogin"
                            :class="{ loginOn: index == loginType }"
                            @click="tabCheck(index)"
                            v-for="(item, index) in tabs"
                        >
                            {{ item }}
                        </div>
                    </div>
                    <div class="login-body">
                        <div
                            v-if="!loginType"
                            class="phoneLogin loginCheck phoneBody"
                        >
                            <div class="login-input">
                                <i class="iconfont icon-shouji "></i>
                                <input
                                    class="phone"
                                    v-model.number="phone.mobile"
                                    name="phone"
                                    placeholder="请输入手机号"
                                />
                            </div>
                            <div class="login-input getCode">
                                <div class="login-code">
                                    <i class="iconfont icon-yanzhengma"></i>
                                    <input
                                        class="code"
                                        v-model.number="phone.smsCode"
                                        name="code"
                                        placeholder="请输入验证码"
                                    />
                                </div>
                                <button
                                    v-if="idCode"
                                    class="btn btn-code"
                                    @click="_getCode"
                                >
                                    获取验证码
                                </button>
                                <button
                                    v-else="idCode"
                                    class="btn btn-code"
                                    disabled
                                >
                                    {{ countDown }}后重新获取
                                </button>
                            </div>
                            <div class="handel-pass">
                                <div class="register" @click="gototRegister">
                                    企业用户注册
                                </div>
                            </div>
                            <div
                                @click="phoneLogin"
                                class="submit-btn phoneSubmit"
                            >
                                登录
                            </div>
                        </div>
                        <div v-if="loginType" class="phoneLogin  userBody">
                            <div class="login-input">
                                <i class="iconfont icon-yonghu"></i>
                                <input
                                    class="user"
                                    v-model="account.username"
                                    type="text"
                                    name="username"
                                    placeholder="请输入用户名"
                                />
                            </div>

                            <div class="login-input">
                                <i class="iconfont icon-mima"></i>
                                <input
                                    class="password"
                                    v-model="account.password"
                                    type="password"
                                    name="password"
                                    placeholder="请输入密码"
                                />
                            </div>

                            <div class="handel-pass">
                                <!--<div class="register">企业用户注册</div>-->
                                <div class="remember">
                                    <el-checkbox
                                        v-model="isCheck"
                                    ></el-checkbox>
                                    <span>记住密码</span>
                                </div>
                            </div>
                            <div
                                class="submit-btn userSubmit"
                                @click="accountLogin"
                            >
                                登录
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import loginMassage from "@/common/constant/base.config.js"; //登陆基本配置
import * as api from "@/common/interface/api/login.js"; //登陆接口配置
import {
    gotoEntURL,
    fhwton,
    fhwfroms,
    setLocalStorage,
    removeLocalStorage,
    getLocalStorage,
    checkPhone
} from "@/common/utils/index";

import { mobile, sendSmsCodeForLogin } from "@api/ent/login.js";

export default {
    data() {
        return {
            SPLIT_STR: "c3e3f79853lfnh43ge",
            UK: "fhwgrji5huh",
            isCheck: false,
            config: loginMassage,
            loginType: 0,
            tabs: ["手机号登录", "账号登录"],
            resetData: {
                check: false
            },
            param: {},
            account: {
                username: "",
                password: "",
                source: 2
            },
            phone: {
                mobile: "",
                smsCode: ""
            },
            countDown: 60,
            idCode: true
        };
    },
    created() {
        this._getPsd();
        localStorage.setItem("loginUrl", location.href);
        localStorage.setItem("baseUrl", 'ent');
    },

    methods: {
        tabCheck(index) {
            this.loginType = index;
        },
        _remPsd(username, password, type) {
            if (!type) return removeLocalStorage(this.UK);
            setLocalStorage(
                this.UK,
                fhwton(username) + this.SPLIT_STR + fhwton(password)
            );
        },
        _getPsd() {
            const str = getLocalStorage(this.UK) || "";
            const u = str.split(this.SPLIT_STR)[0];
            const p = str.split(this.SPLIT_STR)[1];

            if (u && p) {
                this.account.username = fhwfroms(u);
                this.account.password = fhwfroms(p);
                this.isCheck = true;
            }
        },
        accountLogin() {
            if (!this.account.username || !this.account.password) {
                this.$message.error("请输入用户名或者密码");
                return;
            }
            api.login(this.account).then(res => {
                if (res.code == "0000") {
                    setLocalStorage("token", res.data.token.token);
                    setLocalStorage("curl", res.data.permission);
                    setLocalStorage("username", res.data.username);
                    setLocalStorage("name", res.data.name);
                    setLocalStorage("unitlevel", res.data.unitLevel);
                    setLocalStorage("isAdmin", res.data.isAdmin);
                    gotoEntURL("index.html");
                } else {
                    this.$message.error(res.data.loginMsg);
                }
                this._remPsd(
                    this.account.username,
                    this.account.password,
                    this.isCheck
                );
            });
        },
        phoneLogin() {
            if (!this.phone.mobile || !this.phone.smsCode) {
                this.$message.error("请输入手机号或者验证码");
                return;
            }
            mobile(this.phone).then(res => {
                if (res.code == "0000") {
                    setLocalStorage("token", res.data.token.token);
                    setLocalStorage("curl", res.data.permission);
                    setLocalStorage("username", res.data.username);
                    setLocalStorage("name", res.data.name);
                    setLocalStorage("unitlevel", res.data.unitLevel);
                    setLocalStorage("isAdmin", res.data.isAdmin);
                    gotoEntURL("index.html");
                } else {
                    this.$message.error(res.msg);
                }
            });
        },

        _getCode() {
            let that = this;
            if (checkPhone(this.phone.mobile)) {
                sendSmsCodeForLogin({ phone: this.phone.mobile }).then(res => {
                    if (res.code == "0000") {
                        that.idCode = false;
                        this.$message.success(
                            `验证码已成功发送到${this.phone.mobile}，请注意查收`
                        );
                        let yzm = setInterval(function() {
                            that.countDown--;
                            if (that.countDown == 0) {
                                clearInterval(yzm);
                                that.idCode = true;
                                that.countDown = 60;
                            }
                        }, 1000);
                    } else {
                        this.$message.error(res.data.loginMsg);
                    }
                });
            } else {
                this.$message.error("请输入正确的手机号");
            }
        },
        gototRegister() {
            gotoEntURL("register.html");
        }
    },

    mounted() {
        setLocalStorage("city", loginMassage.login_name);
    }
};
</script>

<style lang="less" scoped='scoped'>
html {
    height: 100%;
}
body {
    padding: 0;
    height: 100%;
    .loginOuter {
        display: flex;
        align-items: center;
        height: 100%;
        //background: linear-gradient(to right,#7390FF, #3758E3);
        background: url("~@/assets/back.png") no-repeat center/cover;

        .body-content {
            //position: absolute;
            width: 1139px;
            height: 500px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .left-content {
                width: 480px;
                height: 420px;
                color: #ffffff;
                text-align: justify;
                text-align-last: justify;
                .small-title {
                    height: 40px;
                    line-height: 40px;
                    font-size: 40px;
                }
                .title {
                    height: 84px;
                    line-height: 84px;
                    font-size: 54px;
                }
                .intro {
                    display: flex;
                    justify-content: space-between;
                    height: 20px;
                    line-height: 20px;
                    font-size: 20px;
                    letter-spacing: 1.25px;
                }
                .pc {
                    margin: 0 auto;
                    margin-top: 40px;
                    width: 330px;
                    height: 218px;
                    background: url("~@/assets/pc.png") no-repeat center/cover;
                }
            }
            .right-content {
                width: 450px;
                height: 500px;
                border-radius: 4px;
                background: url("~@/assets/login-back.png") no-repeat
                    center/cover;
                //background: rgba(255, 255, 255, 0.09);
                padding: 25px;
                .login {
                    height: 450px;
                    border-radius: 4px;
                    //background-color: rgba(255, 255, 255, 0.1);
                    //box-shadow: 6px 10px 29px 0px rgba(0, 0, 0, 0.1);
                    &-title {
                        height: 80px;
                        display: flex;
                        align-items: center;
                        //background: #ffffff;
                        margin-bottom: 10px;

                        .logo {
                            margin: 0 auto;
                            width: 249px;
                            height: 60px;
                            //background: url("../../images/tonglu-login.png") no-repeat center/cover;
                        }
                    }
                    &-nav {
                        width: 100%;
                        height: 50px;

                        display: flex;
                        align-items: center;
                        justify-content: space-around;
                        font-size: 18px;
                        color: #fff;
                        margin-bottom: 20px;

                        .navLogin {
                            cursor: pointer;
                        }
                        .loginOn {
                            position: relative;
                            &:before {
                                position: absolute;
                                content: "";
                                width: 100%;
                                height: 2px;
                                background: #fff;
                                left: 0;
                                top: 30px;
                            }
                        }
                    }
                    .loginCheck {
                        display: block !important;
                    }
                    .phoneLogin {
                        //display: none;
                    }
                    &-body {
                        display: flex;
                        flex-direction: column;
                        align-items: center;

                        .login-input {
                            display: flex;
                            width: 320px;
                            height: 42px;
                            border-radius: 2px;
                            background-color: rgba(255, 255, 255, 0.1);
                            border: 1px solid rgba(255, 255, 255, 0.5);
                            i {
                                display: flex;
                                width: 40px;
                                height: 40px;
                                border-right: 1px solid rgba(255, 255, 255, 0.5);
                                font-size: 20px;
                                color: #fff;
                                justify-content: center;
                                align-items: center;
                            }

                            &:nth-child(1) .login-icon {
                                background: url("~@/assets/login-user.png")
                                    no-repeat center/cover;
                                background-size: 16px 16px;
                            }
                            &:nth-child(2) .login-icon {
                                background: url("~@/assets/login-password.png")
                                    no-repeat center/cover;
                                background-size: 16px 16px;
                            }
                            .icon-code {
                                width: 40px;
                                height: 40px;
                                background: url("~@/assets/login-user.png")
                                    no-repeat center/cover;
                                background-size: 16px 16px;
                            }

                            input {
                                //flex: 1;
                                background: transparent;
                                border: none;
                                outline: none;
                                text-indent: 11px;
                                color: #fff;
                                &::-webkit-input-placeholder {
                                    /* WebKit browsers */
                                    color: rgba(255, 255, 255, 0.5);
                                    font-size: 12px;
                                }
                                &::-moz-placeholder {
                                    /* Mozilla Firefox 19+ */
                                    color: rgba(255, 255, 255, 0.5);
                                    font-size: 12px;
                                }
                                &::-ms-input-placeholder {
                                    /* Internet Explorer 10+ */
                                    color: rgba(255, 255, 255, 0.5);
                                    font-size: 12px;
                                }
                            }
                            &:first-child {
                                margin-bottom: 30px;
                            }
                        }
                        .login-code {
                            display: flex;
                            width: 200px;
                            height: 42px;

                            border-radius: 2px;
                            background-color: rgba(255, 255, 255, 0.1);
                            border: 1px solid rgba(255, 255, 255, 0.5);
                            input {
                                width: 150px;
                            }
                        }
                        .getCode {
                            border: none;
                            justify-content: space-between;
                            background: transparent;
                        }
                        .btn-code {
                            outline: none;
                            border: 0;
                            background-color: rgba(255, 255, 255, 0.1);
                            border-radius: 4px;
                            color: #fff;
                            padding: 2px 10px;
                        }
                        .is-cd {
                            padding: 6px 4px;
                        }
                        .register {
                            cursor: pointer;
                            color: #fff;
                        }

                        .handel-pass {
                            margin: 14px 0 50px;
                            width: 320px;
                            display: flex;
                            justify-content: space-between;
                            color: rgba(255, 255, 255, 0.5);
                            font-size: 12px;
                            .remember {
                                cursor: pointer;
                                display: flex;
                                align-items: center;
                            }
                            .forget {
                                cursor: pointer;
                            }
                            input {
                                cursor: pointer;
                                -webkit-appearance: none; //这个属性是将input标签变成一个可修改样式的普通标签，目前有谷歌和火狐浏览器支持
                                -moz-appearance: none;
                                width: 12px;
                                height: 12px;
                                margin: 0px;
                                margin-right: 10px;
                                background-color: transparent;
                                border: 1px solid rgba(255, 255, 255, 0.5);
                                outline: none;
                            }
                            .active {
                                background: url("~@/assets/wr-checked.png")
                                    no-repeat center;
                                background-size: 8px 8px;
                            }
                        }
                        .submit-btn {
                            width: 320px;
                            height: 44px;
                            line-height: 44px;
                            border-radius: 2px;
                            background-color: rgba(255, 255, 255, 0.2);
                            color: white;
                            font-size: 16px;
                            text-align: center;
                            cursor: pointer;
                        }
                    }
                }
            }
        }
    }
    .logo_lh {
        background: url("~@/assets/linghai-login.png") no-repeat 50% / cover;
    }
    .logo_tl {
        background: url("~@/assets/tonglu-login.png") no-repeat 50% / cover;
    }
    .logo_ly {
        background: url("~@/assets/login-logo.png") no-repeat 50% / cover;
    }
}
</style>

