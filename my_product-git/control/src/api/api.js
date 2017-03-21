import axios from 'axios';

let base = '';
let getHttp="http://192.168.2.108:8080/router?sign=FDD605381EF1400AD288248CC203D31E92825355&locale=zh_CN&appKey=grandview_rop&version=1.0&sign_method=rop&partner_id=top-sdk-java-20131225&format=json";
let header = {
	'content-type': 'application/json;charset=utf-8'
}
export const methodsList = {
	getUser:"com.aquilaflycloud.busi.example.user.page",
	addUser:"com.aquilaflycloud.busi.example.add.user",
	changeUser:"com.aquilaflycloud.busi.example.update.user",
	deleteUser:"com.aquilaflycloud.busi.example.delete.user"
}

export const getUserList = (data) => {return axios.post(getHttp, data,{headers:header}); };

export const addUserInfo = (data) => {return axios.get(getHttp, data,{headers:header}); };

export const changeUserInfo = (data) => {return axios.get(getHttp, data,{headers:header}); };

export const deleteUserInfo = (data) => {return axios.get(getHttp, data,{headers:header}); };