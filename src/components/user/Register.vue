<template>
 <form class="register" @submit.prevent="register">
   <br /><br />
   <h2>Register</h2>
   <input
     type="text"
     placeholder="Name"
     v-model="register_form.name"
     :style="{ color: 'rgb(62, 122, 0)', borderBottom: '1px solid rgb(62, 122, 0)' }"
     required
   />
   <input
     type="email"
     placeholder="Email address"
     v-model="register_form.email"
     :style="{ color: 'rgb(62, 122, 0)', borderBottom: '1px solid rgb(62, 122, 0)' }"
     required
   />
   <input
     type="tel"
     placeholder="Phone"
     v-model="register_form.phone"
     :style="{ color: 'rgb(62, 122, 0)', borderBottom: '1px solid rgb(62, 122, 0)' }"
   />
   <input
     type="password"
     placeholder="Password"
     v-model="register_form.password"
     :style="{ color: 'rgb(62, 122, 0)', borderBottom: '1px solid rgb(62, 122, 0)' }"
     required
   />
   <input
     type="password"
     placeholder="Confirm Password"
     v-model="register_form.confirm_password"
     :style="{ color: 'rgb(62, 122, 0)', borderBottom: '1px solid rgb(62, 122, 0)' }"
     required
   />
   &nbsp;&nbsp;
   <v-btn
     rounded="xl"
     size="x-large"
     variant="flat"
     :style="{ border: '5px solid rgb(62, 122, 0)', width: '100%', color:'#000', maxWidth:'400px' }"
     type="submit"
   >
     Opret
   </v-btn>
 </form>
</template>


<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';


export default {
 name: 'RegisterView',
 setup() {
   const store = useStore();
   const router = useRouter();
   const register_form = ref({
     name: '',
     email: '',
     phone: '',
     password: '',
     confirm_password: '',
   });


   const isPasswordStrong = (password) => {
     return password.length >= 8; // Add more complex checks as needed
   };


   const register = async () => {
     if (!isPasswordStrong(register_form.value.password)) {
       alert('Password must be at least 8 characters long.');
       return;
     }
     if (register_form.value.password !== register_form.value.confirm_password) {
       alert('Passwords do not match.');
       return;
     }


     try {
       const response = await fetch('http://localhost:3000/api/auth/register', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
           name: register_form.value.name,
           email: register_form.value.email,
           phone: register_form.value.phone,
           password: register_form.value.password,
         }),
       });


       if (!response.ok) {
         const errorData = await response.json();
         throw new Error(errorData.message || 'Registration failed');
       }


       const data = await response.json();
       localStorage.setItem('token', data.token);
       localStorage.setItem('userName', data.user.name);
       localStorage.setItem('userLevel', data.user.level);
       localStorage.setItem('totalPoints', data.user.points);


       // Update Vuex state
       store.commit('setToken', data.token);
       store.commit('setUserInfo', data.user);


       alert('Registration successful!');
       router.push('/forside');
     } catch (error) {
       alert(error.message || 'Registration failed. Please try again.');
     }
   };


   return {
     register_form,
     register,
   };
 },
};
</script>


<style>
.register {
 display: flex;
 min-height: 100vh;
 background: #000 url(@/images/forside.svg);
 background-size: cover;
 background-position: center;
 justify-content: center;
 align-items: center;
}


form {
 display: flex;
 flex-direction: column; /* Stack inputs vertically */
 padding: 2rem; /* Adjust padding */
 background: rgba(255, 255, 255, 0.8); /* Optional: add a background for better readability */
 border-radius: 8px; /* Optional: add rounded corners */
 box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Optional: add shadow */
}


h2 {
 text-align: center; /* Center the heading */
 margin-bottom: 1.5rem; /* Space below the heading */
 color: #fff;
}


input {
 appearance: none;
 border: none;
 outline: none;
 display: block;
 width: 100%;
 max-width: 400px;
 margin: 0 auto;
 font-size: 1.5rem;
 margin-bottom: 2rem;
 padding: 0.5rem 0rem;
}


input:not([type='submit']) {
 opacity: 0.8;
 transition: 0.4s;
}


input:focus:not([type='submit']) {
 opacity: 1;
}


input::placeholder {
 color: rgb(62, 122, 0);
}


form.register input[type='submit'] {
 background-color: #3e7a00;
 font-weight: 700;
 padding: 1rem 2rem;
 border-radius: 18px;
 cursor: pointer;
 text-transform: uppercase;
}


.error-message {
 color: red;
 font-size: 1rem;
 text-align: center;
 margin-bottom: 1rem;
}


@media (max-width: 600px) {
 form {
   padding: 1rem; /* Reduce padding on smaller screens */
 }


 .input-field {
   font-size: 1.2rem; /* Smaller font size for inputs */
 }


 .login-button,
 .register-button {
   font-size: 1.2rem; /* Smaller font size for buttons */
 }
}
</style>


