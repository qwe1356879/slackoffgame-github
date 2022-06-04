<template>
  <div class="dps-area">
    <div class="dps">
      <el-tooltip effect="dark" placement="bottom">
        <template #content>
          <div class="tip-img"><img src='../../assets/icons/tips.png' /></div>
          <p> * 角色DPS</p>
        </template>
        <p class="info">DPS:{{ store.state.userinfo.DPS }}</p>
      </el-tooltip>

      <el-tooltip effect="dark" placement="bottom">
        <template #content>
          <div class="tip-img"><img src='../../assets/icons/tips.png' /></div>
          <p> * 角色当前拥有的金币数量</p>
        </template>
        <p class="info">金币:{{ store.state.userinfo.Gold }}</p>
      </el-tooltip>

    </div>
    <div class="equip-area">
      <userequip></userequip>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import userequip from './userequip.vue'
import { useStore } from 'vuex'
export default {
  components: {
    userequip
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
.dps-area {
  border: 2px solid #ccc;
  width: 50%;
  color: #eee;
  text-align: center;
  margin: 0.2rem;
}

.dps {
  display: flex;
}

.dps p {
  width: 50%;
}

.info {
  font-size: 18px;
  line-height: 65px;
}

.equip-area {
  //  border: 2px solid #ccc;
  margin: 0.8rem;
}

.tip-img {
  text-align: center;

}

.tip-img img {
  width: 38px;
  height: 38px;
}
</style>