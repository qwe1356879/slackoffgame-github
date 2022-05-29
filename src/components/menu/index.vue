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

     <el-dialog v-model="datadialog" title="导出存档数据" width="30%" center draggable>
    <span
      >{{datacode}}</span
    >
  </el-dialog>
</template>

<script>
import { reactive, toRefs,ref } from 'vue'
import {userjmdata} from '../../assets/config/userinfo'
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
                    '* 刷新的任务等级：人物当前等级->人物当前等级+6',
                ]
            },
            {
                icon:'quest_icon_02',
                name:'背包',
                key:"bage",
                toollip:[
                    '* 角色背包'
                ]
            },
            {
                icon:'quest_icon_07',
                name:'生成存档',
                key:"data",
                toollip:[
                    '* 生成游戏存档','* 后期可使用存档导入功能'
                ]
            }
        ])
        let datacode = ref('')
        let datadialog = ref(false)
        function menuop(key){
            switch(key){
                case 'refreshjob':
                    emit('refreshjob')
                    break;
                case 'bage':
                    console.log('openbage')
                    break;
                case 'data':
                    datacode.value=userjmdata
                    datadialog.value=true
                    break;
            }
        }
    
        return {
          itemlist,
          menuop,
          datacode,
          datadialog
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
    padding:5px 15px
}
.item:hover{
    cursor: pointer;
}
</style>