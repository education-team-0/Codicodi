import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)

const types ={
    SET_AUTHENTICATED: 'SET_AUTHENTICATE',
    SET_USER: 'SET_USER',
};

const state = {
    isAuthenticated: false,
    user: {
        userId:'test',
        name:"realZheng",
        avatar:'userAvatar/hello.png'
    },
    user2: {
        userId:'test2',
        name:"杨洪朝",
        avatar:'course/1.png'
    }
};

const getters ={
    isAuthenticated: state =>state.isAuthenticated,
    user: state => state.user,
    user2: state => state.user2
};

const mutations ={
    [types.SET_AUTHENTICATED](state,isAuthenticated){      /*设置是否授权*/
        if(isAuthenticated) state.isAuthenticated = isAuthenticated;
        else state.isAuthenticated = false;
    },
    /*类型，参数*/
    [types.SET_USER](state,user){
        if (user) state.user = user;
        else state.user = {};
    }
};

/*异步操作  调用mutations*/
const actions ={
    setAuthenticated:( {commit},isAuthenticated) =>{
        commit(types.SET_AUTHENTICATED,isAuthenticated);
    },
    setUser:({commit},user) =>{
        commit(types.SET_USER,user);
    }
};

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});