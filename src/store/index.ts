import { createStore } from "vuex";
import {user} from "./villagerInfo/user";
import {backendBaseInfo} from "./backendBase/backendBaseInfo";

export const store =  createStore({
  state: {
  },
  getters: {
  },
  mutations: {},
  actions: {},
  modules: {
    user,
    backendBaseInfo,
  },
});
