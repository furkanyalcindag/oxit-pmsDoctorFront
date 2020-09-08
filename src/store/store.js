import Vue from 'vue'
import Vuex from 'vuex'
import deneme from '@/services/UserService'
Vue.use(Vuex)

const state = {
  sidebarShow: 'responsive',
  sidebarMinimize: false
}

const mutations = {
  toggleSidebarDesktop (state) {
    const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarOpened ? false : 'responsive'
  },
  toggleSidebarMobile (state) {
    const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarClosed ? true : 'responsive'
  },
  set (state, [variable, value]) {
    state[variable] = value
  },
  setUsers (state,users){
    state.users=users;
  },
  getUsers (state){
    return state.users;
  }

}
const actions = {

  authentication(){
      deneme.authentication();
    },

}
export default new Vuex.Store({
  state,
  mutations,
  actions
})