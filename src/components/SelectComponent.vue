<template>
    <vue-tel-input v-model="phone" mode="international"></vue-tel-input>
  </template>
  
  <script>
    import { ref } from 'vue';
    import { VueTelInput } from 'vue-tel-input';
  
    export default {
      components: {
        VueTelInput,
      },
  
      setup() {
        const phone = ref(null);
  
        return {
          phone,
        };
      },
    };
  </script>