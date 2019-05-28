<template>
    <div class="content-container-outer">
        <!-- HTML内容 -->
        <el-form
            ref="form"
            inline
            :model="role"
            :rules="rules"
            label-width="labelWidth"
        >
            <el-form-item label="角色名称：" prop="name">
                <el-input v-model="role.name"></el-input>
            </el-form-item>
            <el-form-item label="角色描述：" prop="description">
                <el-input v-model="role.description"></el-input>
            </el-form-item>
            <el-form-item label="单位级别：">
                <el-select v-model="currentLevel" value-key="name">
                    <el-option
                        v-for="level in unitLevel"
                        :key="level.id"
                        :value="level"
                        :label="level.name"
                    ></el-option>
                </el-select>
            </el-form-item>
        </el-form>

        <el-tree
            :data="permissionTree"
            accordion
            show-checkbox
            node-key="id"
            :default-expanded-keys="expandedKeys"
            :props="permissionProps"
            ref="permission"
        >
        </el-tree>

        <div>
            <el-button @click="routerBack">取消</el-button>
            <el-button type="primary" @click="submitFrom">确认</el-button>
        </div>
    </div>
</template>

<script>
import {
    getRolePermission,
    getRoleList,
    getPermissionByRank,
    addRole,
    modifyRole
} from "@api/gov/roleSet";

export default {
    data() {
        return {
            labelWidth: "80px",
            roleId: 0,
            role: {
                type: 1,
                name: "",
                description: "",
                ids: [],
                roleId: 0
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: "请输入角色名称",
                        trigger: "blur"
                    }
                ],
                description: [
                    {
                        required: true,
                        message: "请输入角色描述",
                        trigger: "blur"
                    }
                ]
            },
            currentLevel: {},
            unitLevel: [
                { id: 1, name: "县级", rank: 1 },
                { id: 2, name: "乡镇、街道、经济开发区", rank: 1 },
                { id: 3, name: "企业", rank: 2 }
            ],

            // 权限树及配置
            permissionTree: [],
            permissionList: [],
            permissionProps: {
                label: "name",
                children: "child"
            },
            selectKeys: [],
            expandedKeys: []
        };
    },
    created() {
        let { roleId } = this.$route.query;
        if (roleId) {
            this.roleId = roleId;
            this._getCurrentPermission().then(res => {
                this._getCurrentRole();
            });
        } else {
            let level = this.unitLevel[0];
            this.role.type = level.id;
            this.currentLevel = level;
            this._getPermissionByRank(level.rank);
        }
    },

    watch: {
        currentLevel: {
            handler(newVal, oldVal) {
                this.role.type = newVal.id;

                if (newVal.rank && newVal.rank !== oldVal.rank) {
                    this._getPermissionByRank(newVal.rank);
                }
            }
        }
    },

    methods: {
        submitFrom() {
            this.$refs["form"].validate(valid => {
                if (valid) {
                    if (!this.role.type) {
                        this.$message.error("请选择单位级别");
                        return;
                    }

                    let reqFunc,
                        ref = this.$refs["permission"],
                        msg;

                    // 增加和修改请求
                    if (this.roleId) {
                        reqFunc = modifyRole;
                        this.role.roleId = this.roleId;
                        msg = "修改";
                    } else {
                        reqFunc = addRole;
                        msg = "新增";
                    }
                    this.role.ids = ref
                        .getHalfCheckedKeys()
                        .concat(ref.getCheckedKeys())
                        .join(",");

                    reqFunc(this.role).then(res => {
                        if (res.code == 0) {
                            this.$message.success(`${msg}角色成功`);
                            setTimeout(() => {
                                this.routerBack();
                            }, 2000);
                        } else {
                            this.$message.error(res.msg);
                        }
                    });
                }
            });
        },

        routerBack() {
            history.go(-1);
        },

        // 扁平化树的权限结构
        _flatTree(tree, arr = []) {
            for (let i = 0; i < tree.length; i++) {
                let { child, ...node } = tree[i];

                node.isLeaf = true;
                arr.push(node);
                if (child && child.length) {
                    node.isLeaf = false;
                    this._flatTree(child, arr);
                }
            }
            return arr;
        },

        // 查询已有权限
        _getCurrentPermission() {
            let _this = this;
            return getRolePermission({ roleId: _this.roleId }).then(res => {
                if (res.code == 0) {
                    this.selectKeys = res.data.map(item => item.permissionId);
                } else {
                    this.$message.error(res.msg);
                }
            });
        },

        _getPermissionByRank(rank) {
            return getPermissionByRank({ rank }).then(res => {
                if (res.code == 0) {
                    if (res.data[0]) {
                        this.expandedKeys = [res.data[0].id];
                    }

                    this.permissionTree = res.data;

                    this.permissionList = this._flatTree(res.data);

                    // 过滤出选中的叶子节点
                    let selectLeaf = this.permissionList
                        .filter(v => {
                            if (
                                this.selectKeys.indexOf(v.id) > -1 &&
                                v.isLeaf
                            ) {
                                return true;
                            }
                        })
                        .map(v => v.id);
                    this.$refs["permission"].setCheckedKeys(selectLeaf);
                } else {
                    this.$message.error(res.msg);
                }
            });
        },

        // 根据Id获取权限列表，删选出当前角色的信息
        _getCurrentRole() {
            getRoleList({ id: this.roleId }).then(res => {
                if (res.code == 0) {
                    let currentRole =
                        res.data.find(item => this.roleId == item.id) || {};
                    this.role.name = currentRole.name;
                    this.role.description = currentRole.description;
                    this.role.type = currentRole.type;
                    this.currentLevel = this.unitLevel.find(
                        v => currentRole.type === v.id
                    );

                    let rank = this.unitLevel.find(
                        v => v.id == currentRole.type
                    );
                } else {
                    this.$message.error(res.msg);
                }
            });
        }
    }
};
</script>

<style lang="less" scoped>
</style>
