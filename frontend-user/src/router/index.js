import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomePage.vue')
  },
  {
    path: '/list/:game?',
    name: 'List',
    component: () => import('@/views/ListPage.vue')
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: () => import('@/views/DetailPage.vue')
  },
  {
    path: '/publish',
    name: 'Publish',
    component: () => import('@/views/PublishPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/ProfilePage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('@/views/SearchPage.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  const userStore = JSON.parse(localStorage.getItem('user-store') || '{}')
  if (to.meta.requiresAuth && !userStore?.currentUser) {
    ElMessage.warning('请先登录')
    next({ name: 'Login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})

export default router
