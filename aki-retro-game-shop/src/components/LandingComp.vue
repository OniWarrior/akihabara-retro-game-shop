<script setup>
   import SignedOutNav from './SignedOutNav.vue'
</script>




<template>
  <div class="landing-container">
    <SignedOutNav />  

    <div class="landing-main-txt-group">
      <div class="landing-title-header">
        <h1>Welcome to Akihabara Retro Gaming Shop</h1>
      </div>
      <div class="landing-main-txt-intro">
        <p>
          Hello fellow Otaku. Here at Akiba, we love everything Japanese. 
          From Anime to Manga, from dakimakuras to figurines, we have it 
          here at Akiba. 

        </p>
      </div>

      <div class="landing-main-txt-paragraph">
        <p>
          Many of us on the team are big fans of Studio Ghibli. Perhaps you can
          tell from our hero banner at the top of the page that is in the style of Ghibli.
          At least, we tried to make it that way. 
        </p>
      </div>

      <div class="landing-main-txt-paragraph">
        <p>
          Whether your looking for the newest manga or maybe some collectible merch, 
          we have it here at Akiba. And if we do not have it, chances are we can get it.
          We have a steady stream of inventory coming in from different suppliers in Japan
          and we work towards getting very rare and collectible items for the hardcore collector.
        </p>
      </div>

      <div class="landing-main-txt-paragraph">
        <p>
          Take a look around. We guarantee that you will find something you like!
        </p>
      </div>
      
    </div>  
  </div>

</template>

<style scoped>
.landing-container{
  background-image: url('../assets/aki-hero.png');
  background-position:center;
  background-attachment:scroll;
  background-repeat: no-repeat;
  background-size:cover;
  height:100%;
  width: 100%;  
}

 

</style>