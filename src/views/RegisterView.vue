<template>
    <section class="flex items-center justify-center w-[100%] h-[100vh] bg-[#212121]">
        <div class="flex flex-col  items-center justify-around  rounded-lg w-[350px] h-[650px]">
            <img :src="require('/Users/valentinpavonlopez/Desktop/TFG/tfgfrontend/public/img/logo.png')" alt="">
            <div class="w-[300px] h-[250px] flex flex-col justify-around items-center ">
                <VueTelInput v-model="phone" class="w-[300px] h-[50px] text-[15px] rounded-2xl outline-none p-2 bg-white"/>
                <div class="flex flex-col text-center">
                    <input type="text" class="w-[300px] h-[50px] text-[20px] rounded-md text-white outline-none bg-black p-2" placeholder="Nombre de usuario">
                    <p class="text-gray-500">(maximo 20 caracteres)</p>
                </div>
                <button class="text-white bg-[#287EFF] w-[300px] h-[50px] text-[20px] rounded-md">Registrarse</button>
            </div>
            <hr class="w-[85%]">
            <p class="text-white">Ya estas registrado? <span class="text-[#287EFF] cursor-pointer" @click="login">Iniciar sesion</span></p>
        </div>
    </section>
</template>
<script>
import {VueTelInput}  from 'vue-tel-input';
export default{
    name:'RegisterView',
    components:{
        VueTelInput
    },
    methods:{
    login(){
      this.$router.push({name:'home'})
    }
  }
}
</script>