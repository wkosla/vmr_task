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
    return await Vue.axios.get(`${baseUrl}${endpoint}${pageParam}`);
  } catch (err) {
    console.log(err);
  }
}
/* eslint-enable consistent-return */

export default new Vuex.Store({
  state: {
    users: [],
    pages: 0,
    currPage: 1,
    perPage: 0,
    total: 0,
    userDetails: {},
  },
  getters: {
    getUsers: state => state.users,
    getPages: state => state.pages,
    getCurrPage: state => state.currPage,
    getPerPage: state => state.perPage,
    getTotal: state => state.total,
    getCurrUser: state => state.userDetails,
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
    SET_USER: (state, user) => {
      state.userDetails = user;
    },
    SET_PER_PAGE: (state, num) => {
      state.perPage = num;
    },
    SET_TOTAL: (state, num) => {
      state.total = num;
    },
  },
  actions: {
    GET_USERS: ({ commit }, page) => {
      apiRequest('', page).then(({ data }) => {
        commit('SET_USERS', data.data);
        commit('SET_PAGES', data.total);
        commit('SET_CURRENT_PAGE', data.page);
        commit('SET_PER_PAGE', data.per_page);
        commit('SET_TOTAL', data.total);        
      });
    },
    GET_USER: ({ commit }, id) => {
      apiRequest(`/${id}`).then(({ data }) => {
        commit('SET_USER', data.data);
      });
    },
  },
});
