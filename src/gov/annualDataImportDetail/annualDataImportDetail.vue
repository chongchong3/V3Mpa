<template>
    <BasePage>
        <div>
            <!-- HTML内容 -->
            <div class="content-container-outer">
                <section v-if="!isShowFailList">
                    <el-table :data="historyList" style="width: 100%">
                        <el-table-column
                            type="index"
                            label="序号"
                            align="center"
                        >
                        </el-table-column>

                        <el-table-column
                            prop="dataYear"
                            label="数据年份"
                            align="center"
                        >
                        </el-table-column>

                        <el-table-column
                            label="数据导入"
                            align="center"
                            show-overflow-tooltip
                        >
                            <template slot-scope="scope">
                                <div>
                                    <span class="xlsName">{{
                                        scope.row.shortFileName
                                    }}</span>
                                    <el-button
                                        v-if="scope.row.fileName"
                                        type="text"
                                        icon="el-icon-view"
                                        @click="viewFileInPDF(scope)"
                                    ></el-button>

                                    <el-upload
                                        action=""
                                        :show-file-list="false"
                                        :file-list="fileList"
                                        accept=".xlsx,.xls"
                                        :data="{
                                            id: scope.row.id,
                                            type: type
                                        }"
                                        :http-request="uploadFile"
                                        style="display:inline-block"
                                    >
                                        <el-button
                                            type="text"
                                            icon="el-icon-upload2"
                                        ></el-button>
                                    </el-upload>

                                    <el-button
                                        v-if="scope.row.fileName"
                                        type="text"
                                        icon="el-icon-download"
                                        @click="downloadFile(scope)"
                                    ></el-button>
                                </div>
                            </template>
                        </el-table-column>

                        <el-table-column
                            prop="realName"
                            label="操作人"
                            show-overflow-tooltip
                            align="center"
                        >
                        </el-table-column>

                        <el-table-column
                            prop="updateTime"
                            align="center"
                            label="操作时间"
                            show-overflow-tooltip
                        >
                        </el-table-column>

                        <el-table-column
                            prop="address"
                            align="center"
                            label="字段关联"
                        >
                            <!--三种状态 empty upload done-->
                            <template slot-scope="scope">
                                <div v-if="(stage = 'empty')">
                                    <el-button
                                        type="text"
                                        @click="showFailList(scope)"
                                        >失败{{ scope.row.failNum }}</el-button
                                    >
                                    <el-button
                                        type="text"
                                        @click="showLinkDialogFunc(scope)"
                                        >关联</el-button
                                    >
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>

                    <PDFViewer
                        :src="pdfsrc"
                        :isShow.sync="showPdf"
                        ref="pdfviewer"
                    ></PDFViewer>

                    <el-dialog
                        title="字段关联"
                        :visible.sync="showLinkDialog"
                        width="100px;"
                    >
                        <span>选择导入模板：{{ type }}</span>
                        <section class="flex-box">
                            <div class="leftTable">
                                <span>excel字段列表模板字段列表</span>
                                <el-table :data="titleList" class="overScroll">
                                    <el-table-column
                                        type="index"
                                        label="序号"
                                        width="50"
                                        align="center"
                                    ></el-table-column>
                                    <el-table-column
                                        prop="name"
                                        label="导入字段"
                                        align="center"
                                    ></el-table-column>
                                    <el-table-column
                                        align="center"
                                        prop="address"
                                        width="200"
                                        label="关联情况"
                                    >
                                        <template slot-scope="scope">
                                            <span v-if="scope.row.sysIdx"
                                                >{{ scope.row.sysIdx + ". " }}
                                                {{ scope.row.sysVal }}</span
                                            >
                                            <el-popover
                                                placement="top"
                                                width="160"
                                                v-model="scope.row.showPopOver"
                                            >
                                                <p>
                                                    关联序号
                                                </p>
                                                <el-form
                                                    :model="scope.row"
                                                    :ref="scope.row.name"
                                                >
                                                    <el-form-item
                                                        prop="willLinkIdx"
                                                        :rules="{
                                                            validator: checkUnique,
                                                            trigger: 'blur'
                                                        }"
                                                    >
                                                        <el-input
                                                            size="mini"
                                                            placeholder="请输入序号"
                                                            v-model.number="
                                                                scope.row
                                                                    .willLinkIdx
                                                            "
                                                        ></el-input>
                                                    </el-form-item>
                                                </el-form>

                                                <div
                                                    style="text-align:right; margin-top:10px"
                                                >
                                                    <el-button
                                                        size="mini"
                                                        type="text"
                                                        @click="
                                                            scope.row.showPopOver = false
                                                        "
                                                        >取消</el-button
                                                    >
                                                    <el-button
                                                        type="primary"
                                                        size="mini"
                                                        @click="
                                                            startLink(scope)
                                                        "
                                                        >确定</el-button
                                                    >
                                                </div>
                                                <el-button
                                                    icon="el-icon-share"
                                                    type="text"
                                                    slot="reference"
                                                ></el-button>
                                            </el-popover>

                                            <el-button
                                                v-if="scope.row.sysIdx"
                                                icon="el-icon-close"
                                                type="text"
                                                @click="cancelLink(scope)"
                                            ></el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>

                            <div class="rightTable">
                                <span>系统字段</span>
                                <el-table :data="tableList" class="overScroll">
                                    <el-table-column
                                        type="index"
                                        label="序号"
                                        align="center"
                                        width="50"
                                    ></el-table-column>
                                    <el-table-column
                                        prop="name"
                                        label="系统字段"
                                        align="center"
                                    ></el-table-column>
                                </el-table>
                            </div>
                        </section>
                        <div slot="footer">
                            <el-button @click="showLinkDialog = false"
                                >取消</el-button
                            >
                            <el-button type="primary" @click="postNewLink"
                                >确定</el-button
                            >
                        </div>
                    </el-dialog>
                </section>

                <section v-else>
                    <el-table :data="failList" style="width: 100%">
                        <el-table-column
                            type="index"
                            label="序号"
                            align="center"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="introduction"
                            label="企业名称"
                            align="center"
                            min-width="180"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="introduction"
                            label="导入失败原因"
                            align="center"
                            min-width="180"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="updateTime"
                            label="导入时间"
                            show-overflow-tooltip
                            align="center"
                            min-width="180"
                        >
                        </el-table-column>
                    </el-table>
                    <div class="flex-center">
                        <el-pagination
                            background
                            layout="prev, pager, next"
                            :total="failTotal"
                            :current-page.sync="filterFail.pageNum"
                            :page-size="filterFail.pageSize"
                        >
                        </el-pagination>
                    </div>
                    <el-button
                        type="primary"
                        @click="isShowFailList = !isShowFailList"
                        >返回</el-button
                    >
                </section>
            </div>
        </div>
    </BasePage>
</template>

<script>
import BasePage from "@/components/BasePage";
import PDFViewer from "../../components/PDFViewer";

import { getUrlParam, toHtmlStr } from "../../common/utils/index";

import {
    getHitory,
    getFailList,
    previewOnHtml,
    uploadFile,
    getNameList,
    getExcelTitle,
    parseEntExcel
} from "@api/gov/annualDataImportDetail";

export default {
    data() {
        return {
            filters: {
                type: "",
                pageSize: 10,
                pageNum: 1
            },
            historyTotal: 0,
            historyList: [],

            isShowFailList: false,
            filterFail: {
                type: "",
                pageNum: 1,
                pageSize: 10,
                dataYear: ""
            },
            type: "",
            failTotal: 0,
            failList: [],

            pdfsrc: "",
            showPdf: false,
            fileList: [],

            // 关联字段
            showLinkDialog: false,
            currentIds: -1,
            titleList: [],
            tableList: [],
            // empty uploading upload done
            stage: "empty"
        };
    },
    created() {
        this.type = getUrlParam("name");
        this.filters.type = this.type;
        this.filterFail.type = this.type;
        this.getFilterData();

        getNameList({
            name: this.type
        }).then(res => {
            if (res.code == 0) {
                let sysObj = {};
                this.tableList = Array.from(res.data, (name, idx) => {
                    let obj = {
                        name,
                        idx: idx + 1
                    };
                    sysObj[name] = obj;

                    return obj;
                });
            } else {
                this.$message.error(res.msg);
            }
        });
    },
    watch: {
        filterFail: {
            handler(newVal, oldVal) {
                this.getFailList();
            },
            deep: true
        }
    },

    methods: {
        postNewLink() {
            let map = {};
            this.titleList.map(item => {
                map[item.name] = item.sysVal;
            });
            parseEntExcel({
                id: this.currentIds,
                map
            }).then(res => {
                if (res.code == 0) {
                    this.$message.success(res.msg);
                    this.showLinkDialog = false;
                } else {
                    this.$message.error(res.msg);
                }
            });
        },

        cancelLink({ row }) {
            row.sysIdx = "";
            row.sysVal = "";
            row.willLinkIdx = "";
        },

        // 关联
        startLink({ row }) {
            this.$refs[row.name].validate(valid => {
                if (valid) {
                    let sysObj = this.tableList[row.willLinkIdx - 1];
                    row.sysIdx = sysObj.idx;
                    row.sysVal = sysObj.name;
                    row.showPopOver = false;
                }
            });
        },

        // table中的序号不能重复
        checkUnique(rule, value, cb) {
            let idx = this.titleList.findIndex(item => item.sysIdx === value);
            if (~idx) {
                cb(new Error("字段重复"));
            }
            cb();
        },

        // 关联字段弹框
        showLinkDialogFunc({ row: { id } }) {
            this.showLinkDialog = true;
            this.currentIds = id;
            getExcelTitle({ id }).then(res => {
                if (res.code == 0) {
                    let arr = [];
                    for (let prop in res.data) {
                        arr.push({
                            name: res.data[prop],
                            idx: arr.length,
                            sysIdx: "",
                            sysVal: "",
                            willLinkIdx: "",

                            showPopOver: false
                        });
                    }
                    this.titleList = arr;

                    // TODO
                    this.initLink(arr, this.tableList);
                } else {
                    this.$message.error(res.msg);
                }
            });
        },

        // TODO
        // 初始化关联数据
        initLink(titleList, sysList) {
            let map = new Map();
            for (let v of sysList) {
                map.set(v.name, v);
            }

            titleList.forEach(item => {
                let v = map.get(item.name);
                item.sysIdx = v ? v.idx : "";
                item.sysVal = v ? v.name : "";
            });
            console.log(map);
        },

        showFailList({ row }) {
            this.filterFail.dataYear = row.dataYear;
            this.isShowFailList = true;
        },

        uploadFile(file) {
            let fd = new FormData();
            fd.append("fileUpload", file.file);
            for (let prop in file.data) {
                fd.append(prop, file.data[prop]);
            }
            uploadFile(fd).then(res => {
                if (res.code == 0) {
                    this.$message.success(res.msg);
                    this.getFilterData();
                } else {
                    this.$message.error(res.msg);
                }
            });
        },

        downloadFile({ row }) {
            location.href = "import/downloadFile?id=" + row.id;
        },

        // 文件预览
        viewFileInPDF({ row }) {
            previewOnHtml({ fileName: row.fileName }).then(res => {
                this.pdfsrc = res;
                this.showPdf = true;
            });
        },

        updateStage() {
            console.log(this.stage);
            switch (this.stage) {
                case "empty": {
                    break;
                }
                case "upload": {
                    break;
                }
                case "uploading": {
                    break;
                }
                case "done": {
                    break;
                }
            }
        },

        getFailList() {
            getFailList(this.filterFail).then(res => {
                if (res.code == 0) {
                    this.failList = res.data.results;
                    this.failTotal = res.data.totalRecord;
                } else {
                    this.$message.error(res.msg);
                }
            });
        },

        getFilterData() {
            getHitory(this.filters).then(res => {
                if (res.code == 0) {
                    let { results } = res.data;
                    results.forEach(
                        item =>
                            (item.shortFileName = item.fileName.replace(
                                /.+-/,
                                ""
                            ))
                    );
                    this.historyList = res.data.results;
                    this.historyTotal = res.data.totalRecord;
                } else {
                    this.$message.error(res.data);
                }
            });
        }
    },
    components: {
        BasePage,
        PDFViewer
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
    margin-top: 20px;
    min-height: 200px;
    .xlsName {
        width: 150px;
        white-space: normal;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .tables {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
    }
    .overScroll {
        height: 400px;
        overflow-x: hidden;
        overflow-y: auto;
    }
    .flex-box {
        justify-content: space-between;
        .leftTable {
            width: 55%;
        }
        .rightTable {
            width: 40%;
        }
    }

    .match {
        display: flex;
        justify-content: space-around;

        .el-icon-close {
            color: red;
        }
        .el-icon-share {
            color: green;
        }
    }
}
</style>
