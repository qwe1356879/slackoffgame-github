<template>
    <div class="info-dialog">

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
.info-dialog{
    z-index: 2;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    width: 3.5rem;
    background: rgba(0,0,0,.7);
    border-radius: 4px;
    border: 2px solid #ccc;
    height: 3.5rem;
    padding: 0.1rem;
}
</style>