// Credit https://www.learmoreseekmore.com/2020/12/vue3-jwt-auth-accesstoken.html
import { jwtDecrypt, tokenAlive } from "../../shared/jwtHelper";

const state = () => ({
    authData: {
      token: "",
      refreshToken: "",
      tokenExp: "",
      userId: "",
      userName: "",
    },
    loginStatus: ""
  });
   
  const getters = {
    getLoginStatus(state){
        return state.loginStatus;
    },
    getAuthData(state){
        return state.authData;
    },
    isTokenActive(state) {
        if (!state.authData.tokenExp) {
            return false;
        }
        return tokenAlive(state.authData.tokenExp);
    }
  };
   
  const actions = {
    async login({commit},payload) {
      console.log(payload);
       const data = {
        access_token:"",
        refresh_token: ""
       }
       commit('saveTokenData', data);
       commit('setLoginStatus','success');
    }
  };
   
  const mutations = {
    saveTokenData(state, data) {
   
      if (data.access_token) localStorage.setItem("access_token", data.access_token);
      if (data.refresh_token) localStorage.setItem("refresh_token", data.refresh_token);
   
      const jwtDecodedValue = jwtDecrypt(data.access_token);
      const newTokenData = {
        token: data.access_token,
        refreshToken: data.refresh_token,
        tokenExp: jwtDecodedValue.exp,
        userId: jwtDecodedValue.sub,
        userName: jwtDecodedValue.username,
      };
      state.authData = newTokenData; 
    },
    setLoginStatus(state, value){
       state.loginStatus = value;
    }
  };
   
  export default{
      namespaced:true,
      state,
      getters,
      actions,
      mutations
  }