import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(Vuex);
Vue.use(VueAxios, axios);

const baseUrl = 'https://reqres.in/api/users';
/* eslint-disable consistent-return */
async function apiRequest(endpoint = '', page = '1') {
  const pageParam = page === '1' ? '' : `?page=${page}`;

  try {
    return await Vue.axios.get(`${baseUrl}${endpoint}${page}`);
  } catch (err) {
    console.log(err);
  }
}
/* eslint-enable consistent-return */

export default new Vuex.Store({
  state: {
    users: [],
    pages: 0,
    currPage: 0,
  },
  getters: {
    getUsers: state => state.users,
    getPages: state => state.pages,
    getCurrPage: state => state.currPage,
  },
  mutations: {
    SET_USERS: (state, arr) => {
      state.users = arr;
    },
    SET_PAGES: (state, num) => {
      state.pages = num;
    },
    SET_CURRENT_PAGE: (state, num) => {
      state.page = num;
    },
  },
  actions: {
    GET_USERS: ({ commit }, page) => {
      apiRequest('', page).then(({ data }) => {
        commit('SET_USERS', data.data);
        commit('SET_PAGES', data.total);
        commit('SET_CURRENT_PAGE', data.page);
      });
    },
  },
});
