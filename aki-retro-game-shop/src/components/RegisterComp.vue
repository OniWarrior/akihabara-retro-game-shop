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
    <div class="reg-container">
    <SignedOutNav/>
   
    <div class="reg-main">
      <div class="reg-box">
        
       <form class="reg-form-container" @submit.prevent="onRegisterSubmit">        
          
         <div class="reg-header">
          <h2>Register</h2>
         </div>
         <div class="input-group">

         
          <div class="legends-group">
            <label for="username">Username:</label>
            <label for="password">Password:</label>
          </div>
          
          <div class="text-box-group">
             <input
             id="username"
             type="text"
             class="text-box"
             v-model="data.username"
             name="username"
             placeholder="username"
             required
             @input="onInputChange"

             />

            

             <input
             id="password"
             type="password"
             name="password"
             class="text-box"
             v-model="data.password"
             placeholder="Password"
             required
             @input="onInputChange"
             />

          </div>  
          
         
                 
          <div class="errors-group">
             <div class="errors">
               <span>{{ errors.username }}</span>
             </div>
             <div class="errors">
               <span>{{ errors.password }}</span>
             </div>

          </div>
         
        </div>
        <div class="reg-btn-container">
          <button class="reg-btn" type="submit">Login</button>
        </div>
        
       </form>
        
      <div class="reg-img-container"> </div>
     </div>
    </div>
  </div>  
    
    
</template>


<style scoped>
 .errors{
      color:red;
   }
  

   .reg-btn-container{
    padding-top: 4em;
    text-align: center;
   }


   .input-group{
    display: flex;
    flex-direction: row;
    margin:auto;
    justify-content: space-evenly;
   }


   .legends-group{
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
   }

   .text-box-group{
    display: flex;
    flex-direction: column;
    width: 15em;
   }


   .reg-main{
    min-height:100vh;
    padding-top:5%;
    background-color:black;
   }


   .reg-box{
        display: flex;
        flex-direction: row;         
         background-color: white;
         border-radius:20px;
         min-height: 30em;
         max-width:70em;
         margin:auto;
         
   }

   .reg-img-container{
      width:60em;
      height:30em;
      background-image: url("../assets/akihabara_new_signup.png");
      background-attachment: scroll;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      border-radius: 20px;
   }
   
   .text-box{
    min-height: 2em;
    
    border-radius: 20px;
   }


   .reg-form-container h1{
      font-size: xx-large;
      

   }


   .reg-form-container{
       margin:auto;
       
       font-family: Arial, Helvetica, sans-serif;
       color:black;
       
       align-items: center;
       width:100%;
       height:40%;
       
   }

   .reg-btn{
       background-color: rgba(222, 184, 135, 0.906);
       color: white;
       border: none;
       padding: 10px 20px;
       font-size: 16px;
       border-radius: 50px;
       box-shadow: 3px 3px 3px 3px rgba(222, 184, 139, 0.58);
       transition: background-color 0.3s ease, transform 0.3s ease;
        
   }

   .reg-btn:hover {
      background-color: #00d8ff; /* Electric Blue */
      transform: translateY(-2px);
      animation: glowing 1200ms infinite;
   }

   .reg-btn:active {
      background-color: #ffdd00; /* Bright Yellow */
      transform: translateY(0);
   }

   .reg-header{
    font-size: x-large;
    text-align: center;
    padding-bottom: 3em;
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