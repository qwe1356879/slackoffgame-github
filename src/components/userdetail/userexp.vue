<template>
   <div class="hp-area">
      <div class="icon-area">
        <p>人物经验:{{ store.state.userinfo.exp }}/{{ store.state.userinfo.needexp }}</p>
      </div>
    
    </div>


</template>

<script>
import { reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
export default {
  setup() {
    const store = useStore()
    return {
      store
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
}

.icon-area {
 
   white-space: nowrap;
  overflow: hidden;

  font-size: 1.3rem;
  
}



</style>