<script setup>
import { onMounted } from 'vue';
onMounted(()=>{
    window.addEventListener('contextmenu', (e)=>{
      e.preventDefault();
    })
})
</script>

<template>
  <router-view></router-view>
</template>

<style>


</style>
