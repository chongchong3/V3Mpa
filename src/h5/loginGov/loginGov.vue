<template>
    <div class="wrapper">
        <div class="login-tit">
            <div>您好</div>
            <div>欢迎来到临海政企服务通</div>
        </div>

        <div class="login-phone userBody">
            <van-field
                v-model="userInfo.username"
                required
                clearable
                label="用户名"
                placeholder="请输入用户名"
            />

            <van-field
                v-model="userInfo.password"
                type="password"
                label="密码"
                placeholder="请输入密码"
                required
            />
        </div>

        <div class="flex-center">
            <van-button size="normal" round class="login-button" @click="login"
                >登录</van-button
            >
        </div>
    </div>
</template>
<script>
import { login } from "@api/h5/loginGov";
import { gotoH5URL } from "@/common/utils/index";
export default {
    data() {
        return {
            userInfo: {
                username: "",
                password: "",
                source: 1
            }
        };
    },
    created() {
        localStorage.setItem("source", this.userInfo.source);
        localStorage.setItem("loginUrl", location.href);
    },
    methods: {
        login() {
            login(this.userInfo).then(res => {
                if (res.code == 0) {
                    localStorage.setItem("token",res.data.token.token);
                    localStorage.setItem('curl',res.data.permission);
                    localStorage.setItem('username',res.data.username);
                    localStorage.setItem('name',res.data.name);

                    gotoH5URL("appIndex.html");
                } else {
                    this.$notify(res.msg);
                }
            });
        }
    }
};
</script>
<style lang="less" scoped='scoped'>
.wrapper {
    box-sizing: border-box;
    height: 100vh;
    padding: 20px 27.5px;
    background: url("../../assets/h5-loginbg.png") no-repeat center/cover;
    .login-tit {
        font-size: 24px;
        margin: 70px 0;
        color: #fff;
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
}
</style>