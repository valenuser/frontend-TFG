<template>
    <section class="flex items-center justify-center w-[100%] h-[100vh] bg-[#212121]">
     <div class="flex flex-col  items-center justify-around  rounded-lg w-[350px] h-[700px]">
         <img :src="require('/Users/valentinpavonlopez/Desktop/TFG/tfgfrontend/public/img/logo.png')" alt="">
           <h1 class="text-white font-bold text-[20px] text-center ">SOLICITUD DE AMISTAD</h1>
            <p class="text-white font-bold text-center">Hola {{ username }}!</p>
            <p class="text-[#8d96a0] font-bold text-center"> {{ friendName }} quiere añadirte a sus contactos, acepta la solicitud para poder empezar a hablar!</p>
         <button class="text-white bg-[#3fb950] w-[300px] h-[50px] text-[17px] rounded-md font-bold" @click="addFriend">Aceptar solicitud de amistad</button>
         <hr class="w-[85%]">
         <p class="text-white" @click="backHome">¿No quieres aceptarlo? <span class="text-[#287EFF] cursor-pointer">Ir al inicio</span></p>
     </div>
 </section>
</template>
<script>
import axios from 'axios'
import { useToast } from 'vue-toastification'
export default{
    mounted(){
            axios.post(`http://localhost:3000/token/addFriendToken`,{token:this.$route.params.token})
            .then(response  =>{
                console.log(response);
                const user = response["data"]["user"]["username"]
                const friend = response["data"]["friend"]["username"]
                this.username = user
                this.friendName = friend
            })
            .catch(error =>{
                if(error){
                    console.log(error);
                    this.$router.push({name:'badRequest'})
                }
            })
        },
    data(){
        return{
            toast:useToast(),
            username:'',
            friendName:'',
            userData:'',
            friendData:''
        }
    },
    methods:{
        backHome(){
            this.$router.push({name:'home'})
        },
        addFriend(){
            axios.post('http://localhost:3000/friends/addFriend',{token:this.$route.params.token})
            .then(response  =>{
                if(response){
                    this.toast.success('Nuevo contacto añadido!',{timeout:2000,position:"top-center"})
                    setTimeout(() =>{
                        this.$router.push({name:'home'})
                    },2000)
                }
                
            })
            .catch(error =>{
                console.log(error);
                if(error){
                    this.$router.push({name:'badRequest'})
                }
            })
        }

    }
}
</script>
