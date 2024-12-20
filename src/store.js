import { createStore } from 'vuex';

const store = createStore({
  state: {
    selectedItems: [],
    totalPoints: 0,
    userInfo: {
      id: null,
      name: '',
      email: '',
      phone: '',
      level: 1,
      points: 0,
    },
    token: localStorage.getItem('token') || '',
  },
  mutations: {
    updateSelectedItems(state, items) {
      state.selectedItems = items;
    },
    updateTotalPoints(state) {
      state.totalPoints = state.selectedItems.reduce((total, item) => total + item.score, 0);
      state.userInfo.points = state.totalPoints; // Update points in userInfo
    },
    setUserInfo(state, userInfo) {
      state.userInfo.id = userInfo.id;
      state.userInfo.name = userInfo.name;
      state.userInfo.email = userInfo.email;
      state.userInfo.phone = userInfo.phone;
      state.userInfo.level = userInfo.level;
      state.userInfo.points = userInfo.points;
    },
    incrementUserLevel(state) {
      state.userInfo.level += 1;
    },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    clearToken(state) {
      state.token = '';
      localStorage.removeItem('token');
    },
  },
  actions: {
    updateSelectedItems({ commit }, items) {
      commit('updateSelectedItems', items);
      commit('updateTotalPoints');
    },
    async setUserInfo({ commit }) {
      try {
        const response = await fetch('http://localhost:3000/api/user', {
          method: 'GET',
          headers: {
            'x-access-token': localStorage.getItem('token')
          }
        });
        const data = await response.json();
        commit('setUserInfo', data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    },
    async register({ commit }, userData) {
      try {
        console.log('Sending registration payload to backend:', userData); // Debug-udskrift
        const response = await fetch('http://localhost:3000/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });

        console.log('Response status:', response.status); // Debug-udskrift

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error data:', errorData); // Debug-udskrift
          throw new Error(errorData.message || 'Registration failed');
        }

        const data = await response.json();
        console.log('Response data:', data); // Debug-udskrift
        commit('setToken', data.token);
        commit('setUserInfo', data.user);
      } catch (error) {
        console.error('Error during registration:', error.message); // Debug-udskrift
        console.error('Error details:', error); // Debug-udskrift
        throw error;
      }
    },
    async login({ commit }, credentials) {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
      commit('setToken', data.token);
      commit('setUserInfo', data.user);
    },
    logout({ commit }) {
      commit('clearToken');
      commit('setUserInfo', {
        id: null,
        name: '',
        email: '',
        phone: '',
        level: 1,
        points: 0,
      });
    },
  },
  getters: {
    getSelectedItems: (state) => state.selectedItems,
    getTotalPoints: (state) => state.userInfo.points, // Return points from userInfo
    getUserInfo: (state) => state.userInfo,
    isAuthenticated: (state) => !!state.token,
  },
});

export default store;
