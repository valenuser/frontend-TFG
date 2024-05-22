<template>
    <section class="flex items-center justify-center w-[100%] h-[100vh] bg-[#212121]">
        <div class="flex flex-col  items-center justify-around  rounded-lg w-[350px] h-[650px]">
            <img :src="require('/Users/valentinpavonlopez/Desktop/TFG/tfgfrontend/public/img/logo.png')" alt="">
            <div class="w-[300px] h-[250px] flex flex-col justify-around items-center ">
                <input type="email" class="w-[300px] h-[50px] text-[20px] rounded-md text-white outline-none bg-black p-2" placeholder="Correo electrónico" v-model="mail">
                <div class="flex flex-col text-center">
                    <input type="text" class="w-[300px] h-[50px] text-[20px] rounded-md text-white outline-none bg-black p-2" placeholder="Nombre de usuario" v-model="username">
                    <p class="text-gray-500">(maximo 20 caracteres)</p>
                </div>
                <button class="text-white bg-[#287EFF] w-[300px] h-[50px] text-[20px] rounded-md" @click="register">Registrarse</button>
            </div>
            <hr class="w-[85%]">
            <p class="text-white">Ya estas registrado? <span class="text-[#287EFF] cursor-pointer" @click="login">Iniciar sesion</span></p>
        </div>
    </section>
</template>
<script>
import axios from 'axios'
import { useToast } from 'vue-toastification'

export default{
    name:'RegisterView',
    data(){
        return{
            mail:'',
            username:'',
            toast:useToast()
        }
    },
    methods:{
    login(){
      this.$router.push({name:'home'})
    },
    popUp(){
        this.toast.success('Gracias por registrarte!',{timeout:2000,position:"top-center"})

        setTimeout(()=>{
          this.$router.push({name:'home'})
        },3000)
    },
    popUpError(message){
        if(message.type == 'email'){
            this.toast.error(message.data,{timeout:2000,position:"top-center"})
            this.mail = ''
            this.mail = ''
        }else if(message.type == 'username'){
            this.toast.error(message.data,{timeout:2000,position:"top-center"})
            this.mail = ''
            this.username = ''
        }
    },
    verifyEmail(){
        const patronEmail = /[@]/g
        if(this.mail.match(patronEmail) == null || this.mail.includes('.') == false || this.mail.includes(' ')){
            this.popUpError({type:'email',data:'El email no es valido'})

            return false
        }else{
            return true
        }
    },
    verifyUsername(){
        if(this.username.length < 3 || this.username.length > 20 || this.username.includes(' ')){
            this.popUpError({type:'username',data:'El nombre de usuario no es valido'})
            return false
        }else{
            return true
        }
    },
    register(){
        if(this.username == ' ' || this.mail == ' ' || this.username.length == 0 || this.mail.length == 0){
            this.toast.error('No se han proporcionado los datos correctamente',{timeout:2000,position:"top-center"})
        }else{
            const emailCheck = this.verifyEmail()
            const userCheck = this.verifyUsername() 
            
            if( emailCheck != false && userCheck != false ){
            axios.post('http://localhost:3000/register',{email:this.mail,username:this.username})
            .then(response =>{
                    if(response){
                        this.popUp()
                    }
                }
            )
              .catch(e =>{
                const data = e["response"]["data"]

                if(data.length > 1)
                {

                    data.forEach(element => {
                      this.toast.error(element.msg,{timeout:2000,position:"top-center"})
                    });

                }else{
                    this.toast.error(data.msg,{timeout:2000,position:"top-center"})
                    this.mail = ''
                    this.username = ''
                }
                })
            }
        }
    }
  }
}
</script>