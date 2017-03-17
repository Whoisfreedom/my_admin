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
          <el-button>搜索</el-button>
          <el-button type="primary" @click="dialogFormVisible = true">添加</el-button>
      </div>
			<el-table :data="tableData" border style="width: 100%" max-height="700" @select="selsChange">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column type="index" width="55">
          </el-table-column>
			    <el-table-column label="日期" width="150"  prop="date" align="center">
			    </el-table-column>
			    <el-table-column label="名称" width="120" prop="name" align="center">
			    </el-table-column>
			    <el-table-column label="数量" width="120" prop="number" align="center">
			    </el-table-column>
			    <el-table-column label="地址"  width="180" prop="address" align="center">
			    </el-table-column>
			    <el-table-column label="颜色" width="120" prop="color" align="center">
			    </el-table-column>
			    <el-table-column label="价格" width="120" prop="price" align="center">
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
			      :page-size="pagesize"
			      layout="total, sizes, prev, pager, next, jumper"
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
          <el-form :model="addForm" :rules="rules" ref="addForm">
            <el-form-item label="名称" prop="name">
              <el-input v-model="addForm.name" :min="0" :max="200"></el-input>
            </el-form-item>
            <el-form-item label="地址">
              <el-input v-model="addForm.address" :min="0" :max="200"></el-input>
            </el-form-item>
            <el-form-item label="日期">
             <el-date-picker type="date" placeholder="选择日期" v-model="addForm.date"></el-date-picker>
            </el-form-item>
            <el-form-item label="数量">
              <el-input-number v-model="addForm.number" :min="0" :max="200"></el-input-number>
            </el-form-item>
            <el-form-item label="价格">
              <el-input-number v-model="addForm.price" :min="0" :max="200"></el-input-number><span>元</span>
            </el-form-item>
            <el-form-item label="颜色">
              <el-input v-model="addForm.color" :min="0" :max="200"></el-input>
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
          <el-form :model="changeForm" :rules="rules" ref="changeForm">
            <el-form-item label="名称" prop="name">
              <el-input v-model="changeForm.name" :min="0" :max="200"></el-input>
            </el-form-item>
            <el-form-item label="地址">
              <el-input v-model="changeForm.address" :min="0" :max="200"></el-input>
            </el-form-item>
            <el-form-item label="日期">
             <el-date-picker type="date" placeholder="选择日期" v-model="changeForm.date"></el-date-picker>
            </el-form-item>
            <el-form-item label="数量">
              <el-input-number v-model="changeForm.number" :min="0" :max="200"></el-input-number>
            </el-form-item>
            <el-form-item label="价格">
              <el-input-number v-model="changeForm.price" :min="0" :max="200"></el-input-number><span>元</span>
            </el-form-item>
            <el-form-item label="颜色">
              <el-input v-model="changeForm.color" :min="0" :max="200"></el-input>
            </el-form-item>           
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitChangeForm">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      
		</div>
	</div>
</template>
<script type="text/javascript">
  import {getUserList} from '../../api/api'
  export default {
    data() {
      return {
        dialogVisible :false, //提示框是否显示
        nowpage: 1,     //当前页面
        datalength: 0,  //数据长度
        pagesize:10,    //每个页面的显示数据
        tableData: [],  //当前页面数据
        deleteIndex : -1, //需要删除的数据下标
        search:'',       //搜索栏内容
        dialogFormVisible:false, //允许新增弹出框弹出
        loading:false,  //loading动画
        sels:[],//多选选择器
        dialogFormChange:false, //允许编辑弹出框弹出
        //添加个人数据初始化
        addForm:{
          date:'',
          name:'',
          number:0,
          address:'',
          color:'',
          price:0
        },
        //编辑个人数据初始化
        changeForm:{
          date:'',
          name:'',
          number:0,
          address:'',
          color:'',
          price:0,
          productid:-100
        },
        rules:{
          name: [
            { required: true, message: '请输入名称', trigger: 'blur' }
          ]
        }
      }
    },
    // 页面渲染之前获取第一页的数据
    mounted:function(){
      this.getCustomers();
    },
    // 方法
    methods: {
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
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.$refs.addForm.resetFields();
            this.dialogFormVisible = false;
          } else {
            console.log('error submit!!');
            return false;
          }
        });
        this.getCustomers()
        this.open3('添加');
      },
      //确认编辑信息
      submitChangeForm(){
        this.$refs.changeForm.validate((valid) => {
          if (valid) {
            this.$refs.changeForm.resetFields();
            this.dialogFormChange = false;
          } else {
            console.log('error submit!!');
            return false;
          }
        });
        this.getCustomers()
        this.open3('修改');
      },
      // 详细信息
      handleEdit(index, row) {
        this.dialogFormChange = true;
        this.changeForm = Object.assign({}, row);
        console.log(this.changeForm);
      },
      // 删除此条信息
      handleDelete(index, row) {
        this.dialogVisible = true;
        this.deleteIndex = index;
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
      },
      // 翻页事件
      handleCurrentChange(val) {
      this.currentPage = val;
      console.log(`当前页: ${val}`);
      getUserList().then((response) => {
              this.tableData = [];
              var _data = response.data.data.list;
              this.datalength = _data.length
              for(var i = 10*(val-1);i<10*val;i++){
              this.tableData.push(_data[i])
              }
          })
          .catch(function(response){
              console.log(response)
          })
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
        this.loading = true;
        getUserList().then((response) => {
            setTimeout(() => {
              this.loading = false;
            }, 1000);
            console.log(response);
            this.tableData=[];
            var _data = response.data.data.list;
            this.datalength = _data.length
            var beginpage = this.datalength<10?this.datalength:10
            for(var i = 0;i<beginpage;i++){
            this.tableData.push(_data[i])
          }
            console.log(this.tableData)  
        })
        .catch(function(response){
            console.log(response)
        })
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
    height: 85%
  }
  .block .el-button{
    float: left;
    margin-left: 20px;
  }
  .block .el-pagination{
    float: right;
  }
  .searchAndSet{
    height: 60px;
  }
  .searchAndSet .el-input{
    display: inline-block;
    width: 200px;
    padding-left:20px; 
  }
  .searchAndSet .el-input__inner{
    width: 100%;
  }
  .addForm .el-form-item__content{
    margin-left: 60px;
  }
  .addForm .el-form-item__label{
    width: 60px;
    text-align: right;
  }
</style>