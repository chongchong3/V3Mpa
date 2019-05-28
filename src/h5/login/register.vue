<template>
    <div class="reg-wrapper">
        <template v-if="step === 1">
            <section class="reg-module">
                <van-cell-group>
                    <van-field
                        v-model="registerForm.entName"
                        label="企业名称"
                        placeholder="请输入企业名称"
                        :error-message="registerForm_error.entName_error"
                        @blur="
                            checkProp(
                                'entName',
                                registerForm_rules.entName,
                                registerForm
                            )
                        "
                    />
                    <van-field
                        v-model="registerForm.creditCode"
                        label="统一社会信用代码"
                        placeholder="请输入统一社会信用代码"
                        :error-message="registerForm_error.creditCode_error"
                        @blur="
                            checkProp(
                                'creditCode',
                                registerForm_rules.creditCode,
                                registerForm
                            )
                        "
                    />
                    <van-field
                        v-model="registerForm.frName"
                        label="法人名称"
                        placeholder="请输入法人名称"
                        :error-message="registerForm_error.frName_error"
                        @blur="
                            checkProp(
                                'frName',
                                registerForm_rules.frName,
                                registerForm
                            )
                        "
                    />
                </van-cell-group>
            </section>

            <section class="reg-module">
                <van-cell title="营业执照" />

                <div class="flex-wrap" style="margin-top:20px;">
                    <div
                        class="reg-img"
                        v-for="url in fileList"
                        :key="url.ossUrl"
                        :style="{
                            'background-image': 'url(' + url.fileUrl + ')'
                        }"
                    ></div>
                    <van-uploader
                        class="reg-img-add"
                        :after-read="uploadFile"
                        accept="image/gif, image/jpeg, image/png, image/jpg"
                        :max-size="10 * 1024 * 1024"
                    >
                        <van-icon name="photograph" />
                    </van-uploader>
                </div>
            </section>

            <van-button size="large" class="reg_btn-large" @click="certificate"
                >信息认证</van-button
            >
        </template>
        <template v-if="step === 2">
            <section class="reg-module">
                <van-cell-group>
                    <van-field
                        v-model="userInfo.userName"
                        label="用户名"
                        placeholder="请输入用户名"
                        :error-message="userInfoError.userNameError"
                        @blur="
                            checkProp(
                                'userName',
                                userInfoRules.userName,
                                userInfo
                            )
                        "
                    />
                    <van-field
                        v-model="userInfo.phone"
                        label="手机号"
                        placeholder="请输入手机号"
                        :error-message="userInfoError.phoneError"
                        @blur="
                            checkProp('phone', userInfoRules.phone, userInfo)
                        "
                    />
                </van-cell-group>
            </section>

            <section class="reg-module">
                <van-cell-group>
                    <van-field
                        v-model="userInfo.smsCode"
                        label="验证码"
                        placeholder="请输入验证码"
                        :error-message="userInfoError.smsCodeError"
                        @blur="
                            checkProp(
                                'smsCode',
                                userInfoRules.smsCode,
                                userInfo
                            )
                        "
                    >
                        <van-button
                            slot="button"
                            size="small"
                            type="info"
                            @click="getVerifyCode"
                            >{{
                                countDown
                                    ? `${countDown}S后重新获取`
                                    : "发送验证码"
                            }}</van-button
                        >
                    </van-field>
                    <van-field
                        v-model="userInfo.pwd"
                        label="密码"
                        placeholder="请输入密码"
                        :error-message="userInfoError.pwdError"
                        @blur="checkProp('pwd', userInfoRules.pwd, userInfo)"
                    />
                    <van-field
                        v-model="userInfo.againPwd"
                        label="确认密码"
                        placeholder="请再次输入密码"
                        :error-message="userInfoError.againPwdError"
                        @blur="
                            checkProp(
                                'againPwd',
                                userInfoRules.againPwd,
                                userInfo
                            )
                        "
                    />
                </van-cell-group>

                <van-button size="large" class="reg_btn-large" @click="addUser"
                    >创建用户</van-button
                >
            </section>
        </template>
    </div>
</template>

<script>
import { certificate, uploadFile, getVerifyCode, addUser } from "@api/h5/login";
import { checkProp, checkProps } from "@/common/utils/index.js";

export default {
    data() {
        return {
            step: 1,
            timer: null,
            countDown: 0,

            registerForm: {
                entName: "",
                creditCode: "",
                frName: "",
                ossUrl: ""
            },
            fileList: [],
            registerForm_error: {
                entName_error: "",
                creditCode_error: "",
                frName_error: ""
            },
            registerForm_rules: {
                entName: {
                    required: true,
                    cb: flag =>
                        (this.registerForm_error.entName_error = flag
                            ? ""
                            : "请输入企业名称")
                },
                creditCode: {
                    required: true,
                    cb: flag =>
                        (this.registerForm_error.creditCode_error = flag
                            ? ""
                            : "请输入统一社会信用代码")
                },
                frName: {
                    required: true,
                    cb: flag =>
                        (this.registerForm_error.frName_error = flag
                            ? ""
                            : "请输入法人代表")
                }
            },

            userInfo: {
                creditCode: "",
                userName: "",
                phone: "",
                smsCode: "",
                pwd: "",
                againPwd: ""
            },
            userInfoError: {
                userNameError: "",
                phoneError: "",
                smsCodeError: "",
                pwdError: "",
                againPwdError: ""
            },

            userInfoRules: {
                userName: {
                    reg: /^[\S]+$/,
                    cb: flag =>
                        (this.userInfoError.userNameError = flag
                            ? ""
                            : "用户名不能有空格")
                },
                phone: [
                    {
                        required: true,
                        cb: flag =>
                            (this.userInfoError.phoneError = flag
                                ? ""
                                : "请输入手机号")
                    },
                    {
                        reg: /^1[34578][0-9]{9}$/,
                        cb: flag =>
                            (this.userInfoError.phoneError = flag
                                ? ""
                                : "请输入正确格式的手机号")
                    }
                ],
                smsCode: {
                    reg: /^[\S]+$/,
                    cb: flag =>
                        (this.userInfoError.smsCodeError = flag
                            ? ""
                            : "请输入正确格式的验证码")
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

    watch: {
        "registerForm.creditCode": {
            handler(newVal) {
                this.userInfo.creditCode = newVal;
            }
        }
    },

    methods: {
        addUser() {
            if(!checkProps(this.userInfoRules, this.userInfo)) {
                return;
            }

            addUser(this.userInfo).then(res => {
                if (res.code == 0) {
                    this.$toast.success("注册成功");
                    this.$router.push('/');
                } else {
                    this.$notify(res.data);
                }
            });
        },

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

        checkProp,

        getVerifyCode() {
            if (this.countDown) {
                return;
            }

            getVerifyCode({ phone: this.userInfo.phone }).then(res => {
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

        certificate() {
            if (!checkProps(this.registerForm_rules, this.registerForm)) {
                return;
            }
            this.registerForm.ossUrl = this.fileList
                .map(item => item.ossUrl)
                .join(",");
            certificate(this.registerForm).then(res => {
                if (res.code == 0) {
                    this.step++;
                } else {
                    this.$notify(res.data);
                }
            });
        },

        uploadFile(file) {
            let _this = this;
            let fd = new FormData();
            fd.append("file", file.file);
            uploadFile(fd).then(res => {
                if (res.code) {
                    let fileReader = new FileReader();
                    fileReader.addEventListener(
                        "load",
                        function() {
                            _this.fileList.push({
                                fileUrl: this.result,
                                ossUrl: res.data
                            });
                        },
                        false
                    );

                    fileReader.readAsDataURL(file.file);
                } else {
                    this.$notify(res.data);
                }
            });
        }
    }
};
</script>

<style lang="less" scoped>
.reg {
    &-wrapper {
        box-sizing: border-box;
        height: 100vh;
        background-color: #efefef;
        padding: 10px 12px;
    }

    &-module {
        margin-bottom: 20px;
        padding: 15px 20px;
        background-color: #fff;
        box-shadow: 0 1px 4px 2px hsla(0, 0%, 80%, 0.5);
    }

    &-img {
        margin-right: 9px;
        margin-bottom: 9px;
        width: 79px;
        height: 79px;
        background: no-repeat 50%;
        background-size: cover;
    }

    &-img-add {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 9px;
        margin-bottom: 9px;
        width: 79px;
        height: 79px;
        border: 1px solid #ccc;
    }

    &_btn-large {
        position: fixed;
        bottom: 0;
        left: 0;
        background: #1492ff;
        color: #fff;
    }
}
</style>
