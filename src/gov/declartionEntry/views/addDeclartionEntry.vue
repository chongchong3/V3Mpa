<template>
  <div class="add_content">
    <div class="content_wrapper">
      <el-form :model="formData" :rules="rules" ref="form">
        <div class="module">
          <div class="title">公示标题</div>
          <el-form-item label="公示标题" prop="title">
            <el-input v-model="formData.title"></el-input>
          </el-form-item>
          <el-form-item label="发文机关 " prop="issuedOffice">
            <el-input :value="formData.issuedOffice" disabled></el-input>
          </el-form-item>
          <el-form-item label="关联政策 " prop="associatedPolicyId">
            <el-select v-model="formData.associatedPolicyId">
              <el-option
                v-for="type in associatedPolicyOption"
                :key="type.lable"
                :value="type.id"
                :label="type.policyTitle"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="module">
          <div class="title">适用企业</div>
          <el-form-item label="支持对象" prop="support">
            <el-input v-model="formData.support"></el-input>
          </el-form-item>
          <el-form-item label="执行期限" prop="startTime">
            <el-date-picker
              v-model="formData.startTime"
              align="right"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="开始日期"
            ></el-date-picker>
            <el-date-picker
              v-model="formData.overTime"
              align="right"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
        </div>
        <div class="module">
          <div class="title">申报链接</div>
          <el-form-item label="申报链接" prop="declareLink">
            <el-input v-model="formData.declareLink"></el-input>
          </el-form-item>
        </div>
        <div class="module">
          <div class="title">申报指南</div>
          <el-form-item label="申报指南" style="width: 800px;">
            <quill-editor
              v-model="formData.content"
              ref="myQuillEditor"
              :options="editorOption"
              style="width:700px;height: 500px;"
            ></quill-editor>
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
                name="fileUpload"
                :data="upData"
              >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </div>
          </el-form-item>
        </div>
      </el-form>
      <div class="buttons">
        <button class="closes btn" @click="back">取消</button>
        <button class="sures btn" @click="suresEvent">确认</button>
      </div>
    </div>
  </div>
</template>
<script>
import { notEmpty, isHttp } from "@/common/helpers/rules.js";
import * as inter from "@api/gov/declartionEntry";
export default {
  data() {
    return {
      uploadFileUrl: inter.uploadFile,
      headers: {},
      fileList: [],
      formData: {
        title: "",
        issuedOffice: localStorage.getItem("name"),
        associatedPolicyId: "",
        support: "",
        dateRange: [],
        declareLink: "",
        fileName: "",
        content: "",
        startTime: "",
        overTime: ""
      },
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
        title: [notEmpty("公示标题")],
        associatedPolicyId: [notEmpty("关联政策")],
        support: [notEmpty("支持对象")],
        dateRange: [notEmpty("执行期限")],
        declareLink: [isHttp("申报链接")],
        content: [notEmpty("申报指南")]
      },
      associatedPolicyOption: [],
      fileData: [],
      upData: {}
    };
  },
  created() {
    this.headers.token = localStorage.getItem("token");
    if (this.$route.query.historyId !== null) {
      this.upData = this.$route.query.historyId;
    }
    this.initChange();
  },
  mounted() {
    if (this.$route.query.id !== null && this.$route.query.id !== undefined) {
      this.editData(this.$route.query.id);
    }
  },
  methods: {
    initChange() {
      inter.getAssociatedPolicy().then(response => {
        if (response.code === "0000") {
          this.associatedPolicyOption = response.data; //关联政策
          this.formData.associatedPolicyId = response.data[0].id;
        }
      });
    },
    editData(id) {
      inter.getOneProjectDeclare({ id }).then(response => {
        if (response.code === "0000") {
          let data = response.data;
          (data.startTime =
            data.startTime !== null ? data.startTime.split(" ")[0] : ""),
            (data.overTime =
              data.overTime !== null ? data.overTime.split(" ")[0] : "");
          this.formData.associatedPolicy = data.associatedPolicy;
          data.mapList.map((v, i) => {
            this.fileList.push({
              name: v.pdf,
              response: { data: v.file, fileName: v.fileName }
            });
          });
          delete data.mapList;
          this.formData = { ...data };
          // this.formData.associatedPolicyId = response.data[0].id;
        }
      });
    },
    // 预览pdf
    clickUploadFile(file) {
      let params = { fileName: file.response.fileName };
      inter.previewOnHtml(params).then(response => {
        if (response.code == "0000") {
          window.open(response.data);
        }
      });
    },
    //提交表单
    suresEvent(status) {
      this.$refs["form"].validate(valid => {
        if (valid) {
          let files = this.$refs.upload._data.uploadFiles;
          this.formData.fileName = files
            .map(item => item.response.data)
            .join(",");
          inter.insertDeclareInformation(this.formData).then(response => {
            if (response.code == "0000") {
              this.$router.push("/declartionEntryList");
            }
          });
        } else {
          this.$message.error("提交文件有误");
        }
      });
    },
    // 上传文件
    successUploadFile(res, file, fileList) {
      if (res.code == "0000") {
        this.fileData.push(res.data);
        this.formData.fileName = this.fileData.join(",");
      } else {
        this.$message.error(res.msg);
      }
    },
     back(){
        this.$router.push({path:'/'})
    }
  }
};
</script>
<style lang="less">
.quill-editor {
  height: 745px;

  .ql-container {
    height: calc(100% - 100px);
  }
}

.limit {
  height: 30px;
  border: 1px solid #ccc;
  line-height: 30px;
  text-align: right;

  span {
    color: #ee2a7b;
  }
}

.ql-snow .ql-editor img {
  max-width: 480px;
}

.ql-editor .ql-video {
  max-width: 480px;
}
</style>

<style lang="less" scoped>
@import "../less/declartionEntry";
</style>
