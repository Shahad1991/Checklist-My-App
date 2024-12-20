<template>
 <NavComponent/>
 <v-container :style="{ backgroundColor: '#000' }">
   <br/>
   <br/><br/><br/><br/>
   <h1 class="score-title">Dagens score</h1>
   <br/>
     <v-col cols="12"  class="text-center">
       <h2 class="question">Godt Klaret </h2><br/>
       <p class="description-text"> {{ userName }}</p>
     <br/>
       <LevelDisplay />
     </v-col>
    <br/>
    <v-row>
     <v-col cols="2" class="justify-center">
       <img
       v-if="totalPoints > 0"
         class="drop"
         src="@/Images/drop.svg"
         alt="Drop Image"
         :style="{ width: '30px', marginLeft: 'auto', marginRight: 'auto',  border: '2px solid #3E7A00', borderRadius: '50%'}"
         @click="startWatering"
       />
     </v-col>
     <br />
     <v-col cols="2" class="træ">
       <img src="@/Images/træ.svg" alt="Tree Image" :style="{ marginLeft: '-30px', height: treeHeight + 'px' }" />
     </v-col>
   </v-row>
   <v-container class="carbon-reduction">
     <v-row align="center" justify="center">
       <v-col cols="12" class="text-center"><br/><br/><br/>
         <v-btn rounded="xl" size="x-large" @click="saveUserData" class="home-button" block :style="{background:'#3E7A00'}">Gem data</v-btn><br/>
         <v-btn rounded="xl" size="x-large" @click="showUserList" class="back-button" block outlined :style="{border:'5px solid #3E7A00', background:'#fff'}">Show users</v-btn><br/>
       </v-col>
     </v-row>
   </v-container>
 </v-container>
</template>


<script>
import LevelDisplay from '../features/LevelDisplay.vue'; // Importer UserLevelDisplay
import { inject, ref } from 'vue';
import { useRouter } from 'vue-router';
import NavComponent from '../navigation/NavComponent.vue';
import store from '@/store';// Importer Vuex store
export default {
 components: {
   LevelDisplay,
   NavComponent, // Registrer UserLevelDisplay
 },
 setup() {
   const name = inject('name');
   const password = inject('password');
   const router = useRouter();
   // Træets startstørrelse
   const treeHeight = ref(70);


   // Vand træet med alle dråber
   const startWatering = async () => {
     const totalPoints = store.getters.getTotalPoints;
     if (totalPoints <= 0) {
       alert('Ingen dråber at bruge!');
       return;
     }


     const growth = totalPoints * 0.3; // Calculate growth
     treeHeight.value = Math.min(treeHeight.value + growth, 380); // Update tree height with a maximum limit of 380px


     // Update points in the store and backend
     await store.dispatch('updateTotalPoints', totalPoints - totalPoints); // Reset points to zero


     alert(`Du har brugt alle dine dråber! Træet er nu ${treeHeight.value}px højt.`);
   };


   return { name, password, router, treeHeight, startWatering };
 },
 data() {
   return {
     requiredPoints: 500, // Krav til point for at gå videre til næste niveau
     token: localStorage.getItem('token') || '', // Hent token fra localStorage
     userName: localStorage.getItem('userName') || '', // Hent brugerens navn fra localStorage
     levelUpdated: false // Tilføj denne linje for at spore om niveauet er opdateret
   };
 },
 computed: {
   totalPoints() {
     return this.$store.getters.getTotalPoints; // Get total points from Vuex getter
   },
   userId() {
     return this.$store.getters.getUserInfo.id; // Get user ID from Vuex store
   },
   userLevel() {
     return this.$store.getters.getUserInfo.level; // Get user level from Vuex store
   }
 },
 methods: {
   async saveUserData() {
     try {
       const payload = {
         points: this.totalPoints,
         level: this.userLevel
       };
       console.log('Sending payload to backend:', payload); // Debug-udskrift


       const response = await fetch('http://localhost:3000/api/user/points', {
         method: 'PUT',
         headers: {
           'Content-Type': 'application/json',
           'x-access-token': this.token
         },
         body: JSON.stringify(payload)
       });
       const data = await response.json();
       console.log('Response from backend:', data);
       alert('Brugerdata og point gemt succesfuldt!');
       this.checkAndUpdateLevel(); // Tjek og opdater niveau efter at have gemt brugerdata og point
     } catch (error) {
       console.error('Error saving user data:', error);
       alert('Der opstod en fejl ved gemning af brugerdata og point.');
     }
   },
   async checkAndUpdateLevel() {
     if (this.totalPoints >= this.requiredPoints && !this.levelUpdated && this.userLevel < 3) {
       try {
         // Opdater brugerens niveau
         this.$store.commit('incrementUserLevel');
         this.levelUpdated = true; // Marker niveauet som opdateret
         alert('Du har nået det nødvendige antal point og er nu på næste niveau!');
       } catch (error) {
         console.error('Error updating level:', error);
         alert('Der opstod en fejl ved opdatering af niveau.');
       }
     } else if (this.totalPoints < this.requiredPoints) {
       this.levelUpdated = false; // Nulstil markeringen, hvis pointene falder under kravet
       alert(`Du skal have mindst ${this.requiredPoints} point for at gå videre til næste niveau.`);
     }
   },
   showUserList() {
     this.$router.push('/userList');
   },
   logout() {
     localStorage.removeItem('token');
     localStorage.removeItem('userName');
     this.$router.push('/app');
   }
 },
};
</script>


<style>
.score-title {
 text-align: center;
 font-weight: 700;
 color: aliceblue;
}
.description-text{
 color: #3E7A00;
 font-size: 30px;
}
.score-value {
 text-align: center;
 font-weight: 700;
 justify-content: center;
}


.carbon-reduction {
 background-image: url('@/Images/Vector 1.svg');
 background-repeat: no-repeat;
 background-position: center;
 background-size: cover;
 height: 300px;
}


.button-group {
 display: flex;
 flex-direction: column;
 gap: 1em;
}
.drop {
 transition: opacity 0.5s ease;
}




.drop.hidden {
 opacity: 0; /* Fade out */
 pointer-events: none; /* Gør den ikke-klikbar */
}




.eco {
 max-width: 160px;


}
@media (min-width: 601px) and (max-width: 1024px) {
 .score-title {
   font-size: 2rem; /* Medium font size for tablets */
 }


 .score-value {
   font-size: 1.5rem; /* Medium font size for tablets */
 }


 .co2-amount {
   font-size: 1.2rem; /* Medium font size for tablets */
 }


 .back-button,
 .home-button {
   font-size: 1rem; /* Medium button font size for tablets */
 }
}
</style>


