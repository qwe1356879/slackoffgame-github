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

    </div>
   
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue';
import userlevel from '../components/userdetail/userlevel.vue';
import userdetail from '../components/userdetail/userdetail.vue';
import sysinfo from '../components/sys/sysinfo.vue';
export default {
    components:{
       userlevel,
       userdetail,
       sysinfo
      },
    setup () {
        const state = reactive({
            count: 0,
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