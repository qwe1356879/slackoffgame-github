<template>
  <div
    class="showRightMenu"
    ref="showRightMenu"
    :style="{
      top: bagitem.posi.y - 680 + 'px',
      left: bagitem.posi.x - 1180 + 'px',
    }"
  >
    <div v-for="item in menulist" class="common" @click="menuchoose(item)">
      {{ item.title }}
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted, defineComponent, ref } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  props: {
    menulist: Array,
    bagitem: Object,
  },
  emits: ["close"],
  setup(props, { emit }) {
    const store = useStore();
    // console.log('props',props.bagitem.posi)
    const showRightMenu = ref(null);
    function menuchoose(item) {
      if (item.title == "出售") {
        let money = props.bagitem.item.price;
        store.commit("sealiitemfrombag", props.bagitem.item.id);
        let myDate = new Date();
        let str = myDate.toTimeString(); //"10:55:24 GMT+0800 (中国标准时间)"
        let timeStr = str.substring(0, 8);
        let sysinfo = {
          sys: "系统",
          time: "",
          time: timeStr,
          text: "物品出售成功",
          color: "#67C23A",
          ifequipment: false,
          equipmentinfo: {},
        };
        store.commit("addsysinfo", sysinfo);
        store.commit("updateusermoney", money);
        emit("close");
      } else if (item.title == "装备") {
        store.commit("replaceequipment", props.bagitem.item);
        emit("close");
      }
    }
    return {
      showRightMenu,
      menuchoose,
    };
  },
});
</script>

<style lang="scss" scoped>
.showRightMenu {
  // min-width: 108px;
  cursor: pointer;
  position: relative;
  width: 100px;
  // left: 0;
  // top: 0;
  z-index: 4;
  box-sizing: border-box;
  background: linear-gradient(0deg, #343438, #343438), #ffffff;
  border: 1px solid #505050;
  border-radius: 4px;
}
.common {
  width: 100%;
  color: #fff;
  font-family: "Helvetica Neue";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  padding: 3px 19px;
  box-sizing: border-box;
  transition: all 0.3s;
  background-color: transparent;

  &:hover {
    background-color: #8372ff;
  }
}
</style>
