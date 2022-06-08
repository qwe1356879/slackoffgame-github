<template>
  <div class="main">

    <el-tooltip effect="dark" placement="bottom">
      <template #content>
        <div class="tip-img"><img src='/icons/tips.png' /></div>
        <p> * 角色攻击力</p>
        <p> * 角色攻击力将直接影响角色DPS</p>
      </template>
      <div class="sx">
        <img src='/icons/ATK.png' />
        <p>{{ store.state.userinfo.Atk }}</p>
      </div>
    </el-tooltip>

    <el-tooltip effect="dark" placement="bottom">
      <template #content>
        <div class="tip-img"><img src='/icons/tips.png' /></div>
        <p> * 角色暴击率</p>
        <p> * 角色暴击率将直接影响角色DPS</p>
      </template>
      <div class="sx">
        <img src='/icons/CRIT.png' />
        <p>{{ store.state.userinfo.Cridt }}%</p>
      </div>
    </el-tooltip>

    <el-tooltip effect="dark" placement="bottom">
      <template #content>
        <div class="tip-img"><img src='/icons/tips.png' /></div>
        <p> * 角色暴击伤害</p>
        <p> * 角色暴击伤害将直接影响角色DPS</p>
      </template>
      <div class="sx">
        <img src='/icons/CRITDMG.png' />
        <p>{{ store.state.userinfo.CridtDmg }}%</p>
      </div>
    </el-tooltip>

    <el-tooltip effect="dark" placement="bottom">
      <template #content>
        <div class="tip-img"><img src='/icons/tips.png' /></div>
        <p> * 角色防御力</p>
        <p> * 减伤比例采用非线性计算，防御力越高收益越低</p>
      </template>
      <div class="sx">
        <img src='/icons/icon_11.png' />
        <p>{{ store.state.userinfo.Armo }}</p>
      </div>
    </el-tooltip>

    <el-tooltip effect="dark" placement="bottom">
      <template #content>
        <div class="tip-img"><img src='/icons/tips.png' /></div>
        <p> * 角色格挡值</p>
        <p> * 计算护甲后在计算格挡伤害就是最终受到的伤害</p>
      </template>
      <div class="sx">
        <img src='/icons/S_BLOC.png' />
        <p>{{ store.state.userinfo.Armo }}</p>
      </div>
    </el-tooltip>





  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useStore } from 'vuex'
export default {
  setup() {
    const store = useStore()
    return {
      store
    };
  },
};
</script>

<style lang="scss" scoped>
.tip-img {
  text-align: center;

}

.tip-img img {
  width: 38px;
  height: 38px;
}

.main {
  display: grid !important;
  grid-template-columns: 33.3% 33.3% 33.3%;
  grid-template-rows: 90px 90px;
}

.sx img {
  margin-top: 1rem;
}

.sx p {
  font-size: 19px;
  margin-top: 0.4rem
}
</style>
