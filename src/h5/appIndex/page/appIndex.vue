<template>
    <div class="wrapper">
        <div
            class="item"
            v-for="item in permissionList"
            :key="item.id"
            @click="gotoUrl(item.url?item.url:(item.child?item.child[0].url:''))"
        >
            <div>
                <i class="el-icon-bell"></i>
            </div>
            <div>
                <div class="item-bg"></div>
                <div>{{ item.name }}</div>
            </div>
            <van-icon name="play-circle-o" size="0.6rem" />
        </div>
    </div>
</template>
<script>
import { gotoH5URL } from "@/common/utils/index";
export default {
    data() {
        return {
            permissionList: []
        };
    },
    components: {},
    created() {
        this.setPermissionList();
    },
    methods: {

        // TODO
        gotoUrl(url) {
            // gotoH5URL(url);
            this.$router.push(url.slice(0, -5))
        },

        setPermissionList() {
            let curl,
                source = localStorage.getItem("source");
            try {
                curl = JSON.parse(localStorage.getItem("curl"));
            } catch (error) {
                // gotoH5URL("login.html");
            }

            if (source == 1) {
                // curl.forEach((v, i) => {
                //     if (v.name == "问题反馈") {
                //         curl.splice(i, 1, ...v.child);
                //     }
                // });
            } else {
                let aPolicy = curl.find(v => v.name == "惠企政策");
                aPolicy.url = "hQpolicy.html";
            }

            curl.push({
                name: "个人中心",
                url: "personalCenter.html"
            });

            this.permissionList = curl;
        }
    }
};
</script>
<style lang="less" scoped='scoped'>
// less已使用px2rem，直接使用375适配的px就行

.wrapper {
    display: block;
    padding: 6vw;
    background-color: #efefef;
    min-height: 100vh;

    &::after {
        content: "";
        display: block;
        clear: both;
    }
}
.item {
    display: flex;
    float: left;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    font-size: 16px;
    width: 41vw;
    height: 60vw;
    margin-bottom: 20px;
    border-radius: 6px;
    background-color: #fff;
    box-shadow: 4px 4px 14px 0 rgba(28, 65, 140, 0.05);

    &:nth-child(2n) {
        margin-left: 6vw;
    }

    .bg-image(4);
}

.item .item-bg {
    width: 40px;
    height: 40px;
    margin: 0 auto;
    background-size: contain;
}

.bg-image(@n, @i:1) when (@i <= @n) {
    &:nth-child(@{i}n) .item-bg {
        background-image: url("../../../assets/h5-index-nav@{i}.png");
    }
    .bg-image(@n, (@i + 1));
}
</style>