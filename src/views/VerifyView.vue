<template>
     <section class="flex items-center justify-center w-[100%] h-[100vh] bg-[#212121] md:hidden">
      <div class="flex flex-col  items-center justify-around  rounded-lg w-[350px] h-[700px]">
          <img :src="require('../assets/logo.png')" alt="" @click="backHome">
            <h1 class="text-white font-bold text-[20px] text-center ">VERIFICACIÓN DE USUARIO</h1>
            <input type="email" class="w-[300px] h-[50px] text-[20px] rounded-md text-white outline-none bg-black p-2" placeholder="Correo electrónico" v-model="mail">
            <div v-if="state.length != 0">
                <p class="text-red-500 font-bold">{{ state }}</p>
            </div>
            <p class="text-gray-400 text-center">Escribe el número de teléfono con el que te has registrado.</p>
          <button class="text-white bg-[#287EFF] w-[300px] h-[50px] text-[20px] rounded-md" @click="sendCode">Enviar código</button>
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
export default{
  name:'LoginView',
  data(){
    return{
        state:'',
        mail:'',
        toast: useToast()
    }
  },
  components:{
  },
  methods:{
    register(){
      this.$router.push({name:'register'})
    },
    popUp(){
        this.toast.success('Se ha enviado el codigo a tu mail con exito',{timeout:2000,position:"top-center"})

        setTimeout(()=>{
          this.$router.push({name:'login'})
        },3000)
    },
    sendCode(){

        const pastronEmail = /[@]/g

        if(this.mail.match(pastronEmail) != null &&    this.mail.includes('.') != false){
            axios.post('https://backendtfg-tnt9.onrender.com/verifyMail',{mail:this.mail})
            .then(response => {
              console.log('a');
              if(response){
                this.popUp()
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
                this.toast.error(data["msg"],{timeout:2000,position:"top-center"})
              }
            })
        }else{
          this.toast.error('Introduce un mail valido',{timeout:2000,position:"top-center"})
          this.mail = ''
        }
    },
    backHome(){
        this.$router.push({name:'home'})
    }
  }
}
</script>
