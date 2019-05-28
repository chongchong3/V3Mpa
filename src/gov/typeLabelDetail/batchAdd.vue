<template>
    <div>
        <!--批量添加-->
        <div class="content-container-outer">
            <div v-if="fileNum">
                <div class="uploadTop">
                    <el-upload
                        class="upload-demo"
                        drag
                        action="/gov/import/importTypeLabel"
                        :show-file-list="false"
                        :file-list="fileList"
                        :http-request="batchImport"
                    >
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">
                            将文件拖到此处，或<em>点击上传</em>
                        </div>
                    </el-upload>
                </div>
                <div class="uploadBott">
                    <el-table
                        :data="datas"
                        class="fileTable"
                        style="width: 100%"
                    >
                        <el-table-column label="上传文件" align="center">
                            <template slot-scope="scope">
                                <span style="margin-left: 10px">{{
                                    scope.row.fileName.split("-")[1]
                                }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="失败"
                            prop="entName"
                            align="center"
                        >
                            <template slot-scope="scope">
                                <span
                                    style="margin-left: 10px"
                                    :class="
                                        scope.row.failNum == 0 ? '' : 'fileNum'
                                    "
                                    @click="getLabelFailList(scope.row.id)"
                                    >{{ scope.row.failNum }}</span
                                >
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="操作人"
                            prop="entName"
                            align="center"
                        >
                            <template slot-scope="scope">
                                <span style="margin-left: 10px">{{
                                    scope.row.realName
                                }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="上传时间"
                            prop="entName"
                            align="center"
                        >
                            <template slot-scope="scope">
                                <span style="margin-left: 10px">{{
                                    scope.row.updateTime
                                }}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination
                        background
                        layout="prev, pager, next"
                        @current-change="handleCurrentChange"
                        :current-page="common.pageNum"
                        :page-size="common.pageSize"
                        :total="common.total"
                    >
                    </el-pagination>
                </div>
            </div>
            <div v-else>
                <el-table :data="fileDatas" style="width: 100%">
                    <el-table-column label="序号" align="center" width="180">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{
                                scope.$index + 1
                            }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="企业名称"
                        prop="entName"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{
                                scope.row.entName
                            }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="导入失败原因"
                        prop="entName"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{
                                scope.row.introduction
                            }}</span>
                        </template>
                    </el-table-column>

                    <el-table-column
                        label="导入时间"
                        prop="entName"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{
                                scope.row.updateTime
                            }}</span>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    background
                    layout="prev, pager, next"
                    @current-change="handleCurrentChange"
                    :current-page="pageNum"
                    :page-size="pageSize"
                    :total="total"
                >
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import BasePage from "@/components/BasePage";

import {
    getLableUpHistoryList,
    importTypeLabel,
    getLabelFailList
} from "@api/gov/typeLabelDetail";

import { getUrlParam } from "@/common/utils/index";

export default {
    data() {
        return {
            datas: [],
            common: {
                pageNum: 1,
                pageSize: 10,
                total: 0
            },
            pageNum: 1,
            pageSize: 10,
            total: 0,
            fileList: [],
            fileNum: true
        };
    },
    created() {
        this.type = getUrlParam("type");
        this.name = getUrlParam("num");
        this._getReportTable();
    },

    methods: {
        handleCurrentChange(val) {
            this.common.pageNum = val;
            this._getReportTable();
        },
        getLabelFailList(id) {
            getLabelFailList({
                pageNum: this.pageNum,
                pageSize: this.pageSize,
                id: id
            }).then(res => {
                if (res.code == "0000") {
                    this.fileDatas = res.data.results;
                    this.total = res.data.totalRecord;
                    this.fileNum = false;
                } else {
                    this.$message.error(res.msg);
                }
            });
        },
        //文件上传
        batchImport(file) {
            let fd = new FormData();
            fd.append("fileUpload", file.file);
            fd.append("name", this.name);
            importTypeLabel(fd).then(res => {
                if (res.code == "0000") {
                    this.$message.success("修改成功");
                    this._getReportTable();
                } else {
                    this.$message.error(res.msg);
                }
            });
        },
        //上传文件列表
        _getReportTable() {
            getLableUpHistoryList({
                pageNum: this.common.pageNum,
                pageSize: this.common.pageSize,
                name: this.name
            }).then(res => {
                if (res.code == "0000") {
                    this.datas = res.data.results || [];
                    this.common.total = res.data.totalRecord;
                } else {
                    this.$message.error(res.msg);
                }
            });
        }
    },
    components: {
        BasePage
    }
};
</script>

<style lang="less" >
@import "../../common/less/reset.less";
@import "./less/typeLabelDetail";
.uploadTop {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .el-upload-dragger {
        width: 800px;
        height: 150px;
        margin-top: 20px;
        margin-bottom: 20px;
        background-color: #fafdff;
    }
}
.uploadBott {
    margin-top: 30px;
    .fileNum {
        cursor: pointer;
        color: #4465e7;
    }
}
</style>
