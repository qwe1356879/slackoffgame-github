<template>
  <div class="bag-bg" v-if="store.state.showBag">
    <div class="item-bg">
      <div
        class="grid-single"
        v-for="i in equipList.list"
        :style="{ 'box-shadow': i.color }"
        v-on:mouseenter="mounseonter(i)"
        v-on:mouseleave="mouseleave"
      >
        <img
          :src="`/icons/myequip/${i.imgadd}/${i.imgurl}.png`"
          alt=""
          @mousedown.left="mousedown(i)"
        />
      </div>
      <div>
        <div class="close-btn">
          <img src="/icons/close.png" @click="closebag" />
        </div>
      </div>
    </div>
    <rightselect
      :menulist="equipList.menulist"
      v-if="equipList.rightstate"
      :bagitem="equipList.bagitem"
      @close="closerightselect"
    ></rightselect>
    <showbag :bagdata="equipdata.obj" v-if="equipList.enterstate" ></showbag>
  </div>
</template>

<script>
import { reactive, ref, computed, watch, onMounted } from "vue";
import { useStore } from "vuex";
import rightselect from "./rightselect.vue";
import MonitorFocus from "../../assets/tool/mouseutil";
import showbag from "./showbag.vue";
export default {
  name: "Package",
  components: {
    rightselect,
    showbag,
  },
  setup() {
    const x = ref(0);
    const y = ref(0);
    const store = useStore();
    const equipList = reactive({
      list: [],
      rightstate: false,
      mouseposi: MonitorFocus(),
      enterstate: false,
      menulist: [
         {
          title: "装备",
          value: "equip",
        },
        {
          title: "强化",
          value: "intensify",
        },
        {
          title: "出售",
          value: "sell",
        },
       
      ],
      bagitem: {
        posi: {},
      },
    });
    onMounted(() => {
      window.addEventListener("mousemove", MovementTrigger);
    });
    let equipdata = reactive({
      obj: {},
    });
    const getUserBag = computed(() => {
      //返回的是ref对象
      return store.state.userinfo.bag;
    });

    watch(
      getUserBag,
      (newval, oldval) => {
        equipList.list = newval;
      },
      { immediate: true, deep: true }
    );

    function closebag() {
      store.commit("changeShowBag");
    }
    function MovementTrigger(e) {
      //事件触发时给x y 赋值
      x.value = e.pageX;
      y.value = e.pageY;
    }
    function mousedown(item) {
      equipList.enterstate = false;
      equipList.bagitem.posi.x = x.value;
      equipList.bagitem.posi.y = y.value;
      equipList.bagitem.item = item;
      equipList.rightstate = !equipList.rightstate;
    }
    function closerightselect(){
      equipList.rightstate=false
    }
    function mounseonter(data) {
      equipList.enterstate = true;
      data.mouseposi = equipList.mouseposi;
      if (data.type == "武器") {
        data.imgurladd = "/weapon" + "/" + data.imgurl;
      } else if (data.type == "护甲") {
        data.imgurladd = "/armo" + "/" + data.imgurl;
      } else if (data.type == "首饰") {
        data.imgurladd = "/left" + "/" + data.imgurl;
      } else if (data.type == "耳环") {
        data.imgurladd = "/right" + "/" + data.imgurl;
      } else {
        data.imgurladd = "/hp" + "/" + data.imgurl;
      }
      equipdata.obj = data;
    }
    function mouseleave() {
      equipList.enterstate = false;
    }
    return {
      store,
      equipList,
      equipdata,
      closebag,
      mousedown,
      mounseonter,
      mouseleave,
      closerightselect
    };
  },
};
</script>

<style scoped>
.bag-bg {
  width: 60%;
  height: 45%;
  background-image: url("/src/assets/icons/images/1_爱给网_aigei_com(1).png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  z-index: 2;
}
.bg-img {
  width: 100%;
  height: 100%;
  z-index: 3;
}
.item-bg {
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
  flex-wrap: wrap;
}
.grid-single {
  width: calc(100% / 12);
  height: calc(100% / 6);
  margin: 4px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.774);
}
.grid-single img {
  width: 90%;
  height: 90%;
  border-radius: 8px;
  margin: 2px 2px;
}
.grid-single img:hover {
  cursor: pointer;
}
.close-btn {
  position: absolute;
  top: 12px;
  right: 5px;
}
.close-btn img {
  width: 24px;
  height: 24px;
}
.close-btn img:hover{
  cursor: pointer;
}
</style>
