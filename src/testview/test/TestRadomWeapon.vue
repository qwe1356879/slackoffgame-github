<template>
<div class="bg">
    <div class="btn">
         <el-button type="primary" @click="create">随机生成武器</el-button>
         <!-- <img src="../../assets/icons/myequip/weapon/1_(1).png" alt=""> -->
    </div>
    
<div class="weapon-tab" :style="{'box-shadow':weaponitem.weapon.color}" v-if="weaponitem.weapon.name">
        <div class="first">
            <div class="img">
                <div class="out-box" :style="{'box-shadow':weaponitem.weapon.color}">
                    
                    <img :src="`../../src/assets/icons/myequip/weapon/${weaponitem.weapon.imgurl}.png`" alt="">
                    <!-- <img src=" ../src/assets/icons/myequip/weapon/1(1).png" alt=""> -->
                </div>
            </div>
            <div class="name-arae">
                <p :style="{'color':weaponitem.weapon.fontcolor}">{{weaponitem.weapon.name}}</p>
            </div>
        </div>
        <div class="c">
            <el-divider />
        </div>
        
        <div class="second">
            <div class="type">
                <p :style="{'color':weaponitem.weapon.fontcolor}">{{weaponitem.weapon.qualityname}}</p>
                <p :style="{'color':weaponitem.weapon.fontcolor}">{{weaponitem.weapon.type}}</p>
            </div>
            
             <div class="dps">
                 <p :style="{'color':weaponitem.weapon.fontcolor}">lv{{weaponitem.weapon.lv}}</p>
                <!-- <p :style="{'color':weapon.fontcolor}">DPS:123</p> -->
            </div>
            <div class="jichu">
                 <p v-for="(itemdmg,index) in weaponitem.weapon.dmglist" :key="index">
                    <span v-for="(key,val) in itemdmg" :key="key">{{val}}：{{key}}</span>
                </p>
            </div>
             <div class="divider">
            <el-divider />
        </div>
            <div class="citiao">
                <p v-for="(item,index) in weaponitem.weapon.extraList" :key="index">
                    <span v-for="(key,val) in item" :key="key">{{val}}：{{key}}</span>
                </p>
            </div>
        </div>
        <div class="divider">
            <el-divider />
        </div>
        <div class="intro">
            <p style="color:#ccc">{{weaponitem.weapon.intro}}</p>
        </div>
    </div>
</div>
    
     <!-- <img :src="`src/assets/weapon/${weapon.imgurl}.png`" alt="">
         -->
</template>

<script>
import { reactive, toRefs,onMounted } from 'vue'
import crateWeapon from '../../assets/config/weaponconfig'

export default {
   
    setup () {
        const state = reactive({
            count: 0,
        })
        const weaponitem = reactive({
            weapon:{

            },
            list:[]
        })
         function create(){
             weaponitem.weapon = crateWeapon(60,'N',1)
            
            //  weaponitem.list=[]
            // var n=0,r=0,sr=0,ssr=0,sp=0
            //  for(let i=0;i<10;i++){
            // weaponitem.weapon = crateWeapon(1,'N',5)
                   
            //  weaponitem.list.push(crateWeapon(1,'N',5))
         
            //  }
            //  for(let j=0;j<weaponitem.list.length;j++){
            //      if(weaponitem.list[j].qualityname=='N'){
            //            n+=1
            //      }else if(weaponitem.list[j].qualityname=='R'){
            //             r+=1
            //      }else if(weaponitem.list[j].qualityname=='SR'){
            //             sr+=1
            //      }else if(weaponitem.list[j].qualityname=='SSR'){
            //             ssr+=1
            //      }else if(weaponitem.list[j].qualityname=='SP'){
            //          sp+=1
            //      }
            //  }
            //  console.log('10次难度1级副本最终BOSS掉落武器样本')
            //  console.log('N:',n)
            //  console.log('R:',r)
            //  console.log('SR:',sr)
            //  console.log('SSR:',ssr)
            //  console.log('SP:',sp)
        }

        return {
            weaponitem,
            create,
            // ...toRefs(weaponitem),
            ...toRefs(state),
        }
    }
}
</script>

<style lang="scss" scoped>
.bg{
    height: 100vh;
    background-color: #111;
}
.weapon-tab{
    position: absolute;
    top: 30%;
    left: 42%;
    // margin: 0 auto;
    width: 300px;
    border-radius: 8px;
    // margin-top: 10%;
}
.first{
    display: flex;
    padding: 18px;
}
.img{
    width: 15%;
}
.name-arae{
    width: 85%;
}
.name-arae p{
    text-align: left;
    line-height: 45px;
    text-indent: 20px;
}
.out-box{
    border-radius: 8px;
    width: 45px;
    height: 45px;
    text-align: center;
}
.out-box img{
//    margin-top: 5px;
padding:2px;
width: 45px;
}

.el-divider--horizontal{
    margin: 0 auto;
    width: 90%;
    
}
.type{
    display: flex;
}
.type p{
    width: 50%;
    padding-top: 8px;
    // padding-bottom: 8px;
}
.type p:nth-child(1){
    text-indent: 25px;
}
.type p:nth-child(2){
    text-align: right;
    padding-right: 20px;
}
.intro{
    padding: 10px 0;
}
.intro p{
    // text-indent: 20px;
    padding:3px 12px;
}
.dps p{
    padding-top: 2px;
    padding-bottom: 2px;
 padding-right: 20px;
 text-align: right;
}
.jichu p{
    text-indent: 24px;
    color: rgb(173, 173, 173);
    padding: 4px 0;
}
.citiao {
    padding-top: 8px;
    padding-bottom: 8px;
}
.citiao p{
    text-indent: 24px;
    color: rgb(52, 52, 228);
    padding: 4px 0;
}
.citiao {
    padding-bottom: 8px;
}
.btn{
    text-align: center;
    // padding-top: 38%;
}
</style>