<template>
 <v-container :style="{ width: '100%', padding: '25px' }" class="userliste">
   <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
   <v-col cols="12" class="text-center">
     <h2 class="question">Liste af brugere med point</h2>
   </v-col>
<br/><br/>
   <v-col cols="12" align="center">
     <v-list :style="{backgroundColor:'#3E7A00'}" >
       <v-list-item v-for="(user, index) in users" :key="user.user_id" class="user-card">
         <v-card :class="{ 'highest-points': index === 0 }">
           <v-card-title>{{ user.name }}</v-card-title>
           <v-card-subtitle>Level: {{ user.level }} | Points: {{ user.points }}</v-card-subtitle>
         </v-card>
       </v-list-item>
     </v-list>
   </v-col>
   <br/><br/><br/><br/>
   <v-col cols="auto" class="navigation-col" @click="goToPrevious" style="display: flex; align-items: center;">
      <img src="@/Images/arrow left.svg" alt="Arrow left" @click="tilbage" style="width: 30px; cursor: pointer; margin-right: 10px;"/>
      <span class="navigation-text1" style="font-size: 20px;">forrige</span>
   </v-col>
 </v-container>
</template>


<script>
export default {
 data() {
   return {
     users: [],
   };
 },
 created() {
   this.fetchUsers();
 },
 methods: {
   async fetchUsers() {
     try {
       const response = await fetch('http://localhost:3000/api/users', {
         method: 'GET',
         headers: {
           'x-access-token': localStorage.getItem('token')
         }
       });
       const data = await response.json();
       // Sorter brugerne efter point i faldende rækkefølge
       this.users = data.sort((a, b) => b.points - a.points);
     } catch (error) {
       console.error('Error fetching users:', error);
     }


   },
   tilbage() {
     this.$router.push('/userPage');
   },
 },
};
</script>


<style scoped>
.v-container {
 justify-content: center;
 background-color: #1E7F85;


}
.userliste{
 min-height: 100vh;
 background: #000 url(@/images/forside.svg);
 background-size: cover;
 background-position: center;
 justify-content: center;
 align-items: center;
}
.users-list {
 width: 100%;
 padding: 0;
}


.question {
 font-weight: bold;
 margin-top: 10px;
 margin-bottom: 24px;
 color: #fff;
}


.user-card {
 margin-bottom: 10px;
}


.v-card {
 padding: 10px;
 border-radius: 8px;
 box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);


}


.highest-points {
 background-color: #fff; /* Guld farve for brugeren med de højeste point */
}
.navigation-text1{
 color: #76B624;
}
</style>


