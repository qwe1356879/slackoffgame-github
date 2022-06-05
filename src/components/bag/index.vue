<template>
  <div class="bag-bg" v-if=store.state.showBag>
    <img class="bg-img" src="/src/assets/icons/images/1_爱给网_aigei_com(1).png">
    <div class="item-bg">
      <el-space wrap :size="22">
        <div  v-for="i in 36" :key="i">
          <div class="item">
            <img class="item-img" src="/src/assets/icons/myequip/weapon/1_(26).png" >
          </div>
        </div>
      </el-space>
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
    const equipList = reactive([
      {

      }
    ])
    const store = useStore();
    return({
      store,
    })
  }
}
</script>

<style scoped>
  .bag-bg{
    width: 40%;
    height: 60%;
    margin-top: 10%;
    margin-left: 25%;
    /*background-color: white;*/
    z-index: 2;
  }
  .bg-img{
    width: 100%;
    height: 100%;
    z-index: 3;
  }
  .item-bg{
    position: absolute;
    width: 90%;
    height: 76%;
    margin-top: 100px;
    margin-left: 7%;
    z-index: 4;
    /*background-color: white;*/
    /*opacity: 50%;*/
  }
  .item{
    width: 51px;
    height: 51px;
    border: 1px black;
    z-index: 5;
    background-color: black;
  }
  .item-img{
    width: 100%;
    height: 100%;
    z-index: 6;
  }
  /*.myHeader{*/
  /*  background-color: #d4d7de;*/
  /*}*/
</style>