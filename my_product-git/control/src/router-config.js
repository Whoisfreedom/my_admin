//order' router
import order from './page/order/index.vue'
import client from './page/order/client.vue'
import details from './page/order/details.vue'
import orderForm from './page/order/orderForm.vue'
import products from './page/order/products.vue'
import recording from './page/order/recording.vue'
import returnForm from './page/order/returnForm.vue'
import shipping from './page/order/shippingStatistics.vue'
//commodity'router
import commodity from './page/commodity/index.vue'
import carryOver from './page/commodity/carryOver.vue'
import cost from './page/commodity/cost.vue'
import enter from './page/commodity/enter.vue'
import enterOut from './page/commodity/enterOut.vue'
import list from './page/commodity/list.vue'
import out from './page/commodity/out.vue'
import purchaseList from './page/commodity/purchaseList.vue'
import sum from './page/commodity/sum.vue'
import sumList from './page/commodity/sumList.vue'
import sumsar from './page/commodity/sumSendAndReceive.vue'
import supplier from './page/commodity/supplier.vue'
import waitEnter from './page/commodity/waitEnter.vue'
//client'router
import clientinfo from './page/client/index.vue'
import clientList from './page/client/clientList.vue'
import clientReq from './page/client/clientReq.vue'
import joinInfo from './page/client/joinInfo.vue'
//home router
import home from './page/firstPage/index.vue'
import NotPage from './page/NotPage/404.vue'
export default [
  	{
  		  path:"/",redirect:'/home',
  	},
  	{
        path:'/home', component:home,
  	},
  	{
        path:'/order', component:order,
        children:
        [
        {
          path:'/',redirect:'orderForm',
        },
        {
          path:'client',component:client,
        },
        {
          path:'details',component:details,
        },
        {
          path:'orderForm',component:orderForm,
        },
        {
          path:'products',component:products,
        },
        {
          path:'recording',component:recording,
        },
        {
          path:'returnForm',component:returnForm,
        },
        {
          path:'shipping',component:shipping,
        }
        ]
  	},
    {
        path:'/commodity', component:commodity,
        children:
        [
        {
          path:'/',redirect:'list',
        },
        {
          path:'list',component:list,
        },
        {
          path:'out',component:out,
        },
        {
          path:'carryOver',component:carryOver,
        },
        {
          path:'cost',component:cost,
        },
        {
          path:'enter',component:enter,
        },
        {
          path:'enterOut',component:enterOut,
        },
        {
          path:'purchaseList',component:purchaseList,
        },
        {
          path:'sum',component:sum,
        },
        {
          path:'sumList',component:sumList,
        },
        {
          path:'sumsar',component:sumsar,
        },
        {
          path:'supplier',component:supplier,
        },
        {
          path:'waitEnter',component:waitEnter,
        },
        ]
    },
    {
        path:'/client', component:clientinfo,
        children:
        [
        {
          path:'/',redirect:'clientList',
        },
        {
          path:'clientList',component:clientList,
        },
        {
          path:'clientReq',component:clientReq,
        },
        {
          path:'joinInfo',component:joinInfo,
        }
        ]
    },
    {path: '*', component: NotPage}   
]