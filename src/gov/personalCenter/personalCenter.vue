<template>
    <BasePage>
        <div class="outers">
            <!-- HTML内容 -->
            <div class="body-content">
                <div class="back">
                    <div class="btn-back" @click="gotoBack"></div>
                </div>
                <div class="accountSet">
                    <div class="head">
                        <div class="title"><span></span>账号设置</div>
                        <div class="btn-xiugai" @click="dialogVisible = true">
                            修改密码
                        </div>
                    </div>
                    <div class="table">
                        <div class="line" v-for="item in listData">
                            <div class="name">{{ item.name }}</div>
                            <div class="content">
                                <div class="value">{{ setdata[item.key] }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <el-dialog
                title="修改密码"
                :visible.sync="dialogVisible"
                width="30%"
            >
                <div class="inputOuter">
                    <span class="is-must">* 新密码</span>
                    <el-input
                        v-model="input"
                        placeholder="请输入新密码"
                    ></el-input>
                </div>
                <div class="inputOuter">
                    <span class="is-must">* 确认新密码</span>
                    <el-input
                        v-model="input1"
                        placeholder="请再次输入新密码"
                    ></el-input>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="editPass"
                        >确 定</el-button
                    >
                </span>
            </el-dialog>
        </div>
    </BasePage>
</template>

<script>
import BasePage from "@/components/BasePage";

import { userCenter, modifyMyPwd } from "@api/gov/personalCenter";

export default {
    data() {
        return {
            listData: [],
            setdata: [],
            input: "",
            input1: "",
            dialogVisible: false,
            list: [
                { name: "账号", key: "username" },
                { name: "手机号", key: "mobile" },
                { name: "角色", key: "roleName" },
                { name: "职位", key: "position" },
                { name: "单位名称", key: "name" },
                { name: "单位级别", key: "unitLevel" }
            ],
            check: false
        };
    },
    created() {
        this._pageInit();
    },

    methods: {
        _pageInit() {
            userCenter().then(res => {
                let that = this;
                let datas = res.data;
                this.setdata = res.data;

                if (res.data.unitLevel == 2) {
                    this.list.push({ name: "乡镇街道", key: "town" });
                } else if (res.data.unitLevel == 3) {
                    this.list.push({
                        name: "统一社会信用代码",
                        key: "creditCode"
                    });
                }

                let bodyContent = this.list
                    .map(function(v) {
                        if (v.key === "unitLevel") {
                            datas[v.key] = that._toUnitLevel(datas[v.key]);
                        }
                        that.listData.push(v);
                    })
                    .join(" ");
            });
        },
        _toUnitLevel(num) {
            switch (num) {
                case 1:
                    return "县级";
                case 2:
                    return "乡镇、街道、经济开发区";
                case 3:
                    return "企业";
                default:
                    return "-";
            }
        },
        editPass() {
            this.checkInput();
            if (!this.check) {
                return;
            }
            modifyMyPwd({ pwd: this.input, againpwd: this.input1 }).then(
                res => {
                    if (res.code == "0000") {
                        this.$message.success("密码重置成功");
                        this.dialogVisible = false;
                    } else {
                        this.$message.error(res.msg);
                    }
                }
            );
        },
        checkInput() {
            if (!this.input || this.input.length === 0) {
                this.$message.warning("请输入新密码");
                return;
            }
            if (!this.input1 || this.input1.length === 0) {
                this.$message.warning("请再次输入新密码");
                return;
            }
            if (this.input != this.input1) {
                this.$message.warning("两次密码不一致");
                return;
            }
            this.check = true;
        },
        gotoBack() {
            history.back(-1);
        }
    },
    components: {
        BasePage
    }
};
</script>

<style lang="less" scoped>
@import "../../common/less/reset.less";
.inputOuter {
    width: 60%;
    margin: 20px auto;
}
html {
    height: 100%;
}
body {
    padding: 0;
    height: 100%;
    .outers {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .body-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 500px;
        width: 1200px;
        .back {
            width: 350px;
            .btn-back {
                width: 63px;
                height: 63px;
                margin: 0 auto;
                background: url("~@/assets/back-btn.png") no-repeat center/cover;
            }
        }
        .accountSet {
            width: 1045px;
            height: 470px;
            border-radius: 3px;
            border: 1px solid #ddd;
            padding: 30px 0 0 100px;
            .head {
                width: 560px;
                height: 40px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .title {
                    display: flex;
                    align-items: center;
                    span {
                        display: inline-block;
                        width: 5px;
                        height: 16px;
                        background: #5f7ceb;
                        margin-right: 12px;
                    }
                }
                .btn-xiugai {
                    cursor: pointer;
                    width: 70px;
                    height: 21px;
                    line-height: 21px;
                    text-align: center;
                    border-radius: 3px;
                    background: #5f7ceb;
                    color: #ffffff;
                }
            }
            .table {
                margin-top: 15px;
                .line {
                    display: flex;
                    flex-wrap: wrap;
                    width: 520px;
                    & > div {
                        height: 30px;
                        line-height: 30px;
                        width: 258px;
                        text-align: center;
                        border: 1px solid #ddd;
                        border-bottom: none;
                    }
                    & > div:first-child {
                        border-right: none;
                        background: #f5f5f5;
                        color: #999;
                    }
                    &:last-child > div {
                        border-bottom: 1px solid #ddd;
                    }
                }
            }
        }
    }
}
</style>
