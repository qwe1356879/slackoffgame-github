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
   
    <div class="back">
      <div class="border">
        <!-- <div v-for="di in joblist" :style="di.style" v-if="joblist">
            <div class="img" :style="di.imagestyle">
                <img :src="`src/assets/icons/menu/${di.imgurl}.png`"/>
            </div>
            <div class="divider">
            <el-divider />
        </div>
        <p>lv{{di.lv}}</p>
        </div> -->
    </div>
    </div>
   
  </div>
</template>

<script>
import { reactive, toRefs,onMounted} from 'vue';
import userlevel from '../components/userdetail/userlevel.vue';
import userdetail from '../components/userdetail/userdetail.vue';
import sysinfo from '../components/sys/sysinfo.vue';
import createJob from '../assets/config/monsterconfig'
export default {
    components:{
       userlevel,
       userdetail,
       sysinfo
      },
    setup () {
        const state = reactive({
            joblist:[]
        })
        onMounted(() => {
            state.joblis=[]
           state.joblist=createJob(10,2)
        })
        return {
            ...toRefs(state),
        }
    }
}
</script>

<style  scoped>
@import "../assets/css/index.scss";
</style>