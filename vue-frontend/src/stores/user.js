import { defineStore } from 'pinia'
import { ref } from "vue"
import { onAuthStateChanged } from "firebase/auth";
import {auth} from "@/firebase"

export const useUserStore = defineStore('user', ()=>{

    const user = ref(null)

    function autoLogin(){
        onAuthStateChanged(auth, (userInfo)=>{  
            
            if (userInfo) {
                user.value = userInfo
              } else {
                // User is signed out
              }
        })
    }

    return {
        user, autoLogin
    }
})