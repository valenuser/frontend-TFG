<template>
  <section class="flex items-center justify-center w-[100%] h-[100vh]  bg-[#212121] md:hidden">
      <div class="flex flex-col  items-center justify-around  rounded-lg w-[350px] h-[600px]">
          <img :src="require('../assets/logo.png')" alt="">
          <p class="font-bold text-[25px] text-white">Bienvenidos a <span class="text-[#287EFF] cursor-pointer">SENDNOW</span></p>
          <p class="text-white font-bold text-center"> la nueva app de mensajeria con chatGPT integrado!</p>
          <div class="flex-col justify-around text-center">
            <p class="text-gray-600 font-bold text-center text-[16.5px] m-2">No sabes tu codigo de verificación?</p>
            <span class="text-[#287EFF] cursor-pointer font-bold text-[18px]" @click="verify">Obtener codigo de verificación</span>
          </div>
          <button class="text-white bg-[#287EFF] w-[300px] h-[50px] text-[20px] rounded-md" @click="login">Verificar codigo</button>
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
import { useToast } from 'vue-toastification'
export default{
  name:'LoginView',
  components:{

  },
  data(){
    return{
      urlQR:'http://192.168.1.11:8080/verify',
      toast:useToast()
    }
  },
  mounted(){
    
    const token = localStorage.getItem("token")

    if(token != undefined){
      this.$router.push({name:'main',params:{token:token}})
    }
  },
  methods:{
    register(){
      this.$router.push({name:'register'})
    },
    login(){
      this.$router.push({name:'login'})
    },
    verify(){
      this.$router.push({name:'verify'})
    }
  },
  computed:{

  }
}
</script>
