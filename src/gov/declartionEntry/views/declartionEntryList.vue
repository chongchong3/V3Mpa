<template>
  <div id="wrapper_content">
    <div class="content_top">
      <div class="choose_left">
        <el-select v-model="query.associatedPolicy" @change="initTable(1)" placeholder="请选择">
          <el-option
            v-for="item in policyOptions"
            :key="item.name"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select>
        <el-select v-model="query.issuedOffice" @change="initTable(1)" placeholder="请选择">
          <el-option
            v-for="item in officeOptions"
            :key="item.name"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select>
      </div>
      <div class="choose_text">
        <el-input placeholder="请输入项目申报标题关键字" v-model="query.title" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="initTable(1)"></el-button>
        </el-input>
        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addPolicy">项目申报录入</el-button>
      </div>
    </div>
    <div class="content_middle">
      <div class="entry_list" v-for="(row,index) in tableData" :key="index">
        <div class="pub_lic">
          <div class="one">
            <div
              class="blocks"
              :class="index%2==0 ?'type-sj':' type-qt'"
            >{{row.issuedOffice.substring(0,1)}}</div>
            <div class="one_text" @click="guideLink(row.id)">{{row.title}}</div>
          </div>
        </div>
        <div class="pub_lic width_10">
          <div class="type">政策类别</div>
          <div class="child">{{row.associatedPolicy}}</div>
        </div>
        <div class="pub_lic width_10">
          <div class="type">支持对象</div>
          <div class="child">{{row.support}}</div>
        </div>
        <div class="pub_lic width_10">
          <div class="type">申报起止日期</div>
          <div class="child">{{row.dataTime}}</div>
        </div>
        <div class="pub_edit">
          <div
            class="edit"
            :class="row.isNowUser==0 ?'no_user':''"
            @click="editList(row.id,row.declareHistoryId,row.isNowUser)"
          >
            <i class="fa fa-pencil-square-o"></i>
            <span>编辑</span>
          </div>
          <span class="sg">|</span>
          <div
            class="del"
            :class="row.isNowUser==0 ?'no_user':''"
            @click="delList(row.id,row.declareHistoryId,row.isNowUser)"
          >
            <i class="fa fa-trash-o"></i>
            <span>删除</span>
          </div>
        </div>
      </div>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="pageNum"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="totalRecord"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import * as inter from "@api/gov/declartionEntry";

export default {
  data() {
    return {
      policyOptions: [],
      officeOptions: [],
      query: { title: "", issuedOffice: "", associatedPolicy: "" },
      tableData: [],
      pageNum: 1,
      totalRecord: 0,
      pageSize: 10
    };
  },
  created() {
    this.init();
  },

  methods: {
    init() {
      this.initTable(this.pageNum);
      this.initPolicy();
    },
    initTable(pageNum) {
      let params = {
        title: this.query.title,
        associatedPolicy: this.query.associatedPolicy,
        issuedOffice: this.query.issuedOffice,
        pageNum: pageNum,
        pageSize: this.pageSize
      };
      inter.getProjectDeclareList(params).then(res => {
        if (res.code === "0000") {
          this.pageNum = res.data.pageNum;
          this.totalRecord = res.data.totalRecord;
          res.data.results.map((v, i) => {
            v.issuedOffice = v.issuedOffice.substring(0, 1);
          });
          this.tableData = res.data.results;
        }
      });
    },
    initPolicy() {
      inter.getSelect().then(res => {
        if (res.code === "0000") {
          this.policyOptions = res.data.declare;
          this.officeOptions = res.data.department;
        }
      });
    },
   
    delList(id, historyId, isNowUser) {
      if (isNowUser == 0) {
        this.$message.warning("你没有权限操作该内容！");
        return;
      }
      this.$confirm('确定删除？')
          .then(_ => {
            inter.deleteProjectDeclare({ id: id }).then(res => {
              if (res.code === "0000") {
                 this.$message.success("删除成功");
                this.initTable(1);
              }
            });
          })
          .catch(_ => {
            this.$message("已取消删除");
          });
     
    },
    editList(id, historyId, isNowUser) {
      if (isNowUser == 0) {
        this.$message.warning("你没有权限操作该内容！");
        return;
      }
      this.$router.push({path:"/addDeclartionEntry",query:{id:id,historyId:historyId}});
    },
    addPolicy() {
      this.$router.push("/addDeclartionEntry");
    },
    guideLink(id){
        this.$router.push({path:"/declarationGuide",query:{id:id}});
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.initTable(val);
    }
  }
};
</script>

<style lang="less" scoped>
@import "../less/declartionEntry";
</style>
