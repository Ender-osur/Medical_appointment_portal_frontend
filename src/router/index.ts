import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import LandingPage from '../views/LandingPageView.vue'
import Login from '../views/LoginView.vue'
import Register from '../views/RegisterView.vue'
import PatientDashboard from '../views/PatientDashboard.vue'
import DoctorDashboard from '../views/DoctorDashboardView.vue'
import BookAppointment from '../views/BookAppointmentView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: LandingPage
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/patient',
      component: PatientDashboard,
      meta: { requiresAuth: true, type: 'patient' }
    },
    {
      path: '/doctor',
      component: DoctorDashboard,
      meta: { requiresAuth: true, type: 'doctor' }
    },
    {
      path: '/book',
      component: BookAppointment,
      meta: { requiresAuth: true, type: 'patient' }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.user) {
    next('/login')
  } else if (to.meta.type && authStore.user?.type !== to.meta.type) {
    if (authStore.user?.type === 'patient') {
      next('/patient')
    } else if (authStore.user?.type === 'doctor') {
      next('/doctor')
    } else {
      next('/')
    }
  } else {
    next()
  }
})

export default router
