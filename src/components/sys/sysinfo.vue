<template>
    <div class="sys">
        <div class="btn-text">
            <el-button>清除信息</el-button>
        </div>
        
        <div class="info-text">
        <p v-for="i in state.sysinfo" :style="{'color':i.color}" :key="i.text">
        {{i.sys}}({{i.time}}):{{i.text}}
        </p>
        </div>
      
    </div>
</template>

<script>
import { reactive, toRefs,watch,computed,ref,onBeforeUpdate,onUpdated,getCurrentInstance} from 'vue'
import { useStore } from 'vuex'
export default {
    setup () {
         const store = useStore()
         let item = getCurrentInstance()
        let state = reactive({
            sysinfo:store.state.sysinfolist
        })
      
        const getShowTask = computed(()=>{
	//返回的是ref对象
	return store.state.sysinfolist;
})
         watch(getShowTask,(newval,oldval)=>{
             if(newval){
                 let arr = newval
                   state.sysinfo=newval
                console.log('state',state.sysinfo)
            //       console.log('item',item)
            // item.ctx.$forceUpdate()
             }
          
         }, {deep:true})
        return {
            state,
            item
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
    --el-button-hover-border-color:none;
    --el-button-bg-color:none
}
</style>