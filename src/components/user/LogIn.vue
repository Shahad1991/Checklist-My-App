<template>
 <v-container class="log-in" fill-height>

<br/><br/><br/><br/><br/>
     <v-col cols="12">
       <h2 :style="{ fontWeight: '700' }">Login</h2>
       <v-text-field
         v-model="name"
         placeholder="Indtast dit navn"
         :style="{ color: 'rgb(62, 122, 0)' }"
         id="name"
         name="name"
         autocomplete="name"
       ></v-text-field>
       <v-text-field
         v-model="password"
         placeholder="Indtast dit password"
         :style="{ color: 'rgb(62, 122, 0)' }"
         id="password"
         name="password"
         type="password"
         autocomplete="current-password"
       ></v-text-field>
       <v-btn
         rounded="xl"
         size="x-large"
         variant="flat"
         @click="loginUser"
         class="login-button"
         :style="{ backgroundColor: 'rgb(62, 122, 0)', color: '#fff', width: '100%', maxWidth: '300px' }"
       >
         Login
       </v-btn>
       <br/>
       <v-btn
         rounded="xl"
         size="x-large"
         variant="flat"
         @click="navigateBack"
         class="back-button"
         :style="{ border: '3px solid rgb(62, 122, 0)', width: '100%', maxWidth: '300px', background: '#fff', color: '#000' }"
       >
         Registrere
       </v-btn>
     </v-col>


 </v-container>
</template>


<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';


export default {
 name: 'LogIn',
 setup() {
   const name = ref('');
   const password = ref('');
   const router = useRouter();
   const store = useStore();


   const loginUser = async () => {
     if (!name.value || !password.value) {
       alert('Navn og password skal udfyldes!');
       return;
     }


     try {
       const payload = {
         name: name.value,
         password: password.value
       };
       console.log('Sending login payload to backend:', payload);


       const response = await fetch('http://localhost:3000/api/auth/login', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json'
         },
         body: JSON.stringify(payload)
       });
       const data = await response.json();
       console.log('Response from backend:', data);


       if (data.auth) {
         localStorage.setItem('token', data.token);
         localStorage.setItem('userName', data.user.name);
         localStorage.setItem('userLevel', data.user.level);
         localStorage.setItem('totalPoints', data.user.points);
         store.commit('setToken', data.token);
         store.commit('setUserInfo', data.user);
         alert('Login successful!');
         router.push('/frontPage');
       } else {
         alert('Login failed!');
       }
     } catch (error) {
       console.error('Error logging in:', error);
       alert('Der opstod en fejl ved login.');
     }
   };


   const navigateBack = () => {
     router.push('/register');
   };


   return {
     name,
     password,
     loginUser,
     navigateBack
   };
 },
};
</script>


<style scoped>
.log-in {
 display: flex;
 min-height: 100vh;
 background: #000 url(@/images/forside.svg);
 background-size: cover;
 background-position: center;
 justify-content: center;
 align-items: center;
 flex-direction: column;

}


h2 {
 color: #fff;
 text-align: center;
 margin-bottom: 1.5rem;
}


.v-text-field {
 width: 100%;
 max-width: 400px;
 margin: 0 auto;
 font-size: 1.5rem;
 margin-bottom: 2rem;
}


.v-text-field input::placeholder {
 color: rgb(62, 122, 0);
}


.login-button,
.back-button {
 font-size: 1em;
 color: #fff;
 background-color: #4caf50;
 border-radius: 5px;
 width: 100%;
 margin: 0 auto;
 display: flex;
 justify-content: center;

}


@media (max-width: 600px) {
 .v-text-field {
   font-size: 1rem;
 }


 .login-button,
 .back-button {
   font-size: 0.875em;
 }
}
</style>


