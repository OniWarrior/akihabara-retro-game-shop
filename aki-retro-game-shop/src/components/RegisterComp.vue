<script setup>
    import SignedOutNav from './SignedOutNav.vue'
    import RegisterSchema from '../formschemas/RegisterSchema.js'
    //import {useAuthStore} from '../stores/AuthStore'
    import {useFormValidation} from '../hooks/useFormValidation'

    // TODO--uncomment once the api call is created
    //const authStore = useAuthStore()

    const {data,errors,onInputChange} = useFormValidation(RegisterSchema)
        // handler for register form submission
        const onRegisterSubmit=()=>{
           // TODO-- place api call when available
        }
</script>

<template>
    <SignedOutNav/>
    <form class="register-form-container" @submit.prevent  = 'onRegisterSubmit'>
        <h1>Register New Account</h1>

        <fieldset>
            <legend>Credentials for new account</legend>
            <label for="username">Username</label>
            <input 
               id="username"
               v-model = 'data.username'
               type="text"
               class="text-box"
               name="username"
               required
               placeholder="username"
               @input="onInputChange"
            />

            <div class="errors">
                <span>{{ errors.username }}</span>
            </div>

            <label for="password">Password</label>
            <input
               id="password"
               class="text-box"
               v-model = 'data.password'
               type="password"
               name="password"
               required
               placeholder="password"
               @input = 'onInputChange'
            />

            <div class="errors">
                <span>{{ errors.password }}</span>
            </div>
        </fieldset>

        <button class="submission" type="submit" >Register</button>


    </form>
    
    
</template>


<style scoped>
   .errors{
      color:red;
   }
   fieldset{
    display: flex;
    flex-direction:column;
    justify-content:space-evenly;
   
    
   }
   
   .register-form-container h1{
      font-size: xx-large;
      

   }

   .text-box{
      min-height:2em;
      border-radius:20px;
   }
   .register-form-container{
       margin:auto;
       
       font-family: Arial, Helvetica, sans-serif;
       color:white;
       display:flex;
       flex-direction: column;
       align-items: center;
       background-color: rgba(0,0,0,0.8);
       border-radius:20px;
       min-height: 30em;
       max-width:37em;
       justify-content: space-evenly;
   }

   .submission{
        background-color: rgba(65, 0, 139, 0.8);
        color: white;
        border: none;
        padding: 10px 20px;
        font-size: 16px;
        border-radius: 50px;
        box-shadow: 3px 3px 3px 3px rgba(0, 0, 139, 0.58);
        transition: background-color 0.3s ease, transform 0.3s ease;
   }

   .submission:hover {
      background-color: #00d8ff; /* Electric Blue */
      transform: translateY(-2px);
      animation: glowing 1200ms infinite;
   }

   .submission:active {
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