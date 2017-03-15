<template>
	<div class="right-out">
  <!-- 表格数据 -->
		<el-breadcrumb separator="/">
		  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
		  <el-breadcrumb-item :to="{ path: '/order' }">订单</el-breadcrumb-item>
		  <el-breadcrumb-item>出库/发货记录</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="router-body">
			<el-table
			    :data="tableData"
			    border
			    style="width: 100%">
			    <el-table-column
			      label="日期"
			      width="150">
			      <template scope="scope">
			        <el-icon name="time"></el-icon>
			        <span style="margin-left: 10px">{{ scope.row.date }}</span>
			      </template>
			    </el-table-column>
			    <el-table-column
			      label="名称"
			      width="120">
			      <template scope="scope">
			          <div slot="reference" class="name-wrapper">
			            <el-tag>{{ scope.row.name }}</el-tag>
			          </div>
			      </template>
			    </el-table-column>
			    <el-table-column
			      label="数量"
			      width="120">
			      <template scope="scope">
			        <span style="margin-left: 10px">{{ scope.row.number }}</span>
			      </template>
			    </el-table-column>
			    <el-table-column
			      label="地址"
			      width="180">
			      <template scope="scope">
			        <span style="margin-left: 10px">{{ scope.row.address }}</span>
			      </template>
			    </el-table-column>
			    <el-table-column
			      label="颜色"
			      width="120">
			      <template scope="scope">
			        <span style="margin-left: 10px">{{ scope.row.color }}</span>
			      </template>
			    </el-table-column>
			    <el-table-column
			      label="价格"
			      width="120">
			      <template scope="scope">
			        <span style="margin-left: 10px">{{ scope.row.price }}</span>
			      </template>
			    </el-table-column>
			    <el-table-column label="操作">
			      <template scope="scope" style="text-align:center">
			        <el-button
			          size="small"
			          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
			        <el-button
			          size="small"
			          type="danger"
			          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
			      </template>
			    </el-table-column>
			  </el-table>
      <!-- 分页选择器 -->
		  <template>
			  <div class="block">
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
		  </template>
      <!-- 弹出对话框 -->
      <el-dialog title="提示" v-model="dialogVisible" size="tiny">
        <span>确定要删除吗</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="selectsure(index)">确 定</el-button>
        </span>
      </el-dialog>
		</div>
	</div>
</template>
<script type="text/javascript">
  export default {
    dialogVisible :false,
    tableData: [],
    datalength: 0,
    nowpage: 1,
    deleteIndex : -1,
    data() {
      return {
        dialogVisible :false,
        nowpage: 1,
        datalength: 0,
        pagesize:10,
        tableData: [],
        delectIndex : -1
      }
    },
    mounted:function(){
      console.log(111);
      this.getCustomers();
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        this.dialogVisible = true;
        this.deleteIndex = index;
      },
      selectsure(index){
        this.tableData.splice(index,1);
        this.dialogVisible = false;
      },
	    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        console.log(`当前页: ${val}`);
        this.$http.get('./data/recording')
                      .then((response) => {
                          this.tableData = [];
                          var _data = response.body.data.list;
                          this.datalength = _data.length
                          for(var i = 10*(val-1);i<10*val;i++){
                          this.tableData.push(_data[i])
                          }
                      })
                      .catch(function(response){
                          console.log(response)
                      })
      },
      getCustomers(){
        this.$http.get('./data/recording')
                      .then((response) => {
                          var _data = response.body.data.list;
                          this.datalength = _data.length
                          var beginpage = this.datalength<10?this.datalength:10
                          for(var i = 0;i<beginpage;i++)
                          this.tableData.push(_data[i])
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
</style>