<template>
   <div class="hp-area">
      <div class="icon-area"  >
        
        <div :style="{width:wd.value+'%'}">
           <span>人物经验:{{ store.state.userinfo.exp }}/{{ store.state.userinfo.needexp }}</span>
        </div>
       
      </div>
    
    </div>


</template>

<script>
import { reactive, toRefs,computed,watch,ref} from 'vue'
import { useStore } from 'vuex'
export default {
  setup() {
    const store = useStore()
    const wd = ref(0)
    const wd2= computed(() => {
      //返回的是ref对象
      let x = (store.state.userinfo.exp/store.state.userinfo.needexp)*100
      return x.toFixed(0);
    });
    watch(
      wd2,
      (newval, oldval) => {
        wd.value=newval
      },
      { immediate: true, deep: true }
    );
    console.log('wd',wd.value)
    return {
      store,
      wd
    }
  }
}
</script>

<style lang="scss" scoped>
.hp-area {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    // background-color: rgba(0, 110, 255, 0.877);
}

.icon-area {
   white-space: nowrap;
  overflow: hidden;
  font-size: 1.3rem;
  width: 100%;
}



</style>