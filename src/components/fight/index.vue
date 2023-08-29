<template>
  <div ref="fightref">
    <div class="map-top">
      <div class="danger">
        <div class="monster" v-for="i in 4" :key="i">
          <img :src="`/icons/map/${state.icons.normal}.png`" />
        </div>
        <div class="monster">
          <img :src="`/icons/map/${state.icons.boss}.png`" />
        </div>
      </div>
      <div
        class="player"
        :style="{ left: playleft, 'background-position': playerposition }"
      ></div>
      <div class="progress-bar"></div>
      <div class="final-fight">
        <el-button @click="stopfight">结束挑战</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  reactive,
  toRefs,
  ref,
  computed,
  onMounted,
  onUnmounted,
  watch,
  getCurrentInstance,
} from "vue";
import { useStore } from "vuex";
import crateWeapon from "../../assets/config/weaponconfig";
import crateArmo from "../../assets/config/armoconifg";
import crateLeft from "../../assets/config/leftconfig";
import crateRight from "../../assets/config/rightconfig";
import { setTimer, clearTimer } from "../../assets/work/work";
function add() {
  var args = arguments, //获取所有的参数
    lens = args.length, //获取参数的长度
    d = 0, //定义小数位的初始长度，默认为整数，即小数位为0
    sum = 0; //定义sum来接收所有数据的和
  //循环所有的参数
  for (var key in args) {
    //遍历所有的参数
    //把数字转为字符串
    var str = "" + args[key];
    if (str.indexOf(".") != -1) {
      //判断数字是否为小数
      //获取小数位的长度
      var temp = str.split(".")[1].length;
      //比较此数的小数位与原小数位的长度，取小数位较长的存储到d中
      d = d < temp ? temp : d;
    }
  }
  //计算需要乘的数值
  var m = Math.pow(10, d);
  //遍历所有参数并相加
  for (var key in args) {
    sum += args[key] * m;
  }
  //返回结果
  return sum / m;
}
function random(lower, upper) {
  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
}
export default {
  setup() {
    const state = reactive({
      icons: {
        normal: "monster",
        boss: "boss",
        player: "player-s",
      },
      show: false,
    });
    const player = ref(null);
    let playleft = ref("0%");
    let left = ref(0);
    let playerposition = ref("0px 96px");
    let one = ref(0);
    let timer = ref(null);
    const fightref = ref(null);
    const store = useStore();
    const getShowTask = computed(() => {
      //返回的是ref对象
      return store.state.showfight;
    });
    const getShowHp = computed(() => {
      //返回的是ref对象
      return store.state.userinfo.NowHp;
    });
    watch(
      getShowTask,
      (newval, oldval) => {
        if (newval) {
          state.show = true;
          timer = setTimer(walk, 10);
        } else {
          state.show = false;
        }
      },
      { immediate: true, deep: true }
    );
    watch(
      getShowHp,
      (newval, oldval) => {
        debugger
        if (newval <= 0) {
          stopfight();
          let myDate = new Date();
          let str = myDate.toTimeString(); //
          let timeStr = str.substring(0, 8);
          store.state.userinfo.NowHp = 0;
         
          let sysinfo = {
            sys: "系统",
            time: timeStr,
            text: "挑战失败,退出副本",
            color: "#FF5511",
            ifequipment: false,
            equipmentinfo: {},
          };
          store.commit("addsysinfo", sysinfo);
        }
      },
      { immediate: true, deep: true }
    );
    function walk() {
      changeleft(0.5);
      changewalk();
    }

    function changeleft(speed) {
      let myDate = new Date();
      let str = myDate.toTimeString(); //"10:55:24 GMT+0800 (中国标准时间)"
      let timeStr = str.substring(0, 8);
      left.value = add(left.value, speed);
      if (left.value <= 100) {
        playleft.value = left.value + "%";
        if (left.value === 16) {
          if (state.show) {
            clearTimer(timer);
            fightdetail("1", 0.6);
          }
        } else if (left.value == 36) {
          if (state.show) {
            clearTimer(timer);
            fightdetail("2", 0.8);
          }
          // clearTimer(timer);
        } else if (left.value == 56) {
          if (state.show) {
            clearTimer(timer);
            fightdetail("3", 1);
          }
          // clearTimer(timer);
        } else if (left.value == 76) {
          if (state.show) {
            clearTimer(timer);
            fightdetail("4", 1.2);
          }
          // clearTimer(timer);
        } else if (left.value == 96) {
          if (state.show) {
            clearTimer(timer);
            fightdetail("5", 1.6);
          }
          // clearTimer(timer);
        }
      } else {
        clearTimer(timer);
        left.value = 0;
        playleft.value = "0%";
        if (store.state.userinfo.NowHp > 0 && store.state.repeatfight) {
          timer = setTimer(walk, 10);
        } else {
          stopfight();
        }
      }
    }
    function changewalk() {
      one.value += 32;
      if (one.value > 100) {
        one.value = 0;
        playerposition.value = "0px 96px";
      } else {
        playerposition.value = one.value + "px" + " " + "96px";
      }
    }
    //monster = 第几个怪物  string
    //detail  受到伤害系数
    function fightdetail(monster, detail) {
      let myDate = new Date();
      let str = myDate.toTimeString(); //"10:55:24 GMT+0800 (中国标准时间)"
      let timeStr = str.substring(0, 8);

      let sysinfo = {
        sys: "系统",
        time: timeStr,
        text: `遭遇怪物${monster},开始战斗!`,
        color: "#ffffff",
        ifequipment: false,
        equipmentinfo: {},
      };
      store.commit("addsysinfo", sysinfo);
      let t = setTimeout(() => {
        let dmg = 0;
        if (store.state.userinfo.DPS < store.state.nowjobinfo.dpsneed) {
          dmg = Math.round(store.state.nowjobinfo.dpsneed * (detail + 0.2));
        } else {
          dmg =
            Math.round(store.state.nowjobinfo.dpsneed * detail) -
            Math.round(store.state.userinfo.Armo * 0.4);
        }
        let fightinfo = {
          sys: "系统",
          time: timeStr,
          text: `遭受怪物${monster}攻击,受到${dmg}点伤害`,
          color: "#FF5511",
          ifequipment: false,
          equipmentinfo: {},
        };
        store.state.userinfo.NowHp -= dmg;
        store.commit("addsysinfo", fightinfo);
        if (store.state.userinfo.NowHp > 0) {
          timer = setTimer(walk, 10);
          let list = ["weapon", "armo", "left", "right"];

          if (monster == "Boss") {
            monster = 5;
          }
          let item = {};
          let ra = random(0, list.length - 1);

          if (list[ra] == "weapon") {
            item = crateWeapon(
              store.state.nowjobinfo.lv,
              store.state.nowjobinfo.type,
              monster
            );
          } else if (list[ra] == "armo") {
            item = crateArmo(
              store.state.nowjobinfo.lv,
              store.state.nowjobinfo.type,
              monster
            );
          } else if (list[ra] == "left") {
            item = crateLeft(
              store.state.nowjobinfo.lv,
              store.state.nowjobinfo.type,
              monster
            );
          } else if (list[ra] == "right") {
            item = crateRight(
              store.state.nowjobinfo.lv,
              store.state.nowjobinfo.type,
              monster
            );
          }
          let sysinfo = {
            sys: "系统",
            time: timeStr,
            text: `挑战怪物${monster}成功`,
            color: "#67C23A",
            ifequipment: false,
            equipmentinfo: {},
          };
          store.commit("addsysinfo", sysinfo);
          // let money = Math.round(store.state.nowjobinfo.jobquality + Number(monster)+5);
          let sysinfoequipment = {
            sys: "系统",
            time: timeStr,
            text: `掉落装备：${item.name}`,
            color: `${item.fontcolor}`,
            ifequipment: false,
            equipmentinfo: {},
          };

          store.commit("pushbag", item);
          store.commit("addsysinfo", sysinfoequipment);
          store.commit("adduserexp", dmg);
          if (store.state.sealGroup.length > 0) {
            store.commit("sealauto", item);
          }
        } else {
          let myDate = new Date();
          let str = myDate.toTimeString(); //"10:55:24 GMT+0800 (中国标准时间)"
          let timeStr = str.substring(0, 8);
          let sysinfo = {
            sys: "系统",
            time: timeStr,
            text: "挑战失败,退出副本",
            color: "#67C23A",
            ifequipment: false,
            equipmentinfo: {},
          };
          store.commit("addsysinfo", sysinfo);
          stopfight();
          clearTimeout(t);
        }
      }, 2000);
    }
    onUnmounted(() => {
      clearTimer(timer);
    });
    function stopfight() {
      clearTimer(timer);
      store.commit("changeFightState");
      store.commit("repeatFight", false);
    }
    return {
      state,
      player,
      stopfight,
      playleft,
      playerposition,
      fightref,
      fightdetail,
    };
  },
};
</script>

<style lang="scss" scoped>
.map-top {
  position: absolute;
  top: 0.8rem;
  width: calc(100% - 0.3rem);
  left: 0.15rem;
  height: 1rem;
  background: rgba(54, 121, 176, 0.68);
  text-align: center;
  font-size: 0.4rem;
  line-height: 1rem;
}

.progress-bar {
  position: absolute;
  top: 40px;
  left: 10px;
  right: 10px;
  border: 1px solid #fff;
}

.danger {
  // text-align: center;
  display: flex;
  // justify-content:flex-end
}

.monster {
  width: 20%;
  text-align: right;
}

.monster img {
  margin-right: 10px;
  // margin: 0 10px;
}

.player {
  z-index: 2;
  height: 48px;
  width: 32px;
  background-repeat: no-repeat;
  background: url(../../assets/icons/map/player-s.png);
  position: absolute;
  top: -6px;
}

.final-fight {
  margin-top: 1rem;
}

.final-fight:deep(.el-button) {
  color: #fff !important;
  --el-button-hover-text-color: none;
  --el-button-hover-bg-color: none;
  --el-button-hover-border-color: none;
  background-color: #000;
}
</style>
