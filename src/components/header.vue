<template>
    <div class="el-header">
        <div class="header-bg">
            <div class="header-bg_tip" :class="tipbg" @click="gotoIndex">
                <!-- 图标 -->
            </div>

            <div
                class="user-c"
                @mouseout="removeMouse()"
                @mouseover="inMouse()"
            >
                <el-dropdown :hide-on-click="false">
                    <div class="flex-center">
                        <div class="user-icon"><!-- 头像 --></div>
                        <div class="user-name">
                            {{ name }}
                        </div>
                        <i class="el-icon-caret-bottom" style="color:#fff"></i>
                    </div>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-show="display"
                            >系统管理</el-dropdown-item
                        >
                        <el-dropdown-item @click.native="gotoCenter"
                            >个人中心</el-dropdown-item
                        >
                        <el-dropdown-item @click.native="signOut"
                            >退出</el-dropdown-item
                        >
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>
<script>
import { gotoGovURL } from "@/common/utils/index"; //跳转路径
// logout
import { logout } from "@api/loginOut";
import { Dropdown, DropdownMenu, DropdownItem } from "element-ui";

export default {
    components: {
        'el-dropdown':Dropdown,
        'el-dropdown-menu':DropdownMenu,
        'el-dropdown-item': DropdownItem
    },
    data() {
        return {
            seen: false,
            current: 0,
            name: "",
            id: 0,
            display: false,
            tipbg: "",
            diskey: "tl",
            // tl:{
            //   name:'tl',
            //   bg:'tlBg'
            // }
            region: {
                tl: { name: "tl", bg: "tlBg" },
                lh: { name: "lh", bg: "lhBg" },
                ly: { name: "ly", bg: "lyBg" }
            }
        };
    },
    created(){
        
    },
    methods: {
        //鼠标移入移出
        inMouse(index) {
            this.seen = true;
            this.current = index;
        },
        removeMouse(index) {
            this.seen = false;
            this.current = null;
        },
        //判断权限user
        miss() {
            let key = localStorage.getItem("isAdmin");
            if (key == 1) {
                this.display = true;
            }
          
        },
        //根据地区选择图片
        selectDis() {
            //默认地区

            let currentConf = localStorage.getItem("city");
            this.tipbg = this.region[currentConf].bg;
        },
        signOut() {
            logout().then(res => {
                let loginUrl=localStorage.getItem("loginUrl")
                if (res.code == "200") {
                    localStorage.clear();    
                    location.href=loginUrl;
                } else {
                    this.$message.error(res.msg);
                }
            });
        },
        gotoIndex() {
            location.href="index.html";
        },
        gotoCenter() {
            location.href="personalCenter.html";
        }
    },

    mounted() {
        this.name = localStorage.getItem("username");
        this.miss();
        this.selectDis();
    }
};
</script>



<style lang="less" scoped>
.el-header {
    width: 100%;
    background: linear-gradient(90deg, #3758e3, #91aff9);
    padding: 0 30px;
    height: 60px;
}
.header-bg {
    display: flex;
    height: 100%;
    width: 100%;
}
.tlBg {
    background: url("../assets/tl-bg.png") no-repeat center/cover;
}
.lhBg {
    background: url("../assets/lh-bg.png") no-repeat center/cover;
}

.lyBg {
    background: url("../assets/head-title.png") no-repeat center/cover;
}
.user-icon {
    display: inline-block;
    width: 26px;
    height: 60px;
    background: url(../assets/user-logo.png) no-repeat scroll 50%;
}

.header-bg_tip {
    background-size: contain;
    min-width: 450px;
    cursor: pointer;
}

// 右边用户栏
.user-c {
    position: absolute;
    height: 100%;
    margin-right: 40px;
    text-align: center;
    cursor: pointer;
    min-width: 100px;
    right: 0;

    .user_herder {
        display: inline-block;
        text-align: center;
        width: 26px;
        height: 60px;
    }
    .user-name {
        height: 60px;
        line-height: 60px;
        display: inline-block;
        vertical-align: top;
        margin-left: 10px;
        color: #fff;
    }
    .header-list {
        i {
            position: absolute;
            font-size: 12px;
            width: 30px;
            display: block;
            height: 30px;
            // border: 1px solid black;
            top: 24px;
            right: -35px;
            color: #fff;
        }
    }
    .user_tools {
        position: absolute;
        width: 100%;
        top: 100%;
        right: 0;
        line-height: 40px;
        // height: 120px;
        overflow: hidden;
        text-align: center;
        -webkit-transition: all 0.3s;
        transition: all 0.3s;
        -webkit-box-shadow: 1px 1px 0 rgba(0, 0, 0, 0.3);
        box-shadow: 1px 1px 0 rgba(0, 0, 0, 0.3);
        .manage-btn {
            display: none;
        }
        // .change {
        //     display: block;
        // }
        div {
            cursor: pointer;
            color: #ccc;
            background-color: rgba(23, 29, 45, 0.7);
            -webkit-transition: color 0.3s, background-color 0.3s;
            transition: color 0.3s, background-color 0.3s;
            display: inline-block;
            width: 100%;
            &:hover {
                color: #fff;
                background-color: rgba(23, 29, 45, 0.9);
            }
        }
    }
}
</style>

