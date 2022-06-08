<template>
    <div class="info-dialog" ref="dialog">
        <p class="title">当前副本:{{ jobinfo.job.lv }}_{{ jobinfo.job.type }}</p>
        <div class="detail-area">
            <p>推荐DPS:{{ jobinfo.job.dpsneed }}</p>
            <p>副本等级:{{ jobinfo.job.lv }}</p>
        </div>
        <p class="detail">
            当前副本难度等级:{{ jobinfo.job.type }}
        </p>
        <p v-for="info in infolist" class="info-list">
            {{ info }}
        </p>
        <img src='/icons/close.png' @click="closedialog" />

        <div class="btn-area">
            <div>
                <el-checkbox v-model="isrepat" label="重复挑战" size="large"
                    v-show="jobinfo.job.type === 'N' || jobinfo.job.type === 'R' || jobinfo.job.type === 'SR'" />
            </div>
            <div>
                <el-button @click="beginfight">开始挑战</el-button>
            </div>

        </div>
    </div>
</template>

<script>
import { reactive, toRefs, defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
let myDate = new Date();
let str = myDate.toTimeString(); //"10:55:24 GMT+0800 (中国标准时间)"
let timeStr = str.substring(0, 8);
export default defineComponent({

    setup() {
        const store = useStore()
        const infolist = reactive([
            '- 副本难度等级分为:N,R,SR,SSR,SP',
            '- 高难度副本仅能挑战一次(SSR,SP)',
            '- 难度越高爆率也相应提高'
        ])
        let jobinfo = reactive({
            job: {}
        })

        let visibility = ref(true)
        let isrepat = ref(false)
        const dialog = ref(null)
        function closedialog() {
            dialog.value.style.display = 'none'
        }
        function opendialog(job) {
            dialog.value.style.display = 'block'
            jobinfo.job = job
        }
        function beginfight() {
            store.commit('changeFightState')
            let sysinfo = {
                sys: '系统',
                time: timeStr,
                text: `开始挑战,副本难度:${jobinfo.job.lv},推荐DPS:${jobinfo.job.dpsneed}`,
                color: '#E63F00',
                ifequipment: false,
                equipmentinfo: {}
            }
            store.commit('addsysinfo', sysinfo)
            store.commit('deleteupjob', jobinfo.job)
            dialog.value.style.display = 'none'
        }
        return {
            infolist,
            closedialog,
            dialog,
            jobinfo,
            opendialog,
            visibility,
            isrepat,
            beginfight
        }
    }
})
</script>

<style lang="scss" scoped>
.info-dialog {
    z-index: 2;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width: 23rem;
    background: rgba(0, 0, 0, .7);
    border-radius: 4px;
    // border: 2px solid;
    height: 23rem;
    padding: 1rem;
    display: none;
}

img {
    position: absolute;
    width: 23px;
    height: 23px;
    top: 10px;
    right: 10px;
}

.title {
    margin-top: 0.1rem;
    font-size: 1.6rem;
    margin-bottom: 0.2rem;
    color: #fff;
}

.detail-area {
    display: flex;

}

.detail-area p {
    width: 50%;
    padding: .8rem;
    font-size: 1.1rem;
}

.detail-area p:nth-child(1) {
    color: #f02;
}

.detail-area p:nth-child(2) {
    color: #fff;
}

.info-list {
    font-size: 1rem;
    color: #ccc;
    padding-top: .8rem;
}

.detail {
    color: #fff;
    padding: .8rem;
    font-size: 1.1rem;
}

.btn-area {
    display: flex;
    padding: 1.8rem;
}

.btn-area div {
    width: 50%;
}

.btn-area .el-button {
    color: #fff;
    background: #000;
    border: 1px solid #fff;
    white-space: nowrap;
}

.btn-area div:nth-child(2) {
    margin: 3px auto;
}
</style>