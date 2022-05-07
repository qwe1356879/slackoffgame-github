<template>
    <div class="main">
        <el-tooltip placement="bottom">
            <template #content>
                <div class="equip-area">
                    123
                </div>
            </template>
            <div class="equipment">
            <div class="border">
                <img src='../../assets/weapon/S_Sword01.png'/>
            </div>
            <p>新手剑</p>
        </div>

            </el-tooltip>
      
        <div class="equipment">
            <div class="border">
                <img src='../../assets/weapon/S_Sword01.png'/>
            </div>
            <p>新手剑</p>
        </div>

        <div class="equipment">
            <div class="border">
                <img src='../../assets/weapon/S_Sword01.png'/>
            </div>
            <p>新手剑</p>
        </div>

        <div class="equipment">
            <div class="border">
                <img src='../../assets/weapon/S_Sword01.png'/>
            </div>
            <p>新手剑</p>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.equipment{
    display: flex;
    margin:1rem;
}
.border {
 width: 50px;
 height: 50px;
 
 box-shadow: rgb(255 0 255) 0px 0px 7px 2px inset;
}
.border img{
    margin: .5rem auto;
}
.equipment  p{
    width: 70%;
    text-align: left;
    font-size: 18px;
    line-height: 53px;
    text-indent: 15px;
}

.equip-area{
    
}
</style>