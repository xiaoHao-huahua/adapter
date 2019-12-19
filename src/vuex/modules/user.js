import { reqAutoLogin } from "../../api/index.js";
import { RECEIVE_USER, RECEIVE_TOKEN } from "../mutation-types.js";

export default {
  state: {
    user: {},
    token: localStorage.getItem("token_key" || "") //当前用户登录标记
  },
  mutations: {
    [RECEIVE_USER](state, { user }) {
      state.user = user;
    },
    [RECEIVE_TOKEN](state, { token }) {
      state.token = token;
    }
  },
  actions: {
    //保存用户信息
    saveUserInfo({ commit }, user) {
      const token = user.token;
      //将token保存到localStorage
      localStorage.setItem("token_key", token);
      delete user.token;
      commit(RECEIVE_USER, { user });
      commit(RECEIVE_TOKEN, { token });
    },

    //自动登录
    async autoLogin({ commit, state }) {
      if (state.token && !state.user._id) {
        //发送自动登录请求
        const result = await reqAutoLogin();
        if (result.code === 0) {
          const user = result.data;
          commit(RECEIVE_USER, { user });
        }
      }
    },

    // 退出登录
    logout({ commit }) {
      localStorage.removeItem("token_key");
      commit(RECEIVE_USER, "");
      commit(RECEIVE_TOKEN, "");
    }
  },
  getters: {}
};
