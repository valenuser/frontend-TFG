<template>
  <section class="flex items-center justify-center w-[100%] md:h-[100vh] bg-[#212121]">
      <div class="flex flex-col  items-center justify-around  rounded-lg w-[350px] h-[750px]">
          <!-- <img :src="require('/Users/valentinpavonlopez/Desktop/TFG/tfgfrontend/public/img/logo.png')" alt=""> -->
          <QRCodeVue3 :value="urlQR" :qrOptions="{ typeNumber: '0', mode: 'Byte', errorCorrectionLevel: 'Q' }" :imageOptions="{ hideBackgroundDots: true, imageSize: 0.4, margin: 0 }" :dotsOptions="{ type: 'square', color: 'black' }" :cornersSquareOptions="{ type: 'square', color: 'black' }"/>
          <p class="text-white font-bold text-center">Escanea el código qr para obtener el código de verificación e iniciar sesión.</p>
          <button class="text-white bg-[#287EFF] w-[300px] h-[50px] text-[20px] rounded-2xl" @click="login">Verificar codigo</button>
          <hr class="w-[85%]">
          <p class="text-white" @click="register">¿No estás registrado? <span class="text-[#287EFF] cursor-pointer">Registrarse</span></p>
      </div>
  </section>
</template>
<script>
import QRCodeVue3 from 'qrcode-vue3';
export default{
  name:'LoginView',
  components:{
    QRCodeVue3
  },
  data(){
    return{
      urlQR:'http://192.168.1.45:8080/verify/a'
    }
  },
  methods:{
    register(){
      this.$router.push({name:'register'})
    },
    login(){
      this.$router.push({name:'login'})
    }
  }
}
</script>
