<template>
     <section class="flex items-center justify-center w-[100%] md:h-[100vh] bg-[#212121]">
      <div class="flex flex-col  items-center justify-around  rounded-lg w-[350px] h-[750px]">
          <img :src="require('/Users/valentinpavonlopez/Desktop/TFG/tfgfrontend/public/img/logo.png')" alt="">
            <h1 class="text-white font-bold text-[20px] text-center ">VERIFICACIÓN DE USUARIO</h1>
            <SelectComponent class="w-[300px] h-[50px] text-[15px] rounded-2xl outline-none p-2 bg-white" v-model="vueTel.phone" v-bind="vueTel.props"/>
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
import SelectComponent from '@/components/SelectComponent.vue'
import axios from 'axios'
export default{
  name:'LoginView',
  data(){
    return{
        state:'',
        vueTel: {
            phone: "",
            props: {
            preferredCountries: ["US", "GB"],
            placeholder: "Enter your phone",
            mode: "international",
            inputOptions: {
                showDialCode: true
            },
            disabledFormatting: false,
            wrapperClasses: "country-phone-input"
            }
        }
    }
  },
  components:{
    SelectComponent
  },
  methods:{
    register(){
      this.$router.push({name:'register'})
    },
    sendCode(){
        const number = this.vueTel.phone.substring(3)
        if(Number(number) && number.length == 9){
            axios.post('http://localhost:3000/verifyCode',{phone:this.vueTel.phone})
            .then(response => console.log(response.data))
        }else{
            console.log('no es numero');
        }
    }
  }
}
</script>
