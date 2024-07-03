// initial state
/* eslint-disable */
import {StoreOptions} from "vuex";
import AuthorityCtrl from "../../access/authorityCtrl";

/**
 * 后端数据模块
 */
export const backendBaseInfo = {
    namespaced: true,
    state: () => ({
        backendBaseUrl: 'http://localhost:8021',
    }),
    actions: {
        // actions,触发mutations的修改
    },
    // mutations,修改状态变量
    mutations: {
        // 增删改查
    },getters: {
        //获取
        getBackendBaseUrl(state){
            return state.backendBaseUrl;
        }
    }
} as StoreOptions<any>;
