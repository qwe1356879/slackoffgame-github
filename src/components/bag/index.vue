<template>
  <div class="bag-bg" v-if=store.state.showBag>
    <div class="item-bg">
      <div class="grid-single" v-for="i in 64" :style="{'box-shadow':store.state.userinfo.equipments[0].weapon.color}" @mousedown="mousedown">
         <img :src="`../../src/assets/icons/myequip/armo/1_(1).png`" alt="">
      </div>
      <div>
        <div class="close-btn">
          <img src='../../assets/icons/close.png' @click="closebag"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {reactive,ref} from "vue";
import {useStore} from "vuex";

export default {
  name: "Package",
  setup(){
    const capacity = ref(10);
    const equipList = reactive({
      list:[]
    })
    const store = useStore();

    function closebag(){
      store.commit('changeShowBag')
    }
    function mousedown(){
      console.log('123')
    }
    return({
      store,
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
    /* background-color: aqua; */
    justify-content: flex-start;
    align-content: flex-start;
    flex-wrap:wrap;
    /* display: grid; */
    /*background-color: white;*/
    /*opacity: 50%;*/
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