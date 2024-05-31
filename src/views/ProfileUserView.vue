<template>
    <section class="w-[100%] h-[100vh] flex-col">
        <div class="w-[100%] h-[10vh] flex items-center justify-between bg-[#2a3942]">
            <div class="rounded-full w-[50px] h-[50px] ml-2  bg-white flex items-center justify-center font-bold text-black text-[20px]" @click="backChat">
                <p class="text-[20px]">{{ usernameAbreviacion }}</p>
            </div>
            <div class="w-[100px] flex items-end justify-end mr-2">
                <i class="fa-solid fa-user-minus text-red-500 text-[30px]" @click="deleteFriend"></i>
            </div>
        </div>
        <div class="w-[100%] h-[10vh] flex items-center justify-center bg-[#2a3942]">
            <!-- <p class="font-bold text-[20px] text-white">{{ friend["username"] }}</p> -->
            <p class="font-bold text-[20px] text-white">valen</p>
        </div>
        <div class="w-[100%] h-[5vh] border flex justify-start  items-center bg-white p-2">
            <!-- <i class="fa-solid fa-envelope mr-2"></i> <p class="font-bold text-[17px] text-black">Email: {{ friend["email"] }}</p> -->
            <i class="fa-solid fa-envelope mr-2"></i> <p class="font-bold text-[17px] text-black">Email: valen</p>
        </div>
        <div class="w-[100%] h-[5vh] border flex justify-start items-center  bg-white p-2">
            <!-- <i class="fa-solid fa-users mr-2"></i> <p class="font-bold text-[17px] text-black">Amigos:   {{ friendContacts}}</p> -->
            <i class="fa-solid fa-users mr-2"></i> <p class="font-bold text-[17px] text-black">Amigos:   valen</p>
        </div>
        <div class="w-[100%] h-[5vh] flex justify-start items-center  bg-white p-2">
            <i class="fa-solid fa-star mr-2"></i><p class="font-bold text-[17px] text-black">Mensajes archivados</p>
        </div>
        <div class="w-[50%] flex justify-around bg-white">
            
        </div>
    </section>
</template>
<script>
   import axios from 'axios'
    import { useToast } from 'vue-toastification'
   export default{
    data(){
        return{
            toast:useToast()
        }
    },
    mounted(){
        axios.post(`http://localhost:3000/token/verifyToken`,{token:this.$route.params.token})
        .then(response =>{
            console.log(response);
        })
        .catch(error =>{
            if(error){
                console.log(error);
                this.$router.push({name:'badRequest'})
            }
        })


    },
    methods:{
    },
}
</script>