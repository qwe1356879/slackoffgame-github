<template>
    <div>
        <button @click="sub">发起请求</button>
    </div>
</template>

<script>
import axios from 'axios'
import { reactive, toRefs } from 'vue'

export default {
    setup () {
        function sub(){
             let u = {emailAddress: "xxx",
                        gender: "男",
                        jobTitle: "儿子2",
                        loginId: "xxx.nj",
                        mobileNum: "10086",
                        post: "xxx",
                        userId: "Fy73qCiEDLZgjDTUh2NmIno89KKHuGd",
                        userName: "xxx",
                        userNum: "COGpxtmy61T7qdq5zSopkeliSRcR6jH",
                        userType: "内建"}
            axios({
                header:{
                    'Content-Type': 'application/json'
                },
                url:'http://10.79.108.199:8081/api/privilege/user/saveEntity',
                method:"post",
                data:JSON.stringify(u)
            }).then(res=>{
                console.log('res',res)
            })
        }
        return {
            sub
        }
    }
}
</script>

<style lang="scss" scoped>

</style>