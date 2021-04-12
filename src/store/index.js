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
    async login(ctx) {
      let {data:res} =await api.user.login({
        username: "admin",
        password: "123456",
      });
      if (res.meta.status == 200) {
        ctx.commit('setToken',res.data.token)
      }
    },
  },
  modules: {
  }
})
