import { createRouter, createWebHistory } from 'vue-router'
import Main from '@/views/main.vue'
import LandingPage from '@/views/landing.vue'
import Login from '@/views/login.vue'
import Signup from '@/views/signup.vue'
import Create from '@/views/create-service.vue'
import DeleteService from '@/views/delete-service.vue'
import Subscription from '@/views/subscription/subscription.vue'
import AccountSetting from '@/views/account-setting.vue'
import MyServices from '@/views/service-list.vue'
import ServiceMain from '@/views/service/main.vue'
import Service from '@/views/service/service.vue'
import Users from '@/views/service/users/users.vue'
import Records from '@/views/service/records/records.vue'
import Mail from '@/views/service/mail.vue'
import ClientSecret from '@/views/service/client_secret.vue'
import Hosting from '@/views/service/hosting/hosting.vue'
import { skapi } from '@/code/admin'

let checkUser = async (t, f, n)=>{
  let u = await skapi.getProfile();
  if(u) return n();
  n('/login');
}

const router = createRouter(
  {
    scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 }
  },
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/confirmation',
      name: 'confirmation',
      component: () => import('@/views/confirmation.vue')
    },
    {
      path: '/verification',
      name: 'verification',
      component: () => import('@/views/verification.vue')
    },
    {
      path: '/forgot',
      name: 'forgot',
      component: () => import('@/views/forgot-password.vue')
    },
    {
      path: '/ui',
      name: 'ui',
      component: () => import('@/views/ui.vue')
    },
    {
      path: '/change-password',
      name: 'change-password',
      component: () => import('@/views/change-password.vue'),
      beforeEnter: checkUser
    },
    {
      path: '/delete-account',
      name: 'delete-account',
      component: () => import('@/views/delete-account.vue'),
      beforeEnter: checkUser
    },
    {
      path: '/signup_confirmed_template',
      name: 'signup_confirmed',
      component: () => import('@/views/signup_confirmed_template.vue'),
    },
    {
      path: '/invitation_confirmed_template',
      name: 'invitation_confirmed',
      component: () => import('@/views/invitation_confirmed_template.vue'),
    },
    {
      path: '/enable-account/:email',
      name: 'enable-account',
      component: () => import('@/views/enable-account.vue'),
    },
    {
      path: '/success',
      name: 'success',
      component: () => import('@/views/success.vue')
    },
    {
      path: '/bye',
      name: 'bye',
      component: () => import('@/views/bye.vue')
    },
    {
      path: '/create/:name',
      name: 'create',
      component: Create,
      beforeEnter: checkUser
    },
    {
      path: '/delete-service/:id',
      name: 'delete-service',
      component: DeleteService,
      beforeEnter: checkUser
    },
    {
      path: '/subscription/:service',
      name: 'subscription',
      component: Subscription,
      beforeEnter: checkUser
    },
    {
      path: '/',
      component: Main,
      children: [
        {
          path: '/',
          name: 'home',
          component: LandingPage
        },
        {
          path: 'account-setting',
          name: 'accountsetting',
          component: AccountSetting,
          beforeEnter: checkUser
        },
        {
          path: 'my-services',
          name: 'myservices',
          component: MyServices,
          beforeEnter: checkUser
        },
        {
          path: 'my-services/:service',
          component: ServiceMain,
          beforeEnter: checkUser,
          children: [
            {
              path: '',
              name: 'service',
              component: () => import('@/views/service/service.vue')
            },
            {
              path: 'users',
              name: 'users',
              component: () => import('@/views/service/users/users.vue')
            },
            {
              path: 'records',
              name: 'records',
              component: () => import('@/views/service/records/records.vue')
            },
            {
              path: 'mail',
              name: 'mail',
              component: () => import('@/views/service/mail.vue')
            },
            {
              path: 'newsletter',
              name: 'newsletter',
              component: () => import('@/views/service/newsletter.vue')
            },
            {
              path: 'hosting',
              name: 'hosting',
              component: () => import('@/views/service/hosting/hosting.vue')
            },
            {
              path: 'clientsecret',
              name: 'clientsecret',
              component: () => import('@/views/service/client_secret.vue')
            },
          ]
        },
      ]
    },
  ]
})

export default router
