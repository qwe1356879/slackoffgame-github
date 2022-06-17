import {
    reactive,
    toRefs,
    ref,
    computed,
    onMounted,
    onUnmounted,
    watch,
  } from "vue";
  import { useStore } from "vuex";
const xiaoMing = {
    name:'小明',
    age:18
}
// 发送线程消息
self.postMessage(xiaoMing); 
self.onmessage = e =>{
    console.log(e.data) // 打印 ['test','testone']
}

