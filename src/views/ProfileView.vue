<template>
    <section class="w-[100%] h-[100vh] flex-col md:hidden">
        <div class="w-[100%] h-[30vh] bg-[#2a3942]">
            <div class="w-[100%] h-[10vh] flex items-center justify-between bg-[#2a3942]">
                <div class="rounded-full w-[50px] h-[50px] ml-2  bg-white flex items-center justify-center font-bold text-black text-[20px]" @click="backChat">
                    <p class="text-[20px]">{{ usernameAbreviacion }}</p>
                </div>
                <div class="w-[100px] flex items-end justify-end mr-2">
                    <i class="fa-solid fa-user-minus text-red-500 text-[30px]" @click="deleteFriend"></i>
                </div>
            </div>
            <div class="w-[100%] h-[10vh] flex items-center justify-center bg-[#2a3942]">
                <p class="font-bold text-[20px] text-white">{{ friend["username"] }}</p>
            </div>
        </div>
        <div class="w-[100%] h-[5vh] border flex justify-start  items-center bg-white p-2">
            <i class="fa-solid fa-envelope mr-2"></i> <p class="font-bold text-[17px] text-black">Email: {{ friend["email"] }}</p>
        </div>
        <div class="w-[100%] h-[5vh] border flex justify-start items-center  bg-white p-2">
            <i class="fa-solid fa-users mr-2"></i> <p class="font-bold text-[17px] text-black">Amigos:   {{ friendContacts}}</p>
        </div>
        <div class="w-[100%] h-[5vh] flex justify-start items-center  bg-white p-2">
            <i class="fa-solid fa-star mr-2"></i><p class="font-bold text-[17px] text-black">Mensajes archivados</p>
        </div>
        <div class="w-[50%] flex justify-around bg-white">
            <div class="bg-[#287EFF] text-white font-bold p-2 rounded-2xl" @click="changeMessageView">
                <p class="text-[10px]">Mensajes</p>
            </div>
            <div class="bg-black text-white font-bold p-2 rounded-2xl" @click="changeMessageView">
                <p class="text-[10px]">Consultas GPT</p>
            </div>
        </div>
        <div class="w-[100%] h-[50vh] flex flex-col overflow-auto p-2">
            <div v-if="messagesView == false">
                    <div class="flex flex-col w-[100%]  p-2">
                        <div v-if="this.profileMensajes.length != 0">
                            <div v-for="message in this.profileMensajes" :key="message">
                                <div v-if="message.firstUsername == friend.username">
                                        <profileMessageUser :message="message"/>
                                </div>
                                <div v-else-if="message.firstUsername != friend.username ">
                                    <profileMessageFriend :message="message"/>
                                </div>
                            </div>
                        </div>
                        <div v-else>
                            <div class="flex h-[30vh] items-center justify-center">
                                <p>No se han encontrado mensajes archivados.</p>
                            </div>
                        </div>
                    </div>
            </div>
            <div v-else>
                <div class="flex flex-col w-[100%]  p-2">
                        <div v-if="this.profileMensajesGpt.length != 0">
                            <div class="w-[100%] overflow-auto p-2">
                                <div v-for="gptmessage in this.profileMensajesGpt" :key="gptmessage">
                                    <profileMessageGpt :message="gptmessage"/>
                                </div>
                            </div>
                        </div>
                        <div v-else>
                            <div class="h-[30vh] flex items-center justify-center">
                                <p>No se han encontrado mensajes archivados.</p>
                            </div>
                        </div>
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
   import { mapState, mapMutations }  from 'vuex' 
   import profileMessageFriend from '../components/profileMessageFriend.vue' 
    import profileMessageUser from '../components/profileMessageUser.vue'
    import profileMessageGpt from '../components/profileMessageGpt.vue' 
    import { useToast } from 'vue-toastification'
   export default{
    data(){
        return{
            friend:'',
            friendContacts:'',
            messagesView:false,
            toast:useToast(),
            friendSocket:''
        }
    },
    components:{
        profileMessageFriend,
        profileMessageUser,
        profileMessageGpt
    },
    mounted(){
        axios.post(`https://backendtfg-tnt9.onrender.com/token/verifyTokenChat`,{token:this.$route.params.token})
        .then(response =>{
                this.friendContacts = response["data"]["friend"]["friends"].length;
                this.friend = response["data"]["friend"]
                this.friendSocket = response["data"]["friend"]["socketId"]

                this.dataMessages()
                
        })
        .catch(error =>{
            if(error){
                console.log(error);
                this.$router.push({name:'badRequest'})
            }
        })




    },
    methods:{
        ...mapMutations(['ADD_USER_MESSAGE','ADD_GPT_MESSAGE','DELETE_GPT_MESSAGE','DELETE_USER_MESSAGE','DELETE_CHAT_MESSAGE']),
        backChat(){
            this.$router.push({name:'chat',params:{token:this.$route.params.token}})
        },
        changeMessageView(){
            if(this.messagesView){
                console.log(this.profileMensajes);
                this.messagesView = false
            }else{
                this.messagesView = true
            }
        },
        dataMessages(){
            axios.post(`https://backendtfg-tnt9.onrender.com/messages/messagesChat`,{token:this.$route.params.token})
            .then(response =>{

                        this.DELETE_USER_MESSAGE()
                        response["data"]["messagesUsers"].forEach(e =>{
                            this.ADD_USER_MESSAGE(e)
                        })
                        
                        this.DELETE_GPT_MESSAGE()
                        response["data"]["gpt"].forEach(e =>{
                            this.ADD_GPT_MESSAGE(e)
                        })
            })
            .catch(error =>{
                    console.log(error);
                    
            })
        },
        deleteFriend(){
            axios.post(`https://backendtfg-tnt9.onrender.com/friends/deleteFriend`,{token:this.$route.params.token})
            .then(response =>{
                    if(response){

                        this.newSocket.emit('backMain',{id:this.friendSocket})

                        this.DELETE_CHAT_MESSAGE()

                        this.$router.push({name:'main',params:{token:this.token}})
                    }
            })
            .catch(e =>{
                const data = e["response"]["data"]
    
                if(data.length > 1)
                {

                    data.forEach(element => {
                    console.log(element);
                    this.toast.error(element.msg,{timeout:2000,position:"top-center"})
                    });

                }else{
                console.log(data);
                this.toast.error(data.msg,{timeout:2000,position:"top-center"})
                }
            })
        }
    },
    computed:{
        ...mapState(['usernameAbreviacion','profileMensajes','profileMensajesGpt','token','newSocket'])
    }
}
</script>