import Vue from "vue";

import { reqGoods, reqRatings, reqInfo } from "../../api/index.js";
import {
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  ADD_FOOD_COUNT,
  REDUCE_FOOD_COUNT,
  CLEAR_CART_FOODS
} from "../mutation-types.js";

export default {
  state: {
    goods: [],
    ratings: [],
    info: {},
    cartFoods:[]
  },
  mutations: {
    [RECEIVE_INFO](state, { info }) {
      state.info = info;
    },
    [RECEIVE_RATINGS](state, { ratings }) {
      state.ratings = ratings;
    },
    [RECEIVE_GOODS](state, { goods }) {
      state.goods = goods;
    },
    [ADD_FOOD_COUNT](state, { food }) {
      if (food.count) {
        food.count++;
      } else {
        Vue.set(food, "count", 1);
        state.cartFoods.push(food)
      }
    },
    [REDUCE_FOOD_COUNT](state, { food }) {
      if (food.count > 0) {
        food.count--;
        if(food.count === 0){
          state.cartFoods.splice(state.cartFoods.indexOf(food),1)
        }
      }
    },
    [CLEAR_CART_FOODS](state){
      state.cartFoods.forEach(food =>food.count = 0);
      state.cartFoods = []
    }
  },
  actions: {
    //异步获取商家信息
    async getShopInfo({ commit }) {
      const result = await reqInfo();
      if (result.code === 0) {
        const info = result.data;
        commit(RECEIVE_INFO, { info });
        typeof cb === "function" && cb();
      }
    },

    //异步获取商家评价
    async getShopRatings({ commit }) {
      const result = await reqRatings();
      if (result.code === 0) {
        const ratings = result.data;
        commit(RECEIVE_RATINGS, { ratings });
        typeof cb === "function" && cb();
      }
    },

    //异步获取商家商品列表
    async getShopGoods({ commit }) {
      const result = await reqGoods();
      if (result.code === 0) {
        const goods = result.data;
        commit(RECEIVE_GOODS, { goods });
      }
    },

    //更新food中的数量的同步action
    updateFoodCount({ commit }, { isAdd, food }) {
      if (isAdd) {
        commit(ADD_FOOD_COUNT, { food });
      } else {
        commit(REDUCE_FOOD_COUNT, { food });
      }
    }
  },
  getters: {
    totalCount(state){
      return state.cartFoods.reduce((pre,food)=>pre + food.count , 0)
    },
    totalPrice(state){
      return state.cartFoods.reduce((pre,food)=>pre + food.count * food.price,0)
    }
  }
};
