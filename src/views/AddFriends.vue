<template>
    <section class="w-[100%] h-[100vh] flex-col bg-[#2a3942] md:hidden">
        <div class="w-[95%] h-[10vh] flex items-center justify-between">
            <div class="rounded-full w-[50px] h-[50px] ml-2  bg-white flex items-center justify-center font-bold text-black text-[20px] " @click="backMain">
                <p>{{ usernameAbreviacion }}</p>
            </div>
            <div class="w-[80%] flex  items-center justify-between">
                <input type="text" class="w-[92%] h-[40px] rounded-lg outline-none p-2" placeholder="Buscar nuevos contactos..." v-model="contact"  @keypress="searchUser" @keydown="searchUser">
            </div>
        </div>
        <div class="w-[95%] h-[10vh] flex items-center justify-center">
            <p class="font-bold text-[20px] text-white">Nuevos contactos</p>
        </div>
        <div v-if="newFriends.length == 0">
            <div class="w-[100%] h-[80vh] flex items-center justify-center">
               <p class="text-white font-bold">No se encontraron contactos...</p>
            </div>
        </div>
        <div v-else>
            <div class="w-[95%] h-[80vh] flex flex-wrap justify-around">
                <div v-for="contactData in newFriends" :key="contactData">
                    <NewFriend :contactName="contactData"/>
                </div>
            </div>
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
    import {  mapState }  from 'vuex' 
    import NewFriend from '../components/NewFriend.vue'
    export default{
    data(){
        return{
            username:'',
            contact:'',
            newFriends:'',
            toast:useToast()
        }
    },
    components:{
        NewFriend
    },
    mounted(){
        axios.post(`http://localhost:3000/token/verifyToken`,{token:this.$route.params.token})
        .then(response  =>{
            
            console.log(response["data"]);

            this.username = response["data"]["user"]["username"].substr(0,2).toUpperCase()
            })
        .catch(error =>{
            if(error){
                console.log(error);
                this.$router.push({name:'badRequest'})
            }
        })
    },
    methods:{
        backMain(){
            this.$router.push({name:'main',params:{token:this.$route.params.token}})
        },
        searchUser(){
            console.log(this.contact);
            if(this.contact.includes(" ")){
                this.toast.error("Escriba correctamente el nombre del contacto.",{timeout:2000,position:"top-center"})
            }else{
                if(this.contact != "")
                {
                    axios.post(`http://localhost:3000/find`,{token:this.$route.params.token, username:this.contact})
                    .then(response  => {
    
                        this.newFriends = []
                        this.newFriends = response["data"]["users"]
                    })
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
                }else{
                    this.newFriends = []
                }
            }
        }
    },
    computed:{
        ...mapState(['friends','usernameAbreviacion'])
    }
}
</script>