<template>
<div class="bg">
<div class="weapon-tab" :style="{'box-shadow':weaponlist[0].color}">
        <div class="first">
            <div class="img">
                <div class="out-box" :style="{'box-shadow':weaponlist[0].color}">
                    <img :src="`src/assets/weapon/${weaponlist[0].imgurl}.png`" alt="">
                </div>
            </div>
            <div class="name-arae">
                <p :style="{'color':weaponlist[0].fontcolor}">{{weaponlist[0].name}}</p>
            </div>
        </div>
        <div class="divider">
            <el-divider />
        </div>
        
        <div class="second">
            <div class="type">
                <p :style="{'color':weaponlist[0].fontcolor}">{{weaponlist[0].qualityname}}</p>
                <p :style="{'color':weaponlist[0].fontcolor}">{{weaponlist[0].type}}</p>
            </div>
            
             <div class="dps">
                 <p :style="{'color':weaponlist[0].fontcolor}">lv{{weaponlist[0].lv}}</p>
                <!-- <p :style="{'color':weaponlist[0].fontcolor}">DPS:123</p> -->
            </div>
            <div class="jichu">
                 <p v-for="(itemdmg,index) in weaponlist[0].dmglist">
                    <span v-for="(key,val) in itemdmg">{{val}}：{{key}}</span>
                </p>
            </div>
             <div class="divider">
            <el-divider />
        </div>
            <div class="citiao">
                <p v-for="(item,index) in weaponlist[0].extraList">
                    <span v-for="(key,val) in item">{{val}}：{{key}}</span>
                </p>
            </div>
        </div>
        <div class="divider">
            <el-divider />
        </div>
        <div class="intro">
            <p style="color:#ccc">{{weaponlist[0].intro}}</p>
        </div>
    </div>
</div>
    
     <!-- <img :src="`src/assets/weapon/${weaponlist[0].imgurl}.png`" alt="">
         -->
</template>

<script>
import { reactive, toRefs } from 'vue'
import weaponlist from '../../assets/config/weaponconfig'
export default {
    setup () {
        const state = reactive({
            count: 0,
        })
    
        return {
            weaponlist,
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
    left: 40%;
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
   margin-top: 5px;
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
    text-indent: 20px;
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
</style>