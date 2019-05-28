<template>
    <BasePage>
        <div id="wrapper_content">
            <div class="declaration">
                <div class="declaration_top">
                    <div class="select_type sel"></div>
                    <div class=" search">
                        <el-input
                            placeholder="请输入标题关键字"
                            v-model="title"
                            clearable
                        >
                            <i
                                slot="prefix"
                                class="el-input__icon el-icon-search"
                                @click="_getList('reset')"
                            ></i>
                        </el-input>
                    </div>
                </div>
                <hr />
                <div class="declaration_container" v-if="bshow">
                    <div class="pol_lists" v-for="(item, index) in list">
                        <div class="pub_lic">
                            <div class="one">
                                <div
                                    class="blocks"
                                    :class="
                                        index % 2 == 0 ? 'type-sj' : ' type-qt'
                                    "
                                >
                                    公示
                                </div>
                                <div
                                    class="one_text"
                                    @click="_goToDetail(item.id)"
                                >
                                    {{ toHtmlStr(item.title, "-") }}
                                </div>
                            </div>
                        </div>
                        <div class="pub_lic">
                            <div class="type">发布日期</div>
                            <div class="child">
                                {{ toHtmlStr(item.createTime, "-") }}
                            </div>
                        </div>
                        <div class="pub_lic">
                            <div
                                class="see"
                                @click="_see(item.associatedPolicyId)"
                            >
                                <i class="iconfont icon-chakan"></i>查看政策
                            </div>
                        </div>
                    </div>
                    <el-pagination
                        background
                        layout="prev, pager, next"
                        :total="totalRecord"
                        :current-page="pageNum"
                        :page-size="pageSize"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                    >
                    </el-pagination>
                </div>
                <div class="nomessage" v-if="!bshow">暂无数据</div>
            </div>
        </div>
    </BasePage>
</template>

<script>
import BasePage from "@/components/BasePage";

import { getDeclareResultList } from "@api/ent/declaration";
import { toHtmlStr, gotoEntURL } from "@/common/utils/index";
// import {gotoEntURL} from '@/common/utils/util.js';
// import toHtmlStr from "@/common/utils/toHtmlStr.js";
export default {
    data() {
        return {
            toHtmlStr: toHtmlStr,
            title: "",
            pageSize: 8,
            pageNum: 1,
            bshow: true,
            list: [],
            totalRecord: 0
        };
    },
    components: {
        BasePage
    },
    mounted() {
        this._getList();
    },
    methods: {
        _getList(type) {
            if (type == "reset") {
                this.pageNum = 1;
            }
            let data = {
                title: this.title,
                pageNum: this.pageNum,
                pageSize: this.pageSize
            };
            getDeclareResultList(data).then(res => {
                let { code, data, msg } = res;
                if (code == "0000") {
                    let { results, totalRecord, pageNum } = data;
                    if (results.length == 0) {
                        this.bshow = false; //判断空数据
                    } else {
                        this.list = results;
                        this.bshow = true;
                        this.pageNum = pageNum;
                        this.totalRecord = totalRecord;
                    }
                } else {
                    this.$message.error(msg);
                }
            });
        },
        handleSizeChange(val) {
            this.pageNum = val;
            this._getList();
        },
        // 页码
        handleCurrentChange(val) {
            this.pageNum = val;
            this._getList();
        },
        _goToDetail(id) {
            gotoEntURL(`declaradetails.html?id=${id}`);
        },
        _see(id) {
            gotoEntURL(`policydetails.html?id=${id}`);
        }
    }
};
</script>

<style lang="less" scoped>
.el-input__icon {
    cursor: pointer;
}
.icon-chakan {
    margin-right: 5px;
}
::-webkit-scrollbar {
    width: 0.5rem;
    height: 0.5rem;
    background: hsla(0, 0%, 100%, 0.6);
}
::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 5px; /*滚动条的背景区域的圆角*/
}
::-webkit-scrollbar-thumb {
    border-radius: 0;
    background-color: rgba(95, 95, 95, 0.4);
    transition: all 0.2s;
    border-radius: 0.5rem;
    &:hover {
        background-color: rgba(95, 95, 95, 0.7);
    }
}

#wrapper_content{
    flex-grow: 1;
    background: #fff;
    overflow-y: auto;
    font-size: 14px;
    .declaration{
        
        background: white;
        &_top{
            border-bottom:1px solid rgba(253, 253, 254, 1);
            padding:20px 30px 0 30px;
            display: flex;
            justify-content: space-between;
            margin-bottom: 15px;
            .sel{
                width:160px;
                margin-right:20px;
                .btn.ys-dropdown-btn {
                    background-color: rgba(255, 255, 255, 1);
                    border: 1px solid rgba(227, 234, 241, 1) !important;
                }
                .ys-dropdown-value.active, .ys-dropdown-value.active+.fa {
                    color: #333;
                    color: #9399A5 !important;
                }
                .ys-dropdown-value {
                    text-align: left;
                }
            }
            .search{
                background-color: rgba(0, 0, 0, 0.04);
               
                width:334px;
                border-radius: 4px;
               
                position: relative;
                input[name='role']{
                    text-indent: 1rem;
                    position: absolute;
                    font-size: 13px;
                    left:0;
                    top:0;
                    height:100%;
                    width:300px;
                    border:none;
                    color:#9399A5;
                    background: none;
                    outline: none;
                }
                input[name='role']::-webkit-input-placeholder{
                    color:#9399A5;
                }
                input[name='role']::-moz-placeholder{   /* Mozilla Firefox 19+ */
                    color:#9399A5;
                }
                input[name='role']:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
                    color:#9399A5;
                }
                input[name='role']:-ms-input-placeholder{  /* Internet Explorer 10-11 */
                    color:#9399A5;
                }
                .sosuo{
                    position: absolute;
                    right:5px;
                    top:4px;
                    font-size: 16px;
                    color: rgba(35, 25, 22, 0.5);
                    cursor: pointer;
                }
            }

        }

        &_container{
            .pol_lists{
                padding:20px 70px 20px 35px;
                //padding-bottom: 20px;
                border-bottom:1px solid  rgba(235, 235, 235, 1);
                display: flex;
                justify-content: space-between;
                .pub_lic{
                 
                    .one{
                        display: flex;

                        .blocks{
                            width:40px;
                            height:40px;
                            text-align: center;
                            line-height:40px;
                            color:white;
                            font-size: 16px;
                            margin-right: 10px;

                        }

                        .type-sj {
                            //background-color: #5998f7;
                            background-color:#19B9FF ;
                        }
                        .type-qt {
                            background-color: #a5baf7;
                        }
                        .one_text{
                            line-height: 21px;

                            color:#455467;
                            text-align: left;
                            width:620px;
                            //min-width: 620px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space:nowrap;
                            line-height: 40px;
                            cursor: pointer;
                        }
                        .one_text:hover{
                            color:#5C7CEC;
                            font-weight: bold;
                        }
                    }
                    .type,.child{
                        color: rgba(69, 84, 103, 0.5);
                        text-align: left;
                    }
                    .child{
                        margin-top: 4px;
                    }
                    .see{
                        margin-top: 5px;
                        color:rgba(92, 124, 236, 1);
                        cursor: pointer;
                        width:100px;
                        text-align: right;
                        
                    }
                }
                .pub_lic:nth-of-type(2){
                    width: 160px;
                }


            }
        }
    }
}
.nomessage{
    padding:0px 30px 10px 30px;
    margin:0 auto;
    text-align: center;
    line-height: 400px;
    min-height: 400px;
}
</style>