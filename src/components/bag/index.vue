<template>
  <div class="bag-bg" v-if=store.state.showBag>
    <div class="item-bg">
      <div class="grid-single" v-for="i in 64" :style="{'box-shadow':store.state.userinfo.equipments[0].weapon.color}" @mousedown="mousedown(i)">
         <img :src="`/icons/myequip/armo/1_(1).png`" alt="">
        
      </div>
      <div>
        <div class="close-btn">
          <img src='/icons/close.png' @click="closebag"/>
        </div>
      </div>
    </div>
     <rightselect :menulist="equipList.menulist" v-if="equipList.rightstate" :bagitem="equipList.bagitem"></rightselect>
    
  </div>
</template>

<script>
import {reactive,ref} from "vue";
import {useStore} from "vuex";
import rightselect from "./rightselect.vue";
import MonitorFocus from '../../assets/tool/mouseutil'
export default {
  name: "Package",
  components:{
    rightselect
  },
  setup(){
    const capacity = ref(10);
    const x = ref(0)
    const y=ref(0)
    const equipList = reactive({
      list:[],
      rightstate:false,
      menulist:[
        {
          title:'强化',
          value:'intensify'
        },
        {
          title:'出售',
          value:'sell'
        },
        {
          title:'more……',
          value:'more'
        },
      ],
      bagitem:{
        
      }
    })
    const store = useStore();

    function closebag(){
      store.commit('changeShowBag')
    }
    function MovementTrigger(e) {
        //事件触发时给x y 赋值
        x.value = e.pageX;
        y.value = e.pageY;
    }
    function mousedown(item){
       window.addEventListener("mousedown", MovementTrigger)
       console.log('x',x.value)
      equipList.bagitem.y =y
      equipList.bagitem.x =x
      equipList.bagitem.item=item
      equipList.rightstate=!equipList.rightstate
    }
    return({
      store,
      equipList,
      closebag,
      mousedown
    })
  }
}
</script>

<style scoped>
  .bag-bg{
    width: 60%;
    height: 45%;
    background-image: url("/src/assets/icons/images/1_爱给网_aigei_com(1).png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    z-index: 2;
  }
  .bg-img{
    width: 100%;
    height: 100%;
    z-index: 3;
  }
  .item-bg{
    margin: 70px auto;
    width: 85%;
    height: 70%;
    display: flex;
    background-color: rgba(0, 0, 0, 0.212);
    overflow-y: scroll;
    overflow-x: hidden;
    border-radius: 8px;
    justify-content: flex-start;
    align-content: flex-start;
    flex-wrap:wrap;
  }
  .grid-single{
    width: calc(100% / 12);
    height: calc(100% / 6);
    margin:4px;
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.774);
  }
  .grid-single img{
    width: 90%;
    height: 90%;
    border-radius: 8px;
    margin: 2px 2px;
  }
  .close-btn{
    position: absolute;
    top: 12px;
    right: 5px;
  }
  .close-btn img{
    width: 24px;
    height: 24px;
  }
</style>