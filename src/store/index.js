import { createStore } from 'vuex'
import io from 'socket.io-client'
export default createStore({
  state: {
    friends:[],
    usernameAbreviacion:'',
    socket:'',
    newSocket : io('http://localhost:3000')
  },
  mutations: {

    ADD_USERNAME(state,name){
      state.usernameAbreviacion = name
    },
    ADD_CHATS(state,friends){
      state.friends = friends
    },
    ADD_SOCKET(state,socketId){
      state.socket = socketId
    },
  }
})
