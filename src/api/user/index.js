import base from '../base'; // 导入接口域名列表
import axios from '@/request/http'; // 导入http中创建的axios实例
import qs from 'qs'

const user = {    
    // 用户列表    
    userList (params) {        
        return axios.get(`${base.sq}/users`, {
            params: params
        });    
    },    
    // 用户详情,演示    
    userDetail (id) {        
        return axios.get(`${base.sq}/users/${id}`);    
    },
    updateUserDetail (id,params) {        
        return axios.put(`${base.sq}/users/${id}`,(params));    
    },
    addUser(params) {
        return axios.post(`${base.sq}/users`,(params));    
    },
    // post提交    
    login (params) {        
        return axios.post(`${base.sq}/login`,(params));    
    },
    deleteUser(id) {
        return axios.delete(`${base.sq}/users/${id}`);
    }
   
}

export default user;