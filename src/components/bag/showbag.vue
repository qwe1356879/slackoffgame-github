<template>
    <div class="border-euqip"
        :style="{ 'top': bagdata.mouseposi.y - 680 + 'px', 'left': bagdata.mouseposi.x-1160+ 'px', 'box-shadow': bagdata.color }">

        <div class="first">
            <div class="img">
                <div class="out-box" :style="{ 'box-shadow': bagdata.color }">
                    <img :src="`/icons/myequip${bagdata.imgurladd}.png`" alt="">
                </div>
            </div>
            <div class="name-arae">
                <p :style="{ 'color': bagdata.fontcolor }">{{ bagdata.name }}</p>
            </div>
        </div>
        <div class="c" v-if="bagdata.type!='药水'">
            <el-divider />
        </div>
       
            <div class="second">
            <div class="type">
                <p :style="{ 'color': bagdata.fontcolor }">{{ bagdata.qualityname }}</p>
                <p :style="{ 'color': bagdata.fontcolor }">{{ bagdata.type }}</p>
            </div>

            <div class="dps">
                <p :style="{ 'color': bagdata.fontcolor }">lv{{ bagdata.lv }}</p>
            </div>
            <div class="jichu" v-if="bagdata.type!='药水'">
                <p v-for="(itemdmg, index) in bagdata.dmglist" :key="index">
                    <span v-for="(key, val) in itemdmg" :key="key">{{ val }}：{{ key }}</span>
                </p>
            </div>
            <div class="divider" v-if="bagdata.type!='药水'">
                <el-divider />
            </div>
            <div class="citiao" v-if="bagdata.type!='药水'">
                <p v-for="(item, index) in bagdata.extraList" :key="index">
                    <span v-for="(key, val) in item" :key="key">{{ val }}：{{ key }}</span>
                </p>
            </div>

            <div class="hp" v-if="bagdata.type=='药水'">
                <p>生命恢复:+{{bagdata.recoverhp}}</p>
            </div>
        </div>
        <div class="divider" v-if="bagdata.type!='药水'">
            <el-divider />
        </div>
        <div class="intro" v-if="bagdata.type!='药水'">
            <p style="color:#ccc">{{ bagdata.intro }}</p>
        </div>
         <div class="divider">
            <el-divider />
        </div>
         <div class="price">
            <p>售价:{{bagdata.price}}金</p>
        </div>
        </div>
        <div>

        </div>
        

</template>

<script>
import { reactive, toRefs, defineComponent } from 'vue'

export default defineComponent(
    {
        props: {
            bagdata: Object
        },
        emits: [],
        setup(props) {
            return {
            }
        }
    }
)
</script>

<style lang="scss" scoped>
.border-euqip {
    position: relative;
    width: 250px;
    background: rgba(0, 0, 0, 0.808);
    border-radius: 12px;
    z-index: 3;
}

.first {
    display: flex;
    padding: 18px;
}

.img {
    width: 15%;
}

.name-arae {
    width: 85%;
}

.name-arae p {
    text-align: left;
    line-height: 45px;
    text-indent: 20px;
}

.out-box {
    border-radius: 8px;
    width: 45px;
    height: 45px;
    text-align: center;
}

.out-box img {
    //    margin-top: 5px;
    padding: 2px;
    width: 45px;
}

.el-divider--horizontal {
    margin: 0 auto;
    width: 90%;

}

.type {
    display: flex;
}

.type p {
    width: 50%;
    text-align: left;
    padding-top: 8px;
    // padding-bottom: 8px;
}

.type p:nth-child(1) {
    text-indent: 25px;
}

.type p:nth-child(2) {
    text-align: right;
    padding-right: 20px;
}

.intro {
    padding: 10px 0;
}

.intro p {
    // text-indent: 20px;
    padding: 3px 12px;
}

.dps p {
    padding-top: 2px;
    padding-bottom: 2px;
    padding-right: 20px;
    text-align: right;
}

.jichu p {
    text-align: left;
    text-indent: 24px;
    color: #fff;
    padding: 4px 0;
}

.citiao {
    padding-top: 8px;
    padding-bottom: 8px;
}

.citiao p {
    text-indent: 24px;
    color: rgb(52, 52, 228);
    padding: 4px 0;
    text-align: left;
}

.citiao {
    padding-bottom: 8px;
}
.hp{
    color: greenyellow;
     text-indent: 24px;
      padding-top: 8px;
    padding-bottom: 8px;
}
.price{
     
}
.price p{
    text-align: center;
    color: #fff;
    padding-top: 8px;
    padding-bottom: 8px;
   
}
</style>