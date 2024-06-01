<template>
    <section class="flex items-center justify-center w-[100%] h-[100vh] bg-[#212121] md:hidden">
        <div class="flex flex-col items-center justify-around  rounded-lg w-[350px] h-[700px]">
            <img :src="require('../assets/logo.png')" alt="">
            <div class="flex flex-col items-center justify-around h-[200px] w-[95%]">
                <h1 class="text-red-500 font-bold text-[23px] text-center ">ACCESO NO AUTORIZADO</h1>
                <p class="text-white text-center ">Perece ser que no se ha podido verificar la cuenta correctamente. Vuelva  a iniciar sesión para poder entrar a su buzon de mensajes.</p>
            </div>
            <button class="text-white bg-[#287EFF] w-[300px] h-[50px] text-[20px] rounded-md" @click="backHome">Volver al inicio</button>
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
export default{
    mounted(){
        const token = localStorage.getItem("token")

        if(token != undefined){
            localStorage.removeItem("token")
        }
    },
    methods:{
            backHome(){
                this.$router.push({name:'home'})
            }
        }
}
</script>