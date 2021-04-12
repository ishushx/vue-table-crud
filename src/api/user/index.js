import base from '../base'; // 导入接口域名列表
import axios from '@/request/http'; // 导入http中创建的axios实例
import qs from 'qs'

const user = {    
    // 用户列表    
    userList () {        
        return axios.get(`${base.sq}/topics`);    
    },    
    // 用户详情,演示    
    userDetail (id, params) {        
        return axios.get(`${base.sq}/topic/${id}`, {            
            params: params        
        });    
    },
    // post提交    
    login (params) {        
        return axios.post(`${base.sq}/login`,(params));    
    }
   
}

export default user;