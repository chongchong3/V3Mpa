<template>
    <div class="content-container-outer wrapper">
        <el-upload
            drag
            action=""
            accept=".xlsx,.xls"
            :show-file-list="false"
            :file-list="fileList"
            :http-request="batchImport"
            class="flex-center"
        >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
                将文件拖到此处，或<em>点击上传</em>
            </div>
        </el-upload>

        <el-table :data="dataList">
            <el-table-column
                label="上传文件"
                prop="fileName"
                align="center"
                min-width="300"
            >
                <template slot-scope="scope">
                    <span>{{ scope.row.fileName.split("-").pop() }}</span>
                </template></el-table-column
            >
            <el-table-column
                label="失败"
                prop="failNum"
                align="center"
                min-width="120"
            ></el-table-column>
            <el-table-column
                label="操作人"
                prop="realName"
                align="center"
                min-width="120"
            ></el-table-column>
            <el-table-column
                label="上传时间"
                prop="updateTime"
                align="center"
                min-width="300"
            ></el-table-column>
        </el-table>
        <div class="flex-center" style="margin-bottom: 10px;">
            <el-pagination background layout="prev, pager, next" :total="total" :current-page.sync="filters.pageNum" :page-size="filters.pageSize">
            </el-pagination>
        </div>
        <div class="flex-center">
            <el-button type="primary" @click="$router.go(-1)">返回</el-button>
        </div>
    </div>
</template>

<script>
import {
    getLableUpHistoryList,
    importLabel
} from "@api/gov/componyLabel.js";
export default {
    props: {},
    watch: {
        filters: {
            handler(newVal) {
                this.getList();
            }
        }
    },
    data() {
        return {
            fileList: [],
            total: 0,
            dataList: [],
            filters: {
                pageNum: 1,
                pageSize: 10,
                name: ""
            }
        };
    },
    created() {
        this.getList();
    },
    methods: {
        batchImport(file) {
            let fd = new FormData();
            fd.append("fileUpload", file.file);
            getLableUpHistoryList(fd).then(res => {
                if (res.code == 0) {
                    this.$message.success("上传成功");
                    this.getList();
                } else {
                    this.$message.error(res.msg);
                }
            });
        },
        getList() {
            getLableUpHistoryList(this.filters).then(res => {
                if (res.code == 0) {
                    this.dataList = res.data.results;
                    this.total = res.data.totalRecord;
                } else {
                    this.$message.error(res.msg);
                }
            });
        }
    }
};
</script>
