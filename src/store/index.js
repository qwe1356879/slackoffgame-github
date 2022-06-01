import { createStore } from "vuex";
import userinfo from "../assets/config/userinfo";
//创建状态
let myDate = new Date();
let str = myDate.toTimeString(); //"10:55:24 GMT+0800 (中国标准时间)"
let timeStr = str.substring(0,8); 
const state = {
  userinfo:userinfo,
  showfight:false,
  sysinfolist:[
    {
      sys:'系统',
      
      time:timeStr,
      text:'欢迎来到BraveGame,点击地图上的任务列表就可挑战副本,副本难度越高掉落的装备越稀有',
      color:'#f90202',
      ifequipment:false,
      equipmentinfo:{}
    },
    {
      sys:'系统',
      time:'',
      time:timeStr,
      text:'在游戏中遇到的BUG可在底部意见反馈中进行反馈',
      color:'#f90202',
      ifequipment:false,
      equipmentinfo:{}
    }
  ]
}
//创建actions
const actions = {

}
//创建mutataions
const mutations = {
 changeFightState(state){
   state.showfight=!state.showfight
 },
 addsysinfo(state,data){
  state.sysinfolist.push(data)
 }
}

//创建store
const store = createStore({
state,
actions,
mutations
})
//暴露出去
export default store
