<script setup>
import Landing from '../components/Landing.vue'
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
     height: 100vh;
     width:100%;
     position: relative; /* Ensure relative positioning */
    
     
   }
   
</style>
