<template>
    <div class="main">
        <el-tooltip placement="bottom">
            <template #content>
                <div class="equip-area">
                    123
                </div>
            </template>
            <div class="equipment">
            <div class="border" :style="{'box-shadow':userdata.weapon.color}">
                <img :src="`../../src/assets/icons/myequip/weapon/${userdata.weapon.imgurl}.png`"/>
            </div>
            <p>{{userdata.weapon.name}}</p>
        </div>

            </el-tooltip>
      
        <div class="equipment">
            <div class="border" :style="{'box-shadow':userdata.armo.color}">
                <img :src="`../../src/assets/icons/myequip/armo/${userdata.armo.imgurl}.png`"/>
            </div>
            <p>{{userdata.armo.name}}</p>
        </div>

        <div class="equipment">
             <div class="border" :style="{'box-shadow':userdata.left.color}">
                <img :src="`../../src/assets/icons/myequip/left/${userdata.left.imgurl}.png`"/>
            </div>
            <p>{{userdata.left.name}}</p>
        </div>

        <div class="equipment">
            <div class="border" :style="{'box-shadow':userdata.right.color}">
                <img :src="`../../src/assets/icons/myequip/right/${userdata.right.imgurl}.png`"/>
            </div>
            <p>{{userdata.right.name}}</p>
        </div>
    </div>
</template>

<script setup>
import { reactive, toRefs,onMounted,computed,watch} from 'vue'
import { useStore } from 'vuex'
const store = useStore()
let userdata=reactive({
    weapon:{},
    armo:{},
    left:{},
    right:{}
})
// onMounted(() => {
//     getUserEquipment()
// })
  const getShowTask = computed(()=>{
	//返回的是ref对象
	return store.state.userinfo;
})
         watch(getShowTask,(newval,oldval)=>{
              userdata.weapon=newval.equipments[0].weapon
    userdata.armo=newval.equipments[1].armo
    userdata.left=newval.equipments[2].left
    userdata.right=newval.equipments[3].right
         }, {deep:true})

</script>

<style lang="scss" scoped>
.equipment{
    display: flex;
    margin:1rem;
}
.border {
 width: 50px;
 height: 50px;
 border-radius: 8px;
 
//  box-shadow: rgb(255 0 255) 0px 0px 7px 2px inset;
}
.border img{
    margin: .4rem auto;
    width: 40px;
}
.equipment  p{
    width: 70%;
    text-align: left;
    font-size: 18px;
    line-height: 53px;
    text-indent: 15px;
}

.equip-area{
    
}
</style>