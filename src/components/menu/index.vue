<template>
    <div class="mainmenu">
        <div class="item" v-for="i in itemlist" @click="menuop(i.key)">
            <el-tooltip placement="top">
                <template #content>
                    <p v-for="t in i.toollip" :key="t">{{ t }}</p>
                    <!-- <br/> -->
                </template>
                <img :src="`/icons/menu/${i.icon}.png`">
                <p>{{ i.name }}</p>
            </el-tooltip>
        </div>
    </div>

    <el-dialog v-model="datadialog" title="导出存档数据" width="30%" center draggable>
        <span>{{ datacode }}</span>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="copy" type="primary">一键复制</el-button>
            </span>
        </template>

    </el-dialog>
</template>

<script>
import { reactive, toRefs, ref } from 'vue'
import useClipboard from 'vue-clipboard3'
import { ElMessage } from 'element-plus'
import {useStore} from "vuex";

export default {
    emits: ['refreshjob'],

    setup(_, { emit }) {
        const store = useStore();
        const itemlist = reactive([
            {
                icon: 'refresh_de',
                name: '刷新任务',
                key: 'refreshjob',
                toollip: [
                    '* 刷新当前世界任务',
                    '* 刷新的任务等级：人物当前等级->人物当前等级+6',
                    '* 刷新任务有5秒的CD'
                ]
            },
            {
                icon: 'quest_icon_02',
                name: '背包',
                key: "bag",
                toollip: [
                    '* 角色背包'
                ]
            },
            {
                icon: 'quest_icon_07',
                name: '生成存档',
                key: "data",
                toollip: [
                   '* 生成存档', '* 生成游戏存档', '* 后期可使用存档导入功能'
                ]
            },
             {
                icon: 'icon_80',
                name: '商店',
                key: "shop",
                toollip: [
                   '* 商店', '* 贩卖装备和治疗药水', '* 刷新商店需要一定量的金币'
                ]
            }
        ])
        let datacode = ref('')
        let datadialog = ref(false)
        function menuop(key) {
            switch (key) {
                case 'refreshjob':
                    emit('refreshjob')
                    break;
                case 'bag':
                    store.commit('changeShowBag');
                    break;
                case 'data':
                    datacode.value = localStorage.getItem('userdata')
                    datadialog.value = true
                    break;
                 case 'shop':
                    store.commit('changeShowShop')
                    break;
            }
        }
        const { toClipboard } = useClipboard()
        const copy = async () => {
            try {
                //复制
                await toClipboard(datacode.value)
                console.log(datacode.value)
                ElMessage({
                    type: 'success',
                    duration: 3000,
                    message: '复制成功'
                })
                datadialog.value = false
            } catch (e) {
                //复制失败
                console.error(e)
                ElMessage({
                    type: 'error',
                    duration: 3000,
                    message: '复制失败，请手动复制'
                })
            }
        }

        return {
            itemlist,
            menuop,
            datacode,
            datadialog,
            copy
        }
    }
}
</script>

<style lang="scss" scoped>
.mainmenu {
    display: flex;
    background: rgba(0, 0, 0, .4);
}

.item {
    padding: 5px 15px
}

.item:hover {
    cursor: pointer;
}

::v-deep(.el-message) {
    min-width: none !important;
}
</style>