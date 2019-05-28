<template>
  <div data-type="1" data-title="土地数据" class="tab-box">
    <div id="landData">
      <div class="land-data">
        <div class="department itempaper" id="depart1">
          <div class="itempaper-title">
            <span class="splot"></span>
            <span>
              咨询部门
              <span v-show="false">{{totalWaterUsed}}</span>
            </span>
          </div>
          <div class="itempaper-table">
            <el-table
              :data="department.list"
              stripe
              style="width: 100%" align="center" >
              <el-table-column   v-for="(item,index) in land.departmentList" :key="index+'q'"
                :prop="item.key" align="center" 
                :label="item.name"
              >
              </el-table-column>
            </el-table>
            
          </div>
        </div>
        <div class="total itempaper">
          <div class="itempaper-title">
            <span class="splot"></span>
            <span>总量指标</span>
          </div>
          <div class="itempaper-table">
            <el-row :gutter="20" class="data-cells">
              <el-col :span="10" class="data-cells-title">
                <div>总量指标</div>
              </el-col>
              <el-col :span="14" class="data-cells-detail">
                <div>{{landList.totalLand}}</div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="log-land itempaper">
          <div class="itempaper-title">
            <span class="splot"></span>
            <span>登记土地</span>
          </div>
          <div class="itempapers-table">
            <div
              class="contain-item item-com1"
              :id="item.id"
              v-for="(item,index) in landList.landDataList"
              :key="index+'a'"
            >
              <div class="flex-content">
                <div class="table-index index-com" style="height: auto">{{index+1}}</div>
                <div class="tab-main" :id="item.id">
                  <el-row
                    :gutter="20"
                    class="data-cells"
                    v-for="(val,i) in land.logLandList"
                    :key="i+'1'"
                    :index="i"
                  >
                    <el-col :span="10" class="data-cells-title">
                      <div>{{val.name}}</div>
                    </el-col>
                    <el-col
                      :span="14"
                      class="data-cells-detail"
                      :key="i+'p'"
                      v-if="val.key != 'imgUrl'"
                    >
                      <div>{{item[val.key]}}</div>
                    </el-col>
                    <el-col :span="14" class="data-cells-detail imgUrl" :key="val.key+'w'" v-else>
                      <el-upload
                        action="/gov/selfCheck/uploadFile"
                        list-type="picture-card"
                        :disabled="action=='entFile'?false:true"
                        :on-preview="handlePictureCardPreview"
                        :on-success="(res)=>{return upload(res,index,'log')}"
                        :file-list=" item[val.key] | getFileList"
                        :on-remove="(file)=>{return handleRemove(file,index,'log')}"
                      >
                        <i class="el-icon-plus"></i>
                      </el-upload>
                      <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt>
                      </el-dialog>
                    </el-col>
                    <el-col
                      :span="7"
                      class="data-cells-detail appeal_reason"
                      :key="val.key+'r'"

                    >
                      <div>{{item.id | rejectcontent(val.key,rejectUpdateList)}}</div>
                    </el-col>
                    <div
                      class="buttons"
                      v-show="action=='check'&&param.status!=='6'&&val.key!=='imgUrl'"
                      ref="sureApeal"
                    >
                      <button
                        class="sendIdea"
                        :data-key="val.key"
                        @click="sendIdeas($event,val.key,item.id,index)"
                      >发起申诉</button>
                      <button
                        class="sureIdea"
                        :data-key="val.key"
                        @click="sendIdeas($event,val.key,item.id,index)"
                      >确认无误</button>
                    </div>
                    <div class="buttons" v-show="action=='check'&&param.status=='6'&&val.key!=='imgUrl'" v-if="fileArr[index]">
                      <button
                        class="sendIdea"
                        @click="sendIdeas($event,val.key,item.id,index)"
                        :class="fileArr[index].includes(val.key)==true?'disableStatus':''"
                      >{{fileArr[index].includes(val.key)==true?'已申诉':'发起申诉'}}</button>
                      <button
                        class="sureIdea"
                        @click="sendIdeas($event,val.key,item.id,index)"
                        :class="fileArr[index].includes(val.key)==false?'disableStatus1':''"
                      >{{fileArr[index].includes(val.key)!==true?'已确认':'确认无误'}}</button>
                    </div>
                    <div class="buttons appeal" v-show="action=='appealRecord'&&val.key!=='imgUrl'" v-if="fileArr[index]">
                      <div v-if="fileArr[index].includes(val.key)">
                        <button
                          class="sendIdea"
                          @click="backReason(val.key,item.id,$event,'驳回原因',index)"
                        >驳回</button>
                        <button
                          class="sureIdea"
                          @click="backReason(val.key,item.id,$event,'修改',index)"
                        >修改</button>
                      </div>
                      <div v-if="!fileArr[index].includes(val.key)">
                        <i class="iconfont icon-dagoux"></i>核实无误
                      </div>
                    </div>
                  </el-row>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="landin itempaper">
          <div class="itempaper-title">
            <span class="splot"></span>
            <span>承租土地</span>
          </div>
          <div class="itempapers-table">
            <div
              class="contain-item item-com2"
              v-for="(v,i) in landList.rentInLandList"
              :key="i+'t'"
            >
              <div class="flex-content" :id="v.id">
                <div class="table-index index-com2" style="height: auto">{{i+1}}</div>
                <div class="tab-main">
                  <el-row
                    :gutter="20"
                    class="data-cells"
                    v-for="(val,index) in ((v.outType == 1)?land.rendInList:land.rendInListPerson)"
                    :key="index+'u'"
                    :index="index"
                  >
                    <el-col :span="10" class="data-cells-title">
                      <div>{{val.name}}</div>
                    </el-col>
                    <el-col
                      :span="14"
                      class="data-cells-detail"
                      :key="val.key+'o'"
                      v-if="val.key != 'imgUrl'"
                    >
                      <div>{{v[val.key]}}</div>
                    </el-col>
                    <el-col :span="14" class="data-cells-detail imgUrl" :key="val.key+'p'" v-else>
                      <el-upload
                        action="/gov/selfCheck/uploadFile"
                        list-type="picture-card"
                        :disabled="action=='entFile'?false:true"
                        :on-preview="handlePictureCardPreview"
                        :on-success="(res)=>{return upload(res,i,'landIn')}"
                        :file-list=" v[val.key] | getFileList"
                        :on-remove="(file)=>{return handleRemove(file,i,'landIn')}"
                      >
                        <i class="el-icon-plus"></i>
                      </el-upload>
                      <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt>
                      </el-dialog>
                    </el-col>
                    <div
                      class="dataErr"
                      :title="v.erroList?v.content:''"
                      v-show="v.erroList?v.erroList.includes(val.key):false"
                    >
                      <i class="iconfont icon-weiwancheng"></i>
                      <span>数据异常</span>
                    </div>
                  </el-row>
                </div>
              </div>
              <div
                class="edit-data edit-someone editRendOutBtn"
                :id="v.id"
                v-show="action=='entFile'"
              >
                <div class="btn btn-edit" @click="editRend(v,i)">
                  <i class="iconfont icon-xiugai"></i>
                  <div class="tip">
                    编辑
                    <span class="triangle-down"></span>
                  </div>
                </div>
                <div class="btn btn-delete" @click="delRend(i,v.id)" v-show="action=='entFile'">
                  <i class="iconfont icon-shanchu"></i>
                  <div class="tip">
                    删除
                    <span class="triangle-down"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <el-button class="add-data rentInBtn" @click="occurentDio" v-show="action=='entFile'">
            <i class="iconfont icon-jia"></i>添加
          </el-button>
        </div>
        <div class="landout itempaper">
          <div class="itempaper-title">
            <span class="splot"></span>
            <span>出租土地</span>
          </div>
          <div class="itempapers-table">
            <div
              class="contain-item item-com2"
              v-for="(v,i) in landList.rentOutLandList"
              :key="i+'s'"
            >
              <div class="flex-content" :id="v.id">
                <div class="table-index index-com2" style="height: auto">{{i+1}}</div>
                <div class="tab-main">
                  <el-row
                    :gutter="20"
                    class="data-cells"
                    v-for="(val,index) in land.rendOutList"
                    :key="index+'d'"
                    :index="index"
                  >
                    <el-col :span="10" class="data-cells-title">
                      <div>{{val.name}}</div>
                    </el-col>
                    <el-col
                      :span="14"
                      class="data-cells-detail"
                      :key="val.key+'g'"
                      v-if="val.key != 'imgUrl'"
                    >
                      <div>{{v[val.key]}}</div>
                    </el-col>
                    <el-col :span="14" class="data-cells-detail imgUrl" :key="val.key+'h'" v-else>
                      <el-upload
                        action="/gov/selfCheck/uploadFile"
                        list-type="picture-card"
                        :disabled="action=='entFile'?false:true"
                        :on-preview="handlePictureCardPreview"
                        :on-success="(res)=>{return upload(res,i,'landOut')}"
                        :file-list=" v[val.key] | getFileList"
                        :on-remove="(file)=>{return handleRemove(file,i,'landOut')}"
                      >
                        <i class="el-icon-plus"></i>
                      </el-upload>
                      <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt>
                      </el-dialog>
                    </el-col>
                    <div
                      class="dataErr"
                      :title="v.erroList?v.content:''"
                      v-show="v.erroList?v.erroList.includes(val.key):false"
                    >
                      <i class="iconfont icon-weiwancheng"></i>
                      <span>数据异常</span>
                    </div>
                  </el-row>
                </div>
              </div>
              <div
                class="edit-data edit-someone editRendOutBtn"
                :id="v.id"
                v-show="action=='entFile'"
              >
                <div class="btn btn-edit" @click="editRendOut(v,i)">
                  <i class="iconfont icon-xiugai"></i>
                  <div class="tip">
                    编辑
                    <span class="triangle-down"></span>
                  </div>
                </div>
                <div class="btn btn-delete" @click="delRendOut(i,v.id)" v-show="action=='entFile'">
                  <i class="iconfont icon-shanchu"></i>
                  <div class="tip">
                    删除
                    <span class="triangle-down"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <el-button class="add-data rentOutBtn" @click="openDio" v-show="action=='entFile'">
            <i class="iconfont icon-jia"></i>添加
          </el-button>
        </div>
        <div class="otherLand itempaper">
            <div class="itempaper-title">
              <span class="splot"></span>
              <span>其他土地</span>
            </div>
           <div class="itempaper-table">
              <el-row
                :gutter="20"
                class="data-cells"
                v-for="(val,i) in land.otherList"
                :key="i+'g'"
                :index="i"
              >
                <el-col :span="20" class="data-cells-title">
                  <div>{{val.name}}</div>
                </el-col>
                <el-col
                  :span="18"
                  class="data-cells-detail"
                  :key="i+'j'"
                >
                  <div>{{landList.otherLand[val.key]}}</div>
                </el-col>
              </el-row>
                <div  class="edit-data edit-someone editRendOutBtn"  v-show="action=='entFile'">
                <div class="btn btn-edit" @click="editOtherLand">
                  <i class="iconfont icon-xiugai"></i>
                  <div class="tip">
                    编辑
                    <span class="triangle-down"></span>
                  </div>
                </div>
              </div>
          </div>
         
        </div>
        <div class="contract-item itempaper">
          <div class="itempaper-title">
            <span class="splot"></span>
            <span>承租关系确认书</span>
          </div>
          <div class="itempaper-table">
            <div style="width: 100%;" class="contract-content">
              <div class="data-cells contract">
                <el-col :span="10" class="data-cells-title">
                  <div>承租关系确认书扫描件</div>
                </el-col>
                <el-col :span="14" class="data-cells-detail imgUrl">
                  <el-upload
                    action="/gov/selfCheck/uploadFile"
                    list-type="picture-card"
                    :disabled="action=='entFile'?false:true"
                    :on-preview="handlePictureCardPreview"
                    :on-success="(res)=>{return upload(res,0,'contract')}"
                    :file-list=" this.landList.releateImg | getFileList"
                    :on-remove="(file)=>{return handleRemove(file,0,'contract')}"
                  >
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt>
                  </el-dialog>
                </el-col>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="appeal-content" v-show="textReason">
        <textarea
          name
          cols="30"
          rows="5"
          @change="sendIdeas"
          v-model="appealReason"
          placeholder="请输入申诉内容和理由"
        ></textarea>
      </div>
    </div>
    <el-dialog title="新增承租土地" :visible.sync="dialogInVisible">
      <el-tabs v-model="activeName" type="card" @tab-click="tabClick">
        <el-tab-pane label="企业" name="first">
          <el-form :model="rentInForm[0]">
            <el-form-item v-for="(item,i) in land.rendInList" :label="item.key!='imgUrl'?item.name:''" :key="i">
              <el-autocomplete
                v-if="item.key == 'lessorCreditCode'"
                v-model="rentInForm[0].lessorCreditCode"
                :fetch-suggestions="CreditCodeSearch"
                :placeholder="'请输入'+item.name"
                @select="lessorCreditCodeSelect"
              ></el-autocomplete>
              <el-autocomplete
                v-else-if="item.key == 'lessor'"
                v-model="rentInForm[0].lessor"
                :fetch-suggestions="lesserSearch"
                :placeholder="'请输入'+item.name"
                @select="lessorSelect"
              ></el-autocomplete>
              <el-date-picker
                v-else-if="item.key == 'rentBegin'"
                v-model="rentInForm[0].rentBegin"
                type="date"
                value-format="yyyy-MM-dd"
                :picker-options="options.pickerOptionsInStart0"
                :placeholder="'请选择'+item.name"
              ></el-date-picker>
              <el-date-picker
                v-else-if="item.key == 'rentEnd'"
                v-model="rentInForm[0].rentEnd"
                type="date"
                value-format="yyyy-MM-dd"
                :picker-options="options.pickerOptionsInEnd0"
                :placeholder="'请选择'+item.name"
              ></el-date-picker>
              <!-- <el-input> -->
              <el-input
                v-else-if="item.key!='imgUrl'"
                v-model="rentInForm[0][item.key]"
                autocomplete="off"
                :placeholder="'请输入'+item.name"
              ></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="个人" name="second">
          <el-form :model="rentInForm[1]">
            <el-form-item v-for="(item,i) in land.rendInListPerson" :label="item.key!='imgUrl'?item.name:''" :key="i">
              <el-date-picker
                v-if="item.key == 'rentBegin'"
                v-model="rentInForm[1].rentBegin"
                type="date"
                value-format="yyyy-MM-dd"
                :picker-options="options.pickerOptionsInStart1"
                :placeholder="'请选择'+item.name"
              ></el-date-picker>
              <el-date-picker
                v-else-if="item.key == 'rentEnd'"
                v-model="rentInForm[1].rentEnd"
                type="date"
                value-format="yyyy-MM-dd"
                :picker-options="options.pickerOptionsInEnd1"
                :placeholder="'请选择'+item.name"
              ></el-date-picker>
              <el-input
                v-model="rentInForm[1][item.key]"
                v-else-if="item.key!='imgUrl'"
                autocomplete="off"
                :placeholder="'请输入'+item.name"
              ></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogInVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRentIn">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="新增出租土地" :visible.sync="dialogOutVisible">
      <el-form :model="rentOutForm">
        <el-form-item v-for="(item,i) in land.rendOutList" :label="item.key!='imgUrl'?item.name:''" :key="i">
          <el-autocomplete
            v-if="item.key == 'lesseeCreditCode'"
            v-model="rentOutForm.lesseeCreditCode"
            :fetch-suggestions="CreditCodeSearch"
            :placeholder="'请输入'+item.name"
            @select="lesseeCreditCodeSelect"
          ></el-autocomplete>
          <el-autocomplete
            v-else-if="item.key == 'lessee'"
            v-model="rentOutForm.lessee"
            :fetch-suggestions="lesserSearch"
            :placeholder="'请输入'+item.name"
            @select="lesseeSelect"
          ></el-autocomplete>
          <el-date-picker
            v-else-if="item.key == 'rentBegin'"
            v-model="rentOutForm.rentBegin"
            type="date"
            value-format="yyyy-MM-dd"
            :picker-options="options.pickerOptionsOutStart"
            :placeholder="'请选择'+item.name"
          ></el-date-picker>
          <el-date-picker
            v-else-if="item.key == 'rentEnd'"
            v-model="rentOutForm.rentEnd"
            type="date"
            value-format="yyyy-MM-dd"
            :picker-options="options.pickerOptionsOutEnd"
            :placeholder="'请选择'+item.name"
          ></el-date-picker>
          <el-select
            v-else-if="item.key == 'realPropertyNumber'"
            multiple
            v-model="rentOutForm.realPropertyNumber"
            placeholder="请选择"
          >
            <el-option
              v-for="(item,i) in realPropertyNumberList"
              :key="i"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
          <el-input
            v-else-if="item.key!='imgUrl'"
            v-model="rentOutForm[item.key]"
            autocomplete="off"
            :placeholder="'请输入'+item.name"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogOutVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRentOut">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑其他土地" :visible.sync="dialogOtherVisible">
      <el-form :model="landList.othe">
        <el-form-item v-for="(item,i) in  land.otherList" :label="item.name" :key="i">
          <el-input
            v-model="landList.otherLand[item.key]"
            autocomplete="off"
            :placeholder="'请输入'+item.name"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogOtherVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogOtherVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="title" :visible.sync="dialogBack">
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4}"
        placeholder="请输入内容"
        v-model="backReas"
      ></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogBack = false">取 消</el-button>
        <el-button type="primary" @click="sureBack()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
// import * as api from "@api/gov/companyPaperDetail";
import {updateInputLandData,getLandData,showErro,getListCodeEntName,deleteRentInLand,deleteRentOutLand} from "@api/gov/companyPaperDetail";
import { landData } from "@/common/constant/constant";
import { constants } from 'crypto';
export default {
  data() {
    return {
      title: "",
      backField: "", //当前驳回的字段
      backReas: "", //当前驳回的理由
      dialogBack: false,
      fileArr:[], //审核状态数据
      rejectArr: [], //驳回理由字段
      isApeal: "", //驳回成功后，‘驳回’，‘修改’按钮回显状态控制
      backId: "",
      apealFiles: "",
      clickIndex: "", //存储点击登记土地的下标，然后去获取它的before的值
      action: this.$store.state.paperParam.action,
      files: new Set(), //自核状态下，把所有‘已自核’的字段添加到改属性传给后台
      textReason: false, //控制文本的显示
      erroList: [], //街镇--土地数据异常数据
      appealReason: "",
      land: {
        departmentList: landData.departmentList,
        logLandList: landData.logLandList,
        otherList: landData.otherList,
        rendOutList: landData.rendOutList,
        rendInList: landData.rendInList,
        rendInListPerson: landData.rendInListPerson
      },
      fileList: [],
      dialogImageUrl: "",
      dialogVisible: false,
      activeName: "first",
      realPropertyNumberList: [],
      dialogInVisible: false,
      dialogOutVisible: false,
      dialogOtherVisible:false,
      rentInForm: [
        {
          lessorCreditCode: "",
          lessor: "",
          lessorTel: "",
          realPropertyNumber: "",
          areaOfInLand: "",
          landLocated: "",
          rentBegin: "",
          rentEnd: "",
          waterTotal: "",
          electricityTotal: ""
        },
        {
          realName: "",
          identityNum: "",
          lessorTel: "",
          realPropertyNumber: "",
          areaOfInLand: "",
          landLocated: "",
          rentBegin: "",
          rentEnd: "",
          waterTotal: "",
          electricityTotal: ""
        }
      ],
      rentOutForm: {
        lesseeCreditCode: "",
        lessee: "",
        lesseeTel: "",
        realPropertyNumber: [],
        areaOfOutLand: "",
        landLocated: "",
        rentBegin: "",
        rentEnd: "",
        waterTotal: "",
        electricityTotal: ""
      },
      timeout: null,
      landList: {
        totalLand: null,
        otherLand: {
          id: null,
          landType: null,
          otherLand: null,
          landLocated: null,
          remark: null
        },
        landDataList: [
          {
            landUseArea: "",
            realPropertyNumber: "",
            landLocated: "",
            landSupply: "",
            imgUrl: ""
          }
        ],
        rentInLandList: [],
        rentOutLandList: []
      },
      options: {
        pickerOptionsOutStart: {
          disabledDate: time => {
            let endDateVal = this.rentOutForm.rentEnd;
            if (endDateVal) {
              return time.getTime() > new Date(endDateVal).getTime();
            }
          }
        },
        pickerOptionsOutEnd: {
          disabledDate: time => {
            let beginDateVal = this.rentOutForm.rentBegin;
            if (beginDateVal) {
              return time.getTime() < new Date(beginDateVal).getTime();
            }
          }
        },
        pickerOptionsInStart0: {
          disabledDate: time => {
            let endDateVal = this.rentInForm[0].rentEnd;
            if (endDateVal) {
              return time.getTime() > new Date(endDateVal).getTime();
            }
          }
        },
        pickerOptionsInEnd0: {
          disabledDate: time => {
            let beginDateVal = this.rentInForm[0].rentBegin;
            if (beginDateVal) {
              return time.getTime() < new Date(beginDateVal).getTime();
            }
          }
        },
        pickerOptionsInStart1: {
          disabledDate: time => {
            let endDateVal = this.rentInForm[1].rentEnd;
            if (endDateVal) {
              return time.getTime() > new Date(endDateVal).getTime();
            }
          }
        },
        pickerOptionsInEnd1: {
          disabledDate: time => {
            let beginDateVal = this.rentInForm[1].rentBegin;
            if (beginDateVal) {
              return time.getTime() < new Date(beginDateVal).getTime();
            }
          }
        }
      },
      editIndex: "",
      param: this.$store.state.paperParam
    };
  },
  props: {
    department: {
      type: Object
    },
    field: {
      type: Object
    },
    rejectUpdateList: {
      type: Array
    }
  },
  watch: {
    field(val) {
      this.partmentApeal(val);
    },
    department(val){ }
  },
  computed: {
    totalWaterUsed() {
      let totalWater = 0;
      for (let i = 0, len = this.landList.rentInLandList.length; i < len; i++) {
        totalWater += Number(this.landList.rentInLandList[i].waterTotal);
      }
      for (let i = 0, len = this.landList.rentOutLandList.length;i < len;i++ ) {
        totalWater -= Number(this.landList.rentOutLandList[i].waterTotal);
      }
      this.$store.commit("setTotalWater", totalWater);
      return totalWater;
    }
  },
  filters: {
    rejectcontent(tid,key,arr){//显示驳回备注
        const obj = arr.find((val)=>{
            return val.typeId == tid &&val.field==key;
        })||null;
        let text = obj ? obj.content :'';
        return text;
    },
    getFileList(img) {
      let arr = img && img.length > 0 ? img.split(",") : [];
      arr = arr.map(v => {
        return {
          url: v
        };
      });
      return arr;
    }
  },
  mounted() {
    this.getDataList();
  },
  methods: {
    //驳回原因
    backReason(backField, backId, event, title, index) {
      this.title = title;
      this.isApeal = event.target;
      this.dialogBack = true;
      this.backField = backField;
      this.backId = backId;
      this.clickIndex = index;
    },
    //确定驳回
    sureBack() {
      if (this.title == "驳回原因") {
        this.$emit(
          "backText",
          JSON.stringify({
            content: "驳回原因:" + this.backReas,
            field: this.backField,
            backId: this.backId,
            type: 1
          })
        );
      } else if (this.title == "修改") {
        let before = this.landList.landDataList[this.clickIndex][
          this.backField
        ];
        this.landList.landDataList[this.clickIndex][this.backField]=this.backReas
        let arr = this.landList.landDataList.map((v, i) => {
          let data = Object.assign({}, v, {
            entName: this.param.entName,
            creditCode: this.param.creditCode
          });
          return data;
        });
        updateInputLandData({dataList:arr}).then(res => {});
        this.$emit(
          "reviseText",
          JSON.stringify({
            content: "修改前:" + before + ",修改后:" + this.backReas,
            field: this.backField,
            type: 1,
            typeId: this.backId
          })
        );
      }
    },
    //部门审核显示
    partmentApeal(arr) {
      this.fileArr=[]
      this.files = new Set();
        if (arr.field !== undefined ) {
        this.landList.landDataList.map((v, i) => {
          let landOccurArr=[]
          if(arr.field==''){
               this.fileArr.push([]);
          }else{
              JSON.parse(arr.field).map((val, i) => {
                let j=val.split("-")[1]
              if (JSON.stringify(v.id) == j) {
                 landOccurArr.push(val.split("-")[0]) ;
                  this.fileArr.push(landOccurArr);
                }else{
                  this.fileArr.push([]);
                }
              this.files.add(val);
          });
          }
        });
      } else {
      }
      if(arr.content !== undefined && arr.content !== null && arr.content!==''){
        this.textReason=true
        this.appealReason=arr.content
      }
      //驳回备注信息
      this.rejectArr = [];
      this.landList.landDataList.map((v, i) => {
        let obj = {};

        this.rejectUpdateList.map((value, j) => {
          if (v.id == value.typeId) {
            obj[value.field] = value.content;
          }
        });
        this.rejectArr.push(obj);
        this.dialogBack = false;
        this.backReas = "";
      });
      //驳回成功后按钮灰显
      if (this.isApeal !== "") {
        if (this.title == "驳回原因") {
          this.isApeal.classList.add("disabled-click");
          this.isApeal.nextSibling.classList.add("disabled-click");
        } else {
          this.isApeal.classList.add("disabled-click");
          this.isApeal.previousSibling.classList.add("disabled-click");
        }
      }
    },
    sendIdeas(e, key = "", id, index) {
      if (e.target.innerHTML == "发起申诉") {
        if (key !== "") {
          let key1 = `${key}-${id}`;
          this.files.add(key1);
        }
        e.target.innerHTML = "已申诉";
        e.target.nextSibling.classList.remove("disableStatus1");
        e.target.nextSibling.innerHTML = "确认无误";
        e.target.style.background = "#FDA79F";
        e.target.nextSibling.style.background = "#5C7CEC";
        this.commitApeal(id);
      } else if (e.target.innerHTML == "确认无误") {
        let key1 = `${key}-${id}`;
        this.files.delete(key1);
        e.target.innerHTML = "已确认";
        e.target.previousSibling.innerHTML = "发起申诉";
        e.target.previousSibling.classList.remove("disableStatus");
        // e.target.previousSibling.classList.remove("appeal-btn-on");
        e.target.style.background = "#7BD1C1";
        e.target.previousSibling.style.background = "#FE6E61";
        this.commitApeal(id);
      } else if (e.target.innerHTML == "") {
        this.commitApeal(id);
      }
    },
    commitApeal(id) {
      let apealButs = this.$refs.sureApeal;
      let apealBut = apealButs.filter((v, i) => {
        if (
          v.children[0].innerHTML == "发起申诉" &&
          v.children[1].innerHTML == "确认无误"
        ) {
          return v;
        }
      });
      if (apealBut.length == 0) {
        this.$store.commit("setApealButs", { value: false, type: "landInfo" });
      }
      let field = [...this.files];
      if (field == "") {
        this.textReason = false;
      } else {
        this.textReason = true;
      }
      this.$store.commit("setList1", {
        field: [...this.files],
        type: 1,
        content: this.appealReason
      });
    },
    submitStore() {
      this.$store.commit({
        type: "setSaveData",
        params: { value: this.landList, type: "landList" }
      });
    },
    occurentDio() {
      this.dialogInVisible = true;
      this.editIndex = "";
      this.reset("rentIn");
    },
    openDio() {
      this.dialogOutVisible = true;
      this.editIndex = "";
      this.reset("rentOut");
    },
    editOtherLand(){
      this.dialogOtherVisible=true
    },
    getDataList() {
      this.param = this.$store.state.paperParam;
      const params = {
        creditCode: this.param.creditCode,
        dataYear: this.param.dataYear
      };
      getLandData(params)
        .then(res => {
          if (res.code == "0000") {
            let datas = res.data;
            if (!datas.otherLand) {
              datas.otherLand = {
                id: null,
                landType: null,
                otherLand: null,
                landLocated: null,
                remark: null
              };
            }
            this.landList = Object.assign({}, this.landList, datas);
            this.partmentApeal(this.field);

            this.realPropertyNumberList =
              this.landList.landDataList.map((v, i) => {
                return v.realPropertyNumber;
              }) || [];
            this.submitStore();
          }else{
            this.$message.error(res.msg);
          }
        })
        .then(() => {
          if (this.action == "townCheck") {
            //乡镇审核 显示异常
            showErro({
                creditCode: this.param.creditCode,
                dataYear: this.param.dataYear
              })
              .then(d => {
                if (d.code == "0000") {
                  this.erroList = d.data || [];
                  this.landList.rentInLandList.map((v, i) => {
                    this.erroList.map((value, j) => {
                      if (value.creditCode) {
                        if (
                          v.lessorCreditCode == value.creditCode &&
                          value.type == "rentInLand"
                        ) {
                          this.$set(v, "content", value.content);
                          this.$set(v, "erroList", value.erroList);
                        }
                      }
                    });
                  });
                  this.landList.rentOutLandList.map((v, i) => {
                    this.erroList.map((value, j) => {
                      if (value.creditCode) {
                        if (
                          v.lesseeCreditCode == value.creditCode &&
                          value.type == "rentOutLand"
                        ) {
                          this.$set(v, "content", value.content);
                          this.$set(v, "erroList", value.erroList);
                        }
                      }
                    });
                  });
                }else{
                  this.$message.error(d.msg);
                }
              });
          }
        }).then(()=>{
           this.$nextTick(()=>{
             if(this.action!=='entFile'){
               let uploadElement=document.getElementsByClassName('el-upload--picture-card')
                Array.from(uploadElement).map((v,i)=>{
                  v.style.display="none"
                })
             }
            
            })
        });
    },
    //新增出租
    lesseeCreditCodeSelect(item) {
      this.rentOutForm.lessee = item.name || "";
    },
    //模糊查询统代
    CreditCodeSearch(queryString, cb) {
      let params = {
        size: 10,
        creditCode: queryString
      };
      getListCodeEntName(params).then(res => {
        if (res.code == "0000") {
          let results = res.data || [];
          results = results.map(v => {
            return {
              value: v.creditCode,
              label: v.creditCode,
              name: v.entName
            };
          });
          clearTimeout(this.timeout);
          this.timeout = setTimeout(() => {
            cb(results);
          }, 1000);
        }else{
          this.$message.error(d.msg);
        }
      });
    },
    lesseeSelect(item) {
      this.rentOutForm.lesseeCreditCode = item.name || "";
    },
    //模糊查询企业名称
    lesserSearch(queryString, cb) {
      let params = {
        size: 10,
        entName: queryString
      };
      getListCodeEntName(params).then(res => {
        if (res.code == "0000") {
          let results = res.data || [];
          results = results.map(v => {
            return {
              value: v.entName,
              label: v.entName,
              name: v.creditCode
            };
          });
          clearTimeout(this.timeout);
          this.timeout = setTimeout(() => {
            cb(results);
          }, 1000);
        }else{
          this.$message.error(res.msg)
        }
      });
    },
    tabClick(item) {},
    lessorCreditCodeSelect(item) {
      this.rentInForm[0].lessor = item.name || "";
    },
    lessorSelect(item) {
      this.rentInForm[0].lessorCreditCode = item.name || "";
    },
    addRentOut() {
      //新增出租土地
      this.dialogOutVisible = false;
      let real = this.rentOutForm.realPropertyNumber;
      this.rentOutForm.realPropertyNumber =
        real.length > 0 ? real.join(",") : "";
      if (this.editIndex !== "") {
        this.landList.rentOutLandList.splice(
          this.editIndex,
          1,
          this.rentOutForm
        );
      } else {
        this.landList.rentOutLandList.push(this.rentOutForm);
      }
      this.submitStore();
      this.reset("rentOut");
    },
    addRentIn() {
      //新增承租土地
      this.dialogInVisible = false;
      const rentIn =
        this.activeName == "first"
          ? Object.assign({}, this.rentInForm[0], {
              outType: 1 //企业
            })
          : Object.assign({}, this.rentInForm[1], {
              outType: 0 //个人
            });
      if (this.editIndex !== "") {
        this.landList.rentInLandList.splice(this.editIndex, 1, rentIn);
      } else {
        this.landList.rentInLandList.push(rentIn);
      }
      this.submitStore();
      this.reset("rentIn");
    },
    reset(type) {
      //重置表单数据
      if (type == "rentOut") {
        this.rentOutForm = {
          lesseeCreditCode: "",
          lessee: "",
          lesseeTel: "",
          realPropertyNumber: [],
          areaOfOutLand: "",
          landLocated: "",
          rentBegin: "",
          rentEnd: "",
          waterTotal: "",
          electricityTotal: ""
        };
      } else {
        this.rentInForm = [
          {
            lessorCreditCode: "",
            lessor: "",
            lessorTel: "",
            realPropertyNumber: "",
            areaOfInLand: "",
            landLocated: "",
            rentBegin: "",
            rentEnd: "",
            waterTotal: "",
            electricityTotal: ""
          },
          {
            realName: "",
            identityNum: "",
            lessorTel: "",
            realPropertyNumber: "",
            areaOfInLand: "",
            landLocated: "",
            rentBegin: "",
            rentEnd: "",
            waterTotal: "",
            electricityTotal: ""
          }
        ];
      }
    },
    handleRemove(file, index, type) {
      let img = file.url;
      if (type == "log") {
        //登记土地
        let arr = this.landList.landDataList[index].imgUrl;
        arr = arr && arr.length > 0 ? arr.split(",") : [];
        let i = arr.findIndex(v => {
          return v == img;
        });
        arr.splice(i, 1);
        this.landList.landDataList[index].imgUrl = arr.join(",");
      } else if (type == "landIn") {
        let arr = this.landList.rentInLandList[index].imgUrl;
        arr = arr && arr.length > 0 ? arr.split(",") : [];
        let i = arr.findIndex(v => {
          return v == img;
        });
        arr.splice(i, 1);
        this.landList.rentInLandList[index].imgUrl = arr.join(",");
      } else if (type == "landOut") {
        let arr = this.landList.rentOutLandList[index].imgUrl;
        arr = arr && arr.length > 0 ? arr.split(",") : [];
        let i = arr.findIndex(v => {
          return v == img;
        });
        arr.splice(i, 1);
        this.landList.rentOutLandList[index].imgUrl = arr.join(",");
      } else if (type == "contract") {
        //承租关系确认书
        let arr = this.landList.releateImg;
        arr = arr && arr.length > 0 ? arr.split(",") : [];
        let i = arr.findIndex(v => {
          return v == img;
        });
        arr.splice(i, 1);
        this.landList.releateImg = arr.join(",");
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    upload(res, index, type) {
      if (res.code == "0000") {
        let img = res.data;
        if (type == "log") {
          //登记土地
          let arr = this.landList.landDataList[index].imgUrl;
          arr = arr && arr.length > 0 ? arr.split(",") : [];
          arr.push(img);
          this.landList.landDataList[index].imgUrl = arr.join(",");
        } else if (type == "landIn") {
          let arr = this.landList.rentInLandList[index].imgUrl;
          arr = arr && arr.length > 0 ? arr.split(",") : [];
          arr.push(img);
          this.landList.rentInLandList[index].imgUrl = arr.join(",");
        } else if (type == "landOut") {
          let arr = this.landList.rentOutLandList[index].imgUrl;
          arr = arr && arr.length > 0 ? arr.split(",") : [];
          arr.push(img);
          this.landList.rentOutLandList[index].imgUrl = arr.join(",");
        } else if (type == "contract") {
          //承租关系确认书
          let arr = this.landList.releateImg;
          arr = arr && arr.length > 0 ? arr.split(",") : [];
          arr.push(img);
          this.landList.releateImg = arr.join(",");
        }
        this.submitStore();
      }else{
          this.$message.error(res.msg)
        }
    },
    //编辑承租土地
    editRend(v, i) {
      if (v.outType == 1) {
        this.activeName = "first";
        this.rentInForm[0] = v;
      } else {
        this.activeName = "second";
        this.rentInForm[1] = v;
      }
      this.editIndex = i;
      this.dialogInVisible = true;
    },
    //删除承租土地
    delRend(i, ID) {
      if (ID !== undefined) {
        deleteRentInLand({ id: ID }).then(res => {});
      }
      this.landList.rentInLandList.splice(i, 1);
      this.submitStore();
    },
    //编辑出租土地
    editRendOut(v, i) {
      this.rentOutForm = v;
      this.editIndex = i;
      this.dialogOutVisible = true;
    },
    //删除出租土地
    delRendOut(i, ID) {
      if (ID !== undefined) {
        deleteRentOutLand({ id: ID }).then(res => {});
      }
      this.landList.rentOutLandList.splice(i, 1);
      this.submitStore();
    }
  }
};
</script>
<style lang="less">


</style>
