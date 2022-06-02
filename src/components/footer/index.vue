<template>
    <div class="footer">
        <div class="footer-item" v-for="i in itemlist" @click="menuop(i.key)">
            <img  :src="`../src/assets/icons/othericons/${i.icon}.svg`">
            <p>{{i.name}}</p>
        </div>
    </div>

    
  <el-drawer
    v-model="updatedrawer"
    title="更新日志"
    direction="rtl"
  >
    <div class="drawer-div" v-for="x in updatelist">
        <p class="title">更新日期:{{x.date}}</p>
        <p v-for="(y,index) in x.detail" class="text">
        {{index+1}}.{{y}}
        </p>
        <p class="author">{{x.author}}</p>
        <el-divider />
    </div>
  </el-drawer>

</template>

<script>
import { reactive, toRefs,ref} from 'vue'
import {updatelist} from '../../assets/codedata/update'
export default {
    setup () {
        const itemlist=ref([
            {
                icon:'gitee',
                name:'Gitee',
                key:'gitee',
            },
             {
                icon:'github',
                name:'GitHub',
                key:'github',
            },
             {
                icon:'comment',
                name:'意见反馈',
                key:'comment',
            },
             {
                icon:'update',
                name:'更新日志',
                key:'update',
            },
           
             {
                icon:'money',
                name:'为爱发电',
                key:'money',
            },
        ])
        const updatedrawer = ref(false)
        const moneydialog = ref(false)
        const commentdrawer = ref(false)
        function menuop(key){
            switch(key){
                case 'gitee':
                    window.open('https://gitee.com/fffyt/bravegame','_blank');
                    break;
                case 'github':
                     window.open('https://gitee.com/fffyt/bravegame','_blank');
                    break;
                case 'update':
                    updatedrawer.value=true
                    break;
            }
        }
    
        return {
         itemlist,
         updatedrawer,
         moneydialog,
         commentdrawer,
         menuop,
         updatelist
        }
    }
}
</script>

<style lang="scss" scoped>
.footer{ 
    display: flex;
    border: 2px solid #ccc;
    margin: 0.2rem;
    height: 60px;
    color: #fff;
    text-align: center;
}
.footer-item{
    margin: 5px auto;
}
.footer-item img:hover{
    cursor: pointer;
}
.footer-item p:hover{
    cursor: pointer;
}
.drawer-div{
    padding:0px 15px;
    padding-bottom: 15px;
    // text-align: center;
    .title{
        font-size: 1.2rem;
        font-weight: 700;
        padding-bottom: 10px;
    }
    .text{
         font-weight: 600;
    }
    .author{
        padding-top: 15px;
        // text-align: right;
    }
}

</style>