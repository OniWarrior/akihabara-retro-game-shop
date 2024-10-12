<script setup>
   import SignedOutNav from './SignedOutNav.vue'
</script>

<template>
  
  <SignedOutNav/>
  <div class="landing">
    
    <svg class="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 300">
      <path fill="rgba(0, 0, 139, 0.8)" fill-opacity="1" d="M0,256L48,240C96,224,192,192,288,160C384,128,480,96,576,112C672,128,768,192,864,213.3C960,235,1056,213,1152,181.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
    </svg>
    <div class="landing-text">
      <h1>Welcome To Super Happy Fun</h1>
      <h1>Akihabara Game Shop!</h1>
      <hr />
      <p>Here at Akihabara Game Shop we specialize in Japanese only games from consoles of the 80's, 90's, and 2000's.</p>
      <p>We also intend to sell manga, figurines, and also other merch like dakimakura pillows in the near future!</p>
      <p>Consider browsing our current inventory, it's free. If you wish to purchase an item, please create a new account or login to your current account.</p>
    </div>
  </div>

  
</template>

<style scoped>
   
   
   .landing {
   
    height: 40%; /* Adjust height to take up half of the container */
    display: flex;
    flex-direction: column;
    justify-content: flex-end; /* Align the content to the bottom */
    width:100vw;
    
   }

   .wave {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height:auto;
    
   }
   .landing-text{
       
       font-size: xx-large;
       font-family: Arial, Helvetica, sans-serif;       
       padding: 20px;
       text-align: center;
       margin-top:12vh;
       
       color:white;
       
       animation: glowing 1200ms infinite;
       

   }
   .landing-text h1{
        
        
        animation: glowing 1200ms infinite;
        text-align: center;
      
   }

   @keyframes glowing {
        0% {
          
          text-shadow: 0 0 5px darkviolet;
          
          
        }
        50% {
          
          text-shadow: 0 0 5px #eebdff;
          
          
        }
        100% {
          
          text-shadow: 0 0 5px #9400D3;
          
          
        }
      }
</style>

