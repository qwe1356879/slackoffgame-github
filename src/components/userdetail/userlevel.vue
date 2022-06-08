<template>
  <div class="detail">

    <div class="main">
      <el-tooltip effect="dark" placement="bottom">
        <template #content>
          <div class="tip-img"><img src='/icons/tips.png' /></div>
          <p> * 角色当前等级</p>
        </template>
        <div class="level">
          lv {{ store.state.userinfo.Lv }}
        </div>
      </el-tooltip>
      <el-tooltip effect="dark" placement="bottom">
        <template #content>
          <div class="tip-img"><img src='/icons/tips.png' /></div>
          <p> * 角色转身次数</p>
        </template>
        <div class="zs">
          转身次数:{{ store.state.userinfo.NextLife }}
        </div>
      </el-tooltip>

    </div>

    <div class="hp">
      <userHp></userHp>
    </div>
    <div class="hp">
      <userotherdetail></userotherdetail>
    </div>
  </div>

</template>

<script>
import { reactive, toRefs } from 'vue'
import userHp from './userHp.vue'
import userotherdetail from './userotherdetail.vue'
import { useStore } from 'vuex'
export default {
  components: {

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
  height: 65px;
  font-size: 26px;
  line-height: 65px;
  font-weight: 600;
}

.zs {
  width: 50%;
  height: 65px;
  font-size: 16px;
  line-height: 65px;
}

.hp {
  border: 2px solid #ccc;
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