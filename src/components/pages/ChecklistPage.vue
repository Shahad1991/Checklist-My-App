<template>
  <NavComponent />
  <MenuComponent />
  <v-app :style="{ backgroundColor: '#000', height: '100vh' }">
    <v-container fluid fill-height :style="containerStyle">
      <br />
      <v-col cols="12" md="8" lg="4" class="text-center">
        <h2 class="question" :style="questionStyle">{{ categoryTitle }}</h2>
      </v-col>
      <CheckList
        :style="{ width: '100%' }"
        :checklistItems="checklistItems"
        :selectedItems="selectedItems"
        @update:selectedItems="updateSelectedItems"
      />
      <ArrowComponent :nextRoute="nextRoute" :previousRoute="previousRoute" />
    </v-container>
  </v-app>
</template>

<script>
import CheckList from '../features/CheckList.vue';
import NavComponent from '../navigation/NavComponent.vue';
import ArrowComponent from '../navigation/ArrowComponent.vue';
import MenuComponent from '../navigation/MenuComponent.vue';

export default {
  name: 'ChecklistPage',
  components: {
    CheckList,
    NavComponent,
    ArrowComponent,
    MenuComponent,
  },
  props: {
    categoryId: {
      type: [Number, String],
      required: true,
    },
  },
  data() {
    return {
      checklistItems: [],
      categoryTitle: '',
      nextRoute: '',
      previousRoute: '',
      containerStyle: {},
      questionStyle: {},
    };
  },
  computed: {
    selectedItems() {
      return this.$store.state.selectedItems; // Get selected items from Vuex state
    },
    totalPoints() {
      return this.$store.getters.getTotalPoints; // Get total points from Vuex getter
    },
    userLevel() {
      return this.$store.getters.getUserInfo.level; // Get user level from Vuex store
    },
  },
  watch: {
    categoryId: {
      immediate: true,
      handler() {
        this.initializePage();
      },
    },
  },
  methods: {
    async initializePage() {
      const categoryId = Number(this.categoryId); // Ensure categoryId is a number
      console.log('Category ID:', categoryId);
      const categories = {
        1: {
          title: 'Elforbrug',
          next: '/genbrugeComponent',
          prev: '/transportComponent',
          style: { backgroundColor: '#000', color: '#1E7F85' },
        },
        2: {
          title: 'Transport',
          next: '/foodWaste',
          prev: '/elUse',
          style: { backgroundColor: '#000', color: '#8981A8' },
        },
        3: {
          title: 'Madspild',
          next: '/usedthing',
          prev: '/transport',
          style: { backgroundColor: '#000', color: '#E59182' },
        },
        4: {
          title: 'Genbrug',
          next: '/userPage',
          prev: '/foodWaste',
          style: { backgroundColor: '#000', color: '#85C7C7' },
        },
      };

      const category = categories[categoryId];
      if (category) {
        this.categoryTitle = category.title;
        this.nextRoute = category.next;
        this.previousRoute = category.prev;
        this.containerStyle = { ...category.style, padding: '24px' };
        this.questionStyle = { color: category.style.color };
      } else {
        console.error('Ukendt kategori-ID:', categoryId);
      }

      await this.fetchChecklistItems(categoryId);
    },
    async fetchChecklistItems(categoryId) {
      try {
        const response = await fetch(`http://localhost:3000/api/checklists/${categoryId}/${this.userLevel}`);
        const data = await response.json();
        this.checklistItems = data;
        console.log('Checklist items:', this.checklistItems);
      } catch (error) {
        console.error('Error fetching checklist items:', error);
      }
    },
    updateSelectedItems(newSelectedItems) {
      this.$store.dispatch('updateSelectedItems', newSelectedItems); // Update selected items in Vuex
      this.$store.dispatch('updateTotalPoints'); // Recalculate total points after updating selected items
    },
  },
};
</script>

<style scoped>
.v-container {
  background: #000;
}

.question {
  font-weight: bold;
  margin-top: 15px;
  margin-bottom: 24px;
}
</style>
