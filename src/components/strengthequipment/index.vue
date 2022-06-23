<template>
  <div class="box">
    <div class="box-title">
      <p>强化装备</p>
      <div class="close-btn">
        <img src="/icons/close.png" @click="closestr" />
      </div>
    </div>

    <div class="box-info">
      <el-tooltip placement="bottom">
        <template #content>
          * 强化装备有一定的成功率
          <br />
          * 装备强化成功会加一定的基础属性
          <br />
          * +10以下的装备强化失败会降级
          <br />
          * +10以上的装备强化失败有一定的机率损毁
        </template>
        <p>强化说明</p>
      </el-tooltip>
    </div>

    <div class="box-img" v-if="itemstate">
      <div class="img" :style="{ 'box-shadow': item.color }">
        <img :src="`/icons/myequip/${item.imgadd}/${item.imgurl}.png`" />
      </div>
      <div class="name">
        <span :style="{ color: item.fontcolor }">{{ item.name }}</span>
      </div>
    </div>

    <div v-else class="box-choose">
      <el-popover
        :width="250"
        popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; height:300px;overflow-y:scroll"
        trigger="click"
      >
        <template #reference>
          <img src="/icons/othericons/add.svg" />
        </template>
        <template #default>
          <div class="inner-box" style="display: flex; flex-direction: column">
            <div
              v-if="store.state.userinfo.bag.length <= 0"
              style="text-align: center"
            >
              <span>暂无装备可选</span>
            </div>
            <div
              class="item-area"
              v-for="i in store.state.userinfo.bag"
              v-else
              @click="chooseitem(i)"
            >
              <div class="img-list">
                <img :src="`/icons/myequip/${i.imgadd}/${i.imgurl}.png`" />
              </div>
              <div class="name-list">
                <span :style="{ color: i.fontcolor }">{{ i.name }}</span>
              </div>
            </div>
          </div>
        </template>
      </el-popover>
    </div>

    <div class="box-entry" v-if="itemstate">
      <div class="old">
        <p v-for="y in item.dmglist">
          <span v-for="(key, val) in y">{{ val }}:{{ key }}</span>
        </p>
      </div>
      <div class="arror">➡</div>
      <div class="new">
        <p v-for="y in item.dmglist">
          <span v-for="(key, val) in y">{{ val }}:{{ key }}</span>
        </p>
      </div>
    </div>

    <div class="box-money" v-if="itemstate">
      <p class="success">
        成功率:<span>{{ success }}%</span>
      </p>
      <p>需要金币:{{needGold}}</p>
      <div class="box-btn">
        <el-button @click="strartstr" >开始强化</el-button>
        <el-button @click="resetchoose">重新选择</el-button>
      </div>
    </div>

    <div class="box-auto" v-if="itemstate">
      <el-tooltip placement="bottom">
        <template #content>
          * 自动强化消耗的金币是普通强化的2倍
          <br />
          * 当金币不足时自动停止强化
          <br />
          * 自动强化会自动强化到下一级
        </template>
        <el-button>自动强化</el-button>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useStore } from "vuex";
import { justIsSuccess, successList } from "../../assets/config/strength";
import { ElNotification } from "element-plus";
import { rand } from "@vueuse/core";
function random(lower, upper) {
    return Math.floor(Math.random() * (upper - lower + 1)) + lower;
}
export default {
  setup() {
    const state = reactive({
      item: {},
      itemstate: false,
      bagitem: {},
      success: 0,
      needGold:0
    });

    const store = useStore();

    function closestr() {
      store.commit("changeShowStrength");
    }
    function findbagitem(){
        for(let x =0; x<store.state.userinfo.bag.length;x++){
            if(state.item.id==store.state.userinfo.bag[x].id){
                store.state.userinfo.bag[x]=state.item
            }
           
        }
        store.commit('saveuserdata')
    }
    function chooseitem(item) {
      state.itemstate = true;
      state.item = item;
      if (item.hasOwnProperty("strengthlv")) {
        for (let i = 0; i < successList.length; i++) {
          if (item.strengthlv + 1 == successList[i].lv) {
            state.success = successList[i].lower;
          }
        }
        state.needGold=item.quality*(state.item.strengthlv+1)*12
      } else {
        state.item.strengthlv = 0;
        state.needGold= state.item.quality*(state.item.strengthlv+1)*12
        state.success = successList[0].lower;
        findbagitem()
      }
    }
    function resetchoose() {
      state.itemstate = false;
      state.item = {};
    }
    function strartstr() {
    if(state.needGold<=store.state.userinfo.Gold){
        let obj = justIsSuccess(state.item.strengthlv);
        store.commit('dealusergold',state.needGold)
      if (obj.obj.lv == 1) {
        if (obj.result == true) {
             ElNotification({
          title: "系统提示",
          type: "success",
          duration: 1500,
          message: "强化成功",
        });
          state.item.strengthlv += 1;
          for (let i = 0; i < successList.length; i++) {
            if (state.item.strengthlv + 1 == successList[i].lv) {
              state.success = successList[i].lower;
            }
          }
        for(let j=0;j<state.item.dmglist.length;j++){
            for(let y in state.item.dmglist[j]){
               let r = Math.round(Number(state.item.dmglist[j][y])+Number(state.item.dmglist[j][y])*1)
               state.item.dmglist[j][y] = "+"+r
            }
        }
        state.item.name = state.item.name + "+" + state.item.strengthlv;
        state.needGold= state.item.quality*(state.item.strengthlv+1)*12
        findbagitem()
        } 
      } else {
        if (obj.result == true) {
           ElNotification({
          title: "系统提示",
          type: "success",
          duration: 1500,
          message: "强化成功",
        });
          state.item.strengthlv += 1;
          
          for (let i = 0; i < successList.length; i++) {
            if (state.item.strengthlv + 1 == successList[i].lv) {
              state.success = successList[i].lower;
            }
          }
           for(let j=0;j<state.item.dmglist.length;j++){
            for(let y in state.item.dmglist[j]){
                 
                let r = Math.round(Number(state.item.dmglist[j][y])+Number(state.item.dmglist[j][y])*1)
               state.item.dmglist[j][y] = "+"+r
            }
        }
          let str = state.item.strengthlv - 1;
          let x = state.item.name.replace(str, state.item.strengthlv);
          state.item.name = x;
             state.needGold= state.item.quality*(state.item.strengthlv+1)*12
             findbagitem()
        } else {
          if (state.item.strengthlv <= 10) {
            state.item.strengthlv -= 1;
            for (let i = 0; i < successList.length; i++) {
              if (state.item.strengthlv + 1 == successList[i].lv) {
                state.success = successList[i].lower;
              }
            }
             for(let j=0;j<state.item.dmglist.length;j++){
            for(let y in state.item.dmglist[j]){
                
                let r = Math.round(Number(state.item.dmglist[j][y])-Number(state.item.dmglist[j][y])*0.5)
               state.item.dmglist[j][y] = "+"+r
            }
        }
            if (state.item.strengthlv == 0) {
              let str = state.item.strengthlv + 1;
              let x = state.item.name.replace("+" + str, "");
              state.item.name = x;
            } else {
              let str = state.item.strengthlv + 1;
              let x = state.item.name.replace(str, state.item.strengthlv);
              state.item.name = x;
            }
               state.needGold= state.item.quality*(state.item.strengthlv)*12
             ElNotification({
          title: "系统提示",
          type: "error",
          duration: 1500,
          message: "强化失败",
        });
        findbagitem()
          } else {
            console.log("装备损毁机制");
          }
        }
      }
        }else{
              ElNotification({
          title: "系统提示",
          type: "error",
          duration: 1500,
          message: "金币不足,无法强化",
        });
        }
      
    }
    return {
      store,
      closestr,
      chooseitem,
      resetchoose,
      strartstr,
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped>
.box {
  width: 374px;
  box-shadow: 0 0 5px 5px rgb(0 0 0 / 70%);
  background: rgba(0, 0, 0, 0.7);
  border: 2px solid #fff;
  border-radius: 6px;
  color: #fff;
  position: absolute;
  top: 30%;
  left: 35%;
  z-index: 9;
}
.box-title {
  text-align: center;

  font-size: 18px;
  padding: 0.2rem;
  border-bottom: 1px solid #ccc;
}
.box-info {
  text-align: center;
  padding: 0.4rem;
  font-size: 15px;
}
.box-img {
  margin: 0 auto;
  display: flex;
  width: 60%;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.4rem;
}
.box-choose {
  margin: 0 auto;
  box-shadow: rgb(255, 255, 255) 0px 0px 7px 2px inset;
  width: 48px;
  height: 48px;
  border-radius: 6px;
  margin-bottom: 0.8rem;
}
.box-choose img {
  margin: 6px 6px;
}
.box-choose img:hover {
  cursor: pointer;
}
.img {
  // width: 30%;
  width: 52px;
  height: 52px;
  border-radius: 6px;
  margin: 0 auto;
}
.img img {
  width: 46px;
  height: 46px;
  margin: 3px 3px;
}
.name {
  width: 70%;
  text-indent: 12px;
}
.box-entry {
  width: 80%;
  margin: 0 auto;
  display: flex;
  padding: 1.3rem;
  justify-content: space-around;
  align-items: center;
}
.old {
  width: 45%;
}
.arror {
  width: 20%;
}

.new {
  width: 35%;
}
.new span {
  color: #2fe20f;
}
.box-money {
  padding-bottom: 0.4rem;
  text-align: center;
}
.box-money p {
  padding-bottom: 0.4rem;
}
.box-money:deep(.el-button) {
  background-color: #000;
  color: #fff;
}
.success span {
  color: #2fe20f;
}
.box-auto {
  text-align: center;
  padding-bottom: 0.6rem;
  padding-top: 0.6rem;
  border-top: 1px solid #ccc;
}
.box-auto:deep(.el-button) {
  background-color: #000;
  color: #fff;
}
.close-btn {
  position: absolute;
  top: 3px;
  left: 345px;
}
.close-btn img {
  width: 24px;
  height: 24px;
}
.close-btn img:hover {
  cursor: pointer;
}
.item-area {
  display: flex;
  align-items: center;
}
.item-area:hover {
  cursor: pointer;
  background-color: rgba(204, 204, 204, 0.336);
}

.img-list img {
  width: 42px;
  height: 42px;
  border-radius: 6px;
}
.name-list {
  text-indent: 12px;
}
</style>
