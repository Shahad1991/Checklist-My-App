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
  width: 100%; /* Full width */
  background-color: black; /* Background color */
  padding: 10px; /* Add padding for some space around the elements */
  margin: 20px 0; /* Add margin for some space around the element */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), 0 0 10px rgba(255, 255, 255, 0.5); /* Add shadow to indicate clickability */
  transition: box-shadow 0.3s ease; /* Smooth transition for shadow */
}
.navigation-col {
  display: flex;
  align-items: center;
}

.navigation-text {
  color: green; /* Text color */
  font-size: 16px;
  margin: 0 8px; /* Add margin for some space around the text */
  font-weight: bold;
}

.navigation-text1 {
  color: #76B624;
  font-weight: 100;

}

.arrow-icon {
  width: 16px;
  height: 16px;
}
</style>

