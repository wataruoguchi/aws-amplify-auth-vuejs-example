import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import { AmplifyEventBus } from 'aws-amplify-vue'
import {getUser} from '@/utils/auth.js'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { requiresAuth: true },
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/signUp',
      name: 'signUp',
      component: () => import(/* webpackChunkName: "signup" */ './views/SignUp.vue'),
      meta: { requiresAuth: false },
    },
    {
      path: '/signUpConfirm',
      name: 'signUpConfirm',
      component: () => import(/* webpackChunkName: "confirm" */ './views/SignUpConfirm.vue'),
      meta: { requiresAuth: false },
    },
    {
      path: '/signIn',
      name: 'signIn',
      component: () => import(/* webpackChunkName: "signin" */ './views/SignIn.vue'),
      meta: { requiresAuth: false },
    },
  ]
})

getUser().then((user) => {
  if (user) {
    router.push({path: '/'})
  }
})

AmplifyEventBus.$on('authState', async (state) => {
  const pushPathes = {
    signedOut: () => {
      router.push({path: '/signIn'})
    },
    signUp: () => {
      router.push({path: '/signUp'})
    },
    confirmSignUp: () => {
      router.push({path: '/signUpConfirm'})
    },
    signIn: () => {
      router.push({path: '/signIn'})
    },
    signedIn: () => {
      router.push({path: '/'})
    }
  }
  if (typeof pushPathes[state] === 'function') {
    pushPathes[state]()
  }
})

router.beforeResolve(async (to, from, next) => {
  const user = await getUser()
  if (!user) {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      return next({
        path: '/signIn',
      })
    }
  } else {
    if (to.matched.some((record) => typeof(record.meta.requiresAuth) === "boolean" && !record.meta.requiresAuth)) {
      return next({
        path: '/',
      })
    }
  }
  return next()
})

export default router