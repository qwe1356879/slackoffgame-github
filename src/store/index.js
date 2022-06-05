
import {
  createStore
} from "vuex";
import userinfo from "../assets/config/userinfo";
import {
  createJob,
  getDIVsize
} from '../assets/config/monsterconfig'

// import Base64 from './tool/fakebase64'
import Base64 from '../assets/tool/fakebase64'
//创建状态
let myDate = new Date();
let str = myDate.toTimeString(); //"10:55:24 GMT+0800 (中国标准时间)"
let timeStr = str.substring(0, 8);
var base = new Base64();
// var userjmdata = base.encode(JSON.stringify(userinfo))

// // console.log('jm',jm)

// var jm2 = base.decode(userjmdata)
// console.log('jm2',JSON.parse(jm2))

const state = {
  userinfo: {},
  showfight: false,
  sysinfolist: [{
      sys: '系统',
      time: timeStr,
      text: '欢迎来到BraveGame,点击地图上的任务列表就可挑战副本,副本难度越高掉落的装备越稀有',
      color: '#f90202',
      ifequipment: false,
      equipmentinfo: {}
    },
    {
      sys: '系统',
      time: '',
      time: timeStr,
      text: '在游戏中遇到的BUG可在底部意见反馈中进行反馈',
      color: '#f90202',
      ifequipment: false,
      equipmentinfo: {}
    },
  ],
  joblist: [],
  refreshjobtime: 5,
  timerHp:null,
  showBag: false,

}
//创建actions
const actions = {}
//创建mutataions
const mutations = {

  loaduserdata(state) {
    let data = localStorage.getItem('userdata')
    let myDate = new Date();
    let str = myDate.toTimeString(); //"10:55:24 GMT+0800 (中国标准时间)"
    let timeStr = str.substring(0, 8);
    if (data == null || data == undefined) {
      let data = base.encode(JSON.stringify(userinfo))
      localStorage.setItem('userdata', data)
      state.userinfo = JSON.parse(base.decode(localStorage.getItem('userdata')))
      // console.log('无存档userinfo',state.userinfo)
    } else {
      state.userinfo = JSON.parse(base.decode(localStorage.getItem('userdata'))),
        state.sysinfolist.push({
          sys: '系统',
          time: '',
          time: timeStr,
          text: '读取存档成功',
          color: '#24c4de',
          ifequipment: false,
          equipmentinfo: {}
        })
    }
  },
  changeFightState(state) {
    state.showfight = !state.showfight
  },
  addsysinfo(state, data) {
    state.sysinfolist.push(data)
  },
  createjoblist(state, data) {
    state.joblist = createJob(7, store.state.userinfo.Lv, data.height, data.width)
  },
  deleteupjob(state, data) {
    for (let i = 0; i < state.joblist.length; i++) {
      if (state.joblist[i].jobid == data.jobid) {
        state.joblist.splice(i, 1)
      }
    }
  },
  addrefeshtime(state) {
    let timer = setInterval(() => {
      state.refreshjobtime -= 1;
      let myDate = new Date();
      let str = myDate.toTimeString(); //"10:55:24 GMT+0800 (中国标准时间)"
      let timeStr = str.substring(0, 8);
      let obj = {
        sys: '系统',
        time: '',
        time: timeStr,
        text: `任务刷新CD中,剩余${state.refreshjobtime}秒`,
        color: '#f90202',
        ifequipment: false,
        equipmentinfo: {}
      }
      state.sysinfolist.push(obj)
      if (state.refreshjobtime <= 1) {
        state.refreshjobtime = 5
        clearInterval(timer)
      }
    }, 1000)
  },
  clearallsysinfo(state) {
    state.sysinfolist = []
    let myDate = new Date();
    let str = myDate.toTimeString(); //"10:55:24 GMT+0800 (中国标准时间)"
    let timeStr = str.substring(0, 8);
    let obj = {
      sys: '系统',
      time: '',
      time: timeStr,
      text: `系统消息已清空`,
      color: '#67C23A',
      ifequipment: false,
      equipmentinfo: {}
    }
    state.sysinfolist.push(obj)
  },
  //人物回血机制
 userrecoverhp(state,data){
  clearInterval(state.timerHp)
  state.timerHp= setInterval(() => {
    state.userinfo.NowHp += Math.round(state.userinfo.MaxHp*data);
    if (state.userinfo.NowHp >= state.userinfo.MaxHp){
      state.userinfo.NowHp =state.userinfo.MaxHp
      clearInterval(state.timerHp)
    }
  }, 1000)

 },
    changeShowBag(state){
        state.showBag = !state.showBag;
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