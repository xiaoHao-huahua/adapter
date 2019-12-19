import { reqAddress, reqCategorys, reqShops } from "../../api/index.js";
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS
} from "../mutation-types.js";

export default {
  state: {
    latitude: 40.10038,
    longitude: 116.36867,
    address: {},
    categorys: [],
    shops: []
  },
  mutations: {
    [RECEIVE_ADDRESS](state, address) {
      state.address = address;
    },
    [RECEIVE_CATEGORYS](state, categorys) {
      state.categorys = categorys;
    },
    [RECEIVE_SHOPS](state, shops) {
      state.shops = shops;
    }
  },
  actions: {
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
    }
  },
  getters: {}
};
