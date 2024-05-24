<script setup>
   import SignedOutNav from './SignedOutNav.vue';
</script>

<template>
    <SignedOutNav/>
    <h1>Login</h1>
    <fieldset>
        <legend>Login Credentials</legend>
        <label for="username">Username:</label>
        <input
           id="username"
           type="text"
           name="username"
           placeholder="username"
           required

        />

        <div class="errors">

        </div>

        <label for="password">Password:</label>
        <input
           id="password"
           type="password"
           name="password"
           placeholder="Password"
           required
        />
        <div class="errors">

        </div>
    </fieldset>
    <button class="register-btn" type="submit">Login</button>
    
</template>