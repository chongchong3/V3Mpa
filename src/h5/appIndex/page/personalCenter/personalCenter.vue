<template>
    <div class="main-conment">
        <div class="text-conment">
            <div class="main-table" v-for="item in list" :key="item.id">
                <div>{{ item.name }}</div>
                <div class="table-key">{{ setdata[item.key] }}</div>
            </div>
            <span class="change-pho" @click="changPho">修改 ></span>
            <span class="change-pwd" @click="changPwd">修改 ></span>
        </div>
        <van-button size="large" type="info" class="log-out"> 退出登录</van-button>
    </div>
</template>
<script>
import { userCenter } from "@api/h5/personalCenter";
export default {
    data() {
        return {
            setdata: [],
            list: [
                { name: "账号", key: "username" },
                { name: "单位名称", key: "name" },
                { name: "绑定手机号", key: "phone" },
                { name: "密码", key: "pwd" }
            ]
        };
    },
    created() {
        this._pageInit();
    },
    methods: {
        _pageInit() {
            userCenter().then(res => {
                if (res.code == 0) {
                    this.setdata = res.data;
                } else {
                    this.$notify(res.msg);
                }
            });
        },


        //退出登录按钮
        logOut() {
            localStorage.clear();
            location.href = localStorage.getItem('loginUrl');
            //  window.location.href=""
        },
        //点击跳转修改手机号码界面
        changPho() {
            this.$router.push({ name: "editMobile" });
        },
        //点击跳转修改密码界面
        changPwd() {
            this.$router.push({ name: "editPassword" });
        }
    }
};
</script>
<style lang="less" scoped='scoped'>
// less已使用px2rem，直接使用375适配的px就行
.main-conment {
    height: 100vh;
    position: relative;
    .text-conment {
        font-size: 14px;
        padding: 0.2rem 0.25rem;
        position: relative;
        .main-table {
            border-radius: 0.04rem;
            background-color: #fff;
            -webkit-box-shadow: 0 1px 4px 2px hsla(0, 0%, 80%, 0.5);
            box-shadow: 0 1px 4px 2px hsla(0, 0%, 80%, 0.5);
            display: flex;
            justify-content: space-between;

            div {
                padding: 10px 15px;
            }
            .table-key {
                color: #999;
                font-family: PingFangSC-Semibold;
            }
        }
        .change-pho {
            color: #999;
            position: absolute;
            right: 5%;
            bottom: 33%;
        }
        .change-pwd {
            color: #999;
            position: absolute;
            right: 5%;
            bottom: 11%;
        }
    }
    .log-out {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
    }
}
</style>