<template>
    <section class="w-[100%] h-[100vh] flex-col bg-[#2a3942] md:hidden">
        <div class="w-[100%] h-[10vh] flex items-center justify-between">
            <div class="rounded-full w-[50px] h-[50px] ml-2  bg-white flex items-center justify-center font-bold text-black text-[20px]" @click="backMain">
                <p class="text-[20px]">{{ usernameAbreviacion }}</p>
            </div>
            <div class="w-[100px] flex items-end justify-around mr-2">
                <div v-if="gpt == false">
                    <i class="fa-brands fa-slack text-white text-[30px]" @click="askGptInput"></i>
                </div>
                <div v-else>
                    <i class="fa-brands fa-slack text-yellow-600 text-[30px]" @click="askGptInput"></i>
                </div>
                <i class="fa-solid fa-ellipsis-vertical text-white text-[30px]" @click="profile"></i>
            </div>
        </div>
        <div class="w-[100%] h-[10vh] flex items-center justify-center">
            <div class="w-[57%] flex items-end justify-end">
                <p class="font-bold text-[20px] text-white">{{ friendName }}</p>
            </div>
            <div class="w-[43%] flex items-center justify-center">
                <div class="w-[100px] h-[30px] bg-black rounded-md flex items-center justify-center" @click="sendAdvice">
                    <p class="text-white font-bold">Avisar</p>
                </div>
            </div>
        </div>
        <div class="w-[100%] h-[80vh] bg-white">
            <div class="flex flex-col w-[100%] xl:h-[72vh] h-[72vh] overflow-auto p-2">
                <div v-if="mensajes.length != 0">
                    <div v-for="message in mensajes" :key="message">
                        <div v-if="message.name == friendName && message.type == 'user'">
                                <MessageUser :message="message"/>
                        </div>
                        <div v-else-if="message.name != friendName && message.type == 'user'">
                            <MessageFriend :message="message"/>
                        </div>
                        <div v-else>
                            <MessageGpt :message="message"/>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="gpt == false">
                <div class="w-[100%] xl:h-[55px] h-[52px]   flex items-center justify-around ">
                        <input type="text" class="xl:w-[50%] xl:h-[55px]  w-[85%]  h-[40px] border bg-[#2a3942] rounded-lg outline-none p-2 text-[15px] text-white text-clip" v-model="text"><button class="rounded-full bg-[#2a3942] w-[40px] h-[40px] text-white flex items-center justify-center" @click="sendMessage"><i class="fa-solid fa-paper-plane"></i></button>
                </div>
            </div>
            <div v-else>
                <div class="w-[100%] xl:h-[55px] h-[52px]   flex items-center justify-around ">
                        <input type="text" class="xl:w-[50%] xl:h-[55px]  w-[85%]  h-[40px] border bg-black rounded-lg outline-none p-2 text-[15px] text-white text-clip animate__animated animate__fadeIn" v-model="textGpt"><button class="rounded-full bg-black w-[40px] h-[40px] text-white flex items-center justify-center animate__animated animate__fadeIn" @click="askGpt"><i class="fa-solid fa-arrow-up"></i></button>
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
    import { useToast } from 'vue-toastification'
    import MessageFriend from '../components/MessageFriend.vue' 
    import MessageUser from '../components/MessageUser.vue'
    import MessageGpt from '../components/MessageGpt.vue' 
    import { mapMutations, mapState }  from 'vuex' 
    import axios from 'axios'

    export default{
    data(){
        return{
            mensajes:[],
            friendName:'',
            text:'',
            textGpt:'',
            socket:'',
            gpt:false,
            toast:useToast()
        }
    },
    components:{
        MessageFriend,
        MessageUser,
        MessageGpt
    },
    mounted(){
            this.mensajes = this.mensajesChat

            axios.post(`https://backendtfg-tnt9.onrender.com/token/verifyTokenChat`,{token:this.$route.params.token})
            .then(response =>{
                 if(response){

                    this.newSocket.emit('notAvailable',{'user':response["data"]["user"]})

                    this.friendName = response["data"]["friend"]["username"]
                    this.socket = response["data"]["friend"]["socketId"]
    
    
            }})
            .catch(error =>{
                if(error){
                    console.log(error);
                    this.$router.push({name:'badRequest'})
                }
            })

            this.newSocket.on('messageChat',(msg)=>{
                        const data = this.mensajes.find(x => x.hour == msg.hour && x.date == msg.date && x.msg == msg.msg)

                        if(data == undefined){

                            this.mensajes.push(msg)
                        }
                    })

            this.newSocket.on('backMain',()=>{
                this.DELETE_CHAT_MESSAGE()
                this.$router.push({name:'main',params:{token:this.token}})
            })
    },
    methods:{
        ...mapMutations(['ADD_CHAT_MESSAGE','DELETE_CHAT_MESSAGE']),
        sendMessage(){
            const day = String(new Date().getDate()).padStart(2, '0');
            const month = String(new Date().getMonth() + 1).padStart(2, '0');
            const year = new Date().getFullYear();

            const data = {'msg':this.text,id:this.socket,name:this.friendName,hour:String(new Date().getHours()).padStart(2,'0')+":"+String(new Date().getMinutes()).padStart(2,'0'), date:year+"/"+month+"/"+day,type:'user'}

            this.mensajes.push(data)
            this.newSocket.emit('messageChat',data)
            this.text = ''
        },
        askGptInput(){
            if(this.gpt){

                this.gpt = false

            }else{

                this.gpt = true

            }
        },
        askGpt(){
            if(this.textGpt == '' || this.textGpt.trim() == ' '){
                this.toast.error('El formato de la pregunta no es valida.',{timeout:2000,position:"top-center"})
            }else{

                const day = String(new Date().getDate()).padStart(2, '0');
                const month = String(new Date().getMonth() + 1).padStart(2, '0');
                const year = new Date().getFullYear();

                const data = {message:this.textGpt,hour:String(new Date().getHours()).padStart(2,'0')+":"+String(new Date().getMinutes()).padStart(2,'0'),date:year+"/"+month+"/"+day,type:'gpt'}
                axios.post('https://backendtfg-tnt9.onrender.com/gpt/messageGpt',{token:this.$route.params.token,message:data})
                .then(response=>{

                    if(response){
                        const gptResponse = {message:response["data"]["message"],response:response["data"]["response"]}
                    

                        this.mensajes.push(gptResponse)

                        this.textGpt = ''
                    }
                })
                .catch(e =>{
                        const data = e["response"]["data"]

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
        },
        profile(){
            this.ADD_CHAT_MESSAGE(this.mensajes)
            this.$router.push({name:'profileFriend',params:{token:this.$route.params.token}})
        },
        backMain(){
            this.DELETE_CHAT_MESSAGE()
            this.$router.push({name:'main',params:{token:this.token}})
        },
        sendAdvice(){
            try{
                axios.post('https://backendtfg-tnt9.onrender.com/messages/sendAdvice',{token:this.$route.params.token})
                .then(response => {
                    this.toast.success(response["data"]["msg"],{timeout:2000,position:"top-center"})
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

            }catch(e){
            this.toast.error('Ups... ocurrio un error inesperado.',{timeout:2000,position:"top-center"})
            }
        }
    },
    computed:{
        ...mapState(['usernameAbreviacion','newSocket','token','mensajesChat'])
    }
}
</script>