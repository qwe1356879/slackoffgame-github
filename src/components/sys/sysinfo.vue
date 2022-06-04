<template>
    <div class="sys">
        <div class="btn-text">
            <el-button @click="clearaall">清除信息</el-button>
        </div>

        <div class="info-text">
            <p v-for="i in state.sysinfo" :style="{ 'color': i.color }" :key="i.text">
                {{ i.sys }}({{ i.time }}):{{ i.text }}
            </p>
        </div>

    </div>
</template>

<script>
import { reactive, toRefs, watch, computed, ref, onBeforeUpdate, onUpdated, getCurrentInstance } from 'vue'
import { useStore } from 'vuex'
import { ElNotification } from 'element-plus'
export default {
    setup() {
        const store = useStore()
        let item = getCurrentInstance()
        let state = reactive({
            sysinfo: store.state.sysinfolist
        })
        const getShowTask = computed(() => {
            //返回的是ref对象
            return store.state.sysinfolist;
        })
        watch(getShowTask, (newval, oldval) => {
            if (newval) {
                let arr = newval
                state.sysinfo = newval
            }

        }, { deep: true })

        function clearaall() {
            store.commit('clearallsysinfo')
        }
        return {
            state,
            item,
            clearaall
        }
    }
}
</script>

<style lang="scss" scoped>
.sys {
    border: 2px solid #ccc;
    margin: 0.2rem;
    height: 505px;
    overflow-y: scroll;
}

.info-text {
    padding: .5rem
}

.info-text p {
    padding: .3rem
}

.btn-text {
    text-align: right;
    position: sticky;
    top: 0px;

    // background-color:rgba(255, 255, 255, 0.055);
}

.btn-text:deep(.el-button) {
    border: none;
    color: #fff;
    --el-button-hover-text-color: #fff;
    --el-button-hover-bg-color: none;
    --el-button-hover-border-color: none;
    --el-button-bg-color: none
}
</style>