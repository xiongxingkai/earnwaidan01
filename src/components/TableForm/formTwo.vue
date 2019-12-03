<template>
  <div class="tableForm-container">
    <el-form ref="rule-form" :rules="rules" :model="formDatas" class="form-conatiner" style="margin-left:20px;">
      <sticky :class-name="'sub-navbar' + status">
        <el-button v-loading="loading" type="primary" @click="submitForm">保存发布</el-button>
        <el-button type="warning" @click="backForm">返回</el-button>
      </sticky>
      <div class="tableForm-main-container">
        <el-row :gutter="50">
          <el-col v-for="(item, index) in postForms" :key="index" :span="165">

            <el-form-item v-if="item.type==='title'&&item.isShow" :prop="index" class="mb-40">
              <MDinput v-model="formDatas[index]" :maxlength="100" :disabled="isDetail||item.disable" name="name" required>标题</MDinput>
            </el-form-item>
            <!-- 级联 -->
            <el-form-item v-else-if="item.type==='cascader'&&item.isShow" :prop="index" :label="item.name+':'" label-width="165px" class="postInfo-container-item">
              <el-cascader v-model="formDatas[index]" :options="item.data" expand-trigger="hover"></el-cascader>
            </el-form-item>
            <!-- 是否为bool的下拉 -->
            <el-form-item v-else-if="item.type==='select' &&item.requestType==='boolean'&&item.isShow" :label="item.name+':'" label-width="300px" class="postInfo-container-item">
              <el-select v-model="formDatas[index]" :disabled="isDetail||item.disable" :placeholder="'选择'+item.name">
                <el-option label="是" :value="true"></el-option>
                <el-option label="否" :value="false"></el-option>
              </el-select>
            </el-form-item>
            <!-- 下拉select -->
            <el-form-item v-else-if="item.type==='select' &&item.requestType==='default'&&item.isShow" :label="item.name+':'" label-width="300px" class="postInfo-container-item">
              <el-select v-model="formDatas[index]" :disabled="isDetail||item.disable" :placeholder="'选择'+item.name">
                <el-option v-for="(ele,sindex) in (JSON.parse(item.value))" :key="sindex" :label="ele" :value="sindex"></el-option>
              </el-select>
            </el-form-item>
            <!-- 字典 -->
            <el-form-item v-else-if="item.type==='select' &&item.requestType==='dict'&&item.isShow" :label="item.name+':'" label-width="300px" class="postInfo-container-item">
              <el-select v-model="formDatas[index]" :disabled="isDetail||item.disable" :placeholder="'选择'+item.name" filterable remote value-key="id">
                <el-option v-for="ele in item.data" :key="ele.id" :label="ele.name" :value="ele.name"></el-option>
              </el-select>
            </el-form-item>
            <!-- 部门组件绑对象 -->
            <el-form-item v-else-if="item.type==='select' &&item.requestType==='department'&&item.isShow" :label="item.name+':'" label-width="300px" class="postInfo-container-item">
              <supervision-departments v-if="item.requestType==='department'||formDatas[index]!==null" v-model="formDatas[index]" :deptNum="outNum" :disabled="isDetail||item.disable"></supervision-departments>
            </el-form-item>
            <!-- 部门组件名称 -->
            <!-- <el-form-item v-else-if="item.type==='select' &&item.requestType==='department-name'&&item.isShow" :label="item.name+':'" label-width="300px" class="postInfo-container-item">
              <supervision-departments v-if="item.requestType==='department-name'&&formDatas[index]!==null&&formDatas[index]!==''&&formDatas[index]!==undefined" :selectedDepartment.sync="formDatas[index]"  :disabled="isDetail||item.disable"></supervision-departments>
            </el-form-item> -->
            <!-- 项目组件 -->
            <el-form-item v-else-if="item.type==='select' &&item.requestType==='projects'&&item.isShow" :label="item.name+':'" label-width="300px" class="postInfo-container-item">
              <supervision-project v-if="item.requestType==='projects'&&formDatas[index]!==null" v-model="formDatas[index]"  :disabled="isDetail||item.disable"></supervision-project>
            </el-form-item>
            <!-- 选择多个人员组件 -->
            <!-- <el-form-item v-else-if="item.type==='input' &&item.requestType==='morePerson'&&item.isShow" :label="item.name+':'" label-width="270px" class="postInfo-container-item">
              <select-people v-if="item.requestType==='onePerson'&&formDatas[index]!==null" v-model="formDatas[index]" :singleSelect="true"  :disabled="isDetail||item.disable"></select-people>
            </el-form-item> -->

            <el-form-item v-else-if="item.type==='radio'&&item.isShow" :prop="index" :label="item.name+':'" label-width="165px" class="postInfo-container-item">
              <el-radio-group v-model="formDatas[index]" :disabled="isDetail||item.disable" size="mini">
                <el-radio v-for="(vv,kk) in item.data" :key="kk" :label="vv" border></el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item v-else-if="item.type==='checkbox'&&item.isShow" :prop="index" :label="item.name+':'" label-width="165px" class="postInfo-container-item">
              <el-checkbox-group v-model="formDatas[index]" :disabled="isDetail||item.disable" size="mini">
                <el-checkbox v-for="(vv,kk) in item.data" :key="kk" :label="vv" :value="vv" border></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <!-- 开关 -->
            <el-form-item v-else-if="item.type==='switch'&&item.isShow" :prop="index" :label="item.name+':'" label-width="165px" class="postInfo-container-item">
              <el-switch v-model="formDatas[index]" :disabled="isDetail||item.disable"></el-switch>
            </el-form-item>
            <!-- 年月日 -->
            <el-form-item v-else-if="item.type==='date'&&item.isShow&&item.fieldType!=='timestamp'" :prop="index" :label="item.name+':'" label-width="300px" class="mb-10">
              <el-date-picker v-model="formDatas[index]" value-format="yyyy-MM-dd" :picker-options="pickerOptions" :disabled="isDetail||item.disable" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
            
            <!-- 返回时间戳  v-model绑定的值需要是字符串-->
            <el-form-item v-else-if="item.type==='date'&&item.isShow&&item.fieldType=='timestamp'" :prop="index" :label="item.name+': '" label-width="300px" class="mb-10">
              <el-date-picker v-model="formDatas[index]" value-format="timestamp" format="yyyy年MM月dd日"  :disabled="isDetail||item.disable" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>

            <el-form-item v-else-if="item.type==='date-range'&&item.isShow" :prop="index" :label="item.name+':'" label-width="165px" class="mb-10">
              <el-date-picker v-model="formDatas[index]"  :disabled="isDetail||item.disable" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            </el-form-item>

            <el-form-item v-else-if="item.type==='time'&&item.isShow" :prop="index" :label="item.name+':'" label-width="165px" class="mb-10">
              <el-time-picker v-model="formDatas[index]" value-format="yyyy-MM-dd" :disabled="isDetail||item.disable" placeholder="选择时间"></el-time-picker>
            </el-form-item>

            <el-form-item v-else-if="item.type==='time'&&item.isShow" :prop="index" :label="item.name+':'" label-width="165px" class="mb-10">
              <el-time-picker v-model="formDatas[index]" value-format="yyyy-MM-dd" :disabled="isDetail||item.disable" is-range  range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间"></el-time-picker>
            </el-form-item>

            <el-form-item v-else-if="item.type==='datetime'&&item.isShow" :prop="index" :label="item.name+':'" label-width="165px" class="mb-10">
              <el-date-picker v-model="formDatas[index]" value-format="yyyy-MM-dd" :picker-options="pickerOptions" :disabled="isDetail||item.disable" type="datetime" placeholder="选择日期时间"></el-date-picker>
            </el-form-item>

            <el-form-item v-else-if="item.type==='datetime-range'&&item.isShow" :prop="index" :label="item.name+':'" label-width="165px" class="mb-10">
              <el-date-picker v-model="formDatas[index]"  :disabled="isDetail||item.disable" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            </el-form-item>
            <!-- 文本框 -->
            <el-form-item v-else-if="item.type==='textarea'&&item.isShow" :prop="index" :label="item.name+':'" label-width="300px" class="mb-10">
              <el-input v-model="formDatas[index]"  :disabled="isDetail||item.disable" type="textarea" class="article-textarea" :autosize="{ minRows: 1,maxRows: 5 }" placeholder="请输入内容"></el-input>
            </el-form-item>
            <!-- 附件上传 -->
            <!-- <el-form-item v-else-if="item.type==='plupload'&&item.isShow" :prop="index" :label="item.name+':'" label-width="300px" class="mb-10">
              <plupload v-if="item.requestType==='plupload'&&formDatas[index]!==null" v-model="formDatas[index]"  :imageOnly="true" service-name="asset" module-name="inventory" ></plupload>
            </el-form-item> -->
            <!-- 富文本编辑 -->
            <el-form-item v-else-if="item.type==='editor'&&item.isShow" :prop="index" :label="item.name+':'" label-width="165px" class="mb-10">
              <Tinymce ref="editor" :height="400" v-model="formDatas[index]" :disabled="isDetail||item.disable" />
            </el-form-item>

            <!-- 图片上传 -->
            <el-form-item v-else-if="item.type==='image'&&item.isShow" :prop="index" :label="item.name+':'" label-width="165px" class="mb-10">
              <Upload v-model="formDatas[index]" :disabled="isDetail||item.disable" />
            </el-form-item>

            <el-form-item v-else-if="item.type==='http'&&item.isShow" :prop="index" :label="item.name+':'" label-width="300px" class="mb-10">
              <el-input v-model="formDatas[index]"  :disabled="isDetail||item.disable" >
                <template slot="prepend">Http://</template>
              </el-input>
            </el-form-item>

            <el-form-item v-else-if="item.type==='map'&&item.isShow" :prop="index" :label="item.name+':'" label-width="165px" >
              <el-input v-model="formDatas[index]"  :disabled="isDetail||item.disable" readonly="readonly" @click.native="selectMap(index)"></el-input>
            </el-form-item>

            <el-form-item v-else-if="item.type==='password'&&item.isShow" :prop="index" :label="item.name+':'" label-width="165px" class="postInfo-container-item">
              <el-input v-model="formDatas[index]"  :disabled="isDetail||item.disable" type="password"></el-input>
            </el-form-item>

            <el-form-item v-else-if="item.type==='input'&&item.isShow" :prop="index" :label="item.name+':'" label-width="300px" class="postInfo-container-item">
              <el-input v-model="formDatas[index]"  :disabled="isDetail||item.disable" @change="handInputChange(item, index)"></el-input>
            </el-form-item>

            <el-form-item v-else-if="item.isShow" :prop="index" :label="item.name+':'" label-width="300px" class="postInfo-container-item">
              <el-input v-model="formDatas[index]"  :disabled="isDetail||item.disable" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
    <!-- 分割线 里边是一个table...........................以下是主页的模板串进来的.................................. -->
    <div v-for="(item,index) in postForms.children" :key="index" class="tableForm-box">
      <el-row class="titleTable">
        <el-col :span="2" style="color: #606266;font-size: 16px;font-weight: 700;">
          {{item.name}}
        </el-col>
        <el-col :span="5" :offset="17">
          <!-- 按钮组 -->
          <span v-if="apiButtonData[index].config.Button.length>0" style="height:40px;line-height:40px;width:100%;background-color:#fff;margin-top:2px;margin-bottom:10px;">
            <el-button v-for="item in apiButtonData[index].config.Button" :class="item.fieldEnName" :key="item.id" :type="item.type" :size="item.width" @click="handleAction(item.fieldEnName,item.id,postForms.children[index].serviceName)" :disabled="isDetail">
              {{item.name}}
              <!-- 简单导出 -->
              <a id="simpleExport" v-if="item.fieldEnName === 'export'" 
              :href="urlConfig + apiExport.configUrl + '&apiUrl=' + urlGateConfig + apiExport.apiUrl + '&result=' + apiExport.result + '&token=' + tokens + apiExport.params + newStr" target="_blank">
              </a>
            </el-button>
          </span>
        </el-col>
      </el-row>
      <!-- table -->
      <el-table v-loading="listLoading[item.serviceName]" :data="list[item.serviceName]" @selection-change="selectionChange" border fit highlight-current-row style="width: 93%;">
        <!-- selection -->
        <el-table-column fixed="left" type="selection" width="50"></el-table-column>
        <el-table-column fixed="left" type="index" width="50" label="序号"></el-table-column>
        <!-- :prop="item.fieldEnName" -->
        <el-table-column v-for="(item,index) in apiTableTitle[index].config.Table.filter(tt => tt.isShow)" style="background-color: rgb(64,158,255)" :key="index" :align="item.align" :label="item.label" :width="item.width">
          <template slot-scope="scope">
            <!-- 支持行内编辑 -->
            <!-- 输入框 -->
            <template v-if="scope.row.editShow && item.type==='input'">
              <el-input v-model="scope.row[item.fieldEnName]" :disabled="item.readonly"></el-input>
            </template>
            <!-- 日期 -->
            <template v-else-if="scope.row.editShow && item.type==='date'">
              <el-date-picker v-model="scope.row[item.fieldEnName]" value-format="yyyy-MM-dd" :disabled="item.readonly" type="date" placeholder="选择日期"></el-date-picker>
            </template>
            <!-- 下拉框 -->
            <template v-else-if="scope.row.editShow && item.type==='select'">
              <el-select v-model="scope.row[item.fieldEnName]" :placeholder="'选择'+item.name" :disabled="item.readonly">
                <el-option v-for="(ele,key) in (JSON.parse(item.value))" :key="key" :label="ele" :value="key"></el-option>
              </el-select>
            </template>
            <span v-else-if="!scope.row.editShow && item.type==='select'">{{JSON.parse(item.value)[scope.row[item.fieldEnName]]}}</span>
            <!-- 支持行内编辑 -->
            <span v-else>{{scope.row[item.fieldEnName]}}</span>
          </template>
        </el-table-column>
        <!-- 操作栏 -->
        <el-table-column v-if="apiActionData[index].config.Operation.length > 0" width="240" fixed="right" align="center" label="操作">
          <template slot-scope="scope">
            <span v-for="item in apiActionData[index].config.Operation" :key="item.id">
              <el-button v-if="item.fieldEnName==='detail'" :type="item.type" size="mini" @click="handleAction(item.fieldEnName,scope.row,postForms.children[index].serviceName)" style="margin-right: 5px;" :disabled="isDetail">
                查看
              </el-button>
              <el-button v-if="item.fieldEnName==='delete'" :type="item.type" size="mini" @click="handleAction(item.fieldEnName,scope.row,postForms.children[index].serviceName)" style="margin-right: 5px;" :disabled="isDetail">
                删除
              </el-button>
              <el-button v-if="item.fieldEnName==='editor'" :type="item.type" size="mini" @click="handleAction(item.fieldEnName,scope.row,postForms.children[index].serviceName)" style="margin-right: 5px;" :disabled="isDetail">
                编辑
              </el-button>
              <!-- 行内编辑按钮 -->
              <template v-else-if="item.fieldEnName==='editor_inner'">
                <el-button v-if="!scope.row.editShow" size="mini" type="primary" icon='el-icon-edit' style="margin-right:5px;" @click="handleAction(item.fieldEnName,scope.row)" :disabled="isDetail">
                  编辑
                </el-button>
                <el-button v-else type="warning" size="mini" @click="confirmEdit(scope.row)" style="margin-right:5px;" :disabled="isDetail">保存</el-button>
              </template>
            </span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <pagination :total="listPage[item.serviceName]" :page.sync="apiPage[item.serviceName].page" :limit.sync="apiPage[item.serviceName].limit" @pagination="loadChildTable(item.serviceName)"></pagination>
      <!-- 坐标弹窗 -->
      <el-dialog title=" 位置选择 " :visible.sync="dialogMap">
        <div style="margin-bottom: 10px;">
          <el-input v-model="mapSearch" style="width: 120px;" size="mini"></el-input>
          <el-button @click="searchMap" size="mini">查询</el-button>
          <span class="pull-right">单击地图选择坐标</span>
        </div>
        <div id="dialogMap" style="width: 800px;height: 480px;"></div>
      </el-dialog>
    </div>
    <!-- 新增弹框 -->
    <el-dialog :title="childTitleName" :visible.sync="addTable" width="50%">
      <el-form ref="child-form" :rules="childRules" :model="childrenformDatas" class="form-container">
        <div>
          <el-row>
            <el-col v-for="(item,index) in childTitle" :key="index" :span="12">
              <el-form-item v-if="item.type==='title'&&item.isShow" :prop="index" class="mb-40">
                <MDinput v-model="childrenformDatas[index]" :maxlength="100" :disabled="isDetailChild||item.disable" name="name" required>标题</MDinput>
              </el-form-item>
              <!-- 级联 -->
            <el-form-item v-else-if="item.type==='cascader'&&item.isShow" :prop="index" :label="item.name+':'" label-width="100px" class="postInfo-container-item">
              <el-cascader v-model="childrenformDatas[index]" :options="item.data" expand-trigger="hover"></el-cascader>
            </el-form-item>
            <!-- 是否为bool的下拉 -->
            <el-form-item v-else-if="item.type==='select' &&item.requestType==='boolean'&&item.isShow" :label="item.name+':'" label-width="100px" class="postInfo-container-item">
              <el-select v-model="childrenformDatas[index]" :disabled="isDetailChild||item.disable" :placeholder="'选择'+item.name">
                <el-option label="是" :value="true"></el-option>
                <el-option label="否" :value="false"></el-option>
              </el-select>
            </el-form-item>
            <!-- 下拉select -->
            <el-form-item v-else-if="item.type==='select' &&item.requestType==='default'&&item.isShow" :label="item.name+':'" label-width="100px" class="postInfo-container-item">
              <el-select v-model="childrenformDatas[index]" :disabled="isDetailChild||item.disable" :placeholder="'选择'+item.name">
                <el-option v-for="(ele,sindex) in (JSON.parse(item.value))" :key="sindex" :label="ele" :value="sindex"></el-option>
              </el-select>
            </el-form-item>
            <!-- 字典 -->
            <el-form-item v-else-if="item.type==='select' &&item.requestType==='dict'&&item.isShow" :label="item.name+':'" label-width="100px" class="postInfo-container-item">
              <el-select v-model="childrenformDatas[index]" :disabled="isDetailChild||item.disable" :placeholder="'选择'+item.name" filterable remote value-key="id">
                <el-option v-for="ele in item.data" :key="ele.id" :label="ele.name" :value="ele.name"></el-option>
              </el-select>
            </el-form-item>
            <!-- 部门组件绑对象 -->
            <el-form-item v-else-if="item.type==='select' &&item.requestType==='department'&&item.isShow" :label="item.name+':'" label-width="100px" class="postInfo-container-item">
              <supervision-departments v-if="item.requestType==='department'||childrenformDatas[index]!==null" v-model="childrenformDatas[index]" :deptNum="outNum" :disabled="isDetailChild||item.disable"></supervision-departments>
            </el-form-item>
            <!-- 部门组件名称 -->
            <!-- <el-form-item v-else-if="item.type==='select' &&item.requestType==='department-name'&&item.isShow" :label="item.name+':'" label-width="300px" class="postInfo-container-item">
              <supervision-departments v-if="item.requestType==='department-name'&&childrenformDatas[index]!==null&&childrenformDatas[index]!==''&&childrenformDatas[index]!==undefined" :selectedDepartment.sync="childrenformDatas[index]"  :disabled="isDetailChild||item.disable"></supervision-departments>
            </el-form-item> -->
            <!-- 项目组件 -->
            <el-form-item v-else-if="item.type==='select' &&item.requestType==='projects'&&item.isShow" :label="item.name+':'" label-width="100px" class="postInfo-container-item">
              <supervision-project v-if="item.requestType==='projects'&&childrenformDatas[index]!==null" v-model="childrenformDatas[index]"  :disabled="isDetailChild||item.disable"></supervision-project>
            </el-form-item>
            <!-- 选择多个人员组件 -->
            <!-- <el-form-item v-else-if="item.type==='input' &&item.requestType==='morePerson'&&item.isShow" :label="item.name+':'" label-width="270px" class="postInfo-container-item">
              <select-people v-if="item.requestType==='onePerson'&&childrenformDatas[index]!==null" v-model="childrenformDatas[index]" :singleSelect="true"  :disabled="isDetailChild||item.disable"></select-people>
            </el-form-item> -->

            <el-form-item v-else-if="item.type==='radio'&&item.isShow" :prop="index" :label="item.name+':'" label-width="100px" class="postInfo-container-item">
              <el-radio-group v-model="childrenformDatas[index]" :disabled="isDetailChild||item.disable" size="mini">
                <el-radio v-for="(vv,kk) in item.data" :key="kk" :label="vv" border></el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item v-else-if="item.type==='checkbox'&&item.isShow" :prop="index" :label="item.name+':'" label-width="100px" class="postInfo-container-item">
              <el-checkbox-group v-model="childrenformDatas[index]" :disabled="isDetailChild||item.disable" size="mini">
                <el-checkbox v-for="(vv,kk) in item.data" :key="kk" :label="vv" :value="vv" border></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <!-- 开关 -->
            <el-form-item v-else-if="item.type==='switch'&&item.isShow" :prop="index" :label="item.name+':'" label-width="100px" class="postInfo-container-item">
              <el-switch v-model="childrenformDatas[index]" :disabled="isDetailChild||item.disable"></el-switch>
            </el-form-item>
            <!-- 年月日 -->
            <el-form-item v-else-if="item.type==='date'&&item.isShow&&item.fieldType!=='timestamp'" :prop="index" :label="item.name+':'" label-width="100px" class="mb-10">
              <el-date-picker v-model="childrenformDatas[index]" value-format="yyyy-MM-dd" :picker-options="pickerOptions" :disabled="isDetailChild||item.disable" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
            
            <!-- 返回时间戳  v-model绑定的值需要是字符串-->
            <el-form-item v-else-if="item.type==='date'&&item.isShow&&item.fieldType=='timestamp'" :prop="index" :label="item.name+': '" label-width="100px" class="mb-10">
              <el-date-picker v-model="childrenformDatas[index]" value-format="timestamp" format="yyyy年MM月dd日"  :disabled="isDetailChild||item.disable" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>

            <el-form-item v-else-if="item.type==='date-range'&&item.isShow" :prop="index" :label="item.name+':'" label-width="100px" class="mb-10">
              <el-date-picker v-model="childrenformDatas[index]"  :disabled="isDetailChild||item.disable" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            </el-form-item>

            <el-form-item v-else-if="item.type==='time'&&item.isShow" :prop="index" :label="item.name+':'" label-width="100px" class="mb-10">
              <el-time-picker v-model="childrenformDatas[index]" value-format="yyyy-MM-dd" :disabled="isDetailChild||item.disable" placeholder="选择时间"></el-time-picker>
            </el-form-item>

            <el-form-item v-else-if="item.type==='time'&&item.isShow" :prop="index" :label="item.name+':'" label-width="100px" class="mb-10">
              <el-time-picker v-model="childrenformDatas[index]" value-format="yyyy-MM-dd" :disabled="isDetailChild||item.disable" is-range  range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间"></el-time-picker>
            </el-form-item>

            <el-form-item v-else-if="item.type==='datetime'&&item.isShow" :prop="index" :label="item.name+':'" label-width="100px" class="mb-10">
              <el-date-picker v-model="childrenformDatas[index]" value-format="yyyy-MM-dd" :picker-options="pickerOptions" :disabled="isDetailChild||item.disable" type="datetime" placeholder="选择日期时间"></el-date-picker>
            </el-form-item>

            <el-form-item v-else-if="item.type==='datetime-range'&&item.isShow" :prop="index" :label="item.name+':'" label-width="100px" class="mb-10">
              <el-date-picker v-model="childrenformDatas[index]"  :disabled="isDetailChild||item.disable" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            </el-form-item>
            <!-- 文本框 -->
            <el-form-item v-else-if="item.type==='textarea'&&item.isShow" :prop="index" :label="item.name+':'" label-width="100px" class="mb-10">
              <el-input v-model="childrenformDatas[index]"  :disabled="isDetailChild||item.disable" type="textarea" class="article-textarea" :autosize="{ minRows: 1,maxRows: 5 }" placeholder="请输入内容"></el-input>
            </el-form-item>
            <!-- 附件上传 -->
            <!-- <el-form-item v-else-if="item.type==='plupload'&&item.isShow" :prop="index" :label="item.name+':'" label-width="100px" class="mb-10">
              <plupload v-if="item.requestType==='plupload'&&childrenformDatas[index]!==null" v-model="childrenformDatas[index]"  :imageOnly="true" service-name="asset" module-name="inventory" ></plupload>
            </el-form-item> -->
            <!-- 富文本编辑 -->
            <el-form-item v-else-if="item.type==='editor'&&item.isShow" :prop="index" :label="item.name+':'" label-width="100px" class="mb-10">
              <Tinymce ref="editor" :height="400" v-model="childrenformDatas[index]" :disabled="isDetailChild||item.disable" />
            </el-form-item>

            <!-- 图片上传 -->
            <el-form-item v-else-if="item.type==='image'&&item.isShow" :prop="index" :label="item.name+':'" label-width="100px" class="mb-10">
              <Upload v-model="childrenformDatas[index]" :disabled="isDetailChild||item.disable" />
            </el-form-item>

            <el-form-item v-else-if="item.type==='http'&&item.isShow" :prop="index" :label="item.name+':'" label-width="100px" class="mb-10">
              <el-input v-model="childrenformDatas[index]"  :disabled="isDetailChild||item.disable" >
                <template slot="prepend">Http://</template>
              </el-input>
            </el-form-item>

            <el-form-item v-else-if="item.type==='map'&&item.isShow" :prop="index" :label="item.name+':'" label-width="100px" >
              <el-input v-model="childrenformDatas[index]"  :disabled="isDetailChild||item.disable" readonly="readonly" @click.native="selectMap(index)"></el-input>
            </el-form-item>

            <el-form-item v-else-if="item.type==='password'&&item.isShow" :prop="index" :label="item.name+':'" label-width="100px" class="postInfo-container-item">
              <el-input v-model="childrenformDatas[index]"  :disabled="isDetailChild||item.disable" type="password"></el-input>
            </el-form-item>

            <el-form-item v-else-if="item.type==='input'&&item.isShow" :prop="index" :label="item.name+':'" label-width="100px" class="postInfo-container-item">
              <el-input v-model="childrenformDatas[index]"  :disabled="isDetailChild||item.disable" @change="handInputChange(item, index)"></el-input>
            </el-form-item>

            <el-form-item v-else-if="item.isShow" :prop="index" :label="item.name+':'" label-width="100px" class="postInfo-container-item">
              <el-input v-model="childrenformDatas[index]"  :disabled="isDetailChild||item.disable" ></el-input>
            </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addTable = false">取消</el-button>
        <el-button type="primary" @click="addChildTable(childTitleName)">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Tinymce from '@/components/Tinymce/index'
import Upload from '@/components/Upload/singleImage'
import MDinput from '@/components/MDinput/index'
import Pagination from '@/components/Pagination'
import Sticky from '@/components/Sticky/index'
import supervisionDepartments from '@/components/Project/supervisionDepartments' // 部门组件
// import departmentsName from '@/components/departmentsName' // 部门名称组件
import supervisionProject from '@/components/Project/supervisionProject' // 项目组件
// import SelectPeople from '@/components/SelectPeople/index' 
// import SelectOnePeople from '@/components/SelectOnePeople/index' 
// import Plupload from '@/components/Plupload/index' 
import { mapGetters } from 'vuex'
// import { setTimeout } from 'timers';
export default {
  name: 'PostForm',
  components: {
    Tinymce,
    MDinput,
    Upload,
    Sticky,
    supervisionDepartments,
    // departmentsName,
    supervisionProject,
    // SelectPeople,
    // SelectOnePeople,
    // Plupload
    Pagination
  },
  props: {
    isDetail: {
      type: Boolean,
      default: false
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    afieldName: {
      type: Object,
      default: {}
    },
    apiCreate: Function, // init function
    apiEdit: Function, // modify function
    apiData: Function, // detail function
    apiSave: Function, // save function
    apiTable: Function, // table function
    apiLinkage: Function, // 数据关联 function
    apiList: Function,
    apiDelete: Function, // 单个删除
    apiBatchdel: Function // 批量删除
  },
  data() {
    return {
      // test: '',
      temp: {
        f: null
      },
      loading: false,
      dialogTableVisible: false,
      status: 'waiting',
      postForms: {}, // 需要传初始化后台返回的对象
      // resFormlist: {}, // 初始化的表单列表
      formData: {},
      formDatas: {},
      childrenformDatas: {},
      pickerOptions: {
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            }
          },
          {
            text: '昨天',
            onClick(picker) {
              const  date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          },
          {
            text: '一周前',
            onClick(picker) {
              const  date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }
        ]
      },
      SystemIdentity: '', // 接请求表头带过来请求服务标识
      outNum: '', // 部门组件
      outdept: {
        number: '',
        name: ''
      },
      projectData: { // 项目组件
        id: '',
        number: '',
        name: ''
      },
      subData: {}, // 新增提交的数据对象
      detailData: {}, // 编辑提交的数据
      selectVal: '', // 下拉框绑定的值
      dialogMap: false,
      mapIndex: null,
      mapView: null,
      mapSearch: null,
      linkageTable: [], // 级联返回多条数据
      apiButtonData: [],
      list: {},
      apiTableTitle: [],
      apiActionData: [],
      listLoading: {},
      multipleSelection: [], // 选中的行
      apiPage: [],
      addTable: false,
      blockNo: '',
      childTitle: [],
      listPage: {},
      childTitleName: '',
      editId: '',
      isDetailChild: false,
      fieldProperty: {} // 字段属性

    }
  },
  computed: {
    ...mapGetters(['elements', 'deptName']),
    lang() {
      return this.$store.getters.language
    },
    // 校验必填
    rules() {
      const ruleData = {}
      for (const index in this.postForms) {
        if (!this.postForms[index].nullable) {
          ruleData[index] = [
            {
              required: true,
              message: '请输入：' + this.postForms[index].name,
              trigger: 'blur,change'
            }
          ]
        }
      }
      return ruleData
    },
    // 校验必填
    childRules() {
      const ruleData = {}
      for (const index in this.childTitle) {
        if (!this.childTitle[index].nullable) {
          ruleData[index] = [
            {
              required: true,
              message: '请输入：' + this.childTitle[index].name,
              trigger: 'blur,change'
            }
          ]
        }
      }
      return ruleData
    },
  },
  methods: {
    // 表头初始化，拿系统识别字段
    // 接系统标识admin的是message： local， oa的是：message： out
    getTableTitle() {
      const listquery = {
        blockNo: this.afieldName.getTableTitle
      }
      this.apiTable(listquery).then(res => {
        if (res.status === 200) {
          this.SystemIdentity = res.message
        }
      })
    },
    // 表单列表初始化接口
    getForms() {
      const listquery = {
        blockNo: this.afieldName.getFormList
      }
      this.apiCreate(listquery).then(res => {
        // 表单生成后再请求数据，如果有id的时候在渲染详情数据，过滤新增的时候发这个请求
        if (this.$route.params && this.$route.params.id) {
          this.getFormDetail() // 详情初始化
        } else {
          // 新增的时候传进去的为false
          this.isDetail = false
        }
        this.postForms = res.data
        // 渲染表单
        for (const index in this.postForms) {
          if (index !== 'children') {
            this.$set(this.formDatas, index, null)
          }
        }
        // 先请求详情数据回来之后再渲染表单列表，避免组件赋值有问题
        this.apiButtonData = res.data.children
        this.apiTableTitle = res.data.children
        for (const el of this.apiTableTitle) {
          this.$set(this.fieldProperty, el.fieldEnName, {})
          this.$set(this.fieldProperty[el.fieldEnName], 'type', el.type)
          this.$set(this.fieldProperty[el.fieldEnName], 'value', el.value)
        }
        this.apiActionData = res.data.children
        this.postForms.children.forEach(item => {
          this.$set(this.list, item.serviceName, [])
          this.$set(this.listPage, item.serviceName, 0)
          this.$set(this.listLoading, item.serviceName, false)
          this.$set(this.apiPage, item.serviceName, { page: 1, limit: 10 })
        })
      })
    },
    loadChildTable(name) {
      this.listLoading[name] = true
      // asset system identity
      if (!this.SystemIdentity) {
        this.$message({
          title: '失败',
          type: 'error',
          message: '系统标识不能为空!'
        })
        return
      }
      // 本地接口
      if (this.SystemIdentity === 'local') {
        if (this.$route.params.id) {
          this.apiPage[name][this.postForms.children[0].childField] = this.$route.params.id
        }
        this.apiPage[name].blockNo = name + 'Search'
        const queryParams = JSON.stringify(this.apiPage[name])
        this.apiList(queryParams).then(response => {
          if (response.status === 200) {
            this.listLoading[name] = false
            const result = response.data
            this.$set(this.listPage, name, result.total)
            this.$set(this.list, name, result.rows)
            this.list[name].forEach(item => {
              // 支持行内编辑
              this.$set(item, 'editShow', false)
              // 返回类型转换
              for (const key in item) {
                const val = item[key]
                const property = this.fieldProperty[key]
                if (property && property.type === 'select') {
                  // 转文本类型，匹配下拉值
                  this.$set(item, key, val.toString())
                } else if (property && property.type === 'timestamp') {
                  // 时间戳
                  this.$set(item, key, parseTime(Number(val)))
                } else if (property && property.type === 'date') {
                  // 日期
                  this.$set(item, key, val)
                } else {
                  this.$set(item, key, val)
                }
              }
            })
          } else {
            this.$message({
              title: '失败',
              type: 'error',
              message: response.message
            })
            this.listLoading[name] = false
          }
        })
      } else if (this.SystemIdentity === 'out') {
        this.apiList(queryParams).then(response => {
          if (response.status === 200) {
            const result = response.data
            this.list = result.rows
            this.list.forEach(item => {
              for (const key in item) {
                // 下拉字段转换
                const property = this.fieldProperty[key]
                if (property && property.type === 'select') {
                  const valProperty = this.fieldProperty[key].value
                  item[key] = JSON.parse(valProperty)[item[key]]
                }
              }
            })
            this.listPage.totalNum = result.total
            this.listLoading[name] = false
          } else {
            this.$message({
              title: '失败',
              type: 'error',
              message: response.message
            })
            this.listLoading[name] = false
          }
        })
      }
    },
    loadTable() {
      // asset system identity
      if (!this.SystemIdentity) {
        this.$message({
          title: '失败',
          type: 'error',
          message: '系统标识不能为空!'
        })
        return
      }
      // 本地接口
      if (this.SystemIdentity === 'local') {
        this.postForms.children.forEach(item => {
          this.listLoading[item.serviceName] = true
          if (this.$route.params.id) {
            this.apiPage[item.serviceName][this.postForms.children[0].childField] = this.$route.params.id
          }
          this.apiPage[item.serviceName].blockNo = item.serviceName + 'Search'
          const queryParams = JSON.stringify(this.apiPage[item.serviceName])
          this.apiList(queryParams).then(response => {
            if (response.status === 200) {
              this.listLoading[item.serviceName] = false
              const result = response.data
              this.$set(this.listPage, item.serviceName, result.total)
              this.$set(this.list, item.serviceName, result.rows)
              this.list[item.serviceName].forEach(item => {
                // 支持行内编辑
                this.$set(item, 'editShow', false)
                // 返回类型转换
                for (const key in item) {
                  const val = item[key]
                  const property = this.fieldProperty[key]
                  if (property && property.type === 'select') {
                    // 转文本类型，匹配下拉值
                    this.$set(item, key, val.toString())
                  } else if (property && property.type === 'timestamp') {
                    // 时间戳
                    this.$set(item, key, parseTime(Number(val)))
                  } else if (property && property.type === 'date') {
                    // 日期
                    this.$set(item, key, val)
                  } else {
                    this.$set(item, key, val)
                  }
                }
              })
            } else {
              this.$message({
                title: '失败',
                type: 'error',
                message: response.message
              })
              this.listLoading[item.serviceName] = false
            }
          })
        })
      } else if (this.SystemIdentity === 'out') {
        this.apiList(queryParams).then(response => {
          if (response.status === 200) {
            const result = response.data
            this.list = result.rows
            this.list.forEach(item => {
              for (const key in item) {
                // 下拉字段转换
                const property = this.fieldProperty[key]
                if (property && property.type === 'select') {
                  const valProperty = this.fieldProperty[key].value
                  item[key] = JSON.parse(valProperty)[item[key]]
                }
              }
            })
            this.listPage.totalNum = result.total
            this.listLoading = false
          } else {
            this.$message({
              title: '失败',
              type: 'error',
              message: response.message
            })
            this.listLoading = false
          }
        })
      }
    },
    getChildDetail(paramsId) {
      // 先请求回来系统识别后再发详情的请求
      const listquery = {
        blockNo: this.blockNo + 'table'
      }
      this.apiTable(listquery).then(res => {
        if (res.status === 200) {
          this.SystemIdentity = res.message 
          // 如果是admin
          if(this.SystemIdentity && this.SystemIdentity === 'local' && paramsId) {
            const detailQuery = {
              blockNo: this.blockNo + 'Form',
              id: paramsId
            }
            this.apiData(detailQuery).then(res => {
              const detailData = res.data
              for (const key in detailData) {
                if ( detailData.hasOwnProperty(key) && detailData[key] !== null) {
                  detailData[key] = detailData[key].toString()
                }
              }
              this.childrenformDatas = detailData
            })
          } else if (this.SystemIdentity && this.SystemIdentity === 'out' && paramsId) {
            this.apiData(paramsId).then(res => {
              const detailData = res.data
              this.childrenformDatas = detailData
            })
          }
        }
      })
    },
    // 获取表单详情数据
    getFormDetail() {
      const paramsId = this.$route.params.id
      // 先请求回来系统识别后再发详情的请求
      const listquery = {
        blockNo: this.afieldName.getTableTitle
      }
      this.apiTable(listquery).then(res => {
        if (res.status === 200) {
          this.SystemIdentity = res.message 
          // 如果是admin
          if(this.SystemIdentity && this.SystemIdentity === 'local' && paramsId) {
            const detailQuery = {
              blockNo: this.afieldName.getFormList,
              id: paramsId
            }
            this.apiData(detailQuery).then(res => {
              const detailData = res.data
              for (const key in detailData) {
                if ( detailData.hasOwnProperty(key) && detailData[key] !== null) {
                  detailData[key] = detailData[key].toString()
                }
              }
              this.formDatas = detailData
              this.$set(this.apiPage, this.postForms.children[0].childField, this.formDatas[this.postForms.children[0].parentField])
              this.loadTable()
            })
          } else if (this.SystemIdentity && this.SystemIdentity === 'out' && paramsId) {
            this.apiData(paramsId).then(res => {
              const detailData = res.data
              this.formDatas = detailData
            })
          }
        }
      })
    },
    readId() {
      return (this.isEdit && this.$route.params && this.$route.params.id) || null
    },
    // 表单保存
    submitForm() {
      this.$refs['rule-form'].validate(valid => {
        if (valid) {
          this.adminSaveForm()
        } else {
          console.log('error submit !!')
        }
      })
    },
    // 子表单保存
    submitChildForm(name, idx) {
      this.$refs['child-form'].validate(valid => {
        if (valid) {
          this.childSaveForm(name, idx)
        } else {
          console.log('error submit !!')
        }
      })
    },
    // 子表单 服务的新增和修改
    childSaveForm(name, idx) {
      if (this.SystemIdentity === 'local') {
        // 如果是admin
        this.subData = {
          blockNo: this.blockNo + 'Form'
        }
        for (const index in this.childTitle) {
          this.subData[this.childTitle[index].requestParams] = this.childrenformDatas[index]
        }
        this.subData[this.postForms.children[0].childField] = this.apiPage[this.blockNo][this.postForms.children[0].childField]
      } else {
        // 如果是oa
        this.subData = {}
        for (const index in this.childTitle) {
          this.subData[this.childTitle[index].requestParams] = this.childrenformDatas[index]
        }
      }

      if (name === 'add') {
        this.apiSave(this.subData).then(response => {
          if (response.status === 200) {
            this.$notify({
              title: '成功',
              type: 'success',
              message: '保存成功',
              duration: 2000
            })
            this.status = 'success'
            this.apiPage[this.blockNo].page = 1
            this.apiPage[this.blockNo].limit = 10
            this.loadChildTable(this.blockNo) // 详情初始化
            this.addTable = false
          } else {
            this.addTable = false
            this.$message({
              type: 'error',
              title: '失败',
              message: response.message
            })
            this.apiPage[this.blockNo].page = 1
            this.apiPage[this.blockNo].limit = 10
            this.loadChildTable(this.blockNo) // 详情初始化
          }
        })
      } else if (name === 'edit') {
        // 编辑保存
        if (this.SystemIdentity === 'loacl') {
          this.detailData = {
            blockNo: this.blockNo + 'Form',
            id: idx
          }
          for (const index in this.childTitle) {
            if (index !== 'children') {
              this.detailData[this.childTitle[index].requestParams] = this.childrenformDatas[index]
            }
          }
        } else {
          // 如果是oa
          this.detailData = {
            id: idx
          }
          for (const index in this.postForms) {
            this.detailData[this.postForms[index].requestParams] = this.postForms[index]
          }
        }
        this.apiEdit(this.detailData).then(res => {
          if (res.status === 200) {
            this.$notify({
              title: '成功',
              message: '保存成功',
              type: 'success',
              duration: 2000
            })
            this.status = 'success'
            this.loadChildTable(this.blockNo) // 详情初始化
            this.addTable = false
            this.loading = false
          } else {
            this.loading = false
            this.loadChildTable(this.blockNo) // 详情初始化
            this.addTable = false
            this.$message({
              title: '失败',
              type: 'error',
              message: res.message
            })
          }
        })
      }
    },
    // admin 服务的新增和修改
    adminSaveForm() {
      // 键值对的方式数据保存
      if (this.SystemIdentity === 'local') {
        // 如果是admin
        this.subData = {
          blockNo: this.afieldName.getFormList
        }
        for (const index in this.postForms) {
          this.subData[this.postForms[index].requestParams] = this.formDatas[index]
        }
      } else {
        // 如果是oa
        this.subData = {}
        for (const index in this.postForms) {
          this.subData[this.postForms[index].requestParams] = this.formDatas[index]
        }
      }

      if (this.$route.params.id) {
        // 新增保存
        this.loading = true
        this.apiSave(this.subData).then(response => {
          if (response.status === 200) {
            this.$notify({
              title: '成功',
              type: 'success',
              message: '保存成功',
              duration: 2000
            })
            this.status = 'success'
            this.backForm()
            this.loading = false
          } else {
            this.loading = false
            this.$message({
              type: 'error',
              title: '失败',
              message: response.message
            })
          }
        })
      } else {
        // 编辑保存
        if (this.SystemIdentity === 'loacl') {
          // 如果是admin
          const paramsId = this.$route.params.id
          this.detailData = {
            blockNo: this.afieldName.getFormList,
            id: paramsId
          }
          for (const index in this.postForms) {
            this.detailData[this.postForms[index].requestParams] = this.formDatas[index]
          }
        } else {
          // 如果是oa
          const paramsId = this.$route.params.id
          this.detailData = {
            id: paramsId
          }
          for (const index in this.postForms) {
            this.detailData[this.postForms[index].requestParams] = this.formDatas[index]
          }
        }
        this.apiEdit(this.detailData).then(res => {
          if (res.status === 200) {
            this.$notify({
              title: '成功',
              message: '保存成功',
              type: 'success',
              duration: 2000
            })
            this.status = 'success'
            this.backForm()
            this.loading = false
          } else {
            this.loading = false
            this.$message({
              title: '失败',
              type: 'error',
              message: res.message
            })
          }
        })
      }
    },
    serializeData() {
      const serializeData = this.formDatas
      for (const i in serializeData) {
        if (postForms[i].disable) {
          delete postForms[i]
        }
      }
    },
    selectMap(index) {
      this.dialogMap = true
      this.mapIndex = index
      setTimeout(() => {
        this.initMap()
      }, 50)
    },
    searchMap() {
      this.mapView.centerAndZoom(this.mapSearch, 14)
    },
    initMap() {
      if (!this.mapView) {
        const $this = this
        // 初始化地图
        const mapView = new BMap.Map('dialogMap')
        // 设置起点
        mapView.centerAndZoom('广州', 14)
        // 添加鼠标滚动缩放
        mapView.enableScrollWheelZoom()
        // 添加缩放平移控件
        mapView.addControl(new BMap.NavigationControl())
        // 添加比例尺寸控件
        mapView.addControl(new BMap.ScaleControl())
        // 添加缩略图控件
        mapView.addControl(new BMap.OverviewMapControl({ isOpen: true }))
        // 地图类型
        mapView.addControl(new BMap.MapTypeControl({
          mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]
        }))
        // 绑定事件
        mapView.addEventListener('click', event => {
          $this.dialogMap = false
          $this.formDatas[$this.mapIndex] = event.point.lng + ',' + event.point.lat
        })
        // 定义数据
        this.mapView = mapView
      }
    },
    // 点击返回按钮
    backForm() {
      this.$router.back(-1)
    },
    // 输入框变化监听
    handInputChange(data, index) {
      if (data.linkageService !== null && data.linkageService !== '') {
        const query = {
          configId: data.id,
          value: this.formDatas[index],
          contrast: '='
        }
        this.apiLinkage(query).then(res => {
          const count = res.data.total
          if (count > 1) {
            this.formDatas = res.data.rows[0]
            this.linkageTable = res.data.rows
            this.dialogTableVisible = true
          } else if (count === 1) {
            const data = res.data.rows[0]
            this.formDatas = data
          }
        })
      }
    },
    linkTable(val) {
      this.formDatas = val
      this.dialogTableVisible = false
    },
    // 根据不同的类型匹配方法
    handleAction(action, row, name) {
      switch (action) {
        case 'detail':
          this.handleDetail(row.fid, name)
          break
        case 'editor': // 编辑
          this.handleEditor(row.fid, name)
          break
        case 'editor_inner': // 行内编辑
          this.handleEditorInner(row)
          break
        case 'delete':
          this.handleDelete(row.fid)
          break
        case 'add':
          this.handleAdd(name)
          break
        case 'export': // 导出
          this.handleExport()
          break
        case 'auto-export': // 自动导出
          this.handleAutoExport()
          break
        case 'batchRemove': // 批量删除
          this.handleBatchRemove(name)
          break
        case 'download-template': // 下载模板
          this.handleDownloadTemplate()
          break
        case 'import_ex':
          this.handleImport()
          break
        case 'workflow_entr': // 工作流
          this.handleWorkflow()
          break
        default:
        if (action.indexOf('/') === 0) {
          this.$router.push(action + '/' + row.id)
          if (row.id === '' || row.id === null) {
            this.$router.push(action)
          }
        } else {
          this.$router.push(this.getPath(action + '/' + row.id))
        }
      }
    },
    // 编辑
    handleEditor(id, name) {
      this.editId = id
      this.childTitleName = '编辑数据'
      this.blockNo = name
      this.getChildForm()
      this.isDetailChild = false
      this.getChildDetail(id)
    },
    // 行内编辑
    handleEditorInner(row) {
      this.editId = row.id
      row.editShow = !row.editShow
    },
    // 行内保存
    confirmEdit(row) {
      if (this.SystemIdentity === 'local') {
        const lineData = row
        delete lineData.editShow
        this.$set(lineData, 'blockNo', this.afieldName.getFormList)
        this.apiEdit(lineData).then(res => {
          if (res.status === 200) {
            this.$notify({
              title: '成功',
              message: '保存成功',
              type: 'success',
              duration: 2000
            })
            row.editShow = false
            this.loadTable()
          } else {
            this.$message({
              title: '失败',
              type: 'error',
              message: res.message
            })
          }
        })
      }
    },
    getChildForm() {
      const listquery = {
        blockNo: this.blockNo + 'Form'
      }
      this.apiCreate(listquery).then(res => {
        if (res.status === 200) {
          this.childTitle = res.data
          this.addTable = true
        }
      })
    },
    // 详情
    handleDetail(id, name) {
      this.childTitleName = '查看数据'
      this.isDetailChild = true
      this.blockNo = name
      this.getChildForm()
      this.getChildDetail(id)
    },
    // 新增
    handleAdd(name) {
      if (this.status === 'success' || this.$route.params.id) {
        this.childrenformDatas = {}
        this.isDetailChild = false
        this.childTitleName = '新增数据'
        this.blockNo = name
        this.getChildForm()
      } else {
        this.$message({
          title: '提示',
          type: 'warning',
          message: '请先保存主表单再添加'
        })
      }
    },
    addChildTable(name) {
      if (name === '新增数据') {
        this.submitChildForm('add')
      } else if (name === '查看数据') {
        this.addTable = false
      } else if (name === '编辑数据') {
        this.submitChildForm('edit', this.editId)
      }
    },
    // 导入
    handleImport() {
      // 工资条临时处理
      if (this.$route.path === '/hr/info/wage') {
        this.$router.push(this.getPath('import_ex'))
      } else {
        this.centerDialogVisible = true
      }
    },
    // 点击弹框导入数据
    submitUpload() {
      this.formData = new FormData()
      this.formData.append('file', document.getElementById('exFile').files[0])
      this.apiImport(this.formData, this.severFlag.name).then(response => {
        if (response.status === 200) {
          this.$message({
            title: '成功',
            type: 'success',
            message: response.message
          })
          this.loadTable()
        } else {
          this.$message({
            title: '失败',
            type: 'error',
            message: response.message
          })
        }
      })
    },
    // 获取文件名称
    getFileNameFn() {
      if (this.severFlag.name) {
        this.apiFilename(this.severFlag.name).then(res => {
          if (res.status === 200) {
            this.fileDatas = res.data
          } else {
            this.$message({
              type: 'warning',
              message: '获取文件名失败'
            })
          }
          for (const k in this.fileDatas) {
            if (k === 'template_name') {
              this.templateFileName = this.fileDatas[k].value // 下载文件名
            } else if (k === 'export_file_name') {
              this.exportFilename = this.fileDatas[k].value // 自动导出的文件名
            }
          }
        })
      }
    },
    // 删除行
    handleDelete(id) {
      this.$msgbox({
        title: '提示消息',
        message: '是否确认删除记录？',
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(action => {
        if (action === 'confirm') {
          if (this.SystemIdentity === 'local') {
            const delObj = {
              blockNo: this.afieldName.getSearch,
              ids: [id]
            }
            this.apiDelete(this.deleteUrl, this.deleteWay, delObj).then(response => {
              if (response.status === 200) {
                this.loadTable()
              }
            })
          } else {
            // 调用其他方法删除
            this.apiDelete(id).then(response => {
              if (response.status === 200) {
                this.loadTable()
              }
            })
          }
        } 
      })
    },
    // 复选框方法
    selectionChange(val) {
      this.multipleSelection = val
    },
    // 批量删除
    handleBatchRemove(name) {
      if (this.multipleSelection.length > 0) {
        const selectIds = []
        for (const item of this.multipleSelection) {
          selectIds.push(item[this.postForms.children[0].parentField])
        }
        this.$msgbox({
          title: '提示消息',
          message: '是否确认删除记录？',
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(action => {
          if (action === 'confirm') {
            if (this.SystemIdentity === 'local') {
              const delObjs = {
                blockNo: name + 'Search',
                ids: selectIds
              }
              delObjs[this.postForms.children[0].childField] = this.apiPage[this.postForms.children[0].childField]
              this.apiBatchdel(delObjs).then(response => {
                if (response.status === 200) {
                  this.loadChildTable(name)
                }
              })
            } else {
              // 需要的是一个对象的ids数组集
              const batchdel = {
                ids: selectIds
              }
              this.apiBatchdel(batchdel).then(res => {
                if (response.status === 200) {
                  this.loadChildTable(name)
                }
              })
            }
          } 
        })
      } else {
        this.$message({
          type: 'warning',
          message: '请选择需要删除的数据'
        })
      }
    },
    // 导出数据
    handleExport() {
      // 获取查询框的字段 遍历获取有值的输入框
      const list = {}
      this.apiSearchrows.forEach(element => {
        if (element.value && element.isShow) {
          list[element.fieldEnName] = element.value
        }
      })
      const as = JSON.stringify(list).replace(/:/gi, '=')
      const bs = as.replace(/"/ig, '')
      this.newStr = bs.substring(1, bs.length - 2)
      // 若果前面有值，前面添加一个逗号
      if (this.newStr.length > 0) {
        this.newStr = ',' + this.newStr
      }
      document.getElementById('simpleExport').click()
    },
    // 自动导出
    handleAutoExport() {
      this.apiAutoexport(this.severFlag.name).then(response => {
        fileDownload(response, this.exportFilename)
      }).catch(() => {
        this.$message({
          type: 'warning',
          message: '导出失败'
        })
      })
    },
    // 下载模板
    handleDownloadTemplate() {
      this.apiDownload(this.severFlag.name).then(res => {
        fileDownload(res, this.templateFileName)
      }).catch(() => {
        this.$message({
          type: 'warning',
          message: '下载模板失败'
        })
      })
    },
    handleWorkflow() {
      // 工作流
      this.$router.push(this.getPath('workflow'))
    }

  },
  // 监听路由的变化重新加载详情的数据
  watch: {
    $route(to, from) {
      if (from.path !== to.path && this.$route.params && this.$route.params.id) {
        this.getFormDetail() // 详情初始化
      }
    }
  },
  mounted() {
    this.getTableTitle() // 表头初始化
    this.getForms() // 表单初始化
  }
}
</script>
<style lang="scss" scoped>
@import 'src/styles/mixin.scss';
.tableForm-box {
  border-top: 1px solid #dcdfe6;
}
.titleTable {
  margin-top: 25px;
}
.tableForm-container {
  position: relative;
  .tableForm-main-container {
    background-color: #fff;
    padding: 40px 45px 20px 40px;
    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;
      .postInfo-container-item {
        float: left;
      }
    }
    .editor-container {
      min-height: 500px;
      margin: 0 0 30px;
      .editor-upload-btn-container {
        text-align: right;
        margin-right: 10px;
        .editor-upload-btn {
          display: inline-block;
        }
      }
    }
  }
  .word-counter {
    width: 40px;
    position: absolute;
    right: -10px;
    top: 0;
  }
}
</style>

