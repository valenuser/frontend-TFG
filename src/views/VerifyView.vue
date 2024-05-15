<template>
     <section class="flex items-center justify-center w-[100%] md:h-[100vh] bg-[#212121]">
      <div class="flex flex-col  items-center justify-around  rounded-lg w-[350px] h-[750px]">
          <img :src="require('/Users/valentinpavonlopez/Desktop/TFG/tfgfrontend/public/img/logo.png')" alt="">
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
            axios.post('http://localhost:3000/verifyMail',{mail:this.mail})
            .then(response => {
            if(response.status == 200){
                this.popUp()
            }else{
              this.toast.error('El mail introducido no esta registrado',{timeout:2000,position:"top-center"})
            }
            })
            .catch(e =>{
              console.log(e);
            })
        }else{
          this.toast.error('Introduce un mail valido',{timeout:2000,position:"top-center"})
          this.mail = ''
        }
    }
  }
}
</script>
