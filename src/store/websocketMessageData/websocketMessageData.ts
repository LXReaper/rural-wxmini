// initial state
/* eslint-disable */
import {StoreOptions} from "vuex";
import AuthorityCtrl from "../../access/authorityCtrl";

/**
 * 后端数据模块
 */
export const websocketMessageData = {
    namespaced: true,
    state: () => ({
        websocketMessage: {
            noticeSocket: "",
        }
    }),
    actions: {
        // actions,触发mutations的修改
        setNoticeSocket({commit, state}, payload) {
            if (!payload) {
                commit("updateNoticeSocket", "");
                return;
            }
            commit("updateNoticeSocket", payload);
        },
    },
    // mutations,修改状态变量
    mutations: {
        // 增删改查
        updateNoticeSocket(state, payload) {
            state.websocketMessage.noticeSocket = payload;
        },
    }, getters: {
        //获取
        getNoticeSocket(state){
            return state.websocketMessage.noticeSocket;
        }
    }
} as StoreOptions<any>;
