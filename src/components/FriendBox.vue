<template>
    <div class="flex flex-col items-center justify-center w-[150px] h-[150px] text-center bg-[#212121] rounded-lg" @click="chat">  
        <div class="rounded-full w-[50px] h-[50px]  bg-white flex items-center justify-center font-bold text-black text-[20px] ">
            <p>{{ contactName["username"].substr(0,2).toUpperCase() }}</p>
        </div>
        <p class="text-white">{{ contactName["username"] }}</p>
    </div>
</template>
<script>
import axios from 'axios'
export default{
    props:{
        contactName:Object
    },
    methods:{
        chat(){
            axios.post('https://backendtfg-tnt9.onrender.com/token/chatToken',{token:this.$route.params.token, friend: this.contactName})
            .then(response =>{

                this.$router.push({name:'chat',params:{token:response["data"]}})
            })
            .catch(error =>{
            if(error){
                this.$router.push({name:'badRequest'})
            }
        })
        }
    }
}
</script>