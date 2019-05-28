<template>
    <BasePage>
        <section class="wrapper content-container-outer">
            <!-- HTML内容 -->
            <div class="flex-between" style="align-items:flex-start">
                <el-form :label-width="labelWidth" inline>
                    <el-form-item label="角色">
                        <el-select v-model="filters.roleId">
                            <el-option
                                v-for="role in filterRoleList"
                                :key="role.id"
                                :value="role.id"
                                :label="role.name"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="活动区域" prop="region">
                        <el-input
                            placeholder="请输入账号、单位名称"
                            v-model="filters.username"
                            clearable
                            suffix-icon="el-icon-search"
                        >
                        </el-input>
                    </el-form-item>
                </el-form>

                <el-button
                    icon="el-icon-plus"
                    type="primary"
                    @click="showAccountDialog(0)"
                    >创建账号</el-button
                >
            </div>

            <el-table :data="userList" style="width: 100%" height="100%">
                <el-table-column type="index" align="center" label="序号">
                </el-table-column>
                <el-table-column
                    prop="username"
                    align="center"
                    label="账号"
                    min-width="150"
                >
                </el-table-column>
                <el-table-column
                    prop="name"
                    align="center"
                    label="单位名称"
                    min-width="120"
                >
                </el-table-column>
                <el-table-column
                    prop="mobile"
                    align="center"
                    label="手机号"
                    min-width="120"
                >
                </el-table-column>
                <el-table-column
                    prop="roleName"
                    align="center"
                    label="角色"
                    min-width="120"
                >
                </el-table-column>
                <el-table-column
                    prop="address"
                    align="center"
                    label="操作"
                    min-width="300"
                >
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            @click="showAccountDialog(1, scope)"
                            >修改</el-button
                        >
                        <el-button type="text" @click="showResetDialog(scope)"
                            >重置密码</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>

            <div class="flex-center">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="total"
                    :page-size="filters.pageSize"
                    :current-page.sync="filters.pageNum"
                >
                </el-pagination>
            </div>
        </section>

        <!-- 重置密码表单 -->
        <el-dialog title="重置密码" :visible.sync="showReset">
            <el-form
                :model="pwdObj"
                status-icon
                :rules="pwdRules"
                ref="pwdForm"
                label-width="150px"
            >
                <el-form-item label="新密码" prop="pwd">
                    <el-input
                        v-model="pwdObj.pwd"
                        placeholder="请输入新密码"
                    ></el-input>
                </el-form-item>
                <el-form-item label="确认新密码" prop="againpwd">
                    <el-input
                        v-model="pwdObj.againpwd"
                        placeholder="请再次输入新密码"
                    ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showReset = false">取 消</el-button>
                <el-button type="primary" @click="resetPwd">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 新增修改角色表单 -->
        <el-dialog
            :title="formTypeArr[formType] + '账号'"
            :visible.sync="showAccount"
            width="900px"
            center
            class="account_form"
        >
            <el-form
                inline
                ref="form"
                :model="currentRow"
                :rules="rules"
                :label-width="labelWidth_form"
            >
                <el-form-item label="账号" prop="username">
                    <el-input
                        v-model="currentRow.username"
                        placeholder="请输入账号"
                    ></el-input>
                </el-form-item>

                <el-form-item label="密码" prop="password" v-if="!formType">
                    <el-input
                        v-model="currentRow.password"
                        placeholder="请输入密码"
                    ></el-input>
                </el-form-item>

                <el-form-item label="手机号" prop="mobile">
                    <el-input
                        v-model="currentRow.mobile"
                        placeholder="请输入手机号"
                    ></el-input>
                </el-form-item>

                <el-form-item label="单位名称" prop="name">
                    <el-input
                        v-model="currentRow.name"
                        placeholder="请输入单位名称"
                    ></el-input>
                </el-form-item>

                <div>
                    <el-form-item label="单位级别" prop="unitLevel">
                        <el-select
                            v-model="currentRow.unitLevel"
                            placeholder="请选择单位级别"
                        >
                            <el-option
                                v-for="unitLevel in unitLevelList"
                                :key="unitLevel.id"
                                :label="unitLevel.name"
                                :value="unitLevel.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item
                        label="乡镇街道"
                        v-if="currentRow.unitLevel == 2"
                    >
                        <el-select
                            v-model="currentRow.town"
                            palceholder="请选择乡镇街道"
                        >
                            <el-option
                                v-for="area in areaList"
                                :key="area.id"
                                :value="area.town"
                            ></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item
                        label="统一社会信用代码"
                        v-if="currentRow.unitLevel == 3"
                    >
                        <el-input
                            v-model="currentRow.creditCode"
                            placeholder="请输入统一社会信用代码"
                        ></el-input>
                    </el-form-item>
                </div>

                <el-form-item label="状态" prop="status">
                    <el-select
                        v-model="currentRow.status"
                        placeholder="请选择状态"
                    >
                        <el-option
                            v-for="status in statusList"
                            :key="status.value"
                            :label="status.label"
                            :value="status.value"
                        ></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="角色" prop="roleId">
                    <el-select
                        v-model="currentRow.roleId"
                        placeholder="请选择角色"
                    >
                        <el-option
                            v-for="role in roleList"
                            :key="role.id"
                            :value="role.id"
                            :label="role.name"
                        ></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="职位" prop="position">
                    <el-input
                        v-model="currentRow.position"
                        placeholder="请输入职位"
                    ></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="showAccount = false">取 消</el-button>
                <el-button type="primary" @click="submitUser">确 定</el-button>
            </span>
        </el-dialog>
    </BasePage>
</template>

<script>
import BasePage from "@/components/BasePage";

import {
    getArea,
    getUserList,
    getRole,
    addUser,
    modifyUser,
    modifyPwd
} from "@api/gov/accountSet";

import { notEmpty, noBlank, isPhone } from "@/common/helpers/rules";

export default {
    data() {
        return {
            labelWidth: "80px",

            total: 0,
            filters: {
                pageNum: 1,
                pageSize: 10,
                username: "",
                roleId: ""
            },
            areaList: [],
            filterRoleList: [],
            roleList: [],
            userList: [],

            // 0 => 增加 1 => 编辑
            labelWidth_form: "150px",
            formType: 0,
            formTypeArr: ["新增", "编辑"],
            currentRow: {},
            pwdObj: {
                userId: "",
                pwd: "",
                againpwd: ""
            },
            rules: {
                username: [notEmpty("账号"), noBlank()],
                password: [notEmpty("密码"), noBlank()],
                name: [notEmpty("单位名称")],
                mobile: [notEmpty("手机号"), isPhone()],
                unitLevel: [notEmpty("单位级别")],
                status: [notEmpty("状态")],
                roleId: [notEmpty("角色")]
            },
            pwdRules: {
                pwd: [notEmpty("密码"), noBlank()],
                againpwd: [
                    notEmpty("密码"),
                    noBlank(),
                    {
                        validator: (rule, value, callback) => {
                            if (this.pwdObj.pwd !== value) {
                                callback(new Error("两次密码不一致"));
                            } else {
                                callback();
                            }
                        },
                        trigger: "blur"
                    }
                ]
            },
            showAccount: false,
            showReset: false,
            unitLevelList: [
                { id: 1, name: "县级", rank: 1 },
                { id: 2, name: "乡镇、街道、经济开发区", rank: 1 },
                { id: 3, name: "企业", rank: 2 }
            ],
            statusList: [
                { label: "有效", value: 1 },
                { label: "无效", value: 0 }
            ]
        };
    },

    watch: {
        filters: {
            handler(newVal, oldVal) {
                this.getFilterData();
            },
            deep: true
        }
    },

    created() {
        this.getFilterData();
        getArea().then(res => {
            if (res.code == 0) {
                this.areaList = res.data;
            } else {
                this.$message.error(res.msg);
            }
        });

        getRole().then(res => {
            if (res.code == 0) {
                this.filterRoleList = [
                    { id: "", name: "全部角色" },
                    ...res.data
                ];
                this.roleList = res.data;
            } else {
                this.$message.error(res.msg);
            }
        });
    },

    methods: {
        initUser() {
            this.currentRow = {
                username: "",
                password: "",
                name: "",
                mobile: "",
                unitLevel: "",
                status: "",
                roleId: "",
                position: "",
                // 单位为区县级的时候
                town: "",
                // 单位为企业的时候
                creditCode: ""
            };
        },

        resetPwd() {
            this.$refs["pwdForm"].validate(valid => {
                if (valid) {
                    modifyPwd(this.pwdObj).then(res => {
                        if (res.code == 0) {
                            this.showReset = false;
                            this.$message.success(res.data);
                        } else {
                            this.$message.error(res.data);
                        }
                    });
                }
            });
        },

        submitUser() {
            // type = 0 添加; type = 1修改
            this.$refs["form"].validate(valid => {
                if (valid) {
                    let reqFunc;
                    if (this.formType) {
                        reqFunc = modifyUser;
                    } else {
                        reqFunc = addUser;
                    }

                    reqFunc(this.currentRow).then(res => {
                        if (res.code == 0) {
                            if (this.formType) {
                                this.$message.success("修改账号成功");
                            } else {
                                this.$message.success("新增账号成功");
                            }
                            this.showAccount = false;
                            this.getFilterData();
                        } else {
                            this.$message.error(res.data);
                        }
                    });
                }
            });
        },

        showAccountDialog(type, { row } = {}) {
            this.showAccount = true;
            this.formType = type;
            if (type) {
                this.currentRow = row;
            } else {
                this.initUser();
            }
        },

        showResetDialog({ row }) {
            this.showReset = true;
            this.pwdObj.userId = row.id;
        },

        getFilterData() {
            getUserList(this.filters).then(res => {
                if (res.code == 0) {
                    this.userList = res.data.results;
                    this.total = res.data.totalRecord;
                } else {
                    this.$message.error(res.msg);
                }
            });
        }
    },
    components: {
        BasePage
    }
};
</script>

<style lang="less" scoped>
@import "../../common/less/reset.less";

.account_form .el-input {
    width: 212px;
}
</style>
