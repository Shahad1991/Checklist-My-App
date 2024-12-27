<template>
  <v-container class="anden-nav">
    <router-link :to="{ name: 'ChecklistPage', params: { categoryId: 1 } }" @click="setActive('eluse')">
      <img :class="{ active: activeImage === 'eluse' }" :src="getImageSrc('eluse')" />
    </router-link>
    <router-link :to="{ name: 'ChecklistPage', params: { categoryId: 2 } }" @click="setActive('transport')">
      <img :class="{ active: activeImage === 'transport' }" :src="getImageSrc('transport')" />
    </router-link>
    <router-link :to="{ name: 'ChecklistPage', params: { categoryId: 3 } }" @click="setActive('foodwaste')">
      <img :class="{ active: activeImage === 'foodwaste' }" :src="getImageSrc('foodwaste')" />
    </router-link>
    <router-link :to="{ name: 'ChecklistPage', params: { categoryId: 4 } }" @click="setActive('usedthing')">
      <img :class="{ active: activeImage === 'usedthing' }" :src="getImageSrc('usedthing')" />
    </router-link>
  </v-container>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'MenuComponent',
  setup() {
    const activeImage = ref('');

    const setActive = (image) => {
      activeImage.value = image;
    };

    const getImageSrc = (imageName) => {
      const images = import.meta.glob('@/images/*.svg', { eager: true });
      return images[`/src/images/${imageName}.svg`].default;
    };

    return {
      activeImage,
      setActive,
      getImageSrc,
    };
  },
});
</script>

<style scoped>
.anden-nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 92px;
  margin-top: 100px; /* Adjust this value based on the height of your fixed nav */
}

.anden-nav img {
  margin-top: 70px;
  margin-bottom: 70px;
  transition: all 0.3s ease;
  border-radius: 100px;
  
}

.active {
  transform: scale(1.2);
  border: 4px solid #D3BE03;
  border-radius: 100px;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.5), 0 0 10px rgba(189, 185, 185, 0.5); /* Add white and grey shadows */
}
</style>
