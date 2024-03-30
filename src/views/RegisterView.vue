<template>
    <section class="flex items-center justify-center w-[100%] h-[100vh] bg-[#212121]">
        <div class="flex flex-col  items-center justify-around  rounded-lg w-[350px] h-[650px]">
            <img :src="require('/Users/valentinpavonlopez/Desktop/TFG/tfgfrontend/public/img/logo.png')" alt="">
            <div class="w-[300px] h-[50px] rounded-2xl flex items-center bg-white p-1 justify-center font-bold">
              <img src="https://rotulosmatesanz.com/wp-content/uploads/2017/09/2000px-Google_G_Logo.svg_.png" alt="" class="w-[30px]">
              <p class="ml-2">Registrarse con Google</p>
            </div>
            <p class="text-white">Or</p>
            <div class="w-[300px] h-[250px] flex flex-col justify-around items-center ">
                <input type="text" class="w-[300px] h-[50px] text-[20px] rounded-2xl text-white outline-none bg-black p-2" placeholder="Nombre de usuario">
                <input type="email" class="w-[300px] h-[50px] text-[20px] rounded-2xl text-white outline-none bg-black p-2" placeholder="Correo electrónico">
                <input type="passsword" class="w-[300px] h-[50px] text-[20px] rounded-2xl text-white outline-none bg-black p-2" placeholder="Contraseña">
                <button class="text-white bg-[#287EFF] w-[300px] h-[50px] text-[20px] rounded-2xl">Registrarse</button>
            </div>
            <hr class="w-[85%]">
            <p class="text-white">Ya estas registrado? <span class="text-[#287EFF] cursor-pointer" @click="login">Iniciar sesion</span></p>
        </div>
    </section>
</template>
<script>
export default{
    name:'RegisterView',
    methods:{
    login(){
      this.$router.push({name:'login'})
    }
  }
}
</script>