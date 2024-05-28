<template>
    <section class="w-[100%] h-[100vh] flex-col bg-[#2a3942]">
        <div class="w-[100%] h-[10vh] flex items-center justify-between">
            <div class="rounded-full w-[50px] h-[50px] ml-2  bg-white flex items-center justify-center font-bold text-black text-[20px]">
                <p class="text-[20px]">{{ usernameAbreviacion }}</p>
            </div>
            <div class="w-[100px] flex justify-end mr-2">
                <i class="fa-solid fa-ellipsis-vertical text-white text-[30px]"></i>
            </div>
        </div>
        <div class="w-[100%] h-[10vh] flex items-center justify-center">
            <p class="font-bold text-[20px] text-white">{{ friendName }}</p>
        </div>
        <div class="w-[100%] h-[80vh] bg-white">
            <div class="flex flex-col items-center justify-center w-[100%] xl:h-[75vh] h-[72vh] overflow-auto">
                <div v-if="mensajes.length != 0">
                    <div v-for="message in mensajes" :key="message">
                        <p class="font-bold">{{ message["msg"] }}</p>
                    </div>
                </div>
            </div>
            <div class="w-[100%] xl:h-[55px] h-[52px]   flex items-center justify-around ">
                    <input type="text" class="xl:w-[50%] xl:h-[55px]  w-[85%]  h-[40px] border bg-[#2a3942] rounded-lg outline-none p-2 text-[15px] text-white" v-model="text"><button class="rounded-full bg-[#2a3942] w-[40px] h-[40px] text-white flex items-center justify-center" @click="sendMessage"><i class="fa-solid fa-paper-plane"></i></button>
            </div>
        </div>
        
    </section>
</template>
<script>    
    import { mapState }  from 'vuex' 
    import axios from 'axios'
    export default{
    data(){
        return{
            mensajes:[],
            friendName:'',
            text:'',
            socket:''
        }
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
            this.mensajes.push({'msg':this.text})
            this.newSocket.emit('messageChat',{'msg':this.text,id:this.socket})

            // this.newSocket.on('messageChat',(msg)=>{
            //         console.log(msg);
            //         this.mensajes.push(msg)
            //     })
        }
    },
    computed:{
        ...mapState(['usernameAbreviacion','newSocket'])
    }
}
</script>