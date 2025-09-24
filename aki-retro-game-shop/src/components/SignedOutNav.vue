<script setup>
import 'vue'
import {useRouter } from 'vue-router'


const router = useRouter()

// handler for going home
const goToHome=()=>{
   router.push({
      name: 'home'

   })
}

// handler for login
const goToLogin=()=>{
    router.push({
        name:'login'
    })
}

// handler for signup
const goToSignup=()=>{
    router.push({
        name:'register'
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
      padding-bottom:5vh;
      position:relative;
      background-color: black;
      border-bottom: 1px solid burlywood;
     
   }

   .signed-out-nav button {
    background-color: rgba(222, 184, 135, 0.906);
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 50px;
    box-shadow: 3px 3px 3px 3px rgba(222, 184, 139, 0.58);
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
          background-color: rgba(222, 184, 135, 0.906);
          box-shadow: 0 0 5px rgba(222, 184, 135, 0.906);
          border: 1px solid rgba(222, 184, 135, 0.906)t;
        }
        50% {
          background-color: #feffbd;
          box-shadow: 0 0 20px #fff9bd;
          border: 1px solid #fffae4;
        }
        100% {
          background-color: rgba(222, 184, 135, 0.906);
          box-shadow: 0 0 5px rgba(222, 184, 135, 0.906);
          border: 1px solid rgba(222, 184, 135, 0.906);
        }
      }
</style>