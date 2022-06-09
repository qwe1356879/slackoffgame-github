<template>
     <el-drawer v-model="updatedrawer" title="更新日志" direction="rtl">
        <div class="drawer-div" v-for="x in updatelist">
            <p class="title">更新日期:{{ x.date }}</p>
            <p v-for="(y, index) in x.detail" class="text">
                {{ index + 1 }}.{{ y }}
            </p>
            <p class="author">{{ x.author }}</p>
            <el-divider />
        </div>
    </el-drawer>
</template>

<script>
import { reactive, toRefs,computed,watch } from 'vue'
import { updatelist } from '../../assets/codedata/update'
import { useStore } from "vuex";
export default {
    setup () {
        const store = useStore();
       const state = reactive({
           updatedrawer:false
       })
    const showUpdate= computed(() => {
      //返回的是ref对象
      return store.state.updateDrawer;
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

</style>