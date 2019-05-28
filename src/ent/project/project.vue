<template>
    <BasePage>
        <div id="wrapper_content">
            <div class="project">
                <div class="pol_main">
                    <div class="pol_main_l">
                        <!--<div class="pol_main_l_circle"><i class="iconfont icon-wuguan zn"></i>智能推荐</div>-->
                    </div>
                    <div class="pol_main_r">
                        政策类别：
                        <div class="policy_gory sel">
                            <el-select
                                v-model="policyType"
                                placeholder="请选择"
                                @change="_getList('reset')"
                            >
                                <el-option
                                    v-for="item in policyOptions"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.name"
                                >
                                </el-option>
                            </el-select>
                        </div>
                        政策发布部门：
                        <div class="policy_department sel">
                            <el-select
                                v-model="deparent"
                                placeholder="请选择"
                                @change="_getList('reset')"
                            >
                                <el-option
                                    v-for="item in policyDepartmentOption"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.name"
                                >
                                </el-option>
                            </el-select>
                        </div>
                        <div class="search">
                            <el-input
                                placeholder="请输入文件标题"
                                v-model="keyWord"
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
                </div>
                <hr />
                <div class="pic_container clear" v-if="bshow">
                    <div class="lists">
                        <div class="pic_list clear">
                            <div
                                class="pic_list_i"
                                v-for="(item, index) in objImg"
                                @click="_goToUrl(item.id)"
                            >
                                <div class="list_image">
                                    <img src="" alt="" />
                                    <p>{{ toHtmlStr(item.title, "-") }}</p>
                                </div>
                                <div class="time">
                                    申报日期&nbsp;&nbsp;<span>{{
                                        toHtmlStr(item.dataTime, "-")
                                    }}</span>
                                </div>
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
import { getSelect, getProjectList } from "@api/ent/project";
import { gotoEntURL, toHtmlStr } from "@/common/utils/index";

export default {
    data() {
        return {
            toHtmlStr: toHtmlStr,
            objImg: [],
            policyOptions: [], //政策类别筛选项
            policyType: "", //部门值
            policyDepartmentOption: [], //政策发布部门选项
            deparent: "", //部门值
            keyWord: "", //关键字
            pageNum: 1, //当前页
            pageSize: 12, //每页条数
            totalRecord: 0, //总条数
            bshow: false
        };
    },
    components: {
        BasePage
    },
    mounted() {
        this._getSelect(); //筛选项
        this._getList();
    },
    methods: {
        _getSelect() {
            let that = this;
            getSelect().then(res => {
                let { code, data, msg } = res;
                if (code == 0) {
                    this.policyOptions = data.policyType; //政策类别
                    this.policyOptions.unshift({ id: null, name: "全部" });
                    this.policyDepartmentOption = data.policyDepartment;
                    this.policyDepartmentOption.unshift({
                        id: null,
                        name: "全部"
                    });
                } else {
                    this.$message.error(msg);
                }
            });
        },
        _getList() {
            let data = {
                title: this.keyWord,
                issuedOffice: this.deparent == "全部" ? "" : this.deparent,
                associatedPolicy:
                    this.policyType == "全部" ? "" : this.policyType,
                pageNum: this.pageNum,
                pageSize: this.pageSize
            };
            getProjectList(data).then(res => {
                let { code, data, msg } = res;
                if (code == "0000") {
                    let { results, totalRecord, pageNum } = data;
                    if (results.length == 0) {
                        this.bshow = false; //判断空数据
                    } else {
                        this.bshow = true;
                        this.objImg = results;
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
        _goToUrl(id) {
            gotoEntURL(`projectdeclarate.html?id=${id}`);
        }
    }
};
</script>

<style lang="less">
ul[data-v-4d780b36],
li[data-v-4d780b36] {
    list-style: none;
    padding: 0 5px;
    margin: 0;
}
.el-pagination {
    padding-top: 0px;
    padding-bottom: 0;
    text-align: center;
    margin-bottom: 20px;
}
.nomessage {
    padding: 0px 30px 10px 30px;
    margin: 0 auto;
    text-align: center;
    line-height: 400px;
    min-height: 400px;
}
.el-input__icon {
    cursor: pointer;
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
    .project{   
        font-size: 14px;
        background: white;
        .pol_main{
            display: flex;
            justify-content: space-between;
            //margin:5px 0 10px 0px;
            padding:25px 30px 10px 30px;
            &_l{
                &_circle{
                    color:#5C7CEC;
                    width:120px;
                    height:30px;
                    line-height: 30px;
                    border-radius: 14px;
                    text-align: center;
                    background-color: rgba(218, 226, 255, 1);
                    border: 1px solid rgba(92, 124, 236, 1);
                    font-size: 12px;
                    position: relative;
                    cursor: pointer;
                }
                .zn{
                    font-size: 16px;
                }

            }
            &_r{
                line-height: 35px;
                display: flex;
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
                    height:30px;                   
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
                        height:30px;
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
                        font-size: 16px;
                        color: rgba(35, 25, 22, 0.5);
                        cursor: pointer;
                    }
                }
            }
        }
        .pic_container{
            width:100%;
            margin-top: 40px;
            .lists{
                margin:0 auto;

                .pic_list{
                    width:1000px;
                    margin:0 auto;
                    margin-bottom: 40px;
                    .pic_list_i{
                        float: left;
                        width: 205px;
                        height: 150px;
                        cursor: pointer;
                        border: 1px solid #f2f4f7;
                        border-radius: 4px;
                        margin: 10px 20px 20px 20px;                    
                        .list_image{
                            height:110px;
                            width:100%;
                            position: relative;
                            overflow: hidden;
                            border-top-left-radius:4px;
                            border-top-right-radius:4px;
                            img{
                                position: absolute;
                                left:-1px;
                                top:-4px;
                                width:220px;
                                height:110px;
                                //border-radius: 4px;

                                background-size: 228px 118px;

                                margin-top: 0;
                                overflow: hidden;
                                //border-radius: 4px;
                                border-top-left-radius:4px;
                                border-top-right-radius:4px;

                            }


                            background-size: 228px 118px;
                            p{
                                position: absolute;
                                padding:20px;
                                text-align: center;
                                color:white;
                            }
                        }
                        .time{
                            height:40px;
                            line-height: 40px;
                            text-align: center;
                            color:#455467;
                            font-size: 12px;
                        }
                    }
                    .pic_list_i:nth-of-type(even) .list_image img{
                        background: url("~@/assets/card-item1.png") no-repeat center 100%/100%;
                   
                        background-size: 228px 118px;
                    }
                    .pic_list_i:nth-of-type(odd) .list_image img{
                        background: url("~@/assets/card-item3.png") no-repeat center 100%/100%;
                        background-size: 228px 118px;
                    }
                    .pic_list_i:hover{

                        box-shadow: 0 0 30px 6px rgba(0,0,0,0.3);

                    }

                }

            }


        }
    }
}
.in {
    opacity: 0.7 !important;
}
.modal-backdrop {
    z-index: 2100 !important;
}
.modal {
    z-index: 100000 !important;
}
.clear:after{
    content:'';
    display:block;
    clear:both;
    height:0;
    overflow:hidden;
    visibility:hidden;
}

</style>