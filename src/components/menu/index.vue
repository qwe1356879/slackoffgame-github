<template>
    <div class="mainmenu">
        <div class="item" v-for="i in itemlist" @click="menuop(i.key)">
          <el-tooltip placement="top">
            <template #content>
                <p v-for="t in i.toollip" :key="t">{{t}}</p>
                <!-- <br/> -->
            </template>
              <img  :src="`src/assets/icons/menu/${i.icon}.png`">
            <p>{{i.name}}</p>
            </el-tooltip>
          
        </div>
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
export default {
    emits:['refreshjob'],
    setup (_,{emit}) {
        const itemlist=reactive([
            {
                icon:'refresh_de',
                name:'刷新任务',
                key:'refreshjob',
                toollip:[
                    '* 刷新当前世界任务',
                    '* 刷新当前世界任务2',
                ]
            },
            {
                icon:'quest_icon_02',
                name:'背包',
                key:"bage",
                toollip:[
                    '* 角色背包'
                ]
            }
        ])

        function menuop(key){
            switch(key){
                case 'refreshjob':
                    emit('refreshjob')
                    break;
                case 'bage':
                    console.log('openbage')
                    break;
            }
        }
    
        return {
          itemlist,
          menuop
        }
    }
}
</script>

<style lang="scss" scoped>
.mainmenu {
    display: flex;
      background: rgba(0,0,0,.4);
}
.item{
    padding:15px
}
.item:hover{
    cursor: pointer;
}
</style>