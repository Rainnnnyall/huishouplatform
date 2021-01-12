import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import permission from './modules/permission'
import tagsView from './modules/tagsView'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    login: [{
      username: 'admin',
      password: '123456',
      id: 1
    },
    {
      username: 'recyclrer',
      password: '123456',
      id: 2
    },
    {
      username: 'user',
      password: '123456',
      id: 3
    }]
  },
  modules: {
    app,
    settings,
    user,
    permission,
    tagsView
  },
  mutations:{
    newPassword(state,obj){
      console.log(state,obj,'传递数据')
      var arr=store.state.login
      console.log(store.state.login,'vuex数据')
      for(var i in arr){
        if(arr[i].username==obj.username){
          arr[i].password=obj.password
        }
      }
    }
  },
  getters
})

export default store
