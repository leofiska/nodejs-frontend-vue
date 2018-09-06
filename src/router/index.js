import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import User from '@/components/User'
import Home from '@/components/Home'
import Collaborators from '@/components/Collaborators'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        guest: true
      }
    },
    {
      path: '/user',
      name: 'user',
      component: User,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/collaborators',
      name: 'collaborators',
      component: Collaborators,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    next({
      name: 'home',
      path: '/home',
      params: { nextUrl: to.fullPath }
    })
    return
  }
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === undefined) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
    } else {
      let user = JSON.parse(localStorage.getItem('user'))
      if (to.matched.some(record => record.meta.is_admin)) {
        if (user.is_admin === 1) {
          next()
        } else {
          next({name: 'home'})
        }
      } else {
        next()
      }
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (localStorage.getItem('token') == null) {
      next()
    } else {
      next({ name: 'home' })
    }
  } else {
    next()
  }
})

export default router
