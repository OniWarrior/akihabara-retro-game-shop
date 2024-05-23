<script setup>
    import SignedOutNav from '../components/SignedOutNav.vue'
    import RegisterSchema from '../formschemas/RegisterSchema.js'
    import {useAuthStore} from '../stores/AuthStore'
    import {useFormValidation} from '../hooks/useFormValidation'

    const authStore = useAuthStore()

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
               name="username"
               required
               @input="onInputChange"
            />

            <div class="errors">
                <span>{{ errors.username }}</span>
            </div>
        </fieldset>


    </form>
    
    
</template>