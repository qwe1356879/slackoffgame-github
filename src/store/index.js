import { createStore } from "vuex";

//创建状态
const state = {
  playbarShowState:false,
  playSongList:[],
  playIndex:0,
}
//创建actions
const actions = {

}
//创建mutataions
const mutations = {
  changePlayBar(state){
    state.playbarShowState=!state.playbarShowState
    console.log('now playbar state',state.playbarShowState)
  },
  addSongToList(state,data){
    console.log('push',data)
    state.playSongList.push(data)
  },
  nextSong(state){
    //0   0>=2    1   2
    //2 
    console.log('index',state.playIndex)
    console.log('length',state.playSongList.length)
    if(state.playIndex>=state.playSongList.length){
      console.log('最后一首了')
      state.playIndex=0
    }else{
      console.log('最后一首了else')
      state.playIndex+=1
    }
    
  },
  lastSong(state){
    if(state.playIndex<0){
      state.playIndex=0
    }else{
      state.playIndex-=1
    }
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
