import { createStore } from "vuex";
import userinfo from "../assets/config/userinfo";
import { createJob, getDIVsize } from "../assets/config/monsterconfig";

// import Base64 from './tool/fakebase64'
import Base64 from "../assets/tool/fakebase64";
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
  sysinfolist: [
    {
      sys: "系统",
      time: timeStr,
      text: "欢迎来到SlackOffGame,点击地图上的任务列表就可挑战副本,副本难度越高掉落的装备越稀有",
      color: "#f90202",
      ifequipment: false,
      equipmentinfo: {},
    },
    {
      sys: "系统",
      time: "",
      time: timeStr,
      text: "在游戏中遇到的BUG可在底部意见反馈中进行反馈",
      color: "#f90202",
      ifequipment: false,
      equipmentinfo: {},
    },
  ],
  //刷新的副本list
  joblist: [],
  //当前挑战的副本详情
  nowjobinfo: {},
  refreshjobtime: 5,
  timerHp: null,
  showBag: false,
  showShop: false,
  updateDrawer: false,
  repeatfight: false,
};
//创建actions
const actions = {};
//创建mutataions
const mutations = {
  repeatFight(state, data) {
    state.repeatfight = data;
  },
  saveuserdata(state) {
    let data = base.encode(JSON.stringify(state.userinfo));
    localStorage.setItem("userdata", data);
    state.userinfo = JSON.parse(base.decode(localStorage.getItem("userdata")));
  },
  loaduserdata(state) {
    let data = localStorage.getItem("userdata");
    let myDate = new Date();
    let str = myDate.toTimeString(); //"10:55:24 GMT+0800 (中国标准时间)"
    let timeStr = str.substring(0, 8);

    if (data == null || data == undefined) {
      let data = base.encode(JSON.stringify(userinfo));

      localStorage.setItem("userdata", data);
      state.userinfo = JSON.parse(
        base.decode(localStorage.getItem("userdata"))
      );
      this.commit("updateUserProperty");
      // console.log('无存档userinfo',state.userinfo)
    } else {
      state.userinfo = JSON.parse(
        base.decode(localStorage.getItem("userdata"))
      );
      // this.commit("updateUserProperty");
      state.sysinfolist.push({
        sys: "系统",
        time: "",
        time: timeStr,
        text: "读取存档成功",
        color: "#24c4de",
        ifequipment: false,
        equipmentinfo: {},
      });
    }
  },
  loadjobinfo(state, data) {
    state.nowjobinfo = data;
  },
  updateusermoney(state, data) {
    state.userinfo.Gold += data;
    this.commit("saveuserdata");
  },
  pushbag(state, data) {
    if (state.userinfo.bag.length < state.userinfo.baglength) {
      if (data.type == "武器") {
        data.imgadd = "weapon";
      } else if (data.type == "护甲") {
        data.imgadd = "armo";
      } else if (data.type == "首饰") {
        data.imgadd = "left";
      } else {
        data.imgadd = "right";
      }
      state.userinfo.bag.push(data);
      this.commit("saveuserdata");
    } else {
      let myDate = new Date();
      let str = myDate.toTimeString(); //"10:55:24 GMT+0800 (中国标准时间)"
      let timeStr = str.substring(0, 8);
      state.sysinfolist.push({
        sys: "系统",
        time: "",
        time: timeStr,
        text: "背包已满，请清理背包",
        color: "#24c4de",
        ifequipment: false,
        equipmentinfo: {},
      });
    }
  },
  //单一出售 根据id
  sealiitemfrombag(state, data) {
    for (let i = 0; i < state.userinfo.bag.length; i++) {
      if (state.userinfo.bag[i].id == data) {
        state.userinfo.bag.splice(i, 1);
      }
    }
  },
  //一键出售
  sealitemfrombagbantch(state, data) {
    // console.log('data',data.value.length)
    if (data.value.length <= 0) {
      let price = 0;
      for (let i = 0; i < state.userinfo.bag.length; i++) {
        price += state.userinfo.bag[i].price;
      }
      state.userinfo.Gold += price;
      state.sysinfolist.push({
        sys: "系统",
        time: "",
        time: timeStr,
        text: `出售成功,一共获得${price}金币`,
        color: "#F79308",
        ifequipment: false,
        equipmentinfo: {},
      });
      state.userinfo.bag = [];
      this.commit("saveuserdata");
    } else {
      let price = 0;
      let i=0;
 
      for (let i = 0; i < data.value.length; i++) {
        for (let j = 0; j < state.userinfo.bag.length; j++) {
          if (state.userinfo.bag[j].qualityname == data.value[i]) {
            price += state.userinfo.bag[j].price;
            state.userinfo.bag.splice(j, 1);
          }
        }
      }
      state.sysinfolist.push({
        sys: "系统",
        time: "",
        time: timeStr,
        text: `出售成功,一共获得${price}金币`,
        color: "#F79308",
        ifequipment: false,
        equipmentinfo: {},
      });
      this.commit("saveuserdata");
    }
  },
  replaceequipment(state, data) {
    if (data.type == "护甲") {
      this.commit("dealArmo", state.userinfo.equipments[1].armo);
      this.commit("pushbag", state.userinfo.equipments[1].armo);
      state.userinfo.equipments[1].armo = data;
      this.commit("sealiitemfrombag", data.id);
      this.commit("AddArmo", state.userinfo.equipments[1].armo);
      this.commit("saveuserdata");
    } else if (data.type == "武器") {
    
      this.commit("dealWeapon", state.userinfo.equipments[0].weapon);
      this.commit("pushbag", state.userinfo.equipments[0].weapon);
      state.userinfo.equipments[0].weapon = data;
      this.commit("sealiitemfrombag", data.id);
      this.commit("AddWeapon", state.userinfo.equipments[0].weapon);
      this.commit("saveuserdata");
    } else if (data.type == "首饰") {
      this.commit("dealLeft", state.userinfo.equipments[2].left);
      this.commit("pushbag", state.userinfo.equipments[2].left);
      state.userinfo.equipments[2].left = data;
      this.commit("sealiitemfrombag", data.id);
      this.commit("AddLeft", state.userinfo.equipments[2].left);
      this.commit("saveuserdata");
    } else {
      this.commit("dealRight", state.userinfo.equipments[3].right);
      this.commit("pushbag", state.userinfo.equipments[3].right);
      state.userinfo.equipments[3].right = data;
      this.commit("sealiitemfrombag", data.id);
      this.commit("AddRight", state.userinfo.equipments[3].right);
      this.commit("saveuserdata");
    }
  },
  changeFightState(state) {
    state.showfight = !state.showfight;
  },
  changeShowShop(state) {
    state.showShop = !state.showShop;
  },
  changeShowUpdate(state) {
    state.updateDrawer = !state.updateDrawer;
  },
  addsysinfo(state, data) {
    state.sysinfolist.push(data);
  },
  createjoblist(state, data) {
    state.joblist = createJob(
      7,
      store.state.userinfo.Lv,
      data.height,
      data.width
    );
    // for(let i=0;i<state.joblist.length;i++){
    //   console.log('--------------------------')
    //   console.log('job',state.joblist[i].type)
    //   console.log('job',state.joblist[i].jobquality)
    //   console.log('--------------------------')
    // }
    
  },
  deleteupjob(state, data) {
    for (let i = 0; i < state.joblist.length; i++) {
      if (state.joblist[i].jobid == data.jobid) {
        state.joblist.splice(i, 1);
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
        sys: "系统",
        time: "",
        time: timeStr,
        text: `任务刷新CD中,剩余${state.refreshjobtime}秒`,
        color: "#f90202",
        ifequipment: false,
        equipmentinfo: {},
      };
      state.sysinfolist.push(obj);
      if (state.refreshjobtime <= 1) {
        state.refreshjobtime = 5;
        clearInterval(timer);
      }
    }, 1000);
  },
  clearallsysinfo(state) {
    state.sysinfolist = [];
    let myDate = new Date();
    let str = myDate.toTimeString(); //"10:55:24 GMT+0800 (中国标准时间)"
    let timeStr = str.substring(0, 8);
    let obj = {
      sys: "系统",
      time: "",
      time: timeStr,
      text: `系统消息已清空`,
      color: "#67C23A",
      ifequipment: false,
      equipmentinfo: {},
    };
    state.sysinfolist.push(obj);
  },
  //人物回血机制
  userrecoverhp(state, data) {
    clearInterval(state.timerHp);
    state.timerHp = setInterval(() => {
      state.userinfo.NowHp += Math.round(state.userinfo.MaxHp * data);
      if (state.userinfo.NowHp >= state.userinfo.MaxHp) {
        state.userinfo.NowHp = state.userinfo.MaxHp;
        clearInterval(state.timerHp);
      }
    }, 1000);
  },
  changeShowBag(state) {
    state.showBag = !state.showBag;
  },
  // //减属性
  dealArmo(state, data) {
    //  console.log('替换之前',data.name)
    // console.log('-----------------------')
    // console.log('Atk',state.userinfo.Atk)
    // console.log('Armo',state.userinfo.Armo)
    // console.log('MaxHp',state.userinfo.MaxHp)
    // console.log('Cridt',state.userinfo.Cridt)
    // console.log('CridtDmg',state.userinfo.CridtDmg)
    // console.log('-----------------------')
    let Armo = 0;
    let Atk = 0;
    let MaxHp = 0;
    let Cridt = 0;
    let CridtDmg = 0;
    for (let q = 0; q < data.dmglist.length; q++) {
      //第一层判断基础属性:就武器而言

      if (Object.keys(data.dmglist[q])[0] == "防御力") {
        let str = data.dmglist[q]["防御力"];
        let atk = Number(str.replace("+", ""));
        Armo += atk;
      }
      if (Object.keys(data.dmglist[q])[0] == "生命值") {
        let str = data.dmglist[q]["生命值"];
        // let atk = Number(str.replace(/\D/g,""))
        let atk = Number(str.replace("+", ""));
        MaxHp += atk;
      }
    }
    for (let w = 0; w < data.extraList.length; w++) {
      //第一层判断基础属性:就武器而言
      if (Object.keys(data.extraList[w])[0] == "生命值") {
        let str = data.extraList[w]["生命值"];
        // let atk = Number(str.replace(/\D/g,""))
        let atk = Number(str.replace("+", ""));
        MaxHp += atk;
      }
      if (Object.keys(data.extraList[w])[0] == "防御力") {
        let str = data.extraList[w]["防御力"];
        // let atk = Number(str.replace(/\D/g,""))
        let atk = Number(str.replace("+", ""));
        Armo += atk;
      }
    }
    //  console.log('替换中',data.name)
    // console.log('-----------------------')
    // console.log('Atk',Atk)
    // console.log('Armo',Armo)
    // console.log('MaxHp',MaxHp)
    // console.log('Cridt',Cridt)
    // console.log('CridtDmg',CridtDmg)
    // console.log('-----------------------')
    state.userinfo.Atk -= Atk;
    state.userinfo.Armo -= Armo;
    state.userinfo.CridtDmg -= CridtDmg;
    state.userinfo.Cridt -= Cridt;
    state.userinfo.MaxHp -= MaxHp;
    // console.log('替换完成',data.name)
    // console.log('-----------------------')
    // console.log('Atk',state.userinfo.Atk)
    // console.log('Armo',state.userinfo.Armo)
    // console.log('MaxHp',state.userinfo.MaxHp)
    // console.log('Cridt',state.userinfo.Cridt)
    // console.log('CridtDmg',state.userinfo.CridtDmg)
    // console.log('-----------------------')
  },
  AddArmo(state, data) {
    let Armo = 0;
    let Atk = 0;
    let MaxHp = 0;
    let Cridt = 0;
    let CridtDmg = 0;
    for (let q = 0; q < data.dmglist.length; q++) {
      //第一层判断基础属性:就武器而言

      if (Object.keys(data.dmglist[q])[0] == "防御力") {
        let str = data.dmglist[q]["防御力"];
        let atk = Number(str.replace("+", ""));
        Armo += atk;
      }
      if (Object.keys(data.dmglist[q])[0] == "生命值") {
        let str = data.dmglist[q]["生命值"];
        // let atk = Number(str.replace(/\D/g,""))
        let atk = Number(str.replace("+", ""));
        MaxHp += atk;
      }
    }
    for (let w = 0; w < data.extraList.length; w++) {
      //第一层判断基础属性:就武器而言
      if (Object.keys(data.extraList[w])[0] == "生命值") {
        let str = data.extraList[w]["生命值"];
        // let atk = Number(str.replace(/\D/g,""))
        let atk = Number(str.replace("+", ""));
        MaxHp += atk;
      }
      if (Object.keys(data.extraList[w])[0] == "防御力") {
        let str = data.extraList[w]["防御力"];
        // let atk = Number(str.replace(/\D/g,""))
        let atk = Number(str.replace("+", ""));
        Armo += atk;
      }
    }
    //   console.log('替换中-加',data.name)
    // console.log('-----------------------')
    // console.log('Atk',Atk)
    // console.log('Armo',Armo)
    // console.log('MaxHp',MaxHp)
    // console.log('Cridt',Cridt)
    // console.log('CridtDmg',CridtDmg)
    // console.log('-----------------------')
    state.userinfo.Atk += Atk;
    state.userinfo.Armo += Armo;
    state.userinfo.CridtDmg += CridtDmg;
    state.userinfo.Cridt += Cridt;
    state.userinfo.MaxHp += MaxHp;
    //    console.log('替换完成-加',data.name)
    // console.log('-----------------------')
    // console.log('Atk',state.userinfo.Atk)
    // console.log('Armo',state.userinfo.Armo)
    // console.log('MaxHp',state.userinfo.MaxHp)
    // console.log('Cridt',state.userinfo.Cridt)
    // console.log('CridtDmg',state.userinfo.CridtDmg)
    // console.log('-----------------------')
  },
  //耳环
  dealRight(state, data) {
    let Armo = 0;
    let Atk = 0;
    let MaxHp = 0;
    let Cridt = 0;
    let CridtDmg = 0;
    for (let q = 0; q < data.dmglist.length; q++) {
      //第一层判断基础属性:就武器而言

      if (Object.keys(data.dmglist[q])[0] == "生命值") {
        let str = data.dmglist[q]["生命值"];
        let atk = Number(str.replace("+", ""));
        MaxHp += atk;
      }
      if (Object.keys(data.dmglist[q])[0] == "攻击") {
        let str = data.dmglist[q]["攻击"];
        // let atk = Number(str.replace(/\D/g,""))
        let atk = Number(str.replace("+", ""));
        Atk += atk;
      }
    }
    for (let w = 0; w < data.extraList.length; w++) {
      //第一层判断基础属性:就武器而言
      if (Object.keys(data.extraList[w])[0] == "防御力") {
        let str = data.extraList[w]["防御力"];
        // let atk = Number(str.replace(/\D/g,""))
        let atk = Number(str.replace("+", ""));
        Armo += atk;
      }
      if (Object.keys(data.extraList[w])[0] == "暴击") {
        let str = data.extraList[w]["暴击"];
        // let atk = Number(str.replace(/\D/g,""))
        let atk = Number(str.replace("+", ""));
        Cridt += atk;
      }
      if (Object.keys(data.extraList[w])[0] == "暴击伤害") {
        let str = data.extraList[w]["暴击伤害"];
        // let atk = Number(str.replace(/\D/g,""))
        let atk = Number(str.replace("+", ""));
        CridtDmg += atk;
      }
    }

    state.userinfo.Atk -= Atk;
    state.userinfo.Armo -= Armo;
    state.userinfo.CridtDmg -= CridtDmg;
    state.userinfo.Cridt -= Cridt;
    state.userinfo.MaxHp -= MaxHp;
  },
  AddRight(state, data) {
    let Armo = 0;
    let Atk = 0;
    let MaxHp = 0;
    let Cridt = 0;
    let CridtDmg = 0;
    for (let q = 0; q < data.dmglist.length; q++) {
      //第一层判断基础属性:就武器而言

      if (Object.keys(data.dmglist[q])[0] == "生命值") {
        let str = data.dmglist[q]["生命值"];
        let atk = Number(str.replace("+", ""));
        MaxHp += atk;
      }
      if (Object.keys(data.dmglist[q])[0] == "攻击") {
        let str = data.dmglist[q]["攻击"];
        // let atk = Number(str.replace(/\D/g,""))
        let atk = Number(str.replace("+", ""));
        Atk += atk;
      }
    }
    for (let w = 0; w < data.extraList.length; w++) {
      //第一层判断基础属性:就武器而言
      if (Object.keys(data.extraList[w])[0] == "防御力") {
        let str = data.extraList[w]["防御力"];
        // let atk = Number(str.replace(/\D/g,""))
        let atk = Number(str.replace("+", ""));
        Armo += atk;
      }
      if (Object.keys(data.extraList[w])[0] == "暴击") {
        let str = data.extraList[w]["暴击"];
        // let atk = Number(str.replace(/\D/g,""))
        let atk = Number(str.replace("+", ""));
        Cridt += atk;
      }
      if (Object.keys(data.extraList[w])[0] == "暴击伤害") {
        let str = data.extraList[w]["暴击伤害"];
        // let atk = Number(str.replace(/\D/g,""))
        let atk = Number(str.replace("+", ""));
        CridtDmg += atk;
      }
    }

    state.userinfo.Atk += Atk;
    state.userinfo.Armo += Armo;
    state.userinfo.CridtDmg += CridtDmg;
    state.userinfo.Cridt += Cridt;
    state.userinfo.MaxHp += MaxHp;
  },
  //首饰
  dealLeft(state, data) {
    let Armo = 0;
    let Atk = 0;
    let MaxHp = 0;
    let Cridt = 0;
    let CridtDmg = 0;
    for (let q = 0; q < data.dmglist.length; q++) {
      //第一层判断基础属性:就武器而言

      if (Object.keys(data.dmglist[q])[0] == "防御力") {
        let str = data.dmglist[q]["防御力"];
        let atk = Number(str.replace("+", ""));
        Armo += atk;
      }
      if (Object.keys(data.dmglist[q])[0] == "攻击") {
        let str = data.dmglist[q]["攻击"];
        // let atk = Number(str.replace(/\D/g,""))
        let atk = Number(str.replace("+", ""));
        Atk += atk;
      }
    }
    for (let w = 0; w < data.extraList.length; w++) {
      //第一层判断基础属性:就武器而言
      if (Object.keys(data.extraList[w])[0] == "生命值") {
        let str = data.extraList[w]["生命值"];
        // let atk = Number(str.replace(/\D/g,""))
        let atk = Number(str.replace("+", ""));
        MaxHp += atk;
      }
      if (Object.keys(data.extraList[w])[0] == "暴击") {
        let str = data.extraList[w]["暴击"];
        // let atk = Number(str.replace(/\D/g,""))
        let atk = Number(str.replace("+", ""));
        Cridt += atk;
      }
      if (Object.keys(data.extraList[w])[0] == "暴击伤害") {
        let str = data.extraList[w]["暴击伤害"];
        // let atk = Number(str.replace(/\D/g,""))
        let atk = Number(str.replace("+", ""));
        CridtDmg += atk;
      }
    }

    state.userinfo.Atk -= Atk;
    state.userinfo.Armo -= Armo;
    state.userinfo.CridtDmg -= CridtDmg;
    state.userinfo.Cridt -= Cridt;
    state.userinfo.MaxHp -= MaxHp;
  },
  AddLeft(state, data) {
    let Armo = 0;
    let Atk = 0;
    let MaxHp = 0;
    let Cridt = 0;
    let CridtDmg = 0;
    for (let q = 0; q < data.dmglist.length; q++) {
      //第一层判断基础属性:就武器而言

      if (Object.keys(data.dmglist[q])[0] == "防御力") {
        let str = data.dmglist[q]["防御力"];
        let atk = Number(str.replace("+", ""));
        Armo += atk;
      }
      if (Object.keys(data.dmglist[q])[0] == "攻击") {
        let str = data.dmglist[q]["攻击"];
        // let atk = Number(str.replace(/\D/g,""))
        let atk = Number(str.replace("+", ""));
        Atk += atk;
      }
    }
    for (let w = 0; w < data.extraList.length; w++) {
      //第一层判断基础属性:就武器而言
      if (Object.keys(data.extraList[w])[0] == "生命值") {
        let str = data.extraList[w]["生命值"];
        // let atk = Number(str.replace(/\D/g,""))
        let atk = Number(str.replace("+", ""));
        MaxHp += atk;
      }
      if (Object.keys(data.extraList[w])[0] == "暴击") {
        let str = data.extraList[w]["暴击"];
        // let atk = Number(str.replace(/\D/g,""))
        let atk = Number(str.replace("+", ""));
        Cridt += atk;
      }
      if (Object.keys(data.extraList[w])[0] == "暴击伤害") {
        let str = data.extraList[w]["暴击伤害"];
        // let atk = Number(str.replace(/\D/g,""))
        let atk = Number(str.replace("+", ""));
        CridtDmg += atk;
      }
    }

    state.userinfo.Atk += Atk;
    state.userinfo.Armo += Armo;
    state.userinfo.CridtDmg += CridtDmg;
    state.userinfo.Cridt += Cridt;
    state.userinfo.MaxHp += MaxHp;
  },
  //武器
  dealWeapon(state, data) {
    // console.log('替换之前',data.name)
    // console.log('-----------------------')
    // console.log('Atk',state.userinfo.Atk)
    // console.log('Armo',state.userinfo.Armo)
    // console.log('MaxHp',state.userinfo.MaxHp)
    // console.log('Cridt',state.userinfo.Cridt)
    // console.log('CridtDmg',state.userinfo.CridtDmg)
    // console.log('-----------------------')
    let Armo = 0;
    let Atk = 0;
    let MaxHp = 0;
    let Cridt = 0;
    let CridtDmg = 0;
    for (let j = 0; j < data.dmglist.length; j++) {
      //第一层判断基础属性:就武器而言
      if (Object.keys(data.dmglist[j])[0] == "攻击") {
        let str = data.dmglist[j]["攻击"];
        let atk = Number(str.replace("+", ""));
        Atk += atk;
      }
      if (Object.keys(data.dmglist[j])[0] == "暴击率") {
        let str = data.dmglist[j]["暴击率"];
        // let atk = Number(str.replace(/\D/g,""))
        let atk = Number(str.replace("+", ""));
        Cridt += atk;
      }
      if (Object.keys(data.dmglist[j])[0] == "暴击伤害") {
        let str = data.dmglist[j]["暴击伤害"];
        // let atk = Number(str.replace(/\D/g,""))
        let atk = Number(str.replace("+", ""));
        CridtDmg += atk;
      }
    }
    for (let j = 0; j < data.extraList.length; j++) {
      //第一层判断基础属性:就武器而言
      if (Object.keys(data.extraList[j])[0] == "攻击") {
        let str = data.extraList[j]["攻击"];
        let atk = Number(str.replace("+", ""));
        Atk += atk;
      }
      if (Object.keys(data.extraList[j])[0] == "暴击率") {
        let str = data.extraList[j]["暴击率"];
        // let atk = Number(str.replace(/\D/g,""))
        let atk = Number(str.replace("+", ""));
        Cridt += atk;
      }
      if (Object.keys(data.extraList[j])[0] == "暴击伤害") {
        let str = data.extraList[j]["暴击伤害"];
        // let atk = Number(str.replace(/\D/g,""))
        let atk = Number(str.replace("+", ""));
        CridtDmg += atk;
      }
      if (Object.keys(data.extraList[j])[0] == "生命值") {
        let str = data.extraList[j]["生命值"];
        // let atk = Number(str.replace(/\D/g,""))
        let atk = Number(str.replace("+", ""));
        MaxHp += atk;
      }
      if (Object.keys(data.extraList[j])[0] == "防御力") {
        let str = data.extraList[j]["防御力"];
        // let atk = Number(str.replace(/\D/g,""))
        let atk = Number(str.replace("+", ""));
        Armo += atk;
      }
    }
    // console.log('替换中',data.name)
    // console.log('-----------------------')
    // console.log('Atk',Atk)
    // console.log('Armo',Armo)
    // console.log('MaxHp',MaxHp)
    // console.log('Cridt',Cridt)
    // console.log('CridtDmg',CridtDmg)
    // console.log('-----------------------')
    state.userinfo.Atk -= Atk;
    state.userinfo.Armo -= Armo;
    state.userinfo.CridtDmg -= CridtDmg;
    state.userinfo.Cridt -= Cridt;
    state.userinfo.MaxHp -= MaxHp;
    // console.log('替换完成',data.name)
    // console.log('-----------------------')
    // console.log('Atk',state.userinfo.Atk)
    // console.log('Armo',state.userinfo.Armo)
    // console.log('MaxHp',state.userinfo.MaxHp)
    // console.log('Cridt',state.userinfo.Cridt)
    // console.log('CridtDmg',state.userinfo.CridtDmg)
    // console.log('-----------------------')
  },
  AddWeapon(state, data) {
    // console.log('替换之前',data.name)
    // console.log('-----------------------')
    // console.log('Atk',state.userinfo.Atk)
    // console.log('Armo',state.userinfo.Armo)
    // console.log('MaxHp',state.userinfo.MaxHp)
    // console.log('Cridt',state.userinfo.Cridt)
    // console.log('CridtDmg',state.userinfo.CridtDmg)
    // console.log('-----------------------')
    let Armo = 0;
    let Atk = 0;
    let MaxHp = 0;
    let Cridt = 0;
    let CridtDmg = 0;
    for (let j = 0; j < data.dmglist.length; j++) {
      //第一层判断基础属性:就武器而言
      if (Object.keys(data.dmglist[j])[0] == "攻击") {
        let str = data.dmglist[j]["攻击"];
        let atk = Number(str.replace("+", ""));
        Atk += atk;
      }
      if (Object.keys(data.dmglist[j])[0] == "暴击率") {
        let str = data.dmglist[j]["暴击率"];
        // let atk = Number(str.replace(/\D/g,""))
        let atk = Number(str.replace("+", ""));
        Cridt += atk;
      }
      if (Object.keys(data.dmglist[j])[0] == "暴击伤害") {
        let str = data.dmglist[j]["暴击伤害"];
        // let atk = Number(str.replace(/\D/g,""))
        let atk = Number(str.replace("+", ""));
        CridtDmg += atk;
      }
    }
    for (let j = 0; j < data.extraList.length; j++) {
      //第一层判断基础属性:就武器而言
      if (Object.keys(data.extraList[j])[0] == "攻击") {
        let str = data.extraList[j]["攻击"];
        let atk = Number(str.replace("+", ""));
        Atk += atk;
      }
      if (Object.keys(data.extraList[j])[0] == "暴击率") {
        let str = data.extraList[j]["暴击率"];
        // let atk = Number(str.replace(/\D/g,""))
        let atk = Number(str.replace("+", ""));
        Cridt += atk;
      }
      if (Object.keys(data.extraList[j])[0] == "暴击伤害") {
        let str = data.extraList[j]["暴击伤害"];
        // let atk = Number(str.replace(/\D/g,""))
        let atk = Number(str.replace("+", ""));
        CridtDmg += atk;
      }
      if (Object.keys(data.extraList[j])[0] == "生命值") {
        let str = data.extraList[j]["生命值"];
        // let atk = Number(str.replace(/\D/g,""))
        let atk = Number(str.replace("+", ""));
        MaxHp += atk;
      }
      if (Object.keys(data.extraList[j])[0] == "防御力") {
        let str = data.extraList[j]["防御力"];
        // let atk = Number(str.replace(/\D/g,""))
        let atk = Number(str.replace("+", ""));
        Armo += atk;
      }
    }
    // console.log('替换中',data.name)
    // console.log('-----------------------')
    // console.log('Atk',Atk)
    // console.log('Armo',Armo)
    // console.log('MaxHp',MaxHp)
    // console.log('Cridt',Cridt)
    // console.log('CridtDmg',CridtDmg)
    // console.log('-----------------------')
    state.userinfo.Atk += Atk;
    state.userinfo.Armo += Armo;
    state.userinfo.CridtDmg += CridtDmg;
    state.userinfo.Cridt += Cridt;
    state.userinfo.MaxHp += MaxHp;
    // console.log('替换完成',data.name)
    // console.log('-----------------------')
    // console.log('Atk',state.userinfo.Atk)
    // console.log('Armo',state.userinfo.Armo)
    // console.log('MaxHp',state.userinfo.MaxHp)
    // console.log('Cridt',state.userinfo.Cridt)
    // console.log('CridtDmg',state.userinfo.CridtDmg)
    // console.log('-----------------------')
  },
  //计算所有装备属性总和
  updateUserProperty(state) {
    let Armo = 0;
    let Atk = 0;
    let MaxHp = 0;
    let Cridt = 0;
    let CridtDmg = 0;
    for (let i = 0; i < state.userinfo.equipments.length; i++) {
      //先去判断武器属性，然后加到人物属性上

      if (state.userinfo.equipments[i].weapon) {
        for (
          let j = 0;
          j < state.userinfo.equipments[i].weapon.dmglist.length;
          j++
        ) {
          //第一层判断基础属性:就武器而言
          if (
            Object.keys(state.userinfo.equipments[i].weapon.dmglist[j])[0] ==
            "攻击"
          ) {
            let str = state.userinfo.equipments[i].weapon.dmglist[j]["攻击"];
            let atk = Number(str.replace("+", ""));
            Atk += atk;
          }
          if (
            Object.keys(state.userinfo.equipments[i].weapon.dmglist[j])[0] ==
            "暴击率"
          ) {
            let str = state.userinfo.equipments[i].weapon.dmglist[j]["暴击率"];
            // let atk = Number(str.replace(/\D/g,""))
            let atk = Number(str.replace("+", ""));
            Cridt += atk;
          }
          if (
            Object.keys(state.userinfo.equipments[i].weapon.dmglist[j])[0] ==
            "暴击伤害"
          ) {
            let str =
              state.userinfo.equipments[i].weapon.dmglist[j]["暴击伤害"];
            // let atk = Number(str.replace(/\D/g,""))
            let atk = Number(str.replace("+", ""));
            CridtDmg += atk;
          }
        }
        for (
          let j = 0;
          j < state.userinfo.equipments[i].weapon.extraList.length;
          j++
        ) {
          //第一层判断基础属性:就武器而言
          if (
            Object.keys(state.userinfo.equipments[i].weapon.extraList[j])[0] ==
            "攻击"
          ) {
            let str = state.userinfo.equipments[i].weapon.extraList[j]["攻击"];
            let atk = Number(str.replace("+", ""));
            Atk += atk;
          }
          if (
            Object.keys(state.userinfo.equipments[i].weapon.extraList[j])[0] ==
            "暴击率"
          ) {
            let str =
              state.userinfo.equipments[i].weapon.extraList[j]["暴击率"];
            // let atk = Number(str.replace(/\D/g,""))
            let atk = Number(str.replace("+", ""));
            Cridt += atk;
          }
          if (
            Object.keys(state.userinfo.equipments[i].weapon.extraList[j])[0] ==
            "暴击伤害"
          ) {
            let str =
              state.userinfo.equipments[i].weapon.extraList[j]["暴击伤害"];
            // let atk = Number(str.replace(/\D/g,""))
            let atk = Number(str.replace("+", ""));
            CridtDmg += atk;
          }
          if (
            Object.keys(state.userinfo.equipments[i].weapon.extraList[j])[0] ==
            "生命值"
          ) {
            let str =
              state.userinfo.equipments[i].weapon.extraList[j]["生命值"];
            // let atk = Number(str.replace(/\D/g,""))
            let atk = Number(str.replace("+", ""));
            MaxHp += atk;
          }
          if (
            Object.keys(state.userinfo.equipments[i].weapon.extraList[j])[0] ==
            "防御力"
          ) {
            let str =
              state.userinfo.equipments[i].weapon.extraList[j]["防御力"];
            // let atk = Number(str.replace(/\D/g,""))
            let atk = Number(str.replace("+", ""));
            Armo += atk;
          }
        }
      } else if (state.userinfo.equipments[i].armo) {
        //护甲
        for (
          let q = 0;
          q < state.userinfo.equipments[i].armo.dmglist.length;
          q++
        ) {
          //第一层判断基础属性:就武器而言

          if (
            Object.keys(state.userinfo.equipments[i].armo.dmglist[q])[0] ==
            "防御力"
          ) {
            let str = state.userinfo.equipments[i].armo.dmglist[q]["防御力"];
            let atk = Number(str.replace("+", ""));
            Armo += atk;
          }
          if (
            Object.keys(state.userinfo.equipments[i].armo.dmglist[q])[0] ==
            "生命值"
          ) {
            let str = state.userinfo.equipments[i].armo.dmglist[q]["生命值"];
            // let atk = Number(str.replace(/\D/g,""))
            let atk = Number(str.replace("+", ""));
            MaxHp += atk;
          }
        }
        for (
          let w = 0;
          w < state.userinfo.equipments[i].armo.extraList.length;
          w++
        ) {
          //第一层判断基础属性:就武器而言
          if (
            Object.keys(state.userinfo.equipments[i].armo.extraList[w])[0] ==
            "生命值"
          ) {
            let str = state.userinfo.equipments[i].armo.extraList[w]["生命值"];
            // let atk = Number(str.replace(/\D/g,""))
            let atk = Number(str.replace("+", ""));
            MaxHp += atk;
          }
          if (
            Object.keys(state.userinfo.equipments[i].armo.extraList[w])[0] ==
            "防御力"
          ) {
            let str = state.userinfo.equipments[i].armo.extraList[w]["防御力"];
            // let atk = Number(str.replace(/\D/g,""))
            let atk = Number(str.replace("+", ""));
            Armo += atk;
          }
        }
      } else if (state.userinfo.equipments[i].left) {
        //首饰
        for (
          let q = 0;
          q < state.userinfo.equipments[i].left.dmglist.length;
          q++
        ) {
          //第一层判断基础属性:就武器而言

          if (
            Object.keys(state.userinfo.equipments[i].left.dmglist[q])[0] ==
            "防御力"
          ) {
            let str = state.userinfo.equipments[i].left.dmglist[q]["防御力"];
            let atk = Number(str.replace("+", ""));
            Armo += atk;
          }
          if (
            Object.keys(state.userinfo.equipments[i].left.dmglist[q])[0] ==
            "攻击"
          ) {
            let str = state.userinfo.equipments[i].left.dmglist[q]["攻击"];
            // let atk = Number(str.replace(/\D/g,""))
            let atk = Number(str.replace("+", ""));
            Atk += atk;
          }
        }
        for (
          let w = 0;
          w < state.userinfo.equipments[i].left.extraList.length;
          w++
        ) {
          //第一层判断基础属性:就武器而言
          if (
            Object.keys(state.userinfo.equipments[i].left.extraList[w])[0] ==
            "生命值"
          ) {
            let str = state.userinfo.equipments[i].left.extraList[w]["生命值"];
            // let atk = Number(str.replace(/\D/g,""))
            let atk = Number(str.replace("+", ""));
            MaxHp += atk;
          }
          if (
            Object.keys(state.userinfo.equipments[i].left.extraList[w])[0] ==
            "暴击"
          ) {
            let str = state.userinfo.equipments[i].left.extraList[w]["暴击"];
            // let atk = Number(str.replace(/\D/g,""))
            let atk = Number(str.replace("+", ""));
            Cridt += atk;
          }
          if (
            Object.keys(state.userinfo.equipments[i].left.extraList[w])[0] ==
            "暴击伤害"
          ) {
            let str =
              state.userinfo.equipments[i].left.extraList[w]["暴击伤害"];
            // let atk = Number(str.replace(/\D/g,""))
            let atk = Number(str.replace("+", ""));
            CridtDmg += atk;
          }
        }
      } else if (state.userinfo.equipments[i].right) {
        //耳环
        for (
          let q = 0;
          q < state.userinfo.equipments[i].right.dmglist.length;
          q++
        ) {
          //第一层判断基础属性:就武器而言

          if (
            Object.keys(state.userinfo.equipments[i].right.dmglist[q])[0] ==
            "生命值"
          ) {
            let str = state.userinfo.equipments[i].right.dmglist[q]["生命值"];
            let atk = Number(str.replace("+", ""));
            MaxHp += atk;
          }
          if (
            Object.keys(state.userinfo.equipments[i].right.dmglist[q])[0] ==
            "攻击"
          ) {
            let str = state.userinfo.equipments[i].right.dmglist[q]["攻击"];
            // let atk = Number(str.replace(/\D/g,""))
            let atk = Number(str.replace("+", ""));
            Atk += atk;
          }
        }
        for (
          let w = 0;
          w < state.userinfo.equipments[i].right.extraList.length;
          w++
        ) {
          //第一层判断基础属性:就武器而言
          if (
            Object.keys(state.userinfo.equipments[i].right.extraList[w])[0] ==
            "防御力"
          ) {
            let str = state.userinfo.equipments[i].right.extraList[w]["防御力"];
            // let atk = Number(str.replace(/\D/g,""))
            let atk = Number(str.replace("+", ""));
            Armo += atk;
          }
          if (
            Object.keys(state.userinfo.equipments[i].right.extraList[w])[0] ==
            "暴击"
          ) {
            let str = state.userinfo.equipments[i].right.extraList[w]["暴击"];
            // let atk = Number(str.replace(/\D/g,""))
            let atk = Number(str.replace("+", ""));
            Cridt += atk;
          }
          if (
            Object.keys(state.userinfo.equipments[i].right.extraList[w])[0] ==
            "暴击伤害"
          ) {
            let str =
              state.userinfo.equipments[i].right.extraList[w]["暴击伤害"];
            // let atk = Number(str.replace(/\D/g,""))
            let atk = Number(str.replace("+", ""));
            CridtDmg += atk;
          }
        }
      }
    }
    state.userinfo.Atk = state.userinfo.Atk + Atk;
    state.userinfo.Armo = state.userinfo.Armo + Armo;
    state.userinfo.CridtDmg = state.userinfo.CridtDmg + CridtDmg;
    state.userinfo.Cridt = state.userinfo.Cridt + Cridt;
    state.userinfo.MaxHp = state.userinfo.MaxHp + MaxHp;
  },
  //增加角色经验，升级
  adduserexp(state,data){
    if(state.userinfo.exp>=state.userinfo.needexp){
      state.userinfo.Lv+=1;
      state.userinfo.Atk+=5;
      state.userinfo.MaxHp+=10
      state.userinfo.exp=0;
      state.userinfo.needexp+=state.userinfo.needexp/2
      this.commit('saveuserdata')
    }else{
      state.userinfo.exp+=data
      this.commit('saveuserdata')
    }
  }
};

//创建store
const store = createStore({
  state,
  actions,
  mutations,
});
//暴露出去
export default store;
