<script setup>
   import SignedOutNav from './SignedOutNav.vue'
</script>

<template>
  <div class="landing-container">
  <SignedOutNav/>  
  <div class="landing"></div>  
  <div class="gradient-section"></div>  
  <div class="gradient-section-text">
    <div class="landing-text">
      <h1>Welcome To Super Happy Fun</h1>
      <h1>Akihabara Game Shop!</h1>
      <hr />
      <p>Here at Akihabara Game Shop we specialize in Japanese only games from consoles of the 80's, 90's, and 2000's.</p>
      <p>We also intend to sell manga, figurines, and other merch like dakimakura pillows in the near future!</p>
      <p>Consider browsing our current inventory, it's free. If you wish to purchase an item, please create a new account or login to your current account.</p>
    </div>
  </div>
</div>
</template>

<style scoped>

 
  .landing-container{
    background-image: url('../assets/akiGameshop.png');
     background-attachment: fixed;
     background-position: center;
     background-repeat: no-repeat;
     background-size: cover;
     
     top: 0;
     left: 0;
     margin:auto;
     height: 199vh;
  }
  .landing {
    min-height: 40vh; /* Adjust height for wave section */
    display: flex;
    justify-content: flex-end;
    
    position: relative;
  }

 

  /* First Gradient Section */
  .gradient-section {
    height: 40vh;
    background: linear-gradient(to bottom, rgba(0, 0, 255, 0) 0%, rgba(0, 0, 255, 1) 100%, rgb(0, 0, 104) 100%);
  }

  /* Second Gradient Section for Text */
  .gradient-section-text {
    height: 100vh;
    background-image: linear-gradient( to bottom, rgb(0, 0, 255) 0%  , rgba(0, 0, 0, 1) 30% ,rgba(4, 4, 24, 0.9) 100%);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* Text Styling */
  .landing-text {
    font-size: xx-large;
    font-family: Arial, Helvetica, sans-serif;
   
    color: white;
    width: 60vw;
    padding: 20px;
   
    animation: glowing 1200ms infinite;
    text-align: center;
  }

  .landing-text h1 {
    animation: glowing 1200ms infinite;
    text-align: center;
  }

  @keyframes glowing {
    0% { text-shadow: 0 0 5px darkviolet; }
    50% { text-shadow: 0 0 5px #eebdff; }
    100% { text-shadow: 0 0 5px #9400D3; }
  }

</style>