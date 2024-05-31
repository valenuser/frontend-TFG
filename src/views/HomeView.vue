<template>
  <section class="flex items-center justify-center w-[100%] md:h-[100vh] bg-[#212121]">
      <div class="flex flex-col  items-center justify-around  rounded-lg w-[350px] h-[800px] m-2">
          <img :src="require('/Users/valentinpavonlopez/Desktop/TFG/tfgfrontend/public/img/logo.png')" alt="">
          <QRCodeVue3 :value="urlQR" :qrOptions="{ typeNumber: '0', mode: 'Byte', errorCorrectionLevel: 'Q' }" :imageOptions="{ hideBackgroundDots: true, imageSize: 0.4, margin: 0 }" :dotsOptions="{ type: 'square', color: 'black' }" :cornersSquareOptions="{ type: 'square', color: 'black' }"/>
          <p class="text-white font-bold text-center">Escanea el código qr para obtener el código de verificación e iniciar sesión.</p>
          <div class="flex-col justify-around text-center">
            <p class="text-gray-600 font-bold text-center text-[16.5px] m-2">No puedes escanear el código qr?</p>
            <span class="text-[#287EFF] cursor-pointer font-bold text-[18px]" @click="verify">Obtener código de verificacion</span>
          </div>
          <button class="text-white bg-[#287EFF] w-[300px] h-[50px] text-[20px] rounded-md" @click="login">Verificar codigo</button>
          <hr class="w-[85%]">
          <p class="text-white" @click="register">¿No estás registrado? <span class="text-[#287EFF] cursor-pointer">Registrarse</span></p>
      </div>
  </section>
</template>
<script>
import QRCodeVue3 from 'qrcode-vue3';
import axios from 'axios';
import { useToast } from 'vue-toastification'
export default{
  name:'LoginView',
  components:{
    QRCodeVue3
  },
  data(){
    return{
      urlQR:'http://192.168.1.11:8080/verify',
      toast:useToast()
    }
  },
  mounted(){
    axios.get('http://localhost:3000/login/loggead')
    .then(response =>{
      console.log(response);
    })
    .catch(e =>{
      if(e){
        this.toast.error('No se ha podido iniciar sesion automaticamente',{timeout:2000,position:"top-center"})
      }
    })
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
  }
}
</script>
