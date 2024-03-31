<template>
    <section class="flex items-center justify-center w-[100%] md:h-[100vh] bg-[#212121]">
     <div class="flex flex-col  items-center justify-around  rounded-lg w-[350px] h-[750px]">
         <img :src="require('/Users/valentinpavonlopez/Desktop/TFG/tfgfrontend/public/img/logo.png')" alt="">
           <h1 class="text-white font-bold text-[20px] text-center ">VERIFICACIÓN DE USUARIO</h1>
           <input type="number" class="w-[300px] h-[50px] text-[20px] rounded-2xl text-white outline-none bg-black p-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" placeholder="Numero de teléfono" min="5" max="9">
           <input type="number" class="w-[300px] h-[50px] text-[20px] rounded-2xl text-white outline-none bg-black p-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" placeholder="Codigo de verificación" min="5" max="9">
         <button class="text-white bg-[#287EFF] w-[300px] h-[50px] text-[20px] rounded-2xl" >Iniciar sesión</button>
         <hr class="w-[85%]">
         <p class="text-white" @click="register">¿No estás registrado? <span class="text-[#287EFF] cursor-pointer">Registrarse</span></p>
     </div>
 </section>
</template>
<script>
export default{
 name:'LoginView',
 methods:{
   register(){
     this.$router.push({name:'register'})
   }
 }
}
</script>
