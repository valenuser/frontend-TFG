<template>
    <section class="w-[100%] h-[100vh] flex-col bg-[#2a3942] md:hidden">
        <div class="w-[100%] h-[10vh] flex items-center justify-between">
            <div class="rounded-full w-[50px] h-[50px] ml-2  bg-white flex items-center justify-center font-bold text-black text-[20px]">
                <p>{{ usernameAbreviacion }}</p>
            </div>
            <div class="w-[180px] flex justify-around">
                <i class="fa-solid fa-user-group text-white text-[30px]"  @click="AddFriends"></i>
                <i class="fa-solid fa-ellipsis-vertical text-white text-[30px]" @click="userProfile"></i>
            </div>
        </div>
        <div class="w-[100%] h-[10vh] flex items-center justify-center">
            <p class="font-bold text-[20px] text-white">Chats</p>
        </div>
        <div v-if="friends.length != 0">
            <div class="w-[100%]  flex flex-wrap items-start justify-around">
                <div v-for="contactData in friends" :key="contactData">
                    <FriendBox :contactName="contactData"/>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="w-[100%] h-[80vh] flex  items-center justify-center">
                <button class="text-white font-bold bg-black w-[180px] h-[40px] rounded-lg" @click="AddFriends">Añadir contactos</button>
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
    import { mapState, mapMutations }  from 'vuex' 
    import FriendBox from '../components/FriendBox.vue'
import { useToast } from 'vue-toastification'
    export default{
    data(){
        return{
            username:'',
            toast:useToast()
        }
    },
    components:{
        FriendBox
    },
    mounted(){
        axios.post(`http://localhost:3000/token/verifyToken`,{token:this.$route.params.token})
        .then(response  =>{

            this.ADD_USER_TOKEN(this.$route.params.token)

            this.ADD_USERNAME(response["data"]["user"]["username"].substr(0,2).toUpperCase()),
            this.ADD_CHATS(response["data"]["user"]["friends"])

            console.log(response["data"]["user"]["friends"]);

            this.newSocket.emit('message',{'user':response["data"]["user"]})




            this.newSocket.emit('updateSocket',{'user':response["data"]["user"]})


            this.newSocket.on('message',(id)=>{
                this.CHANGE_LOGGEAD()
                this.ADD_SOCKET(id["id"])

            })

            this.newSocket.on('updateSocket',(msg)=>{

                if(this.loggead){
                    const user = msg["user"]
        
                    const socket = msg["socket"]

                    this.UPDATE_SOCKET_FRIENDS(user,socket)

                }

    
    
            })

            this.newSocket.on('notAvailable',(msg)=>{

                if(this.loggead){
                    const info = []
        
                    info.push(msg)
        
                    const verify = info.find(x => x == msg)
        
                    if(verify == undefined){
                        this.toast.error(msg,{timeout:1000,position:"top-center"})
                        
                    }


                }


            })

        } )
        .catch(error =>{
            if(error){
                console.log(error);
                this.$router.push({name:'badRequest'})
            }
        })
        
    },
    methods:{
        ...mapMutations(['ADD_USERNAME','ADD_CHATS','ADD_SOCKET','ADD_USER_TOKEN','CHANGE_LOGGEAD','UPDATE_SOCKET_FRIENDS']),
        AddFriends(){
            this.$router.push({name:'friends',params:{token:this.$route.params.token}})
        },
        userProfile(){
            this.$router.push({name:'profile',params:{token:this.$route.params.token}})
        }
    },
    computed:{
        ...mapState(['friends','usernameAbreviacion','newSocket','loggead'])
    }
}
</script>