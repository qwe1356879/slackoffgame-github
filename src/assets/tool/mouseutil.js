import {
    ref,
    onMounted,
    onUnmounted
} from "vue";
//定义一个处理逻辑的公共方法
function MonitorFocus() {
    //定义x y 响应式变量  监听鼠标x y轴方向位置
    const y = ref(0);
    const x = ref(0);
    //定义一个鼠标滑动时触发方式
    function MovementTrigger(e) {
        //事件触发时给x y 赋值
        x.value = e.pageX;
        y.value = e.pageY;
    }
    //onMounted生命周期  执行时页面元素加载完毕  没加载完毕  window事件定义会获取不到
    onMounted(() => {
        //添加  onmousemove事件   当鼠标滑动时触发MovementTrigger
        window.addEventListener("mousemove", MovementTrigger)
    })
    //onUnmounted 组件销毁时触发事件
    onUnmounted(() => {
        //注销掉之前定义的on事件  避免报错
        window.removeEventListener("mousemove", MovementTrigger)
    })
    //返回响应式变量  x y
    return {
        y,
        x
    }
}
//导出MonitorFocus方法  给其他地方调用
export default MonitorFocus