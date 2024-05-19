<template>
    <section class="flex items-center justify-center w-[100%] md:h-[100vh] bg-[#212121]">
     <div class="flex flex-col items-center justify-around  rounded-lg w-[350px] h-[700px]">
         <img :src="require('/Users/valentinpavonlopez/Desktop/TFG/tfgfrontend/public/img/logo.png')" alt="">
         <div class="flex flex-col items-center justify-around h-[200px] w-[95%]">
             <h1 class="text-red-500 font-bold text-[23px] text-center ">ACCESO NO AUTORIZADO</h1>
              <p class="text-white text-center ">Perece ser que no se ha podido verificar la cuenta correctamente. Vuelva  a iniciar sesión para poder entrar a su buzon de mensajes.</p>
         </div>
         <button class="text-white bg-[#287EFF] w-[300px] h-[50px] text-[20px] rounded-md" @click="backHome">Volver al inicio</button>

     </div>
 </section>
</template>
<script>
export default{
    methods:{
            backHome(){
                this.$router.push({name:'home'})
            }
        }
}
</script>