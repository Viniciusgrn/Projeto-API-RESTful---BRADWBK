import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/home.vue'
import AppShell from '@/components/AppShell.vue'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/startPage', redirect: '/feed' },
  {
    path: '/',
    component: AppShell,
    meta: { requiresAuth: true },
    children: [
      { path: 'feed', name: 'feed', component: () => import('@/views/FeedView.vue') },
      { path: 'explore', name: 'explore', component: () => import('@/views/ExploreView.vue') },
      { path: 'create', name: 'create', component: () => import('@/views/CreatePostView.vue') },
      { path: 'profile', name: 'profile', component: () => import('@/views/ProfileView.vue') },
      { path: 'leaderboard', name: 'leaderboard', component: () => import('@/views/LeaderboardView.vue') },
      { path: 'message', name: 'message', component: () => import('@/views/message.vue') },
      { path: 'myBooks', name: 'myBooks', component: () => import('@/views/myBooks.vue') },
      { path: 'activities', name: 'activities', component: () => import('@/views/ActivitiesView.vue') },
      { path: 'notifications', name: 'notifications', component: () => import('@/views/NotificationsView.vue') },
      { path: 'admin', name: 'admin', component: () => import('@/views/AdminView.vue'), meta: { requiresAdmin: true } },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const requiresAuth = to.matched.some(r => r.meta.requiresAuth)

  if (requiresAuth && !token) {
    next('/')
  } else if (to.path === '/' && token) {
    next('/feed')
  } else if (to.matched.some(r => r.meta.requiresAdmin)) {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}')
      if (user.role !== 'ADMIN') { next('/feed'); return }
    } catch { next('/feed'); return }
    next()
  } else {
    next()
  }
})

export default router
