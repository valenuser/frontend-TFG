import { createStore } from 'vuex'

export default createStore({
  state: {
    friends:[],
    usernameAbreviacion:''
  },
  mutations: {

    ADD_USERNAME(state,name){
      state.usernameAbreviacion = name
    },
    ADD_CHATS(state,friends){
      state.friends = friends
    },
  }
})
