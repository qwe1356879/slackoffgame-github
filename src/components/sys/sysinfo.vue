<template>
    <div class="sys">
        123
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue'

export default {
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

<style lang="scss" scoped>
.sys{
    border: 2px solid #ccc;
    margin: 0.2rem;
     height: 505px;
}
</style>