<template>
    <section class="w-[100%] h-[100vh] flex-col md:hidden">
        <div class="w-[100%] h-[20vh] flex flex-col bg-[#2a3942]">
            <div class="w-[100%] h-[10vh] flex items-center justify-between bg-[#2a3942]">
                <div class="rounded-full w-[50px] h-[50px] ml-2  bg-white flex items-center justify-center font-bold text-black text-[20px]" @click="backMain">
                    <p class="text-[20px]">{{ usernameAbreviacion }}</p>
                </div>
            </div>
            <div class="w-[100%] h-[10vh] flex items-center justify-center bg-[#2a3942]">
                <!-- <p class="font-bold text-[20px] text-white">{{ friend["username"] }}</p> -->
                <p class="font-bold text-[20px] text-white">{{ username}}</p>
            </div>
        </div>
        <div class="w-[100%] h-[5vh] flex justify-start  border items-center bg-white p-2">
            <i class="fa-solid fa-envelope mr-2"></i> <p class="font-bold text-[17px] text-black">Email: {{ email }}</p>
        </div>
        <div class="w-[100%] h-[5vh] flex justify-start items-center  bg-white p-2">
            <i class="fa-solid fa-users mr-2"></i> <p class="font-bold text-[17px] text-black">Amigos:   {{ userContacts }}</p>
        </div>
        <div class="w-[100%] h-[40vh] flex justify-center items-center  bg-white p-2">
            <div class="w-[150px] h-[50px] flex justify-center items-center border border-red-500  bg-red-500 border-2 rounded-xl" @click="logout">
                <p class="font-bold text-white">Cerrar sesion</p>
            </div>
        </div>
        <div class="w-[50%] flex justify-around bg-white">
            
        </div>
    </section>
    <section class="hidden items-center justify-center w-[100%] h-[100vh]  bg-[#212121] md:flex">
      <div class="flex flex-col  items-center justify-around  rounded-lg w-[350px] h-[600px]">
          <img :src="require('../assets/logo.png')" alt="">
          <p class="font-bold text-[25px] text-white">Bienvenidos a <span class="text-[#287EFF] cursor-pointer">SENDNOW</span></p>
          <p class="text-white font-bold text-center"> la nueva app de mensajeria con chatGPT integrado!</p>
          <p class="text-red-500 font-bold text-center text-[16.5px] m-2">En este momento la aplicacion no esta disponible para ipads, tablets y PC.</p>
      </div>
  </section>
</template>
<script>
   import axios from 'axios'
    import { useToast } from 'vue-toastification'
    import { mapMutations, mapState } from 'vuex'
   export default{
    data(){
        return{
            toast:useToast(),
            username:'',
            userContacts:'',
            email:''
        }
    },
    mounted(){
        axios.post(`https://backendtfg-tnt9.onrender.com/token/verifyToken`,{token:this.$route.params.token})
        .then(response =>{

            this.userContacts = response["data"]["user"]["friends"].length;
            this.email = response["data"]["user"]["email"];
            this.username = response["data"]["user"]["username"];

        })
        .catch(error =>{
            if(error){
                console.log(error);
                this.$router.push({name:'badRequest'})
            }
        })


    },
    methods:{
        ...mapMutations(['CHANGE_LOGGEAD']),
        logout(){
            axios.post(`https://backendtfg-tnt9.onrender.com/login/logout`,{token:this.$route.params.token})
            .then(response =>{
                console.log(response);
                this.CHANGE_LOGGEAD()
                localStorage.removeItem("token")
                this.$router.push({name:'home'})
            })
            .catch(error =>{
                if(error){
                    console.log(error);
                    this.$router.push({name:'badRequest'})
                }
            })

        },
        backMain(){
            this.$router.push({name:'main',params:{token:this.token}})
        }
    },
    computed:{
        ...mapState(['usernameAbreviacion','newSocket'])
    }
}
</script>