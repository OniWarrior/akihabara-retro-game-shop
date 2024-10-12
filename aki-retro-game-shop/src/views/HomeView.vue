<script setup>
import Landing from '../components/LandingComp.vue'
</script>

<template>
  <div class="home-container"> <Landing /></div>
  
   
  
</template>

<style scoped>
   .home-container{
     background-image: url('../assets/akiGameshop.png');
     background-attachment: scroll;
     background-position: center;
     background-repeat: no-repeat;
     background-size: cover;
     position: fixed;
       top: 0;
       left: 0;
       width: 100vw;
       height: 100vh;
    
     
   }
   
</style>
