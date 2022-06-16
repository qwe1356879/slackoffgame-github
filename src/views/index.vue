<template>
  <div class="main">
    <div class="left-detail">
      <div class="info-area">
        <userlevel></userlevel>
        <userdetail></userdetail>
      </div>
      <div class="sys-area">
        <sysinfo></sysinfo>
      </div>

      <div class="footer">
        <myfooter></myfooter>
      </div>
    </div>
    <div class="back" ref="backmaap">
      <div class="border">
        <Bag class="bag"></Bag>
        <Shop v-if="showShop"></Shop>
        <fight ref="fight" v-if="show"></fight>
        <div
          class="job-div"
          v-for="di in joblist"
          :style="di.style"
          v-else
          @click="showdialog(di)"
        >
          <div class="img" :style="di.imagestyle">
            <img :src="`/icons/menu/${di.imgurl}.png`" />
          </div>
          <div class="divider">
            <el-divider />
          </div>
          <p class="job-p">lv{{ di.lv }}</p>
        </div>
        <opendialog ref="mydialog" ></opendialog>
      </div>

      <div class="menu">
        <mymenu @refreshjob="refreshjob"></mymenu>
      </div>
      
      <updateDrawer></updateDrawer>
    </div>
  </div>
</template>

<script>
import {
  reactive,
  toRefs,
  onMounted,
  ref,
  computed,
  watch,
  onBeforeMount,
} from "vue";
import userlevel from "../components/userdetail/userlevel.vue";
import userdetail from "../components/userdetail/userdetail.vue";
import sysinfo from "../components/sys/sysinfo.vue";
import mymenu from "../components/menu/index.vue";
import { createJob, getDIVsize } from "../assets/config/monsterconfig";
import opendialog from "../components/opendialog/index.vue";
import myfooter from "../components/footer/index.vue";
import userinfo from "../assets/config/userinfo";
import { useStore } from "vuex";
import fight from "../components/fight/index.vue";
import { ElNotification } from "element-plus";
import Bag from "../components/bag/index.vue";
import Shop from "../components/shop/index.vue";
import updateDrawer from "../components/updatedrawer/index.vue"
export default {
  components: {
    userlevel,
    userdetail,
    sysinfo,
    mymenu,
    opendialog,
    myfooter,
    fight,
    Bag,
    Shop,
    updateDrawer
  },
  setup() {
    const store = useStore();
    const state = reactive({
      joblist: [],
      jobinfo: {},
      show: false,
      showShop:false,
    });
    
    const backmaap = ref(null);
    const mydialog = ref(null);
    const getShowHp = computed(() => {
      //返回的是ref对象
      return store.state.userinfo.NowHp;
    });
    const getShowTask = computed(() => {
      //返回的是ref对象
      return store.state.showfight;
    });
    const getJobTask = computed(() => {
      //返回的是ref对象
      return store.state.joblist;
    });
    const getShowShop= computed(() => {
      //返回的是ref对象
      return store.state.showShop;
    });
   
    watch(
      getShowShop,
      (newval, oldval) => {
        state.showShop=newval
      },
      { immediate: true, deep: true }
    );
    watch(
      getShowHp,
      (newval, oldval) => {
        if (newval <= store.state.userinfo.MaxHp) {
          store.commit("userrecoverhp", 0.02);
        }
      },
      { immediate: true, deep: true }
    );
    watch(
      getShowTask,
      (newval, oldval) => {
      
        state.show = newval;
      },
      { deep: true }
    );
    watch(getJobTask, (newval, oldval) => {
      if (newval) {
        state.joblist = newval;
      }
    });
    onMounted(() => {
      store.commit("loaduserdata");
      let data = {
        height: backmaap.value.offsetHeight,
        width: backmaap.value.offsetWidth,
      };
      store.commit("createjoblist", data);
      state.joblist = store.state.joblist;
    });
    function refreshjob() {
      let time = store.state.refreshjobtime;
      if (time >= 1 && time < 5) {
        console.log("JOBCD");
      } else {
        let data = {
          height: backmaap.value.offsetHeight,
          width: backmaap.value.offsetWidth,
        };
        store.commit("createjoblist", data);
        state.joblist = store.state.joblist;
        ElNotification({
          title: "系统提示",
          type: "success",
          duration: 3000,
          message: "刷新任务成功",
        });
        store.commit("addrefeshtime");
      }
    }
    function showdialog(job) {
      mydialog.value.opendialog(job);
    }
    return {
      ...toRefs(state),
      backmaap,
      refreshjob,
      showdialog,
      mydialog,
    };
  },
};
</script>

<style scoped>
@import "../assets/css/index.scss";

.border {
  width: 100%;
  height: 90%;
  margin: 0 auto;
  position: relative;
}

.img {
  margin: 0 auto;
  text-align: center;
  width: 43px;
  height: 43px;
}

.img img {
  padding-top: 2px;
  width: 40px;
}

.el-divider--horizontal {
  margin: 0 auto;
  width: 90%;
}

.job-p {
  text-align: center;
  padding-top: 3px;
  color: #fff;
}

.job-div:hover {
  cursor: pointer;
}
.job-div{
  position: absolute;
}
.bag {
  position: absolute;
  top: 35%;
  left: 22%;
}
.footer {
  position: fixed;
  bottom: 0;
  width: 50%;
}
.sys-area {
  /* height: 400px; */
}
</style>
