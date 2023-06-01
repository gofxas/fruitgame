import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
    history: createWebHistory('/FruitGame/'),
    routes: [
        {
            path:'/',
            name: 'home',
            component: () => import('@/views/index.vue')
        },
        {
            path:'/setting',
            name: 'setting',
            component: () => import('@/views/setting.vue')
        }
    ]
})

export default router