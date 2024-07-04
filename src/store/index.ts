import { createStore } from "vuex";
import {user} from "./villagerInfo/user";
import {backendBaseInfo} from "./backendBase/backendBaseInfo";
import {websocketMessageData} from "./websocketMessageData/websocketMessageData";

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
    websocketMessageData,
  },
});
