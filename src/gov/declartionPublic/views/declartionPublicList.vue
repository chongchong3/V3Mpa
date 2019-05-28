<template>
  <div id="wrapper_content">
    <div class="content_top">
      <div class="choose_text">
        <el-input placeholder="请输入项目申报标题关键字" v-model="query.title" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="initTable(1)"></el-button>
        </el-input>
        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addPublic">申报结果发布</el-button>
      </div>
    </div>
    <div class="content_middle">
      <el-table :data="tableData"  style="width: 100%">
        <el-table-column  label="公示标题" >
           <template slot-scope="scope">
            <el-button @click="publicLink(scope.row.id)" type="text" size="small">{{scope.row.title}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="发布日期"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="editList(scope.row.id, scope.row.historyId, scope.row.isNowUser)" type="text" size="small">编辑</el-button>
            <el-button type="text" size="small" @click="delList(scope.row.id, scope.row.isNowUser)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
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
import * as inter from "@api/gov/declartionPublic";

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
     this.initTable(this.pageNum);
  },

  methods: {
    initTable(pageNum) {
      let params = {
        title: this.query.title,
        pageNum: pageNum,
        pageSize: this.pageSize
      };
      inter.getDeclareResultList(params).then(res => {
        if (res.code === "0000") {

          this.pageNum = res.data.pageNum;
          this.totalRecord = res.data.totalRecord;
          res.data.results.map((v, i) => {
            v.createTime = v.createTime.split(' ')[0];
          });
          this.tableData = res.data.results;
        }
      });
    },
    publicLink(id){
        this.$router.push({
        path: "/publicDetails",
        query: { id: id }
      });
    },
    delList(id, isNowUser) {
      if (isNowUser == 0) {
        this.$message.warning("你没有权限操作该内容！");
        return;
      }
      this.$confirm("确定删除？")
        .then(_ => {
          inter.deleteDeclareResult({ id: id }).then(res => {
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
      this.$router.push({
        path: "/addDeclartionPublic",
        query: { id: id, historyId: historyId }
      });
    },
    addPublic() {
      this.$router.push("/addDeclartionPublic");
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.initTable(val);
    }
  }
};
</script>

<style lang="less" scoped>
@import "../less/declartionPublic";

</style>
<style>
.el-table th{
  background: #5C7CEC;
  color: #fff;
  text-align: center;
}
.el-table td{
  text-align: center;
}
</style>

