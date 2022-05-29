import { createStore } from "vuex";
import userinfo from "../assets/config/userinfo";
//创建状态
const state = {
  userinfo:userinfo
}
//创建actions
const actions = {

}
//创建mutataions
const mutations = {
 
}

//创建store
const store = createStore({
state,
actions,
mutations
})
//暴露出去
export default store
