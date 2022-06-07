<template>
    <div class="border-euqip" :style="{ 'top': userdata.mouseposi.y + 40 + 'px', 'left': userdata.mouseposi.x + 40 + 'px','box-shadow': userdata.color }">
        <div class="first">
            <div class="img">
                <div class="out-box" :style="{ 'box-shadow': userdata.color }">

                    <img :src="`../../src/assets/icons/myequip${userdata.imgurladd}.png`" alt="">
                    <!-- <img src=" ../src/assets/icons/myequip/weapon/1(1).png" alt=""> -->
                </div>
            </div>
            <div class="name-arae">
                <p :style="{ 'color': userdata.fontcolor }">{{ userdata.name }}</p>
            </div>
        </div>
        <div class="c">
            <el-divider />
        </div>

        <div class="second">
            <div class="type">
                <p :style="{ 'color': userdata.fontcolor }">{{ userdata.qualityname }}</p>
                <p :style="{ 'color': userdata.fontcolor }">{{ userdata.type }}</p>
            </div>

            <div class="dps">
                <p :style="{ 'color': userdata.fontcolor }">lv{{ userdata.lv }}</p>
                <!-- <p :style="{'color':weapon.fontcolor}">DPS:123</p> -->
            </div>
            <div class="jichu">
                <p v-for="(itemdmg, index) in userdata.dmglist" :key="index">
                    <span v-for="(key, val) in itemdmg" :key="key">{{ val }}：{{ key }}</span>
                </p>
            </div>
            <div class="divider">
                <el-divider />
            </div>
            <div class="citiao">
                <p v-for="(item, index) in userdata.extraList" :key="index">
                    <span v-for="(key, val) in item" :key="key">{{ val }}：{{ key }}</span>
                </p>
            </div>
        </div>
        <div class="divider">
            <el-divider />
        </div>
        <div class="intro">
            <p style="color:#ccc">{{ userdata.intro }}</p>
        </div>

    </div>
</template>

<script>
import { reactive, toRefs, defineComponent } from 'vue'

export default defineComponent(
    {
        props: {
            userdata:Object
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
    position: absolute;
    width: 250px;
    background: rgba(0, 0, 0, 0.808);
    border-radius: 12px;
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
</style>