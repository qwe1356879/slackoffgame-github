<template>
    <div class="main">
        <div class="equipment" v-on:mouseenter="mounseonter(userdata.weapon)"
            v-on:mouseleave="userdata.enterstate = false">
            <div class="border" :style="{ 'box-shadow': userdata.weapon.color }">
                <img :src="`/src/assets/icons/myequip/weapon/${userdata.weapon.imgurl}.png`" />
            </div>
            <p>{{ userdata.weapon.name }}</p>
        </div>
        <div class="equipment" v-on:mouseenter="mounseonter(userdata.armo)" v-on:mouseleave="userdata.enterstate = false">
            <div class="border" :style="{ 'box-shadow': userdata.armo.color }">
                <img :src="`/src/assets/icons/myequip/armo/${userdata.armo.imgurl}.png`" />
            </div>
            <p>{{ userdata.armo.name }}</p>
        </div>

        <div class="equipment" v-on:mouseenter="mounseonter(userdata.left)" v-on:mouseleave="userdata.enterstate = false">
            <div class="border" :style="{ 'box-shadow': userdata.left.color }">
                <img :src="`/src/assets/icons/myequip/left/${userdata.left.imgurl}.png`" />
            </div>
            <p>{{ userdata.left.name }}</p>
        </div>

        <div class="equipment" v-on:mouseenter="mounseonter(userdata.right)"
            v-on:mouseleave="userdata.enterstate = false">
            <div class="border" :style="{ 'box-shadow': userdata.right.color }">
                <img :src="`/src/assets/icons/myequip/right/${userdata.right.imgurl}.png`" />
            </div>
            <p>{{ userdata.right.name }}</p>
        </div>

        <showequipe :userdata="equipdata" v-if="userdata.enterstate"></showequipe>
    </div>
</template>

<script >
import { reactive, toRefs, onMounted, computed, watch, ref } from 'vue'
import { useStore } from 'vuex'
import showequipe from '../showequip/index.vue'
import MonitorFocus from '../../assets/tool/mouseutil'
export default ({
    components: {
        showequipe
    },
    setup() {

        const store = useStore()
        const { x, y } = MonitorFocus();
        let userdata = reactive({
            weapon: {},
            armo: {},
            left: {},
            right: {},
            enterstate: false,
            mouseposi: MonitorFocus()
        })
        let equipdata = ref({})

        const getShowTask = computed(() => {
            //返回的是ref对象
            return store.state.userinfo;
        })
        function mounseonter(data) {
            userdata.enterstate = true
            data.mouseposi = userdata.mouseposi
            if (data.type == '武器') {
                data.imgurladd = '/weapon/' + data.imgurl
            } else if (data.type == '护甲') {
                data.imgurladd = '/armo/' + data.imgurl
            } else if (data.type == '首饰') {
                data.imgurladd = '/left/' + data.imgurl
            } else {
                data.imgurladd = '/right/' + data.imgurl
            }
            equipdata.value = data
        }
        watch(getShowTask, (newval, oldval) => {
            userdata.weapon = newval.equipments[0].weapon
            userdata.armo = newval.equipments[1].armo
            userdata.left = newval.equipments[2].left
            userdata.right = newval.equipments[3].right
        }, { deep: true })
        return {
            userdata,
            mounseonter,
            equipdata
        }
    }
})

</script>

<style lang="scss" scoped>
.equipment {
    display: flex;
    margin: 1rem;
}

.border {
    width: 50px;
    height: 50px;
    border-radius: 8px;

    //  box-shadow: rgb(255 0 255) 0px 0px 7px 2px inset;
}

.border img {
    margin: .4rem auto;
    width: 40px;
}

.equipment p {
    width: 70%;
    text-align: left;
    font-size: 18px;
    line-height: 53px;
    text-indent: 15px;
    cursor: pointer;
}

.equip-area {}
</style>