<template>
    <section class="w-[100%] h-[100vh] flex-col bg-[#2a3942]">
        <div class="w-[100%] h-[10vh] flex items-center justify-between">
            <div class="rounded-full w-[50px] h-[50px] ml-2  bg-white flex items-center justify-center font-bold text-black text-[20px]">
                <p>{{ usernameAbreviacion }}</p>
            </div>
            <div class="w-[180px] flex justify-around">
                <i class="fa-solid fa-user-group text-white text-[30px]"  @click="AddFriends"></i>
                <i class="fa-solid fa-ellipsis-vertical text-white text-[30px]"></i>
            </div>
        </div>
        <div class="w-[100%] h-[10vh] flex items-center justify-center">
            <p class="font-bold text-[20px] text-white">Chats</p>
        </div>
        <div v-if="friends.length != 0">
            <div class="w-[100%]  flex flex-wrap items-center justify-center">
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
</template>
<script>
    import axios from 'axios'
    import { mapState, mapMutations }  from 'vuex' 
    import FriendBox from '../components/FriendBox.vue'
    export default{
    data(){
        return{
            username:''
        }
    },
    components:{
        FriendBox
    },
    mounted(){
        axios.post(`http://localhost:3000/token/verifyToken`,{token:this.$route.params.token})
        .then(response  =>{

            this.ADD_USERNAME(response["data"]["user"]["username"].substr(0,2).toUpperCase()),
            this.ADD_CHATS(response["data"]["user"]["friends"])

            this.newSocket.emit('message',{'user':response["data"]["user"]})

            this.newSocket.on('message',(id)=>{

                this.ADD_SOCKET(id["id"])

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
        ...mapMutations(['ADD_USERNAME','ADD_CHATS','ADD_SOCKET']),
        AddFriends(){
            this.$router.push({name:'friends',params:{token:this.$route.params.token}})
        }
    },
    computed:{
        ...mapState(['friends','usernameAbreviacion','newSocket'])
    }
}
</script>