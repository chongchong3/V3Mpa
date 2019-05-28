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
                    <div class="login-body">
                        <div class="login-input">
                            <i class="iconfont icon-yonghu"></i>
                            <input
                                class="user"
                                v-model="userName"
                                type="text"
                                name="username"
                                placeholder="请输入用户名"
                            />
                        </div>
                        <div class="login-input">
                            <i class="iconfont icon-mima"></i>
                            <input
                                class="password"
                                type="password"
                                v-model="password"
                                name="password"
                                placeholder="请输入密码"
                            />
                        </div>
                        <div class="handel-pass">
                            <!--<div class="forget">忘记密码</div>-->
                            <div class="remember">
                                <el-checkbox v-model="isCheck"
                                    >记住密码</el-checkbox
                                >
                                <!-- <input name="get-password" type="checkbox" value class="rem-password">
                <span>记住密码</span>-->
                            </div>
                        </div>
                        <div class="submit-btn" @click="submitBtn">登录</div>
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
    fhwton,
    gotoGovURL,
    setLocalStorage,
    removeLocalStorage
} from "@/common/utils/index.js";

export default {
    data() {
        return {
            SPLIT_STR: "c3e3f79853lfnh43ge",
            UK: "fhwgrji5huh",
            isCheck: false,
            userName: "",
            password: "",
            config: loginMassage
        };
    },
    components: {},
    created() {
        // console.log(loginMassage);
        localStorage.setItem("loginUrl", location.href);
        localStorage.setItem("baseUrl", "gov");
    },
    mounted() {
        setLocalStorage("city", loginMassage.login_name);
        this.keyupSubmit();
    },
    methods: {
        //键盘事件
        keyupSubmit() {
            document.onkeydown = e => {
                let _key = window.event.keyCode;
                if (_key === 13) {
                    this.submitBtn();
                }
            };
        },
        //提交事件
        submitBtn() {
            let params = {
                username: this.userName,
                password: this.password,
                source: 1 //政务端1
            };
            if (this.userName == "") {
                this.$message("登陆名不能为空");
                return;
            } else if (this.password == "") {
                this.$message("密码不能为空");
                return;
            }

            api.login(params).then(res => {
                if (res.code == "0000") {
                    setLocalStorage("token", res.data.token.token);
                    setLocalStorage("curl", res.data.permission);
                    setLocalStorage("username", res.data.username);
                    setLocalStorage("name", res.data.name);
                    setLocalStorage("unitlevel", res.data.unitLevel);
                    setLocalStorage("isAdmin", res.data.isAdmin);
                    this.$store.commit("setAdmin");
                    document.cookie = "token=" + res.data.token.token;
                    this._remPsd(this.userName, this.password, this.isCheck);

                    // debugger;
                    gotoGovURL("index.html");
                } else {
                    this.$message(res.msg);
                }
            });
        },
        //记住密码
        _remPsd(username, password, type) {
            // console.log(username,password,type)
            if (!type) return removeLocalStorage(this.UK);
            setLocalStorage(
                this.UK,
                fhwton(username) + this.SPLIT_STR + fhwton(password)
            );
        }
    }
};
</script>
<style lang="less">
@import "../../common/less/reset.less";
@import "../../assets/font/iconfont.css";
#loginPageOuter {
    background: url("../../assets/back.png") no-repeat;
    display: flex;
    align-items: center;
    height: 100%;
    .body-content {
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
                background: url("../../assets/pc.png") no-repeat center/cover;
            }
        }
        .right-content {
            width: 450px;
            height: 500px;
            border-radius: 4px;
            background: url("../../assets/login-back.png") no-repeat
                center/cover;
            padding: 25px;
            .login {
                height: 450px;
                border-radius: 4px;
                &-title {
                    height: 80px;
                    display: flex;
                    align-items: center;
                    margin-bottom: 10px;
                    .logo {
                        margin: 0 auto;
                        width: 249px;
                        height: 60px;
                        background: url("../../assets/tonglu-login.png")
                            no-repeat center/cover;
                    }
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
                            background: url("../../assets/login-user.png")
                                no-repeat center/cover;
                            background-size: 16px 16px;
                        }
                        &:nth-child(2) .login-icon {
                            background: url("../../assets/login-password.png")
                                no-repeat center/cover;
                            background-size: 16px 16px;
                        }
                        .icon-code {
                            width: 40px;
                            height: 40px;
                            background: url("../../assets/login-user.png")
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
.el-checkbox__label {
    color: hsla(0, 0%, 100%, 0.5);
}
.el-checkbox__input.is-checked + .el-checkbox__label {
    color: hsla(0, 0%, 100%, 0.5);
}
</style>
