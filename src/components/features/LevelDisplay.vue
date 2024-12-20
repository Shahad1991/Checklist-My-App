<template>
  <div class="user-info-display">
    <div class="level-display">
      <p class="info-text">Level : {{ userLevel }}</p>
    </div>
    <div class="points-display">
      <img src="@/images/drop.svg" alt="Points" class="drop-icon" />
      <span class="points-text">{{ userPoints }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      userInfo: 'getUserInfo'
    }),
    userLevel() {
      return this.userInfo.level; // Get user level from Vuex store
    },
    userPoints() {
      return this.userInfo.points; // Get user points from Vuex store
    }
  }
};
</script>

<style scoped>
.user-info-display {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-weight: bold;
  margin-top: 10px;
  color: white;
  background-color: black;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(227, 222, 222, 0.1);
}

.level-display {
  margin-right: 20px; /* Tilføj margin for at give lidt plads mellem niveau og point */
}

.info-text {
  font-size: 20px;
  font-weight: lighter;
}

.points-display {
  display: flex;
  align-items: center;
}

.drop-icon {
  width: 28px;
  height: 24px;
  margin-right: 8px;
}

.points-text {
  font-size: 24px;
  font-weight: bold;
}
</style>
