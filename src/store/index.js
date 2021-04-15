import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:''
  },
  mutations: {
    setToken(state,token) {
      state.token=token
    }
  },
  actions: {
    login(ctx, params) {
       return new Promise((resolve, reject) => {
         api.user.login(params).then(res => {
          console.log(res.data)
          if (res.data.meta.status == 200) {
            ctx.commit('setToken', res.data.data.token)
            resolve(res.data.meta)
          } else {
            resolve(res.data.meta)
          }
        }).catch(error => {
        reject(error)
        })
      })
    }
  },
  modules: {
  }
})
