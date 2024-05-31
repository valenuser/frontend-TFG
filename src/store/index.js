import { createStore } from 'vuex'
import io from 'socket.io-client'
export default createStore({
  state: {
    friends:[],
    usernameAbreviacion:'',
    socket:'',
    newSocket : io('http://localhost:3000'),
    token:'',
    profileMensajes:[],
    profileMensajesGpt:[],
    mensajesChat:[]
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
    ADD_USER_TOKEN(state,token){
      state.token = token
    },
    ADD_USER_MESSAGE(state,messages){
      state.profileMensajes.push(messages)
    },
    ADD_GPT_MESSAGE(state,gpt){
      state.profileMensajesGpt.push(gpt)
    },
    ADD_CHAT_MESSAGE(state,chat){
      state.mensajesChat = chat
    },
    DELETE_USER_MESSAGE(state){
      state.profileMensajes = []
    },
    DELETE_GPT_MESSAGE(state){
      state.profileMensajesGpt = []
    },
    DELETE_CHAT_MESSAGE(state){
      state.mensajesChat = []
    }
  }
})
