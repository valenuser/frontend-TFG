<template>
    <section class="w-[100%] h-[100vh] flex-col bg-[#0D1321]">
        <div class="w-[100%] h-[10vh] flex items-center justify-between">
            <div class="rounded-full w-[50px] h-[50px] ml-2  bg-white flex items-center justify-center font-bold text-black text-[20px]">
                <p>VP</p>
            </div>
            <div class="w-[180px] flex justify-around">
                <i class="fa-solid fa-magnifying-glass text-white text-[30px]"></i>
                <i class="fa-solid fa-user-group text-white text-[30px]"></i>
                <i class="fa-solid fa-ellipsis-vertical text-white text-[30px]"></i>
            </div>
        </div>
        <div class="w-[100%] h-[10vh] flex items-center justify-center">
            <p class="font-bold text-[20px] text-white">Chats</p>
        </div>
        <div v-if="mensajes.length == 0">
            <div class="w-[100%] h-[80vh] flex items-center justify-center">
                <p class="text-white font-bold">No hay chats guardados...</p>
            </div>
        </div>
    </section>
</template>
<script>
    import axios from 'axios'
    // import io from 'socket.io-client'
    export default{
    data(){
        return{
            mensajes:[],
        }
    },
    mounted(){
        axios.post(`http://localhost:3000/token/verifyToken`,{token:this.$route.params.token})
        .then(response =>{
             if(response){
                
                // this.socketInstance = io('http://localhost:3000')

                // this.socketInstance.emit('message','hola')

                // this.socketInstance.on('message',(msg)=>{
                //     console.log(msg);
                // })


                
             }
        })
        .catch(error =>{
            if(error){
                this.$router.push({name:'badRequest'})
            }
        })
    },
    methods:{
    }
}
</script>