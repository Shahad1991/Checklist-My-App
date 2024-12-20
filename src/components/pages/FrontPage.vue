<template>
 <NavComponent/>
 <v-container  class="front-page" align="center">
  <br /> <br /> <br /> <br /><br /><br /><br />
  <br /> <br />
   <!-- Logo træ -->
   <img src="@/Images/EcoVaner.svg" alt="Logo billede" class="logo" /> <br />
   <!-- Centered welcome text -->
   <h1 class="welcome-text">Velkommen Tilbage</h1>
   <br>
   <!-- New "Din score" section with image underneath -->
   <v-container class="score-section">
     <h2 class="score-text">{{ userName }}</h2>
     <br />


     <LevelDisplay  style="background-color: #fff; color: #000;"/> <!-- Use LevelDisplay component here -->
     <br />
   </v-container>
    <br />
    <!-- Subtitle text -->


         <h3 class="subtitle-text">Gør bæredygtige vaner let som en leg</h3><br/>
   <!-- New section with question text and button -->
   <v-container class="check-habits-section">
     <p class="check-habits-text">Har du tjekket dine vaner i dag?</p><br />
     <button class="check-habits-button" @click="goToMainSite">TJEK VANER</button>
   </v-container>


   <br />
 </v-container>
</template>


<script>
import { useRouter } from 'vue-router';
import { ref, onMounted, watch } from 'vue';
import { useStore } from 'vuex';
import NavComponent from '../navigation/NavComponent.vue';
import LevelDisplay from '../features/LevelDisplay.vue'; // Import LevelDisplay component


export default {
 name: 'FrontPage',
 components: {
   NavComponent,
   LevelDisplay, // Register LevelDisplay component
 },
 setup() {
   const router = useRouter();
   const store = useStore();
   const user = ref(store.getters.getUserInfo);
   const levelImage = ref('');


   const fetchUserData = async () => {
     try {
       const response = await fetch('http://localhost:3000/api/auth/user', {
         method: 'GET',
         headers: {
           'x-access-token': localStorage.getItem('token')
         }
       });
       if (!response.ok) {
         const errorText = await response.text();
         throw new Error(`Error fetching user data: ${errorText}`);
       }
       const data = await response.json();
       store.commit('setUserInfo', data);
     } catch (error) {
       console.error('Error fetching user data:', error);
     }
   };


   onMounted(() => {
     fetchUserData();
   });


   const goToMainSite = () => {
     router.push('/TransportComponent');
   };


   const updateLevelImage = () => {
     switch (user.value.level) {
       case 1:
         levelImage.value = '@/Images/frø Level 1.png';
         break;
       case 2:
         levelImage.value = '@/Images/root Level 2.png';
         break;
       case 3:
         levelImage.value = '@/Images/tree Level 3.png';
         break;
       default:
         levelImage.value = '@/Images/tree Level 4.png';
     }
   };


   watch(() => user.value.level, updateLevelImage);


   return { goToMainSite, user, levelImage, userName: user.value.name, userLevel: user.value.level, userPoints: user.value.points };
 },
};
</script>


<style scoped>
.v-col-12 {
 flex: none;
}
.front-page {
 font-family: Arial, Helvetica, sans-serif;
 display: flex;
 flex-direction: column;
 align-items: center;
 text-align: center;
 min-height: 100vh;
 padding: 30px;
 background: #000 url('@/images/forside.svg');
 background-size: cover;
 background-position: center;
}


.logo {
 max-width: 200px;
}


.secondary-logo {
 max-width: 250px;
 margin: 15px;
}


.welcome-text {
 font-size: 40px;
 color: #Ffff; /* Change color for h1 */
}


.score-text {
 font-size: 35px;
 font-weight: bold;
 color: #3E7A00; /* Change color for h2 */
}


.subtitle-text {
 font-size: 16px;
 font-weight:normal;
 color: #fff;
}


.points-value, .points-text {
 font-size: 24px;
 font-weight: bold;
 color: #3E7A00;
}
.points-text {
 font-size: 16px;
 font-weight: bold;
 color: #3E7A00;
}


.check-habits-text {
 font-size: 18px;
 margin-bottom: 10px;
 color: #fff;
}


.check-habits-button {
 padding: 15px 25px;
 background-color: #3E7A00;
 color: white;
 border: none;
 border-radius: 10px;
 cursor: pointer;
 font-size: 16px;
}


.streak-points-wrapper {
 display: flex;
 flex-direction: column;
 align-items: center;
 gap: 5px; /* Gap between streak and points */
}


.score-section {
 text-align: center;
 background-color: #fff;
 border-radius: 15px;
 box-shadow: 0 2px 4px rgba(142, 133, 133, 0.1);
 width: 320px;
 border-block-color: #3E7A00;
}


.description-text {
 font-size: 24px;
 font-weight: 600;
}
ul {
 list-style-type: none;
}
.habits-title {
 font-size: 24px;
 font-weight: bold;
}
.habits-list {
 background: #fff;
 width: 330px;
}
</style>


