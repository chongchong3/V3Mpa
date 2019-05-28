<template>
    <div class="wrapper content-container-outer">
        <div>      

            <el-button
                type="primary"
                icon="el-icon-plus"
                class="float-right"
                style="margin-right:20px;"
                @click="routerToAddRouter"
            >
                新增角色
            </el-button>

            <el-input
                placeholder="请输入角色名称"
                v-model="filters.name"
                style="width:450px;margin-right:20px;"
                class="float-right"
            >
                <el-button
                    slot="append"
                    icon="el-icon-search"
                    type="primary"
                    @click="getRoleList"
                    >搜索</el-button
                >
            </el-input>
        </div>

        <div class="card-list">
            <card
                v-for="(roleSet, idx) in roleSetList"
                :key="roleSet.id"
                class=""
            >
                <div slot="view">
                    <div class="card-img">
                        {{ roleSet.name.slice(0, 1) }}
                    </div>
                    <div class="card-title">{{ roleSet.name }}</div>
                    <div class="card-des">{{ roleSet.description }}</div>
                </div>

                <template slot="modal">
                    <div
                        class="btn primary"
                        style="margin-right: 10px;"
                        @click="routerToAddRouter(roleSet.id)"
                    >
                        <i class="el-icon-edit-outline"></i>
                        编辑
                    </div>

                    <el-popover
                        placement="top-start"
                        title="提示"
                        width="200"
                        trigger="click"
                    >
                        <p>确定删除吗？</p>
                        <div style="text-align: right; margin: 0">
                            <el-button size="mini" type="text">取消</el-button>
                            <el-button
                                type="primary"
                                size="mini"
                                @click="delRoleSet(roleSet.id, idx)"
                                >确定</el-button
                            >
                        </div>
                        <div class="btn danger" slot="reference">
                            <i class="el-icon-delete"></i>
                            删除
                        </div>
                    </el-popover>
                </template>
            </card>
        </div>
    </div>
</template>

<script>
import Card from "@/components/Card";

import { getRoleList, delRole } from "@api/gov/roleSet";

export default {
    data() {
        return {
            filters: {
                name: ""
            },
            roleSetList: []
        };
    },
    created() {
        this.getRoleList();
    },

    methods: {
        getRoleList() {
            let _this = this;
            getRoleList(this.filters).then(res => {
                if (res.code == 0) {
                    _this.roleSetList = res.data;
                } else {
                    this.$message.error(res.msg);
                }
            });
        },

        delRoleSet(roleId, idx) {
            let _this = this;
            delRole({ roleId }).then(res => {
                if (res.code == 0) {
                    this.$message.success(res.msg)
                    _this.roleSetList.splice(idx, 1);
                } else {
                    this.$message.error(res.msg);
                }
            });
        },

        // 路由跳转
        routerToAddRouter(roleId) {
            // let str = `addRole.html${typeof id === "number" ? "?roleId=" + id : ""}`
            this.$router.push({
                name: 'addRole',
                query: typeof roleId === 'number' ? {roleId} : ''
            });
        }
    },
    components: {
        Card
    }
};
</script>

<style lang="less" scoped>
@import "../../common/less/reset.less";

.wrapper {
    width: 100%;
    height: 100%;
    overflow: auto;

    .card-list {
        margin-top: 20px;
        overflow: auto;
        display: flex;
        flex-wrap: wrap;

        .card-img {
            width: 60px;
            height: 60px;
            margin: 20px auto 7px;
            background-color: @blue;
            border-radius: 50%;
            color: #fff;
            font-size: 40px;
        }

        .card-title {
            color: @blue;
            font-size: 14px;
            margin-bottom: 4px;
        }

        .card-des {
            color: #999;
            font-size: 12px;
        }

        .btn {
            .flex-center;
            flex-direction: column;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            color: #fff;
            font-size: 12px;

            &.primary {
                background-color: @blue;
            }

            &.danger {
                background-color: @red;
            }
        }
    }
}
</style>
