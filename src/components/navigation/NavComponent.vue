<template>
  <div class="nav-container">
    <!-- Top navbar -->
    <header class="nav-bar">
      <button class="burger-button" @click="drawer = true">
        <img src="@/images/hamburger-button.svg" alt="Menu" class="burger-icon" />
      </button>
      <LevelDisplay />
    </header>

    <!-- Slide-in menu -->
    <div v-if="drawer" class="menu-overlay" @click="drawer = false">
      <aside class="menu-content" @click.stop>
        <button class="close-button" @click="drawer = false">X</button>
        <ul>
          <li @click="navigateTo('/frontPage')">Min side</li>
          <li @click="navigateTo('/userPage')">Min træ</li>
          <li @click="navigateTo('/info')">Info</li>
          <li @click="logout">Log ud</li>
        </ul>
      </aside>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import LevelDisplay from '../features/LevelDisplay.vue';

export default {
  name: 'NavComponent',
  components: { LevelDisplay },
  setup() {
    const drawer = ref(false);
    const router = useRouter();

    const navigateTo = (path) => {
      drawer.value = false;
      router.push(path);
    };

    const logout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('userName');
      router.push('/');
    };

    return {
      drawer,
      navigateTo,
      logout
    };
  }
};
</script>

<style scoped>
/* 🔹 Nav-bar stil */
.nav-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: black;
  padding: 15px;
  z-index: 1000; /* Ensure it stays on top of other elements */
}

.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  color: white;
  height: 56px;
}

.burger-button {
  background: none;
  border: none;
  cursor: pointer;
}

.burger-icon {
  width: 100%;
}

.LevelDisplay {
  margin-left: auto;
}

/* 🔹 Slide-in menu */
.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
  z-index: 1000;
}

.menu-content {
  width: 80%;
  max-width: 300px;
  height: 100vh;
  background-color: black;
  padding: 1rem;
  position: relative;
  display: flex;
  flex-direction: column;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  color: #4caf50;
}

ul {
  list-style: none;
  padding: 0;
  margin-top: 50px; /* Plads til X-knappen */
}

li {
  padding: 15px 20px;
  font-size: 1.1rem;
  cursor: pointer;
  border-bottom: 1px solid #4caf50;
  color: white;
}

@media (max-width: 768px) {
  .menu-content {
    width: 100%;
    max-width: 100%;
  }
}
</style>
