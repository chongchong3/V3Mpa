<template>
    <div class="wrapper">
        <div class="drop-outer">
            <div class="policy-Drop" @click="show = true">
                <van-button type="default" class="drop_one"
                    ><span>{{ type }}</span> <van-icon name="play" class="icons"
                /></van-button>
            </div>
            <div class="depart-drop" @click="showDepart = true">
                <van-button type="default" class="drop_two"
                    ><span>{{ departType }}</span>
                    <van-icon name="play" class="icons"
                /></van-button>
            </div>
        </div>
        <div class="search-outer">
            <van-icon
                name="search"
                class="fa-search"
                @click="getList('reset')"
            />
            <input
                type="text"
                name="search"
                placeholder="请输入项目申报标题关键字"
                v-model="keyName"
            />
        </div>
        <div class="policy-outer">
            <van-list v-model="loading" :finished="finished" @load="getList">
                <van-cell v-for="(row, index) in list" :key="index">
                    <template>
                        <div class="policy-item" @click="_goTo(row)">
                            <div class="policy-item-title">
                                {{ row.title }}
                            </div>
                            <div class="policy-item-depart-date">
                                <span class="dpt">
                                    起止日期
                                </span>
                                <span class="date">
                                    {{ row.dataTime }}
                                </span>
                            </div>
                        </div>
                    </template>
                </van-cell>
            </van-list>
        </div>
        <van-popup v-model="show" position="bottom" :overlay="true">
            <van-picker
                show-toolbar
                title="请选择"
                :columns="policyType"
                @cancel="onCancel"
                @confirm="onConfirm"
            />
        </van-popup>

        <van-popup v-model="showDepart" position="bottom" :overlay="true">
            <van-picker
                show-toolbar
                title="请选择"
                :columns="deparent"
                @cancel="onCancelTwo"
                @confirm="onConfirmTwo"
            />
        </van-popup>
    </div>
</template>
<script>
import { getPolicyList, getPolicyFileList } from "@api/h5/declareItem";
import { Toast } from "vant";
import { toHtmlStr } from "@/common/utils/index";
export default {
    data() {
        return {
            show: false, //政策类别弹出筛选
            showDepart: false, //发布部门弹出筛选
            policyType: [], //政策类别
            deparent: [], //发布部门
            type: "政策类别", //政策类别参数
            departType: "发布部门", //发布部门参数
            keyName: "", //关键字
            list: [],
            loading: false,
            finished: false,
            pageNum: 1,
            pageSize: 10,
            totalRecord: 0,
            toHtmlStr: toHtmlStr
        };
    },
    components: {},
    mounted() {
        this.policySelect(); //初始化获取类别
        // this.getList();//获取列表
    },
    methods: {
        //初始化获取
        policySelect() {
            let that = this;
            getPolicyList().then(res => {
                let { code, msg, data } = res;
                if (code == "0000") {
                    this.policyType = data.policyType;
                    this.deparent = data.policyDepartment;
                    this.policyType.unshift(
                        { text: "政策类别", name: "政策类别", disabled: true },
                        { text: "全部", name: "全部" }
                    );
                    this.deparent.unshift(
                        { text: "发布部门", name: "发布部门", disabled: true },
                        { text: "全部", name: "全部" }
                    );
                    // //政策类别筛选
                    for (let i in this.policyType) {
                        this.policyType[i]["text"] = this.policyType[i]["name"];
                        delete this.policyType[i]["id"];
                    }

                    for (let i in this.deparent) {
                        this.deparent[i]["text"] = this.deparent[i]["name"];
                        delete this.deparent[i]["id"];
                    }
                } else {
                    Toast.fail(msg);
                }
            });
        },

        //类别确认
        onConfirm(value, index) {
            this.show = false;
            this.type = value.name;
            this.getList("reset");
        },
        //类别取消
        onCancel() {
            this.show = false;
        },
        //部门确认
        onConfirmTwo(value, index) {
            this.showDepart = false;
            this.departType = value.name;
            this.getList("reset");
        },
        //部门取消
        onCancelTwo() {
            this.showDepart = false;
        },

        //获取列表
        getList(current) {
            if (current == "reset") {
                this.pageNum = 1;
                this.finished = false;
            }
            let data = {
                pageNum: this.pageNum,
                pageSize: this.pageSize,
                type:
                    this.type == "全部" || this.type == "政策类别"
                        ? ""
                        : this.type, //政策类别
                department:
                    this.departType == "全部" || this.departType == "发布部门"
                        ? ""
                        : this.departType, //政策发布部门
                keyWord: this.keyName,
                isEnt: 1
            };
            getPolicyFileList(data).then(res => {
                let { code, msg, data } = res;
                if (code == "0000") {
                    if (data.results.length == 0) {
                        Toast("无数据");
                        this.list = [];
                        this.loading = false;
                        this.finished = true;
                    } else {
                        this.totalRecord = data.totalRecord;
                        const results = data.results;
                        setTimeout(() => {
                            this.list =
                                this.pageNum === 1
                                    ? results
                                    : this.list.concat(results);
                            this.loading = false;
                            if (results.length < this.pageSize) {
                                this.finished = true;
                                Toast("加载完成");
                            } else {
                                Toast("查询成功");
                            }
                            this.pageNum++;
                        }, 500);
                    }
                } else {
                    Toast("提示内容");
                }
            });
        },
        //跳转
        _goTo(row) {
            let id = row.id;
            // gotoH5URL(`declarationGuide.html?id=` + id);
            this.$router.push(`declarationGuide?id=` + id);
        }
    }
};
</script>
<style lang="less" scoped='scoped'>
// less已使用px2rem，直接使用375适配的px就行
.wrapper {
    background-color: #f2f4f7 !important;
    min-height: 100vh;
    padding: 10px 20px 0px;
    font-size: 14px;
    .drop-outer {
        margin-bottom: 10px;
        text-align: center;
        .depart-drop,
        .policy-Drop {
            display: inline-block;
        }
        .depart-drop {
            margin-left: 10px;
        }
    }
    .drop_one {
        position: relative;
        /*overflow: hidden;*/
        /*white-space: nowrap;*/
        /*text-overflow: ellipsis;*/
    }
    .icons {
        position: absolute;
        right: 12px;
        top: 12px;
        transform: rotate(90deg);
        color: #ccc;
    }
    .van-button--default {
        width: 120px;
        color: #323233;
        background-color: #f2f4f7;
        border: none;
    }
    .van-button {
        height: 35px;
        line-height: 35px;
        cursor: pointer;
    }
    .search-outer {
        height: 35px;
        border-radius: 4px;
        /*margin:0 .2rem .2rem;*/
        background-color: rgba(255, 255, 255, 1);
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(228, 230, 240, 1);
        position: relative;
        .fa-search {
            font-size: 18px;
            color: #ccc;
            margin-left: 10px;
            line-height: 35px;
            position: absolute;
            top: 3px;
        }
        input[type="text"] {
            width: 100%;
            height: 100%;
            border: none;
            text-indent: 2.5em;
            font-size: 14px;
            border-radius: 4px;
        }
    }
    .lists {
        margin: 10px 0;
    }
    .van-cell {
        border-radius: 5px;
        margin: 10px 0;
        padding: 0;
    }
    .policy-outer {
        margin: 5px 0;
        .policy-item {
            font-size: 14px;
            margin: 8px 0;
            padding: 12px 15px;
            border-radius: 6px;
            background-color: rgba(255, 255, 255, 1);

            &-title {
                line-height: 30px;
                color: rgba(16, 29, 55, 1);
                font-size: 14px;
                margin-bottom: 8px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            &-depart-date {
                line-height: 20px;
                color: rgba(153, 153, 153, 1);
                font-size: 13px;
                .dpt {
                    margin-right: 10px;
                }
                .date {
                }
            }
        }
    }
}
</style>