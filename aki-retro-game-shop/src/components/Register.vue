<script setup>
   import SignedOutNav from '../components/SignedOutNav.vue'
   import RegisterSchema from '../formschemas/RegisterSchema.js'
   import {useAuthStore} from '../stores/AuthStore'

   const authStore = useAuthStore()

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
               type="text"
               name="username"
               required

            />
        </fieldset>


    </form>
    
    
</template>