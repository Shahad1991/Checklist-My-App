<template>
  <v-row align="center" justify="space-between" class="navigation-container">
    <v-col cols="auto" class="navigation-col" @click="goToPrevious">
      <img src="@/images/arrow left.svg" alt="Forrige" class="arrow-icon" />
      <span class="navigation-text1">forrige</span>
    </v-col>
    <v-spacer />
    <v-col cols="auto" class="navigation-col" @click="goToNext">
      <span class="navigation-text">Næste</span>
      <img src="@/images/arrow right.svg" alt="Næste" class="arrow-icon" />
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    nextRoute: {
      type: String,
      required: true,
    },
    previousRoute: {
      type: String,
      required: true,
    },
  },
  methods: {
    goToPrevious() {
      this.$router.push(this.previousRoute);
    },
    goToNext() {
      this.$router.push(this.nextRoute);
    },
  },
};
</script>

<style scoped>
.navigation-container {
  width: 100%; /* Fuld bredde */
  background-color: white; /* Baggrundsfarve */
  padding: 10px; /* Tilføj padding for at give lidt plads omkring elementerne */
  margin: 10px 0; /* Tilføj margin for at give lidt plads omkring elementet */
}

.navigation-col {
  display: flex;
  align-items: center;


}

.navigation-text {
  color: green; /* Tekstfarve */
  font-size: 16px;
  margin: 0 8px; /* Tilføj margin for at give lidt plads omkring teksten */
  font-weight: bold;
}
.navigation-text1{
  color: #76B624;
}
.arrow-icon {
  width: 16px;
  height: 16px;
}
</style>
