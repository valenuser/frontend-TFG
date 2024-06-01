<template>
    <div class="w-[100%] flex flex-col items-end justify-end mr-2 mt-2">
        <p class="text-black">{{ message.date }}</p>
        <div class="w-[70%] flex bg-[#007991] text-white rounded-xl relative rounded-br-none">
            <div class="w-[100%] flex flex-wrap p-4">
                <p class="font-bold text-clip m-2">{{ message.msg }}</p>
            </div>
        </div>
        <div class="w-[20%] h-[30px]">
            <div class="flex items-end justify-around">
                <p class="text-black">{{ message.hour }}</p>
                <div v-if="saved == false">
                    <div class="text-grey-400">
                        <i class="fa-solid fa-bookmark" @click="saveMessage"></i>
                    </div>
                </div>
                <div v-else>
                    <i class="fa-solid fa-bookmark text-yellow-600" @click="deleteMessage"></i>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    export default{
        props:{
            message:Object
        },
        data(){
            return{
                saved:true
            }
        },
        methods:{
            saveMessage(){
                    axios.post('http://localhost:3000/messages/saveMessage',{token:this.$route.params.token,message:this.message})
                    .then(response =>{
                        if(response){
                            this.saved = true
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
            },
            deleteMessage(){

                axios.post('http://localhost:3000/messages/deleteUserMessage',{token:this.$route.params.token,message:this.message})
                    .then(response =>{
                        if(response){
                            this.saved = false
                        }
                    })
                    .catch(e =>{
                        console.log(e);
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
    }
</script>