<template>
    <BasePage>
        <div>
            <div
                class="content-container-outer "
                style="min-height:100%"
                id="typeLabelImportOuter"
            >
                <div class="type-Outer">
                    <div class="type" v-for="item in this.datas" :key="item.id">
                        <div class="type-top">
                            <div class="typeName">
                                {{ item.name.substring(0, 2) }}
                            </div>
                        </div>
                        <div class="type-bott">{{ item.name }}</div>
                        <div class="imageBlur">
                            <div
                                class="img-c imgLook"
                                @click="gotoDetail(item.name)"
                            >
                                <i class="iconfont icon-chakan"></i>查看
                            </div>
                            <div
                                class="img-c imgDelete"
                                @click="_deleteData(item.name)"
                            >
                                <i class="iconfont icon-shanchu"></i>删除
                            </div>
                        </div>
                    </div>
                    <div class="types type-add" @click="_addType()">
                        <div class="add"></div>
                    </div>
                </div>
            </div>
        </div>
    </BasePage>
</template>

<script>
import BasePage from "@/components/BasePage";
import { gotoBaseURL, toHtmlStr } from "@/common/utils/index"; //跳转路径

import {
    getLabelList,
    insertLabel,
    deleteLable
} from "@api/gov/typeLabelImport";

export default {
    data() {
        return {
            type: 1,
            datas: []
        };
    },
    created() {},
    mounted() {
        this._renderHtml();
    },
    methods: {
        //页面显示
        _renderHtml() {
            let params = {
                type: this.type
            };
            getLabelList(params).then(res => {
                if (res.code == "0000") {
                    this.datas = res.data;
                }
            });
        },
        //增加标签
        _addType() {
            this.$prompt("类型标签", "", {
                confirmButtonText: "确定",
                cancelButtonText: "取消"
            }).then(({ value }) => {
                insertLabel({ type: this.type, name: value }).then(res => {
                    if (res.code == "0000") {
                        this.$message({
                            type: "success",
                            message: "插入成功"
                        });
                        this._renderHtml();
                    } else {
                        this.$message({
                            type: "error",
                            message: res.msg || "插入失败"
                        });
                    }
                });
            });
        },

        //删除
        _deleteData(name) {
            deleteLable({ name: name, type: this.type }).then(res => {
                if (res.code == "0000") {
                    this.$message({
                        type: "success",
                        message: "删除成功"
                    });
                } else {
                    this.$message({
                        type: "error",
                        message: res.msg || "删除失败"
                    });
                }
                this._renderHtml();
            });
        },

        //查看
        gotoDetail(name) {
            // this.$router.push({
            //     name:'typeLabelDetail',
            //     type:this.type,
            //     num:name,
            // })
            gotoBaseURL("typeLabelDetail?type=" + this.type + "&num=" + name);
        }
    },
    components: {
        BasePage
    }
};
</script>

<style lang="less" scoped>
@import "../../common/less/reset.less";
.content-container-outer {
    background: #fff;
    -webkit-box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.08);
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.08);
    padding: 25px;
}
.float-modal-left {
    width: 300px;
    height: 150px;
    padding: 20px;
    button {
        margin-top: 20px;
        width: 60px;
        height: 32px;
    }
}

#typeLabelImportOuter {
    .type-Outer {
        width: 985px;
        display: flex;
        flex-wrap: wrap;
        margin: 30px auto;
        .type {
            width: 150px;
            height: 150px;
            margin-right: 45px;
            border-radius: 4px;
            color: #707b8b;
            font-size: 14px;
            display: flex;
            flex-direction: column;
            align-items: center;
            border: 1px solid #ebebeb;
            margin-bottom: 40px;
            //padding:20px 40px;

            position: relative;
            &-top {
                width: 70px;
                height: 70px;
                border-radius: 50%;
                background: #6b93ff;
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 20px 40px 15px 40px;
                .typeName {
                    color: #fff;
                    font-size: 24px;
                }
            }
            .imageBlur {
                opacity: 0;
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                display: flex;
                justify-content: space-around;
                align-items: center;
                background: rgba(0, 0, 0, 0.6);
                border-radius: 4px;
                color: #fff;
                .img-c {
                    cursor: pointer;
                    //margin:20px auto;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    font-size: 12px;
                    //z-index: 100;
                    width: 45px;
                    height: 45px;
                    border-radius: 50%;
                    background: red;
                }
                .img-c:nth-child(1) {
                    background: #6b93ff;
                }
            }
        }
        .type:hover .imageBlur {
            opacity: 1;
        }

        .types {
            width: 150px;
            height: 150px;
            margin-right: 45px;
            border-radius: 4px;
            color: #707b8b;
            font-size: 14px;
            display: flex;
            flex-direction: column;
            align-items: center;
            border: 1px solid #ebebeb;
            margin-bottom: 40px;
        }
        .type-add {
            border: 1px dotted #6b93ff;
            background: rgba(107, 147, 255, 0.05);
            display: flex;
            justify-content: center;
            align-items: center;
            .add {
                width: 30px;
                height: 30px;
                background: url("~@/assets/add.png") no-repeat center/cover;
                border-radius: 50%;
            }
        }
    }
}
</style>
