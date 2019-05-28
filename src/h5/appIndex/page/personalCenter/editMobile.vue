<template>
    <div class="main-conment">
        <div class="num-box">
            <van-field
                v-model="phoneInfo.mobile"
                clearable
                label="手机号"
                :error-message="phoneInfoError.phoneError"
                placeholder="请输入手机号"
                @blur="checkProp('mobile', phoneInfoRules.mobile, phoneInfo)"
            />
            <van-field
                v-model="phoneInfo.smsCode"
                center
                clearable
                label="短信验证码"
                :error-message="phoneInfoError.smsCodeError"
                placeholder="请输入验证码"
                @blur="checkProp('smsCode', phoneInfoRules.smsCode, phoneInfo)"
            >
                <van-button
                    slot="button"
                    size="small"
                    type="info"
                    @click="getVerifyCode"
                >
                    {{ countDown ? `${countDown}S后重新获取` : "发送验证码" }}
                </van-button>
            </van-field>
        </div>
        <!-- <div class="log-out" @click="editNum">
              确认修改
          </div> -->
        <van-button size="large" type="info" class="log-out">
            确认修改</van-button
        >
    </div>
</template>
<script>
import { modifyByPhone, sendSmsCode } from "@api/h5/editMobile";
import { checkProp, checkProps } from "@/common/utils/index";
export default {
    data() {
        return {
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
            }
        };
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
            if (
                !checkProp("mobile", this.phoneInfoRules.mobile, this.phoneInfo)
            ) {
                return;
            }

            sendSmsCode({
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

        //修改手机号
        editNum() {
            if (!checkProps(this.phoneInfoRules, this.phoneInfo)) {
                return;
            }
            modifyByPhone({
                phone: this.phoneInfo.mobile,
                smsCode: this.phoneInfo.smsCode
            }).then(res => {
                if (res.code == "0000") {
                    this.$toast.success("号码修改成功");
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
    div {
        box-shadow: 0 1px 4px 2px hsla(0, 0%, 80%, 0.5);
    }
    .log-out {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
    }
}
</style>