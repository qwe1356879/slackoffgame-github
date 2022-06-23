<template>
  <div class="box">
    <div class="box-title">
      <p>强化装备</p>
        <div class="close-btn">
          <img src="/icons/close.png"  />
        </div>
    </div>
  
    <div class="box-info">
       <el-tooltip placement="bottom">
        <template #content> multiple lines<br />second line </template>
        <p>强化说明</p>
      </el-tooltip>
    </div>

    <div class="box-img" v-if="itemstate">
      <div class="img">
        <img src="/icons/myequip/weapon/1_(1).png"/>
      </div>
      <div class="name">
        <span>{{name}}</span>
      </div>
    </div>

    <div v-else class="box-choose">
    <el-popover
      :width="300"
      popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
      trigger="click"
    >
      <template #reference>
        <img src="/icons/othericons/add.svg"/>
      </template>
      <template #default>
        <div
          class="demo-rich-conent"
          style="display: flex; gap: 16px; flex-direction: column"
        >
        <div v-if="store.state.userinfo.bag.length<0">
          <span>暂无装备可选</span>
        </div>
         <div class="item-area" v-for="i in store.state.userinfo.bag" v-else>
          <div class="img-list">
            <img :src="`/icons/myequip/weapon/1_(${i.imgurl}).png`"/>
          </div>
          <div class="name-list">
            <span>{{i.name}}</span>
          </div>

         </div>
        </div>
      </template>
    </el-popover>

     
    </div>

    <div class="box-entry" v-if="itemstate">
      <div class="old">
        <p v-for="i in 3">攻击力：+{{i}}</p>
      </div>
      <div class="arror">
        ➡
      </div>
       <div class="new">
         <p v-for="i in 3">{{i+3}}<span> ⬆({{i}})</span></p>
      </div>
    </div>

    <div class="box-money" v-if="itemstate">
        <p class="success">成功率:<span>20%</span></p>
      <p>需要金币:999</p>
      <div class="box-btn">
         <el-button>开始强化</el-button>
      </div>
    </div>

    <div class="box-auto" v-if="itemstate">
      <el-tooltip placement="bottom">
        <template #content> 
          * 自动强化消耗的金币是普通强化的2倍
          <br/>
          * 当金币不足时自动停止强化
           <br/>
           * 自动强化会自动强化到下一级
        
        </template>
         <el-button>自动强化</el-button>
      </el-tooltip>
     
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useStore } from "vuex";
export default {
  setup () {
    const state = reactive({
      name:'新手剑',
      itemstate:false,
    })
     const store = useStore();
     console.log(store.state)
    return {
      store,
      ...toRefs(state),
    }
  }
}
</script>

<style lang="scss" scoped>
  .box{
    width: 374px;
    box-shadow: 0 0 5px 5px rgb(0 0 0 / 70%);
    background: rgba(0,0,0,.7);
    border: 2px solid #fff;
    border-radius: 6px;
        color: #fff;
  }
  .box-title{
    text-align: center;

    font-size: 18px;
    padding: 0.2rem;
    border-bottom: 1px solid #ccc;
  }
  .box-info{
    text-align: center;
      padding: 0.4rem;
      font-size: 15px;
  }
  .box-img{
   margin: 0 auto;
    display: flex;
    width: 60%;
    justify-content: space-between;
    align-items: center;
   padding-bottom: 0.4rem;
  }
  .box-choose{
     margin: 0 auto;
     box-shadow: rgb(255, 255, 255) 0px 0px 7px 2px inset;
     width: 48px;
     height: 48px;
     border-radius: 6px;
   margin-bottom: 0.8rem;
  }
  .box-choose img{
    margin: 6px 6px; 
  }
  .box-choose img:hover{
    cursor: pointer;
  }
  .img {
    // width: 30%;
    width: 52px;
    height: 52px;
  box-shadow: rgb(255, 255, 255) 0px 0px 7px 2px inset;
  border-radius: 6px;
margin: 0 auto;
  }
  .img img{
    width: 46px;
    height: 46px;
    margin: 3px 3px;
  }
  .name{
    width: 70%;
    text-indent: 12px;
  }
  .box-entry{
    width: 80%;
    margin: 0 auto;
    display: flex;
    padding:1.3rem;
    justify-content:space-around;
    align-items:center;
  }
  .old{
    width: 45%;
  }
  .arror{
    width: 20%;
  }
  
  .new{
    width: 35%;
  }
  .new span{
    color: #2fe20f;
  }
  .box-money{
    padding-bottom: 0.4rem;
    text-align:center;
  }
  .box-money p{
    padding-bottom: 0.4rem;
  }
  .box-money:deep(.el-button){
    background-color: #000;
    color: #fff;
  }
  .success span{
     color: #2fe20f;
  }
  .box-auto{
    text-align: center;
    padding-bottom: 0.6rem;
    padding-top: 0.6rem;
     border-top: 1px solid #ccc;
  }
   .box-auto:deep(.el-button){
    background-color: #000;
    color: #fff;
  }
  .close-btn {
  position: absolute;
  top: 3px;
 left: 345px;
}
.close-btn img {
  width: 24px;
  height: 24px;
}
.close-btn img:hover{
  cursor: pointer;
}
.item-area{
  display: flex;
}
</style>