<template>
  <div class="bk">
    <div class="sp-border">
      <div class="sp-title">
        <p>物品商店</p>
      </div>
      <div class="item-area">
        <div class="sp-item" v-for="i in state.items">
          <div
            class="item"
            :style="{ 'box-shadow': i.color }"
            v-on:mouseenter="mounseonter(i)"
            v-on:mouseleave="state.enterstate = false"
          >
            <img :src="`../../src/assets/icons/myequip/${i.imgurl}.png`" />
          </div>
          <!-- <p>{{ i + 200 }}</p> -->
        </div>
      </div>

      <div class="btn-area">
        <div class="sp-refresh">
          <!-- 剩余刷新次数:5 -->
        </div>
        <div class="sp-refresh">
          <el-tooltip
            class="box-item"
            effect="dark"
            :content="`使用金币刷新商店，每次刷新费用增加500,当前费用:${count}`"
            placement="bottom"
          >
            <img
              src="../../assets/icons/othericons/goldrefresh.svg"
              @click="addcount"
            />
          </el-tooltip>
        </div>
        <div class="sp-refresh"></div>
      </div>
    </div>
    <showequipe :userdata="equipdata.obj" v-if="state.enterstate"></showequipe>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted, ref } from "vue";
import createShopItem from "../../assets/config/shopitem.js";
import { useStore } from "vuex";
import showequipe from "../../components/showequip/index.vue";
import MonitorFocus from "../../assets/tool/mouseutil";
export default {
  components: {
    showequipe,
  },
  setup() {
    const store = useStore();
    const state = reactive({
      count: 100,
      items: [],
      mouseposi: MonitorFocus(),
      enterstate: false,
    });
    let equipdata = reactive(
        {
            obj:{}
        }
    );
    onMounted(() => {
      state.items = createShopItem(16, 60);
    });
    function addcount() {
      if (state.count <= 5000) {
        state.count += 500;
      } else {
        console.log("超过5000不能刷新了");
        setTimeout(() => {
          state.count = 0;
        }, 1500);
      }
    }
    function mounseonter(data) {
      state.enterstate = true;
      data.mouseposi = state.mouseposi;
      if (data.type == "武器") {
        data.imgurladd = "/" + data.imgurl;
      } else if (data.type == "护甲") {
        data.imgurladd = "/" + data.imgurl;
      } else if (data.type == "首饰") {
        data.imgurladd = "/" + data.imgurl;
      } else if (data.type == "耳环") {
        data.imgurladd = "/" + data.imgurl;
      } else {
        data.imgurladd ="/" + data.imgurl;
      }
     
      equipdata.obj = data;
    
    }
    return {
      state,
      addcount,
      equipdata,
      mounseonter,
    };
  },
};
</script>

<style lang="scss" scoped>
.bk {
  // background-color: #000;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.sp-border {
  // margin: 0 auto;
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.034);
  background: rgba(0, 0, 0, 0.7);
  width: 600px;
  height: 255px;
  border-radius: 8px;
}
.sp-item {
  margin: 10px;
  width: 55px;
  height: 55px;

  // background-color: aqua;
}
.item-area {
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  align-content: flex-start;
}
.item {
  width: 55px;
  height: 55px;
  border-radius: 8px;
  border: 1px solid #fff;
}
.item img {
  width: 48px;
  height: 48px;
  margin: 2px 3px;
}
.item-area p {
  text-align: center;
  color: #fff;
}
.btn-area {
  padding-top: 12px;
  display: flex;
  padding-bottom: 1rem;
}
.btn-area img:hover {
  cursor: pointer;
}
.sp-title {
  text-align: center;
  color: #fff;
  font-size: 1.2rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
}
.sp-refresh {
  width: 33.3%;
  text-align: center;
}
</style>
