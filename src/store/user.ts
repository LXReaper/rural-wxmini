// initial state
/* eslint-disable */
import {StoreOptions} from "vuex";
import AuthorityCtrl from "../access/authorityCtrl";

/**
 * 用户模块
 */
export const user = {
    namespaced: true,
    state: () => ({
        loginUser: {
            villager_name: "未登录",
            userRole: AuthorityCtrl.NOT_LOGIN,
        },
    }),
    actions: {
        // actions,触发mutations的修改
        getLoginUser({commit, state}, payload) {
            if (payload.userRole === null) {
                commit("updateUser", {
                    ...state.loginUser,
                    userRole: AuthorityCtrl.NOT_LOGIN,
                });
                return;
            }
            commit("updateUser", payload);
        },
    },
    // mutations,修改状态变量
    mutations: {
        // 增删改查
        updateUser(state, payload) {
            state.loginUser = payload;
        },
    },
} as StoreOptions<any>;
