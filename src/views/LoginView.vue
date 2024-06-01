<template>
    <section class="flex items-center justify-center w-[100%] h-[100vh] bg-[#212121] md:hidden">
     <div class="flex flex-col  items-center justify-around  rounded-lg w-[350px] h-[700px]">
         <img :src="require('../assets/logo.png')" alt="" @click="backHome">
           <h1 class="text-white font-bold text-[20px] text-center ">VERIFICACIÓN DE USUARIO</h1>
           <input type="email" class="w-[300px] h-[50px] text-[20px] rounded-md text-white outline-none bg-black p-2" placeholder="Correo electrónico" v-model="mail">
           <input type="number" class="w-[300px] h-[50px] text-[20px] rounded-md text-white outline-none bg-black p-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" placeholder="Codigo de verificación" min="5" max="9" v-model="code">
         <button class="text-white bg-[#287EFF] w-[300px] h-[50px] text-[20px] rounded-md" @click="login">Iniciar sesión</button>
         <hr class="w-[85%]">
         <p class="text-white" @click="register">¿No estás registrado? <span class="text-[#287EFF] cursor-pointer">Registrarse</span></p>
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
import { useToast } from 'vue-toastification'
import { mapMutations } from 'vuex'
export default{
 name:'LoginView',
 data(){
    return{
        code:'',
        mail:'',
        toast:useToast()
    }
 },
 methods:{
  ...mapMutations(['ADD_USER_TOKEN']),
   register(){
     this.$router.push({name:'register'})
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
    popUpError(message){
        if(message.type == 'mail'){
            this.toast.error(message.data,{timeout:2000,position:"top-center"})
            this.mail = ''
        }else if(message.type == 'code'){
            this.toast.error(message.data,{timeout:2000,position:"top-center"})
            this.code = ''
        }
    },
    userLoggead(token){
      this.$router.push({name:'main',params:{token:token}})
    },
   login(){

      if(this.code == '' && this.mail == ''){
        this.toast.error("Rellene los campos correctamente.",{timeout:2000,position:"top-center"})
      }else if( this.code.length < 5 ){
          this.popUpError({type:'code',data:'Introduce el codigo correctamente.'})
      }else if(this.verifyEmail() == false){
        this.popUpError({type:'mail',data:'Introduce un correo valido.'})
      }else{
        
        try{
            axios.post('http://localhost:3000/login',{mail:this.mail,code:this.code})
              .then(response => {
                this.ADD_USER_TOKEN(response["data"]["token"])
                localStorage.setItem("token",response["data"]["token"])
                this.userLoggead(response["data"]["token"])
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
          this.toast.error(e,{timeout:2000,position:"top-center"})
        }

      }
    },
    backHome(){
        this.$router.push({name:'home'})
    }
  }
}
</script>
