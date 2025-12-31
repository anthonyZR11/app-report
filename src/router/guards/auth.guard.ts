import type { NavigationGuardNext, RouteLocationNormalized, Router } from 'vue-router'

export function registerAuthGuard(router: Router) {
  router.beforeEach((to: RouteLocationNormalized, from, next: NavigationGuardNext) => {
    const token = localStorage.getItem('token')

    if (to.name === 'login' && token) {
      return next({ name: 'home', replace: true })
    }

    if (to.meta.requiresAuth && !token) {
      return next({ name: 'login', query: { redirect: to.fullPath } })
    }

    next()
  })
}
