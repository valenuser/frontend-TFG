import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'
import VerifyView from '../views/VerifyView.vue'
import LoginView from '../views/LoginView.vue'
import MainView from '../views/MainView.vue'
import BadRequest from '../views/BadRequest.vue'
import ChatPruebaView from '@/views/ChatPruebaView.vue'
import AddFriends from '@/views/AddFriends.vue'
import AddNewFriend from '@/views/AddNewFriend.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/verify',
    name: 'verify',
    component: VerifyView
  },
  {
    path: '/chat/:token',
    name: 'chat',
    component: ChatPruebaView
  },
  {
    path: '/chats/:token',
    name: 'main',
    component: MainView
  },
  {
    path: '/badRequest',
    name: 'badRequest',
    component: BadRequest
  },
  {
    path: '/addFriends/:token',
    name: 'friends',
    component: AddFriends
  },
  {
    path: '/newFriend/:token',
    name: 'newFriend',
    component: AddNewFriend
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
