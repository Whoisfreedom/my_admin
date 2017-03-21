<template>
	<div class="right-out">
  <!-- 面包屑导航 -->
		<el-breadcrumb separator="/">
		  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
		  <el-breadcrumb-item :to="{ path: '/order' }">订单</el-breadcrumb-item>
		  <el-breadcrumb-item>出库/发货记录</el-breadcrumb-item>
		</el-breadcrumb>
    <!-- 表格 -->
		<div class="router-body" v-loading.body="loading">
      <!-- 搜索栏 -->
      <div class="searchAndSet">
          <el-input v-model="search" placeholder="请输入搜索内容"></el-input>
          <el-select v-model="searvhValue" placeholder="请选择搜索条件">
            <el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.id">
            </el-option>
          </el-select>
          <el-button @click="searchUser(searvhValue)">搜索</el-button>
          <el-button type="primary" @click="dialogFormVisible = true">添加</el-button>
      </div>
			<el-table :data="tableData" border style="width: 100%" max-height="700" @select="selsChange">
          <el-table-column type="selection" width="55">
          </el-table-column>
			    <el-table-column label="用户ID" width="150"  prop="userId" align="center" sortable>
			    </el-table-column>
			    <el-table-column label="用户名称" width="150" prop="userName" align="center">
			    </el-table-column>
			    <el-table-column label="地址" width="150" prop="address" align="center">
			    </el-table-column>
			    <el-table-column label="电话"  width="150" prop="phone" align="center">
			    </el-table-column>
			    <el-table-column label="注册时间" width="150" prop="registerTime" align="center" sortable>
			    </el-table-column>
			    <el-table-column label="登录次数" width="150" prop="loginCount" align="center" sortable>
			    </el-table-column>
          <el-table-column label="最后登录时间" width="150" prop="lastLoginTime" align="center" sortable>
          </el-table-column>
			    <el-table-column fixed="right" label="操作" width="180" align="center">
  		      <template scope="scope" style="text-align:center">
  		        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
  		        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
  		      </template>
			    </el-table-column>
		  </el-table>
      <!-- 分页选择器 -->
			  <div class="block">
          <el-button type="danger" @click="deleteAll" :disabled="this.sels.length===0">批量删除</el-button>
			    <el-pagination
			      @size-change="handleSizeChange"
			      @current-change="handleCurrentChange"
			      :current-page="1"
			      :page-sizes="[10, 20, 30, 40]"
			      :page-size="getUserData.pageSize"
			      layout="total, sizes, prev, pager, next"
			      :total="datalength">
			    </el-pagination>
			  </div>
      <!-- 弹出对话框 -->
      <el-dialog title="提示" v-model="dialogVisible" size="tiny">
        <span>确定要删除吗</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="selectsure(deleteIndex)">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 弹出添加信息的表单 -->
      <div class="addForm">
          <el-dialog title="添加信息" v-model="dialogFormVisible">
          <el-form :model="addForm" :rules="addRules" ref="addForm">
            <el-form-item label="用户名" prop="userName">
              <el-input v-model="addForm.userName" :min="0" :max="200"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="passWord">
              <el-input v-model="addForm.passWord" :min="0" :max="200"></el-input>
            </el-form-item>
            <el-form-item label="地址" prop="address">
              <el-input v-model="addForm.address" :min="0" :max="200"></el-input>
            </el-form-item>
            </el-form-item>
            <el-form-item label="电话" prop="phone">
              <el-input v-model="addForm.phone" :min="0" :max="200"></el-input>
            </el-form-item>         
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitAddForm">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <!-- 弹出编辑信息的页面 -->
      <div class="changeForm">
          <el-dialog title="添加信息" v-model="dialogFormChange">
          <el-form :model="changeForm" :rules="changeRules" ref="changeForm">
            <el-form-item label="用户名" prop="userName">
              <el-input v-model="changeForm.userName" :min="0" :max="200"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="passWord">
              <el-input v-model="changeForm.passWord" :min="0" :max="200"></el-input>
            </el-form-item>
            <el-form-item label="地址" prop="address">
              <el-input v-model="changeForm.address" :min="0" :max="200"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="phone">
              <el-input v-model="changeForm.phone" :min="0" :max="200"></el-input>
            </el-form-item>            
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="submitChangeForm = false">取 消</el-button>
            <el-button type="primary" @click="submitChangeForm">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      
		</div>
	</div>
</template>
<script type="text/javascript">
  import {getUserList, methodsList, addUserInfo, changeUserInfo, deleteUserInfo} from '../../api/api'
  export default {
    data() {
      return {
        dialogVisible :false, //提示框是否显示
        datalength: 0,  //数据长度          
        tableData: [],  //当前页面数据
        deleteIndex : -1, //需要删除的数据下标
        search:'',       //搜索栏内容
        dialogFormVisible:false, //允许新增弹出框弹出
        loading:false,  //loading动画
        sels:[],//多选选择器
        dialogFormChange:false, //允许编辑弹出框弹出
        deleteId:'',
        //添加个人数据初始化
        addForm:{
          userName:'',
          passWord:'',
          address:'',
          phone:''
        },
        //编辑个人数据初始化
        changeForm:{
          userName:'',
          passWord:'',
          address:'',
          phone:'',
          userId:''
        },
        //发送数据参数
        getUserData:{
          pageIndex: 1 , //当前页面
          pageSize:10, //每个页面的显示数据
        },
        //必填选项验证
        addRules:{
          userName: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          passWord: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '请输入地址', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入电话号码', trigger: 'blur' }
          ],
        },
        changeRules:{
          userName: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          passWord: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '请输入地址', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入电话号码', trigger: 'blur' }
          ],
        },
        options:[{
          value: 'userId',
          label: '按用户ID查找'
        }, {
          value: 'userName',
          label: '按用户名称查找'
        }, {
          value: 'phone',
          label: '按用户电话查找'
        }],
        searvhValue:''
      }
    },
    // 页面渲染之前获取第一页的数据
    mounted:function(){
      this.getCustomers();
    },
    // 方法
    methods: {
      //搜索点击事件
      searchUser(val){
        console.log(val);
        !val ? this.getUserData : this.getUserData[val] = this.search;
        console.log(this.getUserData);
      },
      // 删除信息成功弹窗
      open3(val) {
        this.$notify({
          title: val+'成功',
          message: '您已经成功'+val+'信息',
          type: 'success'
        });
      },
      //添加信息并且重置
      submitAddForm(){
        // this.$refs.addForm.validate((valid) => {
        //   if (valid) {
        //     let addData = {
        //       method:methodsList.addUser
        //     };
        //     for(var i in this.addForm){
        //       addData[i] = this.addForm[i].toString();
        //     };
        //     console.log(addData);
        //   addUserInfo(addData).then((response) => {
        //         this.open3('添加');
        //         this.$refs.addForm.resetFields();
        //         this.dialogFormVisible = false;  
        //         this.getCustomers()
        //     })
        //     .catch(function(response){
        //         console.log(response)
        //     })
        //   } else {
        //     console.log('error submit!!');
        //     return false;
        //   }
        // });   
              
      },
      //确认编辑信息
      submitChangeForm(){
        // this.$refs.changeForm.validate((valid) => {
        //   if (valid) {
        //     let changeData = {
        //       method:methodsList.changeUser
        //     };
        //     for(let i in this.changeForm){
        //       changeData[i] = this.changeForm[i].toString();
        //     };
        //     console.log(changeForm);
        //     changeUserInfo(changeForm).then((response) => {
        //         this.open3('修改');
        //         this.$refs.changeForm.resetFields();
        //         this.dialogFormChange = false;
        //         this.getCustomers()          
        //     })
        //     .catch(function(response){
        //         console.log(response)
        //     })
        //   } else {
        //     console.log('error submit!!');
        //     return false;
        //   }
        // });
      },
      // 编辑详细信息
      handleEdit(index, row) {
        this.dialogFormChange = true;
        for(let i in changeForm)
        this.changeForm[i] = row[i]
        console.log(this.changeForm);
      },
      // 删除此条信息
      handleDelete(index, row) {
        this.dialogVisible = true;
        this.deleteIndex = index;
        this.deleteId = row.userId;
        console.log(index, row);
      },
      // 确认删除
      selectsure(index){
        this.tableData.splice(index,1);
        this.dialogVisible = false;
        this.open3('删除');
      },
      // 修改页数事件
	    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.getUserData.pageSize = val;
        this.getCustomers();
      },
      // 翻页事件
      handleCurrentChange(val) {
      this.getUserData.pageIndex = val;
      console.log(`当前页: ${val}`);
      this.getCustomers();
      },
      //多选框选择事件
      selsChange(sels){
        this.sels=sels;
        console.log(sels);
      },
      //批量删除
      deleteAll(){
        console.log(this.sels.map(item => item.productid));
        this.$confirm("确认删除选中记录吗？",'提示',{
          type: 'warning'}).then(()=>{
            this.loading = true;
            this.getCustomers();
            this.open3('删除');
          })
      },
      // 请求数据并重新渲染页面
      getCustomers(){
        // let userData = {};
        // userData.method = methodsList.getUser;
        // for(var i in this.getUserData){
        //   userData[i] = this.getUserData[i].toString();
        // }
        // // this.loading = true;
        // getUserList(userData).then((response) => {
        //     // this.loading = false;
        //     console.log(response);
        //     this.tableData=[];
        //     var _data = response.data.objectResult;
        //     this.datalength = _data.length
        //     console.log(_data);
        //     for(var i = 0;i<this.datalength;i++){
        //     this.tableData.push(_data[i])
        //   }
        //     console.log(this.tableData)  
        // })
        // .catch(function(response){
        //     console.log(response)
        // })
      }
    }
  }	
</script>
<style type="text/css">
	.block{
		text-align: center;
		padding-top: 20px;
	}
  .el-table__fixed-body-wrapper table tbody td{
    background-color: #ffffff;
  }
  .el-table{
    max-height:85%;
  }
  .block .el-button{
    float: left;
    margin-left: 20px;
  }
  .block .el-pagination{
    float: right;
  }
  .searchAndSet{
    height: 50px;
  }
  .searchAndSet .el-input{
    float: left;
    width: 200px;
    padding-left:20px; 
  }
  .searchAndSet .el-select{
    float: left;
    margin-right: 20px;
  }
  .searchAndSet .el-button{
    float: left;
  }
  .searchAndSet .el-input__inner{
    width: 100%;
  }
  .addForm .el-form-item__content{
    margin-left: 80px;
  }
  .addForm .el-form-item__label{
    width: 80px;
    text-align: right;
  }
</style>