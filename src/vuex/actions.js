//保存间接改变状态数据方法的对象
//可以有异步代码和逻辑代码
export default {
yyy({commit, state}) { // state是总的state
    commit('xxx') // commit内部会查找所有匹配的mutation(总的和每个模块的)
  }
};
