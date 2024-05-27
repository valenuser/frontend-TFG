<template>
    <section class="w-[100%] h-[100vh] flex-col bg-[#2a3942]">
        <div class="w-[100%] h-[10vh] flex items-center justify-between">
            <div class="rounded-full w-[50px] h-[50px] ml-2  bg-white flex items-center justify-center font-bold text-black text-[20px]">
                <p class="text-[20px]">{{ userName }}</p>
            </div>
            <div class="w-[180px] flex justify-around">
                <i class="fa-solid fa-magnifying-glass text-white text-[30px]"></i>
                <i class="fa-solid fa-user-group text-white text-[30px]"></i>
                <i class="fa-solid fa-ellipsis-vertical text-white text-[30px]"></i>
            </div>
        </div>
        <div class="w-[100%] h-[10vh] flex items-center justify-center">
            <p class="font-bold text-[20px] text-white">Chat</p>
        </div>
        <div class="w-[100%] h-[80vh] bg-white">
            <div class="flex items-center justify-center w-[100%] xl:h-[75vh] h-[72vh]">
                
            </div>
            <div class="w-[100%] xl:h-[55px] h-[52px]   flex items-center justify-around ">
                    <input type="text" class="xl:w-[50%] xl:h-[55px]  w-[85%]  h-[40px] border bg-[#2a3942] rounded-lg outline-none p-2 text-[15px] text-white" v-model="text"><button class="rounded-full bg-[#2a3942] w-[40px] h-[40px] text-white flex items-center justify-center" @click="sendMessage"><i class="fa-solid fa-paper-plane"></i></button>
            </div>
        </div>
        
    </section>
</template>
<script>
    import axios from 'axios'
    import io from 'socket.io-client'
    export default{
    data(){
        return{
            mensajes:[],
            userName:'',
            text:''
        }
    },
    mounted(){
        axios.post(`http://localhost:3000/token/verifyToken`,{token:this.$route.params.token})
        .then(response =>{
             if(response){

                this.userName = response["data"]["user"][0]["username"].substr(0,2).toUpperCase()
                
                this.socketInstance = io('http://localhost:3000')

                this.socketInstance.emit('message',{'msg':'hola','user':response["data"]["user"][0]})

                this.socketInstance.on('message',(msg)=>{
                    console.log(msg);
                })


                
             }
        })
        .catch(error =>{
            if(error){
                this.$router.push({name:'badRequest'})
            }
        })
    },
    methods:{
        sendMessage(){

            this.socketInstance.emit('message',{'msg':this.text})
        }
    }
}
</script>