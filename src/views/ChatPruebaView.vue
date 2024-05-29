<template>
    <section class="w-[100%] h-[100vh] flex-col bg-[#2a3942]">
        <div class="w-[100%] h-[10vh] flex items-center justify-between">
            <div class="rounded-full w-[50px] h-[50px] ml-2  bg-white flex items-center justify-center font-bold text-black text-[20px]">
                <p class="text-[20px]">{{ usernameAbreviacion }}</p>
            </div>
            <div class="w-[100px] flex items-end justify-around mr-2">
                <div v-if="gpt == false">
                    <i class="fa-brands fa-slack text-white text-[30px]" @click="askGptInput"></i>
                </div>
                <div v-else>
                    <i class="fa-brands fa-slack text-yellow-600 text-[30px]" @click="askGptInput"></i>
                </div>
                <i class="fa-solid fa-ellipsis-vertical text-white text-[30px]"></i>
            </div>
        </div>
        <div class="w-[100%] h-[10vh] flex items-center justify-center">
            <p class="font-bold text-[20px] text-white">{{ friendName }}</p>
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
                        <input type="text" class="xl:w-[50%] xl:h-[55px]  w-[85%]  h-[40px] border bg-[#2f2f2f] rounded-lg outline-none p-2 text-[15px] text-white text-clip" v-model="textGpt"><button class="rounded-full bg-[#2f2f2f] w-[40px] h-[40px] text-white flex items-center justify-center" @click="askGpt"><i class="fa-solid fa-wand-magic-sparkles"></i></button>
                </div>
            </div>
        </div>
        
    </section>
</template>
<script>    
    import { useToast } from 'vue-toastification'
    import MessageFriend from '../components/MessageFriend.vue' 
    import MessageUser from '../components/MessageUser.vue' 
    import MessageGpt from '../components/MessageGpt.vue' 
    import { mapState }  from 'vuex' 
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
        axios.post(`http://localhost:3000/token/verifyTokenChat`,{token:this.$route.params.token})
        .then(response =>{
             if(response){
                console.log(response["data"]);
                this.friendName = response["data"]["friend"]["username"]
                this.socket = response["data"]["friend"]["socketId"]

                this.newSocket.on('messageChat',(msg)=>{
                    console.log(msg);
                    this.mensajes.push(msg)
                })

        }})
        .catch(error =>{
            if(error){
                console.log(error);
                this.$router.push({name:'badRequest'})
            }
        })
    },
    methods:{
        sendMessage(){
            this.mensajes.push({'msg':this.text,id:this.socket,name:this.friendName,hour:new Date().getHours()+":"+new Date().getMinutes(), date:new Date().getFullYear()+"/"+new Date().getMonth()+"/"+new Date().getDay(),type:'user'})
            this.newSocket.emit('messageChat',{'msg':this.text,id:this.socket,name:this.friendName,hour:new Date().getHours()+":"+new Date().getMinutes(), date:new Date().getFullYear()+"/"+new Date().getMonth()+"/"+new Date().getDay(),type:'user'})
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
                const data = {message:this.textGpt,hour:new Date().getHours()+":"+new Date().getMinutes(),date:new Date().getFullYear()+"/"+new Date().getMonth()+"/"+new Date().getDay(),type:'gpt'}
                axios.post('http://localhost:3000/gpt/messageGpt',{token:this.$route.params.token,message:data})
                .then(response=>{
                    console.log(response["data"]);
                    if(response){
                        const gptResponse = {message:response["data"]["message"],response:response["data"]["response"]}
                    
                        console.log(gptResponse);

                        this.mensajes.push(gptResponse)

                        this.textGpt = ''
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
        }
    },
    computed:{
        ...mapState(['usernameAbreviacion','newSocket'])
    }
}
</script>