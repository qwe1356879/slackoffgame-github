<template>
  <el-tooltip effect="dark" placement="bottom">
    <template #content>
      <div class="tip-img"><img src='/icons/tips.png' /></div>
      <p> * 角色血量</p>
      <p> * 当前生命值/角色最大生命值</p>
      <p> * 每秒恢复HP:{{store.state.userinfo.SecondHp}}</p>
    </template>
    <div class="hp-area">
      <div class="icon-area">
        <img src='/icons/S_Holy01.png' />
      </div>
      <p>{{ store.state.userinfo.NowHp }}/{{ store.state.userinfo.MaxHp }}</p>
    </div>
  </el-tooltip>


</template>

<script>
import { reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
export default {
  setup() {
    const store = useStore()
    return {
      store
    }
  }
}
</script>

<style lang="scss" scoped>
.hp-area {
  display: flex;
  align-items: center;
}

.icon-area {
  width: 30%;
}

.hp-area p {
  width: 70%;
  font-size: 1.5rem;
}

.tip-img {
  text-align: center;

}

.tip-img img {
  // width: 38px;
  // height: 38px;
}
</style>