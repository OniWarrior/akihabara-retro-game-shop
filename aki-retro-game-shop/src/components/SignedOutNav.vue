<script setup>
import 'vue'
import {useRouter } from 'vue-router'


const router = useRouter()

// handler for going home
const goToHome=()=>{
   router.push({
      name: 'Landing'

   })
}

// handler for login
const goToLogin=()=>{
    router.push({
        name:'Login'
    })
}

// handler for signup
const goToSignup=()=>{
    router.push({
        name:'Signup'
    })
}
</script>

<template>
    <div>
        <nav class="signed-out-nav">
            <button @click="goToHome">Home</button>
            <button @click="goToLogin">Login</button>
            <button @click="goToSignup">Signup</button>         
        </nav>        
    </div>
</template>

<style scoped>
  
   .signed-out-nav{
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      align-items: center;
      padding-top:2em;
      padding-bottom:10vh;
   }

   .signed-out-nav button {
    background-color: rgba(0,0,139,0.8);
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 50px;
    box-shadow: 3px 3px 3px 3px rgba(0, 0, 139, 0.58);
    transition: background-color 0.3s ease, transform 0.3s ease;
}

.signed-out-nav button:hover {
    background-color: #00d8ff; /* Electric Blue */
    transform: translateY(-2px);
    animation: glowing 1200ms infinite;
}

.signed-out-nav button:active {
    background-color: #ffdd00; /* Bright Yellow */
    transform: translateY(0);
}


@keyframes glowing {
        0% {
          background-color: darkviolet;
          box-shadow: 0 0 5px darkviolet;
          border: 2px solid darkviolet;
        }
        50% {
          background-color: #eebdff;
          box-shadow: 0 0 20px #eebdff;
          border: 2px solid #f8e4ff;
        }
        100% {
          background-color: #9400D3;
          box-shadow: 0 0 5px #9400D3;
          border: 2px solid #9400D3;
        }
      }
</style>