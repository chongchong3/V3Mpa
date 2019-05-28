<template>
    <div class="contentlist">
        <div class="use-bulk" id="ultimateShareholder">
            <div class="header">{{ Patent.title }}</div>
            <div class="ultimateShareholderTable" id="ultimateShareholderTable">
                <el-table
                    :data="Patent.TableList.results"
                    stripe
                    style="width: 100%"
                >
                    <el-table-column type="index" width="50"></el-table-column>
                    <el-table-column
                        :label="data.label"
                        :prop="data.props"
                        v-for="(data, index) of Patent.HeadList"
                        :key="index"
                    ></el-table-column>
                </el-table>
            </div>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="current"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalRecord"
            ></el-pagination>
        </div>
    </div>
</template>
<script>
import { toHtmlStr } from "@/common/utils/index";
// import toHtmlStr from "@/common/utils/toHtmlStr.js";
import { enterpriseName } from "@/common/constant/constantConst.js"; //获取路径名
export default {
    props: {
        Patent: {
            type: Object,
            default: {}
        },
        type: "string"
    },
    data() {
        return {
            toHtmlStr: toHtmlStr,
            current: 1, //当前页
            pageSize: 10, //每页条数
            totalRecord: 0 //总条数
        };
    },
    mounted() {},
    methods: {
        handleSizeChange(val) {
            this.pageSize = val;
            //   this.searchEvent();
            // console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.current = val;
            //   this.searchEvent();
            this.$emit("ListenChild", "I am child.vue", this.type);
            // console.log(`当前页: ${val}`);
        }
    }
};
</script>
<style lang="less" scoped>
.el-tabs__header {
    margin: 0;
}
.contentlist {
    border: 1px solid #e4e7ed;
    margin-bottom: 20px;
}
#ultimateShareholder {
    padding: 0 40px 20px 40px;
    background: #fff;
    box-shadow: 0 0px 2px 2px rgba(64, 158, 255, 0.5);
    .header {
        color: #666;
        font-size: 16px;
        position: relative;
        padding: 20px 0;
        padding-left: 17px;
        &::before {
            content: "";
            display: inline-block;
            width: 6px;
            height: 20px;
            border-radius: 3px;
            background: #007bff;
            position: absolute;
            left: 0;
        }
    }
}
</style>


