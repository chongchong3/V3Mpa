<template>
    <BasePage>
        <div id="wrapper_content">
            <div class="policyLibrary_main">
                <div class="pol_main">
                    <div class="pol_main_l"></div>
                    <div class="pol_main_r">
                        政策类别：
                        <div class="policy_gory sel">
                            <el-select
                                v-model="policyType"
                                placeholder="请选择"
                                @change="_getDataList('reset')"
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
                                @change="_getDataList('reset')"
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
                                    @click="_getDataList('reset')"
                                ></i>
                            </el-input>
                        </div>
                    </div>
                </div>
                <hr />

                <div class="pol_container" v-if="bshow">
                    <div class="pol_list" v-for="(item, index) in tableData">
                        <div class="pub_lic">
                            <div class="one">
                                <div
                                    class="blocks"
                                    :class="
                                        index % 2 == 0 ? 'type-sj' : ' type-qt'
                                    "
                                    :data-index="index"
                                >
                                    {{ item.policyType.substring(0, 1) }}
                                </div>
                                <div
                                    class="one_text"
                                    v-bind:data-title="item.policyTitle"
                                    v-bind:data-id="item.id"
                                    @click="_goUrl(item.id)"
                                >
                                    {{ toHtmlStr(item.policyTitle, "-") }}
                                </div>
                            </div>
                        </div>
                        <div class="pub_lic">
                            <div class="type">政策类别</div>
                            <div class="child">
                                {{ toHtmlStr(item.policyType, "-") }}
                            </div>
                        </div>
                        <div class="pub_lic">
                            <div class="type">适用范围</div>
                            <div class="child">
                                {{ toHtmlStr(item.supportTarget, "-") }}
                            </div>
                        </div>
                        <div class="pub_lic">
                            <div class="type">发布日期</div>
                            <div class="child">
                                {{ toHtmlStr(item.updateTime, "-") }}
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

import { getSelect, getList } from "@api/ent/policyLibrary"; //接口访问
import { gotoEntURL, toHtmlStr } from "@/common/utils/index";

export default {
    data() {
        return {
            policyOptions: [], //政策类别筛选项
            policyType: "", //部门值
            policyDepartmentOption: [], //政策发布部门选项
            deparent: "", //部门值
            keyWord: "", //关键字
            tableData: [],
            pageNum: 1, //当前页
            pageSize: 7, //每页条数
            totalRecord: 0, //总条数
            bshow: true //判断空数据
        };
    },
    components: {
        BasePage
    },
    mounted() {
        this.toHtmlStr = toHtmlStr;
        this._getDataList();
        this._getSelect(); //筛选项
    },
    computed: {},
    methods: {
        //筛选项
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
        //查询类表
        _getDataList(type) {
            if (type == "reset") {
                this.pageNum = 1;
            }

            let query = {
                type: this.policyType == "全部" ? "" : this.policyType, //政策类别
                department: this.deparent == "全部" ? "" : this.deparent, //政策发布部门
                keyWord: this.keyWord,
                isEnt: 1,
                pageSize: this.pageSize,
                pageNum: this.pageNum
            };
            getList(query).then(res => {
                this._getlists(res);
            });
        },
        _getlists(res) {
            let { code, data, msg } = res;
            if (code == "0000") {
                let { results, totalRecord, pageNum } = data;
                if (results.length == 0) {
                    this.bshow = false; //判断空数据
                } else {
                    this.bshow = true;
                    this.tableData = results;
                    this.pageNum = pageNum;
                    this.totalRecord = totalRecord;
                }
            } else {
                this.$message.error(msg);
            }
        },
        handleSizeChange(val) {
            this.pageNum = val;
            this._getDataList();
        },
        // 页码
        handleCurrentChange(val) {
            this.pageNum = val;
            this._getDataList();
        },
        //跳转政策文库详情
        _goUrl(id) {
            gotoEntURL(`policydetails.html?id=${id}`);
        }
    }
};
</script>

<style lang="less" scoped>

ul[data-v-137b2f56],
li[data-v-137b2f56] {
    list-style: none;
    padding: 0 10px;
    margin: 0;
}
.el-input__icon {
    cursor: pointer;
}
.el-pagination[data-v-137b2f56] {
    padding-top: 20px;
    padding-bottom: 0px;
    text-align: center;
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
  .policyLibrary_main{   
    background: white;
    font-size: 14px;
    .pol_main{
      display: flex;
      justify-content: space-between;

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
        display: flex;
        line-height: 40px;
        .sel{
          width:160px !important;
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
          //background-color: rgba(0, 0, 0, 0.04);
          width:334px;

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
            //top:4px;
            font-size: 16px;
            color: rgba(35, 25, 22, 0.5);
            cursor: pointer;
          }
        }
      }
    }
  }
  //列表
  .pol_container{
    padding:0px 30px 10px 30px;

    .pol_list{
      padding:20px 25px 20px 20px;

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
            color:#455467;
            //line-height: 21px;

            text-align: left;
            line-height: 40px;
            width:530px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;

            cursor: pointer;
          }
          .one_text:hover{
            color:#5C7CEC;
          }
        }
        .type,.child{
          color: rgba(69, 84, 103, 0.5);
          text-align: left;
        }
        .child{
          margin-top: 4px;
        }
      }
      .pub_lic:nth-of-type(2){
        width:180px;
      }
      .pub_lic:nth-of-type(3){
        width:180px;
      }
      .pub_lic:nth-of-type(4){
        width:180px;
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
}
.in {
  opacity: 0.5 !important;
}
.modal-backdrop {
  z-index: 2100 !important;
}
.modal {
  z-index: 100000 !important;
}
//.list-container{
//    height: 500px;   
//    overflow-y:scroll; overflow-x:hidden
//}
</style>
