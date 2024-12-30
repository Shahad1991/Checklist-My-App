import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import store from './store';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// Components
import InfoComponent from './components/pages/InfoComponent.vue';
import FrontPage from './components/pages/FrontPage.vue';
import CheckList from './components/features/CheckList.vue';
import ArrowComponent from './components/navigation/ArrowComponent.vue';
import UserPage from './components/user/UserPage.vue';
import UserList from './components/user/UserList.vue';
import LogIn from './components/user/LogIn.vue';
import LevelDisplay from './components/features/LevelDisplay.vue';
import MenuComponent from './components/navigation/MenuComponent.vue';
import Register from './components/user/Register.vue';
import Forside from './components/pages/Forside.vue';
import ChecklistPage from './components/pages/ChecklistPage.vue';

const vuetify = createVuetify({
  components,
  directives,
});

const routes = [
  { path: '/userPage', name: 'UserPage', component: UserPage },
  { path: '/frontPage', name: 'FrontPage', component: FrontPage },
  { path: '/infoComponent', name: 'InfoComponent', component: InfoComponent },
  { path: '/userList', name: 'UserList', component: UserList },
  { path: '/', name: 'LogIn', component: LogIn },
  { path: '/checklist', name: 'CheckList', component: CheckList },
  { path: '/checklist/:categoryId', name: 'ChecklistPage', component: ChecklistPage, props: true },
  { path: '/levelDisplay', name: 'LevelDisplay', component: LevelDisplay },
  { path: '/register', name: 'Register', component: Register },
  { path: '/forside', name: 'Forside', component: Forside, meta: { requiresAuth: true } },
  { path: '/transportComponent', redirect: { name: 'ChecklistPage', params: { categoryId: 2 } } },
  { path: '/elUse', redirect: { name: 'ChecklistPage', params: { categoryId: 1 } } },
  { path: '/genbrugeComponent', redirect: { name: 'ChecklistPage', params: { categoryId: 4 } } },
  { path: '/foodWaste', redirect: { name: 'ChecklistPage', params: { categoryId: 3 } } },
  { path: '/arrowComponent', name: 'ArrowComponent', component: ArrowComponent },
  { path: '/menuComponent', name: 'MenuComponent', component: MenuComponent },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
// Check for authentication before routing
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    // Replace with your authentication logic
    const isAuthenticated = store.state.isAuthenticated;
    if (!isAuthenticated) {
      return next({ name: 'LogIn' });
    }
  }
  next();
});
const app = createApp(App);
app.use(router);
app.use(store);
app.use(vuetify);
app.mount('#app');
