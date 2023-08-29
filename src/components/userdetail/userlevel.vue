<template>
  <div class="detail">

    <div class="main">
      <el-tooltip effect="dark" placement="bottom">
        <template #content>
          <div class="tip-img"><img src='/icons/tips.png' /></div>
          <p> * 角色当前等级</p>
          <p> * Exp:{{store.state.userinfo.exp}}/{{store.state.userinfo.needexp}}</p>
        
        </template>
        <div class="level">
          lv {{ store.state.userinfo.Lv }}
        </div>
      </el-tooltip>
      <el-tooltip effect="dark" placement="bottom">
        <template #content>
          <div class="tip-img"><img src='/icons/tips.png' /></div>
          <p> * 角色转生次数</p>
        </template>
        <div class="zs">
          转生次数:{{ store.state.userinfo.NextLife }}
        </div>
      </el-tooltip>

    </div>

    <div class="hp">
      <userHp></userHp>
    </div>
    <div class="hp2">
      <userotherdetail></userotherdetail>
    </div>
     <div class="hp3">
      <userexp></userexp>
    </div>
  </div>

</template>

<script>
import { reactive, toRefs } from 'vue'
import userHp from './userHp.vue'
import userotherdetail from './userotherdetail.vue'
import userexp from "./userexp.vue"
import { useStore } from 'vuex'
export default {
  components: {
    userexp,
    userHp,
    userotherdetail
  },
  setup() {
    const store = useStore()

    return {
      store
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  display: flex;
}

.detail {
  width: 50%;
  border: 2px solid #ccc;
  color: #eee;
  text-align: center;
  margin: 0.2rem;
}

.level {
  width: 50%;
  height: 20%;
  font-size: 26px;
  line-height: 65px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
}

.zs {
  width: 50%;
  height: 20%;
  font-size: 1.5rem;
  line-height: 65px;
  white-space: nowrap;
  overflow: hidden;
}

.hp {
  border: 2px solid #ccc;
  margin: 0.5rem;
  height: 20%;
}
.hp2 {
  border: 2px solid #ccc;
  margin: 0.5rem;
  height: 30%;
}
.hp3 {
  border: 2px solid #ccc;
  margin: 0.5rem;
  height: 20%;
}
.tip-img {
  text-align: center;

}

.tip-img img {
  width: 38px;
  height: 38px;
}
</style>