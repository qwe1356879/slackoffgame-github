<template>
    <div>
        <div class="map-top">
            <div class="danger">
                <div class="monster" v-for="i in 4">
                    <img :src="`src/assets/icons/map/${state.icons.normal}.png`"/>
                </div>
                 <div class="monster">
                    <img :src="`src/assets/icons/map/${state.icons.boss}.png`"/>
                </div>
            </div>
            <div class="player" :style="{'left':playleft,'background-position':playerposition}">
                
            </div>
            <div class="progress-bar"></div>
            <div class="final-fight">
                <el-button @click="stopfight">结束挑战</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, toRefs,ref,computed,onMounted,onUnmounted} from 'vue'
function add(){
    var args = arguments,//获取所有的参数
        lens = args.length,//获取参数的长度
        d = 0,//定义小数位的初始长度，默认为整数，即小数位为0
        sum = 0//定义sum来接收所有数据的和
    //循环所有的参数
    for(var key in args){//遍历所有的参数
        //把数字转为字符串
        var str = ""+args[key];
        if(str.indexOf(".")!=-1){//判断数字是否为小数
            //获取小数位的长度
            var temp = str.split(".")[1].length;
            //比较此数的小数位与原小数位的长度，取小数位较长的存储到d中
            d = d < temp ? temp : d;
        }
    }
    //计算需要乘的数值
    var m = Math.pow(10,d);
    //遍历所有参数并相加
    for(var key in args){
        sum += args[key]*m;
    }
    //返回结果
    return sum/m;

}
export default {
    setup () {
        const state = reactive({
                icons:{
                    normal:'monster',
                    boss:'boss',
                    player:'player-s'
                }
        })
        const player = ref(null)
        let playleft=ref('0%')
        let left = ref(0)
        let playerposition=ref('0px 96px')
        let one =ref(0)
        let timer = ref(null)
        onMounted(() => {
        //    clearInterval(timer);
        walk()
        })
        function walk(){
        timer = setInterval(() => {
     changeleft(0.2);
     changewalk()
        }, 45);
        }
        //  clearInterval(timer)
        //             console.log('战斗')
        //         setTimeout(() => {
        //                 walk()
        //             }, 1000);
        //14.1 14 14.4
        function changeleft(speed){
            // left.value+=0.2
            left.value=add(left.value,speed)
            // console.log('left.value',left.value)
            if(left.value<=100){
                playleft.value=left.value+'%'
                if(left.value===14){
                    clearInterval(timer)
                    console.log('战斗1')
                setTimeout(() => {
                        walk()
                    }, 2000);
                }else if(left.value==34){
                      clearInterval(timer)
                    console.log('战斗2')
                setTimeout(() => {
                        walk()
                    }, 2000);
                }else if(left.value==54){
                    clearInterval(timer)
                    console.log('战斗3')
                setTimeout(() => {
                        walk()
                    }, 2000);
                }else if(left.value==74){
                      clearInterval(timer)
                    console.log('战斗4')
                setTimeout(() => {
                        walk()
                    }, 2000);
                }else if(left.value==94){
                      clearInterval(timer)
                    console.log('战斗5')
                setTimeout(() => {
                        walk()
                    }, 2000);
                }
            }else{
                left.value=0
                playleft.value='0%'
            }
           
        }
        function changewalk(){
            one.value+=32
            if(one.value>100){
                one.value=0
                 playerposition.value='0px 96px'
            }else{
                  playerposition.value=one.value+'px'+' '+'96px'
            }
          
        }
        onUnmounted(() => {
            clearInterval(timer);
        })
        function stopfight(){
            console.log('stop')
            clearInterval(timer);
        }
        return {
            state,
            player,
            stopfight,
            playleft,
            playerposition
        }
    }
}
</script>

<style lang="scss" scoped>
.map-top{
    position: absolute;
    top: .8rem;
    width: calc(100% - 0.3rem);
    left: 0.15rem;
    height: 1rem;
    background: rgba(54,121,176,.68);
    text-align: center;
    font-size: .4rem;
    line-height: 1rem;
}
.progress-bar{
    position: absolute;
    top:40px;
    left: 10px;
    right: 10px;
    border: 1px solid #fff;
}
.danger{
    // text-align: center;
    display: flex;
    // justify-content:flex-end
}
.monster{
    width: 20%;
       text-align: right;
   
}
 .monster img{
        margin-right: 10px;
        // margin: 0 10px;
    }
.player{
    z-index: 2;
    height: 48px;
    width: 32px;
    background-repeat: no-repeat;
    background: url(../../assets/icons/map/player-s.png);
     position: absolute;
     top:-6px
    }
    .final-fight{
        margin-top: 1rem;
    }
</style>