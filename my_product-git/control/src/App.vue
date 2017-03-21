<template>
<div id="app">
<!-- 头部导航 -->
    <header class="header">
        <el-row>
            <el-col :span="24">
              <el-menu default-active="5" class="el-menu-demo" mode="horizontal" @select="">
                <el-col :span="4">
                <router-link to="/">
                  <img style="height:60px;float:left" src="./assets/logo_home.png" alt="">
                </router-link>
                </el-col>
                <el-col :span="4" class="header-right">
                <div class="down">
                  <el-submenu index="2">
                      <template slot="title">11..12<i style="padding-left:3px" class="fa fa-user-circle-o fa-lg"></i></template>
                      <el-menu-item index="2-1"><i style="padding-right:15px" class="fa fa-user-o fa-lg"></i> 账号助手</el-menu-item>
                      <el-menu-item index="2-2"><i style="padding-right:10px" class="fa fa-vcard fa-lg"></i> 账号信息</el-menu-item>
                      <el-menu-item index="2-3"><i style="padding-right:10px" class="fa fa-diamond fa-lg"></i> 服务购买</el-menu-item>
                      <el-menu-item index="2-4"><i style="padding-right:14px" class="fa fa-sign-out fa-lg"></i> 退出</el-menu-item>
                    </el-submenu>
                </div>
                <div class="down">
                    <el-submenu index="3">
                      <template slot="title"><i class="fa fa-phone fa-lg"></i></template>
                      <el-menu-item index="3-1"><i style="padding-right:15px" class="fa fa-comments fa-lg"></i>在线客服</el-menu-item>
                      <el-menu-item style="height:70px" index="2-2">400-998-7255<br>7*12小时服务</el-menu-item>
                    </el-submenu>
                </div>
                <div class="down">
                  <el-submenu index="4">
                    <template slot="title"><i class="fa fa-cog fa-lg"></i></template>
                    <el-menu-item index="4-1">公司信息</el-menu-item>
                    <el-menu-item index="4-2">部门与员工</el-menu-item>
                    <el-menu-item index="4-3">系统参数设置</el-menu-item>
                    <el-menu-item index="4-4">订单处理流程设置</el-menu-item>
                    <el-menu-item index="4-5">操作日志</el-menu-item>
                  </el-submenu>
                </div>
                <div class="down">
                  <el-menu-item style="padding: 0 40px" index="5">
                  <el-badge :value="1" class="item">
                    <i style="color:#48576a" class="fa fa-bell fa-lg"></i>
                  </el-badge>
                  </el-menu-item>
                </div>
                </el-col>
              </el-menu>
            </el-col>
        </el-row>
  </header>
  <div class="header-after"style="position: relative;height: 20px;width: 100%;"></div>
  <div class="main">
     <el-col class="left-nav" :span="2">
        <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
          <el-menu-item class="nav-list" index="1">
            <div class="second-list-nav">
              <ul class="second-menu-item">
                <li><span>订单管理</span></li>
                <li><router-link to="/order/orderForm">订货单</router-link></li>
                <li><router-link to="/order/returnForm">退货单</router-link></li>
              </ul>
              <ul class="second-menu-item">
                <li><span>订单统计</span></li>
                <li><router-link to="/order/recording">出库/发货记录</router-link></li>
                <li><router-link to="/order/details">订单商品统计(明细)</router-link></li>
                <li><router-link to="/order/client">订单商品统计(按客户)</router-link></li>
                <li><router-link to="/order/products">订单商品统计(按商品)</router-link></li>
                <li><router-link to="/order/shipping">发货统计</router-link></li>
              </ul>
            </div>
            <router-link to="/order"><i style="padding-right:15px" class="fa fa-file-text-o fa-lg"></i>订单</router-link>
          </el-menu-item>
          <el-menu-item class="nav-list" index="2">
            <div class="second-list-nav">
              <ul class="second-menu-item">
                <li><span>商品管理</span></li>
                <li><router-link to="/commodity/list">商品列表</router-link></li>
              </ul>
              <ul class="second-menu-item">
                <li><span>库存管理</span></li>
                <li><router-link to="/commodity/sum">商品库存</router-link></li>
                <li><router-link to="/commodity/enter">商品入库</router-link></li>
                <li><router-link to="/commodity/out">商品出库</router-link></li>
                <li><router-link to="/commodity/sumList">库存盘点</router-link></li>
                <li><router-link to="/commodity/enterOut">出入库明细</router-link></li>
                <li><router-link to="/commodity/sumsar">商品收发汇总</router-link></li>
                <li><router-link to="/commodity/cost">成本调整</router-link></li>
                <li><router-link to="/commodity/carryOver">期末结转</router-link></li>
              </ul>
              <ul class="second-menu-item">
                <li><span>库存管理</span></li>
                <li><router-link to="/commodity/purchaseList">供应商列表</router-link></li>
                <li><router-link to="/commodity/supplier">采购订单</router-link></li>
                <li><router-link to="/commodity/waitEnter">采购待入库</router-link></li>
              </ul>
            </div>
            <router-link to="/commodity"><i style="padding-right:13px" class="fa fa-shopping-bag fa-lg"></i>商品</router-link>
          </el-menu-item>
          <el-menu-item class="nav-list" index="3">
            <div class="second-list-nav">
              <ul class="second-menu-item">
                <li></i><router-link to="/client/clientList">客户列表</router-link></li>
                <li></i><router-link to="/client/joinInfo">加盟信息</router-link></li>
                <li></i><router-link to="/client/clientReq">客户反馈</router-link></li>
              </ul>
            </div>
            <router-link to="/client"><i style="padding-right:12px" class="fa fa-users fa-lg"></i>客户</router-link>
          </el-menu-item>
          <el-menu-item class="nav-list" index="4">
           <div class="second-list-nav">
            <ul class="second-menu-item">
              <li><span>资金管理</span></li>
              <li>收款确认</li>
              <li>资金账户</li>
              <li>收款账户</li>
            </ul>
             <ul class="second-menu-item">
                <li><span>资金统计</span></li>
                <li>收支明细</li>
                <li>订单收款统计</li>
              </ul>
           </div>  
           <i style="padding-right:15px" class="fa fa-database fa-lg"></i>资金
          </el-menu-item>
          <el-menu-item class="nav-list" index="5">
            <div class="second-list-nav">
              <ul class="second-menu-item">
                <li><span>通知发布</span></li>
                <li>广告发布</li>
                <li>通知公告</li>
                <li>短信充值</li>
                <li>短息设置</li>
              </ul>
              <ul class="second-menu-item">
                <li><span>促销管理</span></li>
                <li>商品促销</li>
                <li>订单促销</li>
                <li>组合促销</li>
              </ul>
              <ul class="second-menu-item">
                <li><span>营销工具</span></li>
                <li>秒杀管理</li>
                <li>大转盘</li>
              </ul>
            </div>
           <i style="padding-right:7px" class="fa fa-cubes fa-lg"></i>营销
          </el-menu-item>
          <el-menu-item class="nav-list" index="6">
            <div class="second-list-nav">
              <ul class="second-menu-item">
                <li>订单统计报表</li>
                <li>地区统计报表</li>
                <li>商品销售报表</li>
                <li>客户订货报表</li>
                <li>销售毛利统计报表</li>
              </ul>
            </div>
            <i style="padding-right:12px" class="fa fa-pie-chart fa-lg"></i>报表
          </el-menu-item>
          <el-menu-item class="nav-list" index="6">
            <i style="padding-right:10px" class="fa fa-coffee fa-lg"></i>应用中心
          </el-menu-item>
        </el-menu>
        <div class="down-logo"><img src="./assets/logo_home.png" alt=""></div>
      </el-col>
      <div class="main-right">
        <!-- 视图 -->
        <router-view class="view"></router-view>
      </div>
  </div>
</div>
</template>

<script>
import Vue from 'vue'
import Element from 'element-ui'


Vue.use(Element)
export default {
  name: 'app',
  methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>

<style type="text/css">
body{margin: 0;}
#app {
min-width: 1300px;
min-height: 768px;
margin: 0 auto;
height: 100%; 
font-family: "Helvetica Neue","PingFang SC",Arial,sans-serif;
background-color: #cdd9e6;
}
/* 头部导航 */
header{
  z-index: 1000;
  min-width: 1300px;
  transition: all 0.5s ease;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.12),0 0 6px 0 rgba(0,0,0,.04);  
}
header.header-fixed{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
header .el-menu-demo{
  padding-left: 20px!important;
}
header .header-right{
  float: right;
  min-width: 400px;
}
header .down{
  position: relative;
}
.main{
  height: calc(100% - 80px)
}
.main .main-right{
  width: 87%;
  height: 100%;
  margin-left: 12.3%;
}
.main .left-nav{
  margin-left:2%;
  height: 100%;
  position:relative;
}
.main .left-nav ul{
  height: 100%;
}
.left-nav>ul>li>a{
  color:#48576a;
  text-decoration: none;
  display: block;
  width: 100%;
  height: 100%;
}
.left-nav .nav-list{
  position: relative;
}
.left-nav .nav-list:hover .second-list-nav{
  display: table;
}
.second-list-nav{
  position: absolute;
  left: 100%;
  background-color: #ffffff;
  overflow: hidden;
  padding: 20px 0;
  white-space: nowrap;
  z-index: 1000;
  box-shadow: 1px 0px 5px #888888;
  display: none;
}
.second-list-nav ul{
  padding:0 30px;
  line-height: 30px;
  height: 100%;
  border-right: 1px solid #eef1f9;
  font-size: 12px;
  box-sizing: border-box;
  display: table-cell;
}
.main .left-nav .down-logo{
  position: absolute;
  bottom: 100px;
  left: 10px;
}
.second-list-nav ul li{
  color:#576b7e;
}
.second-list-nav ul li a{
  color:#576b7e;
  text-decoration: none;
  display: block;
  width: 100%;
  height: 100%;
}

.second-list-nav ul li a:hover{
  color:#00c29f;
}
.second-list-nav ul li span{
  color: #b1b9c6;
  cursor: default;
}
.main .left-nav .down-logo img{
  width: 90px;
  height: auto;
}
.el-badge__content.is-fixed{
  top: 20px!important;
}
.main .main-right .view{
  height: 100%;
}
.view .right-out{
  height: 100%;
}
.el-breadcrumb{
  height: 30px;
}
.router-body{
    height:calc(100% - 30px);
    background-color: #ffffff;
    padding-top: 10px;
    box-sizing: border-box;
  }
.el-form-item__content:after{
  display: none!important;
}
.el-form-item:after{
  display: none!important;
}
.line{
  text-align: center;
}
.el-form{
  width: 70%;
  padding-top: 20px;
}
</style>
