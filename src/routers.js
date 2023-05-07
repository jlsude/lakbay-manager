import home from './components/MGR-home.vue'
import login from './components/MGR-login.vue'
import manage from './components/MGR-manage.vue'



import { createRouter, createWebHistory } from 'vue-router';



const routes = [
    {
        name: 'login',
        component: login,
        path: '/login' 
    },
    {
        name: 'home',
        component: home,
        path: '/' 
    },
    {
        name: 'manage',
        component: manage,
        path: '/manager/manage' 
    }

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;