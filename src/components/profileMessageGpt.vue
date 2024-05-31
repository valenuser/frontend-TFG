<template>
    <div class="w-[100%] flex flex-col items-center justify-center mr-2 mt-2">
        <p class="font-bold">{{ message.date  }}</p>
        <div class="w-[70%] flex bg-[#03256C] text-white rounded-xl relative ">
            <div class="w-[100%] flex flex-wrap p-4">
                <p class="font-bold text-clip m-2">{{ message.request }}</p>
            </div>
        </div>
        <div class="w-[70%] flex bg-[#2f2f2f] text-white rounded-xl relative mt-2">
            <div class="w-[100%] flex flex-wrap p-4">
                <p class="font-bold text-clip m-2">{{ message.response }}</p>
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
                    <i class="fa-solid fa-bookmark text-yellow-600" @click="saveMessage"></i>
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
                    if(this.saved){
    
                        this.saved = false
                        
                    }else{
                        axios.post('http://localhost:3000/messages/savegptMessage',{token:this.$route.params.token,message:this.message})
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
    
                    }
                }
            }
        }
    </script>