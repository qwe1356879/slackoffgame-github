<template>
    <div ref="fightref">
        <div class="map-top">
            <div class="danger">
                <div class="monster" v-for="i in 4">
                    <img :src="`src/assets/icons/map/${state.icons.normal}.png`" />
                </div>
                <div class="monster">
                    <img :src="`src/assets/icons/map/${state.icons.boss}.png`" />
                </div>
            </div>
            <div class="player" :style="{ 'left': playleft, 'background-position': playerposition }">

            </div>
            <div class="progress-bar"></div>
            <div class="final-fight">
                <el-button @click="stopfight">结束挑战</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, toRefs, ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useStore } from 'vuex'
function add() {
    var args = arguments,//获取所有的参数
        lens = args.length,//获取参数的长度
        d = 0,//定义小数位的初始长度，默认为整数，即小数位为0
        sum = 0//定义sum来接收所有数据的和
    //循环所有的参数
    for (var key in args) {//遍历所有的参数
        //把数字转为字符串
        var str = "" + args[key];
        if (str.indexOf(".") != -1) {//判断数字是否为小数
            //获取小数位的长度
            var temp = str.split(".")[1].length;
            //比较此数的小数位与原小数位的长度，取小数位较长的存储到d中
            d = d < temp ? temp : d;
        }
    }
    //计算需要乘的数值
    var m = Math.pow(10, d);
    //遍历所有参数并相加
    for (var key in args) {
        sum += args[key] * m;
    }
    //返回结果
    return sum / m;

}

export default {
    setup() {
        const state = reactive({
            icons: {
                normal: 'monster',
                boss: 'boss',
                player: 'player-s'
            },
            show: false
        })
        const player = ref(null)
        let playleft = ref('0%')
        let left = ref(0)
        let playerposition = ref('0px 96px')
        let one = ref(0)
        let timer = ref(null)
        const fightref = ref(null)
        const store = useStore()
        const getShowTask = computed(() => {
            //返回的是ref对象
            return store.state.showfight;
        })
        const getShowHp = computed(() => {
            //返回的是ref对象
            return store.state.userinfo.NowHp;
        })
        watch(getShowTask, (newval, oldval) => {
            if (newval) {
                state.show = true
                walk()
            } else {
                state.show = false
            }
        }, { immediate: true, deep: true })
        watch(getShowHp, (newval, oldval) => {
            if(newval<=0){
                onUnmounted(()=>{
                    clearInterval(timer)
                })
                // clearInterval(timer)
                // console.log('timer',timer)
                // store.commit('changeFightState')
                // let myDate = new Date();
                // let str = myDate.toTimeString(); //"10:55:24 GMT+0800 (中国标准时间)"
                // let timeStr = str.substring(0, 8);
                // store.state.userinfo.NowHp=0

                //  let sysinfo = {
                //         sys: '系统',
                //         time: timeStr,
                //         text: '挑战失败,',
                //         color: '#67C23A',
                //         ifequipment: false,
                //         equipmentinfo: {}
                //     }
                //     store.commit('addsysinfo', sysinfo)
                //     //  stopfight()
                //       store.commit('userrecoverhp',0.02)
            }else{
                if (newval<store.state.userinfo.MaxHp) {
                store.commit('userrecoverhp',0.02)
                } else {
                console.log('回满血了')
                }
            }
          
        }, { deep: true })
        function walk() {
            // clearInterval(timer)
            timer = setInterval(() => {
                changeleft(0.2);
                changewalk()
            }, 45);
        }
        function changeleft(speed) {
            
            let myDate = new Date();
            let str = myDate.toTimeString(); //"10:55:24 GMT+0800 (中国标准时间)"
            let timeStr = str.substring(0, 8);
            // left.value+=0.2
            left.value = add(left.value, speed)
            // console.log('left.value',left.value)
            if (left.value <= 100) {
                playleft.value = left.value + '%'
                if (left.value === 16) {
                    clearInterval(timer)
                    let sysinfo = {
                        sys: '系统',
                        time: timeStr,
                        text: '遭遇怪物1,开始战斗!',
                        color: '#67C23A',
                        ifequipment: false,
                        equipmentinfo: {}
                    }
                    store.commit('addsysinfo', sysinfo)
                    setTimeout(() => {
                        let fightinfo = {
                            sys: '系统',
                            time: timeStr,
                            text: '遭遇怪物袭击,受到12点伤害',
                            color: '#FF5511',
                            ifequipment: false,
                            equipmentinfo: {}
                        }
                        store.state.userinfo.NowHp-=120
                        store.commit('addsysinfo', fightinfo)
                    }, 1000);
                   

                    setTimeout(() => {
                        walk()
                    }, 2000);

                } else if (left.value == 36) {
                    clearInterval(timer)
                    let sysinfo = {
                        sys: '系统',
                        time: timeStr,
                        text: '遭遇怪物2,开始战斗!',
                        color: '#67C23A',
                        ifequipment: false,
                        equipmentinfo: {}
                    }
                    store.commit('addsysinfo', sysinfo)
                    setTimeout(() => {
                        let fightinfo = {
                            sys: '系统',
                            time: timeStr,
                            text: '遭遇怪物袭击,受到12点伤害',
                            color: '#FF5511',
                            ifequipment: false,
                            equipmentinfo: {}
                        }
                        store.state.userinfo.NowHp-=24
                        store.commit('addsysinfo', fightinfo)
                    }, 1000);
                    setTimeout(() => {
                        walk()
                    }, 2000);
                } else if (left.value == 56) {
                    clearInterval(timer)
                    let sysinfo = {
                        sys: '系统',
                        time: timeStr,
                        text: '遭遇怪物3,开始战斗!',
                        color: '#67C23A',
                        ifequipment: false,
                        equipmentinfo: {}
                    }
                    store.commit('addsysinfo', sysinfo)

                    setTimeout(() => {
                        let fightinfo = {
                            sys: '系统',
                            time: timeStr,
                            text: '遭遇怪物袭击,受到12点伤害',
                            color: '#FF5511',
                            ifequipment: false,
                            equipmentinfo: {}
                        }
                        store.state.userinfo.NowHp-=36
                        store.commit('addsysinfo', fightinfo)
                    }, 1000);

                    setTimeout(() => {
                        walk()
                    }, 2000);
                } else if (left.value == 76) {
                    clearInterval(timer)
                    let sysinfo = {
                        sys: '系统',
                        time: timeStr,
                        text: '遭遇怪物4,开始战斗!',
                        color: '#67C23A',
                        ifequipment: false,
                        equipmentinfo: {}
                    }
                    store.commit('addsysinfo', sysinfo)
                    setTimeout(() => {
                        let fightinfo = {
                            sys: '系统',
                            time: timeStr,
                            text: '遭遇怪物袭击,受到12点伤害',
                            color: '#FF5511',
                            ifequipment: false,
                            equipmentinfo: {}
                        }
                        store.commit('addsysinfo', fightinfo)
                    }, 1000);

                    setTimeout(() => {
                        walk()
                    }, 2000);
                } else if (left.value == 96) {
                    clearInterval(timer)
                    let sysinfo = {
                        sys: '系统',
                        time: timeStr,
                        text: '遭遇最终Boss,开始战斗!',
                        color: '#67C23A',
                        ifequipment: false,
                        equipmentinfo: {}
                    }
                    store.commit('addsysinfo', sysinfo)
                    setTimeout(() => {
                        let fightinfo = {
                            sys: '系统',
                            time: timeStr,
                            text: '遭遇怪物袭击,受到12点伤害',
                            color: '#FF5511',
                            ifequipment: false,
                            equipmentinfo: {}
                        }
                         store.state.userinfo.NowHp-=120
                        store.commit('addsysinfo', fightinfo)
                    }, 1000);
                }
            } else {
                clearInterval(timer)
                left.value = 0
                playleft.value = '0%'
            }

        }
        function changewalk() {
            one.value += 32
            if (one.value > 100) {
                one.value = 0
                playerposition.value = '0px 96px'
            } else {
                playerposition.value = one.value + 'px' + ' ' + '96px'
            }

        }
        onUnmounted(() => {
            console.log('销毁了')
            clearInterval(timer)
        })
        function stopfight() {
            store.commit('changeFightState')
        }
        return {
            state,
            player,
            stopfight,
            playleft,
            playerposition,
            fightref,
        }
    }
}
</script>

<style lang="scss" scoped>
.map-top {
    position: absolute;
    top: .8rem;
    width: calc(100% - 0.3rem);
    left: 0.15rem;
    height: 1rem;
    background: rgba(54, 121, 176, .68);
    text-align: center;
    font-size: .4rem;
    line-height: 1rem;
}

.progress-bar {
    position: absolute;
    top: 40px;
    left: 10px;
    right: 10px;
    border: 1px solid #fff;
}

.danger {
    // text-align: center;
    display: flex;
    // justify-content:flex-end
}

.monster {
    width: 20%;
    text-align: right;

}

.monster img {
    margin-right: 10px;
    // margin: 0 10px;
}

.player {
    z-index: 2;
    height: 48px;
    width: 32px;
    background-repeat: no-repeat;
    background: url(../../assets/icons/map/player-s.png);
    position: absolute;
    top: -6px
}

.final-fight {
    margin-top: 1rem;
}

.final-fight:deep(.el-button) {
    color: #fff !important;
    --el-button-hover-text-color: none;
    --el-button-hover-bg-color: none;
    --el-button-hover-border-color: none;
    background-color: #000;
}
</style>