import { createStore } from "vuex"
import authModule from './modules/auth'
import contentModule from './modules/content'
import feedbackModule from './modules/feedback'
 
const store = createStore({
  modules:{
   auth:authModule,
   content:contentModule,
   feedback:feedbackModule,
  }
});
 
export default store;