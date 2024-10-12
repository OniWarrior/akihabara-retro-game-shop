<script setup>
   import Login from '../components/LoginPage.vue';
</script>


<template>
    <div class="login">
        <Login/>
    </div>
    
</template>

<style scoped>
   .login{
       background-image: url('../assets/LoginAkiImg.png');
       background-attachment: scroll;
       background-position: center;
       background-repeat: no-repeat;
       background-size: cover;
       height: 100vh;
       width:100%;
   }
</style>