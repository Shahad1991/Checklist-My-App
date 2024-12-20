<template>
 <v-container class="app">
   <v-container v-if="showWelcome" class="forside" fill-height>
     <v-row align="center" justify="center">
       <v-col>
         <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
         <h1 :style="{ fontWeight: '700' }">Velkommen</h1>
         <br />
         <br /><br /><br /><br />
         <p :style="{ fontWeight: '700' }">Gør noget for at passe på fremtiden</p>
         <br /><br /><br />
         <v-btn
             rounded="xl"
             size="x-large"
             variant="flat"
             :style="{ backgroundColor: 'rgb(62, 122, 0)', width: '100%', color:'#fff', maxWidth:'400px' }"
             type="submit" @click="navigateToLogin" class="login-button">Login
         </v-btn>
         <v-btn rounded="xl"
                size="x-large"
                variant="flat"
                :style="{ backgroundColor: 'rgb(62, 122, 0)', width: '100%', color:'#fff', maxWidth:'400px' }"
                type="submit" @click="navigateToRegister" class="register-button">Opret dig som bruger
         </v-btn>
       </v-col>
     </v-row>
   </v-container>
   <router-view v-if="!showWelcome"></router-view>
 </v-container>
</template>


<script>
import { ref, provide } from 'vue';
import { useRouter } from 'vue-router';


export default {
 name: 'App',
 setup() {
   const showWelcome = ref(true);
   const name = ref('');
   const password = ref('');
   const router = useRouter();
   provide('name', name);
   provide('password', password);


   const hideWelcome = () => {
     showWelcome.value = false;
   };


   const navigateToLogin = () => {
     hideWelcome();
     router.push('/');
   };


   const navigateToRegister = () => {
     hideWelcome();
     router.push('/register');
   };


   return {
     showWelcome,
     hideWelcome,
     name,
     password,
     navigateToLogin,
     navigateToRegister
   };
 },
};
</script>


<style scoped>
.v-container {
 padding: 0;
}
.forside {
 font-family: Avenir, Helvetica, Arial, sans-serif;
 text-align: center;
 color: #fff;
 background: #000 url('@/images/forside.svg');
 background-size: cover;
 background-position: center;


}


h1, p {
 color: #fff;
}


.login-button, .register-button {
 font-size: 1em;
 color: #fff;
 background-color: #4caf50;
 border-radius: 5px;
 padding: 0.5em 1em;
 width: 100%;
 margin: 20px;
}
</style>
