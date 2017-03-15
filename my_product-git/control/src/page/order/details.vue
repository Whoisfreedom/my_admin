<template>
	<div class="right-out">
		<el-breadcrumb separator="/">
		  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
		  <el-breadcrumb-item :to="{ path: '/order' }">订单</el-breadcrumb-item>
		  <el-breadcrumb-item>订单商品统计(明细)</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="router-body">
		</div>
	</div>
</template>