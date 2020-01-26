import Vue from 'vue'
import VueRouter from 'vue-router'
import WelcomePage from './components/WelcomePage'
import HouseBoard from './components/HouseBoard'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import OwnerPage from './components/OwnerPage'
import DevicesBoard from './components/DevicesBoard'
import FavoritesBoard from './components/FavoritesBoard'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        component: WelcomePage,
    },
    {
        //path: '/houseBoard/:id',
        path: '/houseBoard/',
        name: 'houseBoard',
        component: HouseBoard,
        props: true,
        meta: { requiresAuth: true }
    },
    {
        path: '/signup',
        name: 'signup',
        component: SignUp,
    },
    {
        path: '/room/:id/:descriptor',
        name: 'in_room',
        component: DevicesBoard,
        props: true,
        meta: { requiresAuth: true }
    },
    {
        path: '/signin',
        name: 'signin',
        component: SignIn,
    },
    {
        path: '/profile',
        name: 'user-profile',
        component: OwnerPage,
        meta: { requiresAuth: true }
    },
    {
        path: '/favorites',
        name: 'favorites',
        component: FavoritesBoard,
        meta: { requiresAuth: true }
    },
    /*   {
          path: '/testhouse',
          name: 'test-house',
          component: TestHouse,
          meta: { requiresAuth: true }
      }, */
]

const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    let token = localStorage.getItem('token')
    if (to.matched.some(route => route.meta.requiresAuth)) {
        if (token) {
            next()
        } else router.replace('/signin')

    } else next()

    if (to.matched.some(route => !route.meta.requiresAuth) && from.matched.some(route => route.meta.requiresAuth)) {
        router.push('/')
    }
})

export default router