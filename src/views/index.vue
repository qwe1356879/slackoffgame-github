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
        <fight ref="fight" v-if="show"></fight>
        <div v-for="di in joblist" :style="di.style" v-else @click="showdialog(di)">
          <div class="img" :style="di.imagestyle">
            <img :src="`../src/assets/icons/menu/${di.imgurl}.png`" />
          </div>
          <!-- <img src='/assets/icons/S_Holy01.png'/> -->
          <div class="divider">
            <el-divider />
          </div>
          <p class="job-p">lv{{ di.lv }}</p>
        </div>
        <opendialog ref="mydialog"></opendialog>
      </div>

      <div class="menu">
        <mymenu @refreshjob="refreshjob"></mymenu>
      </div>
    </div>


  </div>
</template>

<script>
import { reactive, toRefs, onMounted, ref, computed, watch, onBeforeMount } from 'vue';
import userlevel from '../components/userdetail/userlevel.vue';
import userdetail from '../components/userdetail/userdetail.vue';
import sysinfo from '../components/sys/sysinfo.vue';
import mymenu from '../components/menu/index.vue'
import { createJob, getDIVsize } from '../assets/config/monsterconfig'
import opendialog from '../components/opendialog/index.vue'
import myfooter from '../components/footer/index.vue'
import userinfo from '../assets/config/userinfo'
import { useStore } from 'vuex'
import fight from '../components/fight/index.vue';
import { ElNotification } from 'element-plus'
export default {
  components: {
    userlevel,
    userdetail,
    sysinfo,
    mymenu,
    opendialog,
    myfooter,
    fight
  },
  setup() {

    const store = useStore()
    const state = reactive({
      joblist: [],
      jobinfo: {},
      show: false
    })
    const backmaap = ref(null)
    const mydialog = ref(null)
    const getShowTask = computed(() => {
      //返回的是ref对象
      return store.state.showfight;
    })
    const getJobTask = computed(() => {
      //返回的是ref对象
      return store.state.joblist;
    })
    watch(getShowTask, (newval, oldval) => {
      if (newval) {
        state.show = true
      } else {
        state.show = false
      }
    }, { immediate: true, deep: true })
    watch(getJobTask, (newval, oldval) => {
      if (newval) {
        state.joblist = newval
      }
    })
    onMounted(() => {
      store.commit('loaduserdata')
      let data = {
        height: backmaap.value.offsetHeight,
        width: backmaap.value.offsetWidth
      }
      store.commit('createjoblist', data)
      state.joblist = store.state.joblist
    })
    function refreshjob() {
      let time = store.state.refreshjobtime
      if (time >= 1 && time < 5) {
        console.log('JOBCD')
        //       ElNotification ({
        //     title:'系统提示',
        //     type:'warning',
        //     duration:3000,
        //     message:`刷新任务处于CD中,剩余${store.state.refreshjobtime}秒`
        // })
      } else {
        let data = {
          height: backmaap.value.offsetHeight,
          width: backmaap.value.offsetWidth
        }
        store.commit('createjoblist', data)
        state.joblist = store.state.joblist
        ElNotification({
          title: '系统提示',
          type: 'success',
          duration: 3000,
          message: '刷新任务成功'
        })
        store.commit('addrefeshtime')
      }
    }
    function showdialog(job) {
      mydialog.value.opendialog(job)
    }
    return {
      ...toRefs(state),
      backmaap,
      refreshjob,
      showdialog,
      mydialog
    }
  }
}
</script>

<style  scoped>
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

.border div:hover {
  cursor: pointer;
}
</style>