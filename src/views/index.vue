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
    
    </div>
   
    <div class="back" ref="backmaap">
      <div class="border">
        <div v-for="di in joblist" :style="di.style" v-if="joblist" @click="showdialog(di)">
            <div class="img" :style="di.imagestyle">
                <img :src="`src/assets/icons/menu/${di.imgurl}.png`"/>
            </div>
            <div class="divider">
            <el-divider />
        </div>
        <p class="job-p">lv{{di.lv}}</p>
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
import { reactive, toRefs,onMounted,ref} from 'vue';
import userlevel from '../components/userdetail/userlevel.vue';
import userdetail from '../components/userdetail/userdetail.vue';
import sysinfo from '../components/sys/sysinfo.vue';
import mymenu from '../components/menu/index.vue'
import {createJob,getDIVsize} from '../assets/config/monsterconfig'
import opendialog from '../components/opendialog/index.vue'
import userinfo from '../assets/config/userinfo'
export default {
    components:{
       userlevel,
       userdetail,
       sysinfo,
       mymenu,
       opendialog
      },
    setup () {
        const state = reactive({
            joblist:[],
            jobinfo:{}
        })
        const backmaap=ref(null)
        const mydialog = ref(null)
        onMounted(() => {           
           state.joblist=createJob(7,2,backmaap.value.offsetHeight,backmaap.value.offsetWidth)
          console.log('userinfo',userinfo)
        })
        function refreshjob(){
           state.joblist=createJob(7,2,backmaap.value.offsetHeight,backmaap.value.offsetWidth)
        }
        function showdialog(job){
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
.border{
  
    /* background-color: aquamarine; */
    width: 100%;
    height: 90%;
    margin: 0 auto;
    position: relative;
}
.img{
    margin: 0 auto;
    text-align: center;
    width: 43px;
    height: 43px;
 
}
.img img{
    padding-top: 8px;
}

.el-divider--horizontal{
    margin: 0 auto;
    width: 90%;
    
}
.job-p{
    text-align: center;
    padding-top: 3px;
    color: #fff;
}
.border div:hover{
  cursor: pointer;
}
</style>