<template>
     <el-drawer v-model="updatedrawer" title="新手教程" direction="rtl">
        <div class="drawer-div" v-for="x in updatelist">
            <p  class="text">
                {{x.q}}
            </p>
            <p  class="an">
                {{x.a}}
            </p>
           
            <el-divider />
        </div>
    </el-drawer>
</template>

<script>
import { reactive, toRefs,computed,watch } from 'vue'
import { updatelist } from '../../assets/codedata/gudie'
import { useStore } from "vuex";
export default {
    setup () {
        const store = useStore();
       const state = reactive({
           updatedrawer:false
       })
    const showUpdate= computed(() => {
      //返回的是ref对象
      return store.state.guideDrawer;
    });
     watch(
      showUpdate,
      (newval, oldval) => {
        state.updatedrawer=newval
      },
      { immediate: true, deep: true }
    );
    
        return {
            ...toRefs(state),
            updatelist
        }
    }
}
</script>

<style lang="scss" scoped>
.an{
    color: blue;
    padding-top: 12px;
}
</style>