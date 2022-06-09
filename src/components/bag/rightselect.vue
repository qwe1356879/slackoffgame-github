<template>
    <div class="showRightMenu" ref="showRightMenu" :style="{'top': bagitem.y-680 + 'px','left':bagitem.x -1180+ 'px'}" >
        <div v-for="item in menulist" class="common"> 
        {{ item.title}}
        </div>
    </div>

</template>

<script>
import { reactive, toRefs, onMounted,defineComponent,ref} from 'vue'

export default defineComponent({
    props: {
        menulist:Array,
        bagitem:Object
    },
    setup() {
        const showRightMenu = ref(null)
        onMounted(()=>{
            console.log(showRightMenu.value.style)
        })
        return {
            showRightMenu
        }
    }
})
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