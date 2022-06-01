<template>
    <div class="sys">
        <div class="btn-text">
            <el-button>清除信息</el-button>
        </div>
        
        <div class="info-text">
              <p v-for="i in sysinfo" :style="{'color':i.color}">
        {{i.sys}}({{i.time}}):{{i.text}}
        </p>
        </div>
      
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
export default {
    setup () {
         const store = useStore()
        const state = reactive({
            sysinfo:store.state.sysinfolist
        })
       

        return {
            ...toRefs(state),
        }
    }
}
</script>

<style lang="scss" scoped>
.sys{
    border: 2px solid #ccc;
    margin: 0.2rem;
    height: 505px;
}
.info-text{
    padding:.5rem
}
.info-text p{
    padding:.3rem
}
.btn-text{
    text-align: right;
}
.btn-text:deep(.el-button){
    border:none;
    color: #fff;
    --el-button-hover-text-color:#fff;
    --el-button-hover-bg-color:none;
    --el-button-hover-border-color:none
}
</style>