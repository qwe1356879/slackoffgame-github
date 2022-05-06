<template>
  <div class="main">
    <el-row>
    <el-col :span="12"><div class="grid-content bg-purple">1</div></el-col>
    <el-col :span="12"><div class="grid-content bg-purple-light">2</div></el-col>
  </el-row>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue';

export default {
    components:{
       
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
.main{
    background: #111;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    color: #eee;
    height: 100%;
}
</style>