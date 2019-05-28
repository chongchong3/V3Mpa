<template>
    <section class="content-container-outer">
        <div class="flex-center steps_wrap">
            <el-steps
                style="width: 500px;"
                :active="active"
                finish-status="success"
                align-center
            >
                <el-step title="信息编辑"></el-step>
                <el-step title="发布成功"></el-step>
            </el-steps>
        </div>
        <div v-if="active === 0">
            <el-form :model="formData" :rules="rules" ref="form">
                <div class="module">
                    <div class="title">
                        基础信息
                    </div>
                    <el-form-item label="政策标题" prop="policyTitle">
                        <el-input v-model="formData.policyTitle"></el-input>
                    </el-form-item>
                    <el-form-item label="索引号">
                        <el-input v-model="formData.referNumber"></el-input>
                    </el-form-item>
                    <el-form-item label="发文字号">
                        <el-input v-model="formData.issuedNumber"></el-input>
                    </el-form-item>
                    <el-form-item label="发文机关 " prop="publishDepartment">
                        <el-input
                            :value="formData.publishDepartment"
                            disabled
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="政策类别 " prop="policyType">
                        <el-select v-model="formData.policyType">
                            <el-option
                                v-for="type in typeList"
                                :key="type.name"
                                :value="type.name"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="module">
                    <div class="title">
                        试用企业
                    </div>
                    <el-form-item label="支持对象" prop="supportTarget">
                        <el-input v-model="formData.supportTarget"></el-input>
                    </el-form-item>
                    <el-form-item label="执行期限" prop="dateRange">
                        <el-date-picker
                            v-model="formData.dateRange"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="yyyy-MM-dd"
                        >
                        </el-date-picker>
                    </el-form-item>
                </div>
                <div class="module">
                    <div class="title">
                        服务信息
                    </div>
                    <el-form-item label="执行单位">
                        <el-input v-model="formData.issuedOffice"></el-input>
                    </el-form-item>
                    <el-form-item label="联系人">
                        <el-input v-model="formData.executionUnit"></el-input>
                    </el-form-item>
                    <el-form-item label="联系方式">
                        <el-input v-model="formData.linkman"></el-input>
                    </el-form-item>
                </div>
                <div class="module">
                    <div class="title">
                        政策信息
                    </div>
                    <el-form-item label="政策提炼">
                        <el-input
                            type="textarea"
                            v-model="formData.policyRefinement"
                            style="width: 350px"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="正文" style="width: 800px;">
                        <quill-editor
                            v-model="formData.textContent"
                            ref="myQuillEditor"
                            :options="editorOption"
                            style="width:700px;height: 500px;"
                        >
                        </quill-editor>
                    </el-form-item>
                    <el-form-item label="附件">
                        <div style="width:350px;">
                        <el-upload
                            ref="upload"
                            :action="uploadFileUrl"
                            :headers="headers"
                            :on-success="successUploadFile"
                            :on-preview="clickUploadFile"
                            :file-list="fileList"
                        >
                            <el-button size="small" type="primary"
                                >点击上传</el-button
                            >
                        </el-upload>
                        </div>
                    </el-form-item>
                </div>
            </el-form>
            <div class="flex-center">
                <el-button @click="$router.push('/policyLibList')">
                    取消
                </el-button>
                <el-button type="primary" @click="previewPolicy">
                    预览
                </el-button>
                <el-button type="primary" @click="submitPolicy(1)">
                    暂存
                </el-button>
                <el-button type="primary" @click="submitPolicy(4)">
                    发布
                </el-button>
            </div>
        </div>

        <div v-else-if="active === 1">
            <div class="policy_success">
                <i
                    class="el-icon-success"
                    style="font-size: 40px; color:#52c41a"
                ></i>
                <span style="margin-top:20px;">该政策发布成功</span>

                <el-button
                    type="primary"
                    @click="$router.push('/')"
                    style="margin-top:250px;"
                    >返回政策文库</el-button
                >
            </div>
        </div>
        <PDFViewer :src="pdfSrc" :isShow.sync="isShow" />
    </section>
</template>

<script>
import {
    addPolicy,
    editPolicy,
    getPolicyById,
    getDropDownList,
    uploadFileUrl
} from "@api/gov/policylLib";
import { notEmpty, noBlank, isPhone } from "@/common/helpers/rules.js";

import PDFViewer from "@/components/PDFViewer";
export default {
    data() {
        return {
            uploadFileUrl,
            headers: {},
            fileList: [],

            active: 0,
            typeList: [],
            editorOption: {
                placeholder: "请输入内容",
                modules: {
                    toolbar: [
                        ["bold", "italic", "underline", "strike"],
                        ["blockquote", "code-block"],
                        [{ header: 1 }, { header: 2 }],
                        [{ list: "ordered" }, { list: "bullet" }],
                        [{ script: "sub" }, { script: "super" }],
                        [{ indent: "-1" }, { indent: "+1" }],
                        [{ direction: "rtl" }],
                        [{ size: ["small", false, "large", "huge"] }],
                        [{ header: [1, 2, 3, 4, 5, 6, false] }],
                        [{ font: [] }],
                        [{ color: [] }, { background: [] }],
                        [{ align: [] }],
                        ["clean"]
                    ]
                }
            },

            rules: {
                dateRange: [notEmpty("执行期限")],
                policyTitle: [notEmpty("政策标题")],
                publishDepartment: [notEmpty("发文机关")],
                policyType: [notEmpty("政策类别")],
                supportTarget: [notEmpty("支持对象"), noBlank()]
            },

            formData: {
                dateRange: [],
                fileName: "",
                ossUrl: "",
                ossPdfUrl: "",
                textContent: "",

                pushEnt: 2,
                legalPerson: 2,
                startDate: "",
                endDate: "",
                publishDepartment: "",
                policyType: "",
                policyTitle: "",
                referNumber: "",
                issuedNumber: "",
                supportTarget: "",
                issuedOffice: "",
                executionUnit: "",
                linkman: "",
                policyRefinement: "",
                status: 1
            },

            pdfSrc: "",
            isShow: false
        };
    },

    // 导航守卫，判断
    // 1: 预览过来，且不带id， 从params取
    // 2: 有id，reqest
    // 3: 都没有，基础初始化
    beforeRouteEnter(to, from, next) {
        next(vm => {
            if (from.path === "/policyDetail" && from.params.formData) {
                vm.formatterData(from.params.formData);
            } else if (to.query.policyId) {
                vm.policyId = to.query.policyId;
                getPolicyById({ id: vm.policyId }).then(res => {
                    if (res.code == 0) {
                        vm.formatterData(res.data)
                    } else {
                        vm.$message.error(res.msg);
                    }
                });
            }
        });
    },
    created() {
        this.getDropDownList();

        this.headers.token = localStorage.getItem("token");

        this.formData.publishDepartment = localStorage.getItem("name");
    },
    methods: {
        previewPolicy(file) {
            this.$router.push({
                name: "政策文库详情",
                params: {
                    formData: this.getFormatterData()
                }
            });
        },

        // 格式化成显示的格式
        formatterData(data = {}) {
            data.dateRange = [data.startDate, data.endDate];
            this.formData = data;
            let fileNames = data.fileName.split(","),
                ossUrls = data.ossUrl.split(","),
                ossPdfUrls = data.ossPdfUrl.split(","),
                arr = [];

            fileNames.forEach((fileName, idx) => {
                if(fileName) {
                    arr.push({
                        name: fileName,
                        fileName,
                        ossUrl: ossUrls[idx],
                        ossPdfUrl: ossPdfUrls[idx]
                    })
                }
            });
            this.fileList = arr;
        },

        // 格式化成提交的格式
        getFormatterData() {
            let { ...formData } = this.formData;
            // 附件数据
            let files = this.$refs["upload"].$data.uploadFiles;
            formData.fileName = files.map(item => item.name).join(",");
            formData.ossUrl = files.map(item => item.ossUrl).join(",");
            formData.ossPdfUrl = files.map(item => item.ossPdfUrl).join(",");

            formData.dateRange = formData.dateRange || [];
            formData.startDate = formData.dateRange[0];
            formData.endDate = formData.dateRange[1];
            return formData;
        },

        submitPolicy(status) {
            this.$refs["form"].validate(valid =>{
                if(valid) {
                    let { dateRange, ...formData } = this.getFormatterData();

                    formData.status = status;

                    let { policyId } = this.$route.query,
                        reqFunc;
                    if (policyId) {
                        reqFunc = editPolicy;
                    } else {
                        reqFunc = addPolicy;
                    }

                    reqFunc(formData).then(res => {
                        if (res.code == 0) {
                            if (status === 1) {
                                this.$message.success(res.msg);
                                this.$router.push("/");
                            } else if (status == 4) {
                                this.active++;
                            }
                        } else {
                            this.$message.error(res.msg);
                        }
                    });
                }
            })            
        },

        getDropDownList() {
            getDropDownList().then(res => {
                if (res.code == 0) {
                    this.typeList = res.data.policyType;
                } else {
                    this.$message.error(res.msg);
                }
            });
        },

        // 上传文件
        successUploadFile(res, file, fileList) {
            if (res.code == 0) {
                let fileData = fileList[fileList.length - 1];
                fileData = Object.assign(fileData, res.data);
            } else {
                this.$message.error(res.msg);
            }
        },

        // 预览pdf
        clickUploadFile(file) {
            this.pdfSrc = file.ossPdfUrl;
            this.isShow = true;
        }
    },
    components: {
        PDFViewer
    }
};
</script>

<style>
.ql-container {
    height: calc(100% - 100px);
}
</style>

<style lang="less" scoped>
.steps_wrap {
    background-color: #fff;
    border-bottom: 1px solid #ccc;
    padding-bottom: 20px;
    margin-bottom: 20px;
}

.el-form {
    width: 625px;
    margin: 0 auto;
}
.el-form-item {
    display: flex;
    justify-content: space-between;
    width: 450px;
}
.el-input,
.el-select {
    display: inline-block;
    width: 350px;
}
.module {
    .title {
        margin: 10px 0;
        border-left: 4px solid #5c7cec;
        padding-left: 10px;
        color: rgba(69, 84, 103, 1);
        font-size: 14px;
        font-weight: bold;
    }
}

.policy_success {
    display: flex;
    align-items: center;
    flex-direction: column;
}
</style>
