<template>
    <div class="flex flex-col items-center justify-center w-[150px] h-[150px] text-center bg-[#212121] rounded-lg ">  
        <div class="rounded-full w-[50px] h-[50px]  bg-white flex items-center justify-center font-bold text-black text-[20px] ">
            <p>{{ contactName["username"].substr(0,2).toUpperCase() }}</p>
        </div>
        <p class="text-white">{{ contactName["username"] }}</p>
        <button class="bg-green-600 text-white font-bold w-[100px] h-[40px] text-[12px] rounded-lg" @click="sendFriend">Add friend</button>
    </div>
</template>
<script>
    import axios from 'axios'
export default{
    props:{
        contactName:Object
    },
    methods:{
        sendFriend(){
            axios.post(`https://backendtfg-tnt9.onrender.com/friends/add`,{token:this.$route.params.token,email:this.contactName["email"]})
            .then(response  =>  console.log(response))
            .catch(error =>{
                        const data = error["response"]["data"]
    
                        if(data.length > 1)
                        {
    
                            data.forEach(element => {
                            this.toast.error(element.msg,{timeout:2000,position:"top-center"})
                            });
    
                        }else{
                        this.toast.error(data.msg,{timeout:2000,position:"top-center"})
                        }
    
            })
        }
    }
}
</script>