<template>
    <div class="border">
        <div v-for="di in joblist" :style="di.style" v-if="joblist">
            <div class="img" :style="di.imagestyle">
                <img :src="`src/assets/icons/menu/${di.imgurl}.png`"/>
            </div>
            <div class="divider">
            <el-divider />
        </div>
        <p>lv{{di.lv}}</p>
        </div>
    </div>
    <div class="btn2">
         <el-button type="primary" @click="createjob">随机生成任务</el-button>
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import createJob from '../../assets/config/monsterconfig'
export default {
    setup () {
        const job = reactive({
            joblist:[]
        })
       function createjob(){
           job.joblis=[]
           job.joblist=createJob(10,2)
           console.log('joblist',job.joblist)
      }
        return {
            ...toRefs(job),
            createjob,
        }
    }
}
</script>

<style lang="scss" scoped>
.border{
    width: 1000px;
    height: 500px;
    border: 2px solid #000;
    margin: 0 auto;
    position: relative;
}
.btn2{
    text-align: center;
    padding-top: 20px;
}
.img{
    margin: 0 auto;
    text-align: center;
    width: 43px;
    height: 43px;
    // border-radius: 50%;
}
.img img{
    padding-top: 8px;
}
.el-divider--horizontal{
    margin: 0 auto;
    width: 90%;
    
}
p{
    text-align: center;
    padding-top: 3px;
    color: #fff;
}
</style>