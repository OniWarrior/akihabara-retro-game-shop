/*
 * Author : Stephen Aranda
 * File   : UserStore.js
 * Desc   : Store that is used to track user state.
 */

import { defineStore } from "pinia";
import api from "@/api/client";

export const UserStore = defineStore("user", {
    state: () => ({
        user: {},      // user obj that contains {user_id,username,authenticated}
        loading: false, // is the action loading? boolean value
        error: ""       // error message in the event an action fails
    })
})