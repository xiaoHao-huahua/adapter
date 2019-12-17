//保存间接改变状态数据方法的对象
//可以有异步代码和逻辑代码

import {
  reqAddress,
  reqCategorys,
  reqShops,
  reqAutoLogin
} from "../api/index.js";
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER,
  RECEIVE_TOKEN
} from "../vuex/mutation-types.js";

export default {
  //根据经纬度获取位置信息
  async getAddress({ commit, state }) {
    const { latitude, longitude } = state;
    const result = await reqAddress(longitude, latitude);
    if (result.code === 0) {
      const address = result.data;
      commit(RECEIVE_ADDRESS, address);
    }
  },

  //获取食品列表信息
  async getCategorys({ commit }) {
    const result = await reqCategorys();
    commit(RECEIVE_CATEGORYS, result.data);
  },

  //获取商家列表信息

  async getShops({ commit, state }) {
    const { latitude, longitude } = state;
    const result = await reqShops({ latitude, longitude });
    // console.log(result);
    commit(RECEIVE_SHOPS, result.data);
  },

  //保存用户信息
  saveUserInfo({ commit }, user) {
    const token = user.token;
    //将token保存到localStorage
    localStorage.setItem("token_key", token);
    delete user.token;
    commit(RECEIVE_USER, {user});
    commit(RECEIVE_TOKEN, {token});
  },

  //自动登录
  async autoLogin({ commit, state }) {
    if (state.token && !state.user._id) {
      //发送自动登录请求
      const result = await reqAutoLogin();
      if (result.code === 0) {
        const user = result.data;
        commit(RECEIVE_USER, {user});
      }
    }
  },

  // 退出登录
  logout({ commit }) {
    localStorage.removeItem("token_key");
    commit(RECEIVE_USER, "");
    commit(RECEIVE_TOKEN, "");
  }
};