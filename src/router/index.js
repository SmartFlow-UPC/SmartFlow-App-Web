/**
 * Vue Router
 * @description: Vue Router configuration
 * @docs: https://router.vuejs.org/
 */

import { createRouter, createWebHistory } from "vue-router";
import HomeComponent from "../public/pages/home.component.vue";
import AboutComponent from "../public/pages/about.component.vue";
import CaracteristicasComponent from "../public/pages/caracteristicas.component.vue";
import BeneficiosComponent from "../public/pages/beneficios.component.vue";
import TestimoniosComponent from "../public/pages/testimonios.component.vue";
import RegistroManagementComponent from "../registros/pages/registro-management.component.vue";
import ConsumosManagementComponent from "../consumos/pages/consumos-management.component.vue";

const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'

const routes = [
    { path: '/home', name: 'Home', component: HomeComponent, meta: { requiresAuth: true } },
    { path: '/registros', component: RegistroManagementComponent, meta: { title: 'Registros', requiresAuth: true } },
    { path: '/consumos', component: ConsumosManagementComponent, meta: { title: 'Consumos', requiresAuth: true } },
    { path: '/contacto', component: CaracteristicasComponent, meta: { title: 'Contactos' } },
    { path: '/planes', component: BeneficiosComponent, meta: { title: 'Planes' } },
    { path: '/testimonios', component: TestimoniosComponent, meta: { title: 'Testimonios' } },
    { path: '/about', component: AboutComponent, meta: { title: 'About us' } },
    { path: '/', redirect: '/login' }, // Redirigir a login como ruta inicial
    { path: '/:catchAll(.*)', redirect: '/login' }, // Redirige cualquier ruta no encontrada al login
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

/**
 * Middleware de Vue Router para verificar autenticación antes de cada ruta
 */
router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !isAuthenticated) {
        next('/login')  // Redirige a login si no está autenticado
    } else {
        next()  // Permite continuar si todo está bien
    }
})

export default router;
